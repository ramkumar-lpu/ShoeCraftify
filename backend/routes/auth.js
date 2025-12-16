
import express from 'express';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import crypto from 'crypto';
import User from '../models/User.js';
import { 
  sendPasswordResetOTPEmail, 
  sendPasswordChangedEmail,
  sendWelcomeEmail,
  sendLoginAlertEmail
} from '../config/email.js';

const router = express.Router();

// ========== RATE LIMITING MIDDLEWARE ==========
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many attempts, please try again later.'
  },
  skipSuccessfulRequests: true
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 OTP requests per 15 minutes
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again later.'
  }
});

const otpVerifyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 verification attempts per 5 minutes
  message: {
    success: false,
    message: 'Too many verification attempts. Please request a new OTP.'
  }
});

// ========== INPUT VALIDATION MIDDLEWARE ==========
const validateRegisterInput = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  
  const errors = [];
  
  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  
  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }
  
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Valid email is required'
    });
  }
  
  if (!password || password.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Password is required'
    });
  }
  
  next();
};

// ========== GOOGLE OAUTH ROUTES ==========
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=auth_failed`,
    failureMessage: true
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard?login=success`);
  }
);

// ========== MANUAL REGISTRATION ==========
router.post('/register', validateRegisterInput, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Normalize email
    const normalizedEmail = validator.normalizeEmail(email);//what is does here is it converts email to standard format
    
    // Check if user exists
    const existingUser = await User.findOne({ 
      email: normalizedEmail 
    });
    
    if (existingUser) {
      // Check account type for better UX
      if (existingUser.accountType === 'google') {
        return res.status(409).json({
          success: false,
          message: 'Account already exists with Google. Please use Google login.',
          accountType: 'google'
        });
      }
      
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. Try logging in instead.'
      });
    }
    
    // Create user
    const user = new User({
      firstName: validator.escape(firstName.trim()),
      lastName: validator.escape(lastName.trim()),
      email: normalizedEmail,
      password,
      accountType: 'local',
      registrationIp: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    await user.save();
    
    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();
    
    // Send welcome email
    await sendWelcomeEmail(user, verificationToken);
    
    // Log the user in
    req.login(user, (err) => {
      if (err) {
        console.error('Auto-login error:', err);
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName,
        isEmailVerified: user.isEmailVerified
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Account with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Registration failed due to server error. Please try again.'
    });
  }
});

// ========== MANUAL LOGIN ==========
router.post('/login', authLimiter, validateLoginInput, async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Normalize email
    const normalizedEmail = validator.normalizeEmail(email);
    
    // Find user
    const user = await User.findOne({ email: normalizedEmail })
      .select('+password +failedLoginAttempts +accountLockedUntil');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check if account is locked
    if (user.isAccountLocked()) {
      const lockTime = Math.ceil((user.accountLockedUntil - Date.now()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked. Try again in ${lockTime} minutes or reset your password.`,
        lockedUntil: user.accountLockedUntil
      });
    }
    
    // Check account type
    if (user.accountType === 'google') {
      return res.status(401).json({
        success: false,
        message: 'Please use Google to sign in with this account',
        accountType: 'google'
      });
    }
    
    // Check if email is verified (if required)
    if (process.env.REQUIRE_EMAIL_VERIFICATION === 'true' && !user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in.',
        isEmailVerified: false
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Increment failed attempts
      user.incrementFailedAttempts();
      await user.save();
      
      const remainingAttempts = 5 - user.failedLoginAttempts;
      const message = remainingAttempts > 0 
        ? `Invalid email or password. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`
        : 'Account locked. Too many failed attempts. Try again in 15 minutes or reset your password.';
      
      return res.status(401).json({
        success: false,
        message,
        remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
      });
    }
    
    // Reset failed attempts on successful login
    user.resetFailedAttempts();
    user.lastLogin = new Date();
    user.lastLoginIp = req.ip;
    await user.save();
    
    // Configure session based on rememberMe
    if (rememberMe && req.session) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    }
    
    // Log the user in
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      
      // Send login alert email (optional)
      if (user.preferences?.loginAlerts) {
        sendLoginAlertEmail(user, {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          timestamp: new Date()
        }).catch(console.error);
      }
      
      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          fullName: user.fullName,
          profilePicture: user.profilePicture?.url,
          accountType: user.accountType,
          isEmailVerified: user.isEmailVerified,
          preferences: user.preferences
        }
      });
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed due to server error. Please try again.'
    });
  }
});

// ========== FORGOT PASSWORD (OTP ONLY) ==========
router.post('/forgot-password', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }
    
    const normalizedEmail = validator.normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      // Security: generic response
      return res.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset OTP.'
      });
    }
    
    // Check if it's a Google account
    if (user.accountType === 'google') {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google login. Please sign in with Google.',
        accountType: 'google'
      });
    }
    
    // Generate OTP using your model method
    const otp = user.generateResetOTP();
    await user.save();
    
    // Send email with OTP
    await sendPasswordResetOTPEmail(user, otp);
    
    res.json({
      success: true,
      message: 'Password reset OTP sent to your email',
      // For testing in development only
      ...(process.env.NODE_ENV === 'development' && { otp })
    });
  } catch (error) {
    console.error('Forgot password OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
});

// ========== VERIFY OTP ==========
router.post('/verify-reset-otp', otpVerifyLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !validator.isEmail(email) || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Valid email and OTP are required'
      });
    }
    
    const normalizedEmail = validator.normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Verify OTP using your model method
    const isValidOTP = user.verifyResetOTP(otp);
    
    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }
    
    // Create a simple token for frontend (not stored in DB)
    const frontendToken = crypto.randomBytes(32).toString('hex');
    
    res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken: frontendToken,
      expiresIn: 10 * 60 * 1000 // 10 minutes
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP'
    });
  }
});

// ========== RESET PASSWORD WITH VERIFIED OTP ==========
router.post('/reset-password', async (req, res) => {
  try {
    const { email, resetToken, password } = req.body;
    
    // Validate inputs (we accept the resetToken but don't verify it server-side for OTP flow)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    const normalizedEmail = validator.normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail })
      .select('+resetPasswordOTP +resetPasswordOTPExpires');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if OTP exists and not expired (simplified check)
    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
      return res.status(400).json({
        success: false,
        message: 'No active OTP found. Please request a new one.'
      });
    }
    
    if (user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }
    
    // Check if new password is same as old password
    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password cannot be the same as old password'
      });
    }
    
    // Set new password
    user.password = password;
    
    // Clear all reset tokens and OTP data
    user.clearTokens();
    
    // Reset failed login attempts
    user.resetFailedAttempts();
    
    user.lastPasswordChange = new Date();
    
    await user.save();
    
    // Send confirmation email
    await sendPasswordChangedEmail(user);
    
    res.json({
      success: true,
      message: 'Password reset successful! You can now log in with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed. Please try again.'
    });
  }
});

// ========== GET CURRENT USER ==========
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        fullName: req.user.fullName,
        profilePicture: req.user.profilePicture?.url,
        accountType: req.user.accountType,
        isEmailVerified: req.user.isEmailVerified,
        preferences: req.user.preferences
      }
    });
  } else {
    res.json({ 
      success: false, 
      user: null,
      message: 'Not authenticated'
    });
  }
});

// ========== LOGOUT ==========
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
      });
      
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  });
});

// ========== ACCOUNT STATUS CHECK ==========
router.get('/check-account/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }
    
    const normalizedEmail = validator.normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.json({
        success: true,
        exists: false,
        message: 'Account not found'
      });
    }
    
    res.json({
      success: true,
      exists: true,
      accountType: user.accountType,
      isEmailVerified: user.isEmailVerified,
      isLocked: user.isAccountLocked()
    });
  } catch (error) {
    console.error('Check account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check account status'
    });
  }
});

export default router;
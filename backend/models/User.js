
//this one is for better enhancements and features for user model with manual login and password reset functionalities

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  // Authentication providers
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  
  // Personal information
  firstName: {
    type: String,
    required: function() { return !this.googleId; } // Required only for manual signup
  },
  lastName: {
    type: String,
    required: function() { return !this.googleId; }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  
  // Profile image - using URL approach

  
  profilePicture: {
    url: {
      type: String,
      default: 'https://res.cloudinary.com/your-cloud/image/upload/v1/defaults/default-avatar.png'
    },
    publicId: String, // For cloud storage like Cloudinary
    uploadedAt: Date
  },
  
  // Password fields (only for manual login)
  password: {
    type: String,
    minlength: 6,
    select: false // Won't be included in queries by default
  },
  
  // Account status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Password reset fields
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetPasswordOTP: String,
  resetPasswordOTPExpires: Date,
  
  // Account security
  lastPasswordChange: Date,
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  accountLockedUntil: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // User preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    }
  },
  
  // Account type
  accountType: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  
  // Active status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.email.split('@')[0]; // Fallback to email username
});

// Virtual for display name (if you need it separately)
userSchema.virtual('displayName').get(function() {
  return this.fullName;
});

// Middleware to update 'updatedAt' on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Hash password before saving (only for local accounts)
userSchema.pre('save', async function(next) {
  if (this.accountType !== 'local' || !this.isModified('password')) {
    return next();
  }
  
  try {
    // Check if password meets requirements
    if (this.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.lastPasswordChange = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password || this.accountType !== 'local') return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate password reset token (for link-based reset)
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
  
  return resetToken;
};

// Generate OTP for password reset
userSchema.methods.generateResetOTP = function() {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  this.resetPasswordOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
    
  this.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return otp;
};

// Verify OTP
userSchema.methods.verifyResetOTP = function(candidateOTP) {
  if (!this.resetPasswordOTP || !this.resetPasswordOTPExpires) {
    return false;
  }
  
  const hashedCandidateOTP = crypto
    .createHash('sha256')
    .update(candidateOTP)
    .digest('hex');
    
  return this.resetPasswordOTP === hashedCandidateOTP && 
         Date.now() < this.resetPasswordOTPExpires;
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
    
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Clear all reset/verification tokens
userSchema.methods.clearTokens = function() {
  this.resetPasswordToken = undefined;
  this.resetPasswordExpires = undefined;
  this.resetPasswordOTP = undefined;
  this.resetPasswordOTPExpires = undefined;
  this.emailVerificationToken = undefined;
  this.emailVerificationExpires = undefined;
};

// Check if account is locked
userSchema.methods.isAccountLocked = function() {
  return this.accountLockedUntil && this.accountLockedUntil > Date.now();
};

// Increment failed login attempts
userSchema.methods.incrementFailedAttempts = function() {
  this.failedLoginAttempts += 1;
  
  if (this.failedLoginAttempts >= 5) {
    this.accountLockedUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
  }
  
  return this.failedLoginAttempts;
};

// Reset failed login attempts
userSchema.methods.resetFailedAttempts = function() {
  this.failedLoginAttempts = 0;
  this.accountLockedUntil = undefined;
};

// Method to update profile picture
userSchema.methods.updateProfilePicture = function(url, publicId = null) {
  this.profilePicture = {
    url: url,
    publicId: publicId,
    uploadedAt: new Date()
  };
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ resetPasswordOTP: 1 });
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ accountLockedUntil: 1 });

const User = mongoose.model('User', userSchema);

export default User;
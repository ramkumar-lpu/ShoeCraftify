// import nodemailer from 'nodemailer';

// // Create transporter (only if email credentials are provided)
// let transporter;

// // Check if email credentials exist
// if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
//   transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   // Test connection
//   transporter.verify((error) => {
//     if (error) {
//       console.log('📧 Email: Not configured (optional)');
//     } else {
//       console.log('📧 Email: Ready');
//     }
//   });
// } else {
//   console.log('📧 Email: Skipped (no credentials)');
// }

// // Simple email sender
// const sendSimpleEmail = async (to, subject, html) => {
//   // If no transporter, just log and return success for testing
//   if (!transporter) {
//     console.log(`📧 [Test Mode] Would send email to: ${to}`);
//     console.log(`📧 Subject: ${subject}`);
//     console.log('📧 Email functionality is in test mode (no actual emails sent)');
//     return { success: true, testMode: true };
//   }

//   try {
//     const mailOptions = {
//       from: `"SHOECREATIFY" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${to}`);
//     return { success: true, info };
//   } catch (error) {
//     console.log(`📧 Email failed: ${error.message}`);
//     // For college project, return success anyway
//     return { success: true, testMode: true, error: error.message };
//   }
// };

// // Send OTP email for password reset
// export const sendPasswordResetOTPEmail = async (user, otp) => {
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #333;">SHOECREATIFY - Password Reset</h2>
//       <p>Hello ${user.firstName || 'User'},</p>
//       <p>You requested to reset your password.</p>
//       <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
//         <h3 style="margin: 0 0 10px 0;">Your OTP Code:</h3>
//         <div style="font-size: 36px; font-weight: bold; color: #4F46E5; letter-spacing: 8px;">
//           ${otp}
//         </div>
//         <p style="color: #666; margin-top: 10px;">Valid for 10 minutes</p>
//       </div>
//       <p>Enter this code in the password reset form to continue.</p>
//       <p>If you didn't request this, please ignore this email.</p>
//       <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//       <p style="color: #999; font-size: 12px;">
//         SHOECREATIFY - College Project<br>
//         This is an automated message.
//       </p>
//     </div>
//   `;

//   const result = await sendSimpleEmail(
//     user.email,
//     `SHOECREATIFY - Password Reset OTP: ${otp}`,
//     html
//   );

//   // Log OTP to console for testing (important for college project demo!)
//   console.log(`📧 [DEMO] OTP for ${user.email}: ${otp}`);
//   console.log(`📧 [DEMO] You can use this OTP to test password reset functionality`);
  
//   return result;
// };

// // Send password changed confirmation email
// export const sendPasswordChangedEmail = async (user) => {
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #333;">Password Changed Successfully</h2>
//       <p>Hello ${user.firstName || 'User'},</p>
//       <p>Your password has been successfully changed.</p>
//       <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6;">
//         <p style="margin: 0; font-weight: bold;">If you did not make this change:</p>
//         <p style="margin: 5px 0 0 0;">Please secure your account.</p>
//       </div>
//       <p>Thank you for using SHOECREATIFY!</p>
//       <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//       <p style="color: #999; font-size: 12px;">
//         SHOECREATIFY - College Project<br>
//         This is an automated message.
//       </p>
//     </div>
//   `;

//   console.log(`📧 [DEMO] Password changed for user: ${user.email}`);
//   return await sendSimpleEmail(
//     user.email,
//     'SHOECREATIFY - Password Changed',
//     html
//   );
// };

// // Send welcome email (optional - simplified)
// export const sendWelcomeEmail = async (user, verificationToken) => {
//   const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${verificationToken}`;
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #333;">Welcome to SHOECREATIFY!</h2>
//       <p>Hello ${user.firstName},</p>
//       <p>Thank you for registering with SHOECREATIFY!</p>
//       <p>Click the link below to verify your email:</p>
//       <div style="text-align: center; margin: 25px 0;">
//         <a href="${verificationUrl}" 
//            style="background-color: #4F46E5; color: white; padding: 12px 24px; 
//                   text-decoration: none; border-radius: 6px; font-weight: bold;">
//           Verify Email
//         </a>
//       </div>
//       <p>Or copy this link: ${verificationUrl}</p>
//       <p>This link expires in 24 hours.</p>
//       <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//       <p style="color: #999; font-size: 12px;">
//         SHOECREATIFY - College Project<br>
//         This is an automated message.
//       </p>
//     </div>
//   `;

//   console.log(`📧 [DEMO] Welcome email for: ${user.email}`);
//   console.log(`📧 [DEMO] Verification token: ${verificationToken}`);
  
//   return await sendSimpleEmail(
//     user.email,
//     'Welcome to SHOECREATIFY - Verify Email',
//     html
//   );
// };

// // Optional: Simple login alert (can be removed if not needed)
// export const sendLoginAlertEmail = async (user, loginInfo) => {
//   console.log(`📧 [DEMO] Login alert for ${user.email} from IP: ${loginInfo.ip}`);
  
//   // Return success without actually sending email
//   return { success: true, testMode: true };
// };





import nodemailer from 'nodemailer';

console.log('📧 Email service initializing...');

// Create transporter with real Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email connection failed:', error.message);
    console.log('ℹ️  Please check your EMAIL_USER and EMAIL_PASSWORD in .env file');
    console.log('ℹ️  Make sure you are using App Password, not regular password');
  } else {
    console.log('✅ Email server connected successfully');
    console.log(`📧 Sender: ${process.env.EMAIL_USER}`);
  }
});

// Generic email sender
const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"SHOECREATIFY" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      ...(text && { text })
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} (Message ID: ${info.messageId})`);
    return { success: true, info };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    // Don't throw error - just log and continue
    return { success: false, error: error.message };
  }
};

// Send OTP email for password reset
export const sendPasswordResetOTPEmail = async (user, otp) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - SHOECREATIFY</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SHOECREATIFY</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Custom Shoe Design Studio</p>
      </div>
      
      <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 24px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
          Password Reset Verification
        </h2>
        
        <p style="color: #4b5563; margin-bottom: 15px; font-size: 16px;">
          Hello <strong style="color: #1f2937;">${user.firstName || user.displayName || 'User'}</strong>,
        </p>
        
        <p style="color: #4b5563; margin-bottom: 25px; font-size: 16px;">
          You requested to reset your password for your SHOECREATIFY account. 
          Use the verification code below to complete the process:
        </p>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
            One-Time Password
          </p>
          <div style="font-family: 'Courier New', monospace; font-size: 40px; font-weight: bold; color: #4F46E5; letter-spacing: 12px; margin: 10px 0; text-align: center;">
            ${otp}
          </div>
          <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 14px;">
            Valid for 10 minutes
          </p>
        </div>
        
        <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0; border-radius: 6px;">
          <p style="color: #92400e; margin: 0 0 10px 0; font-size: 14px; font-weight: 500;">
            ⚠️ Security Guidelines:
          </p>
          <ul style="color: #92400e; margin: 10px 0 0 20px; padding: 0; font-size: 14px;">
            <li>Never share this OTP with anyone</li>
            <li>SHOECREATIFY will never ask for your OTP</li>
            <li>This code will expire in 10 minutes</li>
            <li>If you didn't request this, please ignore this email</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
            SHOECREATIFY • Custom Shoe Design Studio<br>
            This is an automated message, please do not reply.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `SHOECREATIFY Password Reset\n\nHello ${user.firstName || 'User'},\n\nYour password reset OTP is: ${otp}\n\nThis OTP expires in 10 minutes.\n\nIf you didn't request this password reset, please ignore this email.\n\nSHOECREATIFY Team`;

  return sendEmail(
    user.email,
    `SHOECREATIFY - Password Reset Code: ${otp}`,
    html,
    text
  );
};

// Send password changed confirmation email
export const sendPasswordChangedEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed - SHOECREATIFY</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SHOECREATIFY</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Custom Shoe Design Studio</p>
      </div>
      
      <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 40px; color: white; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            ✓
          </div>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 24px; text-align: center;">
          Password Changed Successfully
        </h2>
        
        <p style="color: #4b5563; margin-bottom: 15px; font-size: 16px; text-align: center;">
          Hello <strong style="color: #1f2937;">${user.firstName || user.displayName || 'User'}</strong>,
        </p>
        
        <p style="color: #4b5563; margin-bottom: 25px; font-size: 16px; text-align: center;">
          Your SHOECREATIFY account password has been successfully updated.
        </p>
        
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 20px; margin: 30px 0; border-radius: 8px;">
          <p style="color: #065f46; margin: 0 0 10px 0; font-size: 14px; font-weight: 500;">
            ✅ Security Update Details:
          </p>
          <ul style="color: #065f46; margin: 0 0 0 20px; padding: 0; font-size: 14px;">
            <li>Password changed on: ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</li>
            <li>Account: ${user.email}</li>
          </ul>
        </div>
        
        <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0; border-radius: 6px;">
          <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
            ⚠️ Important Security Notice:
          </p>
          <p style="color: #92400e; margin: 10px 0 0 0; font-size: 14px;">
            If you did not make this change, please secure your account immediately.
          </p>
        </div>
        
        <div style="text-align: center; margin: 40px 0 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            Thank you for using SHOECREATIFY!
          </p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
            SHOECREATIFY • Custom Shoe Design Studio<br>
            This is an automated message, please do not reply.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `SHOECREATIFY Password Changed\n\nHello ${user.firstName || 'User'},\n\nYour password has been successfully changed.\n\nDate: ${new Date().toLocaleString()}\nAccount: ${user.email}\n\nIf you did not make this change, please secure your account immediately.\n\nSHOECREATIFY Team`;

  return sendEmail(
    user.email,
    '✅ SHOECREATIFY - Password Successfully Updated',
    html,
    text
  );
};

// Send welcome email
export const sendWelcomeEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${verificationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to SHOECREATIFY</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Welcome to SHOECREATIFY! 👟</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px;">Let's create amazing shoe designs together</p>
      </div>
      
      <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        <p style="color: #4b5563; margin-bottom: 15px; font-size: 16px;">
          Hello <strong style="color: #1f2937; font-size: 18px;">${user.firstName}</strong>,
        </p>
        
        <p style="color: #4b5563; margin-bottom: 25px; font-size: 16px;">
          Thank you for joining SHOECREATIFY! We're excited to have you on board. 
          Start creating unique shoe designs that reflect your style and personality.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: white; padding: 16px 45px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);">
            Verify Your Email
          </a>
        </div>
        
        <p style="color: #6b7280; margin-top: 20px; font-size: 14px; text-align: center;">
          This link expires in 24 hours
        </p>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 30px;">
          <p style="color: #1f2937; font-size: 18px; font-weight: bold; margin-bottom: 15px;">
            What you can do with SHOECREATIFY:
          </p>
          <ul style="color: #4b5563; margin: 0 0 0 20px; padding: 0; font-size: 15px;">
            <li>🎨 Design custom shoes with our intuitive editor</li>
            <li>👟 Choose from various shoe models and styles</li>
            <li>🌈 Apply colors, patterns, and textures</li>
            <li>📦 Save and share your designs with the community</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
            SHOECREATIFY • Unleash Your Creativity<br>
            This is an automated message, please do not reply.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `Welcome to SHOECREATIFY!\n\nHello ${user.firstName},\n\nThank you for registering with SHOECREATIFY! Please verify your email by clicking this link:\n\n${verificationUrl}\n\nThis link expires in 24 hours.\n\nStart creating amazing shoe designs today!\n\nSHOECREATIFY Team`;

  return sendEmail(
    user.email,
    '👋 Welcome to SHOECREATIFY - Verify Your Email',
    html,
    text
  );
};

// Optional login alert (simplified)
export const sendLoginAlertEmail = async (user, loginInfo) => {
  // Optional feature - you can implement this later
  console.log(`📧 Login alert for ${user.email} from IP: ${loginInfo.ip}`);
  return { success: true };
};

console.log('📧 Email functions loaded successfully');
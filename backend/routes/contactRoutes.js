import express from 'express';
import nodemailer from 'nodemailer';
import Joi from 'joi'; // Add joi for validation: npm install joi
import rateLimit from 'express-rate-limit'; // npm install express-rate-limit

const router = express.Router();

// Rate limiting to prevent abuse
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many contact attempts from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Input validation schema
const contactSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-Z\s\-'.]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Name can only contain letters, spaces, hyphens, apostrophes, and periods',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required()
        .messages({
            'string.email': 'Please provide a valid email address'
        }),
    subject: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            'string.min': 'Subject must be at least 5 characters long',
            'string.max': 'Subject cannot exceed 200 characters'
        }),
    message: Joi.string()
        .min(10)
        .max(5000)
        .required()
        .messages({
            'string.min': 'Message must be at least 10 characters long',
            'string.max': 'Message cannot exceed 5000 characters'
        }),
    contactType: Joi.string()
        .valid('general', 'support', 'business', 'feedback', 'technical')
        .default('general'),
    toEmail: Joi.string()
        .email()
        .optional(),
    replyTo: Joi.string()
        .email()
        .optional(),
    recaptchaToken: Joi.string()
        .optional() // Add reCAPTCHA support
});

// Validate environment variables
const validateConfig = () => {
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
    const missing = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

// Create transporter with enhanced configuration
const createTransporter = () => {
    validateConfig();

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        pool: true, // Use connection pooling
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000,
        rateLimit: 5 // 5 emails per second
    });
};

// Verify transporter connection
const verifyTransporter = async () => {
    const transporter = createTransporter();
    try {
        await transporter.verify();
        console.log('Email transporter is ready');
        return transporter;
    } catch (error) {
        console.error('Failed to create email transporter:', error);
        throw error;
    }
};

// Reusable transporter (created once)
let transporter;

// Initialize transporter on server start
(async () => {
    try {
        transporter = await verifyTransporter();
    } catch (error) {
        console.error('Failed to initialize email transporter');
    }
})();

// Helper function to validate reCAPTCHA (optional)
const validateRecaptcha = async (token) => {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        return true; // Skip if not configured
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        const data = await response.json();
        return data.success && data.score >= 0.5; // Adjust threshold as needed
    } catch (error) {
        console.error('reCAPTCHA validation error:', error);
        return false;
    }
};

// Helper function to sanitize input
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    // Basic HTML entity escaping
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    return input.replace(/[&<>"'/]/g, char => htmlEscapes[char] || char);
};

// Helper function to format contact type
const formatContactType = (type) => {
    const types = {
        'general': 'General Inquiry',
        'support': 'Customer Support',
        'business': 'Business Partnership',
        'feedback': 'Feedback',
        'technical': 'Technical Issue'
    };
    return types[type] || 'General Inquiry';
};

router.post('/send', contactLimiter, async (req, res) => {
    try {
        // Validate input
        const { error, value } = contactSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            });
        }

        const { name, email, subject, message, contactType, toEmail, replyTo, recaptchaToken } = value;

        // Validate reCAPTCHA if configured
        if (process.env.RECAPTCHA_SECRET_KEY) {
            const isValidCaptcha = await validateRecaptcha(recaptchaToken);
            if (!isValidCaptcha) {
                return res.status(400).json({
                    success: false,
                    message: 'reCAPTCHA verification failed'
                });
            }
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedSubject = sanitizeInput(subject);
        const sanitizedMessage = sanitizeInput(message);
        const formattedContactType = formatContactType(contactType);

        // Check if transporter is available
        if (!transporter) {
            transporter = await verifyTransporter().catch(() => {
                throw new Error('Email service temporarily unavailable');
            });
        }

        // Prepare email options
        const mailOptions = {
            from: {
                name: process.env.EMAIL_FROM_NAME || 'ShoeCreatify Contact Form',
                address: process.env.EMAIL_USER
            },
            to: toEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            replyTo: replyTo || email,
            subject: `[ShoeCreatify Contact] ${formattedContactType}: ${sanitizedSubject}`,
            text: `
CONTACT FORM SUBMISSION
=======================
Date: ${new Date().toISOString()}
Name: ${sanitizedName}
Email: ${email}
Inquiry Type: ${formattedContactType}

MESSAGE:
${sanitizedMessage}

---
This message was sent via the ShoeCreatify contact form.
            `.trim(),
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #4F46E5; }
        .message-box { background-color: white; padding: 20px; border-radius: 5px; border-left: 4px solid #4F46E5; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        .badge { display: inline-block; background-color: #4F46E5; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-left: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Message</h1>
            <p>ShoeCreatify Contact Form</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="field-label">Date:</span> ${new Date().toLocaleString()}
            </div>
            <div class="field">
                <span class="field-label">Name:</span> ${sanitizedName}
            </div>
            <div class="field">
                <span class="field-label">Email:</span> <a href="mailto:${email}">${email}</a>
            </div>
            <div class="field">
                <span class="field-label">Inquiry Type:</span> ${formattedContactType}
            </div>
            
            <div class="message-box">
                <h3>Message:</h3>
                <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="field">
                <span class="field-label">IP Address:</span> ${req.ip}
            </div>
            <div class="field">
                <span class="field-label">User Agent:</span> ${req.get('User-Agent') || 'Not available'}
            </div>
            
            <div class="footer">
                <p>This message was sent via the ShoeCreatify contact form at ${new Date().toISOString()}.</p>
                <p>You can reply directly to this email to contact the sender.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `.trim(),
            // Add headers for better email client compatibility
            headers: {
                'X-Priority': '1',
                'X-Mailer': 'ShoeCreatify Contact Form',
                'X-Contact-Form': 'true',
                'X-IP-Address': req.ip
            }
        };

        // Send email with timeout
        const emailPromise = transporter.sendMail(mailOptions);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Email sending timeout')), 30000);
        });

        const info = await Promise.race([emailPromise, timeoutPromise]);

        // Log successful send (consider using a proper logger)
        console.log('Email sent successfully:', {
            messageId: info.messageId,
            timestamp: new Date().toISOString(),
            to: mailOptions.to,
            subject: mailOptions.subject,
            contactType: contactType,
            ip: req.ip
        });

        // Send success response
        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            ip: req.ip,
            endpoint: '/contact/send'
        });

        // Determine appropriate status code
        let statusCode = 500;
        let userMessage = 'Failed to send email. Please try again later.';

        if (error.message.includes('timeout')) {
            statusCode = 504;
            userMessage = 'Email sending timed out. Please try again.';
        } else if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
            statusCode = 503;
            userMessage = 'Email service configuration error.';
        } else if (error.message.includes('temporarily unavailable')) {
            statusCode = 503;
            userMessage = 'Email service is temporarily unavailable.';
        }

        res.status(statusCode).json({
            success: false,
            message: userMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
router.get('/health', async (req, res) => {
    try {
        if (transporter) {
            await transporter.verify();
            res.json({
                status: 'healthy',
                service: 'email',
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(503).json({
                status: 'unavailable',
                service: 'email',
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            service: 'email',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export default router;
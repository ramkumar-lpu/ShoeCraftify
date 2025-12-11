// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import cors from 'cors';
// import passport from './config/passport.js'; // Add this
// import authRoutes from './routes/auth.js';   // Add this

// // Create Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoecreatify')
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//     process.exit(1);
//   });

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// // Session
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI,
//     ttl: 24 * 60 * 60
//   }),
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'lax'
//   }
// }));

// // Initialize Passport - Add these 2 lines
// app.use(passport.initialize());
// app.use(passport.session());

// // ========== MOUNT ROUTES ==========
// // Add this line to use your auth routes
// app.use('/api/auth', authRoutes);

// // Routes
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     time: new Date().toISOString(),
//     authRoutes: true  // Add this to confirm auth routes are loaded
//   });
// });

// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Test endpoint works!' });
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`\n🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'Connecting...'}`);
//   //console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
//   console.log(`🔗 Google Auth: http://localhost:${PORT}/api/auth/google`);
//  // console.log(`🔗 Current User: http://localhost:${PORT}/api/auth/user`);
//   console.log(`\nPress Ctrl+C to stop\n`);
// });


import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import crypto from 'crypto';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import Razorpay from 'razorpay';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoecreatify')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ========== MOUNT ROUTES ==========
app.use('/api/auth', authRoutes);

// ========== RAZORPAY PAYMENT ROUTES ==========
// Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    console.log('Creating Razorpay order:', req.body);
    
    const options = {
      amount: req.body.amount, // amount in paise
      currency: req.body.currency || 'INR',
      receipt: req.body.receipt || `receipt_${Date.now()}`,
      notes: req.body.notes || {},
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    console.log('Order created:', order.id);
    
    res.json({
      success: true,
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      receipt: order.receipt
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create order' 
    });
  }
});

// Verify Payment
app.post('/api/payment/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    console.log('Verifying payment:', {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id
    });

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification data'
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      console.log('Payment verified successfully');
      
      // Here you should:
      // 1. Save payment details to database
      // 2. Update order status
      // 3. Send confirmation email
      // 4. Update user's order history
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('Payment verification failed - signature mismatch');
      res.status(400).json({
        success: false,
        message: 'Payment verification failed - invalid signature'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Payment verification failed' 
    });
  }
});

// Get Payment Details
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);
    res.json({ 
      success: true, 
      payment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get Order Details
app.get('/api/payment/order/:orderId', async (req, res) => {
  try {
    const order = await razorpay.orders.fetch(req.params.orderId);
    res.json({ 
      success: true, 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ========== EXISTING ROUTES ==========
// Routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    time: new Date().toISOString(),
    authRoutes: true,
    razorpay: razorpay.key_id ? 'Configured' : 'Not configured'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint works!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'Connecting...'}`);
  console.log(`💰 Razorpay: ${razorpay.key_id ? 'Configured' : 'Not configured'}`);
  console.log(`🔗 Google Auth: http://localhost:${PORT}/api/auth/google`);
  console.log(`🔗 Payment Create Order: http://localhost:${PORT}/api/payment/create-order`);
  console.log(`🔗 Payment Verify: http://localhost:${PORT}/api/payment/verify`);
  console.log(`\nPress Ctrl+C to stop\n`);
});
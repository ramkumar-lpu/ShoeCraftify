import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import passport from './config/passport.js'; // Add this
import authRoutes from './routes/auth.js';
import designRoutes from './routes/designRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoecreatify')
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => {
    console.error(' MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));//that mesns that frontend can send cookies to backend or we can say that only this frontend url is allowed to fetch the backend api s with credentials like cookies

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ShoeCreatify Backend API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      shoes: '/api/shoes',
      orders: '/api/orders'
    }
  });
});
// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/shoecreatify',
    ttl: 24 * 60 * 60// 1 day
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,// 1 day
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

// Initialize Passport - Add these 2 lines
app.use(passport.initialize());
app.use(passport.session());

// ==========  ROUTES ==========
// Add this line to use your auth routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/contact', contactRoutes);

// Routes for testing and health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    time: new Date().toISOString(),
    authRoutes: true  // Add this to confirm auth routes are loaded
  });
});
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n Server running on http://localhost:${PORT}`);
  //console.log(` Google Auth: http://localhost:${PORT}/api/auth/google`);
  //console.log(`\nPress Ctrl+C to stop\n`);
});

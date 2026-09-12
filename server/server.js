const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const designRoutes = require('./routes/designRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitora';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    app: 'FITORA API',
    tagline: 'Your Fit. Your Style. Your Creation.',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/designs', designRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred. Please try again later.'
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB at: ${MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('✅ MongoDB connected successfully to database: fitora');
  } catch (err) {
    console.warn('⚠️  MongoDB connection notice:', err.message);
    console.warn('   FITORA backend is running, but database operations will require MongoDB.');
    console.warn('   To enable persistence, start local MongoDB or set a valid MONGO_URI in server/.env.');
  }
};

connectDB();

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`🚀 FITORA Server running on http://localhost:${PORT}`);
  console.log(`✨ Tagline: "Your Fit. Your Style. Your Creation."`);
});

module.exports = { app, server };

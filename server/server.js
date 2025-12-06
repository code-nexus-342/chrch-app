const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
require('dotenv').config();

// Import database utilities
const { initDatabase, deleteExpiredEvents } = require('./db/utils');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import routes
const newsletterRoutes = require('./routes/newsletter');
const prayerRoutes = require('./routes/prayer');
const contactRoutes = require('./routes/contact');
const eventsRoutes = require('./routes/events');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve static files from client's public assets directory
const clientAssetsPath = path.join(__dirname, '../client/public/assets');
app.use('/assets', express.static(clientAssetsPath));

// API Routes
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/prayer-request', prayerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ATG Chapel API is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize database and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Initialize database schema
    await initDatabase();
    
    // Schedule automatic cleanup of expired events (runs every hour)
    cron.schedule('0 * * * *', async () => {
      console.log('⏰ Running scheduled cleanup of expired events...');
      try {
        const deletedCount = await deleteExpiredEvents();
        if (deletedCount > 0) {
          console.log(`✅ Cleaned up ${deletedCount} expired event(s)`);
        }
      } catch (error) {
        console.error('❌ Scheduled cleanup failed:', error);
      }
    });
    
    // Also run cleanup on startup
    await deleteExpiredEvents();
    
    app.listen(PORT, () => {
      console.log(`📊 Database connected and initialized`);
      console.log(`⏰ Scheduled cleanup job active (runs hourly)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();


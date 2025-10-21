const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
require('dotenv').config();

// Import database utilities
const { initDatabase, deleteExpiredEvents } = require('./db/utils');

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

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    const transporter = createTransporter();

    // 1. Send notification to admin/church
    await transporter.sendMail({
      from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <h2>📬 New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Someone just subscribed to your newsletter on the ATG Chapel Machakos website.</p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">
          This message was sent automatically from your website newsletter form.
        </p>
      `,
    });

    // 2. Send confirmation to subscriber
    await transporter.sendMail({
      from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for subscribing to ATG Chapel Machakos Newsletter!",
      html: `
        <h2>🙏 Thank You for Subscribing!</h2>
        <p>Hi there,</p>
        <p>We're excited to have you as part of the ATG Chapel Machakos community. You'll now receive the latest news, events, and inspiration directly to your inbox.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <br>
        <p>Blessings,<br>ATG Chapel Machakos Team</p>
      `,
    });

    res.json({ message: '✅ Subscription successful! Confirmation sent to your email.' });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ message: '❌ Subscription failed. Please try again.', error: err.message });
  }
});

// Prayer request endpoint
app.post('/api/prayer-request', async (req, res) => {
  const { name, email, request, isPublic } = req.body;
  
  if (!request) {
    return res.status(400).json({ message: 'Prayer request is required.' });
  }

  try {
    const transporter = createTransporter();

    // Send prayer request to church team
    await transporter.sendMail({
      from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: `New Prayer Request from ${name || 'Anonymous'}`,
      html: `
        <h2>🙏 New Prayer Request</h2>
        <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Share publicly:</strong> ${isPublic ? 'Yes' : 'No'}</p>
        <hr>
        <p><strong>Prayer Request:</strong></p>
        <p>${request}</p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">
          This message was sent from the ATG Chapel Machakos prayer request form.
        </p>
      `,
    });

    // Send confirmation email if email provided
    if (email) {
      await transporter.sendMail({
        from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Prayer Request Has Been Received",
        html: `
          <h2>🙏 We're Praying for You</h2>
          <p>Dear ${name || 'Friend'},</p>
          <p>Thank you for sharing your prayer request with ATG Chapel Machakos. Our prayer team has received your request and will be lifting you up in prayer.</p>
          <p><em>"The prayer of a righteous person is powerful and effective." - James 5:16</em></p>
          <br>
          <p>God bless you,<br>ATG Chapel Machakos Prayer Team</p>
        `,
      });
    }

    res.json({ message: 'Prayer request received. Our team will be praying for you.' });
  } catch (err) {
    console.error('Prayer request error:', err);
    res.status(500).json({ message: 'Failed to submit prayer request.', error: err.message });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    const transporter = createTransporter();

    // Send contact message to church
    await transporter.sendMail({
      from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <h2>📧 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">
          This message was sent from the ATG Chapel Machakos contact form.
        </p>
      `,
    });

    // Send acknowledgment to sender
    await transporter.sendMail({
      from: `"ATG Chapel" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We Received Your Message",
      html: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <br>
        <p>Blessings,<br>ATG Chapel Machakos Team</p>
      `,
    });

    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Failed to send message.', error: err.message });
  }
});

// Import events routes
const eventsRoutes = require('./routes/events');
app.use('/api/events', eventsRoutes);

// Import upload routes
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ATG Chapel API is running' });
});

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
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Database connected and initialized`);
      console.log(`⏰ Scheduled cleanup job active (runs hourly)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

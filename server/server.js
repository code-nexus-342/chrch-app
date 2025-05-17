const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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
    res.status(500).json({ message: '❌ Subscription failed. Please try again.', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
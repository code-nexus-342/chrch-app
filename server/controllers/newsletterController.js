const { sendEmail } = require('../services/emailService');
const { query } = require('../db/config');

const subscribe = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Email is required.');
  }

  try {
    // 0. Save to database
    try {
      await query(
        'INSERT INTO subscribers (email) VALUES ($1)',
        [email.toLowerCase()]
      );
    } catch (dbError) {
      if (dbError.code === '23505') { // Unique violation
        return res.status(409).json({ message: '⚠️ You are already subscribed!' });
      }
      throw dbError;
    }

    // 1. Send notification to admin
    await sendEmail({
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
    await sendEmail({
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

    res.status(200).json({ message: '✅ Subscription successful! Confirmation sent to your email.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { subscribe };

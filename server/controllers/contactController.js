const { sendEmail } = require('../services/emailService');

const submitContactForm = async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required.');
  }

  try {
    // Send contact message to church
    await sendEmail({
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
    await sendEmail({
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

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContactForm };

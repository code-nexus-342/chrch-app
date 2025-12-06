const { sendEmail } = require('../services/emailService');

const submitPrayerRequest = async (req, res, next) => {
  const { name, email, request, isPublic } = req.body;
  
  if (!request) {
    res.status(400);
    throw new Error('Prayer request is required.');
  }

  try {
    // Send prayer request to church team
    await sendEmail({
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
      await sendEmail({
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

    res.status(200).json({ message: 'Prayer request received. Our team will be praying for you.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitPrayerRequest };

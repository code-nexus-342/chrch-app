const express = require('express');

const router = express.Router();
const PAYSTACK_URL = 'https://api.paystack.co';

const availableChannels = ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer', 'eft', 'apple_pay'];

const paystackRequest = async (path, options = {}) => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error('Paystack is not configured on the server. Add PAYSTACK_SECRET_KEY to the server environment.');
  }

  let response;
  try {
    response = await fetch(`${PAYSTACK_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
  } catch (error) {
    throw new Error(`Unable to reach Paystack: ${error.message}`);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.status) {
    throw new Error(data.message || `Paystack request failed with status ${response.status}`);
  }

  return data;
};

router.post('/initialize', async (req, res, next) => {
  try {
    const { amount, email, channel = 'all' } = req.body;
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: 'Enter a valid donation amount.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (channel !== 'all' && !availableChannels.includes(channel)) {
      return res.status(400).json({ message: 'That payment channel is not supported.' });
    }

    const data = await paystackRequest('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        amount: Math.round(numericAmount * 100),
        email: email.trim(),
        currency: process.env.PAYSTACK_CURRENCY || 'KES',
        ...(channel !== 'all' ? { channels: [channel] } : {}),
        ...(process.env.CLIENT_URL ? { callback_url: `${process.env.CLIENT_URL}/donation/callback` } : {}),
        metadata: {
          purpose: 'Donation to ATG Chapel',
          custom_fields: [
            { display_name: 'Donation purpose', variable_name: 'donation_purpose', value: 'General donation' }
          ]
        }
      })
    });

    return res.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/verify/:reference', async (req, res, next) => {
  try {
    const data = await paystackRequest(`/transaction/verify/${encodeURIComponent(req.params.reference)}`);
    const transaction = data.data;

    return res.json({
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
      paidAt: transaction.paid_at
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

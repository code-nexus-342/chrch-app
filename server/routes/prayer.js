const express = require('express');
const router = express.Router();
const { submitPrayerRequest } = require('../controllers/prayerController');

router.post('/', submitPrayerRequest);

module.exports = router;

const express = require('express');
const router = express.Router();
const { checkAdminAuth } = require('../middleware/authMiddleware');
const eventsController = require('../controllers/eventsController');

// GET all events (public)
router.get('/', eventsController.getAllEvents);

// GET single event by ID (public)
router.get('/:id', eventsController.getEventById);

// POST create new event (admin only)
router.post('/', checkAdminAuth, eventsController.createEvent);

// PUT update event (admin only)
router.put('/:id', checkAdminAuth, eventsController.updateEvent);

// DELETE event (admin only)
router.delete('/:id', checkAdminAuth, eventsController.deleteEvent);

// Cleanup expired events endpoint
router.post('/cleanup/expired', eventsController.cleanupExpired);

module.exports = router;


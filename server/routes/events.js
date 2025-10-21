const express = require('express');
const router = express.Router();
const { query } = require('../db/config');
const { isAdminEmail, deleteExpiredEvents } = require('../db/utils');

// Middleware to check admin email authorization
const checkAdminAuth = async (req, res, next) => {
  const adminEmail = req.body.adminEmail || req.headers['x-admin-email'];
  
  if (!adminEmail) {
    return res.status(401).json({ 
      message: 'Admin email is required for this operation' 
    });
  }
  
  const isAuthorized = await isAdminEmail(adminEmail);
  
  if (!isAuthorized) {
    return res.status(403).json({ 
      message: 'Unauthorized: This email is not authorized to manage events' 
    });
  }
  
  req.adminEmail = adminEmail;
  next();
};

// GET all events (public)
router.get('/', async (req, res) => {
  try {
    // Clean up expired events before fetching
    await deleteExpiredEvents();
    
    const { type, status, featured } = req.query;
    
    let queryText = 'SELECT * FROM events WHERE 1=1';
    const params = [];
    let paramCount = 1;
    
    if (type) {
      queryText += ` AND LOWER(type) = $${paramCount}`;
      params.push(type.toLowerCase());
      paramCount++;
    }
    
    if (status) {
      queryText += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    if (featured !== undefined) {
      queryText += ` AND featured = $${paramCount}`;
      params.push(featured === 'true');
      paramCount++;
    }
    
    queryText += ' ORDER BY event_datetime ASC, created_at DESC';
    
    const result = await query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ 
      message: 'Failed to fetch events',
      error: error.message 
    });
  }
});

// GET single event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ 
      message: 'Failed to fetch event',
      error: error.message 
    });
  }
});

// POST create new event (admin only)
router.post('/', checkAdminAuth, async (req, res) => {
  try {
    const {
      title,
      type,
      date,
      event_datetime,
      venue,
      host,
      contact,
      description,
      images,
      featured,
      status
    } = req.body;
    
    // Validation
    if (!title || !type || !date || !event_datetime || !venue || !host || !contact || !description) {
      return res.status(400).json({ 
        message: 'All required fields must be provided' 
      });
    }
    
    // Parse and validate event_datetime
    const eventDate = new Date(event_datetime);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ 
        message: 'Invalid event_datetime format. Use ISO 8601 format (e.g., 2025-03-07T14:00:00)' 
      });
    }
    
    // Check if event is in the past
    if (eventDate < new Date()) {
      return res.status(400).json({ 
        message: 'Event datetime cannot be in the past' 
      });
    }
    
    const result = await query(
      `INSERT INTO events 
       (title, type, date, event_datetime, venue, host, contact, description, images, featured, status, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [
        title,
        type,
        date,
        eventDate,
        venue,
        host,
        contact,
        description,
        images || [],
        featured || false,
        status || 'upcoming',
        req.adminEmail
      ]
    );
    
    res.status(201).json({
      message: 'Event created successfully',
      event: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      message: 'Failed to create event',
      error: error.message 
    });
  }
});

// PUT update event (admin only)
router.put('/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      date,
      event_datetime,
      venue,
      host,
      contact,
      description,
      images,
      featured,
      status
    } = req.body;
    
    // Check if event exists
    const existingEvent = await query('SELECT id FROM events WHERE id = $1', [id]);
    if (existingEvent.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(title);
      paramCount++;
    }
    if (type !== undefined) {
      updates.push(`type = $${paramCount}`);
      values.push(type);
      paramCount++;
    }
    if (date !== undefined) {
      updates.push(`date = $${paramCount}`);
      values.push(date);
      paramCount++;
    }
    if (event_datetime !== undefined) {
      const eventDate = new Date(event_datetime);
      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({ 
          message: 'Invalid event_datetime format' 
        });
      }
      updates.push(`event_datetime = $${paramCount}`);
      values.push(eventDate);
      paramCount++;
    }
    if (venue !== undefined) {
      updates.push(`venue = $${paramCount}`);
      values.push(venue);
      paramCount++;
    }
    if (host !== undefined) {
      updates.push(`host = $${paramCount}`);
      values.push(host);
      paramCount++;
    }
    if (contact !== undefined) {
      updates.push(`contact = $${paramCount}`);
      values.push(contact);
      paramCount++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (images !== undefined) {
      updates.push(`images = $${paramCount}`);
      values.push(images);
      paramCount++;
    }
    if (featured !== undefined) {
      updates.push(`featured = $${paramCount}`);
      values.push(featured);
      paramCount++;
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    
    const queryText = `
      UPDATE events 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount}
      RETURNING *
    `;
    
    const result = await query(queryText, values);
    
    res.json({
      message: 'Event updated successfully',
      event: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ 
      message: 'Failed to update event',
      error: error.message 
    });
  }
});

// DELETE event (admin only)
router.delete('/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM events WHERE id = $1 RETURNING id, title',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({
      message: 'Event deleted successfully',
      event: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ 
      message: 'Failed to delete event',
      error: error.message 
    });
  }
});

// Cleanup expired events endpoint (can be called manually or via cron)
router.post('/cleanup/expired', async (req, res) => {
  try {
    const deletedCount = await deleteExpiredEvents();
    res.json({
      message: 'Cleanup completed',
      deletedCount
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    res.status(500).json({ 
      message: 'Cleanup failed',
      error: error.message 
    });
  }
});

module.exports = router;

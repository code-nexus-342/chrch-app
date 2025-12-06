const { query } = require('../db/config');
const { deleteExpiredEvents } = require('../db/utils');
const { sendEmail } = require('../services/emailService');

const getAllEvents = async (req, res, next) => {
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
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
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

    // Broadcast to subscribers (fire and forget)
    const subscribers = await query('SELECT email FROM subscribers');
    if (subscribers.rows.length > 0) {
      // console.log(`📢 Broadcasting event to ${subscribers.rows.length} subscribers...`);
      const event = result.rows[0];
      
      // Send asynchronously
      Promise.allSettled(subscribers.rows.map(sub => 
        sendEmail({
          to: sub.email,
          subject: `✨ New Event: ${title}`,
          html: `
            <h2>📅 New Event at ATG Chapel!</h2>
            <p>We are excited to announce a new upcoming event:</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
              <h3 style="color: #333; margin-top: 0;">${title}</h3>
              <p><strong>🗓 Date:</strong> ${date}</p>
              <p><strong>📍 Venue:</strong> ${venue}</p>
              <p><strong>⏰ Time:</strong> ${new Date(event.event_datetime).toLocaleTimeString()}</p>
              <p>${description}</p>
            </div>
            <p>We hope to see you there!</p>
            <a href="${process.env.CLIENT_URL || '#'}/events" style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">View Event Details</a>
          `
        })
      )).then(results => {
        const successCount = results.filter(r => r.status === 'fulfilled').length;
        console.log(`✅ Broadcast complete. Sent to ${successCount}/${subscribers.rows.length} subscribers.`);
      });
    }
    
    res.status(201).json({
      message: 'Event created successfully',
      event: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
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
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
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
    next(error);
  }
};

const cleanupExpired = async (req, res, next) => {
  try {
    const deletedCount = await deleteExpiredEvents();
    res.json({
      message: 'Cleanup completed',
      deletedCount
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  cleanupExpired
};

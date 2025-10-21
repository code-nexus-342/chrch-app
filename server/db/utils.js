const { query, pool } = require('./config');
const fs = require('fs');
const path = require('path');

/**
 * Initialize the database schema
 */
async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    await pool.query(schema);
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Delete expired events
 */
async function deleteExpiredEvents() {
  try {
    const result = await query(
      'DELETE FROM events WHERE event_datetime < NOW() AND status = $1 RETURNING id, title',
      ['upcoming']
    );
    
    if (result.rowCount > 0) {
      console.log(`🗑️  Deleted ${result.rowCount} expired event(s):`, 
        result.rows.map(r => `${r.id}: ${r.title}`).join(', ')
      );
    }
    
    return result.rowCount;
  } catch (error) {
    console.error('Error deleting expired events:', error);
    throw error;
  }
}

/**
 * Check if email is authorized admin
 */
async function isAdminEmail(email) {
  try {
    const result = await query(
      'SELECT id FROM admin_users WHERE email = $1',
      [email.toLowerCase()]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error checking admin email:', error);
    return false;
  }
}

/**
 * Add an admin user
 */
async function addAdminUser(email, name) {
  try {
    const result = await query(
      'INSERT INTO admin_users (email, name) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING id',
      [email.toLowerCase(), name]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error adding admin user:', error);
    throw error;
  }
}

module.exports = {
  initDatabase,
  deleteExpiredEvents,
  isAdminEmail,
  addAdminUser,
};

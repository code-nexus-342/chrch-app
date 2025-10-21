require('dotenv').config();
const { addAdminUser, initDatabase } = require('./db/utils');
const { pool } = require('./db/config');

/**
 * Setup script to initialize database and add the admin user from .env
 */
async function setupAdmin() {
  try {
    console.log('🔄 Initializing database...');
    
    // Initialize database schema first
    await initDatabase();
    
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error('❌ ADMIN_EMAIL not found in .env file');
      process.exit(1);
    }
    
    console.log(`🔧 Setting up admin user: ${adminEmail}`);
    
    const added = await addAdminUser(adminEmail, 'ATG Admin');
    
    if (added) {
      console.log('✅ Admin user added successfully');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    console.log('✅ Setup complete!');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    await pool.end();
    process.exit(1);
  }
}

setupAdmin();

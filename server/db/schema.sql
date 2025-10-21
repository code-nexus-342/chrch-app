-- ATG Chapel Events Database Schema

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  date VARCHAR(100) NOT NULL,
  event_datetime TIMESTAMP NOT NULL, -- Actual datetime for auto-deletion
  venue VARCHAR(255) NOT NULL,
  host VARCHAR(255) NOT NULL,
  contact VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on event_datetime for efficient cleanup queries
CREATE INDEX IF NOT EXISTS idx_events_datetime ON events(event_datetime);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Create a function to automatically delete expired events
CREATE OR REPLACE FUNCTION delete_expired_events()
RETURNS void AS $$
BEGIN
  DELETE FROM events 
  WHERE event_datetime < NOW() 
  AND status = 'upcoming';
  
  -- Optionally, mark as 'past' instead of deleting
  -- UPDATE events 
  -- SET status = 'past' 
  -- WHERE event_datetime < NOW() 
  -- AND status = 'upcoming';
END;
$$ LANGUAGE plpgsql;

-- Create admin_users table for event management authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin email (update this with your admin email)
-- INSERT INTO admin_users (email, name) VALUES ('admin@atgchapel.org', 'ATG Admin');

-- Grant necessary permissions (if needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON events TO your_user;
-- GRANT SELECT ON admin_users TO your_user;

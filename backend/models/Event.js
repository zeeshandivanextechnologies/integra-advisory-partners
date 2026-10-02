const db = require('../config/db');

// Events listed on the website Events page, written in the admin.
// register_url: optional; when empty the website uses its Register Interest form
const createEventTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      format VARCHAR(100) NOT NULL,
      event_date DATE NOT NULL,
      event_time VARCHAR(100) DEFAULT '',
      location VARCHAR(255) DEFAULT '',
      mode VARCHAR(100) DEFAULT '',
      register_url TEXT DEFAULT '',
      status VARCHAR(20) NOT NULL DEFAULT 'draft',
      created_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  // block Supabase's public REST API; the backend's own connection is not affected
  await db.query('ALTER TABLE events ENABLE ROW LEVEL SECURITY');
};

module.exports = {
  createEventTable,
};

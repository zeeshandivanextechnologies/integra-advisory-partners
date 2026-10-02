const db = require('../config/db');

const createAdminTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  // block Supabase's public REST API; the backend's own connection is not affected
  await db.query('ALTER TABLE admins ENABLE ROW LEVEL SECURITY');
  // display name for the admin header and profile (added later; safe to re-run)
  await db.query("ALTER TABLE admins ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT ''");
};

module.exports = {
  createAdminTable,
};
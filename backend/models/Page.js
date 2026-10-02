const db = require('../config/db');

// One row per website page (home, about, ...). The whole page content is
// stored as JSON so the admin editor and the website share one shape.
const createPageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS pages (
      slug VARCHAR(50) PRIMARY KEY,
      content JSONB NOT NULL,
      updated_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  // block Supabase's public REST API; the backend's own connection is not affected
  await db.query('ALTER TABLE pages ENABLE ROW LEVEL SECURITY');
};

module.exports = {
  createPageTable,
};

const db = require('../config/db');

// Insights articles written in the admin.
// body: JSON blocks [{ type: 'p' | 'h2', text } | { type: 'list', items: [] }]
// url: optional; when set, the website links to that page instead of an article page
const createArticleTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(160) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      published_on DATE NOT NULL DEFAULT CURRENT_DATE,
      read_time VARCHAR(50) DEFAULT '',
      excerpt TEXT DEFAULT '',
      body JSONB NOT NULL DEFAULT '[]',
      url TEXT DEFAULT '',
      status VARCHAR(20) NOT NULL DEFAULT 'draft',
      created_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  // block Supabase's public REST API; the backend's own connection is not affected
  await db.query('ALTER TABLE articles ENABLE ROW LEVEL SECURITY');
};

module.exports = {
  createArticleTable,
};

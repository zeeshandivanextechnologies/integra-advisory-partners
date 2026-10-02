const db = require('../config/db');

// Returns null when the page has never been saved from the admin
const getPage = async (slug) => {
  const result = await db.query(
    'SELECT slug, content, updated_at FROM pages WHERE slug = $1',
    [slug]
  );
  return result.rows[0] || null;
};

const savePage = async (slug, content, adminId) => {
  const result = await db.query(
    `INSERT INTO pages (slug, content, updated_by)
     VALUES ($1, $2, $3)
     ON CONFLICT (slug)
     DO UPDATE SET content = EXCLUDED.content,
                   updated_by = EXCLUDED.updated_by,
                   updated_at = CURRENT_TIMESTAMP
     RETURNING slug, content, updated_at`,
    [slug, JSON.stringify(content), adminId]
  );
  return result.rows[0];
};

module.exports = {
  getPage,
  savePage,
};

const db = require('../config/db');

// published_on comes back as YYYY-MM-DD so the website can format it as before
const COLUMNS = `
  id, slug, title, category,
  to_char(published_on, 'YYYY-MM-DD') AS date,
  read_time AS "readTime", excerpt, body, url, status,
  created_at AS "createdAt", updated_at AS "updatedAt"
`;

const notFound = () => {
  const error = new Error('Article not found');
  error.status = 404;
  return error;
};

const slugTaken = () => {
  const error = new Error('Another article already uses this slug');
  error.status = 409;
  return error;
};

// newest first
const listArticles = async ({ publishedOnly }) => {
  const result = await db.query(
    `SELECT ${COLUMNS} FROM articles
     ${publishedOnly ? "WHERE status = 'published'" : ''}
     ORDER BY published_on DESC, created_at DESC`
  );
  return result.rows;
};

const getPublishedBySlug = async (slug) => {
  const result = await db.query(
    `SELECT ${COLUMNS} FROM articles WHERE slug = $1 AND status = 'published'`,
    [slug]
  );
  if (result.rows.length === 0) throw notFound();
  return result.rows[0];
};

const getById = async (id) => {
  const result = await db.query(`SELECT ${COLUMNS} FROM articles WHERE id = $1`, [id]);
  if (result.rows.length === 0) throw notFound();
  return result.rows[0];
};

const values = (article) => [
  article.slug,
  article.title,
  article.category,
  article.date,
  article.readTime || '',
  article.excerpt || '',
  JSON.stringify(article.body || []),
  article.url || '',
  article.status,
];

const createArticle = async (article, adminId) => {
  try {
    const result = await db.query(
      `INSERT INTO articles
         (slug, title, category, published_on, read_time, excerpt, body, url, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id`,
      [...values(article), adminId]
    );
    return getById(result.rows[0].id);
  } catch (err) {
    if (err.code === '23505') throw slugTaken();
    throw err;
  }
};

const updateArticle = async (id, article) => {
  try {
    const result = await db.query(
      `UPDATE articles SET
         slug = $1, title = $2, category = $3, published_on = $4, read_time = $5,
         excerpt = $6, body = $7, url = $8, status = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING id`,
      [...values(article), id]
    );
    if (result.rows.length === 0) throw notFound();
    return getById(id);
  } catch (err) {
    if (err.code === '23505') throw slugTaken();
    throw err;
  }
};

const deleteArticle = async (id) => {
  const result = await db.query('DELETE FROM articles WHERE id = $1 RETURNING id', [id]);
  if (result.rows.length === 0) throw notFound();
};

module.exports = {
  listArticles,
  getPublishedBySlug,
  getById,
  createArticle,
  updateArticle,
  deleteArticle,
};

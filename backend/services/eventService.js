const db = require('../config/db');

// event_date comes back as YYYY-MM-DD, the format the website compares and shows
const COLUMNS = `
  id, title, format,
  to_char(event_date, 'YYYY-MM-DD') AS date,
  event_time AS time, location, mode,
  register_url AS "registerUrl", status,
  created_at AS "createdAt", updated_at AS "updatedAt"
`;

const notFound = () => {
  const error = new Error('Event not found');
  error.status = 404;
  return error;
};

// soonest first; the website hides past dates itself
const listEvents = async ({ publishedOnly }) => {
  const result = await db.query(
    `SELECT ${COLUMNS} FROM events
     ${publishedOnly ? "WHERE status = 'published'" : ''}
     ORDER BY event_date ASC, created_at ASC`
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`SELECT ${COLUMNS} FROM events WHERE id = $1`, [id]);
  if (result.rows.length === 0) throw notFound();
  return result.rows[0];
};

const values = (event) => [
  event.title,
  event.format,
  event.date,
  event.time || '',
  event.location || '',
  event.mode || '',
  event.registerUrl || '',
  event.status,
];

const createEvent = async (event, adminId) => {
  const result = await db.query(
    `INSERT INTO events
       (title, format, event_date, event_time, location, mode, register_url, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [...values(event), adminId]
  );
  return getById(result.rows[0].id);
};

const updateEvent = async (id, event) => {
  const result = await db.query(
    `UPDATE events SET
       title = $1, format = $2, event_date = $3, event_time = $4, location = $5,
       mode = $6, register_url = $7, status = $8, updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING id`,
    [...values(event), id]
  );
  if (result.rows.length === 0) throw notFound();
  return getById(id);
};

const deleteEvent = async (id) => {
  const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
  if (result.rows.length === 0) throw notFound();
};

module.exports = {
  listEvents,
  getById,
  createEvent,
  updateEvent,
  deleteEvent,
};

const db = require('../config/db');

// website pages that can be edited in the admin (Settings is separate)
const EDITABLE_PAGES = [
  'home',
  'about',
  'services',
  'packages',
  'process',
  'insights',
  'events',
  'deposit',
  'payment-success',
];

const toCounts = (rows) =>
  Object.fromEntries(rows.map((row) => [row.key, Number(row.count)]));

// the last `count` months, oldest first, as YYYY-MM
const lastMonths = (count) => {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (count - 1 - index), 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
};

const getDashboard = async () => {
  const months = lastMonths(6);

  const [
    articleStatus,
    articlesPerMonth,
    eventStatus,
    upcomingCount,
    eventsByFormat,
    upcomingEvents,
    savedPages,
    recentUpdates,
  ] = await Promise.all([
    db.query('SELECT status AS key, COUNT(*) AS count FROM articles GROUP BY status'),
    db.query(
      `SELECT to_char(published_on, 'YYYY-MM') AS key, COUNT(*) AS count
       FROM articles
       WHERE status = 'published' AND to_char(published_on, 'YYYY-MM') = ANY($1)
       GROUP BY key`,
      [months]
    ),
    db.query('SELECT status AS key, COUNT(*) AS count FROM events GROUP BY status'),
    db.query(
      "SELECT COUNT(*) AS count FROM events WHERE status = 'published' AND event_date >= CURRENT_DATE"
    ),
    db.query(
      `SELECT format AS key, COUNT(*) AS count
       FROM events WHERE event_date >= CURRENT_DATE
       GROUP BY format ORDER BY count DESC, format ASC`
    ),
    db.query(
      `SELECT id, title, format, to_char(event_date, 'YYYY-MM-DD') AS date,
              event_time AS time, location, status
       FROM events
       WHERE event_date >= CURRENT_DATE
       ORDER BY event_date ASC, created_at ASC
       LIMIT 4`
    ),
    db.query('SELECT slug, updated_at AS "updatedAt" FROM pages WHERE slug = ANY($1)', [
      EDITABLE_PAGES,
    ]),
    db.query(
      `SELECT * FROM (
         SELECT 'page' AS type, slug AS ref, slug AS title, 'saved' AS status, updated_at
         FROM pages
         UNION ALL
         SELECT 'article', id::text, title, status, updated_at FROM articles
         UNION ALL
         SELECT 'event', id::text, title, status, updated_at FROM events
       ) AS updates
       ORDER BY updated_at DESC
       LIMIT 6`
    ),
  ]);

  const articles = toCounts(articleStatus.rows);
  const events = toCounts(eventStatus.rows);
  const perMonth = toCounts(articlesPerMonth.rows);

  return {
    articles: {
      published: articles.published || 0,
      drafts: articles.draft || 0,
      perMonth: months.map((month) => ({ month, value: perMonth[month] || 0 })),
    },
    events: {
      upcoming: Number(upcomingCount.rows[0].count),
      published: events.published || 0,
      drafts: events.draft || 0,
      byFormat: eventsByFormat.rows.map((row) => ({ name: row.key, count: Number(row.count) })),
      next: upcomingEvents.rows,
    },
    pages: {
      total: EDITABLE_PAGES.length,
      saved: savedPages.rows,
    },
    recentUpdates: recentUpdates.rows.map((row) => ({
      type: row.type,
      ref: row.ref,
      title: row.title,
      status: row.status,
      updatedAt: row.updated_at,
    })),
  };
};

module.exports = {
  getDashboard,
};

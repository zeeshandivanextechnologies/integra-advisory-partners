const db = require('../config/db');

// page slug -> name used in messages and the admin editor it opens
const PAGE_NAMES = {
  home: 'Home Page',
  about: 'About Page',
  services: 'Services Page',
  packages: 'Packages Page',
  process: 'Process Page',
  insights: 'Insights Page',
  events: 'Events Page',
  deposit: 'Deposit Page',
  'payment-success': 'Payment Success Page',
  settings: 'Website settings',
};

const pageLink = (slug) => (slug === 'settings' ? '/settings' : `/pages/${slug}`);

// saved within a few seconds of being created = a new item, not an edit
const isNew = (row) => Math.abs(new Date(row.updated_at) - new Date(row.created_at)) < 5000;

const statusText = (status) => (status === 'published' ? 'published' : 'saved as a draft');

const daysText = (days) => {
  if (days === 0) return 'is today';
  if (days === 1) return 'is tomorrow';
  return `is in ${days} days`;
};

// Notifications built from what the admin saves (pages, articles, events) plus
// reminders for published events in the next 7 days. Nothing is stored: the
// id changes whenever the item is saved again, so the admin sees it as new.
const getNotifications = async (limit) => {
  const [pages, articles, events, soon] = await Promise.all([
    db.query('SELECT slug, updated_at FROM pages ORDER BY updated_at DESC LIMIT $1', [limit]),
    db.query(
      'SELECT id, title, status, created_at, updated_at FROM articles ORDER BY updated_at DESC LIMIT $1',
      [limit]
    ),
    db.query(
      'SELECT id, title, status, created_at, updated_at FROM events ORDER BY updated_at DESC LIMIT $1',
      [limit]
    ),
    db.query(
      `SELECT id, title, to_char(event_date, 'YYYY-MM-DD') AS date,
              (event_date - CURRENT_DATE) AS days
       FROM events
       WHERE status = 'published'
         AND event_date >= CURRENT_DATE
         AND event_date <= CURRENT_DATE + 7
       ORDER BY event_date ASC`
    ),
  ]);

  const stamp = (value) => new Date(value).getTime();

  const updates = [
    ...pages.rows.map((row) => ({
      id: `page-${row.slug}-${stamp(row.updated_at)}`,
      type: 'page',
      message: `${PAGE_NAMES[row.slug] || row.slug} ${row.slug === 'settings' ? 'were' : 'was'} updated.`,
      time: row.updated_at,
      link: pageLink(row.slug),
    })),
    ...articles.rows.map((row) => ({
      id: `article-${row.id}-${stamp(row.updated_at)}`,
      type: 'article',
      message: isNew(row)
        ? `New article "${row.title}" was ${statusText(row.status)}.`
        : `Article "${row.title}" was updated (${row.status === 'published' ? 'published' : 'draft'}).`,
      time: row.updated_at,
      link: `/articles/${row.id}`,
    })),
    ...events.rows.map((row) => ({
      id: `event-${row.id}-${stamp(row.updated_at)}`,
      type: 'event',
      message: isNew(row)
        ? `New event "${row.title}" was ${statusText(row.status)}.`
        : `Event "${row.title}" was updated (${row.status === 'published' ? 'published' : 'draft'}).`,
      time: row.updated_at,
      link: `/events/${row.id}`,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, limit);

  // reminders come first; their id includes the date so a moved event shows again
  const reminders = soon.rows.map((row) => ({
    id: `event-soon-${row.id}-${row.date}`,
    type: 'alert',
    message: `"${row.title}" ${daysText(Number(row.days))}. Check the details are final.`,
    time: null,
    date: row.date,
    link: `/events/${row.id}`,
  }));

  return [...reminders, ...updates].slice(0, limit);
};

module.exports = {
  getNotifications,
};

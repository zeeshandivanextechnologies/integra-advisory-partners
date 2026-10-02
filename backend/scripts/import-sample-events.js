/*
 * Import the three sample events that were written into the website
 * (frontend/src/constants/events.js) so they can be edited in the admin.
 * They come in as drafts, so the website does not show them until they
 * are published from the admin.
 *
 * Usage (from the backend folder):  node scripts/import-sample-events.js
 *
 * Safe to run more than once: an event with the same title and date is skipped.
 */
require('dotenv').config();
const db = require('../config/db');
const { createEventTable } = require('../models/Event');

const events = [
  {
    title: 'Market entry into Qatar: a briefing for U.S. founders',
    format: 'Webinar',
    date: '2026-11-12',
    time: '11:00 AM EST',
    location: 'Online',
    mode: 'Online',
  },
  {
    title: 'Integra Nights: Doha',
    format: 'Integra Nights',
    date: '2026-11-26',
    time: '7:00 PM AST',
    location: 'Doha, Qatar',
    mode: 'In person',
  },
  {
    title: 'Regulatory and KYC readiness: sector briefing',
    format: 'Sector Briefing',
    date: '2026-12-10',
    time: '12:00 PM AST',
    location: 'Online',
    mode: 'Online',
  },
];

const run = async () => {
  await createEventTable();
  const admin = await db.query('SELECT id FROM admins ORDER BY id LIMIT 1');
  const adminId = admin.rows[0] ? admin.rows[0].id : null;

  for (const event of events) {
    const existing = await db.query(
      'SELECT id FROM events WHERE title = $1 AND event_date = $2',
      [event.title, event.date]
    );
    if (existing.rows.length > 0) {
      console.log('skipped (already there)', event.title);
      continue;
    }

    await db.query(
      `INSERT INTO events
         (title, format, event_date, event_time, location, mode, register_url, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, '', 'draft', $7)`,
      [event.title, event.format, event.date, event.time, event.location, event.mode, adminId]
    );
    console.log('imported as draft', event.title);
  }
};

run()
  .catch((err) => {
    console.error('Import failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.pool.end());

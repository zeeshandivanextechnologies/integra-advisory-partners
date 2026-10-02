/*
 * Import the three Insights articles that were written into the website
 * (frontend/src/constants/articles.js) so they can be edited in the admin.
 *
 * Usage (from the backend folder):  node scripts/import-sample-articles.js
 *
 * Safe to run more than once: an article whose slug already exists is skipped.
 */
require('dotenv').config();
const db = require('../config/db');
const { createArticleTable } = require('../models/Article');

const articles = [
  {
    slug: 'what-to-know-before-entering-qatar-and-the-gcc',
    title: 'What to know before entering Qatar and the GCC',
    category: 'market',
    date: '2026-10-01',
    readTime: '4 min read',
    excerpt:
      'Expanding into the GCC is not just a market-research exercise. These are the questions to answer before major capital is committed.',
    body: [
      {
        type: 'p',
        text: 'Opportunity reports make the GCC look simple. The reality for founders is a set of practical decisions about cost, structure, documents, banking, and partners, and each one affects whether the opportunity is worth pursuing.',
      },
      { type: 'h2', text: 'The questions that matter first' },
      {
        type: 'list',
        items: [
          'What to expect in the first 12 months',
          'Which documents matter, and which are still missing',
          'What partnerships should be pursued',
          'Where regulatory friction may appear',
          'Whether the opportunity is worth pursuing before major capital is committed',
        ],
      },
      { type: 'h2', text: 'Look beyond the polished reports' },
      {
        type: 'p',
        text: 'Founders need to understand operating costs, incorporation pathways, KYC expectations, banking timelines, regulatory friction, and partner risk. These are the real conditions behind the headline numbers, and they are where local judgment makes the difference.',
      },
      { type: 'h2', text: 'Turn uncertainty into a practical plan' },
      {
        type: 'p',
        text: 'A structured market-entry review brings these questions together early, so you leave with a practical entry plan rather than another report.',
      },
    ],
  },
  {
    slug: 'documents-to-prepare-before-kyc-and-bank-conversations',
    title: 'Documents to prepare before KYC and bank conversations',
    category: 'regulatory',
    date: '2026-09-24',
    readTime: '3 min read',
    excerpt:
      'Knowing what you have, what is missing, and what must be addressed before formal filings saves time once the process starts.',
    body: [
      {
        type: 'p',
        text: 'Before formal filings or bank-facing conversations, it helps to know exactly what you have, what is missing, and what must be addressed. That is the purpose of a regulatory and KYC readiness review.',
      },
      { type: 'h2', text: 'Documents founders are commonly asked about' },
      {
        type: 'list',
        items: [
          'Business registration',
          'Articles',
          'Financial statements',
          'KYC documents',
          'Pitch deck',
          'Business plan',
        ],
      },
      { type: 'h2', text: 'Set realistic expectations' },
      {
        type: 'p',
        text: 'Incorporation, visa/Iqama, document, and bank-readiness steps work best with clear milestones and realistic expectations. Bank approval is never guaranteed.',
      },
      {
        type: 'p',
        text: 'Requirements differ by jurisdiction and situation. Integra provides business and regulatory-navigation advisory and refers legal questions to licensed counsel in the relevant jurisdiction.',
      },
    ],
  },
  {
    slug: 'inside-integra-nights',
    title: 'Inside Integra Nights: networking with real follow-up',
    category: 'events',
    date: '2026-09-17',
    readTime: '2 min read',
    excerpt:
      'Integra Nights is a structured networking series built to move beyond casual introductions.',
    body: [
      {
        type: 'p',
        text: 'Integra Nights is a structured networking series that moves beyond casual introductions and helps participants build relationships that lead somewhere.',
      },
      { type: 'h2', text: 'What participants do' },
      {
        type: 'list',
        items: ['Present their business', 'Identify mentors', 'Create real follow-up opportunities'],
      },
      {
        type: 'p',
        text: 'It reflects a core Integra principle: structured introductions to relevant ecosystem partners instead of unfocused networking.',
      },
    ],
  },
];

const run = async () => {
  await createArticleTable();
  const admin = await db.query('SELECT id FROM admins ORDER BY id LIMIT 1');
  const adminId = admin.rows[0] ? admin.rows[0].id : null;

  for (const article of articles) {
    const result = await db.query(
      `INSERT INTO articles
         (slug, title, category, published_on, read_time, excerpt, body, url, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, '', 'published', $8)
       ON CONFLICT (slug) DO NOTHING
       RETURNING id`,
      [
        article.slug,
        article.title,
        article.category,
        article.date,
        article.readTime,
        article.excerpt,
        JSON.stringify(article.body),
        adminId,
      ]
    );
    console.log(result.rows.length ? 'imported' : 'skipped (already there)', article.slug);
  }
};

run()
  .catch((err) => {
    console.error('Import failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.pool.end());

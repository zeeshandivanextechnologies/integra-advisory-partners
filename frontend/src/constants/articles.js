/*
 * Insights articles.
 *
 * category: 'market' | 'regulatory' | 'events' | 'investor'
 * slug: used for the article page at /insights/<slug>
 * body: blocks of { type: 'p' | 'h2' | 'list', text | items }
 * url: optional, link to an external article instead of an article page
 *
 * Add the client's real articles to the `articles` array at the bottom.
 * The draft articles are sample content written from Deliverable 01. They
 * show only in development (npm run dev) with a "Draft" label and are not
 * included in the live build. Delete them once real articles are added.
 */

// Sample content, compiled only into development builds (removed from the live build)
const draftArticles = import.meta.env.DEV
  ? [
      {
        draft: true,
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
        draft: true,
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
        draft: true,
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
            items: [
              'Present their business',
              'Identify mentors',
              'Create real follow-up opportunities',
            ],
          },
          {
            type: 'p',
            text: 'It reflects a core Integra principle: structured introductions to relevant ecosystem partners instead of unfocused networking.',
          },
        ],
      },
    ]
  : []

// Real content from the client goes here.
// Articles are now written in the admin (Articles) and stored in the backend;
// this list is only used when the backend cannot be reached or has no
// published articles. The samples above were imported into the backend with
// backend/scripts/import-sample-articles.js.
const articles = []

export default [...articles, ...draftArticles]

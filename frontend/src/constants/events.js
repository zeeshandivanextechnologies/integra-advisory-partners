/*
 * Upcoming events. Past events are hidden automatically.
 *
 * format: 'Webinar' | 'Integra Nights' | 'Discovery Visit' | 'Sector Briefing'
 * date: 'YYYY-MM-DD'
 * registerUrl: optional, falls back to the Register Interest form
 *
 * Add the client's real events to the `events` array at the bottom.
 * The draft events are sample content for layout only. They show only in
 * development (npm run dev) with a "Draft" label and are not included in
 * the live build. Delete them once real events are added.
 */

// Sample content, compiled only into development builds (removed from the live build)
const draftEvents = import.meta.env.DEV
  ? [
      {
        draft: true,
        title: 'Market entry into Qatar: a briefing for U.S. founders',
        format: 'Webinar',
        date: '2026-11-12',
        time: '11:00 AM EST',
        location: 'Online',
        mode: 'Online',
      },
      {
        draft: true,
        title: 'Integra Nights: Doha',
        format: 'Integra Nights',
        date: '2026-11-26',
        time: '7:00 PM AST',
        location: 'Doha, Qatar',
        mode: 'In person',
      },
      {
        draft: true,
        title: 'Regulatory and KYC readiness: sector briefing',
        format: 'Sector Briefing',
        date: '2026-12-10',
        time: '12:00 PM AST',
        location: 'Online',
        mode: 'Online',
      },
    ]
  : []

// Real content from the client goes here
const events = []

export default [...events, ...draftEvents]

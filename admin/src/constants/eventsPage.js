// Default Events page content, used until the page is saved to the backend.
// Content matches what the website's Events page (frontend/src/pages/Events.jsx) shows today.
// The events themselves are not part of this; they are managed under Events.

const eventsPage = {
  banner: {
    visible: true,
    title: 'Events that create real connections, not just introductions.',
    text: 'Webinars, Integra Nights, discovery visits, and sector briefings for founders, investors, and partners exploring Qatar and the GCC.',
  },

  formats: {
    visible: true,
    eyebrow: 'Event Formats',
    heading: 'Four ways to connect with Integra.',
    items: [
      {
        id: 'fmt-1',
        icon: 'FiMonitor',
        title: 'Webinars',
        text: 'Online sessions on market entry, regulation, and investor readiness for Qatar and the GCC.',
        tag: 'Online',
      },
      {
        id: 'fmt-2',
        icon: 'FiMoon',
        title: 'Integra Nights',
        text: 'A structured networking series that moves beyond casual introductions.',
        tag: 'In person',
      },
      {
        id: 'fmt-3',
        icon: 'FiMapPin',
        title: 'Discovery Visits',
        text: 'Guided visits for founders and investors exploring Qatar and the wider GCC on the ground.',
        tag: 'In person',
      },
      {
        id: 'fmt-4',
        icon: 'FiBarChart2',
        title: 'Sector Briefings',
        text: 'Focused briefings on specific sectors, opportunities, and the conditions behind them.',
        tag: 'Online & in person',
      },
    ],
  },

  spotlight: {
    visible: true,
    eyebrow: 'Signature Series',
    title: 'Integra Nights',
    text: 'A structured networking series that moves beyond casual introductions and helps participants present their business, identify mentors, and create real follow-up opportunities.',
    buttonLabel: 'Register Interest',
    sideLabel: 'What participants do',
    outcomes: [
      { id: 'out-1', text: 'Present your business' },
      { id: 'out-2', text: 'Identify mentors' },
      { id: 'out-3', text: 'Create real follow-up opportunities' },
    ],
  },

  upcoming: {
    visible: true,
    eyebrow: 'Upcoming Events',
    heading: 'Be the first to know.',
    lead: 'New dates for webinars, Integra Nights, discovery visits, and sector briefings are announced to registered contacts first.',
    registerLabel: 'Register',
    // shown when no upcoming event is published
    emptyTitle: 'No dates announced yet',
    emptyText:
      'Register your interest and Integra will share upcoming event details with you as soon as they are confirmed.',
    emptyButtonLabel: 'Register Interest',
  },

  cta: {
    visible: true,
    title: 'Want to host or partner on an Integra event?',
    text: 'Law firms, banks, trade missions, embassies, accelerators, and ecosystem partners are welcome to get in touch.',
    buttonLabel: 'Register Interest',
    secondaryLabel: 'Read Event Recaps',
    secondaryLink: '/insights',
  },

  seo: {
    title: 'Events',
    description:
      'Webinars, Integra Nights, discovery visits, and sector briefings for founders and investors exploring Qatar and the GCC.',
  },
}

export default eventsPage

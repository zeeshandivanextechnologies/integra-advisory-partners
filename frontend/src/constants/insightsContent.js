// Default Insights page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/insightsPage.js.
// Articles are not part of this; they come from constants/articles.js.

const insightsContent = {
  banner: {
    visible: true,
    title: 'Market-entry insight for serious GCC operators.',
    text: 'Market-entry notes, regulatory explainers, event recaps, and investor-readiness guidance for founders and investors exploring Qatar and the GCC.',
  },

  publish: {
    visible: true,
    eyebrow: 'What We Publish',
    heading: 'Four kinds of insight, one practical focus.',
    // key links articles and topics to a category; it never changes once set
    categories: [
      {
        id: 'cat-market',
        key: 'market',
        icon: 'FiBookOpen',
        title: 'Market Notes',
        text: 'Practical notes on entering Qatar, Saudi Arabia, the UAE, and the wider GCC.',
      },
      {
        id: 'cat-regulatory',
        key: 'regulatory',
        icon: 'FiShield',
        title: 'Regulatory Guides',
        text: 'Plain-language guides to incorporation, KYC expectations, and regulatory friction.',
      },
      {
        id: 'cat-events',
        key: 'events',
        icon: 'FiMic',
        title: 'Event Recaps',
        text: 'Key takeaways from Integra Nights, webinars, discovery visits, and sector briefings.',
      },
      {
        id: 'cat-investor',
        key: 'investor',
        icon: 'FiTrendingUp',
        title: 'Investor Readiness',
        text: 'What banks, partners, and investors will expect to see before they commit.',
      },
    ],
  },

  // shown only when there are articles
  latest: {
    visible: true,
    eyebrow: 'Latest Insights',
    heading: 'Recently published.',
  },

  topics: {
    visible: true,
    eyebrow: 'Topics',
    heading: 'Upcoming insight topics.',
    allLabel: 'All topics',
    statusLabel: 'Coming soon',
    items: [
      { id: 'top-1', category: 'market', title: 'Qatar market entry advisory' },
      { id: 'top-2', category: 'market', title: 'Nigeria to Qatar business expansion' },
      { id: 'top-3', category: 'market', title: 'Morocco to GCC business expansion' },
      { id: 'top-4', category: 'regulatory', title: 'GCC business setup advisory' },
      { id: 'top-5', category: 'regulatory', title: 'Qatar incorporation readiness' },
      {
        id: 'top-6',
        category: 'regulatory',
        title: 'GCC regulatory advisory for African investors',
      },
      { id: 'top-7', category: 'investor', title: 'Qatar KYC and bank readiness advisory' },
      { id: 'top-8', category: 'investor', title: 'GCC market research and business planning' },
      { id: 'top-9', category: 'events', title: 'Integra Nights recaps' },
    ],
  },

  brief: {
    visible: true,
    title: 'Subscribe to the Monthly Brief',
    text: 'Market-entry notes, regulatory updates, and event invitations for Qatar and the GCC, delivered once a month.',
    buttonLabel: 'Subscribe',
    // used when no mailing list is connected; the button opens the Contact page
    fallbackLabel: 'Subscribe to Monthly Brief',
  },

  seo: {
    title: 'Insights',
    description:
      'Market-entry notes, regulatory explainers, and investor-readiness guidance on Qatar incorporation, KYC and bank readiness, and GCC expansion.',
  },
}

export default insightsContent

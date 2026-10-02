// Default About page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/aboutPage.js.

const aboutContent = {
  banner: {
    visible: true,
    title: 'A Doha-based advisory firm for serious GCC operators.',
    text: 'Helping international companies make informed, practical decisions about entering and operating in Qatar and the broader GCC.',
  },

  whoWeAre: {
    visible: true,
    eyebrow: 'Who We Are',
    heading: 'From interest to execution, with more confidence.',
    paragraphs: [
      {
        id: 'wwa-p1',
        text: 'Integra Advisory Partners is a Doha-based advisory firm focused on helping international companies make informed, practical decisions about entering and operating in Qatar and the broader GCC.',
      },
      {
        id: 'wwa-p2',
        text: 'The firm combines local Qatari market acumen, cross-sector entrepreneurial experience, structured advisory workflows, and trusted ecosystem access to help clients move from interest to execution with more confidence.',
      },
    ],
    image: '/images/about-team-meeting.webp',
    alt: 'Three businesswomen in a meeting around an office table',
    highlights: [
      {
        id: 'hl-1',
        icon: 'FiMapPin',
        title: 'Local Qatari perspective',
        text: 'Doha-based market judgment grounded in how Qatar and the GCC actually operate.',
      },
      {
        id: 'hl-2',
        icon: 'FiAward',
        title: '18 years of entrepreneurial experience',
        text: 'Hands-on experience building and operating businesses, not only advising them.',
      },
      {
        id: 'hl-3',
        icon: 'FiLayers',
        title: 'Cross-sector operating exposure',
        text: 'Structured advisory workflows shaped by work across multiple sectors.',
      },
    ],
  },

  approach: {
    visible: true,
    eyebrow: 'Our Approach',
    heading: 'Real market conditions, not generic opportunity reports.',
    lead: 'Integra is built for operators who need real market conditions. The firm helps clients understand:',
    image: '/images/open-gates.webp',
    alt: 'Open gates leading to a city skyline, representing new business horizons',
    items: [
      { id: 'clr-1', text: 'What to expect in the first 12 months' },
      { id: 'clr-2', text: 'Which documents matter' },
      { id: 'clr-3', text: 'What partnerships should be pursued' },
      { id: 'clr-4', text: 'Where regulatory friction may appear' },
      {
        id: 'clr-5',
        text: 'Whether the opportunity is worth pursuing before major capital is committed',
      },
    ],
  },

  drives: {
    visible: true,
    eyebrow: 'What Drives Us',
    heading: 'Mission, vision, and the promise behind every engagement.',
    cards: [
      {
        id: 'drv-1',
        icon: 'FiTarget',
        title: 'Mission',
        text: 'To make market expansion into Qatar and the GCC simple, transparent, and achievable for businesses of all sizes.',
      },
      {
        id: 'drv-2',
        icon: 'FiEye',
        title: 'Vision',
        text: 'To become the leading advisory partner that combines global business expertise with deep regional insight, transforming market complexity into growth opportunities for businesses entering the GCC.',
      },
      {
        id: 'drv-3',
        icon: 'FiShield',
        title: 'Brand Promise',
        text: 'We simplify market expansion through trusted expertise, local intelligence, and practical strategic guidance, empowering businesses to enter new markets with confidence.',
      },
    ],
  },

  serveWork: {
    visible: true,
    serveTitle: 'Who we serve',
    audience: [
      { id: 'srv-a1', text: 'Entrepreneurs and founders' },
      {
        id: 'srv-a2',
        text: 'Black and African-American founders and investors in the U.S. expanding into the GCC',
      },
      { id: 'srv-a3', text: 'Small and medium-sized enterprises (SMEs)' },
      { id: 'srv-a4', text: 'International businesses expanding into Qatar and the GCC' },
      {
        id: 'srv-a5',
        text: 'Organizations seeking regulatory compliance and strategic market guidance',
      },
    ],
    workTitle: 'How we work',
    values: [
      'Knowledgeable',
      'Simple',
      'Direct',
      'Honest',
      'Reassuring',
      'Professional',
      'Modern with institutional credibility',
    ],
    note: 'Integra provides business, market-entry, regulatory-navigation, and relationship-development advisory. It is not a law firm and does not provide legal advice.',
  },

  cta: {
    visible: true,
    title: 'The trusted bridge between global ambition and regional opportunity.',
    buttonLabel: 'Meet Integra',
    link: '/contact',
  },

  seo: {
    title: 'About',
    description:
      'Integra Advisory Partners is a Doha-based advisory firm helping international companies make practical decisions about entering and operating in Qatar and the GCC.',
  },
}

export default aboutContent

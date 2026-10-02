// TODO: load from and save to the backend.
// Content matches what the website's Home page (frontend/src/pages/Home.jsx) shows today.

const homePage = {
  hero: {
    visible: true,
    eyebrow: 'Qatar & GCC Market Entry Advisory',
    title:
      'Enter the GCC with local judgment, regulatory clarity, and the right relationships.',
    text: 'Integra Advisory Partners helps international founders, investors, and growth-stage companies evaluate, structure, and execute expansion into Qatar and the broader GCC.',
    primaryCta: { label: 'Start Your Market Entry Review', link: '/intake' },
    secondaryCta: { label: 'Explore Our Service Pathways', link: '/services' },
    trust:
      'Based in Doha. Built for serious international operators entering MENA and the GCC.',
    video: '/hero_video_01.mp4',
    poster: '/images/hero-poster.webp',
    cardTitle: 'GCC markets we help you enter',
    markets: ['Qatar', 'Saudi Arabia', 'UAE', 'Bahrain', 'Oman', 'Kuwait'],
    pillars: ['Local judgment', 'Regulatory clarity', 'Relationship access'],
  },

  audience: {
    visible: true,
    eyebrow: 'Who We Serve',
    heading:
      'Built for founders and investors taking their next step into the GCC.',
    lead: 'From the U.S., across Africa, and throughout the diaspora, Integra supports serious operators entering Qatar and the broader GCC.',
    items: [
      {
        id: 'aud-1',
        icon: 'FiFlag',
        title: 'U.S.-based founders',
        image: '/images/audience-us-founders.webp',
        alt: 'Black businessman in a blue suit on a city street',
        text: 'Black and African-American founders, operators, and investors in the U.S. exploring Qatar and the GCC.',
      },
      {
        id: 'aud-2',
        icon: 'FiGlobe',
        title: 'African founders',
        image: '/images/audience-african-founders.webp',
        alt: 'African founder in a suit seated at an office desk',
        text: 'Founders and growth-stage companies from Nigeria, Morocco, and across the continent.',
      },
      {
        id: 'aud-3',
        icon: 'FiTrendingUp',
        title: 'Diaspora & international investors',
        image: '/images/audience-diaspora-investors.webp',
        alt: 'Investor in a red shirt holding a tablet',
        text: 'Diaspora and international operators evaluating a serious GCC expansion.',
      },
      {
        id: 'aud-4',
        icon: 'FiUsers',
        title: 'Referral partners',
        image: '/images/audience-referral-partners.webp',
        alt: 'Team of professionals meeting around a boardroom table',
        text: 'Law firms, banks, trade missions, embassies, accelerators, and ecosystem partners.',
      },
    ],
  },

  challenge: {
    visible: true,
    eyebrow: 'The Challenge',
    heading: 'Expanding into the GCC is not just a market-research exercise.',
    lead: 'Founders need to understand operating costs, incorporation pathways, KYC expectations, banking timelines, regulatory friction, partner risk, and the real conditions behind the polished opportunity reports.',
    solution: 'Integra turns that uncertainty into a practical entry plan.',
    linkLabel: 'See how the process works',
    link: '/process',
    panelLabel: 'What founders need to understand',
    items: [
      { id: 'chl-1', icon: 'FiDollarSign', label: 'Operating costs' },
      { id: 'chl-2', icon: 'FiGitBranch', label: 'Incorporation pathways' },
      { id: 'chl-3', icon: 'FiUserCheck', label: 'KYC expectations' },
      { id: 'chl-4', icon: 'FiClock', label: 'Banking timelines' },
      { id: 'chl-5', icon: 'FiAlertTriangle', label: 'Regulatory friction' },
      { id: 'chl-6', icon: 'FiUsers', label: 'Partner risk' },
    ],
    closing: 'The real conditions behind the polished opportunity reports',
  },

  why: {
    visible: true,
    eyebrow: 'Why Integra',
    heading:
      'The trusted bridge between global ambition and regional opportunity.',
    lead: 'Local judgment, practical execution, and trusted relationship access for operators entering Qatar and the GCC.',
    image: '/images/why-team.webp',
    alt: 'Business team meeting around a boardroom table',
    photoLabel: 'Integra in three words',
    reasons: [
      {
        id: 'why-1',
        icon: 'FiMapPin',
        title: 'Local Qatari perspective',
        text: 'Advice grounded in local market judgment, not distant assumptions.',
      },
      {
        id: 'why-2',
        icon: 'FiShield',
        title: 'Regulatory-navigation focus',
        text: 'Support around incorporation readiness, KYC preparation, government-interface planning, and licensed professional referrals.',
      },
      {
        id: 'why-3',
        icon: 'FiUsers',
        title: 'Relationship discipline',
        text: 'Structured introductions to relevant ecosystem partners instead of unfocused networking.',
      },
      {
        id: 'why-4',
        icon: 'FiTarget',
        title: 'Execution lens',
        text: 'Clients leave with a practical plan, not just a report.',
      },
    ],
    feature: {
      icon: 'FiCpu',
      title: 'Human diligence with AI efficiency',
      text: 'AI and templates accelerate research, while local judgment verifies the decision-making points that matter.',
      leftLabel: 'AI and templates',
      leftValue: 'Accelerate research',
      rightLabel: 'Local judgment',
      rightValue: 'Verifies key decisions',
    },
  },

  services: {
    visible: true,
    eyebrow: 'Service Pathways',
    heading:
      'Tightly defined offerings, from first decision to full operation.',
    buttonLabel: 'Compare Service Pathways',
    items: [
      {
        id: 'srv-1',
        icon: 'FiMap',
        title: 'Market Entry Blueprint',
        text: 'A practical feasibility, business-plan, and financial-model bundle to help you decide whether Qatar, UAE, Saudi Arabia, or another GCC path makes commercial sense.',
      },
      {
        id: 'srv-2',
        icon: 'FiFileText',
        title: 'Regulatory & KYC Readiness Review',
        text: 'A document-readiness and risk-navigation review of what you have, what is missing, and what must be addressed before filings or bank-facing conversations.',
      },
      {
        id: 'srv-3',
        icon: 'FiBriefcase',
        title: 'Qatar Incorporation & Bank Opening Pathway',
        text: 'A guided pathway coordinating incorporation, visa/Iqama, documents, and bank readiness with clear milestones. Bank approval is never guaranteed.',
      },
      {
        id: 'srv-4',
        icon: 'FiCalendar',
        title: 'Executive Advisory Retainer',
        text: 'Monthly access to Integra for regulatory guidance, contract-review coordination, strategic check-ins, and network-introduction planning.',
      },
      {
        id: 'srv-5',
        icon: 'FiZap',
        title: 'Integra Innovators',
        text: 'A selective business network for founders and operators committed to integrity, innovation, and growth.',
      },
      {
        id: 'srv-6',
        icon: 'FiMoon',
        title: 'Integra Nights',
        text: 'A structured networking series that helps participants present their business, identify mentors, and create real follow-up opportunities.',
      },
      {
        id: 'srv-7',
        icon: 'FiStar',
        title: 'Integra Gold',
        text: 'A selective, relationship-led pathway for curated introductions to investors, senior business figures, government contacts, and strategic partners.',
      },
    ],
    helpTitle: 'Not sure which pathway fits?',
    helpText: 'Start with a short intake and a structured discovery call.',
  },

  cta: {
    visible: true,
    title:
      'Before you open in Qatar or the GCC, know what the market, regulators, banks, and partners will actually require.',
    buttonLabel: 'Start Your Market Entry Review',
    link: '/intake',
  },

  seo: {
    title: 'Integra Advisory Partners',
    description:
      'Qatar and GCC market entry advisory for international founders and investors. Local judgment, regulatory clarity, and the right relationships, based in Doha.',
  },
}

export default homePage

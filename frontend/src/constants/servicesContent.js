// Default Services page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/servicesPage.js.

const servicesContent = {
  banner: {
    visible: true,
    title: 'Tightly defined service pathways for entering Qatar and the GCC.',
    text: 'From market-entry intelligence and regulatory readiness to incorporation coordination, ongoing advisory, and trusted ecosystem introductions.',
    focusAreas: [
      'Market-entry intelligence',
      'Regulatory & KYC readiness',
      'Incorporation coordination',
      'Advisory',
      'Ecosystem introductions',
    ],
  },

  pillars: {
    visible: true,
    eyebrow: 'Our Four Pillars',
    heading: 'Seven services, organized around four pillars.',
    lead: 'Every Integra service sits under one of four pillars, so you can see where each pathway fits in your expansion.',
    // services holds the ids of the service cards below
    items: [
      {
        id: 'pil-1',
        // the four default icons are bundled in the website build; the website
        // maps these paths to its own files (see frontend/src/pages/Services.jsx).
        // An icon uploaded from the admin is stored as /uploads/...
        image: '/src/assets/icons/pillar-market-strategy.webp',
        title: 'Market Strategy & Positioning',
        text: 'Deciding whether and how to enter Qatar or the wider GCC.',
        services: ['adv-1'],
      },
      {
        id: 'pil-2',
        image: '/src/assets/icons/pillar-compliance.webp',
        title: 'Compliance & Regulatory Readiness',
        text: 'Preparing documents, KYC, and incorporation steps before filings and bank conversations.',
        services: ['adv-2', 'adv-3'],
      },
      {
        id: 'pil-3',
        image: '/src/assets/icons/pillar-business-intelligence.webp',
        title: 'Business Intelligence & Advisory',
        text: 'Ongoing judgment and strategic guidance as you build in the GCC.',
        services: ['adv-4'],
      },
      {
        id: 'pil-4',
        image: '/src/assets/icons/pillar-partner-matchmaking.webp',
        title: 'Partner Matchmaking & Talent Solutions',
        text: 'Structured introductions to the right partners, mentors, and talent.',
        services: ['net-1', 'net-2', 'net-3'],
      },
    ],
  },

  advisory: {
    visible: true,
    eyebrow: 'Advisory Pathways',
    heading: 'From first decision to formal setup.',
    lead: 'Structured engagements that help you evaluate the market, prepare your documents, and move into Qatar with realistic expectations.',
    items: [
      {
        id: 'adv-1',
        icon: 'FiMap',
        title: 'Market Entry Blueprint',
        text: 'A practical feasibility, business-plan, and financial-model bundle designed to help a founder decide whether Qatar, UAE, Saudi Arabia, or another GCC path makes commercial sense.',
        note: '',
      },
      {
        id: 'adv-2',
        icon: 'FiFileText',
        title: 'Regulatory & KYC Readiness Review',
        text: 'A document-readiness and risk-navigation review that helps clients understand what they have, what is missing, and what must be addressed before formal filings or bank-facing conversations.',
        note: '',
      },
      {
        id: 'adv-3',
        icon: 'FiBriefcase',
        title: 'Qatar Incorporation & Bank Opening Pathway',
        text: 'A guided pathway that coordinates the incorporation, visa/Iqama, document, and bank-readiness process with clear milestones and realistic expectations.',
        note: 'Bank approval is never guaranteed.',
      },
      {
        id: 'adv-4',
        icon: 'FiCalendar',
        title: 'Executive Advisory Retainer',
        text: 'Monthly access to Integra for regulatory guidance, contract-review coordination, strategic check-ins, government liaison advice, and network-introduction planning.',
        note: '',
      },
    ],
  },

  network: {
    visible: true,
    eyebrow: 'Network & Relationships',
    heading: 'The right relationships, introduced with discipline.',
    lead: 'Curated networks and structured introductions instead of unfocused networking.',
    image: '/images/partnerships.webp',
    alt: 'Business partners connecting, representing partnerships that create opportunities',
    items: [
      {
        id: 'net-1',
        icon: 'FiZap',
        title: 'Integra Innovators',
        text: 'A selective business network for founders and operators committed to integrity, innovation, and growth, with access to curated resources, product demonstrations, referrals, and events.',
      },
      {
        id: 'net-2',
        icon: 'FiMoon',
        title: 'Integra Nights',
        text: 'A structured networking series that moves beyond casual introductions and helps participants present their business, identify mentors, and create real follow-up opportunities.',
      },
      {
        id: 'net-3',
        icon: 'FiStar',
        title: 'Integra Gold',
        text: 'A selective, relationship-led advisory pathway for high-priority clients seeking curated introductions to investors, senior business figures, government contacts, diplomats, and strategic partners.',
      },
    ],
  },

  cta: {
    visible: true,
    title: 'Not sure which pathway fits your business?',
    text: 'Compare packages side by side, or complete a short intake so Integra can recommend the right starting point.',
    primaryCta: { label: 'Compare Service Pathways', link: '/packages' },
    secondaryCta: { label: 'Complete Intake Form', link: '/intake' },
  },

  seo: {
    title: 'Services',
    description:
      'GCC business setup advisory: Market Entry Blueprint, Regulatory & KYC Readiness Review, Qatar Incorporation & Bank Opening Pathway, and executive advisory.',
  },
}

export default servicesContent

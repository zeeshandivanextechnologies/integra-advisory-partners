// Default Packages page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/packagesPage.js.
// paymentLink is left out on purpose: until the page is saved from the admin,
// Pay Now links come from siteConfig.payments (keyed by package name).

const packagesContent = {
  banner: {
    visible: true,
    title: 'Clear packages with indicative pricing.',
    text: 'From a first set of discovery sessions to a full operational readiness program, choose the level of support that fits where your business is today.',
  },

  packages: {
    visible: true,
    eyebrow: 'Our Packages',
    heading: 'Choose the pathway that matches your stage.',
    lead: 'Every engagement starts with an intake and a structured discovery call before any scope is confirmed.',
    priceLabel: 'Indicative price',
    requestLabel: 'Request This Package',
    requestLink: '/intake',
    // includes: one point per line
    items: [
      {
        id: 'pkg-1',
        name: 'Executive Discovery Sessions',
        type: 'Starter',
        price: '$1,000',
        unit: '/ 3 sessions',
        bestFor:
          'Early-stage decision makers who need clarity before committing to a full engagement.',
        text: "Three structured advisory calls focused on the client's target market, documents, decision questions, and next-step options.",
        includes: [],
        note: '',
      },
      {
        id: 'pkg-2',
        name: 'Market Entry Blueprint',
        type: 'Project',
        price: '$5,000+',
        unit: '',
        bestFor: 'Founders deciding whether and how to enter the GCC.',
        text: 'Feasibility, business plan, and financial model supported by local interpretation and a practical recommendation.',
        includes: [],
        note: '',
      },
      {
        id: 'pkg-3',
        name: 'Qatar Incorporation & Bank Readiness Pathway',
        type: 'Project',
        price: '$15,000+',
        unit: '',
        bestFor: 'Companies ready to begin a formal Qatar setup process.',
        text: 'A coordinated pathway for incorporation readiness, visa/Iqama navigation, bank-readiness coordination, and milestone tracking.',
        includes: [],
        note: 'Bank approval is never guaranteed.',
      },
      {
        id: 'pkg-4',
        name: 'Operational Readiness Program',
        type: 'Project',
        price: '$30,000+',
        unit: '',
        bestFor: 'Companies that need post-entry operating structure, not only setup.',
        text: '',
        includes: [
          'Incorporation pathway support',
          'Operational readiness planning',
          'Lean Six Sigma implementation plan',
          'One month of post-feasibility support',
        ],
        note: '',
      },
      {
        id: 'pkg-5',
        name: 'Executive Advisory Retainer',
        type: 'Monthly',
        price: '$2,500',
        unit: '/ month+',
        bestFor: 'Clients who need ongoing access, judgment, and strategic guidance.',
        text: 'Four hours per month with additional hours billed separately. Best for founders who need steady guidance without a full project every month.',
        includes: [],
        note: '',
      },
    ],
    // the second part starts on its own line on desktop
    disclaimer:
      'Prices are indicative. Final deliverables, price, timeline, and payment terms are confirmed in a concise scope of work',
    disclaimerEnd:
      'after the discovery call. No work starts until the contract and deposit are complete.',
  },

  compare: {
    visible: true,
    eyebrow: 'At a Glance',
    heading: 'Compare service pathways.',
  },

  cta: {
    visible: true,
    title: 'Not sure which package fits?',
    text: 'Start with Executive Discovery Sessions, or complete a short intake so Integra can recommend the right pathway.',
    buttonLabel: 'Complete Intake Form',
    link: '/intake',
  },

  seo: {
    title: 'Packages',
    description:
      'Indicative pricing for Qatar and GCC market entry: discovery sessions, market entry blueprint, incorporation and bank readiness, and advisory retainers.',
  },
}

export default packagesContent

// Default Process page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/processPage.js.

const processContent = {
  banner: {
    visible: true,
    title: 'A clear client journey, from first inquiry to follow-up.',
    text: 'Seven structured steps that keep every engagement focused, transparent, and accountable.',
  },

  facts: {
    visible: true,
    items: [
      { id: 'fact-1', icon: 'FiClock', value: '45 min', label: 'Structured discovery call' },
      {
        id: 'fact-2',
        icon: 'FiLock',
        value: 'Contract first',
        label: 'No work starts before contract and deposit',
      },
      { id: 'fact-3', icon: 'FiCalendar', value: 'Weekly', label: 'Status updates during delivery' },
      { id: 'fact-4', icon: 'FiRepeat', value: '5 follow-ups', label: 'At day 7, 30, 60, 90, and 180' },
    ],
  },

  steps: {
    visible: true,
    eyebrow: 'How It Works',
    heading: 'Seven steps from intake to implementation.',
    lead: 'Every engagement follows the same disciplined path, so you always know what happens next and what is expected from both sides.',
    buttonLabel: 'Complete Intake Form',
    buttonLink: '/intake',
    image: '/images/strategic-growth.webp',
    alt: 'Rising gold bars and an upward arrow, representing strategic clarity and lasting growth',
    // tags, days, and the link are optional; leave them empty to hide them
    items: [
      {
        id: 'step-1',
        icon: 'FiSend',
        title: 'Inquiry',
        text: 'Client completes the contact form or sends a direct inquiry.',
        tags: [],
        days: [],
        linkLabel: '',
        linkTo: '',
      },
      {
        id: 'step-2',
        icon: 'FiClipboard',
        title: 'Pre-call intake',
        text: 'Integra captures the key details before the first conversation.',
        tags: [
          'Industry',
          'Origin country',
          'GCC destination',
          'Budget',
          'Timeline',
          'Available documents',
          'Key decision question',
        ],
        days: [],
        linkLabel: '',
        linkTo: '',
      },
      {
        id: 'step-3',
        icon: 'FiPhoneCall',
        title: 'Discovery call',
        text: 'A structured 45-minute call identifies whether Integra can help and what pathway fits.',
        tags: [],
        days: [],
        linkLabel: '',
        linkTo: '',
      },
      {
        id: 'step-4',
        icon: 'FiFileText',
        title: 'Proposal and scope',
        text: 'Integra sends a concise scope of work with deliverables, price, timeline, and payment terms.',
        tags: [],
        days: [],
        linkLabel: '',
        linkTo: '',
      },
      {
        id: 'step-5',
        icon: 'FiCreditCard',
        title: 'Deposit and onboarding',
        text: 'No work starts until contract and deposit are complete.',
        tags: [],
        days: [],
        linkLabel: 'Pay your deposit',
        linkTo: '/deposit',
      },
      {
        id: 'step-6',
        icon: 'FiPackage',
        title: 'Delivery',
        text: 'The client receives weekly status updates, deliverables, and a live walkthrough.',
        tags: [],
        days: [],
        linkLabel: '',
        linkTo: '',
      },
      {
        id: 'step-7',
        icon: 'FiRepeat',
        title: 'Follow-up',
        text: 'Integra follows up for implementation, referrals, and next opportunities.',
        tags: [],
        days: ['Day 7', 'Day 30', 'Day 60', 'Day 90', 'Day 180'],
        linkLabel: '',
        linkTo: '',
      },
    ],
  },

  cta: {
    visible: true,
    title: 'Ready to take the first step?',
    text: 'Complete the intake form so Integra can prepare for a focused discovery call.',
    buttonLabel: 'Complete Intake Form',
    link: '/intake',
  },

  seo: {
    title: 'Process',
    description:
      'A seven-step client journey from intake and discovery call to proposal, onboarding, delivery, and follow-up for Qatar and GCC market entry.',
  },
}

export default processContent

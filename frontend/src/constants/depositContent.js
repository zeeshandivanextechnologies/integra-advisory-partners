// Default Deposit page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/depositPage.js.
// The Stripe deposit link itself is set in Settings.

const depositContent = {
  banner: {
    visible: true,
    title: 'Pay your deposit.',
    text: 'No work starts until contract and deposit are complete. Once both are in place, onboarding begins.',
  },

  steps: {
    visible: true,
    eyebrow: 'Deposit and Onboarding',
    heading: 'Where the deposit fits.',
    // id of the step shown with a highlighted border
    current: 'dep-3',
    items: [
      {
        id: 'dep-1',
        icon: 'FiFileText',
        title: 'Proposal and scope',
        text: 'You receive a concise scope of work with deliverables, price, timeline, and payment terms.',
      },
      {
        id: 'dep-2',
        icon: 'FiPenTool',
        title: 'Contract signed',
        text: 'You review and sign the engagement contract.',
      },
      {
        id: 'dep-3',
        icon: 'FiCreditCard',
        title: 'Deposit paid',
        text: 'You pay the deposit stated in your proposal using the secure form on this page.',
      },
      {
        id: 'dep-4',
        icon: 'FiPlayCircle',
        title: 'Onboarding begins',
        text: 'Integra starts onboarding, followed by weekly status updates and deliverables.',
      },
    ],
  },

  payment: {
    visible: true,
    title: 'Secure deposit payment',
    text: 'Payments are processed securely by Stripe. Have these ready:',
    checklist: [
      { id: 'chk-1', text: 'The deposit amount stated in your proposal' },
      { id: 'chk-2', text: 'Your proposal reference' },
      { id: 'chk-3', text: 'Your company name and a contact phone number' },
    ],
    buttonLabel: 'Pay Deposit Securely',
    // shown when no deposit link is set in Settings; opens the Contact page
    fallbackLabel: 'Request Your Deposit Link',
    note: 'Only pay a deposit after you have received a proposal and signed your contract with Integra.',
  },

  seo: {
    title: 'Pay Your Deposit',
    description:
      'Pay your Integra Advisory Partners engagement deposit securely after receiving your proposal and signing your contract.',
  },
}

export default depositContent

// Default Payment Success page content, shown until the page is saved from the admin
// (and whenever the backend cannot be reached).
// Keep the shape in sync with admin/src/constants/paymentSuccessPage.js.
// The booking link and the email come from Settings.

const paymentSuccessContent = {
  banner: {
    visible: true,
    title: 'Thank you. Your payment is complete.',
    text: 'Your payment has been received securely. Here is what happens next.',
  },

  nextSteps: {
    visible: true,
    items: [
      {
        id: 'nxt-1',
        icon: 'FiMail',
        title: 'Check your email',
        text: 'A payment receipt is sent to the email address you used at checkout.',
      },
      {
        id: 'nxt-2',
        icon: 'FiUsers',
        title: 'Onboarding',
        text: 'Integra will contact you to confirm your engagement and begin onboarding.',
      },
      {
        id: 'nxt-3',
        icon: 'FiPackage',
        title: 'Delivery',
        text: 'You will receive weekly status updates, deliverables, and a live walkthrough.',
      },
    ],
    // shown only when a booking link is set in Settings
    bookingLabel: 'Book Your Kickoff Call',
    homeLabel: 'Back to Home',
    // followed by the email from Settings; hidden when there is no email
    helpText: 'Questions about your payment? Email',
  },

  seo: {
    title: 'Payment Received',
    description:
      'Thank you for your payment to Integra Advisory Partners. Here is what happens next.',
  },
}

export default paymentSuccessContent

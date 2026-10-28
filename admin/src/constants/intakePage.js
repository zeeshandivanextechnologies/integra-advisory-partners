// Default Intake page content, used until the page is saved to the backend.
// Content matches what the website's Intake page (frontend/src/pages/Intake.jsx) shows today.

const intakePage = {
  banner: {
    visible: true,
    title:
      'Before you open in Qatar or the GCC, know what the market, regulators, banks, and partners will actually require.',
    text:
      'Complete this short intake so Integra can prepare for a focused, structured discovery call.',
  },

  whyWeAsk: {
    visible: true,
    eyebrow: 'Why We Ask',
    heading: 'Every question has a purpose.',
    reasons: [
      { id: 'reason-1', field: 'Name, company, role', reason: 'Identify decision maker and authority.' },
      { id: 'reason-2', field: 'Country of origin', reason: 'Segment Nigeria, Morocco, diaspora, and other international markets.' },
      { id: 'reason-3', field: 'Target market', reason: 'Qatar, Saudi Arabia, UAE, Bahrain, Oman, Kuwait, or multiple GCC markets.' },
      { id: 'reason-4', field: 'Sector', reason: 'Support service matching and partner mapping.' },
      { id: 'reason-5', field: 'Capital / budget range', reason: 'Qualify seriousness and service fit.' },
      { id: 'reason-6', field: 'Current documents', reason: 'Understand what is ready before filings or bank conversations.' },
      { id: 'reason-7', field: 'Timeline', reason: 'Plan the right pace for your engagement.' },
      { id: 'reason-8', field: 'Biggest concern', reason: 'Focus the discovery call on what matters most to you.' },
    ],
  },

  seo: {
    title: 'Market Entry Review',
    description:
      'Start your Qatar and GCC market entry review. Share your market, sector, budget, documents, and timeline before a structured discovery call.',
  },
}

export default intakePage

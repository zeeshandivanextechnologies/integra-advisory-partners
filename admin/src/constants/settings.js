// Default website settings, used until Settings is saved to the backend.
// Values match frontend/src/constants/siteConfig.js today. The website applies
// the saved settings on top of that file (frontend/src/context/SiteConfigContext.jsx).
// Package Pay Now links are set on the Packages Page, not here.

const settings = {
  contact: {
    email: 'doha@gmail.com',
    phone: '+91 98765 41230',
    address: 'Zone 61, Al Dafna, Doha, Qatar',
    tagline: 'The trusted bridge between global ambition and regional opportunity.',
    locationText: 'Based in Doha. Built for serious international operators entering MENA and the GCC.',
    getStartedText:
      'Before you open in Qatar or the GCC, know what the market, regulators, banks, and partners will actually require.',
    disclaimer:
      'Integra Advisory Partners provides business, market-entry, regulatory-navigation, and relationship-development advisory. It is not a law firm and does not provide legal advice. Legal drafting, legal opinions, and representation should be performed by licensed counsel in the relevant jurisdiction.',
    footerServices: [
      'Market Entry Blueprint',
      'Regulatory & KYC Readiness Review',
      'Qatar Incorporation & Bank Opening Pathway',
      'Executive Advisory Retainer',
      'Integra Innovators',
      'Integra Nights',
      'Integra Gold',
    ],
  },

  whatsapp: {
    number: '919876541230',
    message: 'Hello Integra, I would like to learn more about entering Qatar and the GCC.',
  },

  social: {
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    x: 'https://x.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
  },

  booking: {
    url: 'https://calendly.com/zeeshandivanextechnologies/30min',
    title: '45-minute discovery call',
    text: 'A structured call to identify whether Integra can help and what pathway fits.',
    buttonLabel: 'Book a time',
  },

  contactIntakeCard: {
    title: 'Ready for a full market-entry review?',
    text: 'Complete the intake form with your sector, target market, budget, documents, and timeline.',
    buttonLabel: 'Complete Intake Form',
    buttonLink: '/intake',
  },

  deposit: {
    url: 'https://buy.stripe.com/test_fZu3cx8rzaTJ3AF3Tr4wM02',
  },

  documentUpload: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfmFpTRErXS7DdKdxW1my8ysrBaqRxxPQWu8phFuO_WE_TMgA/viewform',
  },

  mailingList: {
    action:
      'https://d21b4610.sibforms.com/v2/serve/MUIFAFpxDc3IeDq57294mJVo0pJDr7JVj7wYmhByfoZrtnYF92HSf5bCkmhz6frh-j1iSTR-9Yyixaq4dBTJtavnEoc-FJHWvyCwNZi4m6ndzTl8VPfd__er1v_xK0SKtG91CZbeN2Qfro7J7_poOUx7Fpp10cpw3moKF3IORgSX8hHURb2IhP4y7yldgunnWvEtlG0lN2QdDVibqw==',
    emailField: 'EMAIL',
  },

  // action: the form's .../formResponse link; fields: website field -> Google "entry.XXXX" id
  googleForms: {
    contact: {
      action:
        'https://docs.google.com/forms/d/e/1FAIpQLScEAXEskPjjuOTuMv4wES0XeL3_2Ad2Z3jGkjhrtQFrMXMCtw/formResponse',
      fields: {
        inquiryType: 'entry.2097364244',
        name: 'entry.1826819302',
        email: 'entry.626398558',
        company: 'entry.178197135',
        role: 'entry.1042828859',
        message: 'entry.394026855',
      },
    },
    intake: {
      action:
        'https://docs.google.com/forms/d/e/1FAIpQLSczaq-qUYDCLZvzagPbu6snqaVsnJpfPVFjyOXI4fa1ohu_Dg/formResponse',
      fields: {
        name: 'entry.1909760470',
        email: 'entry.84385025',
        company: 'entry.1359866818',
        role: 'entry.134477832',
        origin: 'entry.1856030378',
        sector: 'entry.497311146',
        markets: 'entry.2003224434',
        budget: 'entry.1141064733',
        documents: 'entry.1970009756',
        timeline: 'entry.2147344925',
        concern: 'entry.609493868',
      },
    },
    events: {
      viewUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSe763QuUCLdnNCxQeG8c3LH4LsrTxmcNtJ0BsebYRlN7a0iEg/viewform',
    },
  },

  intake: {
    budgetRanges: [
      'Under $5,000',
      '$5,000 – $15,000',
      '$15,000 – $30,000',
      '$30,000+',
      'Monthly retainer ($2,500+/month)',
      'Not sure yet',
    ],
  },
}

export default settings

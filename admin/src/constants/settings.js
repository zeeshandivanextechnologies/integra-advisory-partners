// Default website settings, used until Settings is saved to the backend.
// Values match frontend/src/constants/siteConfig.js today. The website applies
// the saved settings on top of that file (frontend/src/context/SiteConfigContext.jsx).
// Package Pay Now links are set on the Packages Page, not here.

const settings = {
  contact: {
    email: 'doha@gmail.com',
    phone: '+91 98765 41230',
    address: 'Zone 61, Al Dafna, Doha, Qatar',
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
  },

  deposit: {
    url: 'https://buy.stripe.com/test_fZu3cx8rzaTJ3AF3Tr4wM02',
  },

  documentUpload: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf40I-PH1H8QWcD7lsVqy5p5Dx44D2bFdm-PGMJ7Gq5H-3K9Q/viewform',
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
        'https://docs.google.com/forms/d/e/1FAIpQLSer1rCPs516hO7ICSuT4eUQFFP2v0FuhxYTOAmSR61FeIMimQ/formResponse',
      fields: {
        inquiryType: 'entry.1571110673',
        name: 'entry.526797033',
        email: 'entry.1047342294',
        company: 'entry.819956255',
        role: 'entry.1636811960',
        message: 'entry.808375202',
      },
    },
    intake: {
      action:
        'https://docs.google.com/forms/d/e/1FAIpQLSd-24fLNmp1YGwQ3WS5r8g8Ca6dfolWwV-2f_wpGfajik1PTQ/formResponse',
      fields: {
        name: 'entry.2104664601',
        email: 'entry.1158545637',
        company: 'entry.77940272',
        role: 'entry.2089416962',
        origin: 'entry.554513365',
        sector: 'entry.876195094',
        markets: 'entry.7075385',
        budget: 'entry.1282595326',
        documents: 'entry.1610922256',
        timeline: 'entry.84894969',
        concern: 'entry.925730649',
      },
    },
    events: {
      viewUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSfUt3iDpUlL40SIlc9tsQ7LYE5jO62Kxy3vORg-ep5n_o4rNA/viewform',
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

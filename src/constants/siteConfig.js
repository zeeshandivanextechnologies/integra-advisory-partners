/*
 * Integra Advisory Partners: site configuration
 *
 * Fill in the values below when the client shares them.
 * Anything left empty ('' or []) stays hidden on the site, so nothing breaks.
 */

const siteConfig = {
  /* ---------- contact details ---------- */
  contact: {
    email: '', // e.g. 'hello@integraadvisorypartners.com'
    phone: '', // e.g. '+1 202 555 0100' (display format)
    address: '', // e.g. 'West Bay, Doha, Qatar'
  },

  /* ---------- whatsapp (U.S. number, digits only with country code) ---------- */
  whatsapp: {
    number: '', // e.g. '12025550100'
    message: 'Hello Integra, I would like to learn more about entering Qatar and the GCC.',
  },

  /* ---------- social links (full URLs) ---------- */
  social: {
    linkedin: '',
    instagram: '',
    x: '',
    facebook: '',
    youtube: '',
  },

  /* ---------- booking + video call (Calendly or similar) ---------- */
  booking: {
    url: '', // e.g. 'https://calendly.com/integra/discovery-call'
  },

  /*
   * ---------- google forms ----------
   * action: the form's "formResponse" URL
   *   (https://docs.google.com/forms/d/e/FORM_ID/formResponse)
   * fields: map each website field name to the Google Form "entry.XXXX" id
   * viewUrl: the public form link (used for Register Interest buttons)
   */
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
        'https://docs.google.com/forms/d/e/1FAIpQLSfUt3iDpUlL40SIlc9tsQ7LYE5jO62Kxy3vORg-ep5n_o4rNA/viewform', // Register Interest form link
    },
  },

  /* ---------- secure document upload (Google Form, Jotform, Tally...) ---------- */
  documentUpload: {
    url: '',
  },

  /* ---------- mailing list (Mailchimp / Brevo embed form action URL) ---------- */
  mailingList: {
    action: '', // e.g. 'https://xxxx.us1.list-manage.com/subscribe/post?u=...&id=...'
    emailField: 'EMAIL', // Mailchimp uses EMAIL, Brevo uses EMAIL as well
  },

  /* ---------- stripe payment links, keyed by package name ---------- */
  payments: {
    'Executive Discovery Sessions': '',
    'Market Entry Blueprint': '',
    'Qatar Incorporation & Bank Readiness Pathway': '',
    'Operational Readiness Program': '',
    'Executive Advisory Retainer': '',
  },

  /* ---------- intake budget ranges (leave empty to keep a text box) ---------- */
  budgetRanges: [], // e.g. ['Under $25k', '$25k - $100k', '$100k - $500k', '$500k+']

  /* ---------- hero video (file in /public or full URL) ---------- */
  heroVideo: {
    src: '', // e.g. '/videos/hero.mp4'
    poster: '', // e.g. '/images/hero-poster.webp'
  },
}

export default siteConfig

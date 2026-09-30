/**
 * Integra Advisory Partners: create the website's Google Forms
 *
 * How to use
 * 1. Sign in to the Google account that should own the forms.
 * 2. Open https://script.google.com and click "New project".
 * 3. Replace the editor contents with this whole file and click Save.
 * 4. Select the function "createIntegraForms" and click Run.
 *    Approve the permissions Google asks for (Forms + Sheets).
 * 5. Open "Execution log". Copy the printed "googleForms" block and paste it
 *    over the googleForms section in src/constants/siteConfig.js.
 *
 * Each form gets its own response spreadsheet in the same Google Drive.
 * Turn on email alerts per form in Google Forms: Responses > (menu) >
 * "Get email notifications for new responses".
 *
 * IMPORTANT: the choice lists below must stay identical to the ones in
 * src/pages/Contact.jsx and src/pages/Intake.jsx. If you change an option on
 * the website, change it in the Google Form too, or that answer is rejected.
 */

const INQUIRY_TYPES = ['Discovery', 'Advisory', 'Incorporation', 'Partner']

const ORIGINS = [
  'United States',
  'Nigeria',
  'Morocco',
  'Diaspora',
  'Other international market',
]

const MARKETS = [
  'Qatar',
  'Saudi Arabia',
  'UAE',
  'Bahrain',
  'Oman',
  'Kuwait',
  'Multiple GCC markets',
]

const DOCUMENTS = [
  'Business registration',
  'Articles',
  'Financial statements',
  'KYC documents',
  'Pitch deck',
  'Business plan',
]

const TIMELINES = ['Immediate', '30 days', '90 days', '6 months', 'Exploratory']

const CONCERNS = [
  'Banking',
  'Legal / regulatory',
  'Market validation',
  'Partner introductions',
  'Visas',
  'Operating costs',
  'Sales pipeline',
]

// Leave empty to keep "budget" as a short-answer question.
// If you fill this, add the same list to budgetRanges in siteConfig.js.
const BUDGET_RANGES = []

const EVENT_FORMATS = [
  'Webinars',
  'Integra Nights',
  'Discovery Visits',
  'Sector Briefings',
]

/* -------------------------------------------------------------------------- */

function createIntegraForms() {
  const contact = buildForm(
    'Integra Advisory Partners: Request a Call',
    'Website contact form. Responses are collected from integraadvisorypartners.com.',
    [
      { key: 'inquiryType', title: 'Inquiry type', type: 'radio', options: INQUIRY_TYPES, required: true },
      { key: 'name', title: 'Full name', type: 'text', required: true },
      { key: 'email', title: 'Email address', type: 'text', required: true },
      { key: 'company', title: 'Company', type: 'text' },
      { key: 'role', title: 'Role', type: 'text' },
      { key: 'message', title: 'How can Integra help?', type: 'paragraph', required: true },
    ],
  )

  const intake = buildForm(
    'Integra Advisory Partners: Market Entry Intake',
    'Before you open in Qatar or the GCC, know what the market, regulators, banks, and partners will actually require.',
    [
      { key: 'name', title: 'Full name', type: 'text', required: true },
      { key: 'email', title: 'Email address', type: 'text', required: true },
      { key: 'company', title: 'Company', type: 'text', required: true },
      { key: 'role', title: 'Role', type: 'text', required: true },
      { key: 'origin', title: 'Country of origin / current base', type: 'list', options: ORIGINS, required: true },
      { key: 'sector', title: 'Sector', type: 'text', required: true },
      { key: 'markets', title: 'Target market', type: 'checkbox', options: MARKETS },
      BUDGET_RANGES.length
        ? { key: 'budget', title: 'Capital available / budget range', type: 'list', options: BUDGET_RANGES, required: true }
        : { key: 'budget', title: 'Capital available / budget range', type: 'text', required: true },
      { key: 'documents', title: 'Current documents', type: 'checkbox', options: DOCUMENTS },
      { key: 'timeline', title: 'Timeline', type: 'radio', options: TIMELINES, required: true },
      { key: 'concern', title: 'Biggest concern', type: 'radio', options: CONCERNS, required: true },
    ],
  )

  const events = buildForm(
    'Integra Advisory Partners: Register Interest in Events',
    'Be the first to hear about webinars, Integra Nights, discovery visits, and sector briefings.',
    [
      { key: 'name', title: 'Full name', type: 'text', required: true },
      { key: 'email', title: 'Email address', type: 'text', required: true },
      { key: 'company', title: 'Company', type: 'text' },
      { key: 'formats', title: 'Which events interest you?', type: 'checkbox', options: EVENT_FORMATS },
    ],
  )

  const config = {
    googleForms: {
      contact: { action: contact.action, fields: contact.fields },
      intake: { action: intake.action, fields: intake.fields },
      events: { viewUrl: events.viewUrl },
    },
  }

  Logger.log('Paste this over the googleForms section in src/constants/siteConfig.js:')
  Logger.log(JSON.stringify(config, null, 2))
  Logger.log('Contact form (edit): ' + contact.editUrl)
  Logger.log('Intake form (edit): ' + intake.editUrl)
  Logger.log('Events form (edit): ' + events.editUrl)
}

function buildForm(title, description, questions) {
  const form = FormApp.create(title).setDescription(description)
  const sheet = SpreadsheetApp.create(title + ' (Responses)')
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId())

  const fields = {}

  questions.forEach((question) => {
    const item = addItem(form, question)
    item.setTitle(question.title).setRequired(Boolean(question.required))
    fields[question.key] = entryIdFor(form, item, question)
  })

  const viewUrl = form.getPublishedUrl()

  return {
    viewUrl,
    action: viewUrl.replace(/\/viewform.*$/, '/formResponse'),
    editUrl: form.getEditUrl(),
    fields,
  }
}

function addItem(form, question) {
  switch (question.type) {
    case 'paragraph':
      return form.addParagraphTextItem()
    case 'radio':
      return form.addMultipleChoiceItem().setChoiceValues(question.options)
    case 'checkbox':
      return form.addCheckboxItem().setChoiceValues(question.options)
    case 'list':
      return form.addListItem().setChoiceValues(question.options)
    default:
      return form.addTextItem()
  }
}

// Builds a pre-filled link for one question and reads its entry id from it.
function entryIdFor(form, item, question) {
  const sample =
    question.type === 'checkbox'
      ? [question.options[0]]
      : question.options
        ? question.options[0]
        : 'sample'

  const url = form
    .createResponse()
    .withItemResponse(item.createResponse(sample))
    .toPrefilledUrl()

  const match = url.match(/entry\.(\d+)=/)
  return match ? 'entry.' + match[1] : ''
}

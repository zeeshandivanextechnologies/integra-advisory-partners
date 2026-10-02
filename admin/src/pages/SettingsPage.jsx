import {
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiShare2,
  FiSliders,
  FiUpload,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import ProfileSection from '../components/settings/ProfileSection.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import TagsField from '../components/editor/TagsField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/settings.js'
import usePageEditor from '../hooks/usePageEditor.js'

const sections = [
  {
    key: 'contact',
    title: 'Contact details',
    icon: FiPhone,
    description: 'Shown in the footer, on the Contact page, and after payment.',
  },
  {
    key: 'whatsapp',
    title: 'WhatsApp',
    icon: FiMessageCircle,
    description: 'The green chat button in the corner of every page.',
  },
  {
    key: 'social',
    title: 'Social links',
    icon: FiShare2,
    description: 'The round icons in the footer.',
  },
  {
    key: 'booking',
    title: 'Discovery call booking',
    icon: FiCalendar,
    description: 'Calendly or similar, used by every "Book a Discovery Call" button.',
  },
  {
    key: 'deposit',
    title: 'Deposit payment',
    icon: FiCreditCard,
    description: 'The Stripe link on the Pay Your Deposit page.',
  },
  {
    key: 'documentUpload',
    title: 'Document upload',
    icon: FiUpload,
    description: 'The secure upload link on the intake form.',
  },
  {
    key: 'mailingList',
    title: 'Monthly brief sign-up',
    icon: FiMail,
    description: 'The mailing list behind the Subscribe form on the Insights page.',
  },
  {
    key: 'googleForms',
    title: 'Google Forms',
    icon: FiFileText,
    description: 'Where the contact, intake, and event forms send their answers.',
  },
  {
    key: 'intake',
    title: 'Intake form options',
    icon: FiSliders,
    description: 'Choices offered on the Market Entry Review form.',
  },
]

// "inquiryType" -> "Inquiry type"
const fieldLabel = (key) => {
  const words = key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const socialLabels = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X (Twitter)',
  facebook: 'Facebook',
  youtube: 'YouTube',
}

const leaveEmpty = 'Leave empty to hide it on the website.'

function SettingsPage() {
  // loads from and saves to the backend; the website applies these on top of siteConfig.js
  const editor = usePageEditor(initialContent, sections, 'settings', {
    slug: 'settings',
    savedMessage: 'Settings saved successfully!',
  })
  const { content, update, bind, sectionProps } = editor
  const { social, googleForms, intake } = content

  const updateForm = (name, changes) =>
    update('googleForms', { [name]: { ...googleForms[name], ...changes } })

  const updateFormField = (name, field, value) =>
    updateForm(name, { fields: { ...googleForms[name].fields, [field]: value.trim() } })

  // one Google Form: its response link and the entry id for each website field
  const formEditor = (name, title, page) => (
    <div className="pe-group mb-3">
      <span className="pe-group-label">
        {title} <span className="fw-400">· {page}</span>
      </span>
      <TextField
        id={`settings-form-${name}-action`}
        label="Form response link"
        placeholder="https://docs.google.com/forms/d/e/.../formResponse"
        hint="Ends with /formResponse. Leave empty and the form shows a 'not connected yet' message."
        value={googleForms[name].action}
        onChange={(action) => updateForm(name, { action: action.trim() })}
      />
      <span className="pe-split-label">Entry ids</span>
      <div className="row">
        {Object.entries(googleForms[name].fields).map(([field, entry]) => (
          <div className="col-md-6" key={field}>
            <TextField
              id={`settings-form-${name}-${field}`}
              label={fieldLabel(field)}
              placeholder="entry.123456789"
              value={entry}
              onChange={(value) => updateFormField(name, field, value)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <PageEditorLayout
      pageName="Settings"
      title="Website settings"
      crumb="Website"
      path="/"
      intro="Your admin profile, then the contact details, links, and connected services used across the website. Package Pay Now links are set on the Packages Page."
      sections={sections}
      editor={editor}
    >
      {/* the signed-in admin's own profile; saved with its own buttons */}
      <ProfileSection />

      {/* contact */}
      <EditorSection {...sectionProps('contact')}>
        <div className="row">
          <div className="col-md-6">
            <TextField
              label="Email"
              placeholder="hello@integraadvisorypartners.com"
              hint={leaveEmpty}
              {...bind('contact', 'email')}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Phone"
              placeholder="+1 555 123 4567"
              hint={leaveEmpty}
              {...bind('contact', 'phone')}
            />
          </div>
          <div className="col-12">
            <TextField label="Address" hint={leaveEmpty} {...bind('contact', 'address')} />
          </div>
        </div>
      </EditorSection>

      {/* whatsapp */}
      <EditorSection {...sectionProps('whatsapp')}>
        <div className="row">
          <div className="col-md-5">
            <TextField
              label="Number"
              placeholder="15551234567"
              hint="Digits only, with the country code. Leave empty to hide the button."
              {...bind('whatsapp', 'number')}
              onChange={(number) => update('whatsapp', { number: number.replace(/\D/g, '') })}
            />
          </div>
          <div className="col-md-7">
            <TextField
              label="First message"
              multiline
              rows={2}
              hint="Filled in for the visitor when the chat opens."
              {...bind('whatsapp', 'message')}
            />
          </div>
        </div>
      </EditorSection>

      {/* social */}
      <EditorSection {...sectionProps('social')}>
        <div className="row">
          {Object.keys(social).map((key) => (
            <div className="col-md-6" key={key}>
              <TextField
                label={socialLabels[key] || fieldLabel(key)}
                placeholder="https://"
                {...bind('social', key)}
                onChange={(url) => update('social', { [key]: url.trim() })}
              />
            </div>
          ))}
        </div>
        <p className="pe-hint mt-0">Leave a link empty to hide that icon.</p>
      </EditorSection>

      {/* booking */}
      <EditorSection {...sectionProps('booking')}>
        <TextField
          label="Booking link"
          placeholder="https://calendly.com/..."
          hint="Leave empty and the buttons say 'Request a Call' and open the Contact page instead."
          {...bind('booking', 'url')}
          onChange={(url) => update('booking', { url: url.trim() })}
        />
      </EditorSection>

      {/* deposit */}
      <EditorSection {...sectionProps('deposit')}>
        <TextField
          label="Stripe payment link"
          placeholder="https://buy.stripe.com/..."
          hint="In Stripe, set 'After payment' to open /payment-success on the website. Links starting with buy.stripe.com/test_ are test mode. Leave empty to show 'Request Your Deposit Link' instead."
          {...bind('deposit', 'url')}
          onChange={(url) => update('deposit', { url: url.trim() })}
        />
      </EditorSection>

      {/* document upload */}
      <EditorSection {...sectionProps('documentUpload')}>
        <TextField
          label="Upload link"
          placeholder="https://tally.so/r/... or a Google Form with file upload"
          hint="Shown as 'Upload your documents securely' on the intake form. Leave empty to hide it."
          {...bind('documentUpload', 'url')}
          onChange={(url) => update('documentUpload', { url: url.trim() })}
        />
      </EditorSection>

      {/* mailing list */}
      <EditorSection {...sectionProps('mailingList')}>
        <div className="row">
          <div className="col-md-8">
            <TextField
              label="Form action link"
              placeholder="https://....sibforms.com/serve/..."
              hint="From the Brevo (or Mailchimp) sign-up form. Leave empty and the button opens the Contact page."
              {...bind('mailingList', 'action')}
              onChange={(action) => update('mailingList', { action: action.trim() })}
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Email field name"
              placeholder="EMAIL"
              hint="Brevo uses EMAIL."
              {...bind('mailingList', 'emailField')}
            />
          </div>
        </div>
      </EditorSection>

      {/* google forms */}
      <EditorSection {...sectionProps('googleForms')}>
        <p className="pe-hint mt-0 mb-3">
          Change these only when a Google Form is replaced. The entry ids can be
          read with frontend/scripts/google-form-ids.mjs. A wrong id means that
          answer is not saved.
        </p>
        {formEditor('contact', 'Request a Call form', 'Contact page')}
        {formEditor('intake', 'Market Entry Intake form', 'Intake page')}
        <div className="pe-group">
          <span className="pe-group-label">
            Register Interest form <span className="fw-400">· Events page</span>
          </span>
          <TextField
            id="settings-form-events-view"
            label="Form link"
            placeholder="https://docs.google.com/forms/d/e/.../viewform"
            hint="Opened by every Register Interest button. Leave empty and they open the Contact page."
            value={googleForms.events.viewUrl}
            onChange={(viewUrl) => updateForm('events', { viewUrl: viewUrl.trim() })}
          />
        </div>
      </EditorSection>

      {/* intake options */}
      <EditorSection {...sectionProps('intake')}>
        <TagsField
          id="settings-budget-ranges"
          label="Budget ranges"
          values={intake.budgetRanges}
          placeholder="Add a range"
          hint="Choices for 'Capital available / budget range'. Keep them the same as in the intake Google Form, or that answer is rejected. Remove all to show a text box instead."
          onChange={(budgetRanges) => update('intake', { budgetRanges })}
        />
      </EditorSection>
    </PageEditorLayout>
  )
}

export default SettingsPage

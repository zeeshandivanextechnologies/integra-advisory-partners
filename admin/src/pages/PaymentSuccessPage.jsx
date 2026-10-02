import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiList, FiSearch } from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/paymentSuccessPage.js'
import usePageEditor from '../hooks/usePageEditor.js'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Thank-you banner',
    icon: FiCheckCircle,
    description: 'The navy banner with the gold tick.',
  },
  {
    key: 'nextSteps',
    title: 'Next steps',
    icon: FiList,
    description: 'The numbered cards, the buttons, and the help line.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function PaymentSuccessPage() {
  // loads from and saves to the backend; the website Payment Success page reads the same content
  const editor = usePageEditor(initialContent, sections, 'payment-success', {
    slug: 'payment-success',
    savedMessage: 'Payment Success page saved successfully!',
  })
  const { content, update, bind, sectionProps } = editor
  const { nextSteps } = content

  return (
    <PageEditorLayout
      pageName="Payment Success"
      path="/payment-success"
      intro="Edit the thank-you page people see after paying through Stripe. Keep its address as /payment-success, since Stripe sends people there."
      sections={sections}
      editor={editor}
    >
      {/* thank-you banner */}
      <EditorSection {...sectionProps('banner')}>
        <div className="row">
          <div className="col-12">
            <TextField label="Headline" maxLength={70} {...bind('banner', 'title')} />
          </div>
          <div className="col-12">
            <TextField label="Text" multiline rows={2} maxLength={160} {...bind('banner', 'text')} />
          </div>
        </div>
      </EditorSection>

      {/* next steps */}
      <EditorSection {...sectionProps('nextSteps')}>
        <h4 className="pe-subhead mt-0 pt-0 border-0">
          Step cards
          <span className="pe-subhead-count">{nextSteps.items.length}</span>
        </h4>
        <ListEditor
          items={nextSteps.items}
          onChange={(items) => update('nextSteps', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add step"
          min={1}
          max={6}
          createItem={() => ({ id: newId(), icon: 'FiCheck', title: '', text: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <IconSelect
                  id={`nxt-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`nxt-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`nxt-${item.id}-text`}
                  label="Description"
                  multiline
                  rows={2}
                  maxLength={140}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
            </div>
          )}
        />

        <h4 className="pe-subhead">Buttons and help line</h4>
        <p className="pe-hint mt-0 mb-3">
          The booking link and the email come from{' '}
          <Link to="/settings">
            Settings <FiArrowRight />
          </Link>
          .
        </p>
        <div className="row">
          <div className="col-md-6">
            <TextField
              label="Booking button text"
              hint="Shown only when Settings has a booking link."
              {...bind('nextSteps', 'bookingLabel')}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Home button text"
              hint="Opens the home page."
              {...bind('nextSteps', 'homeLabel')}
            />
          </div>
          <div className="col-12">
            <TextField
              label="Help line"
              hint="The email from Settings is added after this text. Hidden when there is no email."
              {...bind('nextSteps', 'helpText')}
            />
          </div>
        </div>
      </EditorSection>

      {/* seo */}
      <EditorSection {...sectionProps('seo')}>
        <div className="row">
          <div className="col-lg-7">
            <TextField
              label="Page title"
              maxLength={40}
              hint='Shown in the browser tab; the website adds "| Integra Advisory Partners" after it.'
              {...bind('seo', 'title')}
            />
            <TextField
              label="Meta description"
              multiline
              maxLength={160}
              {...bind('seo', 'description')}
            />
          </div>
        </div>
      </EditorSection>
    </PageEditorLayout>
  )
}

export default PaymentSuccessPage

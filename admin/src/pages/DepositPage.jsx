import { Link } from 'react-router-dom'
import { FiArrowRight, FiCreditCard, FiLayout, FiList, FiSearch } from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/depositPage.js'
import usePageEditor from '../hooks/usePageEditor.js'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner at the top. The breadcrumb is added automatically.',
  },
  {
    key: 'steps',
    title: 'Steps',
    icon: FiList,
    description: 'Where the deposit fits in the client journey.',
  },
  {
    key: 'payment',
    title: 'Payment card',
    icon: FiCreditCard,
    description: 'The navy card with the checklist and the pay button.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function DepositPage() {
  // loads from and saves to the backend; the website Deposit page reads the same content
  const editor = usePageEditor(initialContent, sections, 'deposit', {
    slug: 'deposit',
    savedMessage: 'Deposit page saved successfully!',
  })
  const { content, update, bind, sectionProps } = editor
  const { steps, payment, seo } = content

  const highlightOptions = [
    { value: '', label: 'No highlighted step' },
    ...steps.items.map((step, index) => ({
      value: step.id,
      label: `${String(index + 1).padStart(2, '0')} · ${step.title || 'Untitled step'}`,
    })),
  ]

  return (
    <PageEditorLayout
      pageName="Deposit"
      path="/deposit"
      intro="Edit the text on the Pay Your Deposit page. The Stripe deposit link is set in Settings."
      sections={sections}
      editor={editor}
    >
      {/* page banner */}
      <EditorSection {...sectionProps('banner')}>
        <div className="row">
          <div className="col-12">
            <TextField label="Headline" maxLength={60} {...bind('banner', 'title')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline maxLength={200} {...bind('banner', 'text')} />
          </div>
        </div>
      </EditorSection>

      {/* steps */}
      <EditorSection {...sectionProps('steps')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('steps', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={70} {...bind('steps', 'heading')} />
          </div>
          <div className="col-md-6">
            <SelectField
              label="Highlighted step"
              hint="Shown with a navy border, usually the deposit step."
              options={highlightOptions}
              {...bind('steps', 'current')}
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Steps
          <span className="pe-subhead-count">{steps.items.length}</span>
        </h4>
        <ListEditor
          items={steps.items}
          onChange={(items) => update('steps', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add step"
          min={1}
          max={8}
          createItem={() => ({ id: newId(), icon: 'FiCheck', title: '', text: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <IconSelect
                  id={`dep-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`dep-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`dep-${item.id}-text`}
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
      </EditorSection>

      {/* payment card */}
      <EditorSection {...sectionProps('payment')}>
        <p className="pe-hint mt-0 mb-3">
          The pay button opens the Stripe deposit link from{' '}
          <Link to="/settings">
            Settings <FiArrowRight />
          </Link>
          .
        </p>
        <div className="row">
          <div className="col-12">
            <TextField label="Title" {...bind('payment', 'title')} />
          </div>
          <div className="col-12">
            <TextField
              label="Text"
              hint="Leads into the checklist below."
              {...bind('payment', 'text')}
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Checklist
          <span className="pe-subhead-count">{payment.checklist.length}</span>
        </h4>
        <ListEditor
          items={payment.checklist}
          onChange={(checklist) => update('payment', { checklist })}
          itemTitle={(item) => item.text}
          addLabel="Add checklist point"
          max={8}
          createItem={() => ({ id: newId(), text: '' })}
          renderItem={(item, setItem) => (
            <TextField
              id={`chk-${item.id}`}
              label="Text"
              maxLength={80}
              value={item.text}
              onChange={(text) => setItem({ text })}
            />
          )}
        />

        <div className="row">
          <div className="col-md-6">
            <TextField
              label="Pay button text"
              hint="Used when a deposit link is set."
              {...bind('payment', 'buttonLabel')}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Button text without a deposit link"
              hint="Used when Settings has no deposit link; it opens the Contact page."
              {...bind('payment', 'fallbackLabel')}
            />
          </div>
          <div className="col-12">
            <TextField label="Note" multiline rows={2} {...bind('payment', 'note')} />
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
              hint='The website adds "| Integra Advisory Partners" after it.'
              {...bind('seo', 'title')}
            />
            <TextField
              label="Meta description"
              multiline
              maxLength={160}
              hint="Search engines show about 160 characters."
              {...bind('seo', 'description')}
            />
          </div>
          <div className="col-lg-5">
            <span className="pe-group-label">Search result preview</span>
            <div className="pe-serp">
              <span className="pe-serp-url">integraadvisorypartners.com › deposit</span>
              <span className="pe-serp-title">
                {seo.title || 'Page title'} | Integra Advisory Partners
              </span>
              <p className="pe-serp-text">{seo.description || 'Meta description'}</p>
            </div>
          </div>
        </div>
      </EditorSection>
    </PageEditorLayout>
  )
}

export default DepositPage

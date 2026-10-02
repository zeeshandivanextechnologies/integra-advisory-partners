import {
  FiFlag,
  FiGrid,
  FiLayout,
  FiPackage,
  FiSearch,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/packagesPage.js'
import { sitePages } from '../constants/site.js'
import usePageEditor from '../hooks/usePageEditor.js'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner at the top with the page headline.',
  },
  {
    key: 'packages',
    title: 'Package cards',
    icon: FiPackage,
    description: 'Each package with its price, best-for note, and Pay Now link.',
  },
  {
    key: 'compare',
    title: 'Comparison table',
    icon: FiGrid,
    description: 'The table is built from the package cards; only its heading is set here.',
  },
  {
    key: 'cta',
    title: 'Call to action',
    icon: FiFlag,
    description: 'The closing banner. Its second button books a discovery call.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function PackagesPage() {
  // loads from and saves to the backend; the website Packages page reads the same content
  const editor = usePageEditor(initialContent, sections, 'packages', { slug: 'packages' })
  const { content, update, bind, sectionProps } = editor
  const { packages, seo } = content

  return (
    <PageEditorLayout
      pageName="Packages"
      path="/packages"
      intro="Edit the packages, prices, and Pay Now links on the website Packages page. Sections are listed in the order visitors see them."
      sections={sections}
      editor={editor}
    >
      {/* page banner */}
      <EditorSection {...sectionProps('banner')}>
        <div className="row">
          <div className="col-12">
            <TextField
              label="Headline"
              multiline
              rows={2}
              maxLength={90}
              hint="The main heading of the page (H1). The breadcrumb is added automatically."
              {...bind('banner', 'title')}
            />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline maxLength={200} {...bind('banner', 'text')} />
          </div>
        </div>
      </EditorSection>

      {/* package cards */}
      <EditorSection {...sectionProps('packages')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('packages', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('packages', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline rows={2} {...bind('packages', 'lead')} />
          </div>
        </div>

        <h4 className="pe-subhead">On every card</h4>
        <div className="pe-group mb-3">
          <div className="row">
            <div className="col-md-4">
              <TextField
                label="Price label"
                hint="Shown under each price."
                {...bind('packages', 'priceLabel')}
              />
            </div>
            <div className="col-md-4">
              <TextField label="Request button text" {...bind('packages', 'requestLabel')} />
            </div>
            <div className="col-md-4">
              <SelectField
                label="Request button opens"
                options={sitePages}
                {...bind('packages', 'requestLink')}
              />
            </div>
          </div>
        </div>

        <h4 className="pe-subhead">
          Packages
          <span className="pe-subhead-count">{packages.items.length}</span>
        </h4>
        <ListEditor
          items={packages.items}
          onChange={(items) => update('packages', { items })}
          itemTitle={(item) =>
            [item.name, [item.price, item.unit].filter(Boolean).join(' ')]
              .filter(Boolean)
              .join(' · ')
          }
          addLabel="Add package"
          min={1}
          max={9}
          createItem={() => ({
            id: newId(),
            name: '',
            type: '',
            price: '',
            unit: '',
            bestFor: '',
            text: '',
            includes: [],
            note: '',
            paymentLink: '',
          })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-md-8">
                <TextField
                  id={`pkg-${item.id}-name`}
                  label="Package name"
                  value={item.name}
                  onChange={(name) => setItem({ name })}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  id={`pkg-${item.id}-type`}
                  label="Type tag"
                  placeholder="Starter, Project, Monthly..."
                  value={item.type}
                  onChange={(type) => setItem({ type })}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id={`pkg-${item.id}-price`}
                  label="Price"
                  placeholder="$5,000+"
                  value={item.price}
                  onChange={(price) => setItem({ price })}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id={`pkg-${item.id}-unit`}
                  label="Price unit (optional)"
                  placeholder="/ month+"
                  value={item.unit}
                  onChange={(unit) => setItem({ unit })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`pkg-${item.id}-best`}
                  label="Best for"
                  multiline
                  rows={2}
                  maxLength={120}
                  hint="Also shown in the comparison table."
                  value={item.bestFor}
                  onChange={(bestFor) => setItem({ bestFor })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`pkg-${item.id}-text`}
                  label="Description (optional)"
                  multiline
                  maxLength={200}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`pkg-${item.id}-includes`}
                  label="What's included (optional)"
                  multiline
                  rows={4}
                  placeholder="One point per line"
                  hint="One point per line. Shown as a tick list."
                  value={item.includes.join('\n')}
                  onChange={(value) => setItem({ includes: value.split('\n') })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`pkg-${item.id}-note`}
                  label="Highlighted note (optional)"
                  placeholder="e.g. Bank approval is never guaranteed."
                  hint="Shown in a gold box. Leave empty to hide."
                  value={item.note}
                  onChange={(note) => setItem({ note })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`pkg-${item.id}-pay`}
                  label="Stripe payment link (optional)"
                  placeholder="https://buy.stripe.com/..."
                  hint='The "Pay Now" button shows only when a link is set. Links starting with buy.stripe.com/test_ are test mode.'
                  value={item.paymentLink}
                  onChange={(paymentLink) => setItem({ paymentLink: paymentLink.trim() })}
                />
              </div>
            </div>
          )}
        />

        <h4 className="pe-subhead">Disclaimer</h4>
        <div className="row">
          <div className="col-12">
            <TextField
              label="First part"
              multiline
              rows={2}
              {...bind('packages', 'disclaimer')}
            />
          </div>
          <div className="col-12">
            <TextField
              label="Second part"
              multiline
              rows={2}
              hint="Starts on its own line on desktop."
              {...bind('packages', 'disclaimerEnd')}
            />
          </div>
        </div>
      </EditorSection>

      {/* comparison table */}
      <EditorSection {...sectionProps('compare')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('compare', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField
              label="Heading"
              maxLength={90}
              hint="Rows come from the package cards above."
              {...bind('compare', 'heading')}
            />
          </div>
        </div>
      </EditorSection>

      {/* call to action */}
      <EditorSection {...sectionProps('cta')}>
        <div className="row">
          <div className="col-12">
            <TextField label="Heading" maxLength={70} {...bind('cta', 'title')} />
          </div>
          <div className="col-12">
            <TextField label="Text" multiline rows={2} {...bind('cta', 'text')} />
          </div>
          <div className="col-md-6">
            <TextField
              label="Button text"
              hint="The second button books a discovery call using the booking link from Settings."
              {...bind('cta', 'buttonLabel')}
            />
          </div>
          <div className="col-md-6">
            <SelectField label="Opens page" options={sitePages} {...bind('cta', 'link')} />
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
              <span className="pe-serp-url">integraadvisorypartners.com › packages</span>
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

export default PackagesPage

import {
  FiBarChart2,
  FiFlag,
  FiLayout,
  FiList,
  FiSearch,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import MediaField from '../components/editor/MediaField.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TagsField from '../components/editor/TagsField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/processPage.js'
import { sitePages } from '../constants/site.js'
import usePageEditor from '../hooks/usePageEditor.js'
import { uploadFile } from '../services/pages.js'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner at the top with the page headline.',
  },
  {
    key: 'facts',
    title: 'Key facts',
    icon: FiBarChart2,
    description: 'The small cards that overlap the bottom of the banner.',
  },
  {
    key: 'steps',
    title: 'Steps',
    icon: FiList,
    description: 'The introduction on the left and the numbered timeline of steps.',
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

// a step's link is optional
const stepLinkPages = [{ value: '', label: 'No link' }, ...sitePages]

const newId = () => crypto.randomUUID()

function ProcessPage() {
  // loads from and saves to the backend; the website Process page reads the same content
  const editor = usePageEditor(initialContent, sections, 'process', { slug: 'process' })
  const { content, update, bind, sectionProps } = editor
  const { facts, steps, seo } = content

  return (
    <PageEditorLayout
      pageName="Process"
      path="/process"
      intro="Edit the key facts and the step-by-step client journey on the website Process page. Sections are listed in the order visitors see them."
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

      {/* key facts */}
      <EditorSection {...sectionProps('facts')}>
        <h4 className="pe-subhead mt-0 pt-0 border-0">
          Fact cards
          <span className="pe-subhead-count">{facts.items.length}</span>
        </h4>
        <ListEditor
          items={facts.items}
          onChange={(items) => update('facts', { items })}
          itemTitle={(item) => [item.value, item.label].filter(Boolean).join(' · ')}
          addLabel="Add fact"
          max={4}
          createItem={() => ({ id: newId(), icon: 'FiCheck', value: '', label: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <IconSelect
                  id={`fact-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`fact-${item.id}-value`}
                  label="Value"
                  placeholder="45 min"
                  maxLength={20}
                  value={item.value}
                  onChange={(value) => setItem({ value })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`fact-${item.id}-label`}
                  label="Label"
                  maxLength={60}
                  value={item.label}
                  onChange={(label) => setItem({ label })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* steps */}
      <EditorSection {...sectionProps('steps')}>
        <h4 className="pe-subhead mt-0 pt-0 border-0">Introduction (left side)</h4>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('steps', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('steps', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline rows={2} {...bind('steps', 'lead')} />
          </div>
          <div className="col-md-6">
            <TextField label="Button text" {...bind('steps', 'buttonLabel')} />
          </div>
          <div className="col-md-6">
            <SelectField label="Opens page" options={sitePages} {...bind('steps', 'buttonLink')} />
          </div>
          <div className="col-lg-6 col-md-12 mb-3">
            <MediaField
              id="process-steps-image"
              label="Image"
              src={steps.image}
              alt={steps.alt}
              onUpload={uploadFile}
              hint="Square image shown under the button."
              onChange={({ src, alt }) =>
                update('steps', src !== undefined ? { image: src } : { alt })
              }
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
          max={12}
          createItem={() => ({
            id: newId(),
            icon: 'FiCheck',
            title: '',
            text: '',
            tags: [],
            days: [],
            linkLabel: '',
            linkTo: '',
          })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <IconSelect
                  id={`step-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`step-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`step-${item.id}-text`}
                  label="Description"
                  multiline
                  rows={2}
                  maxLength={160}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
              <div className="col-lg-6">
                <TagsField
                  id={`step-${item.id}-tags`}
                  label="Tags (optional)"
                  values={item.tags}
                  placeholder="Add a tag"
                  hint="Shown as light chips. Press Enter to add."
                  onChange={(tags) => setItem({ tags })}
                />
              </div>
              <div className="col-lg-6">
                <TagsField
                  id={`step-${item.id}-days`}
                  label="Day chips (optional)"
                  values={item.days}
                  placeholder="e.g. Day 7"
                  hint="Shown as gold chips. Press Enter to add."
                  onChange={(days) => setItem({ days })}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id={`step-${item.id}-link-label`}
                  label="Link text (optional)"
                  placeholder="e.g. Pay your deposit"
                  value={item.linkLabel}
                  onChange={(linkLabel) => setItem({ linkLabel })}
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  id={`step-${item.id}-link-to`}
                  label="Link opens"
                  options={stepLinkPages}
                  hint="The link shows only when both text and page are set."
                  value={item.linkTo}
                  onChange={(linkTo) => setItem({ linkTo })}
                />
              </div>
            </div>
          )}
        />
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
              <span className="pe-serp-url">integraadvisorypartners.com › process</span>
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

export default ProcessPage

import {
  FiAward,
  FiCompass,
  FiFlag,
  FiLayout,
  FiSearch,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import MediaField from '../components/editor/MediaField.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TagsField from '../components/editor/TagsField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/aboutPage.js'
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
    key: 'whoWeAre',
    title: 'Who we are',
    icon: FiUsers,
    description: 'Introduction, team photo, and the three highlight cards.',
  },
  {
    key: 'approach',
    title: 'Our approach',
    icon: FiCompass,
    description: 'The numbered list of what Integra helps clients understand.',
  },
  {
    key: 'drives',
    title: 'What drives us',
    icon: FiTarget,
    description: 'Mission, vision, and brand promise cards.',
  },
  {
    key: 'serveWork',
    title: 'Who we serve & how we work',
    icon: FiAward,
    description: 'The audience list, the value tags, and the legal note.',
  },
  {
    key: 'cta',
    title: 'Call to action',
    icon: FiFlag,
    description: 'The closing banner with the Integra logo.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

// fields for a list item that is a single line of text
const textItem = (prefix, label, maxLength) => (item, setItem) => (
  <TextField
    id={`${prefix}-${item.id}`}
    label={label}
    maxLength={maxLength}
    value={item.text}
    onChange={(text) => setItem({ text })}
  />
)

// fields for a card with an icon, a title, and a description
const iconCard = (prefix) => (item, setItem) => (
  <div className="row">
    <div className="col-sm-5">
      <IconSelect
        id={`${prefix}-${item.id}-icon`}
        value={item.icon}
        onChange={(icon) => setItem({ icon })}
      />
    </div>
    <div className="col-sm-7">
      <TextField
        id={`${prefix}-${item.id}-title`}
        label="Title"
        value={item.title}
        onChange={(title) => setItem({ title })}
      />
    </div>
    <div className="col-12">
      <TextField
        id={`${prefix}-${item.id}-text`}
        label="Description"
        multiline
        maxLength={240}
        value={item.text}
        onChange={(text) => setItem({ text })}
      />
    </div>
  </div>
)

function AboutPage() {
  // loads from and saves to the backend; the website About page reads the same content
  const editor = usePageEditor(initialContent, sections, 'about', { slug: 'about' })
  const { content, update, bind, sectionProps } = editor
  const { whoWeAre, approach, drives, serveWork, seo } = content

  return (
    <PageEditorLayout
      pageName="About"
      path="/about"
      intro="Edit the story, highlights, and values on the website About page. Sections are listed in the order visitors see them."
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

      {/* who we are */}
      <EditorSection {...sectionProps('whoWeAre')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('whoWeAre', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('whoWeAre', 'heading')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Paragraphs
          <span className="pe-subhead-count">{whoWeAre.paragraphs.length}</span>
        </h4>
        <ListEditor
          items={whoWeAre.paragraphs}
          onChange={(paragraphs) => update('whoWeAre', { paragraphs })}
          itemTitle={(item) => item.text}
          addLabel="Add paragraph"
          min={1}
          max={4}
          createItem={() => ({ id: newId(), text: '' })}
          renderItem={(item, setItem) => (
            <TextField
              id={`wwa-${item.id}`}
              label="Text"
              multiline
              rows={4}
              maxLength={300}
              value={item.text}
              onChange={(text) => setItem({ text })}
            />
          )}
        />

        <h4 className="pe-subhead">Team photo</h4>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <MediaField
              id="about-whoWeAre-image"
              label="Photo"
              src={whoWeAre.image}
              alt={whoWeAre.alt}
              onUpload={uploadFile}
              hint="Shown under the paragraphs."
              onChange={({ src, alt }) =>
                update('whoWeAre', src !== undefined ? { image: src } : { alt })
              }
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Highlight cards
          <span className="pe-subhead-count">{whoWeAre.highlights.length}</span>
        </h4>
        <ListEditor
          items={whoWeAre.highlights}
          onChange={(highlights) => update('whoWeAre', { highlights })}
          itemTitle={(item) => item.title}
          addLabel="Add highlight"
          max={5}
          createItem={() => ({ id: newId(), icon: 'FiCheck', title: '', text: '' })}
          renderItem={iconCard('hl')}
        />
      </EditorSection>

      {/* our approach */}
      <EditorSection {...sectionProps('approach')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('approach', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('approach', 'heading')} />
          </div>
          <div className="col-12">
            <TextField
              label="Intro text"
              multiline
              rows={2}
              hint="Leads into the numbered list below."
              {...bind('approach', 'lead')}
            />
          </div>
        </div>

        <h4 className="pe-subhead">Image</h4>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <MediaField
              id="about-approach-image"
              label="Image"
              src={approach.image}
              alt={approach.alt}
              onUpload={uploadFile}
              hint="Square image shown beside the list."
              onChange={({ src, alt }) =>
                update('approach', src !== undefined ? { image: src } : { alt })
              }
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Numbered list
          <span className="pe-subhead-count">{approach.items.length}</span>
        </h4>
        <ListEditor
          items={approach.items}
          onChange={(items) => update('approach', { items })}
          itemTitle={(item) => item.text}
          addLabel="Add list item"
          min={1}
          max={8}
          createItem={() => ({ id: newId(), text: '' })}
          renderItem={textItem('clr', 'Text', 90)}
        />
      </EditorSection>

      {/* what drives us */}
      <EditorSection {...sectionProps('drives')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('drives', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('drives', 'heading')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Cards
          <span className="pe-subhead-count">{drives.cards.length}</span>
        </h4>
        <ListEditor
          items={drives.cards}
          onChange={(cards) => update('drives', { cards })}
          itemTitle={(item) => item.title}
          addLabel="Add card"
          max={6}
          createItem={() => ({ id: newId(), icon: 'FiStar', title: '', text: '' })}
          renderItem={iconCard('drv')}
        />
      </EditorSection>

      {/* who we serve + how we work */}
      <EditorSection {...sectionProps('serveWork')}>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <div className="pe-group">
              <span className="pe-group-label">Left panel</span>
              <TextField label="Panel title" {...bind('serveWork', 'serveTitle')} />
              <span className="pe-split-label">
                Audience list ({serveWork.audience.length})
              </span>
              <ListEditor
                items={serveWork.audience}
                onChange={(audience) => update('serveWork', { audience })}
                itemTitle={(item) => item.text}
                addLabel="Add audience"
                min={1}
                max={10}
                createItem={() => ({ id: newId(), text: '' })}
                renderItem={textItem('aud', 'Text', 100)}
              />
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="pe-group">
              <span className="pe-group-label">Right panel</span>
              <TextField label="Panel title" {...bind('serveWork', 'workTitle')} />
              <TagsField
                id="about-serveWork-values"
                label="Value tags"
                values={serveWork.values}
                placeholder="Add a value"
                hint="Press Enter to add."
                onChange={(values) => update('serveWork', { values })}
              />
              <TextField
                label="Note"
                multiline
                rows={4}
                hint="Keep the not-a-law-firm wording; it is a legal requirement."
                {...bind('serveWork', 'note')}
              />
            </div>
          </div>
        </div>
      </EditorSection>

      {/* call to action */}
      <EditorSection {...sectionProps('cta')}>
        <div className="row">
          <div className="col-12">
            <TextField
              label="Banner text"
              multiline
              rows={2}
              maxLength={100}
              hint="Shown next to the Integra logo."
              {...bind('cta', 'title')}
            />
          </div>
          <div className="col-md-6">
            <TextField label="Button text" {...bind('cta', 'buttonLabel')} />
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
              <span className="pe-serp-url">integraadvisorypartners.com › about</span>
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

export default AboutPage

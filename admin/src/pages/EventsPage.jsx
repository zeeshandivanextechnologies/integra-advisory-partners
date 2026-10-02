import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiCalendar,
  FiFlag,
  FiGrid,
  FiLayout,
  FiMoon,
  FiSearch,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/eventsPage.js'
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
    key: 'formats',
    title: 'Event formats',
    icon: FiGrid,
    description: 'The cards that explain each kind of event.',
  },
  {
    key: 'spotlight',
    title: 'Integra Nights spotlight',
    icon: FiMoon,
    description: 'The navy feature box with the numbered points.',
  },
  {
    key: 'upcoming',
    title: 'Upcoming events',
    icon: FiCalendar,
    description: 'Text around the event list. The events are managed under Events.',
  },
  {
    key: 'cta',
    title: 'Call to action',
    icon: FiFlag,
    description: 'The closing banner for hosts and partners.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

// "Register Interest" buttons open the events Google Form set in the website settings
const registerHint =
  'Opens the Register Interest form from the website settings, or the Contact page if none is set.'

function EventsPage() {
  // loads from and saves to the backend; the website Events page reads the same content
  const editor = usePageEditor(initialContent, sections, 'events', { slug: 'events' })
  const { content, update, bind, sectionProps } = editor
  const { formats, spotlight, seo } = content

  return (
    <PageEditorLayout
      pageName="Events"
      path="/events"
      intro="Edit the formats, the Integra Nights spotlight, and the text on the website Events page. Add and edit the events themselves under Events."
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

      {/* event formats */}
      <EditorSection {...sectionProps('formats')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('formats', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('formats', 'heading')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Format cards
          <span className="pe-subhead-count">{formats.items.length}</span>
        </h4>
        <ListEditor
          items={formats.items}
          onChange={(items) => update('formats', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add format"
          max={8}
          createItem={() => ({ id: newId(), icon: 'FiCalendar', title: '', text: '', tag: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <IconSelect
                  id={`fmt-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`fmt-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`fmt-${item.id}-text`}
                  label="Description"
                  multiline
                  rows={2}
                  maxLength={120}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  id={`fmt-${item.id}-tag`}
                  label="Tag"
                  placeholder="Online, In person..."
                  hint="Small label in the corner of the card."
                  value={item.tag}
                  onChange={(tag) => setItem({ tag })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* integra nights spotlight */}
      <EditorSection {...sectionProps('spotlight')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('spotlight', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Title" {...bind('spotlight', 'title')} />
          </div>
          <div className="col-12">
            <TextField label="Text" multiline {...bind('spotlight', 'text')} />
          </div>
          <div className="col-md-6">
            <TextField
              label="Button text"
              hint={registerHint}
              {...bind('spotlight', 'buttonLabel')}
            />
          </div>
          <div className="col-md-6">
            <TextField label="Points label" {...bind('spotlight', 'sideLabel')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Numbered points
          <span className="pe-subhead-count">{spotlight.outcomes.length}</span>
        </h4>
        <ListEditor
          items={spotlight.outcomes}
          onChange={(outcomes) => update('spotlight', { outcomes })}
          itemTitle={(item) => item.text}
          addLabel="Add point"
          min={1}
          max={6}
          createItem={() => ({ id: newId(), text: '' })}
          renderItem={(item, setItem) => (
            <TextField
              id={`out-${item.id}`}
              label="Text"
              maxLength={60}
              value={item.text}
              onChange={(text) => setItem({ text })}
            />
          )}
        />
      </EditorSection>

      {/* upcoming events */}
      <EditorSection {...sectionProps('upcoming')}>
        <p className="pe-hint mt-0 mb-3">
          The event list comes from{' '}
          <Link to="/events">
            Events <FiArrowRight />
          </Link>
          . Past dates are hidden on the website automatically.
        </p>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('upcoming', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('upcoming', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Text" multiline rows={2} {...bind('upcoming', 'lead')} />
          </div>
          <div className="col-md-6">
            <TextField
              label="Register button text"
              hint="Shown on every event."
              {...bind('upcoming', 'registerLabel')}
            />
          </div>
        </div>

        <h4 className="pe-subhead">When there are no upcoming events</h4>
        <div className="pe-group">
          <div className="row">
            <div className="col-12">
              <TextField label="Title" {...bind('upcoming', 'emptyTitle')} />
            </div>
            <div className="col-12">
              <TextField label="Text" multiline rows={2} {...bind('upcoming', 'emptyText')} />
            </div>
            <div className="col-md-6">
              <TextField
                label="Button text"
                hint={registerHint}
                {...bind('upcoming', 'emptyButtonLabel')}
              />
            </div>
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
              label="Gold button text"
              hint={registerHint}
              {...bind('cta', 'buttonLabel')}
            />
          </div>
          <div className="col-md-6">
            <div className="pe-group">
              <span className="pe-group-label">
                <span className="pe-swatch outline"></span>
                Second button
              </span>
              <TextField label="Button text" {...bind('cta', 'secondaryLabel')} />
              <SelectField
                label="Opens page"
                options={sitePages}
                {...bind('cta', 'secondaryLink')}
              />
            </div>
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
              <span className="pe-serp-url">integraadvisorypartners.com › events</span>
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

export default EventsPage

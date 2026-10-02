import {
  FiAlertCircle,
  FiBookOpen,
  FiClock,
  FiGrid,
  FiLayout,
  FiMail,
  FiSearch,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/insightsPage.js'
import usePageEditor from '../hooks/usePageEditor.js'
import '../styles/InsightsPage.css'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner at the top with the page headline.',
  },
  {
    key: 'publish',
    title: 'What we publish',
    icon: FiGrid,
    description: 'The insight categories. Articles and topics are grouped by these.',
  },
  {
    key: 'latest',
    title: 'Latest insights',
    icon: FiBookOpen,
    description: 'Heading above the article cards. Shown only when there are articles.',
  },
  {
    key: 'topics',
    title: 'Topics',
    icon: FiClock,
    description: 'Upcoming topics with category tabs.',
  },
  {
    key: 'brief',
    title: 'Monthly brief',
    icon: FiMail,
    description: 'The mailing list sign-up banner.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function InsightsPage() {
  // loads from and saves to the backend; the website Insights page reads the same content
  const editor = usePageEditor(initialContent, sections, 'insights', { slug: 'insights' })
  const { content, update, bind, sectionProps } = editor
  const { publish, topics, seo } = content

  const categoryOptions = publish.categories.map((category) => ({
    value: category.key,
    label: category.title || 'Untitled category',
  }))
  const categoryKeys = new Set(publish.categories.map((category) => category.key))
  const orphanTopics = topics.items.filter((topic) => !categoryKeys.has(topic.category))

  return (
    <PageEditorLayout
      pageName="Insights"
      path="/insights"
      intro="Edit the categories, topics, and monthly brief on the website Insights page. Articles are managed separately."
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

      {/* what we publish */}
      <EditorSection {...sectionProps('publish')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('publish', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('publish', 'heading')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Categories
          <span className="pe-subhead-count">{publish.categories.length}</span>
        </h4>
        <ListEditor
          items={publish.categories}
          onChange={(categories) => update('publish', { categories })}
          itemTitle={(item) => item.title}
          addLabel="Add category"
          min={1}
          max={8}
          createItem={() => {
            const id = newId()
            // a new category gets a fixed key so renaming it never breaks links
            return { id, key: id, icon: 'FiBookOpen', title: '', text: '' }
          }}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-12">
                <span className="ins-key">
                  Linked to articles and topics as <code>{item.key}</code>
                </span>
              </div>
              <div className="col-sm-5">
                <IconSelect
                  id={`cat-${item.id}-icon`}
                  value={item.icon}
                  onChange={(icon) => setItem({ icon })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`cat-${item.id}-title`}
                  label="Title"
                  hint="Also used for the tab and the tag on articles and topics."
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
              <div className="col-12">
                <TextField
                  id={`cat-${item.id}-text`}
                  label="Description"
                  multiline
                  rows={2}
                  maxLength={120}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* latest insights */}
      <EditorSection {...sectionProps('latest')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('latest', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField
              label="Heading"
              maxLength={90}
              hint="The article cards below it come from the articles list."
              {...bind('latest', 'heading')}
            />
          </div>
        </div>
      </EditorSection>

      {/* topics */}
      <EditorSection {...sectionProps('topics')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('topics', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('topics', 'heading')} />
          </div>
          <div className="col-md-6">
            <TextField
              label="First tab text"
              hint="The tab that shows every topic."
              {...bind('topics', 'allLabel')}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Status text"
              hint="Shown at the bottom of each topic card."
              {...bind('topics', 'statusLabel')}
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Topic cards
          <span className="pe-subhead-count">{topics.items.length}</span>
        </h4>

        {orphanTopics.length > 0 && (
          <p className="ins-warning" role="status">
            <FiAlertCircle />
            <span>
              These topics use a category that no longer exists:{' '}
              <strong>
                {orphanTopics.map((topic) => topic.title || 'Untitled').join(', ')}
              </strong>
              . Pick a new category for them.
            </span>
          </p>
        )}

        <ListEditor
          items={topics.items}
          onChange={(items) => update('topics', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add topic"
          max={18}
          createItem={() => ({
            id: newId(),
            category: publish.categories[0]?.key || '',
            title: '',
          })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <SelectField
                  id={`top-${item.id}-category`}
                  label="Category"
                  options={
                    categoryKeys.has(item.category)
                      ? categoryOptions
                      : [{ value: item.category, label: 'Choose a category' }, ...categoryOptions]
                  }
                  value={item.category}
                  onChange={(category) => setItem({ category })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`top-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* monthly brief */}
      <EditorSection {...sectionProps('brief')}>
        <div className="row">
          <div className="col-12">
            <TextField label="Heading" maxLength={70} {...bind('brief', 'title')} />
          </div>
          <div className="col-12">
            <TextField label="Text" multiline rows={2} {...bind('brief', 'text')} />
          </div>
          <div className="col-md-6">
            <TextField
              label="Subscribe button text"
              hint="Sign-ups go to the mailing list set in the website settings."
              {...bind('brief', 'buttonLabel')}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Button text without a mailing list"
              hint="Used only if no mailing list is connected; it opens the Contact page."
              {...bind('brief', 'fallbackLabel')}
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
              <span className="pe-serp-url">integraadvisorypartners.com › insights</span>
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

export default InsightsPage

import { FiLayout, FiFileText, FiSearch } from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/privacyPolicyPage.js'
import usePageEditor from '../hooks/usePageEditor.js'

const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The banner at the top with the page headline.',
  },
  {
    key: 'content',
    title: 'Policy Content',
    icon: FiFileText,
    description: 'The main sections of the privacy policy.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function PrivacyPolicyPage() {
  const editor = usePageEditor(initialContent, sections, 'privacy-policy', { slug: 'privacy-policy' })
  const { content, update, bind, sectionProps } = editor
  const { seo } = content

  return (
    <PageEditorLayout
      pageName="Privacy Policy"
      path="/privacy-policy"
      intro="Edit the privacy policy content."
      sections={sections}
      editor={editor}
    >
      {/* page banner */}
      <EditorSection {...sectionProps('banner')}>
        <div className="row">
          <div className="col-12">
            <TextField
              label="Headline"
              maxLength={90}
              {...bind('banner', 'title')}
            />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline maxLength={200} {...bind('banner', 'text')} />
          </div>
        </div>
      </EditorSection>

      {/* policy content */}
      <EditorSection {...sectionProps('content')}>
        <h4 className="pe-subhead">
          Sections
          <span className="pe-subhead-count">{content.content.sections.length}</span>
        </h4>
        <ListEditor
          items={content.content.sections}
          onChange={(sections) => update('content', { sections })}
          itemTitle={(item) => item.title}
          addLabel="Add section"
          min={1}
          max={20}
          createItem={() => ({ id: newId(), title: '', text: '' })}
          renderItem={(item, setItem) => (
            <>
              <TextField
                id={`sec-${item.id}-title`}
                label="Section Title"
                value={item.title}
                onChange={(title) => setItem({ title })}
              />
              <TextField
                id={`sec-${item.id}-text`}
                label="Content"
                multiline
                rows={6}
                value={item.text}
                onChange={(text) => setItem({ text })}
              />
            </>
          )}
        />
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
              <span className="pe-serp-url">integraadvisorypartners.com › privacy-policy</span>
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

export default PrivacyPolicyPage

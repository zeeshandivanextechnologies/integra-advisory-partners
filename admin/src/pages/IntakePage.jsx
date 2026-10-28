import {
  FiHelpCircle,
  FiLayout,
  FiSearch,
} from 'react-icons/fi'
import EditorSection from '../components/editor/EditorSection.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import PageEditorLayout from '../components/editor/PageEditorLayout.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/intakePage.js'
import usePageEditor from '../hooks/usePageEditor.js'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner at the top with the headline and intro.',
  },
  {
    key: 'whyWeAsk',
    title: 'Why We Ask',
    icon: FiHelpCircle,
    description: 'The reasons listed in the left sidebar explaining every question.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function IntakePage() {
  // loads from and saves to the backend; the website Intake page reads the same content
  const editor = usePageEditor(initialContent, sections, 'intake', { slug: 'intake' })
  const { content, update, bind, sectionProps } = editor
  const { whyWeAsk, seo } = content

  return (
    <PageEditorLayout
      pageName="Market Entry Review (Intake)"
      path="/intake"
      intro="Edit the headline, banner text, and the 'Why We Ask' points shown on the website Intake page."
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
              maxLength={150}
              hint="The main heading of the page (H1). The breadcrumb is added automatically."
              {...bind('banner', 'title')}
            />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline maxLength={250} {...bind('banner', 'text')} />
          </div>
        </div>
      </EditorSection>

      {/* why we ask */}
      <EditorSection {...sectionProps('whyWeAsk')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('whyWeAsk', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('whyWeAsk', 'heading')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Reasons list
          <span className="pe-subhead-count">{whyWeAsk.reasons.length}</span>
        </h4>
        <ListEditor
          items={whyWeAsk.reasons}
          onChange={(reasons) => update('whyWeAsk', { reasons })}
          itemTitle={(item) => item.field}
          addLabel="Add reason"
          max={15}
          createItem={() => ({ id: newId(), field: '', reason: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-5">
                <TextField
                  id={`reason-${item.id}-field`}
                  label="Question / Field Name"
                  placeholder="e.g. Country of origin"
                  value={item.field}
                  onChange={(field) => setItem({ field })}
                />
              </div>
              <div className="col-sm-7">
                <TextField
                  id={`reason-${item.id}-reason`}
                  label="Why We Ask (Reason / Purpose)"
                  placeholder="e.g. Segment regional and international markets."
                  value={item.reason}
                  onChange={(reason) => setItem({ reason })}
                />
              </div>
            </div>
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
              <span className="pe-serp-url">integraadvisorypartners.com › intake</span>
              <span className="pe-serp-title">
                {seo.title || 'Market Entry Review'} | Integra Advisory Partners
              </span>
              <p className="pe-serp-text">{seo.description || 'Meta description'}</p>
            </div>
          </div>
        </div>
      </EditorSection>
    </PageEditorLayout>
  )
}

export default IntakePage

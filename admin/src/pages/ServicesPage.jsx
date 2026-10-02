import {
  FiAlertCircle,
  FiBriefcase,
  FiCheck,
  FiColumns,
  FiFlag,
  FiLayout,
  FiPlus,
  FiSearch,
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
import initialContent from '../constants/servicesPage.js'
import { sitePages } from '../constants/site.js'
import usePageEditor from '../hooks/usePageEditor.js'
import { uploadFile } from '../services/pages.js'
import '../styles/ServicesPage.css'

// in the order they appear on the website
const sections = [
  {
    key: 'banner',
    title: 'Page banner',
    icon: FiLayout,
    description: 'The navy banner with the headline and the focus-area tags.',
  },
  {
    key: 'pillars',
    title: 'Four pillars',
    icon: FiColumns,
    description: 'Pillar cards and which services sit under each one.',
  },
  {
    key: 'advisory',
    title: 'Advisory pathways',
    icon: FiBriefcase,
    description: 'The numbered advisory service cards.',
  },
  {
    key: 'network',
    title: 'Network & relationships',
    icon: FiUsers,
    description: 'Partnership image and the network service cards.',
  },
  {
    key: 'cta',
    title: 'Call to action',
    icon: FiFlag,
    description: 'The closing banner with two buttons.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

const newId = () => crypto.randomUUID()

function ServicesPage() {
  // loads from and saves to the backend; the website Services page reads the same content
  const editor = usePageEditor(initialContent, sections, 'services', { slug: 'services' })
  const { content, update, bind, sectionProps } = editor
  const { banner, pillars, advisory, network, cta, seo } = content

  // every service card, in website order; pillars link to them by id
  const allServices = [...advisory.items, ...network.items]
  const assigned = new Set(pillars.items.flatMap((pillar) => pillar.services))
  const unassigned = allServices.filter((service) => !assigned.has(service.id))

  const updateButton = (name, changes) =>
    update('cta', { [name]: { ...cta[name], ...changes } })

  // icon, title, and description fields shared by both service lists
  const serviceFields = (prefix, item, setItem) => (
    <>
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
          maxLength={260}
          value={item.text}
          onChange={(text) => setItem({ text })}
        />
      </div>
    </>
  )

  return (
    <PageEditorLayout
      pageName="Services"
      path="/services"
      intro="Edit the pillars and service cards on the website Services page. Sections are listed in the order visitors see them."
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
          <div className="col-12">
            <TagsField
              id="services-banner-focus"
              label="Focus areas"
              values={banner.focusAreas}
              placeholder="Add a focus area"
              hint="Shown as tags under the intro text. Press Enter to add."
              onChange={(focusAreas) => update('banner', { focusAreas })}
            />
          </div>
        </div>
      </EditorSection>

      {/* four pillars */}
      <EditorSection {...sectionProps('pillars')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('pillars', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('pillars', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline rows={2} {...bind('pillars', 'lead')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Pillar cards
          <span className="pe-subhead-count">{pillars.items.length}</span>
        </h4>

        {unassigned.length > 0 && (
          <p className="svc-warning" role="status">
            <FiAlertCircle />
            <span>
              Not under any pillar yet:{' '}
              <strong>
                {unassigned.map((service) => service.title || 'Untitled').join(', ')}
              </strong>
              . These cards show without a pillar label.
            </span>
          </p>
        )}

        <ListEditor
          items={pillars.items}
          onChange={(items) => update('pillars', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add pillar"
          max={6}
          createItem={() => ({ id: newId(), image: '', title: '', text: '', services: [] })}
          renderItem={(item, setItem) => (
            <div className="row">
              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="svc-pillar-icon">
                  <MediaField
                    id={`pil-${item.id}-image`}
                    label="Icon"
                    src={item.image}
                    onUpload={uploadFile}
                    onChange={({ src }) => setItem({ image: src })}
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <TextField
                  id={`pil-${item.id}-title`}
                  label="Title"
                  value={item.title}
                  onChange={(title) => setItem({ title })}
                />
                <TextField
                  id={`pil-${item.id}-text`}
                  label="Description"
                  multiline
                  rows={2}
                  maxLength={120}
                  value={item.text}
                  onChange={(text) => setItem({ text })}
                />
              </div>
              <div className="col-12">
                <span className="svc-picker-label" id={`pil-${item.id}-services`}>
                  Services under this pillar
                </span>
                <div
                  className="svc-chips"
                  role="group"
                  aria-labelledby={`pil-${item.id}-services`}
                >
                  {allServices.map((service) => {
                    const checked = item.services.includes(service.id)
                    return (
                      <label
                        className={`svc-chip ${checked ? 'active' : ''}`}
                        key={service.id}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setItem({
                              services: checked
                                ? item.services.filter((id) => id !== service.id)
                                : [...item.services, service.id],
                            })
                          }
                        />
                        {checked ? <FiCheck /> : <FiPlus />}
                        {service.title || 'Untitled'}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* advisory pathways */}
      <EditorSection {...sectionProps('advisory')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('advisory', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('advisory', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline rows={2} {...bind('advisory', 'lead')} />
          </div>
        </div>

        <h4 className="pe-subhead">
          Service cards
          <span className="pe-subhead-count">{advisory.items.length}</span>
        </h4>
        <ListEditor
          items={advisory.items}
          onChange={(items) => update('advisory', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add advisory service"
          max={8}
          createItem={() => ({ id: newId(), icon: 'FiBriefcase', title: '', text: '', note: '' })}
          renderItem={(item, setItem) => (
            <div className="row">
              {serviceFields('adv', item, setItem)}
              <div className="col-12">
                <TextField
                  id={`adv-${item.id}-note`}
                  label="Highlighted note (optional)"
                  placeholder="e.g. Bank approval is never guaranteed."
                  hint="Shown in a gold box under the description. Leave empty to hide."
                  value={item.note}
                  onChange={(note) => setItem({ note })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* network & relationships */}
      <EditorSection {...sectionProps('network')}>
        <div className="row">
          <div className="col-md-4">
            <TextField label="Eyebrow" {...bind('network', 'eyebrow')} />
          </div>
          <div className="col-md-8">
            <TextField label="Heading" maxLength={90} {...bind('network', 'heading')} />
          </div>
          <div className="col-12">
            <TextField label="Intro text" multiline rows={2} {...bind('network', 'lead')} />
          </div>
        </div>

        <h4 className="pe-subhead">Image</h4>
        <div className="row">
          <div className="col-md-12 col-lg-6 mb-3">
            <MediaField
              id="services-network-image"
              label="Image"
              src={network.image}
              alt={network.alt}
              onUpload={uploadFile}
              hint="Square image shown beside the cards."
              onChange={({ src, alt }) =>
                update('network', src !== undefined ? { image: src } : { alt })
              }
            />
          </div>
        </div>

        <h4 className="pe-subhead">
          Service cards
          <span className="pe-subhead-count">{network.items.length}</span>
        </h4>
        <ListEditor
          items={network.items}
          onChange={(items) => update('network', { items })}
          itemTitle={(item) => item.title}
          addLabel="Add network service"
          max={6}
          createItem={() => ({ id: newId(), icon: 'FiUsers', title: '', text: '' })}
          renderItem={(item, setItem) => (
            <div className="row">{serviceFields('net', item, setItem)}</div>
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
        </div>

        <h4 className="pe-subhead">Buttons</h4>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <div className="pe-group">
              <span className="pe-group-label">
                <span className="pe-swatch gold"></span>
                Primary button
              </span>
              <TextField
                id="services-cta-primary-label"
                label="Button text"
                value={cta.primaryCta.label}
                onChange={(label) => updateButton('primaryCta', { label })}
              />
              <SelectField
                id="services-cta-primary-link"
                label="Opens page"
                options={sitePages}
                value={cta.primaryCta.link}
                onChange={(link) => updateButton('primaryCta', { link })}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="pe-group">
              <span className="pe-group-label">
                <span className="pe-swatch outline"></span>
                Secondary button
              </span>
              <TextField
                id="services-cta-secondary-label"
                label="Button text"
                value={cta.secondaryCta.label}
                onChange={(label) => updateButton('secondaryCta', { label })}
              />
              <SelectField
                id="services-cta-secondary-link"
                label="Opens page"
                options={sitePages}
                value={cta.secondaryCta.link}
                onChange={(link) => updateButton('secondaryCta', { link })}
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
              <span className="pe-serp-url">integraadvisorypartners.com › services</span>
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

export default ServicesPage

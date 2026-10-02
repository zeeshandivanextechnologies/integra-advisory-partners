import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiArrowUpRight,
  FiAward,
  FiCheck,
  FiChevronRight,
  FiLayers,
  FiMonitor,
  FiRotateCcw,
  FiSave,
  FiSearch,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import EditorSection from '../components/editor/EditorSection.jsx'
import IconSelect from '../components/editor/IconSelect.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import MediaField from '../components/editor/MediaField.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TagsField from '../components/editor/TagsField.jsx'
import TextField from '../components/editor/TextField.jsx'
import initialContent from '../constants/homePage.js'
import { sitePages, websiteUrl } from '../constants/site.js'
import { getPage, savePage, uploadFile } from '../services/pages.js'
import '../styles/PageEditor.css'

const PAGE_SLUG = 'home'

// in the order they appear on the website
const sections = [
  {
    key: 'hero',
    title: 'Hero',
    icon: FiMonitor,
    description: 'The first screen: headline, buttons, background video, and the markets card.',
  },
  {
    key: 'audience',
    title: 'Who we serve',
    icon: FiUsers,
    description: 'Audience cards with a photo, an icon, and a short description.',
  },
  {
    key: 'challenge',
    title: 'The challenge',
    icon: FiAlertTriangle,
    description: 'The problem statement and the list of what founders need to understand.',
  },
  {
    key: 'why',
    title: 'Why Integra',
    icon: FiAward,
    description: 'Team photo, four reason tiles, and the wide feature card.',
  },
  {
    key: 'services',
    title: 'Service pathways',
    icon: FiLayers,
    description: 'Service cards and the "not sure which pathway fits" card.',
  },
  {
    key: 'cta',
    title: 'Call to action',
    icon: FiTarget,
    description: 'The closing banner at the bottom of the page.',
  },
  {
    key: 'seo',
    title: 'SEO',
    icon: FiSearch,
    description: 'How the page appears in search results and the browser tab.',
  },
]

// sections that can be hidden (SEO cannot)
const toggleable = sections.filter((section) => section.key !== 'seo')

const newId = () => crypto.randomUUID()

const sectionId = (key) => `home-${key}`

// Saved content over the defaults, section by section, so a field added to
// the editor later still has a value for pages saved before it existed
const withDefaults = (saved) =>
  Object.fromEntries(
    Object.entries(initialContent).map(([key, section]) => [
      key,
      { ...section, ...(saved?.[key] || {}) },
    ]),
  )

function HomePage() {
  const [content, setContent] = useState(initialContent)
  const [savedContent, setSavedContent] = useState(initialContent)
  const [justSaved, setJustSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const dirty = content !== savedContent

  // load what was last saved; until then the defaults stay in place
  useEffect(() => {
    let active = true

    getPage(PAGE_SLUG)
      .then((result) => {
        if (!active || !result?.content) return
        const loaded = withDefaults(result.content)
        setContent(loaded)
        setSavedContent(loaded)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  // warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!dirty) return undefined
    const handleBeforeUnload = (event) => event.preventDefault()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirty])

  useEffect(() => {
    if (!justSaved) return undefined
    const timer = setTimeout(() => setJustSaved(false), 4000)
    return () => clearTimeout(timer)
  }, [justSaved])

  const update = (key, changes) =>
    setContent((current) => ({ ...current, [key]: { ...current[key], ...changes } }))

  // for nested objects like hero.primaryCta or why.feature
  const updateNested = (key, name, changes) =>
    setContent((current) => ({
      ...current,
      [key]: { ...current[key], [name]: { ...current[key][name], ...changes } },
    }))

  // id, value, and onChange for a field stored at content[key][name]
  const bind = (key, name) => ({
    id: `${sectionId(key)}-${name}`,
    value: content[key][name],
    onChange: (value) => update(key, { [name]: value }),
  })

  const sectionProps = (key) => {
    const index = sections.findIndex((section) => section.key === key)
    const { title, icon, description } = sections[index]
    const props = { id: sectionId(key), number: index + 1, title, icon, description }

    if (key === 'seo') return props
    return {
      ...props,
      visible: content[key].visible,
      onToggleVisible: (visible) => update(key, { visible }),
    }
  }

  const handleSave = async () => {
    // edits made while the request is running stay marked as unsaved
    const snapshot = content
    setSaving(true)
    setSaveError('')
    try {
      await savePage(PAGE_SLUG, snapshot)
      setSavedContent(snapshot)
      setLoadError(false)
      setJustSaved(true)
      // same solid green toast as login
      toast.success('Home page saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (error) {
      setSaveError(error.message || 'Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDiscard = () => {
    setContent(savedContent)
    setSaveError('')
  }

  if (loading) return <Loader label="Loading home page content" />

  const { hero, audience, challenge, why, services, seo } = content
  const visibleCount = toggleable.filter((section) => content[section.key].visible).length

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Website Pages <FiChevronRight /> Home
            </span>
            <h2 className="pe-banner-title">Home page</h2>
            <p className="pe-banner-text">
              Edit the text, images, and cards on the website home page.
              Sections are listed in the order visitors see them.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pe-btn ghost"
            >
              View on Website <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <div className="row">
        {/* ---------- section nav ---------- */}
        <div className="col-xl-3 mb-3">
          <aside className="pe-nav" aria-label="Page sections">
            <span className="pe-nav-label">Page sections</span>
            <ul>
              {sections.map((section, index) => {
                const hidden = content[section.key].visible === false
                return (
                  <li key={section.key}>
                    <a href={`#${sectionId(section.key)}`} className="pe-nav-link">
                      <span className="pe-nav-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="pe-nav-text">{section.title}</span>
                      {hidden && <span className="pe-nav-badge">Hidden</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="pe-nav-foot">
              {visibleCount} of {toggleable.length} sections visible
            </p>
          </aside>
        </div>

        {/* ---------- sections ---------- */}
        <div className="col-xl-9">
          {/* hero */}
          <EditorSection {...sectionProps('hero')}>
            <div className="row">
              <div className="col-12">
                <TextField label="Eyebrow" maxLength={50} {...bind('hero', 'eyebrow')} />
              </div>
              <div className="col-12">
                <TextField
                  label="Headline"
                  multiline
                  rows={2}
                  maxLength={110}
                  hint="The main heading of the page (H1)."
                  {...bind('hero', 'title')}
                />
              </div>
              <div className="col-12">
                <TextField
                  label="Intro text"
                  multiline
                  maxLength={240}
                  {...bind('hero', 'text')}
                />
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
                    id="home-hero-primary-label"
                    label="Button text"
                    value={hero.primaryCta.label}
                    onChange={(label) => updateNested('hero', 'primaryCta', { label })}
                  />
                  <SelectField
                    id="home-hero-primary-link"
                    label="Opens page"
                    options={sitePages}
                    value={hero.primaryCta.link}
                    onChange={(link) => updateNested('hero', 'primaryCta', { link })}
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
                    id="home-hero-secondary-label"
                    label="Button text"
                    value={hero.secondaryCta.label}
                    onChange={(label) => updateNested('hero', 'secondaryCta', { label })}
                  />
                  <SelectField
                    id="home-hero-secondary-link"
                    label="Opens page"
                    options={sitePages}
                    value={hero.secondaryCta.link}
                    onChange={(link) => updateNested('hero', 'secondaryCta', { link })}
                  />
                </div>
              </div>
              <div className="col-12">
                <TextField
                  label="Trust line"
                  hint="Short line under the buttons, shown with a map pin."
                  {...bind('hero', 'trust')}
                />
              </div>
            </div>

            <h4 className="pe-subhead">Background video</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <MediaField
                  id="home-hero-video"
                  label="Video"
                  video
                  src={hero.video}
                  onUpload={uploadFile}
                  hint="Plays muted behind the headline. Hidden on phones. MP4 or WebM, up to 50 MB."
                  onChange={({ src }) => update('hero', { video: src })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <MediaField
                  id="home-hero-poster"
                  label="Poster image"
                  src={hero.poster}
                  onUpload={uploadFile}
                  hint="Shown while the video loads."
                  onChange={({ src }) => update('hero', { poster: src })}
                />
              </div>
            </div>

            <h4 className="pe-subhead">Markets card</h4>
            <div className="row">
              <div className="col-12">
                <TextField label="Card title" {...bind('hero', 'cardTitle')} />
              </div>
              <div className="col-lg-6">
                <TagsField
                  id="home-hero-markets"
                  label="Markets"
                  values={hero.markets}
                  placeholder="Add a market"
                  hint="Press Enter to add."
                  onChange={(markets) => update('hero', { markets })}
                />
              </div>
              <div className="col-lg-6">
                <TagsField
                  id="home-hero-pillars"
                  label="Pillars"
                  values={hero.pillars}
                  placeholder="Add a pillar"
                  hint='Also shown on the "Why Integra" photo card.'
                  onChange={(pillars) => update('hero', { pillars })}
                />
              </div>
            </div>
          </EditorSection>

          {/* who we serve */}
          <EditorSection {...sectionProps('audience')}>
            <div className="row">
              <div className="col-md-4">
                <TextField label="Eyebrow" {...bind('audience', 'eyebrow')} />
              </div>
              <div className="col-md-8">
                <TextField label="Heading" maxLength={90} {...bind('audience', 'heading')} />
              </div>
              <div className="col-12">
                <TextField label="Intro text" multiline rows={2} {...bind('audience', 'lead')} />
              </div>
            </div>

            <h4 className="pe-subhead">
              Audience cards
              <span className="pe-subhead-count">{audience.items.length}</span>
            </h4>
            <ListEditor
              items={audience.items}
              onChange={(items) => update('audience', { items })}
              itemTitle={(item) => item.title}
              addLabel="Add audience card"
              max={8}
              createItem={() => ({
                id: newId(),
                icon: 'FiUsers',
                title: '',
                image: '',
                alt: '',
                text: '',
              })}
              renderItem={(item, setItem) => (
                <div className="row">
                  <div className="col-lg-5 mb-3 mb-lg-0">
                    <MediaField
                      id={`aud-${item.id}-image`}
                      label="Photo"
                      src={item.image}
                      alt={item.alt}
                      onUpload={uploadFile}
                      onChange={({ src, alt }) =>
                        setItem(src !== undefined ? { image: src } : { alt })
                      }
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-sm-5">
                        <IconSelect
                          id={`aud-${item.id}-icon`}
                          value={item.icon}
                          onChange={(icon) => setItem({ icon })}
                        />
                      </div>
                      <div className="col-sm-7">
                        <TextField
                          id={`aud-${item.id}-title`}
                          label="Title"
                          value={item.title}
                          onChange={(title) => setItem({ title })}
                        />
                      </div>
                    </div>
                    <TextField
                      id={`aud-${item.id}-text`}
                      label="Description"
                      multiline
                      maxLength={140}
                      value={item.text}
                      onChange={(text) => setItem({ text })}
                    />
                  </div>
                </div>
              )}
            />
          </EditorSection>

          {/* the challenge */}
          <EditorSection {...sectionProps('challenge')}>
            <div className="row">
              <div className="col-md-4">
                <TextField label="Eyebrow" {...bind('challenge', 'eyebrow')} />
              </div>
              <div className="col-md-8">
                <TextField label="Heading" maxLength={90} {...bind('challenge', 'heading')} />
              </div>
              <div className="col-12">
                <TextField label="Intro text" multiline {...bind('challenge', 'lead')} />
              </div>
            </div>

            <h4 className="pe-subhead">Solution box</h4>
            <div className="pe-group mb-3">
              <div className="row">
                <div className="col-12">
                  <TextField label="Solution text" {...bind('challenge', 'solution')} />
                </div>
                <div className="col-md-6">
                  <TextField label="Link text" {...bind('challenge', 'linkLabel')} />
                </div>
                <div className="col-md-6">
                  <SelectField
                    label="Opens page"
                    options={sitePages}
                    {...bind('challenge', 'link')}
                  />
                </div>
              </div>
            </div>

            <h4 className="pe-subhead">
              Challenge list
              <span className="pe-subhead-count">{challenge.items.length}</span>
            </h4>
            <TextField label="List label" {...bind('challenge', 'panelLabel')} />
            <ListEditor
              items={challenge.items}
              onChange={(items) => update('challenge', { items })}
              itemTitle={(item) => item.label}
              addLabel="Add challenge"
              max={10}
              createItem={() => ({ id: newId(), icon: 'FiAlertTriangle', label: '' })}
              renderItem={(item, setItem) => (
                <div className="row">
                  <div className="col-sm-5">
                    <IconSelect
                      id={`chl-${item.id}-icon`}
                      value={item.icon}
                      onChange={(icon) => setItem({ icon })}
                    />
                  </div>
                  <div className="col-sm-7">
                    <TextField
                      id={`chl-${item.id}-label`}
                      label="Label"
                      value={item.label}
                      onChange={(label) => setItem({ label })}
                    />
                  </div>
                </div>
              )}
            />
            <TextField
              label="Closing card text"
              hint="The wide card shown after the list."
              {...bind('challenge', 'closing')}
            />
          </EditorSection>

          {/* why integra */}
          <EditorSection {...sectionProps('why')}>
            <div className="row">
              <div className="col-md-4">
                <TextField label="Eyebrow" {...bind('why', 'eyebrow')} />
              </div>
              <div className="col-md-8">
                <TextField label="Heading" maxLength={90} {...bind('why', 'heading')} />
              </div>
              <div className="col-12">
                <TextField label="Intro text" multiline rows={2} {...bind('why', 'lead')} />
              </div>
            </div>

            <h4 className="pe-subhead">Team photo</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <MediaField
                  id="home-why-image"
                  label="Photo"
                  src={why.image}
                  alt={why.alt}
                  onUpload={uploadFile}
                  onChange={({ src, alt }) =>
                    update('why', src !== undefined ? { image: src } : { alt })
                  }
                />
              </div>
              <div className="col-md-6">
                <TextField
                  label="Photo card label"
                  hint="The card on the photo lists the pillars from the Hero section."
                  {...bind('why', 'photoLabel')}
                />
                <div className="pe-preview-chips">
                  {hero.pillars.map((pillar) => (
                    <span key={pillar}>
                      <FiCheck />
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h4 className="pe-subhead">
              Reason tiles
              <span className="pe-subhead-count">
                {why.reasons.length} / 4
              </span>
            </h4>
            <ListEditor
              items={why.reasons}
              onChange={(reasons) => update('why', { reasons })}
              itemTitle={(item) => item.title}
              addLabel="Add reason"
              max={4}
              createItem={() => ({ id: newId(), icon: 'FiCheck', title: '', text: '' })}
              renderItem={(item, setItem) => (
                <div className="row">
                  <div className="col-sm-5">
                    <IconSelect
                      id={`why-${item.id}-icon`}
                      value={item.icon}
                      onChange={(icon) => setItem({ icon })}
                    />
                  </div>
                  <div className="col-sm-7">
                    <TextField
                      id={`why-${item.id}-title`}
                      label="Title"
                      value={item.title}
                      onChange={(title) => setItem({ title })}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      id={`why-${item.id}-text`}
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

            <h4 className="pe-subhead">Feature card</h4>
            <div className="pe-group">
              <div className="row">
                <div className="col-sm-5">
                  <IconSelect
                    id="home-why-feature-icon"
                    value={why.feature.icon}
                    onChange={(icon) => updateNested('why', 'feature', { icon })}
                  />
                </div>
                <div className="col-sm-7">
                  <TextField
                    id="home-why-feature-title"
                    label="Title"
                    value={why.feature.title}
                    onChange={(title) => updateNested('why', 'feature', { title })}
                  />
                </div>
                <div className="col-12">
                  <TextField
                    id="home-why-feature-text"
                    label="Description"
                    multiline
                    rows={2}
                    value={why.feature.text}
                    onChange={(text) => updateNested('why', 'feature', { text })}
                  />
                </div>
                <div className="col-md-6">
                  <div className="pe-split">
                    <span className="pe-split-label">Left box</span>
                    <TextField
                      id="home-why-feature-left-label"
                      label="Small label"
                      value={why.feature.leftLabel}
                      onChange={(leftLabel) => updateNested('why', 'feature', { leftLabel })}
                    />
                    <TextField
                      id="home-why-feature-left-value"
                      label="Text"
                      value={why.feature.leftValue}
                      onChange={(leftValue) => updateNested('why', 'feature', { leftValue })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pe-split">
                    <span className="pe-split-label">Right box</span>
                    <TextField
                      id="home-why-feature-right-label"
                      label="Small label"
                      value={why.feature.rightLabel}
                      onChange={(rightLabel) => updateNested('why', 'feature', { rightLabel })}
                    />
                    <TextField
                      id="home-why-feature-right-value"
                      label="Text"
                      value={why.feature.rightValue}
                      onChange={(rightValue) => updateNested('why', 'feature', { rightValue })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </EditorSection>

          {/* service pathways */}
          <EditorSection {...sectionProps('services')}>
            <div className="row">
              <div className="col-md-4">
                <TextField label="Eyebrow" {...bind('services', 'eyebrow')} />
              </div>
              <div className="col-md-8">
                <TextField label="Heading" maxLength={90} {...bind('services', 'heading')} />
              </div>
              <div className="col-md-6">
                <TextField
                  label="Button text"
                  hint="Opens the Services page."
                  {...bind('services', 'buttonLabel')}
                />
              </div>
            </div>

            <h4 className="pe-subhead">
              Service cards
              <span className="pe-subhead-count">{services.items.length}</span>
            </h4>
            <ListEditor
              items={services.items}
              onChange={(items) => update('services', { items })}
              itemTitle={(item) => item.title}
              addLabel="Add service card"
              max={11}
              createItem={() => ({ id: newId(), icon: 'FiLayers', title: '', text: '' })}
              renderItem={(item, setItem) => (
                <div className="row">
                  <div className="col-sm-5">
                    <IconSelect
                      id={`srv-${item.id}-icon`}
                      value={item.icon}
                      onChange={(icon) => setItem({ icon })}
                    />
                  </div>
                  <div className="col-sm-7">
                    <TextField
                      id={`srv-${item.id}-title`}
                      label="Title"
                      value={item.title}
                      onChange={(title) => setItem({ title })}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      id={`srv-${item.id}-text`}
                      label="Description"
                      multiline
                      maxLength={180}
                      value={item.text}
                      onChange={(text) => setItem({ text })}
                    />
                  </div>
                </div>
              )}
            />

            <h4 className="pe-subhead">Help card</h4>
            <div className="pe-group">
              <div className="row">
                <div className="col-md-6">
                  <TextField label="Title" {...bind('services', 'helpTitle')} />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Text"
                    hint="The button books a discovery call using the booking link from Settings."
                    {...bind('services', 'helpText')}
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
                  maxLength={130}
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
                  maxLength={60}
                  hint="Shown in the browser tab and as the search result heading."
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
                  <span className="pe-serp-url">integraadvisorypartners.com</span>
                  <span className="pe-serp-title">{seo.title || 'Page title'}</span>
                  <p className="pe-serp-text">
                    {seo.description || 'Meta description'}
                  </p>
                </div>
              </div>
            </div>
          </EditorSection>
        </div>
      </div>

      {/* ---------- save bar ---------- */}
      <div className={`pe-savebar ${dirty ? 'dirty' : ''}`}>
        <span
          className={`pe-savebar-status ${saveError || (loadError && !dirty) ? 'error' : ''}`}
          role="status"
        >
          {saveError && (
            <>
              <FiAlertCircle />
              {saveError}
            </>
          )}
          {!saveError && saving && (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              Saving...
            </>
          )}
          {!saveError && !saving && dirty && (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              You have unsaved changes
            </>
          )}
          {!saveError && !saving && !dirty && justSaved && (
            <>
              <FiCheck />
              Saved. The website now shows these changes.
            </>
          )}
          {!saveError && !saving && !dirty && !justSaved && loadError && (
            <>
              <FiAlertCircle />
              Could not load the saved content, so the default content is shown.
            </>
          )}
          {!saveError && !saving && !dirty && !justSaved && !loadError && (
            <>
              <FiCheck />
              All changes saved
            </>
          )}
        </span>

        <div className="pe-savebar-actions">
          <button
            type="button"
            className="pe-btn outline"
            disabled={!dirty || saving}
            onClick={handleDiscard}
          >
            <FiRotateCcw />
            Discard
          </button>
          <button
            type="button"
            className="pe-btn primary"
            disabled={!dirty || saving}
            onClick={handleSave}
          >
            <FiSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

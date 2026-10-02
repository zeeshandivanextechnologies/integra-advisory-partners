import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowUpRight,
  FiAlignLeft,
  FiFileText,
  FiLink,
  FiRefreshCw,
  FiSave,
  FiSend,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import EditorSection from '../components/editor/EditorSection.jsx'
import ListEditor from '../components/editor/ListEditor.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import { websiteUrl } from '../constants/site.js'
import useInsightCategories from '../hooks/useInsightCategories.js'
import { createArticle, getArticle, updateArticle } from '../services/articles.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

const blockTypes = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h2', label: 'Heading' },
  { value: 'list', label: 'Bullet list' },
]

const statusOptions = [
  { value: 'draft', label: 'Draft (hidden from the website)' },
  { value: 'published', label: 'Published (shown on the website)' },
]

const newId = () => crypto.randomUUID()

const newBlock = (type = 'p') => ({ id: newId(), type, text: '', items: [] })

// "Documents to prepare before KYC" -> "documents-to-prepare-before-kyc"
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// today as YYYY-MM-DD in local time
const today = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

// about 200 words a minute, at least 1
const estimateReadTime = (form) => {
  const words = [
    form.excerpt,
    ...form.body.map((block) => (block.type === 'list' ? block.items.join(' ') : block.text)),
  ]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

// blocks as the website reads them: no editor ids, no empty blocks
const cleanBody = (blocks) =>
  blocks
    .map((block) =>
      block.type === 'list'
        ? { type: 'list', items: block.items.map((item) => item.trim()).filter(Boolean) }
        : { type: block.type, text: block.text.trim() },
    )
    .filter((block) => (block.type === 'list' ? block.items.length > 0 : block.text))

const validate = (form) => {
  if (!form.title.trim()) return 'Add a title.'
  if (!slugPattern.test(form.slug)) {
    return 'The slug can use lowercase letters, numbers, and single hyphens only.'
  }
  if (!form.category) return 'Choose a category.'
  if (!form.date) return 'Choose a date.'
  if (form.url && !/^https?:\/\//.test(form.url)) {
    return 'The external link must start with http:// or https://'
  }
  return ''
}

function ArticleEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const categories = useInsightCategories()

  const [form, setForm] = useState(() => ({
    title: '',
    slug: '',
    category: '',
    date: today(),
    readTime: '',
    excerpt: '',
    body: [newBlock()],
    url: '',
    status: 'draft',
  }))
  // a new article's slug follows its title until the slug is edited by hand
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [loading, setLoading] = useState(!isNew)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (isNew) return undefined
    let active = true

    getArticle(id)
      .then(({ article }) => {
        if (!active) return
        setForm({
          title: article.title,
          slug: article.slug,
          category: article.category,
          date: article.date,
          readTime: article.readTime || '',
          excerpt: article.excerpt || '',
          body:
            article.body?.length > 0
              ? article.body.map((block) => ({
                  id: newId(),
                  type: block.type,
                  text: block.text || '',
                  items: block.items || [],
                }))
              : [newBlock()],
          url: article.url || '',
          status: article.status,
        })
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load this article.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id, isNew])

  const setField = (changes) => {
    setForm((current) => ({ ...current, ...changes }))
    setSaveError('')
  }

  const handleTitle = (title) =>
    setField(slugTouched ? { title } : { title, slug: slugify(title) })

  const handleSave = async () => {
    // a new article takes the first category unless another is picked
    const article = { ...form, category: form.category || categories[0]?.key || '' }
    const problem = validate(article)
    if (problem) {
      setSaveError(problem)
      return
    }

    setSaving(true)
    setSaveError('')
    try {
      const payload = { ...article, title: article.title.trim(), body: cleanBody(article.body) }
      if (isNew) await createArticle(payload)
      else await updateArticle(id, payload)

      toast.success(
        isNew ? 'Article created successfully!' : 'Article saved successfully!',
        { position: 'top-right', autoClose: 3000, theme: 'colored' },
      )
      navigate('/articles')
    } catch (error) {
      setSaveError(error.message || 'Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader label="Loading article" />

  if (loadError) {
    return (
      <div className="pe">
        <p className="arl-error" role="alert">
          <FiAlertCircle />
          {loadError}
        </p>
        <Link to="/articles" className="pe-btn outline">
          <FiArrowLeft /> Back to Articles
        </Link>
      </div>
    )
  }

  const categoryOptions = categories.map((category) => ({
    value: category.key,
    label: category.title || 'Untitled category',
  }))
  const categoryValue = form.category || categoryOptions[0]?.value || ''
  // keep an article's category selectable even if it was removed from the Insights page
  const categoryChoices = categoryOptions.some((option) => option.value === categoryValue)
    ? categoryOptions
    : [{ value: categoryValue, label: 'Removed category' }, ...categoryOptions]

  const publicUrl = form.url || `${websiteUrl}/insights/${form.slug}`

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <Link to="/articles" className="arl-back">
              <FiArrowLeft /> All articles
            </Link>
            <h2 className="pe-banner-title">{isNew ? 'New article' : 'Edit article'}</h2>
            <p className="pe-banner-text">
              Published articles show in the Latest Insights section of the
              website. Save as a draft to keep working on it.
            </p>
          </div>

          {!isNew && form.status === 'published' && (
            <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pe-btn ghost"
              >
                View on Website <FiArrowUpRight />
              </a>
            </div>
          )}
        </div>
      </section>

      <div className="row">
        <div className="col-xl-8">
          {/* details */}
          <EditorSection
            id="article-details"
            number={1}
            icon={FiFileText}
            title="Article details"
            description="The title, address, and summary shown on the article card."
          >
            <div className="row">
              <div className="col-12">
                <TextField
                  id="article-title"
                  label="Title"
                  maxLength={110}
                  value={form.title}
                  onChange={handleTitle}
                />
              </div>
              <div className="col-12">
                <div className="custom-frm-bx pe-field">
                  <label htmlFor="article-slug">Slug (page address)</label>
                  <div className="arl-inline">
                    <input
                      id="article-slug"
                      type="text"
                      className="form-control"
                      value={form.slug}
                      placeholder="what-to-know-before-entering-qatar"
                      onChange={(event) => {
                        setSlugTouched(true)
                        setField({ slug: event.target.value.toLowerCase() })
                      }}
                    />
                    <button
                      type="button"
                      className="pe-btn outline sm"
                      onClick={() => {
                        setSlugTouched(false)
                        setField({ slug: slugify(form.title) })
                      }}
                    >
                      <FiRefreshCw /> From title
                    </button>
                  </div>
                  <p className="pe-hint">
                    The article opens at /insights/{form.slug || 'your-slug'}. Changing it
                    breaks links that were already shared.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <SelectField
                  id="article-category"
                  label="Category"
                  options={categoryChoices}
                  hint="Categories are set on the Insights Page."
                  value={categoryValue}
                  onChange={(category) => setField({ category })}
                />
              </div>
              <div className="col-md-6">
                <div className="custom-frm-bx pe-field">
                  <label htmlFor="article-read-time">Read time</label>
                  <div className="arl-inline">
                    <input
                      id="article-read-time"
                      type="text"
                      className="form-control"
                      placeholder="4 min read"
                      value={form.readTime}
                      onChange={(event) => setField({ readTime: event.target.value })}
                    />
                    <button
                      type="button"
                      className="pe-btn outline sm"
                      onClick={() => setField({ readTime: estimateReadTime(form) })}
                    >
                      Estimate
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <TextField
                  id="article-excerpt"
                  label="Excerpt"
                  multiline
                  rows={3}
                  maxLength={220}
                  hint="Shown on the article card and as the first line of the article."
                  value={form.excerpt}
                  onChange={(excerpt) => setField({ excerpt })}
                />
              </div>
            </div>
          </EditorSection>

          {/* body */}
          <EditorSection
            id="article-body"
            number={2}
            icon={FiAlignLeft}
            title="Article body"
            description="Build the article from paragraphs, headings, and bullet lists."
          >
            <ListEditor
              items={form.body}
              onChange={(body) => setField({ body })}
              itemTitle={(block) => {
                const label = blockTypes.find((type) => type.value === block.type)?.label
                const preview = block.type === 'list' ? block.items[0] : block.text
                return preview ? `${label}: ${preview}` : label
              }}
              addLabel="Add block"
              min={1}
              max={60}
              createItem={() => newBlock()}
              renderItem={(block, setBlock) => (
                <>
                  <div className="arl-block-type">
                    <SelectField
                      id={`block-${block.id}-type`}
                      label="Block type"
                      options={blockTypes}
                      value={block.type}
                      onChange={(type) => setBlock({ type })}
                    />
                  </div>
                  {block.type === 'list' ? (
                    <TextField
                      id={`block-${block.id}-items`}
                      label="List items"
                      multiline
                      rows={4}
                      placeholder="One item per line"
                      hint="One item per line. Each item gets a gold tick."
                      value={block.items.join('\n')}
                      onChange={(value) => setBlock({ items: value.split('\n') })}
                    />
                  ) : (
                    <TextField
                      id={`block-${block.id}-text`}
                      label={block.type === 'h2' ? 'Heading' : 'Paragraph'}
                      multiline={block.type === 'p'}
                      rows={5}
                      value={block.text}
                      onChange={(text) => setBlock({ text })}
                    />
                  )}
                </>
              )}
            />
          </EditorSection>
        </div>

        <div className="col-xl-4">
          {/* publishing */}
          <EditorSection
            id="article-publish"
            number={3}
            icon={FiSend}
            title="Publishing"
            description="Drafts are saved but not shown on the website."
          >
            <SelectField
              id="article-status"
              label="Status"
              options={statusOptions}
              value={form.status}
              onChange={(status) => setField({ status })}
            />
            <div className="custom-frm-bx pe-field">
              <label htmlFor="article-date">Date</label>
              <input
                id="article-date"
                type="date"
                className="form-control"
                value={form.date}
                onChange={(event) => setField({ date: event.target.value })}
              />
              <p className="pe-hint">Newest dates show first.</p>
            </div>
          </EditorSection>

          {/* external link */}
          <EditorSection
            id="article-link"
            number={4}
            icon={FiLink}
            title="External link (optional)"
            description="For an article published on another site."
          >
            <TextField
              id="article-url"
              label="Link"
              placeholder="https://"
              hint="When set, the card opens this link in a new tab instead of the article page."
              value={form.url}
              onChange={(url) => setField({ url: url.trim() })}
            />
          </EditorSection>
        </div>
      </div>

      {/* ---------- save bar ---------- */}
      <div className={`pe-savebar ${saveError ? '' : 'dirty'}`}>
        <span className={`pe-savebar-status ${saveError ? 'error' : ''}`} role="status">
          {saveError ? (
            <>
              <FiAlertCircle />
              {saveError}
            </>
          ) : (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              {form.status === 'published'
                ? 'Saving will publish this article on the website.'
                : 'Saving keeps this article as a draft.'}
            </>
          )}
        </span>

        <div className="pe-savebar-actions">
          <Link to="/articles" className="pe-btn outline">
            Cancel
          </Link>
          <button type="button" className="pe-btn primary" disabled={saving} onClick={handleSave}>
            <FiSave />
            {saving ? 'Saving...' : isNew ? 'Create Article' : 'Save Article'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleEditor

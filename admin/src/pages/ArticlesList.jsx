import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiChevronRight,
  FiEdit2,
  FiExternalLink,
  FiFileText,
  FiPlus,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import { websiteUrl } from '../constants/site.js'
import useInsightCategories from '../hooks/useInsightCategories.js'
import { deleteArticle, getArticles } from '../services/articles.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

const statusFilters = [
  { value: 'all', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
]

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function ArticlesList() {
  const categories = useInsightCategories()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let active = true

    getArticles()
      .then((result) => {
        if (active) setArticles(result.articles || [])
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load articles.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const categoryTitle = (key) =>
    categories.find((category) => category.key === key)?.title || key

  const handleDelete = async (article) => {
    if (!window.confirm(`Delete "${article.title}"? This cannot be undone.`)) return

    setDeletingId(article.id)
    try {
      await deleteArticle(article.id)
      setArticles((items) => items.filter((item) => item.id !== article.id))
      toast.success('Article deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.message || 'Could not delete the article.', {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <Loader label="Loading articles" />

  const query = search.trim().toLowerCase()
  const visible = articles.filter(
    (article) =>
      (status === 'all' || article.status === status) &&
      (!query ||
        article.title.toLowerCase().includes(query) ||
        article.slug.includes(query)),
  )
  const publishedCount = articles.filter((article) => article.status === 'published').length

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Website <FiChevronRight /> Insights <FiChevronRight /> Articles
            </span>
            <h2 className="pe-banner-title">Articles</h2>
            <p className="pe-banner-text">
              Published articles show in the Latest Insights section of the
              website and get their own page. Drafts stay hidden.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <a
              href={`${websiteUrl}/insights`}
              target="_blank"
              rel="noopener noreferrer"
              className="pe-btn ghost"
            >
              View Insights <FiArrowUpRight />
            </a>
            <Link to="/articles/new" className="pe-btn gold-solid">
              <FiPlus /> New Article
            </Link>
          </div>
        </div>
      </section>

      <div className="arl-card">
        {loadError && (
          <p className="arl-error" role="alert">
            <FiAlertCircle />
            {loadError}
          </p>
        )}

        {/* ---------- search + filter ---------- */}
        <div className="row g-2 arl-toolbar">
          <div className="col-md-6">
            <div className="custom-frm-bx pe-field arl-search">
              <label htmlFor="arl-search" className="visually-hidden">
                Search articles
              </label>
              <FiSearch aria-hidden="true" />
              <input
                id="arl-search"
                type="search"
                className="form-control"
                placeholder="Search by title or slug"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-frm-bx pe-field">
              <label htmlFor="arl-status" className="visually-hidden">
                Filter by status
              </label>
              <select
                id="arl-status"
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <p className="arl-count">
              {publishedCount} published · {articles.length - publishedCount} drafts
            </p>
          </div>
        </div>

        {/* ---------- table ---------- */}
        {visible.length > 0 ? (
          <div className="table-responsive">
            <table className="table arl-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <Link to={`/articles/${article.id}`} className="arl-title">
                        {article.title}
                      </Link>
                      <span className="arl-slug">
                        {article.url ? article.url : `/insights/${article.slug}`}
                      </span>
                    </td>
                    <td>
                      <span className="arl-category">{categoryTitle(article.category)}</span>
                    </td>
                    <td className="text-nowrap">{formatDate(article.date)}</td>
                    <td>
                      <span className={`arl-status ${article.status}`}>
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="arl-actions">
                        {article.status === 'published' && (
                          <a
                            href={article.url || `${websiteUrl}/insights/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${article.title} on the website`}
                            title="View on website"
                          >
                            <FiExternalLink />
                          </a>
                        )}
                        <Link
                          to={`/articles/${article.id}`}
                          aria-label={`Edit ${article.title}`}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="danger"
                          aria-label={`Delete ${article.title}`}
                          title="Delete"
                          disabled={deletingId === article.id}
                          onClick={() => handleDelete(article)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="arl-empty">
            <span className="arl-empty-icon">
              <FiFileText />
            </span>
            <h3 className="arl-empty-title">
              {articles.length === 0 ? 'No articles yet' : 'No articles match'}
            </h3>
            <p className="arl-empty-text">
              {articles.length === 0
                ? 'Write the first article. Once it is published it shows in the Latest Insights section of the website.'
                : 'Try a different search or status filter.'}
            </p>
            {articles.length === 0 && (
              <Link to="/articles/new" className="pe-btn primary">
                <FiPlus /> New Article
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticlesList

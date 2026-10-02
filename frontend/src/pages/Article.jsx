import { Link, useParams } from 'react-router-dom'
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import Loader from '../components/common/Loader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import useArticles from '../hooks/useArticles.js'
import usePageContent from '../hooks/usePageContent.js'
import insightsContent from '../constants/insightsContent.js'
import NotFound from './NotFound.jsx'
import '../styles/Article.css'

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

function ArticleBlock({ block }) {
  if (block.type === 'h2') return <h2 className="art-h2">{block.text}</h2>
  if (block.type === 'list') {
    return (
      <ul className="art-list">
        {block.items.map((item) => (
          <li key={item}>
            <FiCheck />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return <p className="art-p">{block.text}</p>
}

function ArticleContent({ article, articles, categoryName }) {
  usePageMeta(article.title, article.excerpt)

  // other articles with a page on this site (external-link articles have no slug)
  const related = articles
    .filter((item) => item.slug && item.slug !== article.slug)
    .slice(0, 2)

  return (
    <>
      {/* ---------- article banner ---------- */}
      <section className="art-banner">
        <img src={markGold} alt="" className="art-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <nav className="art-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <Link to="/insights">Insights</Link>
                <FiChevronRight />
                <span>{categoryName(article.category)}</span>
              </nav>

              <div className="art-tags">
                <span className="art-category">{categoryName(article.category)}</span>
                {article.draft && <span className="art-draft">Draft</span>}
              </div>

              <h1 className="art-title">{article.title}</h1>

              <div className="art-meta">
                {article.date && (
                  <span>
                    <FiCalendar />
                    {formatDate(article.date)}
                  </span>
                )}
                {article.readTime && (
                  <span>
                    <FiClock />
                    {article.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- body + sidebar ---------- */}
      <section className="art-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <article className="art-body">
                {article.excerpt && <p className="art-lead">{article.excerpt}</p>}
                {article.body?.map((block, index) => (
                  <ArticleBlock block={block} key={index} />
                ))}

                <Link to="/insights" className="art-back">
                  <FiArrowLeft />
                  Back to Insights
                </Link>
              </article>
            </div>

            <div className="col-lg-4">
              <aside className="art-aside">
                <div className="art-cta">
                  <h2 className="art-cta-title">Planning your GCC entry?</h2>
                  <p className="art-cta-text">
                    Know what the market, regulators, banks, and partners will
                    actually require.
                  </p>
                  <Link to="/intake" className="art-btn gold">
                    Start Your Market Entry Review
                    <FiArrowUpRight />
                  </Link>
                </div>

                {related.length > 0 && (
                  <div className="art-related">
                    <span className="art-related-label">More insights</span>
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/insights/${item.slug}`}
                        className="art-related-item"
                      >
                        <span className="art-related-category">
                          {categoryName(item.category)}
                        </span>
                        <span className="art-related-title">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Article() {
  const { slug } = useParams()

  // published articles from the admin (Articles)
  const { articles, loading } = useArticles()

  // category names are set on the admin's Insights Page
  const { publish } = usePageContent('insights', insightsContent)
  const categoryName = (key) =>
    publish.categories.find((category) => category.key === key)?.title

  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    // an article written in the admin is found once the backend answers
    return loading ? <Loader /> : <NotFound />
  }

  return (
    <ArticleContent
      article={article}
      articles={articles}
      categoryName={categoryName}
      key={article.slug}
    />
  )
}

export default Article

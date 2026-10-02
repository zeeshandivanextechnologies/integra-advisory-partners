import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiChevronRight,
  FiCheck,
  FiClock,
  FiInfo,
  FiMail,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useArticles from '../hooks/useArticles.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import insightsContent from '../constants/insightsContent.js'
import '../styles/Insights.css'

const subscribeMessages = {
  sending: 'Subscribing...',
  sent: 'Thank you. Please check your inbox to confirm your subscription.',
  error: 'Something went wrong. Please try again in a moment.',
}

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function Insights() {
  // site-wide links from the admin (Settings)
  const { mailingList } = useSiteConfig()

  // managed from the admin (Insights Page); built-in content until it is saved there
  const { banner, publish, latest, topics, brief, seo } = usePageContent(
    'insights',
    insightsContent,
  )

  // published articles from the admin (Articles)
  const { articles } = useArticles()

  usePageMeta(seo.title, seo.description)

  const [activeTab, setActiveTab] = useState('all')
  const [subscribeStatus, setSubscribeStatus] = useState('idle')

  const handleSubscribe = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    setSubscribeStatus('sending')

    try {
      await fetch(mailingList.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(new FormData(formElement)),
      })
      formElement.reset()
      setSubscribeStatus('sent')
    } catch {
      setSubscribeStatus('error')
    }
  }

  const categories = publish.categories
  const tabs = [{ key: 'all', title: topics.allLabel }, ...categories]

  const visibleTopics =
    activeTab === 'all'
      ? topics.items
      : topics.items.filter((topic) => topic.category === activeTab)

  const categoryTitle = (key) =>
    categories.find((category) => category.key === key)?.title

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
        <section className="ins-banner">
          <img src={markGold} alt="" className="ins-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <nav className="ins-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <span>Insights</span>
                </nav>

                <h1 className="ins-banner-title">{banner.title}</h1>

                <p className="ins-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- content types ---------- */}
      {publish.visible !== false && (
        <section className="ins-section">
          <div className="container">
            <div className="row ins-head">
              <div className="col-lg-7">
                <span className="ins-eyebrow">{publish.eyebrow}</span>
                <h2 className="ins-heading">{publish.heading}</h2>
              </div>
            </div>

            <div className="row ">
              {categories.map(({ key, icon, title, text }) => (
                <div className="col-lg-3 col-md-6 mb-3" key={key}>
                  <div className="ins-type">
                    <span className="ins-icon">
                      <PageIcon name={icon} />
                    </span>
                    <h3 className="ins-type-title">{title}</h3>
                    <p className="ins-type-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- latest articles (shown when there are articles) ---------- */}
      {latest.visible !== false && articles.length > 0 && (
        <section className="ins-section pt-0">
          <div className="container">
            <div className="row ins-head">
              <div className="col-lg-7">
                <span className="ins-eyebrow">{latest.eyebrow}</span>
                <h2 className="ins-heading">{latest.heading}</h2>
              </div>
            </div>

            <div className="row">
              {articles.map((article) => {
                const content = (
                  <>
                    <span className="ins-article-tags">
                      <span className="ins-topic-category">
                        {categoryTitle(article.category)}
                      </span>
                      {article.draft && <span className="ins-draft">Draft</span>}
                    </span>
                    <h3 className="ins-topic-title">{article.title}</h3>
                    {article.excerpt && (
                      <p className="ins-article-text">{article.excerpt}</p>
                    )}
                    <span className="ins-article-meta">
                      {article.date && formatDate(article.date)}
                      <span className="ins-article-link">
                        Read <FiArrowUpRight />
                      </span>
                    </span>
                  </>
                )

                return (
                  <div className="col-lg-4 col-md-6 mb-3" key={article.title}>
                    {article.slug ? (
                      <Link to={`/insights/${article.slug}`} className="ins-article">
                        {content}
                      </Link>
                    ) : (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ins-article"
                      >
                        {content}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- topics ---------- */}
      {topics.visible !== false && (
        <section className="ins-section ins-light">
          <div className="container">
            <div className="row align-items-end ins-head">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <span className="ins-eyebrow">{topics.eyebrow}</span>
                <h2 className="ins-heading">{topics.heading}</h2>
              </div>
              <div className="col-lg-7">
                <div className="ins-tabs" role="tablist">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      className={`ins-tab ${activeTab === tab.key ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="row">
              {visibleTopics.map((topic) => (
                <div className="col-lg-4 col-md-6 mb-3" key={topic.id}>
                  <div className="ins-topic">
                    <span className="ins-topic-category">
                      {categoryTitle(topic.category)}
                    </span>
                    <h3 className="ins-topic-title">{topic.title}</h3>
                    <span className="ins-topic-status">
                      <FiClock />
                      {topics.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- monthly brief ---------- */}
      {brief.visible !== false && (
        <section className="ins-section pt-0 ins-light">
          <div className="container">
            <div className="ins-cta">
              <div className="row align-items-center ">
                <div className="col-lg-1 d-none d-lg-block">
                  <span className="ins-cta-icon">
                    <FiMail />
                  </span>
                </div>
                <div className="col-lg-7 mb-3 mb-lg-0">
                  <h2 className="ins-cta-title">{brief.title}</h2>
                  <p className="ins-cta-text">{brief.text}</p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  {mailingList.action ? (
                    <form className="ins-subscribe" onSubmit={handleSubscribe}>
                      {Object.entries(mailingList.hiddenFields || {}).map(
                        ([name, value]) => (
                          <input key={name} type="hidden" name={name} value={value} />
                        ),
                      )}
                      <label htmlFor="ins-email" className="visually-hidden">
                        Email address
                      </label>
                      <input
                        id="ins-email"
                        type="email"
                        name={mailingList.emailField}
                        placeholder="you@company.com"
                        required
                      />
                      <button
                        type="submit"
                        className="ins-btn gold"
                        disabled={subscribeStatus === 'sending'}
                      >
                        {brief.buttonLabel}
                        <FiArrowUpRight />
                      </button>

                      {subscribeStatus !== 'idle' && (
                        <p className={`ins-subscribe-status ${subscribeStatus}`} role="status">
                          {subscribeStatus === 'sent' ? <FiCheck /> : <FiInfo />}
                          {subscribeMessages[subscribeStatus]}
                        </p>
                      )}
                    </form>
                  ) : (
                    <Link to="/contact" className="ins-btn gold">
                      {brief.fallbackLabel}
                      <FiArrowUpRight />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Insights

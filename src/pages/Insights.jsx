import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBookOpen,
  FiChevronRight,
  FiCheck,
  FiClock,
  FiInfo,
  FiMail,
  FiMic,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import articles from '../constants/articles.js'
import '../styles/Insights.css'

const categories = [
  {
    key: 'market',
    icon: FiBookOpen,
    title: 'Market Notes',
    text: 'Practical notes on entering Qatar, Saudi Arabia, the UAE, and the wider GCC.',
  },
  {
    key: 'regulatory',
    icon: FiShield,
    title: 'Regulatory Guides',
    text: 'Plain-language guides to incorporation, KYC expectations, and regulatory friction.',
  },
  {
    key: 'events',
    icon: FiMic,
    title: 'Event Recaps',
    text: 'Key takeaways from Integra Nights, webinars, discovery visits, and sector briefings.',
  },
  {
    key: 'investor',
    icon: FiTrendingUp,
    title: 'Investor Readiness',
    text: 'What banks, partners, and investors will expect to see before they commit.',
  },
]

const topics = [
  { category: 'market', title: 'Qatar market entry advisory' },
  { category: 'market', title: 'Nigeria to Qatar business expansion' },
  { category: 'market', title: 'Morocco to GCC business expansion' },
  { category: 'regulatory', title: 'GCC business setup advisory' },
  { category: 'regulatory', title: 'Qatar incorporation readiness' },
  { category: 'regulatory', title: 'GCC regulatory advisory for African investors' },
  { category: 'investor', title: 'Qatar KYC and bank readiness advisory' },
  { category: 'investor', title: 'GCC market research and business planning' },
  { category: 'events', title: 'Integra Nights recaps' },
]

const tabs = [{ key: 'all', title: 'All topics' }, ...categories]

const { mailingList } = siteConfig

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
  usePageMeta(
    'Insights',
    'Market-entry notes, regulatory explainers, and investor-readiness guidance on Qatar incorporation, KYC and bank readiness, and GCC expansion.',
  )

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

  const visibleTopics =
    activeTab === 'all'
      ? topics
      : topics.filter((topic) => topic.category === activeTab)

  const categoryTitle = (key) =>
    categories.find((category) => category.key === key)?.title

  return (
    <>
      {/* ---------- page banner ---------- */}
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

              <h1 className="ins-banner-title">
                Market-entry insight for serious GCC operators.
              </h1>

              <p className="ins-banner-text">
                Market-entry notes, regulatory explainers, event recaps, and
                investor-readiness guidance for founders and investors exploring
                Qatar and the GCC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- content types ---------- */}
      <section className="ins-section">
        <div className="container">
          <div className="row ins-head">
            <div className="col-lg-7">
              <span className="ins-eyebrow">What We Publish</span>
              <h2 className="ins-heading">
                Four kinds of insight, one practical focus.
              </h2>
            </div>
          </div>

          <div className="row ">
            {categories.map(({ key, icon: Icon, title, text }) => (
              <div className="col-lg-3 col-md-6 mb-3" key={key}>
                <div className="ins-type">
                  <span className="ins-icon">
                    <Icon />
                  </span>
                  <h3 className="ins-type-title">{title}</h3>
                  <p className="ins-type-text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- latest articles (shown when articles.js has entries) ---------- */}
      {articles.length > 0 && (
        <section className="ins-section pt-0">
          <div className="container">
            <div className="row ins-head">
              <div className="col-lg-7">
                <span className="ins-eyebrow">Latest Insights</span>
                <h2 className="ins-heading">Recently published.</h2>
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
      <section className="ins-section ins-light">
        <div className="container">
          <div className="row align-items-end ins-head">
            <div className="col-lg-5 mb-3 mb-lg-0">
              <span className="ins-eyebrow">Topics</span>
              <h2 className="ins-heading">Upcoming insight topics.</h2>
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
              <div className="col-lg-4 col-md-6 mb-3" key={topic.title}>
                <div className="ins-topic">
                  <span className="ins-topic-category">
                    {categoryTitle(topic.category)}
                  </span>
                  <h3 className="ins-topic-title">{topic.title}</h3>
                  <span className="ins-topic-status">
                    <FiClock />
                    Coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- monthly brief ---------- */}
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
                <h2 className="ins-cta-title">Subscribe to the Monthly Brief</h2>
                <p className="ins-cta-text">
                  Market-entry notes, regulatory updates, and event invitations
                  for Qatar and the GCC, delivered once a month.
                </p>
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
                      Subscribe
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
                    Subscribe to Monthly Brief
                    <FiArrowUpRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Insights

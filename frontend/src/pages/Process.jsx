import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiChevronRight,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import processContent from '../constants/processContent.js'
import { mediaUrl } from '../utils/media.js'
import '../styles/Process.css'

function Process() {
  // site-wide links from the admin (Settings)
  const siteConfig = useSiteConfig()

  // managed from the admin (Process Page); built-in content until it is saved there
  const { banner, facts, steps, cta, seo } = usePageContent('process', processContent)

  usePageMeta(seo.title, seo.description)

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
        <section className="prc-banner">
          <img src={markGold} alt="" className="prc-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <nav className="prc-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <span>Process</span>
                </nav>

                <h1 className="prc-banner-title">{banner.title}</h1>

                <p className="prc-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- key facts ---------- */}
      {facts.visible !== false && (
        <section className="prc-facts">
          <div className="container">
            <div className="row">
              {facts.items.map(({ id, icon, value, label }) => (
                <div className="col-lg-3 col-sm-6 mb-3 mb-lg-0" key={id}>
                  <div className="prc-fact">
                    <span className="prc-fact-icon">
                      <PageIcon name={icon} />
                    </span>
                    <div>
                      <span className="prc-fact-value">{value}</span>
                      <span className="prc-fact-label">{label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- steps ---------- */}
      {steps.visible !== false && (
        <section className="prc-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-3">
                <div className="prc-intro">
                  <span className="prc-eyebrow">{steps.eyebrow}</span>
                  <h2 className="prc-heading">{steps.heading}</h2>
                  <p className="prc-lead">{steps.lead}</p>
                  <Link to={steps.buttonLink} className="prc-btn primary">
                    {steps.buttonLabel}
                    <FiArrowUpRight />
                  </Link>
                  {steps.image && (
                    <div className="prc-visual">
                      <img
                        src={mediaUrl(steps.image)}
                        alt={steps.alt}
                        width="1000"
                        height="1000"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-8">
                <ol className="prc-timeline">
                  {steps.items.map(
                    ({ id, icon, title, text, tags, days, linkLabel, linkTo }, index) => (
                      <li className="prc-step" key={id}>
                        <span className="prc-step-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div className="prc-step-card">
                          <div className="prc-step-head">
                            <span className="prc-step-icon">
                              <PageIcon name={icon} />
                            </span>
                            <h3 className="prc-step-title">{title}</h3>
                          </div>

                          <p className="prc-step-text">{text}</p>

                          {tags?.length > 0 && (
                            <div className="prc-tags">
                              {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>
                          )}

                          {days?.length > 0 && (
                            <div className="prc-days">
                              {days.map((day) => (
                                <span key={day}>{day}</span>
                              ))}
                            </div>
                          )}

                          {linkLabel && linkTo && (
                            <Link to={linkTo} className="prc-step-link">
                              {linkLabel}
                              <FiArrowUpRight />
                            </Link>
                          )}
                        </div>
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- cta ---------- */}
      {cta.visible !== false && (
        <section className="prc-section pt-0">
          <div className="container">
            <div className="prc-cta">
              <div className="row align-items-center ">
                <div className="col-lg-7 mb-3 mb-lg-0">
                  <h2 className="prc-cta-title">{cta.title}</h2>
                  <p className="prc-cta-text">{cta.text}</p>
                </div>
                <div className="col-lg-5">
                  <div className="prc-cta-actions">
                    <Link to={cta.link} className="prc-btn gold">
                      {cta.buttonLabel}
                      <FiArrowUpRight />
                    </Link>
                    {siteConfig.booking.url ? (
                      <a
                        href={siteConfig.booking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="prc-btn outline-light"
                      >
                        Book a Discovery Call
                      </a>
                    ) : (
                      <Link to="/contact" className="prc-btn outline-light">
                        Request a Call
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Process

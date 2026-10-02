import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiMapPin,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useEvents from '../hooks/useEvents.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import eventsContent from '../constants/eventsContent.js'
import '../styles/Events.css'

const today = new Date().toISOString().slice(0, 10)

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function RegisterLink({ href, className, children }) {
  // the Register Interest form from the admin (Settings)
  const registerUrl = useSiteConfig().googleForms.events.viewUrl
  const url = href || registerUrl

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to="/contact" className={className}>
      {children}
    </Link>
  )
}

function Events() {
  // managed from the admin (Events Page); built-in content until it is saved there
  const { banner, formats, spotlight, upcoming, cta, seo } = usePageContent(
    'events',
    eventsContent,
  )

  usePageMeta(seo.title, seo.description)

  // published events from the admin (Events); past dates are hidden
  const events = useEvents()
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
        <section className="evt-banner">
          <img src={markGold} alt="" className="evt-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <nav className="evt-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <span>Events</span>
                </nav>

                <h1 className="evt-banner-title">{banner.title}</h1>

                <p className="evt-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- event formats ---------- */}
      {formats.visible !== false && (
        <section className="evt-section">
          <div className="container">
            <div className="row evt-head">
              <div className="col-lg-7">
                <span className="evt-eyebrow">{formats.eyebrow}</span>
                <h2 className="evt-heading">{formats.heading}</h2>
              </div>
            </div>

            <div className="row">
              {formats.items.map(({ id, icon, title, text, tag }) => (
                <div className="col-lg-3 col-md-6 mb-3" key={id}>
                  <div className="evt-card">
                    <div className="evt-card-top">
                      <span className="evt-icon">
                        <PageIcon name={icon} />
                      </span>
                      <span className="evt-tag">{tag}</span>
                    </div>
                    <h3 className="evt-card-title">{title}</h3>
                    <p className="evt-card-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- integra nights spotlight ---------- */}
      {spotlight.visible !== false && (
        <section className="evt-section evt-light">
          <div className="container">
            <div className="evt-spotlight">
              <div className="row g-0">
                <div className="col-lg-7">
                  <div className="evt-spotlight-body">
                    <span className="evt-eyebrow light">{spotlight.eyebrow}</span>
                    <h2 className="evt-spotlight-title">{spotlight.title}</h2>
                    <p className="evt-spotlight-text">{spotlight.text}</p>
                    <RegisterLink className="evt-btn gold">
                      {spotlight.buttonLabel}
                      <FiArrowUpRight />
                    </RegisterLink>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="evt-spotlight-side">
                    <span className="evt-side-label">{spotlight.sideLabel}</span>
                    <ul className="evt-outcomes">
                      {spotlight.outcomes.map(({ id, text }, index) => (
                        <li key={id}>
                          <span className="evt-outcome-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="evt-outcome-text">{text}</span>
                          <FiCheck className="evt-outcome-check" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- upcoming events ---------- */}
      {upcoming.visible !== false && (
        <section className="evt-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <span className="evt-eyebrow">{upcoming.eyebrow}</span>
                <h2 className="evt-heading">{upcoming.heading}</h2>
                <p className="evt-lead">{upcoming.lead}</p>
              </div>

              <div className="col-lg-7">
                {upcomingEvents.length > 0 ? (
                  <ul className="evt-list">
                    {upcomingEvents.map((event) => (
                      <li className="evt-item" key={`${event.title}-${event.date}`}>
                        <div className="evt-item-date">
                          <FiCalendar />
                          {formatDate(event.date)}
                        </div>
                        <div className="evt-item-body">
                          <span className="evt-tag">{event.format}</span>
                          {event.draft && <span className="evt-draft">Draft</span>}
                          <h3 className="evt-item-title">{event.title}</h3>
                          <div className="evt-item-meta">
                            {event.time && (
                              <span>
                                <FiClock />
                                {event.time}
                              </span>
                            )}
                            {event.location && (
                              <span>
                                <FiMapPin />
                                {event.location}
                              </span>
                            )}
                            {event.mode && event.mode !== event.location && (
                              <span>{event.mode}</span>
                            )}
                          </div>
                        </div>
                        <RegisterLink
                          href={event.registerUrl}
                          className="evt-btn primary"
                        >
                          {upcoming.registerLabel}
                          <FiArrowUpRight />
                        </RegisterLink>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="evt-empty">
                    <span className="evt-empty-icon">
                      <FiCalendar />
                    </span>
                    <h3 className="evt-empty-title">{upcoming.emptyTitle}</h3>
                    <p className="evt-empty-text">{upcoming.emptyText}</p>
                    <RegisterLink className="evt-btn primary">
                      <FiBell />
                      {upcoming.emptyButtonLabel}
                    </RegisterLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- cta ---------- */}
      {cta.visible !== false && (
        <section className="evt-section pt-0">
          <div className="container">
            <div className="evt-cta">
              <div className="row align-items-center">
                <div className="col-lg-7 mb-3 mb-lg-0">
                  <h2 className="evt-cta-title">{cta.title}</h2>
                  <p className="evt-cta-text">{cta.text}</p>
                </div>
                <div className="col-lg-5">
                  <div className="evt-cta-actions">
                    <RegisterLink className="evt-btn gold">
                      {cta.buttonLabel}
                      <FiArrowUpRight />
                    </RegisterLink>
                    <Link to={cta.secondaryLink} className="evt-btn outline-light">
                      {cta.secondaryLabel}
                    </Link>
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

export default Events

import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiMonitor,
  FiMoon,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import events from '../constants/events.js'
import '../styles/Events.css'

const formats = [
  {
    icon: FiMonitor,
    title: 'Webinars',
    text: 'Online sessions on market entry, regulation, and investor readiness for Qatar and the GCC.',
    tag: 'Online',
  },
  {
    icon: FiMoon,
    title: 'Integra Nights',
    text: 'A structured networking series that moves beyond casual introductions.',
    tag: 'In person',
  },
  {
    icon: FiMapPin,
    title: 'Discovery Visits',
    text: 'Guided visits for founders and investors exploring Qatar and the wider GCC on the ground.',
    tag: 'In person',
  },
  {
    icon: FiBarChart2,
    title: 'Sector Briefings',
    text: 'Focused briefings on specific sectors, opportunities, and the conditions behind them.',
    tag: 'Online & in person',
  },
]

const registerUrl = siteConfig.googleForms.events.viewUrl

const today = new Date().toISOString().slice(0, 10)

const upcomingEvents = events
  .filter((event) => event.date >= today)
  .sort((a, b) => a.date.localeCompare(b.date))

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function RegisterLink({ href, className, children }) {
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

const nightsOutcomes = [
  'Present your business',
  'Identify mentors',
  'Create real follow-up opportunities',
]

function Events() {
  usePageMeta(
    'Events',
    'Webinars, Integra Nights, discovery visits, and sector briefings for founders and investors exploring Qatar and the GCC.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
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

              <h1 className="evt-banner-title">
                Events that create real connections, not just introductions.
              </h1>

              <p className="evt-banner-text">
                Webinars, Integra Nights, discovery visits, and sector briefings
                for founders, investors, and partners exploring Qatar and the
                GCC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- event formats ---------- */}
      <section className="evt-section">
        <div className="container">
          <div className="row evt-head">
            <div className="col-lg-7">
              <span className="evt-eyebrow">Event Formats</span>
              <h2 className="evt-heading">
                Four ways to connect with Integra.
              </h2>
            </div>
          </div>

          <div className="row">
            {formats.map(({ icon: Icon, title, text, tag }) => (
              <div className="col-lg-3 col-md-6 mb-3" key={title}>
                <div className="evt-card">
                  <div className="evt-card-top">
                    <span className="evt-icon">
                      <Icon />
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

      {/* ---------- integra nights spotlight ---------- */}
      <section className="evt-section evt-light">
        <div className="container">
          <div className="evt-spotlight">
            <div className="row g-0">
              <div className="col-lg-7">
                <div className="evt-spotlight-body">
                  <span className="evt-eyebrow light">Signature Series</span>
                  <h2 className="evt-spotlight-title">Integra Nights</h2>
                  <p className="evt-spotlight-text">
                    A structured networking series that moves beyond casual
                    introductions and helps participants present their business,
                    identify mentors, and create real follow-up opportunities.
                  </p>
                  <RegisterLink className="evt-btn gold">
                    Register Interest
                    <FiArrowUpRight />
                  </RegisterLink>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="evt-spotlight-side">
                  <span className="evt-side-label">What participants do</span>
                  <ul className="evt-outcomes">
                    {nightsOutcomes.map((item, index) => (
                      <li key={item}>
                        <span className="evt-outcome-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="evt-outcome-text">{item}</span>
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

      {/* ---------- upcoming events ---------- */}
      <section className="evt-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-3 mb-lg-0">
              <span className="evt-eyebrow">Upcoming Events</span>
              <h2 className="evt-heading">Be the first to know.</h2>
              <p className="evt-lead">
                New dates for webinars, Integra Nights, discovery visits, and
                sector briefings are announced to registered contacts first.
              </p>
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
                        Register
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
                  <h3 className="evt-empty-title">No dates announced yet</h3>
                  <p className="evt-empty-text">
                    Register your interest and Integra will share upcoming event
                    details with you as soon as they are confirmed.
                  </p>
                  <RegisterLink className="evt-btn primary">
                    <FiBell />
                    Register Interest
                  </RegisterLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="evt-section pt-0">
        <div className="container">
          <div className="evt-cta">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-3 mb-lg-0">
                <h2 className="evt-cta-title">
                  Want to host or partner on an Integra event?
                </h2>
                <p className="evt-cta-text">
                  Law firms, banks, trade missions, embassies, accelerators, and
                  ecosystem partners are welcome to get in touch.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="evt-cta-actions">
                  <RegisterLink className="evt-btn gold">
                    Register Interest
                    <FiArrowUpRight />
                  </RegisterLink>
                  <Link to="/insights" className="evt-btn outline-light">
                    Read Event Recaps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Events

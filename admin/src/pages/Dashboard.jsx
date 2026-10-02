import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAlertCircle,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiFileText,
  FiLayout,
  FiMapPin,
  FiPlus,
} from 'react-icons/fi'
import Loader from '../components/common/Loader.jsx'
import { websiteUrl } from '../constants/site.js'
import { useAuth } from '../context/AuthContext.jsx'
import { getDashboard } from '../services/dashboard.js'
import '../styles/Dashboard.css'

// page slug -> name and admin editor
const pageNames = {
  home: 'Home Page',
  about: 'About Page',
  services: 'Services Page',
  packages: 'Packages Page',
  process: 'Process Page',
  insights: 'Insights Page',
  events: 'Events Page',
  deposit: 'Deposit Page',
  'payment-success': 'Payment Success Page',
  settings: 'Website Settings',
}

const updateTypes = { page: 'Website page', article: 'Article', event: 'Event' }

const statusLabels = { published: 'Published', draft: 'Draft', saved: 'Saved' }

// where to edit something listed under Recent updates
const editLink = ({ type, ref }) => {
  if (type === 'article') return `/articles/${ref}`
  if (type === 'event') return `/events/${ref}`
  return ref === 'settings' ? '/settings' : `/pages/${ref}`
}

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

const formatEventDate = (value) => {
  const date = new Date(`${value}T00:00:00`)
  return {
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  }
}

const formatUpdated = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

// "2026-09" -> "Sep"
const monthLabel = (value) =>
  new Date(`${value}-01T00:00:00`).toLocaleDateString('en-US', { month: 'short' })

function Dashboard() {
  const { admin } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true

    getDashboard()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load the dashboard.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) return <Loader label="Loading dashboard" />

  // empty values keep the layout in place if the backend could not be reached
  const articles = data?.articles || { published: 0, drafts: 0, perMonth: [] }
  const events = data?.events || { upcoming: 0, drafts: 0, byFormat: [], next: [] }
  const pages = data?.pages || { total: 0, saved: [] }
  const recentUpdates = data?.recentUpdates || []

  const lastUpdate = recentUpdates[0]
  const stats = [
    {
      key: 'articles',
      icon: FiFileText,
      label: 'Published articles',
      value: articles.published,
      note: `${articles.drafts} ${articles.drafts === 1 ? 'draft' : 'drafts'}`,
    },
    {
      key: 'events',
      icon: FiCalendar,
      label: 'Upcoming events',
      value: events.upcoming,
      note: `on the website · ${events.drafts} ${events.drafts === 1 ? 'draft' : 'drafts'}`,
    },
    {
      key: 'pages',
      icon: FiLayout,
      label: 'Website pages edited',
      value: `${pages.saved.length}/${pages.total}`,
      note: 'saved from the admin',
    },
    {
      key: 'updated',
      icon: FiClock,
      label: 'Last change',
      value: lastUpdate ? formatUpdated(lastUpdate.updatedAt).replace(/, \d{4}$/, '') : '—',
      note: lastUpdate
        ? lastUpdate.type === 'page'
          ? pageNames[lastUpdate.ref] || lastUpdate.title
          : lastUpdate.title
        : 'nothing saved yet',
    },
  ]

  const perMonth = articles.perMonth
  const maxPerMonth = Math.max(1, ...perMonth.map((item) => item.value))
  const totalPerMonth = perMonth.reduce((sum, item) => sum + item.value, 0)
  const maxFormat = Math.max(1, ...events.byFormat.map((item) => item.count))

  return (
    <div className="dash">
      {/* ---------- welcome banner ---------- */}
      <section className="dash-welcome">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="dash-welcome-date">{today}</span>
            <h2 className="dash-welcome-title">Welcome back, {admin?.name || 'Admin'}</h2>
            <p className="dash-welcome-text">
              Here is what is happening across the website pages, articles, and
              events you manage from the admin.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <Link to="/articles/new" className="dash-btn gold">
              New Article <FiArrowUpRight />
            </Link>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-btn ghost"
            >
              Open Website <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      {loadError && (
        <p className="dash-error" role="alert">
          <FiAlertCircle />
          {loadError}
        </p>
      )}

      {/* ---------- stat tiles ---------- */}
      <div className="row ">
        {stats.map(({ key, icon: Icon, label, value, note }) => (
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3" key={key}>
            <div className="dash-card dash-stat">
              <div className="dash-stat-top">
                <span className="dash-stat-label">{label}</span>
                <span className="dash-stat-icon">
                  <Icon />
                </span>
              </div>
              <span className="dash-stat-value">{value}</span>
              <span className="dash-stat-note">{note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- charts ---------- */}
      <div className="row">
        <div className="col-lg-8 mb-3">
          <div className="dash-card h-100">
            <div className="dash-card-head">
              <div>
                <h3 className="dash-card-title">Articles published per month</h3>
                <p className="dash-card-sub">
                  {totalPerMonth} published in the last 6 months
                </p>
              </div>
              <Link to="/articles" className="dash-link">
                Articles <FiArrowRight />
              </Link>
            </div>

            <div className="dash-bars" role="list" aria-label="Articles published per month">
              {perMonth.map((item, index) => {
                const isLatest = index === perMonth.length - 1
                const label = monthLabel(item.month)
                return (
                  <div
                    className={`dash-bar-col ${isLatest ? 'latest' : ''}`}
                    key={item.month}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${label}: ${item.value} articles`}
                  >
                    <div className="dash-bar-track">
                      <span className="dash-bar-tip">
                        <strong>{item.value}</strong> {item.value === 1 ? 'article' : 'articles'}
                      </span>
                      {isLatest && <span className="dash-bar-value">{item.value}</span>}
                      <span
                        className="dash-bar"
                        style={{ height: `${(item.value / maxPerMonth) * 100}%` }}
                      ></span>
                    </div>
                    <span className="dash-bar-label">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="dash-card h-100">
            <div className="dash-card-head">
              <div>
                <h3 className="dash-card-title">Upcoming events by format</h3>
                <p className="dash-card-sub">Drafts included</p>
              </div>
            </div>

            {events.byFormat.length > 0 ? (
              <ul className="dash-meters">
                {events.byFormat.map((item) => (
                  <li key={item.name} title={`${item.name}: ${item.count}`}>
                    <div className="dash-meter-top">
                      <span className="dash-meter-name">{item.name}</span>
                      <span className="dash-meter-value">{item.count}</span>
                    </div>
                    <span className="dash-meter-track">
                      <span
                        className="dash-meter-fill"
                        style={{ width: `${(item.count / maxFormat) * 100}%` }}
                      ></span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dash-empty">
                No upcoming events. <Link to="/events/new">Add an event</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ---------- recent updates + events ---------- */}
      <div className="row">
        <div className="col-lg-8 mb-3">
          <div className="dash-card">
            <div className="dash-card-head">
              <div>
                <h3 className="dash-card-title">Recent updates</h3>
                <p className="dash-card-sub">The latest pages, articles, and events saved</p>
              </div>
            </div>

            {recentUpdates.length > 0 ? (
              <div className="table-responsive">
                <table className="table dash-table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Updated</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUpdates.map((item) => (
                      <tr key={`${item.type}-${item.ref}`}>
                        <td>
                          <Link to={editLink(item)} className="dash-person">
                            {item.type === 'page' ? pageNames[item.ref] || item.title : item.title}
                          </Link>
                       
                        </td>
                        <td>{updateTypes[item.type]}</td>
                        <td className="text-nowrap">{formatUpdated(item.updatedAt)}</td>
                        <td>
                          <span className={`dash-status ${item.status}`}>
                            {statusLabels[item.status] || item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="dash-empty">Nothing has been saved from the admin yet.</p>
            )}
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="dash-card">
            <div className="dash-card-head">
              <div>
                <h3 className="dash-card-title">Upcoming events</h3>
                <p className="dash-card-sub">Next on the calendar</p>
              </div>
              <Link to="/events/new" className="dash-icon-btn" aria-label="Add event">
                <FiPlus />
              </Link>
            </div>

            {events.next.length > 0 ? (
              <ul className="dash-events">
                {events.next.map((event) => {
                  const { day, month } = formatEventDate(event.date)
                  return (
                    <li key={event.id}>
                      <span className="dash-event-date">
                        <strong>{day}</strong>
                        {month}
                      </span>
                      <div className="dash-event-body">
                        <span className="dash-event-format">{event.format}</span>
                        <Link to={`/events/${event.id}`} className="dash-event-title">
                          {event.title}
                        </Link>
                        <span className="dash-event-meta">
                          {event.time && (
                            <span>
                              <FiCalendar /> {event.time}
                            </span>
                          )}
                          {event.location && (
                            <span>
                              <FiMapPin /> {event.location}
                            </span>
                          )}
                        </span>
                      </div>
                      {event.status === 'draft' && (
                        <span className="dash-status draft">Draft</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="dash-empty">
                No upcoming events. <Link to="/events/new">Add an event</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiCalendar,
  FiChevronRight,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import { websiteUrl } from '../constants/site.js'
import { deleteEvent, getEvents } from '../services/events.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

const statusFilters = [
  { value: 'all', label: 'All events' },
  { value: 'upcoming', label: 'Upcoming (published)' },
  { value: 'draft', label: 'Drafts' },
  { value: 'past', label: 'Past' },
]

// same rule as the website: today counts as upcoming
const todayIso = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let active = true

    getEvents()
      .then((result) => {
        if (active) setEvents(result.events || [])
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load events.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (event) => {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return

    setDeletingId(event.id)
    try {
      await deleteEvent(event.id)
      setEvents((items) => items.filter((item) => item.id !== event.id))
      toast.success('Event deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.message || 'Could not delete the event.', {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <Loader label="Loading events" />

  const today = todayIso()
  const isPast = (event) => event.date < today
  const query = search.trim().toLowerCase()
  const visible = events.filter((event) => {
    if (filter === 'upcoming' && (event.status !== 'published' || isPast(event))) return false
    if (filter === 'draft' && event.status !== 'draft') return false
    if (filter === 'past' && !isPast(event)) return false
    return (
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.format.toLowerCase().includes(query) ||
      (event.location || '').toLowerCase().includes(query)
    )
  })
  const liveCount = events.filter((event) => event.status === 'published' && !isPast(event)).length

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Website <FiChevronRight /> Events <FiChevronRight /> Event list
            </span>
            <h2 className="pe-banner-title">Events</h2>
            <p className="pe-banner-text">
              Published events with a date of today or later show in the
              Upcoming Events list on the website. Past events and drafts stay
              hidden.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <a
              href={`${websiteUrl}/events`}
              target="_blank"
              rel="noopener noreferrer"
              className="pe-btn ghost"
            >
              View Events <FiArrowUpRight />
            </a>
            <Link to="/events/new" className="pe-btn gold-solid">
              <FiPlus /> New Event
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
              <label htmlFor="evl-search" className="visually-hidden">
                Search events
              </label>
              <FiSearch aria-hidden="true" />
              <input
                id="evl-search"
                type="search"
                className="form-control"
                placeholder="Search by title, format, or location"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-frm-bx pe-field">
              <label htmlFor="evl-filter" className="visually-hidden">
                Filter events
              </label>
              <select
                id="evl-filter"
                className="form-select"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                {statusFilters.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <p className="arl-count">
              {liveCount} on the website · {events.length} total
            </p>
          </div>
        </div>

        {/* ---------- table ---------- */}
        {visible.length > 0 ? (
          <div className="table-responsive">
            <table className="table arl-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Format</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <Link to={`/events/${event.id}`} className="arl-title">
                        {event.title}
                      </Link>
                      <span className="arl-slug">
                        {[event.time, event.location].filter(Boolean).join(' · ')}
                      </span>
                    </td>
                    <td>
                      <span className="arl-category">{event.format}</span>
                    </td>
                    <td className="text-nowrap">{formatDate(event.date)}</td>
                    <td>
                      {isPast(event) ? (
                        <span className="arl-status past">Past</span>
                      ) : (
                        <span className={`arl-status ${event.status}`}>
                          {event.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="arl-actions">
                        <Link
                          to={`/events/${event.id}`}
                          aria-label={`Edit ${event.title}`}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="danger"
                          aria-label={`Delete ${event.title}`}
                          title="Delete"
                          disabled={deletingId === event.id}
                          onClick={() => handleDelete(event)}
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
              <FiCalendar />
            </span>
            <h3 className="arl-empty-title">
              {events.length === 0 ? 'No events yet' : 'No events match'}
            </h3>
            <p className="arl-empty-text">
              {events.length === 0
                ? 'Add the first event. Once it is published it shows in the Upcoming Events list on the website.'
                : 'Try a different search or filter.'}
            </p>
            {events.length === 0 && (
              <Link to="/events/new" className="pe-btn primary">
                <FiPlus /> New Event
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsList

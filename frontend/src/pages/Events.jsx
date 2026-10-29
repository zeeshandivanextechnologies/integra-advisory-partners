import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiSend,
  FiX,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import Loader from '../components/common/Loader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useEvents from '../hooks/useEvents.js'
import eventsContent from '../constants/eventsContent.js'
import { submitEventInterest } from '../services/inquiries.js'
import '../styles/Events.css'

const EVENT_FORMAT_OPTIONS = [
  'Webinars',
  'Integra Nights',
  'Discovery Visits',
  'Sector Briefings',
]

const today = new Date().toISOString().slice(0, 10)

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

function Events() {
  // managed from the admin (Events Page); built-in content until it is saved there
  const { banner, formats, spotlight, upcoming, cta, seo, _loaded } = usePageContent(
    'events',
    eventsContent,
  )

  usePageMeta(seo.title, seo.description)

  // published events from the admin (Events); past dates are hidden
  const events = useEvents()
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  // Modal State for Registering Interest
  const [modalOpen, setModalOpen] = useState(false)
  const [modalEventTitle, setModalEventTitle] = useState('')
  const [selectedFormats, setSelectedFormats] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [modalOpen])

  const handleOpenRegister = (eventTitle = '') => {
    setModalEventTitle(eventTitle)
    // Pre-check if matching format
    if (eventTitle) {
      setSelectedFormats([eventTitle])
    } else {
      setSelectedFormats(['Webinars', 'Integra Nights'])
    }
    setModalOpen(true)
  }

  const handleFormatToggle = (format) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((item) => item !== format) : [...prev, format]
    )
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      company: formData.get('company') || '',
      role: formData.get('role') || '',
      events: selectedFormats,
      eventTitle: modalEventTitle,
      message: formData.get('message') || '',
    }

    setSubmitting(true)
    try {
      await submitEventInterest(payload)
      toast.success('Thank you! Your event registration interest has been submitted successfully.')
      setModalOpen(false)
      formElement.reset()
    } catch (err) {
      toast.error('Something went wrong. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!_loaded) {
    return <Loader />
  }

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
                    <button
                      type="button"
                      className="evt-btn gold"
                      onClick={() => handleOpenRegister('Integra Nights')}
                    >
                      {spotlight.buttonLabel}
                      <FiArrowUpRight />
                    </button>
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
                        <button
                          type="button"
                          className="evt-btn primary"
                          onClick={() => handleOpenRegister(event.title)}
                        >
                          {upcoming.registerLabel}
                          <FiArrowUpRight />
                        </button>
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
                    <button
                      type="button"
                      className="evt-btn primary"
                      onClick={() => handleOpenRegister('General Event Interest')}
                    >
                      <FiBell />
                      {upcoming.emptyButtonLabel}
                    </button>
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
                    <button
                      type="button"
                      className="evt-btn gold"
                      onClick={() => handleOpenRegister('General Event Interest')}
                    >
                      {cta.buttonLabel}
                      <FiArrowUpRight />
                    </button>
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
      {/* ---------- Register Interest Modal ---------- */}
      {modalOpen && (
        <div
          className="evt-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div className="evt-modal-dialog">
            <div className="evt-modal-header">
              <span className="evt-modal-eyebrow">Integra Advisory Partners</span>
              <h3 className="evt-modal-title">Event Interest Registration</h3>
              <p className="evt-modal-sub">
                {modalEventTitle
                  ? `Registering for: ${modalEventTitle}`
                  : 'Let us know which event formats you wish to attend.'}
              </p>
              <button
                type="button"
                className="evt-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="evt-modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="evt-name">Full name</label>
                      <input
                        id="evt-name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="evt-email">Email address</label>
                      <input
                        id="evt-email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="evt-company">Company</label>
                      <input
                        id="evt-company"
                        type="text"
                        name="company"
                        className="form-control"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="evt-role">Role</label>
                      <input
                        id="evt-role"
                        type="text"
                        name="role"
                        className="form-control"
                        placeholder="Founder, CEO, Investor..."
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="custom-frm-bx">
                      <label className="mb-1">Which events interest you?</label>
                      <div className="evt-modal-chips">
                        {EVENT_FORMAT_OPTIONS.map((format) => {
                          const isChecked = selectedFormats.includes(format)
                          return (
                            <label key={format} className="evt-modal-chip">
                              <input
                                type="checkbox"
                                name="events"
                                value={format}
                                checked={isChecked}
                                onChange={() => handleFormatToggle(format)}
                              />
                              {format}
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="evt-message">How can Integra help? / Comments</label>
                      <textarea
                        id="evt-message"
                        name="message"
                        className="form-control"
                        placeholder="Tell us briefly about your plans or any questions..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="evt-modal-actions">
                  <button
                    type="button"
                    className="evt-modal-btn-cancel"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="evt-modal-btn-submit"
                    disabled={submitting}
                  >
                    <FiSend />
                    {submitting ? 'Submitting...' : 'Register Interest'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Events

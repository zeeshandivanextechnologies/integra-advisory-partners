import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiLink,
  FiMapPin,
  FiSave,
  FiSend,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import EditorSection from '../components/editor/EditorSection.jsx'
import SelectField from '../components/editor/SelectField.jsx'
import TextField from '../components/editor/TextField.jsx'
import { createEvent, getEvent, updateEvent } from '../services/events.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

// the formats the website has used so far (frontend/src/constants/events.js)
const formatOptions = [
  { value: 'Webinar', label: 'Webinar' },
  { value: 'Integra Nights', label: 'Integra Nights' },
  { value: 'Discovery Visit', label: 'Discovery Visit' },
  { value: 'Sector Briefing', label: 'Sector Briefing' },
]

const modeOptions = [
  { value: 'Online', label: 'Online' },
  { value: 'In person', label: 'In person' },
  { value: 'Online & in person', label: 'Online & in person' },
]

const statusOptions = [
  { value: 'draft', label: 'Draft (hidden from the website)' },
  { value: 'published', label: 'Published (shown on the website)' },
]

const todayIso = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const validate = (form) => {
  if (!form.title.trim()) return 'Add a title.'
  if (!form.format) return 'Choose a format.'
  if (!form.date) return 'Choose a date.'
  if (form.registerUrl && !/^https?:\/\//.test(form.registerUrl)) {
    return 'The registration link must start with http:// or https://'
  }
  return ''
}

// keep an option list valid when an event uses a value that is not in it
const withCurrent = (options, value) =>
  !value || options.some((option) => option.value === value)
    ? options
    : [{ value, label: value }, ...options]

function EventEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()

  const [form, setForm] = useState(() => ({
    title: '',
    format: formatOptions[0].value,
    date: todayIso(),
    time: '',
    location: '',
    mode: modeOptions[0].value,
    registerUrl: '',
    status: 'draft',
  }))
  const [loading, setLoading] = useState(!isNew)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (isNew) return undefined
    let active = true

    getEvent(id)
      .then(({ event }) => {
        if (!active) return
        setForm({
          title: event.title,
          format: event.format,
          date: event.date,
          time: event.time || '',
          location: event.location || '',
          mode: event.mode || '',
          registerUrl: event.registerUrl || '',
          status: event.status,
        })
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load this event.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id, isNew])

  const setField = (changes) => {
    setForm((current) => ({ ...current, ...changes }))
    setSaveError('')
  }

  const handleSave = async () => {
    const problem = validate(form)
    if (problem) {
      setSaveError(problem)
      return
    }

    setSaving(true)
    setSaveError('')
    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        time: form.time.trim(),
        location: form.location.trim(),
      }
      if (isNew) await createEvent(payload)
      else await updateEvent(id, payload)

      toast.success(isNew ? 'Event created successfully!' : 'Event saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
      navigate('/events')
    } catch (error) {
      setSaveError(error.message || 'Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader label="Loading event" />

  if (loadError) {
    return (
      <div className="pe">
        <p className="arl-error" role="alert">
          <FiAlertCircle />
          {loadError}
        </p>
        <Link to="/events" className="pe-btn outline">
          <FiArrowLeft /> Back to Events
        </Link>
      </div>
    )
  }

  const isPast = form.date && form.date < todayIso()

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <Link to="/events" className="arl-back">
          <FiArrowLeft /> All events
        </Link>
        <h2 className="pe-banner-title">{isNew ? 'New event' : 'Edit event'}</h2>
        <p className="pe-banner-text">
          Published events show in the Upcoming Events list on the website until
          their date has passed.
        </p>
      </section>

      <div className="row">
        <div className="col-xl-8">
          {/* details */}
          <EditorSection
            id="event-details"
            number={1}
            icon={FiCalendar}
            title="Event details"
            description="What, when, and the kind of event."
          >
            <div className="row">
              <div className="col-12">
                <TextField
                  id="event-title"
                  label="Title"
                  maxLength={100}
                  value={form.title}
                  onChange={(title) => setField({ title })}
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  id="event-format"
                  label="Format"
                  hint="Shown as the tag on the event."
                  options={withCurrent(formatOptions, form.format)}
                  value={form.format}
                  onChange={(format) => setField({ format })}
                />
              </div>
              <div className="col-md-6">
                <div className="custom-frm-bx pe-field">
                  <label htmlFor="event-date">Date</label>
                  <input
                    id="event-date"
                    type="date"
                    className="form-control"
                    value={form.date}
                    onChange={(event) => setField({ date: event.target.value })}
                  />
                  <p className="pe-hint">
                    {isPast
                      ? 'This date has passed, so the event is hidden on the website.'
                      : 'The list on the website is sorted by this date.'}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <TextField
                  id="event-time"
                  label="Time (optional)"
                  placeholder="11:00 AM EST"
                  hint="Include the time zone."
                  value={form.time}
                  onChange={(time) => setField({ time })}
                />
              </div>
            </div>
          </EditorSection>

          {/* place */}
          <EditorSection
            id="event-place"
            number={2}
            icon={FiMapPin}
            title="Where"
            description="Where the event happens and how people join."
          >
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="event-location"
                  label="Location (optional)"
                  placeholder="Doha, Qatar or Online"
                  value={form.location}
                  onChange={(location) => setField({ location })}
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  id="event-mode"
                  label="Mode"
                  hint="Shown after the location when it says something different."
                  options={withCurrent(modeOptions, form.mode)}
                  value={form.mode}
                  onChange={(mode) => setField({ mode })}
                />
              </div>
            </div>
          </EditorSection>
        </div>

        <div className="col-xl-4">
          {/* publishing */}
          <EditorSection
            id="event-publish"
            number={3}
            icon={FiSend}
            title="Publishing"
            description="Drafts are saved but not shown on the website."
          >
            <SelectField
              id="event-status"
              label="Status"
              options={statusOptions}
              value={form.status}
              onChange={(status) => setField({ status })}
            />
          </EditorSection>

          {/* registration */}
          <EditorSection
            id="event-register"
            number={4}
            icon={FiLink}
            title="Registration link (optional)"
            description="Where the Register button sends people."
          >
            <TextField
              id="event-register-url"
              label="Link"
              placeholder="https://"
              hint="Leave empty to use the Register Interest form from the website settings."
              value={form.registerUrl}
              onChange={(registerUrl) => setField({ registerUrl: registerUrl.trim() })}
            />
          </EditorSection>
        </div>
      </div>

      {/* ---------- save bar ---------- */}
      <div className={`pe-savebar ${saveError ? '' : 'dirty'}`}>
        <span className={`pe-savebar-status ${saveError ? 'error' : ''}`} role="status">
          {saveError ? (
            <>
              <FiAlertCircle />
              {saveError}
            </>
          ) : (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              {form.status === 'published'
                ? 'Saving will show this event on the website.'
                : 'Saving keeps this event as a draft.'}
            </>
          )}
        </span>

        <div className="pe-savebar-actions">
          <Link to="/events" className="pe-btn outline">
            Cancel
          </Link>
          <button type="button" className="pe-btn primary" disabled={saving} onClick={handleSave}>
            <FiSave />
            {saving ? 'Saving...' : isNew ? 'Create Event' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventEditor

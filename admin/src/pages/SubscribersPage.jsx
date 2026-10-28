import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiChevronRight,
  FiDownload,
  FiMail,
  FiSearch,
  FiTrash2,
  FiUsers,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import { deleteSubscriber, getSubscribers } from '../services/subscribers.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

const formatDate = (value) => {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return value
  }
}

function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let active = true

    getSubscribers()
      .then((result) => {
        if (active) setSubscribers(result.subscribers || [])
      })
      .catch((error) => {
        if (active) setLoadError(error.message || 'Could not load subscribers.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (subscriber) => {
    if (!window.confirm(`Remove "${subscriber.email}" from subscribers?`)) return

    setDeletingId(subscriber.id)
    try {
      await deleteSubscriber(subscriber.id)
      setSubscribers((items) => items.filter((item) => item.id !== subscriber.id))
      toast.success('Subscriber removed successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.message || 'Could not remove subscriber.', {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setDeletingId(null)
    }
  }

  const exportToCSV = () => {
    if (subscribers.length === 0) {
      toast.info('No subscribers to export.')
      return
    }

    const headers = ['ID', 'Email', 'Subscribed At']
    const rows = subscribers.map((s) => [
      s.id,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.created_at || ''}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `subscribers_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <Loader label="Loading subscribers" />

  const query = search.trim().toLowerCase()
  const visible = subscribers.filter(
    (subscriber) => !query || subscriber.email.toLowerCase().includes(query)
  )

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Content <FiChevronRight /> Subscribers <FiChevronRight /> Newsletter list
            </span>
            <h2 className="pe-banner-title">Newsletter Subscribers</h2>
            <p className="pe-banner-text">
              All website visitors who subscribed to the Monthly Brief on the Insights page.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <button
              type="button"
              className="pe-btn gold-solid"
              onClick={exportToCSV}
              disabled={subscribers.length === 0}
            >
              <FiDownload /> Export CSV
            </button>
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

        {/* ---------- search + count toolbar ---------- */}
        <div className="row g-2 align-items-center arl-toolbar">
          <div className="col-md-6 col-lg-5">
            <div className="arl-search">
              <FiSearch />
              <input
                type="search"
                className="form-control"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-7 text-md-end">
            <p className="arl-count">
              Showing <strong>{visible.length}</strong> of{' '}
              <strong>{subscribers.length}</strong> {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
            </p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="arl-empty">
            <FiUsers />
            <h3>No subscribers found</h3>
            <p>
              {search.trim()
                ? 'No subscribers match your search filter.'
                : 'No one has subscribed to the newsletter yet.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table arl-table align-middle">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '60px' }}>#</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Subscribed Date</th>
                  <th scope="col" className="text-end" style={{ width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((subscriber, index) => (
                  <tr key={subscriber.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FiMail className="text-muted" />
                        <span className="fw-500">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="text-muted">
                      {formatDate(subscriber.created_at)}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Remove subscriber"
                        disabled={deletingId === subscriber.id}
                        onClick={() => handleDelete(subscriber)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscribersPage

import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEye,
  FiFileText,
  FiInbox,
  FiMail,
  FiSearch,
  FiTrash2,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader.jsx'
import { deleteInquiry, getInquiries, updateInquiryStatus } from '../services/inquiries.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const BACKEND_URL = API_BASE_URL.replace(/\/api\/?$/, '')

const formatDate = (value) => {
  if (!value) return '-'
  try {
    const raw =
      typeof value === 'string' && !value.endsWith('Z') && !value.includes('+')
        ? value.replace(' ', 'T') + 'Z'
        : value
    const date = new Date(raw)
    if (isNaN(date.getTime())) return value

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return value
  }
}

function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all', 'contact', 'intake', 'event'
  const [search, setSearch] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  // Reset to first page when changing tab or search query
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, search])

  const loadData = () => {
    setLoading(true)
    getInquiries()
      .then((res) => {
        setInquiries(res.inquiries || [])
        setLoadError('')
      })
      .catch((err) => {
        setLoadError(err.message || 'Could not load inquiries.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status)
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      )
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status }))
      }
      toast.success('Status updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch {
      toast.error('Failed to update status', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete submission from "${item.name}" (${item.email})?`)) return
    setDeletingId(item.id)
    try {
      await deleteInquiry(item.id)
      setInquiries((prev) => prev.filter((i) => i.id !== item.id))
      if (selectedInquiry?.id === item.id) setSelectedInquiry(null)
      toast.success('Submission deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (err) {
      toast.error(err.message || 'Failed to delete submission.', {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setDeletingId(null)
    }
  }

  const exportToCSV = () => {
    if (inquiries.length === 0) {
      toast.info('No submissions to export.')
      return
    }

    const headers = [
      'ID',
      'Type',
      'Name',
      'Email',
      'Company',
      'Role',
      'Status',
      'Sector',
      'Budget',
      'Timeline',
      'Date',
    ]
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.type}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.role || '').replace(/"/g, '""')}"`,
      `"${i.status || 'new'}"`,
      `"${(i.sector || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${(i.timeline || '').replace(/"/g, '""')}"`,
      `"${i.created_at || ''}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <Loader label="Loading inquiries" />

  const query = search.trim().toLowerCase()
  const filtered = inquiries
    .filter((item) => {
      if (activeTab === 'all') return true
      return item.type === activeTab
    })
    .filter((item) => {
      if (!query) return true
      return (
        item.name?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.company?.toLowerCase().includes(query) ||
        item.sector?.toLowerCase().includes(query)
      )
    })

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (validCurrentPage - 1) * PAGE_SIZE
  const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length)
  const paginatedData = filtered.slice(startIndex, endIndex)

  return (
    <div className="pe">
      {/* ---------- banner (exact SubscribersPage design) ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Content <FiChevronRight /> Inquiries & Leads <FiChevronRight /> Submissions
            </span>
            <h2 className="pe-banner-title">Inquiries & Leads</h2>
            <p className="pe-banner-text">
              All website inquiries received from the Contact Us form and the Market Entry Review (Intake form).
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <button
              type="button"
              className="pe-btn gold-solid"
              onClick={exportToCSV}
              disabled={inquiries.length === 0}
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

        {/* ---------- search + count + tabs toolbar (exact SubscribersPage design) ---------- */}
        <div className="row g-2 align-items-center arl-toolbar">
          <div className="col-md-5 col-lg-4">
            <div className="arl-search">
              <FiSearch />
              <input
                type="search"
                className="form-control"
                placeholder="Search by name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-7 col-lg-8 d-flex flex-wrap align-items-center justify-content-md-end gap-3">
            <div className="arl-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'all'}
                className={`arl-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
                <span className="arl-tab-badge">{inquiries.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'contact'}
                className={`arl-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
                <span className="arl-tab-badge">
                  {inquiries.filter((i) => i.type === 'contact').length}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'intake'}
                className={`arl-tab-btn ${activeTab === 'intake' ? 'active' : ''}`}
                onClick={() => setActiveTab('intake')}
              >
                Intake
                <span className="arl-tab-badge">
                  {inquiries.filter((i) => i.type === 'intake').length}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'event'}
                className={`arl-tab-btn ${activeTab === 'event' ? 'active' : ''}`}
                onClick={() => setActiveTab('event')}
              >
                Events
                <span className="arl-tab-badge">
                  {inquiries.filter((i) => i.type === 'event').length}
                </span>
              </button>
            </div>

            <p className="arl-count mb-0">
              Showing <strong>{filtered.length}</strong> of{' '}
              <strong>{inquiries.length}</strong> {inquiries.length === 1 ? 'submission' : 'submissions'}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="arl-empty">
            <FiInbox />
            <h3>No submissions found</h3>
            <p>
              {search.trim()
                ? 'No inquiries match your search filter.'
                : 'No inquiries have been received yet.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table arl-table align-middle">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '50px' }}>#</th>
                  <th scope="col" style={{ width: '90px' }}>Type</th>
                  <th scope="col">Name & Contact</th>
                  <th scope="col">Company / Base</th>
                  <th scope="col">Details / Sector</th>
                  <th scope="col" style={{ width: '130px' }}>Status</th>
                  <th scope="col">Received Date</th>
                  <th scope="col" className="text-end" style={{ width: '110px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-muted">{startIndex + index + 1}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.type === 'intake'
                            ? 'bg-warning text-dark'
                            : item.type === 'event'
                            ? 'bg-success'
                            : 'bg-primary'
                        }`}
                      >
                        {item.type === 'intake' ? 'Intake' : item.type === 'event' ? 'Event' : 'Contact'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FiUser className="text-muted" />
                        <div>
                          <div className="fw-500">{item.name}</div>
                          <small className="text-muted">{item.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{item.company || '-'}</div>
                      <small className="text-muted">{item.role || item.origin || ''}</small>
                    </td>
                    <td>
                      {item.type === 'intake' ? (
                        <div>
                          <span className="fw-500">{item.sector || 'Intake Review'}</span>
                          {item.budget && <small className="text-muted d-block">{item.budget}</small>}
                        </div>
                      ) : item.type === 'event' ? (
                        <div className="text-truncate" style={{ maxWidth: '220px' }}>
                          <span className="fw-500">{item.inquiry_type || 'Event Registration'}</span>
                          {item.sector && <small className="text-muted d-block text-truncate">Interests: {item.sector}</small>}
                        </div>
                      ) : (
                        <div className="text-truncate" style={{ maxWidth: '200px' }}>
                          <span>{item.inquiry_type || 'General'}</span>
                          {item.message && <small className="text-muted d-block text-truncate">{item.message}</small>}
                        </div>
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={item.status || 'new'}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="text-muted small">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          title="View submission details"
                          onClick={() => setSelectedInquiry(item)}
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Delete submission"
                          disabled={deletingId === item.id}
                          onClick={() => handleDelete(item)}
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
        )}

        {/* ---------- Pagination (shows when more than 10 or whenever items exist) ---------- */}
        {filtered.length > 0 && (
          <div className="arl-pagination">
            <p className="arl-pagination-info">
              Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of{' '}
              <strong>{filtered.length}</strong> {filtered.length === 1 ? 'submission' : 'submissions'}
            </p>

            {totalPages > 1 && (
              <div className="arl-pagination-nav" role="navigation" aria-label="Pagination">
                <button
                  type="button"
                  className="arl-page-btn"
                  title="Previous page"
                  disabled={validCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  <FiChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // If lots of pages, show compact range
                  const isCurrent = pageNum === validCurrentPage
                  const isNear = Math.abs(pageNum - validCurrentPage) <= 2 || pageNum === 1 || pageNum === totalPages
                  if (!isNear) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return (
                        <span key={pageNum} className="arl-page-ellipsis">
                          ...
                        </span>
                      )
                    }
                    return null
                  }

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      className={`arl-page-btn ${isCurrent ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  type="button"
                  className="arl-page-btn"
                  title="Next page"
                  disabled={validCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- View Details Modal ---------- */}
      {selectedInquiry && (
        <div
          className="modal fade show d-block inq-modal"
          style={{ background: 'rgba(16, 32, 90, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1050 }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="inq-modal-header">
                <h5 className="inq-modal-title">
                  {selectedInquiry.type === 'intake' ? (
                    <>
                      <FiFileText style={{ color: 'var(--additional-color)' }} />
                      Market Entry Intake Details
                    </>
                  ) : selectedInquiry.type === 'event' ? (
                    <>
                      <FiCalendar style={{ color: 'var(--additional-color)' }} />
                      Event Registration Interest Details
                    </>
                  ) : (
                    <>
                      <FiMail style={{ color: 'var(--additional-color)' }} />
                      Contact Inquiry Details
                    </>
                  )}
                </h5>
                <button
                  type="button"
                  className="inq-modal-close"
                  onClick={() => setSelectedInquiry(null)}
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="text-muted small">Full Name</label>
                    <div className="fw-bold">{selectedInquiry.name}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Email Address</label>
                    <div>
                      <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Company</label>
                    <div>{selectedInquiry.company || 'Not provided'}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Role</label>
                    <div>{selectedInquiry.role || 'Not provided'}</div>
                  </div>

                  {selectedInquiry.type === 'contact' ? (
                    <>
                      <div className="col-12">
                        <label className="text-muted small">Inquiry Type</label>
                        <div>{selectedInquiry.inquiry_type || 'General'}</div>
                      </div>
                      <div className="col-12">
                        <label className="text-muted small">Message</label>
                        <div className="p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                          {selectedInquiry.message || 'No message provided'}
                        </div>
                      </div>
                    </>
                  ) : selectedInquiry.type === 'event' ? (
                    <>
                      <div className="col-12">
                        <label className="text-muted small">Registered Event / Subject</label>
                        <div className="fw-bold">{selectedInquiry.inquiry_type || 'Event Interest Registration'}</div>
                      </div>
                      <div className="col-12">
                        <label className="text-muted small">Event Formats Interested In</label>
                        <div>
                          {selectedInquiry.sector ? (
                            <span className="badge bg-light text-dark border p-2">
                              {selectedInquiry.sector}
                            </span>
                          ) : (
                            'General'
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="text-muted small">Comments / Questions</label>
                        <div className="p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                          {selectedInquiry.message || 'No additional comments provided'}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-6">
                        <label className="text-muted small">Country of Origin / Base</label>
                        <div>{selectedInquiry.origin || 'Not provided'}</div>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Sector</label>
                        <div>{selectedInquiry.sector || 'Not provided'}</div>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Target Markets</label>
                        <div>{selectedInquiry.markets || 'Not specified'}</div>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Capital Available / Budget</label>
                        <div className="fw-bold text-success">{selectedInquiry.budget || 'Not provided'}</div>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Timeline</label>
                        <div>{selectedInquiry.timeline || 'Not specified'}</div>
                      </div>
                      <div className="col-12">
                        <label className="text-muted small">Current Documents Ready</label>
                        <div>{selectedInquiry.documents || 'None checked'}</div>
                      </div>

                      {/* Download attached document if present */}
                      {selectedInquiry.documents && selectedInquiry.documents.startsWith('/uploads/') && (
                        <div className="col-12">
                          <label className="text-muted small">Attached Document</label>
                          <div>
                            <a
                              href={`${BACKEND_URL}${selectedInquiry.documents}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pe-btn gold-solid"
                              style={{ display: 'inline-flex', padding: '6px 14px', fontSize: '13px' }}
                            >
                              <FiDownload /> Download Attached File
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedInquiry.concern && (
                        <div className="col-12">
                          <label className="text-muted small">Primary Question / Concern</label>
                          <div className="p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                            {selectedInquiry.concern}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="inq-modal-footer">
                <button
                  type="button"
                  className="inq-btn-ghost"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your Integra Advisory inquiry`}
                  className="inq-btn-reply"
                >
                  <FiMail />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InquiriesPage

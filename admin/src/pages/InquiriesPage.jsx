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

    return date.toLocaleString('en-US', {
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
  const [search, setSearch] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  // Reset to first page when changing search query
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const loadData = () => {
    setLoading(true)
    getInquiries()
      .then((res) => {
        // Only keep intake submissions
        const all = res.inquiries || []
        const intakeOnly = all.filter((item) => item.type === 'intake')
        setInquiries(intakeOnly)
        setLoadError('')
      })
      .catch((err) => {
        setLoadError(err.message || 'Could not load intake submissions.')
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
      if (!query) return true
      return (
        item.name?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.company?.toLowerCase().includes(query) ||
        item.sector?.toLowerCase().includes(query) ||
        item.origin?.toLowerCase().includes(query)
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
            <h2 className="pe-banner-title">Market Entry Inquiries</h2>
            <p className="pe-banner-text">
              All website market intake review submissions received from the Market Entry Review form.
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

        {/* ---------- search + count toolbar (exact SubscribersPage design) ---------- */}
        <div className="row g-2 align-items-center arl-toolbar">
          <div className="col-md-6 col-lg-5">
            <div className="arl-search">
              <FiSearch />
              <input
                type="search"
                className="form-control"
                placeholder="Search by name, email, company, sector..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-7 d-flex align-items-center justify-content-md-end">
            <p className="arl-count mb-0">
              Showing <strong>{filtered.length}</strong> of{' '}
              <strong>{inquiries.length}</strong> {inquiries.length === 1 ? 'review submission' : 'review submissions'}
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
                  <th scope="col">Applicant</th>
                  <th scope="col">Company / Base</th>
                  <th scope="col">Sector & Budget</th>
                  <th scope="col">Target Markets</th>
                  <th scope="col" style={{ width: '130px' }}>Status</th>
                  <th scope="col">Submitted Date</th>
                  <th scope="col" className="text-end" style={{ width: '110px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-muted">{startIndex + index + 1}</td>
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
                      <div className="fw-500">{item.company || '-'}</div>
                      <small className="text-muted">{item.role ? `${item.role} · ` : ''}{item.origin || ''}</small>
                    </td>
                    <td>
                      <div>
                        <span className="fw-500">{item.sector || 'Intake Review'}</span>
                        {item.budget && <small className="text-success d-block fw-500">{item.budget}</small>}
                      </div>
                    </td>
                    <td>
                      <span className="text-muted small">{item.markets || 'Not specified'}</span>
                    </td>
                    <td style={{minWidth : '120px'}}>
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
                          className="inquiries-view-btn"
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
                  <FiFileText style={{ color: 'var(--additional-color)' }} />
                  Market Entry Intake Review Details
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

                  {/* Download attached document(s) if present */}
                  {selectedInquiry.documents &&
                    selectedInquiry.documents.split(',').some((p) => p.trim().startsWith('/uploads/')) && (
                      <div className="col-12">
                        <label className="text-muted small">Attached File(s) - Click to Download</label>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {selectedInquiry.documents
                            .split(',')
                            .map((p) => p.trim())
                            .filter((p) => p.startsWith('/uploads/'))
                            .map((filePath, fileIdx) => {
                              const filename = filePath.replace('/uploads/', '')
                              const downloadUrl = `${API_BASE_URL}/inquiries/download/${encodeURIComponent(filename)}`
                              const directUrl = `${BACKEND_URL}${filePath}`
                              return (
                                <a
                                  key={filePath + fileIdx}
                                  href={downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={filename}
                                  className="pe-btn gold-solid"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                  }}
                                  title={`Download ${filename}`}
                                >
                                  <FiDownload />
                                  <span className="text-truncate" style={{ maxWidth: '240px' }}>
                                    {filename.length > 30 ? filename.slice(0, 27) + '...' : filename}
                                  </span>
                                </a>
                              )
                            })}
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

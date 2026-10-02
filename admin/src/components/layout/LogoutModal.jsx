import { FiLogOut, FiX } from 'react-icons/fi'
import '../../styles/LogoutModal.css'

// Bootstrap handles show/hide, backdrop, ESC and focus trap through its JS bundle
// (data-bs-toggle / data-bs-dismiss), so the markup stays in the DOM.
function LogoutModal({ admin, onConfirm }) {
  const name = admin?.name || admin?.email || 'Admin User'

  return (
    <div
      className="modal fade logout-modal"
      id="logoutModal"
      tabIndex="-1"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header logout-modal-head">
            <span className="logout-modal-icon" aria-hidden="true">
              <FiLogOut />
            </span>

            <div className="logout-modal-heading">
              <h2 className="modal-title logout-modal-title" id="logoutModalLabel">
                Log out?
              </h2>
              <p className="logout-modal-sub">You will need to sign in again.</p>
            </div>

            <button
              type="button"
              className="logout-modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <FiX />
            </button>
          </div>

          <div className="modal-body logout-modal-body">
            Are you sure you want to log out of the Integra admin panel as{' '}
            <strong>{name}</strong>? Any unsaved changes on this page will be lost.
          </div>

          <div className="modal-footer logout-modal-foot">
            <button type="button" className="logout-modal-btn ghost" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              className="logout-modal-btn danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
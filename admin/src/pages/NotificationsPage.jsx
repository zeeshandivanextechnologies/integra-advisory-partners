import { Link } from 'react-router-dom'
import { FiAlertCircle, FiBell, FiCheck, FiChevronRight, FiRefreshCw } from 'react-icons/fi'
import Loader from '../components/common/Loader.jsx'
import typeIcons from '../constants/notificationTypes.js'
import useNotifications, { timeAgo } from '../hooks/useNotifications.js'
import '../styles/PageEditor.css'
import '../styles/Articles.css'
import '../styles/NotificationMenu.css'

function NotificationsPage() {
  const { notifications, unreadCount, loading, error, reload, markRead, markAllRead } =
    useNotifications(50)

  if (loading) return <Loader label="Loading notifications" />

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              Admin <FiChevronRight /> Notifications
            </span>
            <h2 className="pe-banner-title">Notifications</h2>
            <p className="pe-banner-text">
              Changes saved in the admin and reminders for events in the next
              7 days. Read status is remembered in this browser.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <button type="button" className="pe-btn ghost" onClick={reload}>
              <FiRefreshCw /> Refresh
            </button>
            {unreadCount > 0 && (
              <button type="button" className="pe-btn gold-solid" onClick={markAllRead}>
                <FiCheck /> Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="arl-card p-0 overflow-hidden">
        {error && (
          <p className="arl-error m-3" role="alert">
            <FiAlertCircle />
            {error}
          </p>
        )}

        {notifications.length > 0 ? (
          <ul className="notif-list notif-list-full">
            {notifications.map((item) => {
              const Icon = typeIcons[item.type] ?? FiBell
              return (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={`notif-item ${item.unread ? 'unread' : ''}`}
                    onClick={() => markRead(item.id)}
                  >
                    <span className={`notif-icon ${item.type}`}>
                      <Icon />
                    </span>
                    <span className="notif-body">
                      <span className="notif-text">{item.message}</span>
                      <span className="notif-time">{timeAgo(item.time)}</span>
                    </span>
                    {item.unread && (
                      <span className="notif-unread" aria-label="Unread"></span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="arl-empty">
            <span className="arl-empty-icon">
              <FiBell />
            </span>
            <h3 className="arl-empty-title">You're all caught up</h3>
            <p className="arl-empty-text">
              Notifications appear here when pages, articles, or events are
              saved, and a week before a published event.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage

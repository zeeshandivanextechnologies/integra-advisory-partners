import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiBell } from 'react-icons/fi'
import typeIcons from '../../constants/notificationTypes.js'
import useNotifications, { timeAgo } from '../../hooks/useNotifications.js'
import '../../styles/NotificationMenu.css'

function NotificationMenu() {
  const { notifications, unreadCount, loading, error, reload, markRead, markAllRead } =
    useNotifications(10)
  const toggleRef = useRef(null)
  const { pathname } = useLocation()

  // fetch again after the admin moves to another page (they may have saved something)
  useEffect(() => {
    reload()
  }, [pathname, reload])

  // and every time the bell is opened
  useEffect(() => {
    const toggle = toggleRef.current
    if (!toggle) return undefined
    toggle.addEventListener('show.bs.dropdown', reload)
    return () => toggle.removeEventListener('show.bs.dropdown', reload)
  }, [reload])

  return (
    <div className="dropdown">
      <button
        ref={toggleRef}
        type="button"
        className="notif-toggle"
        data-bs-toggle="dropdown"
        // positioned by CSS, so on phones it can sit full width under the header
        data-bs-display="static"
        aria-expanded="false"
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        <FiBell />
        {unreadCount > 0 && <span className="notif-dot"></span>}
      </button>

      <div className="dropdown-menu dropdown-menu-end notif-menu">
        <div className="notif-head">
          <h6>Notifications</h6>
          {unreadCount > 0 && (
            <div className="notif-head-actions">
              <span className="notif-count">{unreadCount} new</span>
              <button type="button" className="notif-mark-all" onClick={markAllRead}>
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {notifications.length > 0 ? (
          <ul className="notif-list">
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
          <p className="notif-empty">
            {loading ? 'Loading notifications...' : error || "You're all caught up."}
          </p>
        )}

        <div className="notif-foot">
          <Link to="/notifications" className="thm-btn w-100">
            View All Notifications
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotificationMenu

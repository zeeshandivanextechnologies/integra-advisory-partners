import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiChevronDown, FiLogOut, FiX } from 'react-icons/fi'
import logo from '../../assets/logos/primary-gold-white.svg'
import { navMenu } from '../../constants/navLinks.js'
import '../../styles/Sidebar.css'

// same matching as NavLink: "/" only on the dashboard, other links on their sub-pages too
const isActive = (pathname, to) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

const groupId = (label) => `sidebar-group-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

function SidebarLink({ label, to, icon: Icon, onClose, sub = false }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={`sidebar-link ${sub ? 'sidebar-sublink' : ''}`}
      onClick={onClose}
    >
      <Icon />
      <span>{label}</span>
    </NavLink>
  )
}

// a menu item that opens a submenu; it starts open when one of its pages is showing
function SidebarGroup({ label, icon: Icon, children, onClose }) {
  const { pathname } = useLocation()
  const hasActive = children.some((child) => isActive(pathname, child.to))
  const [open, setOpen] = useState(hasActive)
  const [wasActive, setWasActive] = useState(hasActive)
  const id = groupId(label)

  // open the group when the admin moves to one of its pages
  if (hasActive !== wasActive) {
    setWasActive(hasActive)
    if (hasActive) setOpen(true)
  }

  const expanded = open

  return (
    <li className={`sidebar-group ${hasActive ? 'has-active' : ''}`}>
      <button
        type="button"
        className={`sidebar-link sidebar-group-toggle ${expanded ? 'open' : ''}`}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setOpen(!expanded)}
      >
        <Icon />
        <span>{label}</span>
        <FiChevronDown className="sidebar-chevron" aria-hidden="true" />
      </button>

      {expanded && (
        <ul className="sidebar-submenu" id={id}>
          {children.map((child) => (
            <li key={child.to}>
              <SidebarLink {...child} onClose={onClose} sub />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function Sidebar({ onClose }) {
  return (
    <aside className="admin-sidebar" id="adminSidebar">
      <div className="sidebar-head">
        <Link to="/" className="sidebar-logo" onClick={onClose}>
          <img src={logo} alt="Integra Advisory Partners" />
        </Link>

        <button
          type="button"
          className="sidebar-close d-lg-none"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <FiX />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navMenu.map((item) =>
            item.children ? (
              <SidebarGroup key={item.label} {...item} onClose={onClose} />
            ) : (
              <li key={item.to}>
                <SidebarLink {...item} onClose={onClose} />
              </li>
            ),
          )}

          <li>
            {/* opens the confirm modal rendered by AdminLayout */}
            <button
              type="button"
              className="sidebar-link sidebar-logout"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <p className="sidebar-foot">Integra Admin Panel</p>
    </aside>
  )
}

export default Sidebar

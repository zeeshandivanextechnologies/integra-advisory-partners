import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import navLinks from '../../constants/navLinks.js'
import NotificationMenu from './NotificationMenu.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import '../../styles/Header.css'

// "admin@integra.com" -> "AD"
const getInitials = (name) => {
  const source = (name || '').trim()
  if (!source) return 'AD'
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function Header({ onToggleSidebar }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { admin, signOut } = useAuth()

  const user = {
    name: admin?.name || admin?.email || 'Admin User',
    role: admin?.role === 'admin' ? 'Super Admin' : admin?.role || 'Admin',
  }
  const initials = getInitials(user.name)

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const current = navLinks.find((link) =>
    link.to === '/' ? pathname === '/' : pathname.startsWith(link.to),
  )

  return (
    <header className="admin-header">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="header-toggle"
          aria-controls="adminSidebar"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <FiMenu />
        </button>
        <h1 className="header-title">{current?.label ?? 'Admin'}</h1>
      </div>

      <div className="d-flex align-items-center gap-2">
        <NotificationMenu />

        <div className="dropdown">
          <button
            type="button"
            className="header-user"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Open user menu"
          >
            <span className="header-avatar" aria-hidden="true">
              {initials}
            </span>
            <span className="header-user-info d-none d-sm-flex">
              <span className="header-user-name">{user.name}</span>
              <span className="header-user-role">{user.role}</span>
            </span>
            <FiChevronDown className="header-user-chevron" />
          </button>
  
          <ul className="dropdown-menu dropdown-menu-end header-dropdown">
            <li>
              <Link className="dropdown-item" to="/profile">
                <FiUser /> Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/settings">
                <FiSettings /> Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button type="button" className="dropdown-item logout" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header

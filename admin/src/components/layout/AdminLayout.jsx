import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from './Header.jsx'
import LogoutModal from './LogoutModal.jsx'
import Sidebar from './Sidebar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import '../../styles/AdminLayout.css'

// Matches Bootstrap's lg breakpoint used in AdminLayout.css
const desktopQuery = '(min-width: 992px)'

function AdminLayout() {
  const navigate = useNavigate()
  const { admin, signOut } = useAuth()
  // desktop: sidebar shown by default and can be collapsed
  const [collapsed, setCollapsed] = useState(false)
  // mobile: sidebar hidden by default and slides in over the page
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    signOut()
    // same solid green look as the login toast
    toast.success('You have been signed out.', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    })
    navigate('/login', { replace: true })
  }

  const toggleSidebar = () => {
    if (window.matchMedia(desktopQuery).matches) {
      setCollapsed((value) => !value)
    } else {
      setMobileOpen((value) => !value)
    }
  }

  const closeMobile = () => setMobileOpen(false)

  // close the mobile sidebar when the screen grows to desktop size
  useEffect(() => {
    const media = window.matchMedia(desktopQuery)
    const handleChange = (event) => {
      if (event.matches) setMobileOpen(false)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  const classes = [
    'admin-layout',
    collapsed ? 'sidebar-collapsed' : '',
    mobileOpen ? 'sidebar-open' : '',
  ].join(' ')

  return (
    <div className={classes}>
      <Sidebar onClose={closeMobile} />

      <div
        className="admin-backdrop d-lg-none"
        onClick={closeMobile}
        aria-hidden="true"
      ></div>

      <div className="admin-body">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="admin-main">
          {/* every page renders inside this container, so pages don't add their own */}
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>

      {/* outside the fixed sidebar so Bootstrap's backdrop/focus trap sit above it */}
      <LogoutModal admin={admin} onConfirm={handleLogout} />
    </div>
  )
}

export default AdminLayout

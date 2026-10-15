import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBookOpen,
  FiFileText,
  FiGrid,
  FiLayout,
  FiSettings,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import '../styles/NotFound.css'

const shortcuts = [
  {
    icon: FiLayout,
    title: 'Website Pages',
    text: 'Manage and edit all client-facing pages.',
    to: '/pages/home',
  },
  {
    icon: FiFileText,
    title: 'Articles',
    text: 'Write and publish insights articles.',
    to: '/articles',
  },
  {
    icon: FiBookOpen,
    title: 'Events',
    text: 'Schedule and manage community events.',
    to: '/events',
  },
  {
    icon: FiSettings,
    title: 'Settings',
    text: 'Contact details, social links, and forms.',
    to: '/settings',
  },
]

function NotFound() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Page Not Found | Integra Admin'
  }, [])

  return (
    <div className="adm-nf-wrapper">
      {/* ---------- 404 hero banner ---------- */}
      <section className="adm-nf-hero">
        <img src={markGold} alt="" className="adm-nf-mark" aria-hidden="true" />

        <div className="container-fluid">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9 col-xl-8">
              <span className="adm-nf-code" aria-hidden="true">
                4<span className="adm-nf-code-mark">0</span>4
              </span>

              <h1 className="adm-nf-title">Admin page could not be found.</h1>

              <p className="adm-nf-text">
                The link may be broken, or the management section may have moved.
                Use the shortcuts below or head back to the dashboard.
              </p>

              <p className="adm-nf-path">
                <span>Requested path:</span> <code>{pathname}</code>
              </p>

              <div className="adm-nf-actions">
                <Link to="/" className="adm-nf-btn gold">
                  <FiArrowLeft />
                  Back to Dashboard
                </Link>
                <Link to="/settings" className="adm-nf-btn outline-light">
                  <FiSettings />
                  CMS Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- admin shortcuts ---------- */}
      <section className="adm-nf-section">
        <span className="adm-nf-eyebrow">Quick Admin Navigation</span>

        <div className="row">
          {shortcuts.map(({ icon: Icon, title, text, to }) => (
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3" key={to}>
              <Link to={to} className="adm-nf-card">
                <span className="adm-nf-card-icon">
                  <Icon />
                </span>
                <h2 className="adm-nf-card-title">{title}</h2>
                <p className="adm-nf-card-text">{text}</p>
                <span className="adm-nf-card-link">
                  Open <FiArrowUpRight />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default NotFound

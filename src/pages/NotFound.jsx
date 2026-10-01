import { Link, useLocation } from 'react-router-dom'
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiClipboard,
  FiGrid,
  FiLayers,
  FiMessageCircle,
  FiTrendingUp,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import '../styles/NotFound.css'

const shortcuts = [
  {
    icon: FiLayers,
    title: 'Services',
    text: 'Seven services across four pillars.',
    to: '/services',
  },
  {
    icon: FiGrid,
    title: 'Packages',
    text: 'Clear packages with indicative pricing.',
    to: '/packages',
  },
  {
    icon: FiTrendingUp,
    title: 'Process',
    text: 'Seven steps from intake to follow-up.',
    to: '/process',
  },
  {
    icon: FiClipboard,
    title: 'Market Entry Review',
    text: 'Start with a short structured intake.',
    to: '/intake',
  },
]

function NotFound() {
  usePageMeta(
    'Page Not Found',
    'The page you are looking for could not be found.',
  )

  const { pathname } = useLocation()

  return (
    <>
      {/* ---------- 404 ---------- */}
      <section className="nf-hero">
        <img src={markGold} alt="" className="nf-mark" aria-hidden="true" />

        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="nf-code" aria-hidden="true">
                4<span className="nf-code-mark">0</span>4
              </span>

              <h1 className="nf-title">This page could not be found.</h1>

              <p className="nf-text">
                The link may be broken, or the page may have moved. Let us help
                you find the right pathway.
              </p>

              <p className="nf-path">
                <span>Requested:</span> <code>{pathname}</code>
              </p>

              <div className="nf-actions">
                <Link to="/" className="nf-btn gold">
                  <FiArrowLeft />
                  Back to Home
                </Link>
                <Link to="/contact" className="nf-btn outline-light">
                  <FiMessageCircle />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- shortcuts ---------- */}
      <section className="nf-section">
        <div className="container">
          <span className="nf-eyebrow">Popular Pages</span>

          <div className="row">
            {shortcuts.map(({ icon: Icon, title, text, to }) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3" key={to}>
                <Link to={to} className="nf-card">
                  <span className="nf-card-icon">
                    <Icon />
                  </span>
                  <h2 className="nf-card-title">{title}</h2>
                  <p className="nf-card-text">{text}</p>
                  <span className="nf-card-link">
                    Open <FiArrowUpRight />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound

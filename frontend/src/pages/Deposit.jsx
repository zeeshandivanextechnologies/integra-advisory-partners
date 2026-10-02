import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiInfo,
  FiLock,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import depositContent from '../constants/depositContent.js'
import '../styles/Payment.css'

function Deposit() {
  // site-wide links from the admin (Settings)
  const { deposit } = useSiteConfig()

  // managed from the admin (Deposit Page); built-in content until it is saved there
  const { banner, steps, payment, seo } = usePageContent('deposit', depositContent)

  usePageMeta(seo.title, seo.description)

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
        <section className="pay-banner">
          <img src={markGold} alt="" className="pay-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <nav className="pay-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <Link to="/process">Process</Link>
                  <FiChevronRight />
                  <span>Deposit</span>
                </nav>

                <h1 className="pay-banner-title">{banner.title}</h1>

                <p className="pay-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- steps + pay ---------- */}
      {(steps.visible !== false || payment.visible !== false) && (
        <section className="pay-section">
          <div className="container">
            <div className="row">
              {steps.visible !== false && (
                <div className="col-lg-7 mb-4 mb-lg-0">
                  <span className="pay-eyebrow">{steps.eyebrow}</span>
                  <h2 className="pay-heading">{steps.heading}</h2>

                  <ol className="pay-steps">
                    {steps.items.map(({ id, icon, title, text }) => (
                      <li key={id} className={id === steps.current ? 'current' : ''}>
                        <span className="pay-step-icon">
                          <PageIcon name={icon} />
                        </span>
                        <div>
                          <h3 className="pay-step-title">{title}</h3>
                          <p className="pay-step-text">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {payment.visible !== false && (
                <div className="col-lg-5">
                  <div className="pay-card">
                    <span className="pay-card-icon">
                      <FiLock />
                    </span>
                    <h2 className="pay-card-title">{payment.title}</h2>
                    <p className="pay-card-text">{payment.text}</p>

                    <ul className="pay-checklist">
                      {payment.checklist.map(({ id, text }) => (
                        <li key={id}>
                          <FiCheck />
                          {text}
                        </li>
                      ))}
                    </ul>

                    {deposit.url ? (
                      <a
                        href={deposit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pay-btn gold"
                      >
                        <FiCreditCard />
                        {payment.buttonLabel}
                        <FiArrowUpRight />
                      </a>
                    ) : (
                      <Link to="/contact" className="pay-btn gold">
                        {payment.fallbackLabel}
                        <FiArrowUpRight />
                      </Link>
                    )}

                    <p className="pay-note">
                      <FiInfo />
                      {payment.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Deposit

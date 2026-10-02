import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import paymentSuccessContent from '../constants/paymentSuccessContent.js'
import '../styles/Payment.css'

function PaymentSuccess() {
  // site-wide links from the admin (Settings)
  const { booking, contact } = useSiteConfig()

  // managed from the admin (Payment Success Page); built-in content until it is saved there
  const { banner, nextSteps, seo } = usePageContent('payment-success', paymentSuccessContent)

  usePageMeta(seo.title, seo.description)

  return (
    <>
      {/* ---------- thank you ---------- */}
      {banner.visible !== false && (
        <section className="pay-banner success">
          <img src={markGold} alt="" className="pay-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <span className="pay-success-icon">
                  <FiCheck />
                </span>
                <h1 className="pay-banner-title">{banner.title}</h1>
                <p className="pay-banner-text mx-auto">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- next steps ---------- */}
      {nextSteps.visible !== false && (
        <section className="pay-section">
          <div className="container">
            <div className="row">
              {nextSteps.items.map(({ id, icon, title, text }, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={id}>
                  <div className="pay-next">
                    <span className="pay-next-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="pay-step-icon">
                      <PageIcon name={icon} />
                    </span>
                    <h2 className="pay-step-title">{title}</h2>
                    <p className="pay-step-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pay-actions">
              {booking.url && (
                <a
                  href={booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pay-btn primary"
                >
                  <FiCalendar />
                  {nextSteps.bookingLabel}
                  <FiArrowUpRight />
                </a>
              )}
              <Link to="/" className="pay-btn outline">
                {nextSteps.homeLabel}
              </Link>
            </div>

            {contact.email && (
              <p className="pay-help">
                {nextSteps.helpText}{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default PaymentSuccess

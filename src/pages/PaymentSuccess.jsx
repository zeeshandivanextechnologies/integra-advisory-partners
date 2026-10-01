import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiMail,
  FiPackage,
  FiUsers,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import '../styles/Payment.css'

const { booking, contact } = siteConfig

const nextSteps = [
  {
    icon: FiMail,
    title: 'Check your email',
    text: 'A payment receipt is sent to the email address you used at checkout.',
  },
  {
    icon: FiUsers,
    title: 'Onboarding',
    text: 'Integra will contact you to confirm your engagement and begin onboarding.',
  },
  {
    icon: FiPackage,
    title: 'Delivery',
    text: 'You will receive weekly status updates, deliverables, and a live walkthrough.',
  },
]

function PaymentSuccess() {
  usePageMeta(
    'Payment Received',
    'Thank you for your payment to Integra Advisory Partners. Here is what happens next.',
  )

  return (
    <>
      {/* ---------- thank you ---------- */}
      <section className="pay-banner success">
        <img src={markGold} alt="" className="pay-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="pay-success-icon">
                <FiCheck />
              </span>
              <h1 className="pay-banner-title">Thank you. Your payment is complete.</h1>
              <p className="pay-banner-text mx-auto">
                Your payment has been received securely. Here is what happens
                next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- next steps ---------- */}
      <section className="pay-section">
        <div className="container">
          <div className="row">
            {nextSteps.map(({ icon: Icon, title, text }, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={title}>
                <div className="pay-next">
                  <span className="pay-next-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="pay-step-icon">
                    <Icon />
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
                Book Your Kickoff Call
                <FiArrowUpRight />
              </a>
            )}
            <Link to="/" className="pay-btn outline">
              Back to Home
            </Link>
          </div>

          {contact.email && (
            <p className="pay-help">
              Questions about your payment? Email{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default PaymentSuccess

import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiFileText,
  FiInfo,
  FiLock,
  FiPenTool,
  FiPlayCircle,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import '../styles/Payment.css'

const { deposit } = siteConfig

const steps = [
  {
    icon: FiFileText,
    title: 'Proposal and scope',
    text: 'You receive a concise scope of work with deliverables, price, timeline, and payment terms.',
  },
  {
    icon: FiPenTool,
    title: 'Contract signed',
    text: 'You review and sign the engagement contract.',
  },
  {
    icon: FiCreditCard,
    title: 'Deposit paid',
    text: 'You pay the deposit stated in your proposal using the secure form on this page.',
  },
  {
    icon: FiPlayCircle,
    title: 'Onboarding begins',
    text: 'Integra starts onboarding, followed by weekly status updates and deliverables.',
  },
]

const checklist = [
  'The deposit amount stated in your proposal',
  'Your proposal reference',
  'Your company name and a contact phone number',
]

function Deposit() {
  usePageMeta(
    'Pay Your Deposit',
    'Pay your Integra Advisory Partners engagement deposit securely after receiving your proposal and signing your contract.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
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

              <h1 className="pay-banner-title">Pay your deposit.</h1>

              <p className="pay-banner-text">
                No work starts until contract and deposit are complete. Once
                both are in place, onboarding begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- steps + pay ---------- */}
      <section className="pay-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <span className="pay-eyebrow">Deposit and Onboarding</span>
              <h2 className="pay-heading">Where the deposit fits.</h2>

              <ol className="pay-steps">
                {steps.map(({ icon: Icon, title, text }, index) => (
                  <li key={title} className={index === 2 ? 'current' : ''}>
                    <span className="pay-step-icon">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="pay-step-title">{title}</h3>
                      <p className="pay-step-text">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="col-lg-5">
              <div className="pay-card">
                <span className="pay-card-icon">
                  <FiLock />
                </span>
                <h2 className="pay-card-title">Secure deposit payment</h2>
                <p className="pay-card-text">
                  Payments are processed securely by Stripe. Have these ready:
                </p>

                <ul className="pay-checklist">
                  {checklist.map((item) => (
                    <li key={item}>
                      <FiCheck />
                      {item}
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
                    Pay Deposit Securely
                    <FiArrowUpRight />
                  </a>
                ) : (
                  <Link to="/contact" className="pay-btn gold">
                    Request Your Deposit Link
                    <FiArrowUpRight />
                  </Link>
                )}

                <p className="pay-note">
                  <FiInfo />
                  Only pay a deposit after you have received a proposal and
                  signed your contract with Integra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Deposit

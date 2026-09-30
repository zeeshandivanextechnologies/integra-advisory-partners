import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCalendar,
  FiChevronRight,
  FiClipboard,
  FiClock,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiPackage,
  FiPhoneCall,
  FiRepeat,
  FiSend,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import '../styles/Process.css'

const steps = [
  {
    icon: FiSend,
    title: 'Inquiry',
    text: 'Client completes the contact form or sends a direct inquiry.',
  },
  {
    icon: FiClipboard,
    title: 'Pre-call intake',
    text: 'Integra captures the key details before the first conversation.',
    tags: [
      'Industry',
      'Origin country',
      'GCC destination',
      'Budget',
      'Timeline',
      'Available documents',
      'Key decision question',
    ],
  },
  {
    icon: FiPhoneCall,
    title: 'Discovery call',
    text: 'A structured 45-minute call identifies whether Integra can help and what pathway fits.',
  },
  {
    icon: FiFileText,
    title: 'Proposal and scope',
    text: 'Integra sends a concise scope of work with deliverables, price, timeline, and payment terms.',
  },
  {
    icon: FiCreditCard,
    title: 'Deposit and onboarding',
    text: 'No work starts until contract and deposit are complete.',
  },
  {
    icon: FiPackage,
    title: 'Delivery',
    text: 'The client receives weekly status updates, deliverables, and a live walkthrough.',
  },
  {
    icon: FiRepeat,
    title: 'Follow-up',
    text: 'Integra follows up for implementation, referrals, and next opportunities.',
    days: ['Day 7', 'Day 30', 'Day 60', 'Day 90', 'Day 180'],
  },
]

const facts = [
  {
    icon: FiClock,
    value: '45 min',
    label: 'Structured discovery call',
  },
  {
    icon: FiLock,
    value: 'Contract first',
    label: 'No work starts before contract and deposit',
  },
  {
    icon: FiCalendar,
    value: 'Weekly',
    label: 'Status updates during delivery',
  },
  {
    icon: FiRepeat,
    value: '5 follow-ups',
    label: 'At day 7, 30, 60, 90, and 180',
  },
]

function Process() {
  usePageMeta(
    'Process',
    'A seven-step client journey from intake and discovery call to proposal, onboarding, delivery, and follow-up for Qatar and GCC market entry.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
      <section className="prc-banner">
        <img src={markGold} alt="" className="prc-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav className="prc-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <span>Process</span>
              </nav>

              <h1 className="prc-banner-title">
                A clear client journey, from first inquiry to follow-up.
              </h1>

              <p className="prc-banner-text">
                Seven structured steps that keep every engagement focused,
                transparent, and accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- key facts ---------- */}
      <section className="prc-facts">
        <div className="container">
          <div className="row">
            {facts.map(({ icon: Icon, value, label }) => (
              <div className="col-lg-3 col-sm-6 mb-3 mb-lg-0" key={value}>
                <div className="prc-fact">
                  <span className="prc-fact-icon">
                    <Icon />
                  </span>
                  <div>
                    <span className="prc-fact-value">{value}</span>
                    <span className="prc-fact-label">{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- steps ---------- */}
      <section className="prc-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-3">
              <div className="prc-intro">
                <span className="prc-eyebrow">How It Works</span>
                <h2 className="prc-heading">
                  Seven steps from intake to implementation.
                </h2>
                <p className="prc-lead">
                  Every engagement follows the same disciplined path, so you
                  always know what happens next and what is expected from both
                  sides.
                </p>
                <Link to="/intake" className="prc-btn primary">
                  Complete Intake Form
                  <FiArrowUpRight />
                </Link>
                <div className="prc-visual">
                  <img
                    src="/images/strategic-growth.webp"
                    alt="Rising gold bars and an upward arrow, representing strategic clarity and lasting growth"
                    width="1000"
                    height="1000"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <ol className="prc-timeline">
                {steps.map(({ icon: Icon, title, text, tags, days }, index) => (
                  <li className="prc-step" key={title}>
                    <span className="prc-step-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="prc-step-card">
                      <div className="prc-step-head">
                        <span className="prc-step-icon">
                          <Icon />
                        </span>
                        <h3 className="prc-step-title">{title}</h3>
                      </div>

                      <p className="prc-step-text">{text}</p>

                      {tags && (
                        <div className="prc-tags">
                          {tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}

                      {days && (
                        <div className="prc-days">
                          {days.map((day) => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="prc-section pt-0">
        <div className="container">
          <div className="prc-cta">
            <div className="row align-items-center ">
              <div className="col-lg-7 mb-3">
                <h2 className="prc-cta-title">Ready to take the first step?</h2>
                <p className="prc-cta-text">
                  Complete the intake form so Integra can prepare for a focused
                  discovery call.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="prc-cta-actions">
                  <Link to="/intake" className="prc-btn gold">
                    Complete Intake Form
                    <FiArrowUpRight />
                  </Link>
                  <Link to="/contact" className="prc-btn outline-light">
                    Request a Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Process

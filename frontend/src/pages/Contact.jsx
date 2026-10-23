import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiChevronRight,
  FiClipboard,
  FiInfo,
  FiPhoneCall,
  FiSend,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import { isGoogleFormReady, submitToGoogleForm } from '../utils/googleForm.js'
import '../styles/Contact.css'

const statusMessages = {
  sending: 'Sending your request...',
  sent: 'Thank you. Your request has been sent and Integra will be in touch.',
  error: 'Something went wrong. Please try again in a moment.',
  offline: 'This form is not connected yet. Please check back soon.',
}

function Contact() {
  // site-wide links from the admin (Settings)
  const siteConfig = useSiteConfig()
  const { contact, booking } = siteConfig
  const contactForm = siteConfig.googleForms.contact

  usePageMeta(
    'Contact',
    'Request a call with Integra Advisory Partners for discovery, advisory, incorporation, or partnership inquiries about Qatar and the GCC.',
  )

  const [inquiryType, setInquiryType] = useState('discovery')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget

    if (!isGoogleFormReady(contactForm)) {
      setStatus('offline')
      return
    }

    setStatus('sending')
    try {
      await submitToGoogleForm(contactForm, formElement)
      formElement.reset()
      setInquiryType('discovery')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ---------- page banner ---------- */}
      <section className="cnt-banner">
        <img src={markGold} alt="" className="cnt-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav className="cnt-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <span>Contact</span>
              </nav>

              <h1 className="cnt-banner-title">
                Tell us where you are headed. We will help you get there.
              </h1>

              <p className="cnt-banner-text">
                Share a few details about your plans for Qatar or the GCC and
                request a call with Integra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- form + info ---------- */}
      <section className="cnt-section">
        <div className="container">
          <div className="row ">

             <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="cnt-side">
                <div className="cnt-intake">
                  <span className="cnt-info-icon gold">
                    <FiClipboard />
                  </span>
                  <h3 className="cnt-intake-title">
                    Ready for a full market-entry review?
                  </h3>
                  <p className="cnt-intake-text">
                    Complete the intake form with your sector, target market,
                    budget, documents, and timeline.
                  </p>
                  <Link to="/intake" className="cnt-btn gold">
                    Complete Intake Form
                    <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="cnt-form-wrapper">
                 <div className="cnt-info mb-4">
                  <span className="cnt-info-icon">
                    <FiPhoneCall />
                  </span>
                  <div>
                    <h3 className="cnt-info-title">45-minute discovery call</h3>
                    <p className="cnt-info-text">
                      A structured call to identify whether Integra can help and
                      what pathway fits.
                    </p>
                    {booking.url && (
                      <a
                        href={booking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cnt-info-link"
                      >
                        Book a time
                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>


                <form className="cnt-form" onSubmit={handleSubmit}>
                  <input type="hidden" name="inquiryType" value="Discovery" />
                  <h2 className="cnt-form-title">Contact Us</h2>
                  <p className="cnt-form-text">
                    Share a few details about your plans and our team will get in touch.
                  </p>

                  <div className="row ">
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="cnt-name">Full name</label>
                      <input
                        id="cnt-name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="cnt-email">Email address</label>
                      <input
                        id="cnt-email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="cnt-company">Company</label>
                      <input
                        id="cnt-company"
                        name="company"
                        type="text"
                        className="form-control"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="cnt-role">Role</label>
                      <input
                        id="cnt-role"
                        name="role"
                        type="text"
                        className="form-control"
                        placeholder="Founder, CEO, Investor..."
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="cnt-message">How can Integra help?</label>
                      <textarea
                        id="cnt-message"
                        name="message"
                        className="form-control"
                        placeholder="Tell us briefly about your plans"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {status !== 'idle' && (
                  <p className={`cnt-notice ${status}`} role="status">
                    <FiInfo />
                    {statusMessages[status]}
                  </p>
                )}

                <button
                  type="submit"
                  className="cnt-btn primary"
                  disabled={status === 'sending'}
                >
                  <FiSend />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact

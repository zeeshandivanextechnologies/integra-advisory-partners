import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiChevronRight, FiInfo, FiSend, FiUpload, FiX, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import { isGoogleFormReady, submitToGoogleForm } from '../utils/googleForm.js'
import Loader from '../components/common/Loader.jsx'
import { submitIntakeForm } from '../services/inquiries.js'
import intakeContent from '../constants/intakeContent.js'
import '../styles/Intake.css'

const statusMessages = {
  sending: 'Sending your intake...',
  sent: 'Thank you. Your intake has been sent and Integra will contact you to schedule a discovery call.',
  error: 'Something went wrong. Please try again in a moment.',
  offline: 'This form is not connected yet. Please check back soon.',
}

const defaultReasons = [
  { field: 'Name, company, role', reason: 'Identify decision maker and authority.' },
  { field: 'Country of origin', reason: 'Segment Nigeria, Morocco, diaspora, and other international markets.' },
  { field: 'Target market', reason: 'Qatar, Saudi Arabia, UAE, Bahrain, Oman, Kuwait, or multiple GCC markets.' },
  { field: 'Sector', reason: 'Support service matching and partner mapping.' },
  { field: 'Capital / budget range', reason: 'Qualify seriousness and service fit.' },
  { field: 'Current documents', reason: 'Understand what is ready before filings or bank conversations.' },
  { field: 'Timeline', reason: 'Plan the right pace for your engagement.' },
  { field: 'Biggest concern', reason: 'Focus the discovery call on what matters most to you.' },
]

const origins = [
  { label: 'United States', value: 'United State' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'Diaspora', value: 'Diaspora' },
  { label: 'Other international market', value: 'Other international market' },
]

const markets = [
  'Qatar',
  'Saudi Arabia',
  'UAE',
  'Bahrain',
  'Oman',
  'Kuwait',
  'Multiple GCC markets',
]

const documents = [
  'Business registration',
  'Articles',
  'Financial statements',
  'KYC documents',
  'Pitch deck',
  'Business plan',
]

const timelines = ['Immediately', '30 days', '90 days', '6 months', 'Exploratory']

const concerns = [
  { label: 'Banking', value: 'Banking' },
  { label: 'Legal / regulatory', value: 'Legal/ regulatory' },
  { label: 'Market validation', value: 'Market validation' },
  { label: 'Partner introductions', value: 'Partner introductions' },
  { label: 'Visas', value: 'Visas' },
  { label: 'Operating costs', value: 'Operating costs' },
  { label: 'Sales pipeline', value: 'Sales pipeline' },
]

function Intake() {
  // site-wide links from the admin (Settings)
  const siteConfig = useSiteConfig()
  const { budgetRanges, documentUpload, _loaded: siteConfigLoaded } = siteConfig
  const intakeForm = siteConfig.googleForms.intake

  // dynamic page content managed from the admin (Intake Page)
  const { banner, whyWeAsk, seo, _loaded: contentLoaded } = usePageContent('intake', intakeContent)

  const reasonsList = whyWeAsk?.reasons?.length > 0 ? whyWeAsk.reasons : defaultReasons

  usePageMeta(
    seo?.title || 'Market Entry Review',
    seo?.description ||
      'Start your Qatar and GCC market entry review. Share your market, sector, budget, documents, and timeline before a structured discovery call.',
  )

  const [status, setStatus] = useState('idle')
  const [uploadedFile, setUploadedFile] = useState(null)

  if (!siteConfigLoaded || !contentLoaded) {
    return <Loader />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    // Append target market checkbox choices
    const checkedMarkets = Array.from(
      formElement.querySelectorAll('input[name="markets"]:checked')
    ).map((el) => el.value).join(', ')

    // Append documents checkbox choices
    const checkedDocs = Array.from(
      formElement.querySelectorAll('input[name="documents"]:checked')
    ).map((el) => el.value).join(', ')

    formData.set('markets', checkedMarkets)
    formData.set('documents', checkedDocs)

    if (uploadedFile) {
      formData.set('document', uploadedFile)
    }

    setStatus('sending')
    try {
      // 1. Submit directly to our Backend Database & File Storage
      await submitIntakeForm(formData)

      // 2. Also send to Google Form if configured (silent backup)
      if (isGoogleFormReady(intakeForm)) {
        try {
          await submitToGoogleForm(intakeForm, formElement)
        } catch (_) {}
      }

      formElement.reset()
      setUploadedFile(null)
      setStatus('sent')
      toast.success('Thank you! Your market entry intake has been submitted successfully.')
    } catch (err) {
      // Fallback: If backend is down but Google Form is ready
      if (isGoogleFormReady(intakeForm)) {
        try {
          await submitToGoogleForm(intakeForm, formElement)
          formElement.reset()
          setUploadedFile(null)
          setStatus('sent')
          toast.success('Thank you! Your market entry intake has been submitted successfully.')
          return
        } catch (_) {}
      }
      setStatus('error')
      toast.error('Something went wrong. Please try again in a moment.')
    }
  }

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner?.visible !== false && (
        <section className="int-banner">
          <img src={markGold} alt="" className="int-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <nav className="int-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <span>Market Entry Review</span>
                </nav>

                <h1 className="int-banner-title">
                  {banner?.title ||
                    'Before you open in Qatar or the GCC, know what the market, regulators, banks, and partners will actually require.'}
                </h1>

                <p className="int-banner-text">
                  {banner?.text ||
                    'Complete this short intake so Integra can prepare for a focused, structured discovery call.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- why we ask + form ---------- */}
      <section className="int-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="int-side">
                <span className="int-eyebrow">{whyWeAsk?.eyebrow || 'Why We Ask'}</span>
                <h2 className="int-side-title">
                  {whyWeAsk?.heading || 'Every question has a purpose.'}
                </h2>

                <ul className="int-reasons">
                  {reasonsList.map(({ field, reason }, index) => (
                    <li key={field + index}>
                      <span className="int-reason-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="int-reason-field">{field}</span>
                        <span className="int-reason-text">{reason}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-8">
              <form className="int-form" onSubmit={handleSubmit}>
                {/* step 1 */}
                <fieldset className="int-step">
                  <legend className="int-step-title">
                    <span>01</span> About you
                  </legend>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="custom-frm-bx">
                        <label htmlFor="int-name">Full name</label>
                        <input
                          id="int-name"
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
                        <label htmlFor="int-email">Email address</label>
                        <input
                          id="int-email"
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
                        <label htmlFor="int-company">Company</label>
                        <input
                          id="int-company"
                          name="company"
                          type="text"
                          className="form-control"
                          placeholder="Company name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-frm-bx">
                        <label htmlFor="int-role">Role</label>
                        <input
                          id="int-role"
                          name="role"
                          type="text"
                          className="form-control"
                          placeholder="Founder, CEO, Investor..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* step 2 */}
                <fieldset className="int-step">
                  <legend className="int-step-title">
                    <span>02</span> Your market
                  </legend>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="custom-frm-bx">
                        <label htmlFor="int-origin">
                          Country of origin / current base
                        </label>
                        <select
                          id="int-origin"
                          name="origin"
                          className="form-select"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            Select one
                          </option>
                          {origins.map((origin) => (
                            <option key={origin.value} value={origin.value}>
                              {origin.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-frm-bx">
                        <label htmlFor="int-sector">Sector</label>
                        <input
                          id="int-sector"
                          name="sector"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Fintech, Healthcare, Logistics"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <span className="int-group-label">Target market</span>
                  <div className="int-chips">
                    {markets.map((market) => (
                      <label className="int-chip" key={market}>
                        <input type="checkbox" name="markets" value={market} />
                        {market}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* step 3 */}
                <fieldset className="int-step">
                  <legend className="int-step-title">
                    <span>03</span> Readiness
                  </legend>

                  <div className="custom-frm-bx">
                    <label htmlFor="int-budget">
                      Capital available / budget range
                    </label>
                    {budgetRanges.length > 0 ? (
                      <select
                        id="int-budget"
                        name="budget"
                        className="form-select"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id="int-budget"
                        name="budget"
                        type="text"
                        className="form-control"
                        placeholder="e.g. USD range available for market entry"
                        required
                      />
                    )}
                  </div>

                  <span className="int-group-label">Current documents</span>
                  <div className="int-chips">
                    {documents.map((doc) => (
                      <label className="int-chip" key={doc}>
                        <input type="checkbox" name="documents" value={doc} />
                        {doc}
                      </label>
                    ))}
                  </div>

                  <div className="mt-3 mb-2">
                    <label htmlFor="int-file-upload" className="int-upload" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                      <FiUpload />
                      <span>{uploadedFile ? uploadedFile.name : 'Attach documents securely (PDF, Word, Deck max 25MB)'}</span>
                    </label>
                    <input
                      id="int-file-upload"
                      type="file"
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0])
                        }
                      }}
                    />
                    {uploadedFile && (
                      <button
                        type="button"
                        className="btn btn-sm text-danger ms-2"
                        onClick={() => setUploadedFile(null)}
                      >
                        Remove file
                      </button>
                    )}
                  </div>

                  <span className="int-group-label">Timeline</span>
                  <div className="int-chips">
                    {timelines.map((timeline) => (
                      <label className="int-chip" key={timeline}>
                        <input
                          type="radio"
                          name="timeline"
                          value={timeline}
                          required
                        />
                        {timeline}
                      </label>
                    ))}
                    
                  </div>
                </fieldset>

                {/* step 4 */}
                <fieldset className="int-step">
                  <legend className="int-step-title">
                    <span>04</span> Your priority
                  </legend>

                  <span className="int-group-label">Biggest concern</span>
                  <div className="int-chips">
                    {concerns.map((concern) => (
                      <label className="int-chip" key={concern.value}>
                        <input
                          type="radio"
                          name="concern"
                          value={concern.value}
                          required
                        />
                        {concern.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {status !== 'idle' && (
                  <p className={`int-notice ${status}`} role="status">
                    <FiInfo />
                    {statusMessages[status]}
                  </p>
                )}

                <button
                  type="submit"
                  className="int-btn"
                  disabled={status === 'sending'}
                >
                  <FiSend />
                  Start Your Market Entry Review
                </button>

                <p className="int-disclaimer">
                  Integra Advisory Partners provides business, market-entry,
                  regulatory-navigation, and relationship-development advisory.
                  It is not a law firm and does not provide legal advice.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Intake

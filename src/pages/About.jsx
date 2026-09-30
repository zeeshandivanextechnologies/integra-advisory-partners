import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiAward,
  FiCheck,
  FiChevronRight,
  FiCompass,
  FiEye,
  FiGlobe,
  FiLayers,
  FiMapPin,
  FiShield,
  FiTarget,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import logoWhite from '../assets/logos/primary-gold-white.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import '../styles/About.css'

const highlights = [
  {
    icon: FiMapPin,
    title: 'Local Qatari perspective',
    text: 'Doha-based market judgment grounded in how Qatar and the GCC actually operate.',
  },
  {
    icon: FiAward,
    title: '18 years of entrepreneurial experience',
    text: 'Hands-on experience building and operating businesses, not only advising them.',
  },
  {
    icon: FiLayers,
    title: 'Cross-sector operating exposure',
    text: 'Structured advisory workflows shaped by work across multiple sectors.',
  },
]

const clarity = [
  'What to expect in the first 12 months',
  'Which documents matter',
  'What partnerships should be pursued',
  'Where regulatory friction may appear',
  'Whether the opportunity is worth pursuing before major capital is committed',
]

const pillars = [
  {
    icon: FiTarget,
    title: 'Mission',
    text: 'To make market expansion into Qatar and the GCC simple, transparent, and achievable for businesses of all sizes.',
  },
  {
    icon: FiEye,
    title: 'Vision',
    text: 'To become the leading advisory partner that combines global business expertise with deep regional insight, transforming market complexity into growth opportunities for businesses entering the GCC.',
  },
  {
    icon: FiShield,
    title: 'Brand Promise',
    text: 'We simplify market expansion through trusted expertise, local intelligence, and practical strategic guidance, empowering businesses to enter new markets with confidence.',
  },
]

const audience = [
  'Entrepreneurs and founders',
  'Black and African-American founders and investors in the U.S. expanding into the GCC',
  'Small and medium-sized enterprises (SMEs)',
  'International businesses expanding into Qatar and the GCC',
  'Organizations seeking regulatory compliance and strategic market guidance',
]

const values = [
  'Knowledgeable',
  'Simple',
  'Direct',
  'Honest',
  'Reassuring',
  'Professional',
  'Modern with institutional credibility',
]

function About() {
  usePageMeta(
    'About',
    'Integra Advisory Partners is a Doha-based advisory firm helping international companies make practical decisions about entering and operating in Qatar and the GCC.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
      <section className="abt-banner">
        <img src={markGold} alt="" className="abt-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav className="abt-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <span>About</span>
              </nav>

              <h1 className="abt-banner-title">
                A Doha-based advisory firm for serious GCC operators.
              </h1>

              <p className="abt-banner-text">
                Helping international companies make informed, practical
                decisions about entering and operating in Qatar and the broader
                GCC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- who we are ---------- */}
      <section className="abt-section">
        <div className="container">
          <div className="row  align-items-center">
            <div className="col-lg-6">
              <span className="abt-eyebrow">Who We Are</span>
              <h2 className="abt-heading">
                From interest to execution, with more confidence.
              </h2>
              <p className="abt-lead">
                Integra Advisory Partners is a Doha-based advisory firm focused
                on helping international companies make informed, practical
                decisions about entering and operating in Qatar and the broader
                GCC.
              </p>
              <p className="abt-lead">
                The firm combines local Qatari market acumen, cross-sector
                entrepreneurial experience, structured advisory workflows, and
                trusted ecosystem access to help clients move from interest to
                execution with more confidence.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <div className="col-12" key={title}>
                    <div className="abt-highlight">
                      <span className="abt-icon">
                        <Icon />
                      </span>
                      <div>
                        <h3 className="abt-highlight-title">{title}</h3>
                        <p className="abt-highlight-text">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- real market conditions ---------- */}
      <section className="abt-section abt-light">
        <div className="container">

          <div className='row align-items-center'>
             <div className='col-lg-6'>
              <span className="abt-eyebrow">Our Approach</span>
              <h2 className="abt-heading">
                Real market conditions, not generic opportunity reports.
              </h2>
            </div>

            <div className='col-lg-6'>
              <p className="abt-lead">
                Integra is built for operators who need real market conditions.
                The firm helps clients understand:
              </p>
            </div>

          </div>

          

          <div className="row ">

            <div className="col-lg-5">
              <div className="abt-visual">
                <img
                  src="/images/open-gates.webp"
                  alt="Open gates leading to a city skyline, representing new business horizons"
                  width="1000"
                  height="1000"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <ul className="abt-clarity">
                {clarity.map((item, index) => (
                  <li key={item}>
                    <span className="abt-clarity-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="abt-clarity-text">{item}</span>
                    <FiCheck className="abt-clarity-check" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- mission, vision, promise ---------- */}
      <section className="abt-section">
        <div className="container">
          <div className="row abt-head">
            <div className="col-lg-7">
              <span className="abt-eyebrow">What Drives Us</span>
              <h2 className="abt-heading mb-0">
                Mission, vision, and the promise behind every engagement.
              </h2>
            </div>
          </div>

          <div className="row ">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div className="col-lg-4 col-md-6 mb-3" key={title}>
                <div className="abt-card">
                  <span className="abt-icon">
                    <Icon />
                  </span>
                  <h3 className="abt-card-title">{title}</h3>
                  <p className="abt-card-text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- who we serve + values ---------- */}
      <section className="abt-section abt-light">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 mb-3">
              <div className="abt-panel">
                <span className="abt-icon">
                  <FiGlobe />
                </span>
                <h3 className="abt-panel-title">Who we serve</h3>
                <ul className="abt-list">
                  {audience.map((item) => (
                    <li key={item}>
                      <FiCheck />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <div className="abt-panel">
                <span className="abt-icon">
                  <FiCompass />
                </span>
                <h3 className="abt-panel-title">How we work</h3>
                <div className="abt-values">
                  {values.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                <p className="abt-panel-note">
                  Integra provides business, market-entry, regulatory-navigation,
                  and relationship-development advisory. It is not a law firm and
                  does not provide legal advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- positioning + cta ---------- */}
      <section className="abt-section pt-0 abt-light">
        <div className="container">
          <div className="abt-cta">
            <div className="row align-items-center">
              <div className="col-lg-3 text-center text-lg-start mb-3">
                <img src={logoWhite} alt="Integra Advisory Partners" className="abt-cta-logo" />
              </div>
              <div className="col-lg-6 mb-3">
                <h2 className="abt-cta-title">
                  The trusted bridge between global ambition and regional
                  opportunity.
                </h2>
              </div>
              <div className="col-lg-3 text-lg-end mb-3">
                <Link to="/contact" className="abt-btn gold">
                  Meet Integra
                  <FiArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About

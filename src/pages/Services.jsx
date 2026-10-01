import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiChevronRight,
  FiFileText,
  FiInfo,
  FiMap,
  FiMoon,
  FiStar,
  FiZap,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import pillarMarket from '../assets/icons/pillar-market-strategy.webp'
import pillarCompliance from '../assets/icons/pillar-compliance.webp'
import pillarIntelligence from '../assets/icons/pillar-business-intelligence.webp'
import pillarPartners from '../assets/icons/pillar-partner-matchmaking.webp'
import usePageMeta from '../hooks/usePageMeta.js'
import '../styles/Services.css'

const focusAreas = [
  'Market-entry intelligence',
  'Regulatory & KYC readiness',
  'Incorporation coordination',
  'Advisory',
  'Ecosystem introductions',
]

const pillars = [
  {
    key: 'market',
    image: pillarMarket,
    title: 'Market Strategy & Positioning',
    text: 'Deciding whether and how to enter Qatar or the wider GCC.',
    services: ['Market Entry Blueprint'],
  },
  {
    key: 'compliance',
    image: pillarCompliance,
    title: 'Compliance & Regulatory Readiness',
    text: 'Preparing documents, KYC, and incorporation steps before filings and bank conversations.',
    services: [
      'Regulatory & KYC Readiness Review',
      'Qatar Incorporation & Bank Opening Pathway',
    ],
  },
  {
    key: 'intelligence',
    image: pillarIntelligence,
    title: 'Business Intelligence & Advisory',
    text: 'Ongoing judgment and strategic guidance as you build in the GCC.',
    services: ['Executive Advisory Retainer'],
  },
  {
    key: 'partners',
    image: pillarPartners,
    title: 'Partner Matchmaking & Talent Solutions',
    text: 'Structured introductions to the right partners, mentors, and talent.',
    services: ['Integra Innovators', 'Integra Nights', 'Integra Gold'],
  },
]

const pillarFor = (serviceTitle) =>
  pillars.find((pillar) => pillar.services.includes(serviceTitle))

const slug = (text) =>
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function PillarLabel({ title }) {
  const pillar = pillarFor(title)
  if (!pillar) return null
  return (
    <span className="srv-pillar">
      <img src={pillar.image} alt="" aria-hidden="true" />
      {pillar.title}
    </span>
  )
}

const advisoryServices = [
  {
    icon: FiMap,
    title: 'Market Entry Blueprint',
    text: 'A practical feasibility, business-plan, and financial-model bundle designed to help a founder decide whether Qatar, UAE, Saudi Arabia, or another GCC path makes commercial sense.',
  },
  {
    icon: FiFileText,
    title: 'Regulatory & KYC Readiness Review',
    text: 'A document-readiness and risk-navigation review that helps clients understand what they have, what is missing, and what must be addressed before formal filings or bank-facing conversations.',
  },
  {
    icon: FiBriefcase,
    title: 'Qatar Incorporation & Bank Opening Pathway',
    text: 'A guided pathway that coordinates the incorporation, visa/Iqama, document, and bank-readiness process with clear milestones and realistic expectations.',
    note: 'Bank approval is never guaranteed.',
  },
  {
    icon: FiCalendar,
    title: 'Executive Advisory Retainer',
    text: 'Monthly access to Integra for regulatory guidance, contract-review coordination, strategic check-ins, government liaison advice, and network-introduction planning.',
  },
]

const networkServices = [
  {
    icon: FiZap,
    title: 'Integra Innovators',
    text: 'A selective business network for founders and operators committed to integrity, innovation, and growth, with access to curated resources, product demonstrations, referrals, and events.',
  },
  {
    icon: FiMoon,
    title: 'Integra Nights',
    text: 'A structured networking series that moves beyond casual introductions and helps participants present their business, identify mentors, and create real follow-up opportunities.',
  },
  {
    icon: FiStar,
    title: 'Integra Gold',
    text: 'A selective, relationship-led advisory pathway for high-priority clients seeking curated introductions to investors, senior business figures, government contacts, diplomats, and strategic partners.',
  },
]

function Services() {
  usePageMeta(
    'Services',
    'GCC business setup advisory: Market Entry Blueprint, Regulatory & KYC Readiness Review, Qatar Incorporation & Bank Opening Pathway, and executive advisory.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
      <section className="srv-banner">
        <img src={markGold} alt="" className="srv-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav className="srv-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <span>Services</span>
              </nav>

              <h1 className="srv-banner-title">
                Tightly defined service pathways for entering Qatar and the GCC.
              </h1>

              <p className="srv-banner-text">
                From market-entry intelligence and regulatory readiness to
                incorporation coordination, ongoing advisory, and trusted
                ecosystem introductions.
              </p>
            </div>
          </div>

          <ul className="srv-focus">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- four pillars ---------- */}
      <section className="srv-section srv-pillars">
        <div className="container">
          <div className="row align-items-end srv-head">
            <div className="col-lg-7">
              <span className="srv-eyebrow">Our Four Pillars</span>
              <h2 className="srv-heading">
                Seven services, organized around four pillars.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="srv-lead">
                Every Integra service sits under one of four pillars, so you can
                see where each pathway fits in your expansion.
              </p>
            </div>
          </div>

          <div className="row">
            {pillars.map(({ key, image, title, text, services }) => (
              <div className="col-lg-3 col-md-6 mb-3" key={key}>
                <div className="srv-pillar-card">
                  <img src={image} alt="" className="srv-pillar-icon" aria-hidden="true" />
                  <h3 className="srv-pillar-title">{title}</h3>
                  <p className="srv-pillar-text">{text}</p>
                  <ul className="srv-pillar-services">
                    {services.map((service) => (
                      <li key={service}>
                        <a href={`#${slug(service)}`}>
                          {service}
                          <FiChevronRight />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- advisory services ---------- */}
      <section className="srv-section">
        <div className="container">
          <div className="row align-items-end  srv-head">
            <div className="col-lg-7">
              <span className="srv-eyebrow">Advisory Pathways</span>
              <h2 className="srv-heading">
                From first decision to formal setup.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="srv-lead">
                Structured engagements that help you evaluate the market,
                prepare your documents, and move into Qatar with realistic
                expectations.
              </p>
            </div>
          </div>

          <div className="row ">
            {advisoryServices.map(({ icon: Icon, title, text, note }, index) => (
              <div className="col-lg-6 col-md-6 mb-3" key={title}>
                <div className="srv-card" id={slug(title)}>
                  <div className="srv-card-top">
                    <span className="srv-icon">
                      <Icon />
                    </span>
                    <span className="srv-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <PillarLabel title={title} />
                  <h3 className="srv-card-title">{title}</h3>
                  <p className="srv-card-text">{text}</p>

                  {note && (
                    <p className="srv-note">
                      <FiInfo />
                      {note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- network services ---------- */}
      <section className="srv-section srv-network">
        <div className="container">
          <div className="row align-items-center srv-head">
            <div className="col-lg-7">
              <span className="srv-eyebrow">Network &amp; Relationships</span>
              <h2 className="srv-heading">
                The right relationships, introduced with discipline.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="srv-lead">
                Curated networks and structured introductions instead of
                unfocused networking.
              </p>
            </div>
          </div>

          <div className="row ">
            <div className="col-lg-5 col-md-12 mb-3">
              <div className="srv-visual">
                <img
                  src="/images/partnerships.webp"
                  alt="Business partners connecting, representing partnerships that create opportunities"
                  width="1000"
                  height="1000"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row ">
                {networkServices.map(({ icon: Icon, title, text }, index) => (
                  <div className="col-12 col-md-12 mb-3" key={title}>
                    <div className="srv-card" id={slug(title)}>
                      <div className="srv-card-top">
                        <span className="srv-icon">
                          <Icon />
                        </span>
                        <span className="srv-number">
                          {String(index + advisoryServices.length + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <PillarLabel title={title} />
                      <h3 className="srv-card-title">{title}</h3>
                      <p className="srv-card-text">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- compare cta ---------- */}
      <section className="srv-section pt-0 srv-network">
        <div className="container">
          <div className="srv-cta">
            <div className="row align-items-center ">
              <div className="col-lg-7 mb-3">
                <h2 className="srv-cta-title">
                  Not sure which pathway fits your business?
                </h2>
                <p className="srv-cta-text">
                  Compare packages side by side, or complete a short intake so
                  Integra can recommend the right starting point.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="srv-cta-actions">
                  <Link to="/packages" className="srv-btn gold">
                    Compare Service Pathways
                    <FiArrowUpRight />
                  </Link>
                  <Link to="/intake" className="srv-btn outline-light">
                    Complete Intake Form
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

export default Services

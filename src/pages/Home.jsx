import { Link } from 'react-router-dom'
import {
  FiAlertTriangle,
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCpu,
  FiDollarSign,
  FiEye,
  FiFileText,
  FiFlag,
  FiGitBranch,
  FiGlobe,
  FiMap,
  FiMapPin,
  FiMoon,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import markWhite from '../assets/logos/mark-white.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import '../styles/Home.css'

const markets = ['Qatar', 'Saudi Arabia', 'UAE', 'Bahrain', 'Oman', 'Kuwait']

const pillars = ['Local judgment', 'Regulatory clarity', 'Relationship access']

const audiences = [
  {
    icon: FiFlag,
    title: 'U.S.-based founders',
    text: 'Black and African-American founders, operators, and investors in the U.S. exploring Qatar and the GCC.',
  },
  {
    icon: FiGlobe,
    title: 'African founders',
    text: 'Founders and growth-stage companies from Nigeria, Morocco, and across the continent.',
  },
  {
    icon: FiTrendingUp,
    title: 'Diaspora & international investors',
    text: 'Diaspora and international operators evaluating a serious GCC expansion.',
  },
  {
    icon: FiUsers,
    title: 'Referral partners',
    text: 'Law firms, banks, trade missions, embassies, accelerators, and ecosystem partners.',
  },
]

const challenges = [
  { icon: FiDollarSign, label: 'Operating costs' },
  { icon: FiGitBranch, label: 'Incorporation pathways' },
  { icon: FiUserCheck, label: 'KYC expectations' },
  { icon: FiClock, label: 'Banking timelines' },
  { icon: FiAlertTriangle, label: 'Regulatory friction' },
  { icon: FiUsers, label: 'Partner risk' },
]

const reasons = [
  {
    icon: FiMapPin,
    title: 'Local Qatari perspective',
    text: 'Advice grounded in local market judgment, not distant assumptions.',
  },
  {
    icon: FiShield,
    title: 'Regulatory-navigation focus',
    text: 'Support around incorporation readiness, KYC preparation, government-interface planning, and licensed professional referrals.',
  },
  {
    icon: FiUsers,
    title: 'Relationship discipline',
    text: 'Structured introductions to relevant ecosystem partners instead of unfocused networking.',
  },
  {
    icon: FiTarget,
    title: 'Execution lens',
    text: 'Clients leave with a practical plan, not just a report.',
  },
  {
    icon: FiCpu,
    title: 'Human diligence with AI efficiency',
    text: 'AI and templates accelerate research, while local judgment verifies the decision-making points that matter.',
  },
]

const services = [
  {
    icon: FiMap,
    title: 'Market Entry Blueprint',
    text: 'A practical feasibility, business-plan, and financial-model bundle to help you decide whether Qatar, UAE, Saudi Arabia, or another GCC path makes commercial sense.',
  },
  {
    icon: FiFileText,
    title: 'Regulatory & KYC Readiness Review',
    text: 'A document-readiness and risk-navigation review of what you have, what is missing, and what must be addressed before filings or bank-facing conversations.',
  },
  {
    icon: FiBriefcase,
    title: 'Qatar Incorporation & Bank Opening Pathway',
    text: 'A guided pathway coordinating incorporation, visa/Iqama, documents, and bank readiness with clear milestones. Bank approval is never guaranteed.',
  },
  {
    icon: FiCalendar,
    title: 'Executive Advisory Retainer',
    text: 'Monthly access to Integra for regulatory guidance, contract-review coordination, strategic check-ins, and network-introduction planning.',
  },
  {
    icon: FiZap,
    title: 'Integra Innovators',
    text: 'A selective business network for founders and operators committed to integrity, innovation, and growth.',
  },
  {
    icon: FiMoon,
    title: 'Integra Nights',
    text: 'A structured networking series that helps participants present their business, identify mentors, and create real follow-up opportunities.',
  },
  {
    icon: FiStar,
    title: 'Integra Gold',
    text: 'A selective, relationship-led pathway for curated introductions to investors, senior business figures, government contacts, and strategic partners.',
  },
]

function Home() {
  usePageMeta(
    null,
    'Qatar and GCC market entry advisory for international founders and investors. Local judgment, regulatory clarity, and the right relationships, based in Doha.',
  )

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="home-hero">
        {siteConfig.heroVideo.src && (
          <video
            className="hero-video"
            src={siteConfig.heroVideo.src}
            poster={siteConfig.heroVideo.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <img src={markGold} alt="" className="hero-mark" aria-hidden="true" />

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-0">
              <span className="home-eyebrow light fade-up">
                Qatar &amp; GCC Market Entry Advisory
              </span>

              <h1 className="hero-title fade-up delay-1">
                Enter the GCC with local judgment, regulatory clarity, and the
                right relationships.
              </h1>

              <p className="hero-text fade-up delay-2">
                Integra Advisory Partners helps international founders,
                investors, and growth-stage companies evaluate, structure, and
                execute expansion into Qatar and the broader GCC.
              </p>

              <div className="hero-actions fade-up delay-3">
                <Link to="/intake" className="home-btn gold">
                  Start Your Market Entry Review
                  <FiArrowUpRight />
                </Link>
                <Link to="/services" className="home-btn outline-light">
                  Explore Our Service Pathways
                </Link>
              </div>

              <p className="hero-trust fade-up delay-4">
                <FiMapPin />
                Based in Doha. Built for serious international operators
                entering MENA and the GCC.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="hero-card fade-up delay-2">
                <h2 className="hero-card-title">GCC markets we help you enter</h2>

                <ul className="hero-markets">
                  {markets.map((market) => (
                    <li key={market}>
                      <FiCheck />
                      {market}
                    </li>
                  ))}
                </ul>

                <div className="hero-pillars">
                  {pillars.map((pillar) => (
                    <span key={pillar}>{pillar}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- who we serve ---------- */}
      <section className="home-audience">
        <div className="container">
          <div className="row align-items-end gy-3 audience-head">
            <div className="col-lg-7">
              <span className="home-eyebrow">Who We Serve</span>
              <h2 className="home-heading mb-0">
                Built for founders and investors taking their next step into
                the GCC.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="home-lead mb-0">
                From the U.S., across Africa, and throughout the diaspora,
                Integra supports serious operators entering Qatar and the
                broader GCC.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {audiences.map(({ icon: Icon, title, text }) => (
              <div className="col-lg-3 col-md-6" key={title}>
                <div className="audience-card">
                  <span className="audience-icon">
                    <Icon />
                  </span>
                  <h3 className="audience-title">{title}</h3>
                  <p className="audience-text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- problem statement ---------- */}
      <section className="home-section">
        <div className="container">
          <div className="row  align-items-center">
            <div className="col-lg-5">
              <span className="home-eyebrow">The Challenge</span>
              <h2 className="home-heading">
                Expanding into the GCC is not just a market-research exercise.
              </h2>
              <p className="home-lead">
                Founders need to understand operating costs, incorporation
                pathways, KYC expectations, banking timelines, regulatory
                friction, partner risk, and the real conditions behind the
                polished opportunity reports.
              </p>

              <div className="problem-solution">
                <span className="problem-solution-icon">
                  <FiCheck />
                </span>
                <div>
                  <p className="problem-solution-text">
                    Integra turns that uncertainty into a practical entry plan.
                  </p>
                  <Link to="/process" className="problem-solution-link">
                    See how the process works
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="problem-panel">
                <span className="problem-panel-label">
                  What founders need to understand
                </span>

                <div className="row g-3">
                  {challenges.map(({ icon: Icon, label }, index) => (
                    <div className="col-sm-6" key={label}>
                      <div className="problem-item">
                        <span className="problem-icon">
                          <Icon />
                        </span>
                        <span className="problem-label">{label}</span>
                        <span className="problem-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="col-12">
                    <div className="problem-item wide">
                      <span className="problem-icon">
                        <FiEye />
                      </span>
                      <span className="problem-label">
                        The real conditions behind the polished opportunity
                        reports
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- why integra ---------- */}
      <section className="home-section why-section">
        <div className="container">

          <div className='row align-items-center'>
            
            <div className='col-lg-6'>
<span className="home-eyebrow">Why Integra</span>
                <h2 className="home-heading">
                  The trusted bridge between global ambition and regional
                  opportunity.
                </h2>
            </div>
            <div className='col-lg-6'>
  <p className="home-lead">
                  Local judgment, practical execution, and trusted relationship
                  access for operators entering Qatar and the GCC.
                </p>
            </div>

          </div>


          <div className="row">
            <div className="col-lg-5">
              <div className="why-intro">
                <div className="why-visual">
                  <img
                    src="/images/integrated-solutions.webp"
                    alt="Integrated solutions connecting compliance, strategy, intelligence, and partnerships"
                    width="1000"
                    height="1000"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row">
                {reasons.map(({ icon: Icon, title, text }) => (
                  <div className="col-md-6 mb-3" key={title}>
                    <div className="why-card">
                      <span className="why-icon">
                        <Icon />
                      </span>
                      <h3 className="why-title">{title}</h3>
                      <p className="why-text">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- service pathways ---------- */}
      <section className="home-section services-section">
        <div className="container">
          <div className="row align-items-end  section-head">
            <div className="col-lg-7">
              <span className="home-eyebrow">Service Pathways</span>
              <h2 className="home-heading mb-0">
                Tightly defined offerings, from first decision to full
                operation.
              </h2>
            </div>
            <div className="col-lg-5 text-lg-end">
              <Link to="/services" className="home-btn primary">
                Compare Service Pathways
                <FiArrowUpRight />
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {services.map(({ icon: Icon, title, text }) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={title}>
                <Link to="/services" className="service-card">
                  <span className="service-icon">
                    <Icon />
                  </span>
                  <h3 className="service-title">{title}</h3>
                  <p className="service-text">{text}</p>
                  <span className="service-link">
                    Learn more <FiArrowUpRight />
                  </span>
                </Link>
              </div>
            ))}

            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="service-card highlight">
                <h3 className="service-title">Not sure which pathway fits?</h3>
                <p className="service-text">
                  Start with a short intake and a structured discovery call.
                </p>
                <Link to="/contact" className="home-btn gold mt-auto">
                  Request a Call
                  <FiArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="home-section pt-0">
        <div className="container">
          <div className="cta-box">
            <img src={markWhite} alt="" className="cta-mark" aria-hidden="true" />

            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="cta-title">
                  Before you open in Qatar or the GCC, know what the market,
                  regulators, banks, and partners will actually require.
                </h2>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/intake" className="home-btn gold">
                  Start Your Market Entry Review
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

export default Home

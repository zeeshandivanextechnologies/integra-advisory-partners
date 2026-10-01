import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiInfo,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import siteConfig from '../constants/siteConfig.js'
import '../styles/Packages.css'

const packages = [
  {
    name: 'Executive Discovery Sessions',
    type: 'Starter',
    price: '$1,000',
    unit: '/ 3 sessions',
    bestFor:
      'Early-stage decision makers who need clarity before committing to a full engagement.',
    text: "Three structured advisory calls focused on the client's target market, documents, decision questions, and next-step options.",
  },
  {
    name: 'Market Entry Blueprint',
    type: 'Project',
    price: '$5,000+',
    bestFor: 'Founders deciding whether and how to enter the GCC.',
    text: 'Feasibility, business plan, and financial model supported by local interpretation and a practical recommendation.',
  },
  {
    name: 'Qatar Incorporation & Bank Readiness Pathway',
    type: 'Project',
    price: '$15,000+',
    bestFor: 'Companies ready to begin a formal Qatar setup process.',
    text: 'A coordinated pathway for incorporation readiness, visa/Iqama navigation, bank-readiness coordination, and milestone tracking.',
    note: 'Bank approval is never guaranteed.',
  },
  {
    name: 'Operational Readiness Program',
    type: 'Project',
    price: '$30,000+',
    bestFor:
      'Companies that need post-entry operating structure, not only setup.',
    includes: [
      'Incorporation pathway support',
      'Operational readiness planning',
      'Lean Six Sigma implementation plan',
      'One month of post-feasibility support',
    ],
  },
  {
    name: 'Executive Advisory Retainer',
    type: 'Monthly',
    price: '$2,500',
    unit: '/ month+',
    bestFor:
      'Clients who need ongoing access, judgment, and strategic guidance.',
    text: 'Four hours per month with additional hours billed separately. Best for founders who need steady guidance without a full project every month.',
  },
]

function Packages() {
  usePageMeta(
    'Packages',
    'Indicative pricing for Qatar and GCC market entry: discovery sessions, market entry blueprint, incorporation and bank readiness, and advisory retainers.',
  )

  return (
    <>
      {/* ---------- page banner ---------- */}
      <section className="pkg-banner">
        <img src={markGold} alt="" className="pkg-banner-mark" aria-hidden="true" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav className="pkg-breadcrumb" aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <FiChevronRight />
                <span>Packages</span>
              </nav>

              <h1 className="pkg-banner-title">
                Clear packages with indicative pricing.
              </h1>

              <p className="pkg-banner-text">
                From a first set of discovery sessions to a full operational
                readiness program, choose the level of support that fits where
                your business is today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- package cards ---------- */}
      <section className="pkg-section">
        <div className="container">
          <div className="row align-items-center  pkg-head">
            <div className="col-lg-7">
              <span className="pkg-eyebrow">Our Packages</span>
              <h2 className="pkg-heading">
                Choose the pathway that matches your stage.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="pkg-lead">
                Every engagement starts with an intake and a structured
                discovery call before any scope is confirmed.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {packages.map((item) => (
              <div className="col-lg-4 col-md-6 mb-3" key={item.name}>
                <div className="pkg-card">
                  <span className="pkg-type">{item.type}</span>
                  <h3 className="pkg-name">{item.name}</h3>

                  <div className="pkg-price">
                    <span className="pkg-amount">{item.price}</span>
                    {item.unit && <span className="pkg-unit">{item.unit}</span>}
                  </div>
                  <span className="pkg-price-label">Indicative price</span>

                  <div className="pkg-best">
                    <span>Best for</span>
                    <p>{item.bestFor}</p>
                  </div>

                  {item.text && <p className="pkg-text">{item.text}</p>}

                  {item.includes && (
                    <ul className="pkg-includes">
                      {item.includes.map((point) => (
                        <li key={point}>
                          <FiCheck />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.note && (
                    <p className="pkg-note">
                      <FiInfo />
                      {item.note}
                    </p>
                  )}

                  <Link to="/intake" className="pkg-btn primary mt-auto">
                    Request This Package
                    <FiArrowUpRight />
                  </Link>

                  {siteConfig.payments[item.name] && (
                    <a
                      href={siteConfig.payments[item.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pkg-btn pay"
                    >
                      <FiCreditCard />
                      Pay Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="pkg-disclaimer">
            <div>
              <FiInfo className=''/>
            </div>
           <span>
             Prices are indicative. Final deliverables, price, timeline, and
            payment terms are confirmed in a concise scope of work <span className='d-lg-block d-sm-inline'>after the
            discovery call. No work starts until the contract and deposit are
            complete.</span>
           </span>
          </p>
        </div>
      </section>

      {/* ---------- comparison table ---------- */}
      <section className="pkg-section pkg-compare">
        <div className="container">
          <div className="row pkg-head">
            <div className="col-lg-7">
              <span className="pkg-eyebrow">At a Glance</span>
              <h2 className="pkg-heading">Compare service pathways.</h2>
            </div>
          </div>

          <div className="table-responsive pkg-table-wrap">
            <table className="table pkg-table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Package</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Type</th>
                  <th scope="col" className="text-end">
                    Indicative price
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((item) => (
                  <tr key={item.name}>
                    <th scope="row">{item.name}</th>
                    <td>{item.bestFor}</td>
                    <td>
                      <span className="pkg-type small">{item.type}</span>
                    </td>
                    <td className="text-end pkg-table-price">
                      {item.price} {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="pkg-section pt-0 pkg-compare">
        <div className="container">
          <div className="pkg-cta">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <h2 className="pkg-cta-title">
                  Not sure which package fits?
                </h2>
                <p className="pkg-cta-text">
                  Start with Executive Discovery Sessions, or complete a short
                  intake so Integra can recommend the right pathway.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="pkg-cta-actions">
                  <Link to="/intake" className="pkg-btn gold">
                    Complete Intake Form
                    <FiArrowUpRight />
                  </Link>
                  {siteConfig.booking.url ? (
                    <a
                      href={siteConfig.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pkg-btn outline-light"
                    >
                      Book a Discovery Call
                    </a>
                  ) : (
                    <Link to="/contact" className="pkg-btn outline-light">
                      Request a Call
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Packages

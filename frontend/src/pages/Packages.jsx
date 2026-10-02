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
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import packagesContent from '../constants/packagesContent.js'
import '../styles/Packages.css'

// Saved from the admin with each package; before the first save the
// built-in packages have none, so the links in siteConfig are used
const paymentLinkFor = (item, payments) =>
  item.paymentLink !== undefined ? item.paymentLink : payments[item.name]

// the admin edits this as one point per line, so skip blank lines
const includedPoints = (item) =>
  (item.includes || []).map((point) => point.trim()).filter(Boolean)

function Packages() {
  // site-wide links from the admin (Settings)
  const siteConfig = useSiteConfig()

  // managed from the admin (Packages Page); built-in content until it is saved there
  const { banner, packages, compare, cta, seo } = usePageContent(
    'packages',
    packagesContent,
  )

  usePageMeta(seo.title, seo.description)

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
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

                <h1 className="pkg-banner-title">{banner.title}</h1>

                <p className="pkg-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- package cards ---------- */}
      {packages.visible !== false && (
        <section className="pkg-section">
          <div className="container">
            <div className="row align-items-center  pkg-head">
              <div className="col-lg-7">
                <span className="pkg-eyebrow">{packages.eyebrow}</span>
                <h2 className="pkg-heading">{packages.heading}</h2>
              </div>
              <div className="col-lg-5">
                <p className="pkg-lead">{packages.lead}</p>
              </div>
            </div>

            <div className="row justify-content-center">
              {packages.items.map((item) => {
                const payLink = paymentLinkFor(item, siteConfig.payments)
                const includes = includedPoints(item)
                return (
                  <div className="col-lg-4 col-md-6 mb-3" key={item.id}>
                    <div className="pkg-card">
                      <span className="pkg-type">{item.type}</span>
                      <h3 className="pkg-name">{item.name}</h3>

                      <div className="pkg-price">
                        <span className="pkg-amount">{item.price}</span>
                        {item.unit && <span className="pkg-unit">{item.unit}</span>}
                      </div>
                      <span className="pkg-price-label">{packages.priceLabel}</span>

                      <div className="pkg-best">
                        <span>Best for</span>
                        <p>{item.bestFor}</p>
                      </div>

                      {item.text && <p className="pkg-text">{item.text}</p>}

                      {includes.length > 0 && (
                        <ul className="pkg-includes">
                          {includes.map((point) => (
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

                      <Link to={packages.requestLink} className="pkg-btn primary mt-auto">
                        {packages.requestLabel}
                        <FiArrowUpRight />
                      </Link>

                      {payLink && (
                        <a
                          href={payLink}
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
                )
              })}
            </div>

            <p className="pkg-disclaimer">
              <div>
                <FiInfo className=''/>
              </div>
             <span>
               {packages.disclaimer} <span className='d-lg-block d-sm-inline'>{packages.disclaimerEnd}</span>
             </span>
            </p>
          </div>
        </section>
      )}

      {/* ---------- comparison table ---------- */}
      {compare.visible !== false && (
        <section className="pkg-section pkg-compare">
          <div className="container">
            <div className="row pkg-head">
              <div className="col-lg-7">
                <span className="pkg-eyebrow">{compare.eyebrow}</span>
                <h2 className="pkg-heading">{compare.heading}</h2>
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
                      {packages.priceLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packages.items.map((item) => (
                    <tr key={item.id}>
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
      )}

      {/* ---------- cta ---------- */}
      {cta.visible !== false && (
        <section className="pkg-section pt-0 pkg-compare">
          <div className="container">
            <div className="pkg-cta">
              <div className="row align-items-center">
                <div className="col-lg-7 mb-3 mb-lg-0">
                  <h2 className="pkg-cta-title">{cta.title}</h2>
                  <p className="pkg-cta-text">{cta.text}</p>
                </div>
                <div className="col-lg-5">
                  <div className="pkg-cta-actions">
                    <Link to={cta.link} className="pkg-btn gold">
                      {cta.buttonLabel}
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
      )}
    </>
  )
}

export default Packages

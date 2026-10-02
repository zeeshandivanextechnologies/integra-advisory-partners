import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiChevronRight,
  FiInfo,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import pillarMarket from '../assets/icons/pillar-market-strategy.webp'
import pillarCompliance from '../assets/icons/pillar-compliance.webp'
import pillarIntelligence from '../assets/icons/pillar-business-intelligence.webp'
import pillarPartners from '../assets/icons/pillar-partner-matchmaking.webp'
import PageIcon from '../components/common/PageIcon.jsx'
import servicesContent from '../constants/servicesContent.js'
import usePageContent from '../hooks/usePageContent.js'
import usePageMeta from '../hooks/usePageMeta.js'
import { mediaUrl } from '../utils/media.js'
import '../styles/Services.css'

// The four default pillar icons are bundled with the site, so their saved
// paths point at these files; an icon uploaded from the admin is a /uploads/ path
const bundledPillarIcons = {
  '/src/assets/icons/pillar-market-strategy.webp': pillarMarket,
  '/src/assets/icons/pillar-compliance.webp': pillarCompliance,
  '/src/assets/icons/pillar-business-intelligence.webp': pillarIntelligence,
  '/src/assets/icons/pillar-partner-matchmaking.webp': pillarPartners,
}

const pillarIcon = (src) => bundledPillarIcons[src] || mediaUrl(src)

const slug = (text) =>
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function PillarLabel({ pillar }) {
  if (!pillar) return null
  return (
    <span className="srv-pillar">
      <img src={pillarIcon(pillar.image)} alt="" aria-hidden="true" />
      {pillar.title}
    </span>
  )
}

function Services() {
  // managed from the admin (Services Page); built-in content until it is saved there
  const { banner, pillars, advisory, network, cta, seo } = usePageContent(
    'services',
    servicesContent,
  )

  usePageMeta(seo.title, seo.description)

  // pillars list their services by id
  const allServices = [...advisory.items, ...network.items]
  const serviceById = (id) => allServices.find((service) => service.id === id)
  const pillarFor = (serviceId) =>
    pillars.items.find((pillar) => pillar.services.includes(serviceId))

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
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

                <h1 className="srv-banner-title">{banner.title}</h1>

                <p className="srv-banner-text">{banner.text}</p>
              </div>
            </div>

            <ul className="srv-focus">
              {banner.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- four pillars ---------- */}
      {pillars.visible !== false && (
        <section className="srv-section srv-pillars">
          <div className="container">
            <div className="row align-items-end srv-head">
              <div className="col-lg-7">
                <span className="srv-eyebrow">{pillars.eyebrow}</span>
                <h2 className="srv-heading">{pillars.heading}</h2>
              </div>
              <div className="col-lg-5">
                <p className="srv-lead">{pillars.lead}</p>
              </div>
            </div>

            <div className="row">
              {pillars.items.map(({ id, image, title, text, services }) => (
                <div className="col-lg-3 col-md-6 mb-3" key={id}>
                  <div className="srv-pillar-card">
                    {image && (
                      <img
                        src={pillarIcon(image)}
                        alt=""
                        className="srv-pillar-icon"
                        aria-hidden="true"
                      />
                    )}
                    <h3 className="srv-pillar-title">{title}</h3>
                    <p className="srv-pillar-text">{text}</p>
                    <ul className="srv-pillar-services">
                      {services
                        .map(serviceById)
                        .filter(Boolean)
                        .map((service) => (
                          <li key={service.id}>
                            <a href={`#${slug(service.title)}`}>
                              {service.title}
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
      )}

      {/* ---------- advisory services ---------- */}
      {advisory.visible !== false && (
        <section className="srv-section">
          <div className="container">
            <div className="row align-items-end  srv-head">
              <div className="col-lg-7">
                <span className="srv-eyebrow">{advisory.eyebrow}</span>
                <h2 className="srv-heading">{advisory.heading}</h2>
              </div>
              <div className="col-lg-5">
                <p className="srv-lead">{advisory.lead}</p>
              </div>
            </div>

            <div className="row ">
              {advisory.items.map(({ id, icon, title, text, note }, index) => (
                <div className="col-lg-6 col-md-6 mb-3" key={id}>
                  <div className="srv-card" id={slug(title)}>
                    <div className="srv-card-top">
                      <span className="srv-icon">
                        <PageIcon name={icon} />
                      </span>
                      <span className="srv-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <PillarLabel pillar={pillarFor(id)} />
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
      )}

      {/* ---------- network services ---------- */}
      {network.visible !== false && (
        <section className="srv-section srv-network">
          <div className="container">
            <div className="row align-items-center srv-head">
              <div className="col-lg-7">
                <span className="srv-eyebrow">{network.eyebrow}</span>
                <h2 className="srv-heading">{network.heading}</h2>
              </div>
              <div className="col-lg-5">
                <p className="srv-lead">{network.lead}</p>
              </div>
            </div>

            <div className="row ">
              <div className="col-lg-5 col-md-12 mb-3">
                {network.image && (
                  <div className="srv-visual">
                    <img
                      src={mediaUrl(network.image)}
                      alt={network.alt}
                      width="1000"
                      height="1000"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-7">
                <div className="row ">
                  {network.items.map(({ id, icon, title, text }, index) => (
                    <div className="col-12 col-md-12 mb-3" key={id}>
                      <div className="srv-card" id={slug(title)}>
                        <div className="srv-card-top">
                          <span className="srv-icon">
                            <PageIcon name={icon} />
                          </span>
                          <span className="srv-number">
                            {/* numbering continues after the advisory cards */}
                            {String(index + advisory.items.length + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <PillarLabel pillar={pillarFor(id)} />
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
      )}

      {/* ---------- compare cta ---------- */}
      {cta.visible !== false && (
        <section className="srv-section pt-0 srv-network">
          <div className="container">
            <div className="srv-cta">
              <div className="row align-items-center ">
                <div className="col-lg-7 mb-3">
                  <h2 className="srv-cta-title">{cta.title}</h2>
                  <p className="srv-cta-text">{cta.text}</p>
                </div>
                <div className="col-lg-5">
                  <div className="srv-cta-actions">
                    <Link to={cta.primaryCta.link} className="srv-btn gold">
                      {cta.primaryCta.label}
                      <FiArrowUpRight />
                    </Link>
                    <Link to={cta.secondaryCta.link} className="srv-btn outline-light">
                      {cta.secondaryCta.label}
                    </Link>
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

export default Services

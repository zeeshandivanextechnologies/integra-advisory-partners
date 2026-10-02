import { createElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiEye,
  FiMapPin,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import markWhite from '../assets/logos/mark-white.svg'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import useSiteConfig from '../hooks/useSiteConfig.js'
import homeContent from '../constants/homeContent.js'
import icons from '../constants/icons.js'
import { mediaUrl } from '../utils/media.js'
import '../styles/Home.css'

// icon saved from the admin by name, e.g. "FiFlag"
const PageIcon = ({ name }) => createElement(icons[name] || FiCheck)

function Home() {
  // site-wide links from the admin (Settings)
  const siteConfig = useSiteConfig()

  // managed from the admin (Home Page); built-in content until it is saved there
  const { hero, audience, challenge, why, services, cta, seo } = usePageContent(
    'home',
    homeContent,
  )

  usePageMeta(null, seo.description)

  // the admin sets the full tab title for the home page; this runs after
  // usePageMeta (which sets the site name), so it wins
  useEffect(() => {
    if (seo.title) document.title = seo.title
  }, [seo.title, seo.description])


  return (
    <>
      {/* ---------- hero ---------- */}
      {hero.visible !== false && (
        <section className="home-hero">
          {hero.video && (
            <video
              className="hero-video"
              src={mediaUrl(hero.video)}
              poster={mediaUrl(hero.poster) || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          )}
          {/* <img src={markGold} alt="" className="hero-mark" aria-hidden="true" /> */}

          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-3 mb-lg-0">
                <span className="home-eyebrow light fade-up">{hero.eyebrow}</span>

                <h1 className="hero-title fade-up delay-1">{hero.title}</h1>

                <p className="hero-text fade-up delay-2">{hero.text}</p>

                <div className="hero-actions fade-up delay-3">
                  <Link to={hero.primaryCta.link} className="home-btn gold">
                    {hero.primaryCta.label}
                    <FiArrowUpRight />
                  </Link>
                  <Link to={hero.secondaryCta.link} className="home-btn outline-light">
                    {hero.secondaryCta.label}
                  </Link>
                </div>

                <p className="hero-trust fade-up delay-4">
                  <FiMapPin />
                  {hero.trust}
                </p>
              </div>

              <div className="col-lg-5">
                <div className="hero-card fade-up delay-2">
                  <h2 className="hero-card-title">{hero.cardTitle}</h2>

                  <ul className="hero-markets">
                    {hero.markets.map((market) => (
                      <li key={market}>
                        <FiCheck />
                        {market}
                      </li>
                    ))}
                  </ul>

                  <div className="hero-pillars">
                    {hero.pillars.map((pillar) => (
                      <span key={pillar}>{pillar}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- who we serve ---------- */}
      {audience.visible !== false && (
        <section className="home-audience">
          <div className="container">
            <div className="row align-items-end  audience-head">
              <div className="col-lg-7">
                <span className="home-eyebrow">{audience.eyebrow}</span>
                <h2 className="home-heading mb-0">{audience.heading}</h2>
              </div>
              <div className="col-lg-5">
                <p className="home-lead mb-0">{audience.lead}</p>
              </div>
            </div>

            <div className="row ">
              {audience.items.map(({ id, icon, title, text, image, alt }) => (
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3" key={id}>
                  <div className="audience-card">
                    {image && (
                      <div className="audience-photo">
                        <img
                          src={mediaUrl(image)}
                          alt={alt}
                          width="800"
                          height="600"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="audience-icon">
                      <PageIcon name={icon} />
                    </span>
                    <h3 className="audience-title">{title}</h3>
                    <p className="audience-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- problem statement ---------- */}
      {challenge.visible !== false && (
        <section className="home-section">
          <div className="container">
            <div className="row  align-items-center">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <span className="home-eyebrow">{challenge.eyebrow}</span>
                <h2 className="home-heading">{challenge.heading}</h2>
                <p className="home-lead">{challenge.lead}</p>

                <div className="problem-solution">
                  <span className="problem-solution-icon">
                    <FiCheck />
                  </span>
                  <div>
                    <p className="problem-solution-text">{challenge.solution}</p>
                    <Link to={challenge.link} className="problem-solution-link">
                      {challenge.linkLabel}
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="problem-panel">
                  <span className="problem-panel-label">{challenge.panelLabel}</span>

                  <div className="row">
                    {challenge.items.map(({ id, icon, label }, index) => (
                      <div className="col-sm-12 col-lg-6 col-md-6 mb-3" key={id}>
                        <div className="problem-item">
                          <span className="problem-icon">
                            <PageIcon name={icon} />
                          </span>
                          <span className="problem-label">{label}</span>
                          <span className="problem-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    ))}

                    {challenge.closing && (
                      <div className="col-12">
                        <div className="problem-item wide">
                          <span className="problem-icon">
                            <FiEye />
                          </span>
                          <span className="problem-label">{challenge.closing}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- why integra ---------- */}
      {why.visible !== false && (
        <section className="home-section why-section">
          <div className="container">

            <div className='row align-items-center'>

              <div className='col-lg-6'>
<span className="home-eyebrow">{why.eyebrow}</span>
                  <h2 className="home-heading">{why.heading}</h2>
              </div>
              <div className='col-lg-6'>
    <p className="home-lead">{why.lead}</p>
              </div>

            </div>


            <div className="row why-layout">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="why-photo">
                  <img
                    src={mediaUrl(why.image)}
                    alt={why.alt}
                    width="800"
                    height="1000"
                    loading="lazy"
                  />
                  <div className="why-photo-card">
                    <span className="why-photo-label">{why.photoLabel}</span>
                    <ul>
                      {hero.pillars.map((pillar) => (
                        <li key={pillar}>
                          <FiCheck />
                          {pillar}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="row">
                  {/* up to four tiles; the feature card below is the fifth reason */}
                  {why.reasons.slice(0, 4).map(({ id, icon, title, text }, index) => (
                    <div className="col-md-6 mb-4" key={id}>
                      <div className="why-tile">
                        <div className="why-tile-top">
                          <span className="why-tile-icon">
                            <PageIcon name={icon} />
                          </span>
                          <span className="why-tile-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="why-tile-title">{title}</h3>
                        <p className="why-tile-text">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {why.feature && (
                <div className="col-12">
                  <div className="why-feature">
                    <div className="row align-items-center">
                      <div className="col-lg-7 mb-3 mb-lg-0">
                        <div className="why-feature-head">
                          <span className="why-feature-icon">
                            <PageIcon name={why.feature.icon} />
                          </span>
                          <div>
                            <span className="why-feature-number">05</span>
                            <h3 className="why-feature-title">{why.feature.title}</h3>
                          </div>
                        </div>
                        <p className="why-feature-text">{why.feature.text}</p>
                      </div>
                      <div className="col-lg-5">
                        <div className="why-feature-split">
                          <div>
                            <span>{why.feature.leftLabel}</span>
                            <strong>{why.feature.leftValue}</strong>
                          </div>
                          <div>
                            <span>{why.feature.rightLabel}</span>
                            <strong>{why.feature.rightValue}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- service pathways ---------- */}
      {services.visible !== false && (
        <section className="home-section services-section">
          <div className="container">
            <div className="row align-items-end  section-head">
              <div className="col-lg-7 col-md-12 col-sm-12 mb-3 mb-lg-0">
                <span className="home-eyebrow">{services.eyebrow}</span>
                <h2 className="home-heading mb-0">{services.heading}</h2>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 text-lg-end">
                <Link to="/services" className="home-btn primary">
                  {services.buttonLabel}
                  <FiArrowUpRight />
                </Link>
              </div>
            </div>

            <div className="row">
              {services.items.map(({ id, icon, title, text }) => (
                <div className="col-xl-3 col-lg-4 col-md-6 mb-3" key={id}>
                  <Link to="/services" className="service-card">
                    <span className="service-icon">
                      <PageIcon name={icon} />
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
                  <h3 className="service-title">{services.helpTitle}</h3>
                  <p className="service-text">{services.helpText}</p>
                  {siteConfig.booking.url ? (
                    <a
                      href={siteConfig.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-btn gold mt-auto"
                    >
                      Book a Discovery Call
                      <FiArrowUpRight />
                    </a>
                  ) : (
                    <Link to="/contact" className="home-btn gold mt-auto">
                      Request a Call
                      <FiArrowUpRight />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- cta ---------- */}
      {cta.visible !== false && (
        <section className="home-section pt-0">
          <div className="container">
            <div className="cta-box">
              <img src={markWhite} alt="" className="cta-mark" aria-hidden="true" />

              <div className="row align-items-center">
                <div className="col-lg-8 mb-3 mb-lg-0">
                  <h2 className="cta-title">{cta.title}</h2>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <Link to={cta.link} className="home-btn gold">
                    {cta.buttonLabel}
                    <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Home

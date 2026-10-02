import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCompass,
  FiGlobe,
} from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import logoWhite from '../assets/logos/primary-gold-white.svg'
import PageIcon from '../components/common/PageIcon.jsx'
import aboutContent from '../constants/aboutContent.js'
import usePageContent from '../hooks/usePageContent.js'
import usePageMeta from '../hooks/usePageMeta.js'
import { mediaUrl } from '../utils/media.js'
import '../styles/About.css'

function About() {
  // managed from the admin (About Page); built-in content until it is saved there
  const { banner, whoWeAre, approach, drives, serveWork, cta, seo } = usePageContent(
    'about',
    aboutContent,
  )

  usePageMeta(seo.title, seo.description)

  return (
    <>
      {/* ---------- page banner ---------- */}
      {banner.visible !== false && (
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

                <h1 className="abt-banner-title">{banner.title}</h1>

                <p className="abt-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- who we are ---------- */}
      {whoWeAre.visible !== false && (
        <section className="abt-section">
          <div className="container">
            <div className="row  align-items-center">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <span className="abt-eyebrow">{whoWeAre.eyebrow}</span>
                <h2 className="abt-heading">{whoWeAre.heading}</h2>
                {whoWeAre.paragraphs.map(({ id, text }) => (
                  <p className="abt-lead" key={id}>
                    {text}
                  </p>
                ))}
                {whoWeAre.image && (
                  <div className="abt-photo">
                    <img
                      src={mediaUrl(whoWeAre.image)}
                      alt={whoWeAre.alt}
                      width="1200"
                      height="801"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-6">
                <div className="row ">
                  {whoWeAre.highlights.map(({ id, icon, title, text }) => (
                    <div className="col-lg-12 mb-3" key={id}>
                      <div className="abt-highlight">
                        <span className="abt-icon">
                          <PageIcon name={icon} />
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
      )}

      {/* ---------- real market conditions ---------- */}
      {approach.visible !== false && (
        <section className="abt-section abt-light">
          <div className="container">

            <div className='row align-items-center'>
               <div className='col-lg-6'>
                <span className="abt-eyebrow">{approach.eyebrow}</span>
                <h2 className="abt-heading">{approach.heading}</h2>
              </div>

              <div className='col-lg-6'>
                <p className="abt-lead">{approach.lead}</p>
              </div>

            </div>



            <div className="row ">

              <div className="col-lg-5 col-md-12 mb-3 mb-lg-0">
                {approach.image && (
                  <div className="abt-visual">
                    <img
                      src={mediaUrl(approach.image)}
                      alt={approach.alt}
                      width="1000"
                      height="1000"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-7">
                <ul className="abt-clarity">
                  {approach.items.map(({ id, text }, index) => (
                    <li key={id}>
                      <span className="abt-clarity-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="abt-clarity-text">{text}</span>
                      <FiCheck className="abt-clarity-check" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- mission, vision, promise ---------- */}
      {drives.visible !== false && (
        <section className="abt-section">
          <div className="container">
            <div className="row abt-head">
              <div className="col-lg-7">
                <span className="abt-eyebrow">{drives.eyebrow}</span>
                <h2 className="abt-heading mb-0">{drives.heading}</h2>
              </div>
            </div>

            <div className="row ">
              {drives.cards.map(({ id, icon, title, text }) => (
                <div className="col-lg-4  col-md-6 col-sm-12 mb-3" key={id}>
                  <div className="abt-card">
                    <span className="abt-icon">
                      <PageIcon name={icon} />
                    </span>
                    <h3 className="abt-card-title">{title}</h3>
                    <p className="abt-card-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- who we serve + values ---------- */}
      {serveWork.visible !== false && (
        <section className="abt-section abt-light">
          <div className="container">
            <div className="row ">
              <div className="col-lg-6 mb-3">
                <div className="abt-panel">
                  <span className="abt-icon">
                    <FiGlobe />
                  </span>
                  <h3 className="abt-panel-title">{serveWork.serveTitle}</h3>
                  <ul className="abt-list">
                    {serveWork.audience.map(({ id, text }) => (
                      <li key={id}>
                        <FiCheck />
                        {text}
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
                  <h3 className="abt-panel-title">{serveWork.workTitle}</h3>
                  <div className="abt-values">
                    {serveWork.values.map((value) => (
                      <span key={value}>{value}</span>
                    ))}
                  </div>
                  <p className="abt-panel-note">{serveWork.note}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- positioning + cta ---------- */}
      {cta.visible !== false && (
        <section className="abt-section pt-0 abt-light">
          <div className="container">
            <div className="abt-cta">
              <div className="row align-items-center">
                <div className="col-lg-3 text-center text-lg-start mb-3">
                  <img src={logoWhite} alt="Integra Advisory Partners" className="abt-cta-logo" />
                </div>
                <div className="col-lg-6 mb-3">
                  <h2 className="abt-cta-title">{cta.title}</h2>
                </div>
                <div className="col-lg-3 text-lg-end mb-3">
                  <Link to={cta.link} className="abt-btn gold">
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

export default About

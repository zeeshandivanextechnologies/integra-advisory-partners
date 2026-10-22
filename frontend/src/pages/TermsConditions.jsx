import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import markGold from '../assets/logos/mark-gold.svg'
import Loader from '../components/common/Loader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import usePageContent from '../hooks/usePageContent.js'
import termsConditionsContent from '../constants/termsConditionsContent.js'
import '../styles/LegalPages.css'

function TermsConditions() {
  const { banner, content, seo, _loaded } = usePageContent('terms-and-conditions', termsConditionsContent)
  
  usePageMeta(seo.title, seo.description)

  if (!_loaded) {
    return <Loader />
  }

  return (
    <>
      {banner.visible !== false && (
        <section className="legal-banner">
          <img src={markGold} alt="" className="legal-banner-mark" aria-hidden="true" />

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <nav className="legal-breadcrumb" aria-label="breadcrumb">
                  <Link to="/">Home</Link>
                  <FiChevronRight />
                  <span>{seo.title}</span>
                </nav>

                <h1 className="legal-banner-title">{banner.title}</h1>
                <p className="legal-banner-text">{banner.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {content.visible !== false && (
        <section className="legal-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="legal-body">
                  {content.sections.map((section) => (
                    <div key={section.id}>
                      <h2>{section.title}</h2>
                      {section.text.split('\n\n').map((paragraph, idx) => (
                        <p key={`${section.id}-p-${idx}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default TermsConditions

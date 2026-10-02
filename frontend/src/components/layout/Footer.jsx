import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiHome, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import logo from '../../assets/logos/primary-gold-white.svg'
import useSiteConfig from '../../hooks/useSiteConfig.js'
import '../../styles/Footer.css'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Process', to: '/process' },
  { label: 'Insights', to: '/insights' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

const services = [
  'Market Entry Blueprint',
  'Regulatory & KYC Readiness Review',
  'Qatar Incorporation & Bank Opening Pathway',
  'Executive Advisory Retainer',
  'Integra Innovators',
  'Integra Nights',
  'Integra Gold',
]

const socialIcons = {
  linkedin: { icon: FaLinkedinIn, label: 'LinkedIn' },
  instagram: { icon: FaInstagram, label: 'Instagram' },
  x: { icon: FaXTwitter, label: 'X' },
  facebook: { icon: FaFacebookF, label: 'Facebook' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
}

const year = new Date().getFullYear()

function Footer() {
  const { contact, social } = useSiteConfig()
  const socialLinks = Object.entries(social).filter(([, url]) => url)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row footer-top">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Integra Advisory Partners" />
            </Link>
            <p className="footer-tagline">
              The trusted bridge between global <span className='d-lg-block d-sm-inline'>ambition and regional opportunity.</span>
            </p> 
            <p className="footer-location">
              <span>
                <FiMapPin />
              </span>
              <span>
                Based in Doha. Built for serious international <span className='d-lg-block d-sm-inline'>operators entering
              MENA and the GCC.</span>
              </span>
            </p>

           

            {socialLinks.length > 0 && (
              <div className="footer-social">
                {socialLinks.map(([key, url]) => {
                  const { icon: Icon, label } = socialIcons[key]
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div className="col-lg-2 col-md-6 col-sm-12 mb-4 mb-lg-0">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mb-lg-0">
            <h6 className="footer-title">Services</h6>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <h6 className="footer-title">Get Started</h6>
            <p className="footer-text">
              Before you open in Qatar or the GCC, know what the market,
              regulators, banks, and partners will actually require.
            </p>
            <Link to="/intake" className="footer-cta">
              Start Your Market Entry Review
              <FiArrowUpRight />
            </Link>

             {(contact.email || contact.phone || contact.address) && (
              <ul className="footer-contact">
                {contact.email && (
                  <li>
                    <FiMail />
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <FiPhone />
                    <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li className="align-items-start">
                    <FiHome className="mt-1" />
                    <span>{contact.address}</span>
                  </li>
                )}
              </ul>
            )}

          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Integra Advisory Partners provides
            business, market-entry, regulatory-navigation, and
            relationship-development advisory. It is not a law firm and does not
            provide legal advice. Legal drafting, legal opinions, and
            representation should be performed by licensed counsel in the
            relevant jurisdiction.
          </p>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Integra Advisory Partners. All rights reserved.</p>
          <p>Doha, Qatar</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

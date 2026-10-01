import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import logo from '../../assets/logos/secondary-navy.svg'
import '../../styles/Header.css'

const navLinks = [
  { label: 'Home', to: '/' },
   { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Process', to: '/process' }, 
  { label: 'Insights', to: '/insights' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-xl">
        <div className="container">
          <Link className="navbar-brand header-logo" to="/" onClick={closeMenu}>
            <img src={logo} alt="Integra Advisory Partners" />
          </Link>

          <button
            className={`header-toggler d-xl-none ${menuOpen ? 'open' : ''}`}
            type="button"
            aria-controls="mainNavbar"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
            id="mainNavbar"
          >
            <ul className="navbar-nav mx-auto header-menu">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    className="nav-link"
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link className="thm-btn header-cta" to="/intake" onClick={closeMenu}>
              Start Market Entry Review
              <FiArrowUpRight />
            </Link>
          </div>

          <div
            className={`header-backdrop d-xl-none ${menuOpen ? 'show' : ''}`}
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        </div>
      </nav>
    </header>
  )
}

export default Header

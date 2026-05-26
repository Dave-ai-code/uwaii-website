import { useState, useEffect } from 'react'
import './Nav.css'

const navLinks = [
  { label: 'Catalog',      href: '#catalog' },
  { label: 'Coverage',     href: '#coverage' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about' },
  { label: 'Pricing',      href: '#pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        {/* Logo */}
        <a href="#hero" className="nav__logo" onClick={e => handleLink(e, '#hero')}>
          <span className="nav__logo-pulse" />
          UWAII
        </a>

        {/* Desktop links */}
        <ul className="nav__links">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={e => handleLink(e, l.href)} className="nav__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#catalog" onClick={e => handleLink(e, '#catalog')} className="nav__cta btn-primary">
          Browse Datasets
        </a>

        {/* Hamburger */}
        <button
          className={`nav__hamburger ${open ? 'nav__hamburger--open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="nav__mobile">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={e => handleLink(e, l.href)} className="nav__mobile-link">
              {l.label}
            </a>
          ))}
          <a href="#catalog" onClick={e => handleLink(e, '#catalog')} className="btn-primary nav__mobile-cta">
            Browse Datasets
          </a>
        </div>
      )}
    </nav>
  )
}

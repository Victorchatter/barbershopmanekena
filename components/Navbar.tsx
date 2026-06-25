'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import BookingWizard from './BookingWizard'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery,  href: '#gallery' },
    { label: t.nav.reviews,  href: '#reviews' },
    { label: t.nav.location, href: '#location' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          backgroundColor: scrolled ? 'var(--bg-parchment)' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo / wordmark */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: scrolled ? 'var(--text-primary)' : 'oklch(97% 0.006 78)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              transition: 'color 0.3s',
            }}
          >
            Barber shop<br />
            <span style={{ color: 'var(--red-primary)', fontStyle: 'italic' }}>Manekena</span>
          </a>

          {/* Desktop links */}
          <ul
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-lato)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: scrolled ? 'var(--text-primary)' : 'oklch(90% 0.008 78)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: phone (desktop) + lang toggle + book btn */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Phone — desktop only */}
            <a
              href={`tel:${t.phone.replace(/\s/g, '')}`}
              className="hidden-mobile"
              style={{
                fontFamily: 'var(--font-lato)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: scrolled ? 'var(--text-primary)' : 'oklch(90% 0.008 78)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              {t.phone}
            </a>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
              style={{
                fontFamily: 'var(--font-lato)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: 'transparent',
                border: '1.5px solid',
                borderColor: scrolled ? 'var(--border)' : 'oklch(70% 0.01 78)',
                color: scrolled ? 'var(--text-primary)' : 'oklch(90% 0.008 78)',
                borderRadius: '2px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              aria-label="Toggle language"
            >
              {lang === 'bg' ? 'EN' : 'BG'}
            </button>

            {/* Book button — desktop */}
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-primary hidden-mobile"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              {t.nav.book}
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              aria-label="Menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '22px',
                    height: '2px',
                    backgroundColor: scrolled ? 'var(--text-primary)' : 'oklch(95% 0.005 78)',
                    borderRadius: '1px',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: 'var(--bg-parchment)',
              borderTop: '1px solid var(--border)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  fontFamily: 'var(--font-lato)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setBookingOpen(true); setMenuOpen(false) }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            >
              {t.nav.book}
            </button>
          </div>
        )}
      </header>

      {/* Inline styles for show/hide helpers (can't use Tailwind easily here without extra config) */}
      <style>{`
        .hidden-mobile { display: none !important; }
        .show-mobile   { display: flex !important; }
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
      `}</style>

      {bookingOpen && <BookingWizard onClose={() => setBookingOpen(false)} />}
    </>
  )
}

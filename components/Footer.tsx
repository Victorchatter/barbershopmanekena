'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'oklch(65% 0.015 78)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div className="barber-rule" style={{ marginBottom: '3rem', opacity: 0.4 }} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Brand column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'oklch(93% 0.008 78)',
              marginBottom: '0.5rem',
              lineHeight: 1.25,
            }}
          >
            Barber shop<br />
            <span style={{ color: 'var(--red-primary)', fontStyle: 'italic' }}>Manekena</span>
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.65, maxWidth: '24ch' }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Address column */}
        <div>
          <p
            className="eyebrow"
            style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}
          >
            {t.location.address_label}
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
            {t.footer.address}
          </p>
          <a
            href={`tel:${t.phone.replace(/\s/g, '')}`}
            style={{
              display: 'block',
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'oklch(80% 0.01 78)',
              textDecoration: 'none',
            }}
          >
            {t.phone}
          </a>
        </div>

        {/* Social column */}
        <div>
          <p
            className="eyebrow"
            style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}
          >
            {t.footer.social_label}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href="https://www.facebook.com/p/Barber-Shop-Manekana-100066404182537/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'oklch(65% 0.015 78)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/barber_shop_manekena"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'oklch(65% 0.015 78)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Instagram
            </a>
            <a
              href="https://www.oink.bg/biz/barber_shop7"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'oklch(65% 0.015 78)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Oink.bg
            </a>
            <a
              href="https://maps.google.com/maps?q=43.2112146,27.9012324"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'oklch(65% 0.015 78)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid oklch(28% 0.02 48)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: 'oklch(48% 0.012 78)',
        }}
      >
        <span>
          © {year} Barber shop Manekena. {t.footer.legal}.
        </span>
        <span>{t.footer.credit}</span>
      </div>

      <p
        style={{
          maxWidth: '1200px',
          margin: '0.75rem auto 0',
          fontSize: '0.72rem',
          color: 'oklch(40% 0.01 78)',
          lineHeight: 1.5,
        }}
      >
        {t.footer.gdpr}
      </p>
    </footer>
  )
}

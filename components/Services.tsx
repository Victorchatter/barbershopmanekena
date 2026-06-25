'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import BookingWizard from './BookingWizard'

const SERVICE_ICONS: Record<string, string> = {
  haircut:    '✂',
  'beard-trim': '✦',
  'beard-cond': '◈',
  'beard-dye':  '◉',
  fade:       '▲',
  curly:      '∿',
  color:      '◐',
}

export default function Services() {
  const { t } = useLanguage()
  const ref = useScrollReveal()
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <section
        id="services"
        ref={ref as React.RefObject<HTMLElement>}
        className="section-pad"
        style={{ backgroundColor: 'var(--bg-warm)' }}
      >
        {/* Full-width barber rule at top */}
        <div className="barber-rule" style={{ marginBottom: '0' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
          {/* Header */}
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow" data-reveal style={{ marginBottom: '0.75rem' }}>
              {t.services.eyebrow}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <h2 className="heading-lg" data-reveal>
                {t.services.heading}
              </h2>
              <p
                data-reveal
                style={{
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                }}
              >
                {t.services.subheading}
              </p>
            </div>
          </div>

          {/* Service grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1px',
              backgroundColor: 'var(--border)',
              border: '1px solid var(--border)',
            }}
          >
            {t.services.items.map((item, i) => (
              <div
                key={item.id}
                data-reveal
                className={`delay-${Math.min(i + 1, 5)}`}
                style={{
                  backgroundColor: 'var(--surface)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'background-color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-parchment)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)'
                }}
              >
                <span
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--red-primary)',
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {SERVICE_ICONS[item.id] ?? '—'}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            data-reveal
            style={{ marginTop: '3rem', textAlign: 'center' }}
          >
            <button
              className="btn-primary"
              onClick={() => setBookingOpen(true)}
            >
              {t.nav.book}
            </button>
          </div>
        </div>

        <div className="barber-rule" style={{ marginTop: '4rem' }} />
      </section>

      {bookingOpen && <BookingWizard onClose={() => setBookingOpen(false)} />}
    </>
  )
}

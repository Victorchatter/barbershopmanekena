'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Team() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section
      id="team"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-dark)', color: 'oklch(90% 0.008 78)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <div>
            <p
              className="eyebrow"
              data-reveal
              style={{ color: 'var(--gold)', marginBottom: '1rem' }}
            >
              {t.team.eyebrow}
            </p>
            <h2
              className="heading-lg"
              data-reveal
              style={{ color: 'oklch(96% 0.008 78)', marginBottom: '1.5rem' }}
            >
              {t.team.heading}
            </h2>
            <div className="barber-rule-sm" data-reveal style={{ marginBottom: '1.5rem' }} />
            <p
              data-reveal
              style={{
                color: 'oklch(70% 0.012 78)',
                lineHeight: 1.75,
                fontSize: '1.05rem',
                maxWidth: '55ch',
              }}
            >
              {t.team.body}
            </p>
          </div>

          {/* Team photo placeholder — replace with <Image> of shop/team */}
          <div
            data-reveal="right"
            style={{
              aspectRatio: '4 / 5',
              backgroundColor: 'oklch(25% 0.02 48)',
              border: '1px solid oklch(30% 0.02 48)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              borderRadius: '2px',
              maxWidth: '420px',
            }}
          >
            {/* Decorative barber scissors SVG */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(45% 0.02 50)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <p
              style={{
                color: 'oklch(40% 0.015 50)',
                fontSize: '0.75rem',
                textAlign: 'center',
                padding: '0 2rem',
                lineHeight: 1.5,
              }}
            >
              {/* placeholder note — visible only in dev */}
              Add team photo: /public/images/team/team-01.webp
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

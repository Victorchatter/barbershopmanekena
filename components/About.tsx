'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function About() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-parchment)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Text column */}
          <div>
            <p className="eyebrow" data-reveal style={{ marginBottom: '1rem' }}>
              {t.about.eyebrow}
            </p>
            <h2 className="heading-lg" data-reveal style={{ marginBottom: '1.5rem' }}>
              {t.about.heading}
            </h2>
            <div className="barber-rule-sm" data-reveal style={{ marginBottom: '1.5rem' }} />
            <p
              data-reveal
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                fontSize: '1.05rem',
                maxWidth: '65ch',
              }}
            >
              {t.about.body}
            </p>
          </div>

          {/* Values column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {t.about.values.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                className={`delay-${i + 1}`}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                }}
              >
                {/* Numbering accent */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '44px',
                    height: '44px',
                    borderRadius: '2px',
                    backgroundColor: i === 0 ? 'var(--red-primary)' : i === 1 ? 'var(--navy)' : 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'oklch(97% 0.005 78)',
                    marginTop: '2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      marginBottom: '0.35rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import Image from 'next/image'

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

          {/* Barber photo */}
          <div
            data-reveal="right"
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              borderRadius: '2px',
              overflow: 'hidden',
              maxWidth: '420px',
            }}
          >
            <Image
              src="/images/team/team-01.jpg"
              alt="Барберът — Barber shop Manekena"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

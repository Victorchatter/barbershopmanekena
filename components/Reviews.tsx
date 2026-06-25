'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function StarRating({ value }: { value: number }) {
  return (
    <span aria-label={`${value} stars`} style={{ color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
      {'★'.repeat(Math.round(value))}
    </span>
  )
}

export default function Reviews() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-warm)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="eyebrow" data-reveal style={{ marginBottom: '0.75rem' }}>
            {t.reviews.eyebrow}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <h2 className="heading-lg" data-reveal>
              {t.reviews.heading}
            </h2>

            {/* Rating badge */}
            <div
              data-reveal="right"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                marginBottom: '0.25rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                {t.reviews.rating_value}
              </span>
              <div>
                <StarRating value={4.8} />
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    margin: '0.2rem 0 0',
                    lineHeight: 1.3,
                  }}
                >
                  {t.reviews.rating_label}
                  <br />
                  {t.reviews.reviews_count}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {t.reviews.testimonials.map((r, i) => (
            <blockquote
              key={i}
              data-reveal
              className={`delay-${i + 1}`}
              style={{
                margin: 0,
                padding: '2rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {/* Opening quote mark */}
              <span
                aria-hidden
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: 'var(--red-primary)',
                  opacity: 0.5,
                  alignSelf: 'flex-start',
                  marginBottom: '-1rem',
                }}
              >
                "
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {r.text}
              </p>
              <footer
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <cite
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  — {r.author}
                </cite>
                <StarRating value={5} />
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Google link */}
        <div
          data-reveal
          style={{ marginTop: '2.5rem', textAlign: 'center' }}
        >
          <a
            href="https://search.google.com/local/reviews?hl=bg&placeid=ChIJrSGN-gtVpEAROlnZLPIuUJ8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              letterSpacing: '0.04em',
            }}
          >
            {t.reviews.reviews_count} ↗ Google
          </a>
        </div>
      </div>
    </section>
  )
}

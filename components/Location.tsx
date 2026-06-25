'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const LAT = 43.2112146
const LNG = 27.9012324
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`
const MAPS_LINK = `https://maps.google.com/maps?daddr=${LAT},${LNG}`

const AMENITY_ICONS: Record<string, string> = {
  wifi: '◈',
  toilet: '◉',
  appointment: '◆',
  kids: '◇',
}

export default function Location() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section
      id="location"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-parchment)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <p className="eyebrow" data-reveal style={{ marginBottom: '0.75rem' }}>
          {t.location.eyebrow}
        </p>
        <h2 className="heading-lg" data-reveal style={{ marginBottom: '3rem' }}>
          {t.location.heading}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Map */}
          <div
            data-reveal="left"
            style={{
              aspectRatio: '4/3',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barber shop Manekena on Google Maps"
            />
          </div>

          {/* Info */}
          <div data-reveal="right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Address */}
            <div>
              <p
                className="eyebrow"
                style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}
              >
                {t.location.address_label}
              </p>
              <p style={{ lineHeight: 1.65, margin: 0 }}>{t.location.address}</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--red-primary)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {t.location.directions} ↗
              </a>
            </div>

            {/* Phone */}
            <div>
              <p
                className="eyebrow"
                style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}
              >
                {t.location.phone_label}
              </p>
              <a
                href={`tel:${t.phone.replace(/\s/g, '')}`}
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {t.phone}
              </a>
            </div>

            {/* Hours */}
            <div>
              <p
                className="eyebrow"
                style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}
              >
                {t.location.hours_label}
              </p>
              <table
                style={{
                  borderCollapse: 'collapse',
                  width: '100%',
                  fontSize: '0.9rem',
                }}
              >
                <tbody>
                  {t.location.hours.map((row) => {
                    const isToday = new Date().getDay() === t.location.hours.indexOf(row) + 1 % 7
                    return (
                      <tr
                        key={row.day}
                        style={{
                          borderBottom: '1px solid var(--border)',
                          backgroundColor: isToday ? 'var(--bg-warm)' : 'transparent',
                        }}
                      >
                        <td
                          style={{
                            padding: '0.5rem 0.75rem 0.5rem 0',
                            fontWeight: isToday ? 700 : 400,
                            color: isToday ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          {row.day}
                        </td>
                        <td
                          style={{
                            padding: '0.5rem 0',
                            fontWeight: isToday ? 700 : 400,
                            color: isToday ? 'var(--red-primary)' : 'var(--text-muted)',
                            textAlign: 'right',
                          }}
                        >
                          {row.hours}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Amenities */}
            <div>
              <p
                className="eyebrow"
                style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}
              >
                {t.location.amenities_label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { key: 'wifi',        label: t.location.wifi },
                  { key: 'toilet',      label: t.location.toilet },
                  { key: 'appointment', label: t.location.appointment },
                  { key: 'kids',        label: t.location.kids },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span style={{ color: 'var(--red-primary)', fontSize: '0.75rem' }} aria-hidden>
                      {AMENITY_ICONS[key]}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

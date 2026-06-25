'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import BookingWizard from './BookingWizard'

export default function StickyMobileCTA() {
  const { t } = useLanguage()
  const [bookingOpen, setBookingOpen] = useState(false)
  const waLink = `https://wa.me/${t.whatsapp_number}`

  return (
    <>
      {/* Mobile-only sticky bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 45,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
        }}
        className="sticky-mobile-cta"
        role="navigation"
        aria-label="Quick actions"
      >
        {/* Call */}
        <a
          href={`tel:${t.phone.replace(/\s/g, '')}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            padding: '0.75rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRight: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '1.2rem' }} aria-hidden>📞</span>
          <span>
            {t.lang === 'bg' ? 'Обади се' : 'Call'}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            padding: '0.75rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRight: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '1.2rem' }} aria-hidden>💬</span>
          <span>WhatsApp</span>
        </a>

        {/* Book */}
        <button
          onClick={() => setBookingOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            padding: '0.75rem',
            background: 'var(--red-primary)',
            border: 'none',
            cursor: 'pointer',
            color: 'oklch(97% 0.005 78)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '1.2rem' }} aria-hidden>📅</span>
          <span>{t.lang === 'bg' ? 'Запиши' : 'Book'}</span>
        </button>
      </div>

      {/* Add bottom padding on mobile to avoid content behind bar */}
      <style>{`
        @media (max-width: 767px) {
          body { padding-bottom: 64px; }
        }
        @media (min-width: 768px) {
          .sticky-mobile-cta { display: none !important; }
        }
      `}</style>

      {bookingOpen && <BookingWizard onClose={() => setBookingOpen(false)} />}
    </>
  )
}

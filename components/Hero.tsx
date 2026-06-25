'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import BookingWizard from './BookingWizard'

export default function Hero() {
  const { t } = useLanguage()
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          /*
           * Replace this gradient with:
           *   background-image: url('/images/hero/hero-01.webp')
           * once the real shop photo is ready.
           */
          background: `
            radial-gradient(ellipse at 30% 60%, oklch(30% 0.04 50) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, oklch(24% 0.03 30) 0%, transparent 50%),
            oklch(18% 0.022 48)
          `,
        }}
      >
        {/* Background image (uncomment and add file to /public/images/hero/hero-01.webp) */}
        {/*
        <Image
          src="/images/hero/hero-01.webp"
          alt="Barber shop Manekena interior"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, oklch(10% 0.02 48 / 0.85) 0%, oklch(10% 0.02 48 / 0.4) 100%)'
        }} />
        */}

        {/* Decorative barber pole stripe — vertical, far right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '4vw',
            top: 0,
            bottom: 0,
            width: '5px',
            background: `repeating-linear-gradient(
              180deg,
              var(--red-primary) 0px 18px,
              oklch(97% 0.005 78) 18px 36px,
              var(--navy) 36px 54px,
              oklch(97% 0.005 78) 54px 72px
            )`,
            opacity: 0.35,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '8rem 1.5rem 6rem',
            width: '100%',
          }}
        >
          {/* Eyebrow */}
          <p
            className="eyebrow"
            style={{
              color: 'var(--gold)',
              marginBottom: '1.25rem',
              opacity: 0,
              animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s forwards',
            }}
          >
            {t.hero.eyebrow}
          </p>

          {/* Main heading */}
          <h1
            className="heading-xl"
            style={{
              color: 'oklch(97% 0.006 78)',
              marginBottom: '0.5rem',
              maxWidth: '700px',
              whiteSpace: 'pre-line',
              opacity: 0,
              animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards',
            }}
          >
            {t.hero.heading}
          </h1>

          {/* Barber pole accent rule */}
          <div
            className="barber-rule-sm"
            style={{
              marginBottom: '1.75rem',
              opacity: 0,
              animation: 'revealUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s forwards',
            }}
          />

          {/* Tagline */}
          <p
            style={{
              color: 'oklch(78% 0.012 78)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: '480px',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              opacity: 0,
              animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s forwards',
            }}
          >
            {t.hero.tagline}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              opacity: 0,
              animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s forwards',
            }}
          >
            <button
              className="btn-primary"
              onClick={() => setBookingOpen(true)}
            >
              {t.hero.cta_book}
            </button>
            <a
              href={`tel:${t.phone.replace(/\s/g, '')}`}
              className="btn-outline"
            >
              {t.hero.cta_call}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: 0,
            animation: 'revealUp 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s forwards',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, transparent, oklch(65% 0.01 78))',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.9; }
        }
      `}</style>

      {bookingOpen && <BookingWizard onClose={() => setBookingOpen(false)} />}
    </>
  )
}

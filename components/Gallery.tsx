'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import Image from 'next/image'
import { useState } from 'react'

/*
 * Gallery slots — replace src paths with real WebP files in /public/images/gallery/.
 * Label field is for the alt text and the placeholder label shown before photos arrive.
 * Aspect ratio is approximate based on typical barbershop photo orientations.
 */
const GALLERY_SLOTS = [
  { src: '/images/gallery/gallery-01.jpg', label: 'Barber Shop Manekena — лого на витрина',  aspect: '3/4'  },
  { src: '/images/gallery/gallery-02.jpg', label: 'Прясно подстригване — изглед от огледало', aspect: '3/4'  },
  { src: '/images/gallery/gallery-03.jpg', label: 'Фейд и брада — страничен профил',          aspect: '3/4'  },
  { src: '/images/gallery/gallery-04.jpg', label: 'Клиент след подстригване — вечер',         aspect: '3/4'  },
  { src: '/images/gallery/gallery-05.jpg', label: 'Ръцете на бербера в работа',               aspect: '1/1'  },
  { src: '/images/gallery/gallery-06.jpg', label: 'Фейд с дизайн — мълния',                   aspect: '4/5'  },
  { src: '/images/gallery/gallery-07.jpg', label: 'Фейд с дизайн — знак Manekena',            aspect: '4/5'  },
  { src: '/images/gallery/gallery-08.jpg', label: 'Прецизен фейд — пред знака',               aspect: '4/5'  },
  { src: '/images/gallery/gallery-09.jpg', label: 'Детско подстригване с дизайн',             aspect: '1/1'  },
]

type Slot = typeof GALLERY_SLOTS[number]

function GalleryItem({
  slot,
  index,
  onOpen,
}: {
  slot: Slot
  index: number
  onOpen: (i: number) => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <button
      onClick={() => onOpen(index)}
      data-reveal
      className={`delay-${Math.min(index + 1, 5)}`}
      style={{
        all: 'unset',
        cursor: 'pointer',
        aspectRatio: slot.aspect,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-warm)',
        display: 'block',
        width: '100%',
      }}
      aria-label={slot.label}
    >
      {error || !loaded ? (
        <div
          className="img-placeholder"
          style={{ position: 'absolute', inset: 0 }}
        >
          {error
            ? slot.label
            : <span style={{ opacity: 0.5 }}>Loading…</span>
          }
        </div>
      ) : null}
      <Image
        src={slot.src}
        alt={slot.label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          objectFit: 'cover',
          opacity: loaded && !error ? 1 : 0,
          transition: 'opacity 0.4s, transform 0.4s',
        }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {/* Hover overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'oklch(10% 0.01 50 / 0)',
          transition: 'background-color 0.25s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'oklch(10% 0.01 50 / 0.35)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'oklch(10% 0.01 50 / 0)'
        }}
      />
    </button>
  )
}

export default function Gallery() {
  const { t } = useLanguage()
  const ref = useScrollReveal()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = () => setLightboxIndex(null)

  return (
    <>
      <section
        id="gallery"
        ref={ref as React.RefObject<HTMLElement>}
        className="section-pad"
        style={{ backgroundColor: 'var(--bg-parchment)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <p className="eyebrow" data-reveal style={{ marginBottom: '0.75rem' }}>
            {t.gallery.eyebrow}
          </p>
          <h2 className="heading-lg" data-reveal style={{ marginBottom: '3rem' }}>
            {t.gallery.heading}
          </h2>

          {/* Masonry-style grid via CSS columns */}
          <div
            style={{
              columns: 'repeat(auto-fill, minmax(260px, 1fr))',
              columnGap: '1rem',
              gap: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            }}
          >
            {GALLERY_SLOTS.map((slot, i) => (
              <GalleryItem key={slot.src} slot={slot} index={i} onOpen={setLightboxIndex} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal
          aria-label={GALLERY_SLOTS[lightboxIndex].label}
        >
          <div
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_SLOTS[lightboxIndex].src}
              alt={GALLERY_SLOTS[lightboxIndex].label}
              width={1200}
              height={900}
              style={{
                objectFit: 'contain',
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '2px',
              }}
            />
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '-2.5rem',
                right: 0,
                background: 'none',
                border: 'none',
                color: 'oklch(90% 0.008 78)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0.25rem',
              }}
              aria-label="Close"
            >
              ✕
            </button>
            {/* Prev / Next */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                style={{
                  position: 'absolute',
                  left: '-3.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'oklch(90% 0.008 78)',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            {lightboxIndex < GALLERY_SLOTS.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                style={{
                  position: 'absolute',
                  right: '-3.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'oklch(90% 0.008 78)',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
                aria-label="Next"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

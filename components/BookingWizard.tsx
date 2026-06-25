'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

/* ── Types ── */
type ContactDetails = {
  name: string
  phone: string
  email: string
  notes: string
}

type BookingState = {
  services: string[]
  date: string      // ISO yyyy-mm-dd
  time: string      // HH:MM
  contact: ContactDetails
}

/* ── Helpers ── */
function pad(n: number) {
  return String(n).padStart(2, '0')
}

function generateSlots(): string[] {
  const slots: string[] = []
  for (let h = 10; h < 18; h++) {
    slots.push(`${pad(h)}:00`)
    slots.push(`${pad(h)}:30`)
  }
  return slots
}

function generateDates(): string[] {
  const dates: string[] = []
  const today = new Date()
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 0) {  // exclude Sunday (0)
      dates.push(d.toISOString().slice(0, 10))
    }
  }
  return dates
}

function formatDateDisplay(iso: string, lang: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function makeICS(booking: BookingState): string {
  const [y, m, day] = booking.date.split('-')
  const [h, min] = booking.time.split(':')
  const endH = Number(h) + 1
  const dtstart = `${y}${m}${day}T${h}${min}00`
  const dtend   = `${y}${m}${day}T${pad(endH)}${min}00`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:Barber shop Manekena — ${booking.services.join(', ')}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    'LOCATION:ул. Капитан Райчо Николов 25\\, Варна',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadICS(booking: BookingState) {
  const blob = new Blob([makeICS(booking)], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'manekena-appointment.ics'
  a.click()
  URL.revokeObjectURL(url)
}

const ALL_DATES = generateDates()
const ALL_SLOTS = generateSlots()

const STEP_COUNT = 4

/* ── Component ── */
export default function BookingWizard({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLanguage()
  const b = t.booking
  const panelRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingState>({
    services: [],
    date: '',
    time: '',
    contact: { name: '', phone: '', email: '', notes: '' },
  })
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  // Trap focus in panel; close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  /* ── Validation ── */
  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {}
    if (s === 1 && booking.services.length === 0) {
      errs.services = b.validation.select_service
    }
    if (s === 2) {
      if (!booking.date) errs.date = b.validation.select_date
      if (!booking.time) errs.time = b.validation.select_time
    }
    if (s === 3) {
      if (!booking.contact.name.trim()) errs.name = b.validation.name_required
      if (!booking.contact.phone.trim()) {
        errs.phone = b.validation.phone_required
      } else if (!/^(\+3598[0-9]\d{7}|08[0-9]\d{7})$/.test(booking.contact.phone.replace(/\s/g, ''))) {
        errs.phone = b.validation.phone_invalid
      }
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEP_COUNT))
  }

  function back() {
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  function toggleService(id: string) {
    setBooking((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }))
    setErrors((e) => ({ ...e, services: undefined }))
  }

  async function submit() {
    if (!validateStep(3)) return
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      if (!res.ok) throw new Error(await res.text())
      setSuccess(true)
    } catch {
      setServerError(b.error_generic)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Shared input style ── */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid var(--border)',
    borderRadius: '2px',
    fontFamily: 'var(--font-lato)',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-parchment)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  /* ── Render ── */
  return (
    <div
      className="booking-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal
      aria-labelledby="booking-title"
    >
      <div className="booking-panel" ref={panelRef}>
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-dark)',
            zIndex: 1,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid oklch(28% 0.02 48)',
          }}
        >
          <h2
            id="booking-title"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'oklch(95% 0.006 78)',
              margin: 0,
            }}
          >
            {b.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'oklch(65% 0.01 78)',
              fontSize: '1.4rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0.25rem',
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        {!success && (
          <div
            style={{
              padding: '1rem 1.5rem 0',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            {b.step_labels.map((label, i) => {
              const n = i + 1
              const active = n === step
              const done = n < step
              return (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    flex: n < 4 ? '1' : undefined,
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      backgroundColor: done ? 'var(--navy)' : active ? 'var(--red-primary)' : 'var(--border)',
                      color: done || active ? 'white' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {done ? '✓' : n}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: active ? 700 : 400,
                      color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </span>
                  {n < 4 && (
                    <div
                      style={{
                        flex: 1,
                        height: '1px',
                        backgroundColor: done ? 'var(--navy)' : 'var(--border)',
                        transition: 'background-color 0.3s',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {success ? (
            /* Success screen */
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.8rem',
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                {b.success_title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2rem' }}>
                {b.success_body}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={`https://wa.me/${t.whatsapp_number}?text=${encodeURIComponent(
                    `Потвърждавам час за: ${booking.services.join(', ')} на ${booking.date} в ${booking.time}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  {b.success_whatsapp}
                </a>
                <button
                  onClick={() => downloadICS(booking)}
                  className="btn-outline"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', justifyContent: 'center' }}
                >
                  {b.success_ics}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                  }}
                >
                  {b.success_close}
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1: Service selection */
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  marginBottom: '1.25rem',
                }}
              >
                {b.step1_heading}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {t.services.items.map((svc) => {
                  const selected = booking.services.includes(svc.id)
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') toggleService(svc.id) }}
                      style={{
                        padding: '1rem',
                        border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border)'}`,
                        borderRadius: '2px',
                        cursor: 'pointer',
                        backgroundColor: selected ? 'oklch(97% 0.008 25)' : 'var(--surface)',
                        transition: 'border-color 0.15s, background-color 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border)'}`,
                          borderRadius: '3px',
                          backgroundColor: selected ? 'var(--red-primary)' : 'transparent',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.7rem',
                          transition: 'all 0.15s',
                        }}
                      >
                        {selected && '✓'}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{svc.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                          {svc.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              {errors.services && (
                <p style={{ color: 'var(--red-primary)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                  {errors.services}
                </p>
              )}
            </div>
          ) : step === 2 ? (
            /* Step 2: Date & time */
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  marginBottom: '1.25rem',
                }}
              >
                {b.step2_heading}
              </h3>

              {/* Date picker */}
              <p
                className="eyebrow"
                style={{ color: 'var(--text-muted)', marginBottom: '0.6rem', fontSize: '0.7rem' }}
              >
                {b.summary_date}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '0.4rem',
                  marginBottom: '1.5rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  paddingRight: '0.25rem',
                }}
              >
                {ALL_DATES.map((iso) => {
                  const selected = booking.date === iso
                  return (
                    <button
                      key={iso}
                      onClick={() => {
                        setBooking((prev) => ({ ...prev, date: iso, time: '' }))
                        setErrors((e) => ({ ...e, date: undefined }))
                      }}
                      style={{
                        padding: '0.5rem 0.25rem',
                        border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border)'}`,
                        borderRadius: '2px',
                        backgroundColor: selected ? 'var(--red-primary)' : 'var(--surface)',
                        color: selected ? 'white' : 'var(--text-primary)',
                        fontSize: '0.72rem',
                        fontWeight: selected ? 700 : 400,
                        cursor: 'pointer',
                        textAlign: 'center',
                        lineHeight: 1.4,
                        transition: 'all 0.15s',
                      }}
                    >
                      {formatDateDisplay(iso, lang)}
                    </button>
                  )
                })}
              </div>
              {errors.date && (
                <p style={{ color: 'var(--red-primary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {errors.date}
                </p>
              )}

              {/* Time slots */}
              {booking.date && (
                <>
                  <p
                    className="eyebrow"
                    style={{ color: 'var(--text-muted)', marginBottom: '0.6rem', fontSize: '0.7rem' }}
                  >
                    {b.summary_time}
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
                      gap: '0.4rem',
                    }}
                  >
                    {ALL_SLOTS.map((slot) => {
                      const selected = booking.time === slot
                      return (
                        <button
                          key={slot}
                          onClick={() => {
                            setBooking((prev) => ({ ...prev, time: slot }))
                            setErrors((e) => ({ ...e, time: undefined }))
                          }}
                          style={{
                            padding: '0.5rem',
                            border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border)'}`,
                            borderRadius: '2px',
                            backgroundColor: selected ? 'var(--red-primary)' : 'var(--surface)',
                            color: selected ? 'white' : 'var(--text-primary)',
                            fontSize: '0.85rem',
                            fontWeight: selected ? 700 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                  {errors.time && (
                    <p style={{ color: 'var(--red-primary)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                      {errors.time}
                    </p>
                  )}
                </>
              )}
            </div>
          ) : step === 3 ? (
            /* Step 3: Contact details */
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  marginBottom: '1.25rem',
                }}
              >
                {b.step3_heading}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Name */}
                <div>
                  <label
                    style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}
                  >
                    {b.name_label} *
                  </label>
                  <input
                    type="text"
                    placeholder={b.name_placeholder}
                    value={booking.contact.name}
                    onChange={(e) => {
                      setBooking((prev) => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))
                      setErrors((err) => ({ ...err, name: undefined }))
                    }}
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? 'var(--red-primary)' : 'var(--border)',
                    }}
                    autoComplete="name"
                    aria-required
                  />
                  {errors.name && (
                    <p style={{ color: 'var(--red-primary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    {b.phone_label} *
                  </label>
                  <input
                    type="tel"
                    placeholder={b.phone_placeholder}
                    value={booking.contact.phone}
                    onChange={(e) => {
                      setBooking((prev) => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))
                      setErrors((err) => ({ ...err, phone: undefined }))
                    }}
                    style={{
                      ...inputStyle,
                      borderColor: errors.phone ? 'var(--red-primary)' : 'var(--border)',
                    }}
                    autoComplete="tel"
                    aria-required
                  />
                  {errors.phone && (
                    <p style={{ color: 'var(--red-primary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    {b.email_label}
                  </label>
                  <input
                    type="email"
                    placeholder={b.email_placeholder}
                    value={booking.contact.email}
                    onChange={(e) => setBooking((prev) => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                    style={inputStyle}
                    autoComplete="email"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    {b.notes_label}
                  </label>
                  <textarea
                    placeholder={b.notes_placeholder}
                    value={booking.contact.notes}
                    onChange={(e) => setBooking((prev) => ({ ...prev, contact: { ...prev.contact, notes: e.target.value } }))}
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '80px',
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Step 4: Review */
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}
              >
                {b.step4_heading}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                {b.step4_subheading}
              </p>

              {/* Summary rows */}
              {[
                { label: b.summary_services, value: booking.services.map((id) => t.services.items.find((s) => s.id === id)?.name || id).join(', ') },
                { label: b.summary_date,     value: booking.date ? formatDateDisplay(booking.date, lang) : '' },
                { label: b.summary_time,     value: booking.time },
                { label: b.summary_contact,  value: `${booking.contact.name} / ${booking.contact.phone}${booking.contact.email ? ` / ${booking.contact.email}` : ''}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr',
                    gap: '0.5rem',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>
                    {label}
                  </span>
                  <span style={{ color: 'var(--text-primary)', lineHeight: 1.55 }}>{value}</span>
                </div>
              ))}

              {booking.contact.notes && (
                <div
                  style={{
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.9rem',
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>
                    {b.notes_label}
                  </span>
                  <span style={{ color: 'var(--text-primary)' }}>{booking.contact.notes}</span>
                </div>
              )}

              {serverError && (
                <p style={{ color: 'var(--red-primary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                  {serverError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer nav */}
        {!success && (
          <div
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'space-between',
            }}
          >
            {step > 1 ? (
              <button
                onClick={back}
                className="btn-outline"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                ← {b.back}
              </button>
            ) : (
              <div />
            )}

            {step < STEP_COUNT ? (
              <button onClick={next} className="btn-primary">
                {b.next} →
              </button>
            ) : (
              <button
                onClick={submit}
                className="btn-primary"
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? b.submitting : b.confirm}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

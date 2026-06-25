import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type BookingPayload = {
  services: string[]
  date: string
  time: string
  contact: {
    name: string
    phone: string
    email: string
    notes: string
  }
}

function validatePayload(body: unknown): body is BookingPayload {
  if (typeof body !== 'object' || body === null) return false
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.services) || b.services.length === 0) return false
  if (typeof b.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return false
  if (typeof b.time !== 'string' || !/^\d{2}:\d{2}$/.test(b.time)) return false
  if (typeof b.contact !== 'object' || b.contact === null) return false
  const c = b.contact as Record<string, unknown>
  if (!c.name || typeof c.name !== 'string') return false
  if (!c.phone || typeof c.phone !== 'string') return false
  const phoneCleaned = (c.phone as string).replace(/\s/g, '')
  if (!/^(\+3598[0-9]\d{7}|08[0-9]\d{7})$/.test(phoneCleaned)) return false
  return true
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!validatePayload(body)) {
    return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 })
  }

  const { services, date, time, contact } = body

  const toEmail = process.env.BOOKING_EMAIL_TO ?? 'pampaetza.asenow1@gmail.com'

  const html = `
    <h2>Нова заявка за час — Barber shop Manekena</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Услуги</strong></td><td>${services.join(', ')}</td></tr>
      <tr><td><strong>Дата</strong></td><td>${date}</td></tr>
      <tr><td><strong>Час</strong></td><td>${time}</td></tr>
      <tr><td><strong>Клиент</strong></td><td>${contact.name}</td></tr>
      <tr><td><strong>Телефон</strong></td><td>${contact.phone}</td></tr>
      ${contact.email ? `<tr><td><strong>Имейл</strong></td><td>${contact.email}</td></tr>` : ''}
      ${contact.notes ? `<tr><td><strong>Бележки</strong></td><td>${contact.notes}</td></tr>` : ''}
    </table>
    <p style="margin-top:1rem">
      <a href="https://wa.me/359893866364?text=${encodeURIComponent(
        `Потвърждавам час: ${contact.name} за ${services.join(', ')} на ${date} в ${time}`
      )}">Отговори по WhatsApp</a>
    </p>
  `

  // Only attempt SMTP if env vars are configured
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"Barber shop Manekena" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: `Нова заявка: ${contact.name} — ${date} ${time}`,
        html,
      })
    } catch (err) {
      console.error('Email send failed:', err)
      // Don't fail the request — booking is still logged below
    }
  }

  // Log to console (stdout captured by Vercel logs / any hosting)
  console.log('[booking]', JSON.stringify({ services, date, time, contact: { name: contact.name, phone: contact.phone } }))

  return NextResponse.json({ ok: true })
}

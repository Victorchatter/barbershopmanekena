# Barber shop Manekena — Website

Next.js 14 website for Barber shop Manekena, Varna, Bulgaria.  
Built by Orvexis IV.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Copy `.env.example` → `.env.local` and fill in values before deploying.

---

## What needs Victor's input before launch

### 1. Photos — REQUIRED

Drop real WebP photos into the corresponding directories.  
The site works and deploys without them (placeholder backgrounds show instead), but the gallery tiles will show empty until photos are added.

| Directory | What goes here |
|---|---|
| `public/images/hero/hero-01.webp` | Main hero photo — interior or action shot, wide, high quality |
| `public/images/gallery/gallery-01.webp` … `gallery-09.webp` | Shop photos, haircut results, atmosphere shots |
| `public/images/team/team-01.webp` | Team photo (optional — section works without it) |
| `public/images/logo/logo.svg` | Official logo (optional) |

**To activate the hero photo:** uncomment the `<Image>` block inside `components/Hero.tsx` (lines marked with `// Replace with <Image>`).

### 2. Opening hours — CONFIRM

Current schedule is a **placeholder** (Mon–Sat 10:00–18:00, Sunday "Confirm with us").  
Victor: provide the real Mon–Sun schedule, then update both locale files:

- `locales/bg.json` → `location.hours` array
- `locales/en.json` → `location.hours` array

Also update the JSON-LD in `app/layout.tsx` (`openingHoursSpecification`) once Sunday status is known.

### 3. Business name spelling — FLAG TO CLIENT

There is a discrepancy between two sources:

| Source | Spelling |
|---|---|
| Google Maps | **Manekena** |
| oink.bg | **Manekena** |
| Instagram handle | **barber_shop_manekena** |
| Facebook page title | **Manekana** |

This site uses **Manekena** (3 sources vs 1). Confirm with the client which is the official/intended spelling and update if needed — the name appears in `app/layout.tsx` (metadata, JSON-LD), both locale files, and the Navbar/Footer components.

### 4. Map coordinates — verified

Coordinates `43.2112146, 27.9012324` were pulled from oink.bg's Google Maps link.  
They should be confirmed by opening the Maps embed in the deployed site.

### 5. SMTP / email notifications

Booking requests are logged to server console by default.  
To enable email notifications, set `SMTP_*` vars in `.env.local` (see `.env.example`).

### 6. GA4

Set `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX` in Vercel environment variables with the real Measurement ID.

---

## Delivery checklist

- [x] oink.bg, Facebook, Instagram researched
- [x] Name: Manekena (majority of sources) — discrepancy flagged above
- [x] Business type: barbershop-primary, welcoming to all (categories include both on oink.bg)
- [x] Coordinates 43.2112146, 27.9012324 — from oink.bg Maps link
- [x] All 9 sections built and responsive
- [x] Scroll-reveal animations (IntersectionObserver)
- [x] Booking wizard (4 steps + success) — no native form tags
- [x] BG/EN toggle — zero reload, localStorage persistence
- [x] Sticky mobile CTA bar (Call / WhatsApp / Book)
- [x] LocalBusiness JSON-LD (BarberShop)
- [x] GA4 placeholder
- [x] Hero photo (hero-01.jpg — shop interior with MANEKENA sign)
- [x] Gallery photos (9 slots filled from Facebook — real shop photos)
- [ ] Full weekly hours confirmed by client
- [ ] Official name spelling confirmed by client
- [ ] SMTP configured for email notifications
- [ ] Lighthouse audit (target 90+ perf/SEO/a11y)

---

## Tech stack

- Next.js 14 App Router, TypeScript, Tailwind CSS 3
- Fonts: Playfair Display + Lato (Google Fonts, next/font)
- Color system: OKLCH custom properties
- i18n: custom React context, localStorage persistence
- Booking API: `/app/api/booking/route.ts` — Nodemailer for email
- Images: `next/image`, WebP, lazy-loaded below fold
- No native `<form>` tags anywhere
- Deploy target: Vercel

---

## Social links

| Platform | URL |
|---|---|
| Facebook | https://www.facebook.com/p/Barber-Shop-Manekana-100066404182537/ |
| Instagram | https://www.instagram.com/barber_shop_manekena |
| oink.bg | https://www.oink.bg/biz/barber_shop7 |
| Google Maps | https://maps.google.com/maps?q=43.2112146,27.9012324 |

---

*Website by Orvexis IV*

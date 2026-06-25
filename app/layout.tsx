import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Barber shop Manekena — Варна | Varna',
  description:
    'Barber shop Manekena — вашият квартален бербер в кв. Христо Ботев, Варна. 4.8★ от 22 отзива. Мъжко подстригване, оформяне на брада, фейд. / Your neighborhood barbershop in Hristo Botev, Varna. 4.8★ rating.',
  keywords: [
    'barber shop',
    'barbershop',
    'barbershop Varna',
    'барберница Варна',
    'Manekena',
    'Манекена',
    'подстригване Варна',
    'брада Варна',
    'фейд Варна',
    'Христо Ботев Варна',
  ],
  openGraph: {
    title: 'Barber shop Manekena — Варна',
    description: '4.8★ квартална барберница в кв. Христо Ботев, Варна',
    locale: 'bg_BG',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  name: 'Barber shop Manekena',
  url: 'https://barbershopmanekena.com',
  telephone: '+359893866364',
  email: 'pampaetza.asenow1@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. „Капитан Райчо Николов" 25',
    addressLocality: 'Варна',
    postalCode: '9000',
    addressCountry: 'BG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.2112146,
    longitude: 27.9012324,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '22',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.facebook.com/p/Barber-Shop-Manekana-100066404182537/',
    'https://www.instagram.com/barber_shop_manekena',
    'https://www.oink.bg/biz/barber_shop7',
  ],
  priceRange: '$$',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Restroom', value: true },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* GA4 placeholder — replace G-XXXXXXXXXX with real Measurement ID */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

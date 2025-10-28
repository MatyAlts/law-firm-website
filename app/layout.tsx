import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { ConditionalLayout } from "@/components/conditional-layout"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.belmontesalafia.com'),
  title: {
    default: "Belmonte, Lucero Salafia | Estudio Jurídico en Mendoza",
    template: "%s | Belmonte, Lucero Salafia"
  },
  description:
    "Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina. Compromiso, ética y resultados.",
  keywords: [
    "abogados Mendoza",
    "estudio jurídico Mendoza",
    "derecho de familia Mendoza",
    "derecho civil Mendoza",
    "derecho laboral Mendoza",
    "abogados Argentina",
    "asesoría legal Mendoza",
    "divorcio Mendoza",
    "sucesiones Mendoza",
    "contratos Mendoza"
  ],
  authors: [{ name: "Belmonte, Lucero Salafia" }],
  creator: "Belmonte, Lucero Salafia",
  publisher: "Belmonte, Lucero Salafia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.belmontesalafia.com',
    siteName: 'Belmonte, Lucero Salafia',
    title: 'Belmonte, Lucero Salafia | Estudio Jurídico en Mendoza',
    description: 'Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina.',
    images: [
      {
        url: '/images/colegio-abogados-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Belmonte, Lucero Salafia - Estudio Jurídico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belmonte, Lucero Salafia | Estudio Jurídico en Mendoza',
    description: 'Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina.',
    images: ['/images/colegio-abogados-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/images/colegio-abogados-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/images/colegio-abogados-logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Reemplazar con el código de Google Search Console
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Belmonte, Lucero Salafia",
    "image": "https://www.belmontesalafia.com/images/colegio-abogados-logo.svg",
    "@id": "https://www.belmontesalafia.com",
    "url": "https://www.belmontesalafia.com",
    "telephone": ["+54 261 207 1333", "+54 261 271 2200"],
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Colon 165 4° Piso Oficina A",
      "addressLocality": "Mendoza",
      "addressRegion": "Mendoza",
      "postalCode": "5500",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -32.8895,
      "longitude": -68.8458
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [],
    "areaServed": {
      "@type": "City",
      "name": "Mendoza"
    },
    "description": "Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina. Compromiso, ética y resultados.",
    "email": "natal00203@gmail.com",
    "slogan": "Compromiso, ética y resultados",
    "knowsAbout": [
      "Derecho de Familia",
      "Divorcios",
      "Sucesiones",
      "Accidentes de Tránsito",
      "Daños y Perjuicios",
      "Derecho Laboral",
      "Derecho Civil",
      "Defensa del Consumidor"
    ]
  }

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={<div>Cargando...</div>}>
          <ConditionalLayout>
            <PageTransition>{children}</PageTransition>
          </ConditionalLayout>
        </Suspense>
      </body>
    </html>
  )
}

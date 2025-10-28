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
  title: "Belmonte, Lucero Salafia | Estudio Jurídico en Mendoza",
  description:
    "Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina. Compromiso, ética y resultados.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctenos para una consulta legal en Mendoza. Dirección: Colon 165 4° Piso Oficina A, Ciudad, Mendoza. Teléfonos: +54 261 207 1333 / +54 261 271 2200",
  keywords: ["contacto abogados Mendoza", "consulta legal Mendoza", "estudio jurídico contacto"],
  openGraph: {
    title: "Contacto | Belmonte, Lucero Salafia",
    description: "Solicite una consulta legal en nuestro estudio en Mendoza. Colon 165 4° Piso Oficina A.",
    url: "https://www.belmontesalafia.com/contacto",
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

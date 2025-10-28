import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Belmonte, Lucero Salafia - Estudio Jurídico',
    short_name: 'BLS Estudio Jurídico',
    description: 'Estudio jurídico especializado en derecho de familia, civil y laboral en Mendoza, Argentina.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/images/colegio-abogados-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

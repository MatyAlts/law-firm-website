import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Belmonte, Lucero Salafia - Estudio Jurídico'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: '20px',
            fontFamily: 'serif',
          }}
        >
          Belmonte, Lucero Salafia
        </div>
        <div
          style={{
            fontSize: 40,
            opacity: 0.9,
            fontStyle: 'italic',
            fontFamily: 'serif',
          }}
        >
          Estudio Jurídico en Mendoza
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: '40px',
            opacity: 0.8,
          }}
        >
          Compromiso • Ética • Resultados
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

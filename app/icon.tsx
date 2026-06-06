import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#3B82F6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 900,
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        C
      </div>
    ),
    { ...size }
  )
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Sherry's Food Tour — Taste the Heart of Taipei"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Orange accent bar at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: '#E85D2E',
          display: 'flex',
        }} />

        {/* Brand name */}
        <div style={{
          fontSize: 28,
          color: '#E85D2E',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 24,
          display: 'flex',
        }}>
          Taiwan Foodie
        </div>

        {/* Main headline */}
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: 900,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          Taste the Heart of Taipei
        </div>

        {/* Subline */}
        <div style={{
          fontSize: 28,
          color: '#999999',
          marginTop: 28,
          textAlign: 'center',
          display: 'flex',
        }}>
          Authentic food tours led by a born-and-raised Taipei local
        </div>

        {/* CTA pill */}
        <div style={{
          marginTop: 48,
          background: '#E85D2E',
          color: '#ffffff',
          fontSize: 24,
          fontWeight: 600,
          padding: '14px 40px',
          borderRadius: 999,
          display: 'flex',
        }}>
          sherrychang318.com
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: '#E85D2E',
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  )
}

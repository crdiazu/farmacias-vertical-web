import { ImageResponse } from 'next/og';

export const alt = 'Farmacias Vertical — Tienda Online Chile';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function HomeOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 64px',
        background: 'linear-gradient(135deg, #0B6E57 0%, #0F4C81 65%, #0D1F2D 100%)',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.16)',
            border: '2px solid rgba(255,255,255,0.3)',
            fontSize: '32px',
            fontWeight: 900,
            color: '#A7F3D0',
          }}
        >
          +
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '26px', fontWeight: 800 }}>Farmacias Vertical</span>
          <span style={{ fontSize: '15px', color: '#CBD5E1', letterSpacing: '0.08em' }}>
            SALUD · DERMOCUIDADO · ATENCIÓN EN MESÓN
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            fontSize: '58px',
            fontWeight: 800,
            lineHeight: 1.08,
          }}
        >
          Tu farmacia cercana, ahora en línea.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '26px',
            color: '#E2E8F0',
            maxWidth: '920px',
          }}
        >
          Dermocosmética, cuidado capilar, higiene, vitaminas y orientación farmacéutica en Chile.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.14)',
            borderRadius: '999px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 700,
          }}
        >
          Retiro gratis en mesón
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.14)',
            borderRadius: '999px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 700,
          }}
        >
          Despacho RM y Regiones
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#10B981',
            color: '#0D1F2D',
            borderRadius: '999px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 800,
          }}
        >
          Maqueta Demo en Vivo
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

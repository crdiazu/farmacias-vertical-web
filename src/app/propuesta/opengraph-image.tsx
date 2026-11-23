import { ImageResponse } from 'next/og';

export const alt = 'Propuesta E-Commerce & Habilitación ISP — Farmacias Vertical';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function PropuestaOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px',
        background: 'linear-gradient(135deg, #0D1F2D 0%, #0F4C81 58%, #0B6E57 100%)',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255,255,255,0.14)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '999px',
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#A7F3D0',
          }}
        >
          PROPUESTA EJECUTIVA · MARKETINGCLOUD CHILE
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '18px',
            fontWeight: 600,
            color: '#CBD5E1',
          }}
        >
          farmaciasvertical.cl
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            display: 'flex',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          Farmacias Vertical
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '34px',
            fontWeight: 600,
            color: '#E2E8F0',
            lineHeight: 1.2,
          }}
        >
          E-Commerce por Etapas &amp; Habilitación ISP
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#A7F3D0',
            marginTop: '6px',
          }}
        >
          Preparada para Giordan Miranda · Maqueta en vivo + Plan de Trabajo
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '16px',
            padding: '20px 24px',
          }}
        >
          <span style={{ fontSize: '15px', color: '#94A3B8', fontWeight: 700 }}>
            ETAPA 1 · SEMANA 1–2
          </span>
          <span style={{ fontSize: '22px', fontWeight: 700, marginTop: '6px' }}>
            Correos + 50 Productos + WhatsApp
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '16px',
            padding: '20px 24px',
          }}
        >
          <span style={{ fontSize: '15px', color: '#94A3B8', fontWeight: 700 }}>
            ETAPA 2 · MES 2 A FEBRERO
          </span>
          <span style={{ fontSize: '22px', fontWeight: 700, marginTop: '6px' }}>
            Webpay Plus + GOLAN + Recetas ISP
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '270px',
            backgroundColor: '#10B981',
            color: '#0D1F2D',
            borderRadius: '16px',
            padding: '20px 24px',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 800 }}>INVERSIÓN ESCALONADA</span>
          <span style={{ fontSize: '26px', fontWeight: 900, marginTop: '6px' }}>
            4 → 3 → 2 → 1 UF
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

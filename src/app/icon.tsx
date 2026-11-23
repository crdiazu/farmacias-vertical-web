import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F4C81',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: 900,
      }}
    >
      <div
        style={{
          width: '5px',
          height: '20px',
          backgroundColor: '#10B981',
          borderRadius: '3px',
          marginRight: '4px',
        }}
      />
      +
    </div>,
    {
      ...size,
    },
  );
}

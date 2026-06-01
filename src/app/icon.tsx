import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#0a0e0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          color: '#2dd48d',
          letterSpacing: '-0.5px',
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}

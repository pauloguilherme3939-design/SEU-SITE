import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { site } from '@/data/site';

export const runtime = 'edge';

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Sites profissionais para pequenos negócios';
  const sub = searchParams.get('sub') ?? 'Domínio incluso · WhatsApp · Google · Pronto em 3 dias';
  const siteName = site.name;

  const pills = ['✓ Pronto em 3 dias', '✓ Domínio incluso', '✓ Sem mensalidade'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0e0d',
          padding: '64px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '480px',
            height: '480px',
            background:
              'radial-gradient(circle, rgba(45,212,141,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '320px',
            height: '320px',
            background:
              'radial-gradient(circle, rgba(45,212,141,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '44px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                background: '#2dd48d',
                borderRadius: '10px',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0a0e0d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <span
              style={{
                color: '#f3f6f4',
                fontSize: '26px',
                fontWeight: '700',
                letterSpacing: '-0.5px',
              }}
            >
              {siteName}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: '#f3f6f4',
              fontSize: title.length > 42 ? '52px' : '62px',
              fontWeight: '800',
              lineHeight: '1.1',
              letterSpacing: '-2.5px',
              marginBottom: '20px',
              flex: 1,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: '#9aa6a1',
              fontSize: '22px',
              fontWeight: '400',
              letterSpacing: '-0.3px',
              marginBottom: '44px',
            }}
          >
            {sub}
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {pills.map((p) => (
              <div
                key={p}
                style={{
                  display: 'flex',
                  background: 'rgba(45,212,141,0.09)',
                  border: '1.5px solid rgba(45,212,141,0.22)',
                  borderRadius: '100px',
                  padding: '9px 20px',
                  color: '#2dd48d',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '-0.2px',
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background:
              'linear-gradient(90deg, transparent 0%, #2dd48d 30%, #2dd48d 70%, transparent 100%)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

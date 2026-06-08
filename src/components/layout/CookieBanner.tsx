'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'sitenoar-cookie-consent-v1';

type ConsentState = 'accepted' | 'rejected' | null;

function readConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(value: 'accepted' | 'rejected') {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    // Dispara evento para outros componentes (MetaPixel/GA4) reagirem
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: value }));
  } catch {
    /* noop */
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Atrasa para não competir com o LCP do Hero
    const t = setTimeout(() => {
      if (readConsent() === null) setVisible(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  function handle(value: 'accepted' | 'rejected') {
    writeConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de cookies"
      className="animate-fade-up fixed bottom-3 left-3 right-3 z-[60] mx-auto max-w-2xl rounded-[var(--radius)] border border-line-hi bg-card/95 px-5 py-4 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:px-6 sm:py-5"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(45,212,141,0.55) 40%, rgba(45,212,141,0.55) 60%, transparent)',
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex-1">
          <p className="mb-1 text-sm font-semibold text-ink">Sua privacidade importa</p>
          <p className="text-xs leading-relaxed text-muted">
            Usamos cookies de análise (Meta e Google) para entender o desempenho do
            site e melhorar a experiência. Você pode aceitar, recusar ou ler nossa{' '}
            <Link
              href="/politica-de-privacidade"
              className="rounded-sm text-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col sm:gap-1.5">
          <button
            type="button"
            onClick={() => handle('accepted')}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg shadow-[0_8px_20px_-8px_rgba(45,212,141,0.55)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:flex-none"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => handle('rejected')}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-line bg-card-hi px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:flex-none"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}

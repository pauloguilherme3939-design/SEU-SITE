'use client';

import { useState } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Container, Section } from '@/components/ui';

/* ── Tier display config ─────────────────────────────────── */
const SEAL: Record<string, string> = {
  prata: '🥈', ouro: '🥇', platina: '💠', diamante: '💎',
};
const CTA_BG: Record<string, string> = {
  prata: 'var(--accent)', ouro: 'var(--accent)',
  platina: '#0ea5e9',     diamante: '#7c3aed',
};
const CTA_FG: Record<string, string> = {
  prata: 'var(--bg)', ouro: 'var(--bg)',
  platina: '#fff',    diamante: '#fff',
};
const CTA_GLOW: Record<string, string> = {
  prata:    'rgba(45,212,141,0.40)',
  ouro:     'rgba(45,212,141,0.40)',
  platina:  'rgba(14,165,233,0.50)',
  diamante: 'rgba(124,58,237,0.55)',
};

/* ── Questions ───────────────────────────────────────────── */
const Q1 = {
  text: 'O que você mais precisa agora?',
  options: [
    { id: 'prata',    label: 'Só marcar presença, sem gastar muito' },
    { id: 'ouro',     label: 'Uma página caprichada e profissional' },
    { id: 'platina',  label: 'Ser achado no Google e vender mais' },
    { id: 'diamante', label: 'Autoridade com site completo' },
  ],
};

const Q2 = {
  text: 'Quantas páginas você imagina?',
  options: [
    { id: 'uma',    label: 'Uma página bem feita já resolve' },
    { id: 'varias', label: 'Várias páginas — Sobre, Serviços, Contato...' },
  ],
};

/* ── Tier → plan mapping ─────────────────────────────────── */
const TIER_TO_PLAN: Record<string, string> = {
  prata: 'inicial', ouro: 'presenca', platina: 'express', diamante: 'empresarial',
};

function getRecommendedTier(q1: string, q2: string): string {
  if (q1 === 'diamante' || q2 === 'varias') return 'diamante';
  if (q1 === 'platina') return 'platina';
  if (q1 === 'ouro')    return 'ouro';
  return 'prata';
}

/* ── Option button ───────────────────────────────────────── */
function OptionBtn({
  label, selected, onClick,
}: {
  label: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'w-full rounded-[var(--radius-sm)] border px-5 py-4 text-left text-sm',
        'transition-all focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        selected
          ? 'border-accent/50 bg-accent/10 text-ink'
          : 'border-line bg-card-hi text-muted hover:border-line-hi hover:text-ink',
      ].join(' ')}
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-accent bg-accent' : 'border-muted-2',
          ].join(' ')}
        >
          {selected && (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function PlanFinder() {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);

  // Diamante já implica multi-página → pula P2
  const needsQ2 = q1 !== null && q1 !== 'diamante';
  const done     = q1 !== null && (!needsQ2 || q2 !== null);

  const tier           = done ? getRecommendedTier(q1 as string, q2 ?? '') : null;
  const recommended    = tier ? (plans.find((p) => p.id === TIER_TO_PLAN[tier]) ?? null) : null;
  const t              = recommended?.tier ?? 'prata';

  const reset = () => { setQ1(null); setQ2(null); };

  return (
    <Section className="bg-bg-soft">
      <Container size="md">

        {/* Header */}
        <div
          className="animate-fade-up mx-auto mb-10 max-w-xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Recomendador
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
          >
            Qual plano é o certo para você?
          </h2>
          <p className="mt-3 text-muted">Duas perguntas e você descobre na hora.</p>
        </div>

        {/* Quiz card */}
        <div
          className="animate-fade-up mx-auto max-w-xl rounded-[var(--radius-lg)] border border-line bg-card p-7 sm:p-10"
          style={{ animationDelay: '140ms' }}
        >

          {!done ? (
            /* ── Questions ──────────────────────────────────── */
            <div className="space-y-8">

              <div role="group" aria-labelledby="pf-q1-label">
                <p id="pf-q1-label" className="mb-4 font-display font-semibold text-ink">
                  <span
                    className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                    aria-hidden
                  >1</span>
                  {Q1.text}
                </p>
                <div className="space-y-2.5">
                  {Q1.options.map((opt) => (
                    <OptionBtn
                      key={opt.id}
                      label={opt.label}
                      selected={q1 === opt.id}
                      onClick={() => { setQ1(opt.id); setQ2(null); }}
                    />
                  ))}
                </div>
              </div>

              {needsQ2 && (
                <div
                  role="group"
                  aria-labelledby="pf-q2-label"
                  className="animate-fade-up"
                  style={{ animationDelay: '0ms' }}
                >
                  <p id="pf-q2-label" className="mb-4 font-display font-semibold text-ink">
                    <span
                      className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                      aria-hidden
                    >2</span>
                    {Q2.text}
                  </p>
                  <div className="space-y-2.5">
                    {Q2.options.map((opt) => (
                      <OptionBtn
                        key={opt.id}
                        label={opt.label}
                        selected={q2 === opt.id}
                        onClick={() => setQ2(opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>

          ) : recommended ? (
            /* ── Result ─────────────────────────────────────── */
            <div
              aria-live="polite"
              className="animate-fade-up text-center"
              style={{ animationDelay: '0ms' }}
            >

              {/* Tier seal */}
              <div
                className="mx-auto mb-5 select-none"
                style={{ fontSize: '3.5rem', lineHeight: 1 }}
                aria-hidden
              >
                {SEAL[t]}
              </div>

              {/* Tier label */}
              <p
                className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ color: `var(--tier-${t}-text)` }}
              >
                {recommended.tierLabel}
              </p>

              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Recomendado para você
              </p>

              <p
                className="font-display font-extrabold text-ink"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.025em' }}
              >
                {recommended.name}
              </p>

              <p
                className="mt-2 text-2xl font-semibold"
                style={{ color: `var(--tier-${t}-text)` }}
              >
                {recommended.priceLabel}
              </p>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {recommended.forWho}
              </p>

              {/* Mini features */}
              <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left">
                {recommended.features
                  .filter((f) => f.included && !f.label.includes('Tudo do'))
                  .slice(0, 4)
                  .map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5 text-sm text-muted">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: `var(--tier-${t}-text)` }}
                        aria-hidden
                      />
                      {f.label}
                    </li>
                  ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 space-y-3">
                <a
                  href={buildWhatsAppUrl(
                    `Olá, Paulo! Fiz o teste do recomendador e o plano indicado foi o ${recommended.name} (${recommended.tierLabel ?? ''}) de ${recommended.priceLabel}. Quero saber mais!`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'inline-flex w-full items-center justify-center gap-2',
                    'h-11 rounded-full px-5 text-[15px]',
                    'font-display font-semibold',
                    'transition-all duration-200 active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                  ].join(' ')}
                  style={{
                    background: CTA_BG[t],
                    color:      CTA_FG[t],
                    boxShadow:  `0 10px 30px -10px ${CTA_GLOW[t]}`,
                  }}
                >
                  Quero o {recommended.name}
                </a>

                <a
                  href="/#planos"
                  className={[
                    'inline-flex w-full items-center justify-center',
                    'h-10 rounded-full px-5 text-sm font-medium',
                    'border border-line text-muted',
                    'transition-colors hover:border-line-hi hover:text-ink',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                  ].join(' ')}
                >
                  Ver todos os planos
                </a>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-4 rounded-sm text-xs text-muted-2 underline-offset-2 transition-colors hover:text-muted hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Refazer o teste
              </button>

            </div>
          ) : null}

        </div>

      </Container>
    </Section>
  );
}

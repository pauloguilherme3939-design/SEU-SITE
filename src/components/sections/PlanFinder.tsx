'use client';

import { useState } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

/* ── Questions ─────────────────────────────────────────── */
const Q1 = {
  text: 'Qual é o seu principal objetivo?',
  options: [
    { id: 'inicial',     label: 'Preciso de algo simples e acessível para apresentar meu negócio' },
    { id: 'presenca',    label: 'Quero uma landing page mais organizada e com mais estrutura' },
    { id: 'express',     label: 'Quero presença profissional com SEO e reconhecimento no Google' },
    { id: 'empresarial', label: 'Preciso de um site com várias páginas' },
  ],
};

const Q2 = {
  text: 'Quantas páginas você precisa?',
  options: [
    { id: 'uma',    label: 'Uma página (landing page) — objetivo claro' },
    { id: 'varias', label: 'Várias páginas — Início, Sobre, Serviços, Contato...' },
  ],
};

const Q2_SKIP = new Set(['inicial', 'empresarial']);

/* ── Recommendation logic ──────────────────────────────── */
function getPlanId(q1: string, q2: string): string {
  if (q1 === 'empresarial' || q2 === 'varias') return 'empresarial';
  if (q1 === 'express') return 'express';
  if (q1 === 'inicial') return 'inicial';
  return 'presenca';
}

/* ── Option button ─────────────────────────────────────── */
function OptionBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-[var(--radius-sm)] border px-5 py-4 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        selected
          ? 'border-accent/50 bg-accent/10 text-ink'
          : 'border-line bg-card-hi text-muted hover:border-line-hi hover:text-ink'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected ? 'border-accent bg-accent' : 'border-muted-2'
          }`}
        >
          {selected && (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}

/* ── Main component ────────────────────────────────────── */
export default function PlanFinder() {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);

  const needsQ2 = q1 !== null && !Q2_SKIP.has(q1);
  const done = q1 !== null && (!needsQ2 || q2 !== null);
  const recommendedId = done ? getPlanId(q1 as string, q2 ?? '') : null;
  const recommended = recommendedId ? plans.find((p) => p.id === recommendedId) ?? null : null;

  const reset = () => { setQ1(null); setQ2(null); };

  return (
    <Section className="bg-bg-soft">
      <Container size="md">

        {/* Header */}
        <div className="animate-fade-up mx-auto mb-10 max-w-xl text-center" style={{ animationDelay: '60ms' }}>
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
            <div className="space-y-8">

              {/* Question 1 */}
              <div role="group" aria-labelledby="q1-label">
                <p id="q1-label" className="mb-4 font-display font-semibold text-ink">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent" aria-hidden>1</span>
                  {Q1.text}
                </p>
                <div className="space-y-2.5">
                  {Q1.options.map((opt) => (
                    <OptionBtn
                      key={opt.id}
                      label={opt.label}
                      selected={q1 === opt.id}
                      onClick={() => setQ1(opt.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Question 2 — só aparece se Q1 não definir o plano diretamente */}
              {needsQ2 && (
                <div role="group" aria-labelledby="q2-label" className="animate-fade-up" style={{ animationDelay: '0ms' }}>
                  <p id="q2-label" className="mb-4 font-display font-semibold text-ink">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent" aria-hidden>2</span>
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
            <div aria-live="polite" className="animate-fade-up text-center" style={{ animationDelay: '0ms' }}>

              {/* Success indicator */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path d="M4 11l5 5 9-9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Recomendado para você
              </p>
              <p
                className="font-display font-extrabold text-ink"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.025em' }}
              >
                {recommended.name}
              </p>
              <p className="mt-1 text-2xl font-semibold text-accent">{recommended.priceLabel}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {recommended.forWho}
              </p>

              {/* Mini features */}
              <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left">
                {recommended.features
                  .filter((f) => f.included)
                  .slice(0, 4)
                  .map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5 text-sm text-muted">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {f.label}
                    </li>
                  ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Button
                  href={buildWhatsAppUrl(
                    `Olá, Paulo! Fiz o teste do recomendador e o plano sugerido foi o ${recommended.name} (${recommended.priceLabel}). Quero saber mais!`,
                  )}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Quero o {recommended.name}
                </Button>
                <Button
                  href="/#planos"
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={reset}
                >
                  Ver qual plano combina com meu negócio
                </Button>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-4 text-xs text-muted-2 underline-offset-2 hover:text-muted hover:underline transition-colors"
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

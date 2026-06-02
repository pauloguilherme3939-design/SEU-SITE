'use client';

import type { ReactNode } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackPlanSelect } from '@/lib/analytics';
import { Container, Section } from '@/components/ui';

/* ── Icons ───────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" />
    </svg>
  );
}

/* ── Tier non-CSS config ─────────────────────────────────────── */
/* All colors come from tokens.css via var(--tier-X-*).          */
/* Only values that can't live in CSS belong here.               */
const SEAL: Record<string, string> = {
  prata: '🥈', ouro: '🥇', platina: '💠', diamante: '💎',
};

const CTA_COLOR: Record<string, { bg: string; text: string; glow: string }> = {
  prata:    { bg: 'var(--accent)', text: 'var(--bg)', glow: 'rgba(45,212,141,0.40)'  },
  ouro:     { bg: 'var(--accent)', text: 'var(--bg)', glow: 'rgba(45,212,141,0.40)'  },
  platina:  { bg: '#0ea5e9',       text: '#fff',      glow: 'rgba(14,165,233,0.50)'  },
  diamante: { bg: '#7c3aed',       text: '#fff',      glow: 'rgba(124,58,237,0.55)'  },
};

/* ── Tier-styled CTA ─────────────────────────────────────────── */
function TierCTA({ href, tier, onClick, children }: {
  href: string;
  tier: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const c = CTA_COLOR[tier] ?? CTA_COLOR.prata;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2',
        'w-full h-11 px-5 text-[15px]',
        'font-display font-semibold rounded-full',
        'transition-all duration-200 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
      ].join(' ')}
      style={{
        background:  c.bg,
        color:       c.text,
        boxShadow:  `0 10px 30px -10px ${c.glow}`,
      }}
    >
      {children}
    </a>
  );
}

/* ── Pricing ─────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <Section anchorId="planos">
      <Container>

        {/* ── Header ───────────────────────────────────────── */}
        <div
          className="animate-fade-up mx-auto mb-16 max-w-xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Planos e preços
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: '1.15',
            }}
          >
            Escolha o plano certo para o seu negócio
          </h2>
          <p className="mt-4 text-muted">
            Pagamento único, sem mensalidade. O site é seu para sempre.
          </p>
        </div>

        {/* ── Cards grid ───────────────────────────────────── */}
        {/* pt-6: room for floating badges above first-row cards */}
        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
          {plans.map((plan, i) => {
            const t = plan.tier ?? 'prata';
            const hasBadge = !!(plan.highlight || plan.tagline);

            const waUrl = buildWhatsAppUrl(
              `Olá, Paulo! Tenho interesse no plano ${plan.name} (${plan.tierLabel ?? ''}) de ${plan.priceLabel}. Pode me ajudar?`,
            );

            return (
              <article
                key={plan.id}
                aria-label={`Plano ${plan.name} — ${plan.tierLabel}`}
                className={[
                  'animate-fade-up relative flex flex-col',
                  'rounded-[var(--radius)] transition-all duration-300',
                  plan.highlight ? 'sm:ring-1 sm:ring-[rgba(56,189,248,0.18)] xl:scale-[1.035] xl:z-10' : '',
                ].join(' ')}
                style={{
                  animationDelay: `${80 + i * 70}ms`,
                  background:    `var(--tier-${t}-bg)`,
                  border:        `1px solid var(--tier-${t}-border)`,
                  boxShadow:     `var(--tier-${t}-shadow)`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `var(--tier-${t}-border-hover)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `var(--tier-${t}-border)`;
                }}
              >

                {/* ── Metallic top bar ──────────────────── */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[var(--radius)]"
                  style={{
                    background: `var(--tier-${t}-bar)`,
                    height:     `var(--tier-${t}-bar-h)`,
                  }}
                />

                {/* ── Inner top glow (all tiers) ── */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[var(--radius)]"
                  style={{
                    background: `radial-gradient(ellipse 100% 55% at 50% 0%, var(--tier-${t}-glow) 0%, transparent 70%)`,
                    height: 130,
                  }}
                />

                {/* ── Floating badge — Platina (featured) ── */}
                {plan.highlight && plan.tagline && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 -top-[18px] z-10 flex justify-center"
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-[5px] text-[11px] font-bold tracking-wide"
                      style={{
                        background:  `var(--tier-${t}-seal)`,
                        border:      `1px solid var(--tier-${t}-seal-border)`,
                        color:       `var(--tier-${t}-text)`,
                        boxShadow:   `0 0 22px -4px var(--tier-${t}-glow), 0 4px 14px -4px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.08)`,
                        textShadow:  `0 0 12px var(--tier-${t}-glow)`,
                        letterSpacing: '0.06em',
                      }}
                    >
                      ✦ {plan.tagline}
                    </span>
                  </div>
                )}

                {/* ── Floating badge — Diamante (topo) ──── */}
                {!plan.highlight && plan.tagline && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 -top-[14px] z-10 flex justify-center"
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-[4px] text-[10px] font-semibold uppercase tracking-[0.10em]"
                      style={{
                        background: `var(--tier-${t}-seal)`,
                        border:     `1px solid var(--tier-${t}-seal-border)`,
                        color:      `var(--tier-${t}-text)`,
                        boxShadow:  `0 0 18px -4px var(--tier-${t}-glow), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      }}
                    >
                      {SEAL[t]} {plan.tagline}
                    </span>
                  </div>
                )}

                {/* ── Card body ─────────────────────────── */}
                <div
                  className={`relative flex flex-col flex-1 p-6 ${hasBadge ? 'pt-8' : ''}`}
                >

                  {/* Seal + tier label */}
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="select-none text-2xl leading-none" aria-hidden>
                      {SEAL[t]}
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.11em]"
                      style={{ color: `var(--tier-${t}-text)` }}
                    >
                      {plan.tierLabel}
                    </span>
                  </div>

                  {/* Plan name */}
                  <p
                    className="mb-1.5 font-display font-bold leading-snug text-ink"
                    style={{ fontSize: '1.05rem' }}
                  >
                    {plan.name}
                  </p>

                  {/* For who */}
                  <p className="mb-5 text-sm leading-relaxed text-muted">
                    {plan.forWho}
                  </p>

                  {/* Price */}
                  <div className="mb-1 flex items-baseline gap-1">
                    <span
                      className="font-display font-extrabold leading-none"
                      style={{
                        fontSize:      'clamp(1.75rem, 3vw, 2.25rem)',
                        letterSpacing: '-0.03em',
                        color:         `var(--tier-${t}-text)`,
                      }}
                    >
                      {plan.priceLabel}
                    </span>
                  </div>
                  <p className="mb-5 text-xs text-muted-2">{plan.paymentNote}</p>

                  {/* Features */}
                  <ul
                    className="mb-5 flex-1 space-y-2"
                    aria-label={`Recursos do ${plan.name}`}
                  >
                    {plan.features.map(f => {
                      /* Accumulative separator */
                      if (f.label.includes('Tudo do')) {
                        return (
                          <li key={f.label} className="my-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-px flex-1"
                                style={{ background: `var(--tier-${t}-border)` }}
                              />
                              <span
                                className="shrink-0 text-[10px] font-bold uppercase tracking-[0.09em]"
                                style={{ color: `var(--tier-${t}-text)`, opacity: 0.85 }}
                              >
                                {f.label}
                              </span>
                              <div
                                className="h-px flex-1"
                                style={{ background: `var(--tier-${t}-border)` }}
                              />
                            </div>
                          </li>
                        );
                      }

                      /* Regular feature */
                      return (
                        <li key={f.label} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={[
                              'mt-[3px] flex shrink-0 items-center justify-center rounded-full',
                              f.included ? 'bg-accent/15 text-accent' : 'bg-card-hi text-muted-2',
                            ].join(' ')}
                            style={{ width: 17, height: 17, minWidth: 17 }}
                            aria-hidden
                          >
                            {f.included ? <CheckIcon /> : <XIcon />}
                          </span>
                          <span
                            className={
                              f.included
                                ? 'text-muted'
                                : 'text-muted-2 line-through decoration-muted-2/30'
                            }
                          >
                            {f.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Bonuses */}
                  {plan.bonuses && plan.bonuses.length > 0 && (
                    <div
                      className="mb-6 rounded-[var(--radius-sm)] p-3"
                      style={{
                        background: 'rgba(0,0,0,0.22)',
                        border:     `1px solid var(--tier-${t}-border)`,
                      }}
                    >
                      <p
                        className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.09em]"
                        style={{ color: `var(--tier-${t}-text)` }}
                      >
                        <span aria-hidden>🎁</span>
                        Bônus inclusos
                      </p>
                      <ul
                        className="space-y-1.5"
                        aria-label={`Bônus do ${plan.name}`}
                      >
                        {plan.bonuses.map(b => (
                          <li key={b} className="flex items-start gap-2 text-xs text-muted">
                            <span
                              className="mt-[2px] shrink-0 text-[9px]"
                              style={{ color: `var(--tier-${t}-text)`, opacity: 0.75 }}
                              aria-hidden
                            >
                              ✦
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA + footer */}
                  <div className="space-y-2.5">
                    <TierCTA
                      href={waUrl}
                      tier={t}
                      onClick={() => trackPlanSelect({
                        planId: plan.id,
                        planName: plan.name,
                        tier: t,
                        price: plan.price,
                      })}
                    >
                      {plan.ctaLabel}
                    </TierCTA>

                    <p className="text-center text-xs text-muted-2">
                      {plan.deadline}
                    </p>

                    <p className="text-center text-xs text-muted-2">
                      Ideal para:{' '}
                      <span className="font-medium text-muted">{plan.idealFor}</span>
                    </p>

                    {plan.maintenancePrice != null && (
                      <p className="border-t border-[rgba(255,255,255,0.07)] pt-2.5 text-center text-xs text-muted-2">
                        Manutenção opcional:{' '}
                        <span className="font-medium text-muted">
                          R$ {plan.maintenancePrice}/mês
                        </span>
                      </p>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* ── Bottom notes ─────────────────────────────────── */}
        <div
          className="animate-fade-in mt-12 space-y-2 text-center"
          style={{ animationDelay: '500ms' }}
        >
          <p className="text-sm text-muted-2">
            Todos os planos incluem hospedagem inicial. Dúvidas?{' '}
            <a
              href={buildWhatsAppUrl('Olá! Tenho dúvidas sobre os planos. Pode me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Fale no WhatsApp
            </a>
            .
          </p>
          <p className="text-xs text-muted-2">
            * Domínio .com.br incluso por 1 ano desde que seja um domínio comum disponível para
            registro. Após o primeiro ano, a renovação fica por conta do cliente (cerca de R$ 40/ano).
          </p>
        </div>

      </Container>
    </Section>
  );
}

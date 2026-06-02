import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

/* ─────────────────────────────────────────────────────────────
   TIER VISUAL SYSTEM
   T1 Presença Inicial  — Clean/Neutral
   T2 Presença Rápida   — Bronze/Warm Silver
   T3 Profissional Expr — Gold/Premium (featured)
   T4 Empresarial       — Platinum/Enterprise
───────────────────────────────────────────────────────────── */
const TIER: Record<string, {
  level:        number;
  dotColor:     string;
  borderColor:  string;
  bgColor:      string;
  boxShadow?:   string;
  topLine?:     { gradient: string; height: string };
  innerGlow?:   string;
  hoverBorder?: string;
}> = {
  inicial: {
    level:       1,
    dotColor:    'rgba(107,120,115,0.50)',
    borderColor: 'rgba(255,255,255,0.08)',
    bgColor:     'var(--card)',
    hoverBorder: 'rgba(45,212,141,0.20)',
  },
  presenca: {
    level:       2,
    dotColor:    'rgba(182,155,82,0.85)',
    borderColor: 'rgba(176,150,78,0.22)',
    bgColor:     'var(--card)',
    boxShadow:   '0 16px 50px -20px rgba(0,0,0,0.45)',
    hoverBorder: 'rgba(176,150,78,0.42)',
    topLine: {
      gradient: 'linear-gradient(90deg, transparent 5%, rgba(185,158,82,0.52) 40%, rgba(195,168,90,0.72) 50%, rgba(185,158,82,0.52) 60%, transparent 95%)',
      height:   '1px',
    },
  },
  express: {
    level:       3,
    dotColor:    'rgba(242,192,38,0.95)',
    borderColor: 'rgba(212,162,26,0.60)',
    bgColor:     'var(--card-hi)',
    boxShadow:   [
      '0 0 0 1px rgba(212,162,26,0.14)',
      '0 32px 80px -18px rgba(186,130,8,0.70)',
      '0 0 130px -40px rgba(212,168,26,0.38)',
    ].join(', '),
    topLine: {
      gradient: 'linear-gradient(90deg, transparent 0%, rgba(195,148,16,0.35) 8%, rgba(238,188,36,0.95) 35%, rgba(252,210,50,1.00) 50%, rgba(238,188,36,0.95) 65%, rgba(195,148,16,0.35) 92%, transparent 100%)',
      height:   '2.5px',
    },
    innerGlow: 'radial-gradient(ellipse 90% 50% at 50% -8%, rgba(212,168,26,0.10) 0%, transparent 62%)',
  },
  empresarial: {
    level:       4,
    dotColor:    'rgba(176,192,210,0.90)',
    borderColor: 'rgba(148,163,184,0.32)',
    bgColor:     'var(--card)',
    boxShadow:   '0 20px 60px -18px rgba(90,120,155,0.32)',
    hoverBorder: 'rgba(148,163,184,0.52)',
    topLine: {
      gradient: 'linear-gradient(90deg, transparent 5%, rgba(168,185,205,0.42) 30%, rgba(195,210,228,0.68) 50%, rgba(168,185,205,0.42) 70%, transparent 95%)',
      height:   '1.5px',
    },
  },
};

/* ── Icons ───────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
      <path d="M5 1l1.12 2.27L8.5 3.64l-1.75 1.7.41 2.41L5 6.52 2.84 7.75l.41-2.41L1.5 3.64l2.38-.37L5 1z" />
    </svg>
  );
}
function DiamondIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
      <path d="M4 0L8 4L4 8L0 4z" />
    </svg>
  );
}

/* ── Tier dots (top-right of each card header) ───────────── */
function TierDots({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-[3px] shrink-0 mt-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full"
          style={{ width: 5, height: 5, background: color, opacity: 0.7 + i * 0.1 }}
        />
      ))}
    </div>
  );
}

export default function Pricing() {
  return (
    <Section anchorId="planos">
      <Container>

        {/* ── Header ───────────────────────────────────────── */}
        <div className="animate-fade-up mx-auto mb-14 max-w-xl text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Planos e preços
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
          >
            Escolha o plano certo para o seu negócio
          </h2>
          <p className="mt-4 text-muted">
            Pagamento único, sem mensalidade. O site é seu para sempre.
          </p>
        </div>

        {/* ── Cards grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
          {plans.map((plan, i) => {
            const tier = TIER[plan.id];

            const waMsgMap: Record<string, string> = {
              inicial:     'Olá, Paulo! Tenho interesse no plano Presença Inicial de R$ 497. Quero entender se ele serve para meu negócio.',
              presenca:    'Olá, Paulo! Tenho interesse no plano Presença Rápida de R$ 997. Quero entender se ele serve para meu negócio.',
              express:     'Olá, Paulo! Tenho interesse no plano Profissional Express de R$ 1.497. Quero criar um site com domínio, WhatsApp e Google.',
              empresarial: 'Olá, Paulo! Tenho interesse no plano Empresarial Completo de R$ 2.997. Quero um site mais completo para minha empresa.',
            };
            const waUrl = buildWhatsAppUrl(
              waMsgMap[plan.id] ?? `Olá, Paulo! Tenho interesse no plano ${plan.name}. Pode me ajudar?`
            );

            return (
              <div
                key={plan.id}
                className="animate-fade-up relative flex flex-col rounded-[var(--radius)] transition-all duration-300"
                style={{
                  animationDelay: `${80 + i * 70}ms`,
                  background: tier.bgColor,
                  border: `1px solid ${tier.borderColor}`,
                  boxShadow: tier.boxShadow,
                }}
                onMouseEnter={e => {
                  if (tier.hoverBorder) {
                    (e.currentTarget as HTMLElement).style.borderColor = tier.hoverBorder;
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = tier.borderColor;
                }}
              >
                {/* Tier top accent line */}
                {tier.topLine && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 rounded-t-[var(--radius)] pointer-events-none"
                    style={{
                      background: tier.topLine.gradient,
                      height: tier.topLine.height,
                    }}
                  />
                )}

                {/* Inner radial glow (T3 only) */}
                {tier.innerGlow && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 rounded-t-[var(--radius)] pointer-events-none"
                    style={{ background: tier.innerGlow, height: '120px' }}
                  />
                )}

                {/* ── Featured badge (T3 — "Mais escolhido") ── */}
                {plan.badge && (
                  <div className="absolute -top-[15px] inset-x-0 flex justify-center z-10">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-[5px] text-[11px] font-bold tracking-wide"
                      style={{
                        background: 'linear-gradient(135deg, #1e1a00 0%, #312600 50%, #1c1800 100%)',
                        border: '1px solid rgba(212,162,26,0.72)',
                        color: '#F7D653',
                        boxShadow: [
                          '0 0 24px -4px rgba(198,148,14,0.70)',
                          '0 4px 14px -4px rgba(0,0,0,0.60)',
                          'inset 0 1px 0 rgba(248,215,65,0.18)',
                        ].join(', '),
                        textShadow: '0 0 14px rgba(240,198,38,0.55)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <StarIcon />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* ── T4 enterprise badge ───────────────────── */}
                {plan.id === 'empresarial' && (
                  <div className="absolute -top-[13px] inset-x-0 flex justify-center z-10">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[4px] text-[10px] font-semibold tracking-widest uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #0e1420, #151e2c)',
                        border: '1px solid rgba(148,163,184,0.42)',
                        color: '#94a3b8',
                        boxShadow: '0 0 12px -4px rgba(100,130,165,0.28), inset 0 1px 0 rgba(180,195,215,0.10)',
                        letterSpacing: '0.10em',
                      }}
                    >
                      <DiamondIcon />
                      Enterprise
                    </span>
                  </div>
                )}

                {/* ── Card body ────────────────────────────── */}
                <div className={`relative flex flex-col flex-1 p-6 ${plan.badge || plan.id === 'empresarial' ? 'pt-8' : ''}`}>

                  {/* Plan name + tier dots */}
                  <div className="mb-5 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display font-bold text-ink leading-snug">{plan.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{plan.forWho}</p>
                    </div>
                    <TierDots count={tier.level} color={tier.dotColor} />
                  </div>

                  {/* Price */}
                  <div className="mb-1 flex items-end gap-1">
                    <span
                      className="font-display font-extrabold leading-none"
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        letterSpacing: '-0.03em',
                        color: plan.id === 'express'
                          ? '#F0D060'
                          : plan.id === 'empresarial'
                          ? '#c8d6e5'
                          : 'var(--ink)',
                      }}
                    >
                      {plan.priceLabel}
                    </span>
                  </div>
                  <p className="mb-6 text-xs text-muted-2">{plan.paymentNote}</p>

                  {/* Features */}
                  <ul className="mb-7 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-[3px] flex shrink-0 items-center justify-center rounded-full ${
                            f.included ? 'bg-accent/15 text-accent' : 'bg-card-hi text-muted-2'
                          }`}
                          style={{ width: 18, height: 18, minWidth: 18 }}
                        >
                          {f.included ? <CheckIcon /> : <XIcon />}
                        </span>
                        <span className={f.included ? 'text-muted' : 'text-muted-2 line-through decoration-muted-2/30'}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA footer */}
                  <div className="space-y-2.5">
                    <Button href={waUrl} variant="primary" size="md" fullWidth>
                      {plan.ctaLabel}
                    </Button>

                    <p className="text-center text-xs text-muted-2">{plan.deadline}</p>

                    {plan.maintenancePrice != null && (
                      <p className="border-t border-[rgba(255,255,255,0.07)] pt-2.5 text-center text-xs text-muted-2">
                        Manutenção opcional:{' '}
                        <span className="font-medium text-muted">R$ {plan.maintenancePrice}/mês</span>
                      </p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom notes ─────────────────────────────────── */}
        <div className="animate-fade-in mt-10 space-y-2 text-center" style={{ animationDelay: '500ms' }}>
          <p className="text-sm text-muted-2">
            Todos os planos incluem hospedagem inicial. Dúvidas?{' '}
            <a
              href={buildWhatsAppUrl('Olá! Tenho dúvidas sobre os planos. Pode me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Fale no WhatsApp
            </a>
            .
          </p>
          <p className="text-xs text-muted-2">
            * Domínio .com.br incluso por 1 ano desde que seja um domínio comum disponível para registro.
            Após o primeiro ano, a renovação fica por conta do cliente (cerca de R$ 40/ano).
          </p>
        </div>

      </Container>
    </Section>
  );
}

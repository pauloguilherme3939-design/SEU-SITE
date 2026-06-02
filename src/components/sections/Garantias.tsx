import { Container, Section } from '@/components/ui';

/* ── Icons ───────────────────────────────────────────────────── */
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="4" y="9" width="12" height="9" rx="2"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9V6.5a3 3 0 016 0V9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function CircleCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.5"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10l2.5 2.5 4.5-5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M11.5 2.5L5 11h5.5L8.5 17.5l7-9H10L11.5 2.5z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function SearchCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8.5l2 2 3-3"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 12.5L17 17"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────── */
const TIER_POSITIONS = [
  { seal: '🥈', tier: 'prata',    label: 'Prata',    pos: 'para começar'              },
  { seal: '🥇', tier: 'ouro',     label: 'Ouro',     pos: 'mais presença'             },
  { seal: '💠', tier: 'platina',  label: 'Platina',  pos: 'melhor custo-benefício'    },
  { seal: '💎', tier: 'diamante', label: 'Diamante', pos: 'autoridade máxima'         },
] as const;

const GARANTIAS = [
  {
    Icon:  LockIcon,
    title: 'Domínio registrado no seu nome',
    body:  (
      <>
        O .com.br fica registrado em seu CPF ou CNPJ desde o primeiro dia —
        nunca em nome do desenvolvedor. Incluso por 1 ano; renovação simples
        por ≈ R$ 40/ano depois disso.
      </>
    ),
  },
  {
    Icon:  CircleCheckIcon,
    title: 'Sem mensalidade escondida',
    body:  (
      <>
        Você paga uma vez e o site é seu para sempre. Manutenção mensal existe,
        mas é <strong className="font-semibold text-ink">100% opcional</strong> —
        contrate só se precisar de atualizações frequentes.
      </>
    ),
  },
  {
    Icon:  BoltIcon,
    title: 'No ar em até 3 dias úteis',
    body:  (
      <>
        Após você enviar os materiais (logo, textos e fotos), o site vai ao ar
        em até 3 dias. O plano Empresarial leva de 5 a 10 dias por incluir
        mais páginas.
      </>
    ),
  },
  {
    Icon:  SearchCheckIcon,
    title: 'SEO honesto, sem promessa vazia',
    body:  (
      <>
        Configuro o SEO inicial e o Google Search Console para que o Google
        possa indexar seu site corretamente.{' '}
        <strong className="font-semibold text-ink">
          Não prometo 1º lugar no Google
        </strong>{' '}
        — esse resultado depende de fatores fora do meu controle.
      </>
    ),
  },
] as const;

/* ── Component ───────────────────────────────────────────────── */
export default function Garantias() {
  return (
    <Section anchorId="garantias">
      <Container>

        {/* ── Tier positioning strip ───────────────────── */}
        {/* Serves as a "legend" for users scrolling past the tier cards */}
        <div
          className="animate-fade-up mb-12 flex flex-wrap items-center justify-center gap-2"
          style={{ animationDelay: '60ms' }}
          aria-label="Resumo dos níveis de plano"
        >
          {TIER_POSITIONS.map(item => (
            <span
              key={item.tier}
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-card px-3.5 py-2 text-sm"
            >
              <span aria-hidden className="text-base leading-none">{item.seal}</span>
              <span
                className="font-semibold"
                style={{ color: `var(--tier-${item.tier}-text)` }}
              >
                {item.label}
              </span>
              <span className="text-xs text-muted-2">— {item.pos}</span>
            </span>
          ))}
        </div>

        {/* ── Section header ───────────────────────────── */}
        <div
          className="animate-fade-up mx-auto mb-10 max-w-xl text-center"
          style={{ animationDelay: '100ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Segurança de compra
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(1.7rem, 4vw, 2.3rem)',
              letterSpacing: '-0.025em',
              lineHeight:    '1.15',
            }}
          >
            Compra clara, entrega honesta
          </h2>
          <p className="mt-4 text-muted">
            Sem surpresas no bolso. Sem promessa que não dá pra cumprir.
          </p>
        </div>

        {/* ── Guarantee cards ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GARANTIAS.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className="animate-fade-up flex flex-col gap-4 rounded-[var(--radius)] border border-[rgba(255,255,255,0.08)] bg-card p-5 sm:p-6"
              style={{
                animationDelay: `${140 + i * 60}ms`,
                /* Subtle green top accent line */
                borderTop: '1px solid rgba(45, 212, 141, 0.18)',
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-[var(--radius-sm)] text-accent"
                style={{
                  width:      40,
                  height:     40,
                  minWidth:   40,
                  background: 'rgba(45, 212, 141, 0.10)',
                }}
                aria-hidden
              >
                <Icon />
              </div>

              {/* Text */}
              <div>
                <h3 className="mb-2 font-display text-[15px] font-bold leading-snug text-ink">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}

import { Container, Section } from '@/components/ui';

/* ── Data ────────────────────────────────────────────────── */
const pains = [
  {
    title: 'Invisível no Google',
    desc: 'Quando alguém pesquisa "eletricista em [cidade]", você não aparece — e o cliente vai para quem aparece.',
  },
  {
    title: 'Instagram não é endereço',
    desc: 'Perfil no Insta gera seguidor, não cliente. Sem site, você não tem onde converter o interesse em contato.',
  },
  {
    title: 'Clientes que somem no meio do caminho',
    desc: 'Sem uma página que mostre o que você faz e prove o seu valor, o interesse esfria antes de virar mensagem.',
  },
  {
    title: 'Indicação que não chega',
    desc: 'Seu cliente quer te indicar mas não tem link. Manda o número, o amigo procrastina, a venda some.',
  },
  {
    title: 'Preço difícil de cobrar',
    desc: 'Quem não tem site parece menor do que é. Sem presença profissional, é mais difícil justificar o preço justo.',
  },
];

const gains = [
  {
    title: 'Primeira impressão que fecha venda',
    desc: 'Um site bem feito transmite confiança em segundos — antes de o cliente abrir a boca, já está convencido.',
  },
  {
    title: 'Visita no site → conversa no WhatsApp',
    desc: 'Botão estratégico com mensagem pronta leva o visitante direto para o WhatsApp com um toque. Zero fricção.',
  },
  {
    title: 'Google começa a te encontrar',
    desc: 'SEO inicial + Google Search Console configurado. O Google indexa seu site e seu nome começa a aparecer nas buscas.',
  },
  {
    title: 'Página que vende por você 24h',
    desc: 'Apresenta serviços, preços, portfólio e depoimentos enquanto você atende clientes. Funciona dormindo.',
  },
  {
    title: 'Link que vale mais do que número',
    desc: 'Um link bonito e profissional para compartilhar onde quiser. Indicações viram clientes com muito mais facilidade.',
  },
];

/* ── Icons ───────────────────────────────────────────────── */
function IconX() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M2 2l7 7M9 2L2 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function ProblemaSolucao() {
  return (
    <Section className="bg-bg-soft">
      <Container>

        {/* Section header */}
        <div className="animate-fade-up mx-auto mb-14 max-w-2xl text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Por que ter um site profissional
          </p>
          <h2
            className="text-balance font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: '1.15', letterSpacing: '-0.025em' }}
          >
            Seus clientes estão no Google{' '}
            <br className="hidden sm:block" />
            agora. Você aparece?
          </h2>
          <p className="mt-4 text-muted">
            Quem não aparece no Google simplesmente não existe para esse cliente. A concorrência aparece. E leva a venda.
          </p>
        </div>

        {/* Comparison grid — 3 cols on desktop (card | vs | card), 1 col on mobile */}
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_52px_1fr] lg:gap-0">

          {/* ── Left: Pains ──────────────────────────────────── */}
          <div
            className="animate-slide-right relative overflow-hidden rounded-[var(--radius-lg)] border border-danger/20 bg-bg p-7 transition-shadow duration-300 hover:shadow-[0_16px_48px_-16px_rgba(239,68,68,0.12)] sm:p-10"
            style={{ animationDelay: '120ms' }}
          >
            {/* Top accent line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.45) 50%, transparent)' }}
            />

            {/* Card header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-danger/20 bg-danger/10 text-danger">
                <IconX />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-danger/60">
                  Situação atual
                </p>
                <h3 className="font-display text-base font-semibold leading-tight text-ink">
                  Hoje, sem site profissional
                </h3>
              </div>
            </div>

            {/* Items */}
            <ul className="space-y-5">
              {pains.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                    <IconX />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── VS divider ───────────────────────────────────── */}
          <div className="flex items-center lg:flex-col lg:justify-center">

            {/* Mobile: horizontal rule */}
            <div className="flex w-full items-center gap-3 lg:hidden">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, transparent, var(--line))' }}
              />
              <span className="shrink-0 rounded-full border border-line bg-bg px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-2">
                VS
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to left, transparent, var(--line))' }}
              />
            </div>

            {/* Desktop: vertical line + VS badge */}
            <div className="relative hidden h-full flex-col items-center justify-center lg:flex">
              <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
              <span className="relative z-10 rounded-full border border-line bg-bg-soft px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-2 shadow-sm">
                VS
              </span>
            </div>

          </div>

          {/* ── Right: Gains ─────────────────────────────────── */}
          <div
            className="animate-slide-left relative overflow-hidden rounded-[var(--radius-lg)] border border-accent/25 bg-bg p-7 transition-shadow duration-300 hover:shadow-[0_16px_48px_-16px_rgba(45,212,141,0.12)] sm:p-10"
            style={{ animationDelay: '120ms' }}
          >
            {/* Top accent line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.55) 50%, transparent)' }}
            />

            {/* Card header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                <IconCheck />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/70">
                  Com o site no ar
                </p>
                <h3 className="font-display text-base font-semibold leading-tight text-ink">
                  Com seu site no ar
                </h3>
              </div>
            </div>

            {/* Items */}
            <ul className="space-y-5">
              {gains.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <IconCheck />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom proof strip */}
        <div
          className="animate-fade-in mt-10 overflow-hidden rounded-[var(--radius)] border border-line bg-card px-6 py-5 sm:px-8"
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="max-w-md text-sm text-muted">
              <strong className="font-semibold text-ink">Você me passa as informações, eu faço o resto.</strong>{' '}
              Domínio registrado no seu nome, site publicado e Google configurado — tudo em até 3 dias úteis.
            </p>
            <a
              href="/#planos"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-hi bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Ver planos
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      </Container>
    </Section>
  );
}

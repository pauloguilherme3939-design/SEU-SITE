import { Container, Section } from '@/components/ui';

/* ── Data ────────────────────────────────────────────────── */
const pains = [
  {
    title: 'Invisível no Google',
    desc: 'Quando alguém pesquisa seu serviço na cidade, você não aparece — a concorrência sim.',
  },
  {
    title: 'Instagram não é endereço',
    desc: 'Perfil no Instagram passa imagem, mas não credibilidade profissional de verdade.',
  },
  {
    title: 'Clientes que escorregam',
    desc: 'Sem um lugar para mostrar seu trabalho e serviços, o interesse some antes de virar contato.',
  },
  {
    title: 'Difícil de ser indicado',
    desc: 'Seu cliente quer te indicar, mas não tem um link fácil para enviar. A indicação se perde.',
  },
  {
    title: 'Parece menor do que é',
    desc: 'Sem site, a percepção de valor cai — e seus preços ficam mais difíceis de justificar.',
  },
];

const gains = [
  {
    title: 'Passa mais confiança',
    desc: 'Um site profissional transmite credibilidade para quem ainda não conhece seu negócio.',
  },
  {
    title: 'Facilita o contato pelo WhatsApp',
    desc: 'Botão direto no site leva o visitante para a conversa no WhatsApp em um toque.',
  },
  {
    title: 'Presença inicial no Google',
    desc: 'Seu site sai com estrutura básica de SEO e configurado no Google Search Console para indexação.',
  },
  {
    title: 'Organiza seus serviços com clareza',
    desc: 'Uma página bem feita apresenta o que você faz, para quem e como contratar — sem confusão.',
  },
  {
    title: 'Cartão de visitas digital 24h',
    desc: 'Funciona enquanto você dorme. Qualquer pessoa pode acessar, ver seu trabalho e entrar em contato.',
  },
];

/* ── Icons ───────────────────────────────────────────────── */
function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
          <h2 className="font-display font-bold text-ink text-balance" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: '1.15', letterSpacing: '-0.025em' }}>
            Mais de 90% dos clientes pesquisam{' '}
            <br className="hidden sm:block" />
            no Google antes de contratar.
          </h2>
          <p className="mt-4 text-muted">
            Se você não aparece, eles contratam a concorrência. É simples assim.
          </p>
        </div>

        {/* Two-column comparison */}
        <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-0">

          {/* ── Left: Pains ─────────────────────────────── */}
          <div
            className="animate-slide-right rounded-[var(--radius-lg)] border border-danger/15 bg-[rgba(255,122,122,0.03)] p-7 sm:p-10 transition-shadow duration-300 hover:shadow-[0_16px_48px_-16px_rgba(255,122,122,0.08)] lg:rounded-r-none lg:border-r-0"
            style={{ animationDelay: '120ms' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/10 text-danger">
                <IconX />
              </div>
              <h3 className="font-display text-base font-semibold text-ink">
                Hoje, sem site profissional
              </h3>
            </div>

            <ul className="space-y-5">
              {pains.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-danger/25 bg-danger/10 text-danger">
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

          {/* ── VS connector ─────────────────────────────── */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 flex-col items-center justify-center lg:flex">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-line to-transparent" />
            <span className="absolute top-1/2 -translate-y-1/2 rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-bold tracking-wider text-muted-2">
              VS
            </span>
          </div>

          {/* ── Right: Gains ─────────────────────────────── */}
          <div
            className="animate-slide-left rounded-[var(--radius-lg)] border border-line-hi bg-accent/[0.03] p-7 sm:p-10 transition-shadow duration-300 hover:shadow-[0_16px_48px_-16px_rgba(45,212,141,0.09)] lg:rounded-l-none lg:border-l-0"
            style={{ animationDelay: '120ms' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                <IconCheck />
              </div>
              <h3 className="font-display text-base font-semibold text-ink">
                Com seu site no ar
              </h3>
            </div>

            <ul className="space-y-5">
              {gains.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
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
        <div className="animate-fade-in mt-10 overflow-hidden rounded-[var(--radius)] border border-line bg-card px-6 py-5 sm:px-8" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted max-w-md">
              <strong className="font-semibold text-ink">Seu site sai do zero e vai ao ar em até 3 dias.</strong>{' '}
              Você me passa as informações, eu cuido de tudo — domínio, publicação e configuração no Google.
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

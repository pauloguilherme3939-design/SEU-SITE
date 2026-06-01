import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container } from '@/components/ui';

const trust = [
  {
    label: 'Domínio .com.br incluso',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 2a10 10 0 010 14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.5 5a10 10 0 019 0M4.5 13a10 10 0 019 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Botão para WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M15.5 9a6.5 6.5 0 01-9.18 5.93L2 16.5l1.57-4.32A6.5 6.5 0 1115.5 9z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Configurado para o Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'No ar em até 3 dias',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 1v3M12 1v3M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  const waUrl = buildWhatsAppUrl(site.whatsappDefaultMessage);

  return (
    <section
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32"
      aria-label="Apresentação"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 55% at 12% -8%, rgba(45,212,141,0.14) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 70% at 88% 108%, rgba(45,212,141,0.10) 0%, transparent 60%)',
            'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(45,212,141,0.04) 0%, transparent 65%)',
            'var(--bg)',
          ].join(','),
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-soft opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: GRAIN, backgroundSize: '220px 220px' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <Container size="md" className="relative z-10 text-center">

        {/* Badge */}
        <div className="animate-fade-up mb-8 inline-flex" style={{ animationDelay: '60ms' }}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Atendendo novos clientes este mês
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up font-display font-extrabold text-ink text-balance"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)',
            lineHeight: '1.07',
            letterSpacing: '-0.035em',
            animationDelay: '140ms',
          }}
        >
          Seu site profissional{' '}
          <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative z-10 text-accent">no ar em até 3 dias</span>
            <svg
              aria-hidden
              className="absolute -bottom-1 left-0 w-full overflow-visible"
              viewBox="0 0 260 10"
              preserveAspectRatio="none"
              style={{ height: '7px' }}
            >
              <path
                d="M3 7 Q 65 1 130 6 Q 195 11 257 6"
                stroke="rgba(45,212,141,0.5)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-balance sm:text-xl"
          style={{ animationDelay: '220ms' }}
        >
          Crio o site do seu negócio com{' '}
          <strong className="font-semibold text-ink">domínio incluso por 1 ano</strong>,
          botão direto para WhatsApp e configuração inicial para o Google reconhecer sua empresa.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center"
          style={{ animationDelay: '300ms' }}
        >
          <Button href={waUrl} variant="whats" size="lg">
            <svg width="19" height="19" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
            </svg>
            Quero meu site
          </Button>
          <Button href="/#planos" variant="secondary" size="lg">
            Ver planos
          </Button>
        </div>

        {/* Claim */}
        <p
          className="animate-fade-in mt-4 text-xs text-muted-2"
          style={{ animationDelay: '400ms' }}
        >
          Pagamento único · Sem mensalidade · Domínio incluso por 1 ano · O site é seu
        </p>

        {/* Divider */}
        <div
          className="animate-fade-in mx-auto mt-14 flex max-w-lg items-center gap-4"
          style={{ animationDelay: '320ms' }}
        >
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-2">
            O que está incluso
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>

        {/* Trust strip */}
        <div
          className="animate-fade-in mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
          style={{ animationDelay: '380ms' }}
        >
          {trust.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-accent ring-4 ring-accent/5">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-muted">{item.label}</span>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

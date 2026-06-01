import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

const trust = [
  'Domínio incluso',
  'Sem mensalidade',
  'Entrega em até 3 dias',
  'Suporte pelo WhatsApp',
];

export default function CtaFinal() {
  const waUrl = buildWhatsAppUrl(
    'Olá, Paulo! Vi sua página Site no Ar Express e quero um orçamento para criar um site profissional para meu negócio.',
  );

  return (
    <Section className="bg-bg-soft">
      <Container size="md">
        <div
          className="animate-fade-up relative overflow-hidden rounded-[var(--radius-lg)] border border-line-hi"
          style={{ animationDelay: '60ms' }}
        >
          {/* Background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,141,0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse 60% 80% at 100% 100%, rgba(45,212,141,0.08) 0%, transparent 60%)',
                'var(--card-hi)',
              ].join(','),
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-soft opacity-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
          />
          {/* Top line */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.65) 40%, rgba(45,212,141,0.65) 60%, transparent)' }}
          />
          {/* Bottom line */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.2) 50%, transparent)' }}
          />

          {/* Content */}
          <div className="relative px-8 py-14 text-center sm:px-16 sm:py-20">

            {/* Eyebrow */}
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">
              Vamos começar?
            </p>

            {/* Headline */}
            <h2
              className="font-display font-extrabold text-ink text-balance mx-auto"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                letterSpacing: '-0.035em',
                lineHeight: '1.08',
                maxWidth: '640px',
              }}
            >
              Pronto para ter o site que o seu negócio merece?
            </h2>

            {/* Sub */}
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">
              Site no ar em até 3 dias. Você me passa as informações,
              eu entrego tudo configurado e funcionando.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href={waUrl} variant="whats" size="lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
                </svg>
                Quero meu site agora
              </Button>
              <Button href="/#planos" variant="ghost" size="lg">
                Ver planos
              </Button>
            </div>

            {/* Trust pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {trust.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-4 py-1.5 text-xs font-medium text-muted"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <path d="M1.5 5.5l2.5 2.5 5.5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {/* Signature */}
            <p className="mt-10 text-xs text-muted-2">
              {site.name} · {new Date().getFullYear()}
            </p>

          </div>
        </div>
      </Container>
    </Section>
  );
}

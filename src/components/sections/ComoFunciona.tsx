import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

const steps = [
  {
    num: '01',
    title: 'Primeiro contato',
    headline: 'Você me chama no WhatsApp',
    desc: 'Entendo seu negócio, vejo o que você precisa e indico o melhor pacote. É uma conversa simples, sem formulário complicado e sem compromisso.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M19 11a8 8 0 01-11.3 7.25L3 19.5l1.25-4.7A8 8 0 1119 11z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11h.01M11 11h.01M14 11h.01"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Confirmação',
    headline: 'Você confirma com a entrada',
    desc: 'A entrada reserva sua vaga e libera o início do projeto. Sem entrada, não inicio — assim garanto prioridade e comprometimento dos dois lados.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M4 14l4-4 3 3 4-5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="3" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Materiais',
    headline: 'Você envia as informações',
    desc: 'Nome do negócio, logo, fotos, serviços, contatos e tudo que precisa aparecer no site. Quanto mais completo o material, mais personalizado e rápido o resultado.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="3" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 19h8M11 16v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Entrega',
    headline: 'Seu site vai para o ar',
    desc: 'Eu desenvolvo, configuro domínio, botão de WhatsApp, SEO inicial e entrego tudo publicado. Você recebe o site pronto e funcionando — sem precisar entender de tecnologia.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 3a12 12 0 010 16M3 11h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 6.5a12 12 0 0110 0M6 15.5a12 12 0 0110 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ComoFunciona() {
  const waUrl = buildWhatsAppUrl();

  return (
    <Section anchorId="como-funciona" className="bg-bg-soft">
      <Container>

        {/* Header */}
        <div className="animate-fade-up mx-auto mb-16 max-w-xl text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Processo
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
          >
            Do zero ao ar em 4 etapas
          </h2>
          <p className="mt-4 text-muted">
            Simples, transparente e sem você precisar entender de tecnologia.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

          {/* Connector line — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-8 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] hidden h-px lg:block"
            style={{ background: 'linear-gradient(90deg, transparent, var(--line-hi) 20%, var(--line-hi) 80%, transparent)' }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="animate-fade-up group relative flex flex-col rounded-[var(--radius)] transition-colors duration-200 hover:bg-card/40"
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              {/* Step badge */}
              <div className="relative z-10 mb-6 flex items-center gap-4 lg:flex-col lg:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line-hi bg-bg text-accent ring-4 ring-accent/8 transition-all duration-200 group-hover:border-accent/35 group-hover:ring-accent/15 lg:mb-2">
                  {step.icon}
                </div>
                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="ml-2 h-px flex-1 border-t border-dashed border-line sm:hidden"
                  />
                )}
              </div>

              {/* Step number pill */}
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-xs font-bold text-muted">
                {step.num}
                <span className="text-muted-2">·</span>
                {step.title}
              </span>

              <h3 className="font-display font-semibold text-ink mb-2 leading-snug text-[1.05rem]">
                {step.headline}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up mt-16 flex flex-col items-center gap-4 text-center" style={{ animationDelay: '500ms' }}>
          <Button
            href={waUrl}
            variant="whats"
            size="lg"
            leadingIcon={
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
              </svg>
            }
          >
            Falar no WhatsApp
          </Button>
          <p className="text-xs text-muted-2">Resposta em até 1h · Sem compromisso</p>
        </div>

      </Container>
    </Section>
  );
}

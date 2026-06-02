import { faq } from '@/data/faq';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Accordion, Container, Section } from '@/components/ui';

export default function Faq() {
  const waUrl = buildWhatsAppUrl('Olá! Tenho uma dúvida e gostaria de conversar antes de decidir.');

  return (
    <Section anchorId="duvidas" className="bg-bg">
      <Container size="md">

        {/* Header */}
        <div className="animate-fade-up mx-auto mb-12 max-w-lg text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Dúvidas frequentes
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
          >
            Perguntas que sempre aparecem
          </h2>
          <p className="mt-4 text-muted">
            Respondidas de forma direta. Se quiser conversar antes de decidir,{' '}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              é só me chamar
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <div className="animate-fade-up" style={{ animationDelay: '140ms' }}>
          <Accordion items={faq} defaultOpenFirst />
        </div>

        {/* Bottom CTA */}
        <div
          className="animate-fade-in relative mt-12 overflow-hidden rounded-[var(--radius)] border border-line bg-card-hi px-6 py-6 text-center sm:px-10"
          style={{ animationDelay: '300ms' }}
        >
          {/* Green top accent line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.55) 40%, rgba(45,212,141,0.55) 60%, transparent)' }}
          />
          <p className="font-display text-lg font-semibold text-ink">
            Ficou alguma dúvida?
          </p>
          <p className="mt-1.5 mb-5 text-sm text-muted">
            Me manda uma mensagem — respondo na hora.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whats px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.5)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card-hi active:scale-[0.98]"
          >
            <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
            </svg>
            Perguntar no WhatsApp
          </a>
        </div>

      </Container>
    </Section>
  );
}

import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

/* ── Feature icons ─────────────────────────────────────── */
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

export default function Pricing() {
  return (
    <Section anchorId="planos">
      <Container>

        {/* Header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
          {plans.map((plan, i) => {
            const waMsgMap: Record<string, string> = {
              inicial: 'Olá, Paulo! Tenho interesse no plano Presença Inicial de R$ 497. Quero entender se ele serve para meu negócio.',
              presenca: 'Olá, Paulo! Tenho interesse no plano Presença Rápida de R$ 997. Quero entender se ele serve para meu negócio.',
              express: 'Olá, Paulo! Tenho interesse no plano Profissional Express de R$ 1.497. Quero criar um site com domínio, WhatsApp e Google.',
              empresarial: 'Olá, Paulo! Tenho interesse no plano Empresarial Completo de R$ 2.997. Quero um site mais completo para minha empresa.',
            };
            const waMsg = waMsgMap[plan.id] ?? `Olá, Paulo! Tenho interesse no plano ${plan.name}. Pode me ajudar?`;
            const waUrl = buildWhatsAppUrl(waMsg);

            return (
              <div
                key={plan.id}
                className={`animate-fade-up relative flex flex-col rounded-[var(--radius)] border transition-all ${
                  plan.featured
                    ? 'border-accent/45 bg-card-hi shadow-[0_24px_80px_-30px_rgba(45,212,141,0.22)]'
                    : 'border-line bg-card hover:border-line-hi'
                }`}
                style={{ animationDelay: `${80 + i * 70}ms` }}
              >
                {/* Featured accent line */}
                {plan.featured && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius)]"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.7), transparent)' }}
                  />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-bg px-3 py-1 text-xs font-semibold text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-6 ${plan.badge ? 'pt-7' : ''}`}>

                  {/* Plan name + description */}
                  <div className="mb-6">
                    <p className="font-display font-bold text-ink">{plan.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{plan.forWho}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-1 flex items-end gap-1">
                    <span
                      className="font-display font-extrabold text-ink"
                      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: '1' }}
                    >
                      {plan.priceLabel}
                    </span>
                  </div>
                  <p className="mb-7 text-xs text-muted-2">{plan.paymentNote}</p>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-[3px] flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                            f.included
                              ? 'bg-accent/15 text-accent'
                              : 'bg-card-hi text-muted-2'
                          }`}
                          style={{ minWidth: '18px', minHeight: '18px' }}
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
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="space-y-2">
                    <Button
                      href={waUrl}
                      variant={plan.featured ? 'primary' : 'secondary'}
                      size="md"
                      fullWidth
                    >
                      {plan.ctaLabel}
                    </Button>

                    <p className="text-center text-xs text-muted-2">
                      {plan.deadline}
                    </p>

                    {plan.maintenancePrice != null && (
                      <p className="border-t border-line pt-2 text-center text-xs text-muted-2">
                        Manutenção opcional:{' '}
                        <span className="font-medium text-muted">
                          R$ {plan.maintenancePrice}/mês
                        </span>
                      </p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="animate-fade-in mt-8 text-center text-sm text-muted-2" style={{ animationDelay: '500ms' }}>
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

      </Container>
    </Section>
  );
}

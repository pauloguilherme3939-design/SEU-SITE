import { saasOffer } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Section } from '@/components/ui';

/* ── Feature icon ───────────────────────────────────────── */
function Dot() {
  return (
    <span className="mt-[7px] flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Saas() {
  const waUrl = buildWhatsAppUrl(
    'Olá, Paulo! Vi que você também desenvolve soluções sob medida e tenho uma ideia de sistema/SaaS para conversar.',
  );

  return (
    <Section anchorId="sistemas" className="bg-bg">
      <Container>

        {/* Outer card */}
        <div className="animate-fade-up relative overflow-hidden rounded-[var(--radius-lg)] border border-line-hi" style={{ animationDelay: '60ms' }}>

          {/* Background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse 70% 80% at 100% 50%, rgba(232,200,122,0.07) 0%, transparent 60%)',
                'radial-gradient(ellipse 50% 50% at 0% 50%, rgba(45,212,141,0.05) 0%, transparent 60%)',
                'var(--card)',
              ].join(','),
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
          />
          {/* Top accent line */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,200,122,0.5) 40%, rgba(45,212,141,0.4) 60%, transparent)' }}
          />

          <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-2">

            {/* ── Left: description ───────────────────────── */}
            <div className="p-8 sm:p-12 lg:border-r lg:border-line">

              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.2.53 3.1L6 8l-2.78 1.6.53-3.1L1.5 4.3l3.1-.5L6 1z"
                    fill="currentColor" />
                </svg>
                Desenvolvimento sob medida
              </span>

              <h2
                className="font-display font-bold text-ink text-balance"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
              >
                Você tem uma ideia de sistema ou SaaS?
              </h2>

              <p className="mt-5 leading-relaxed text-muted">
                Além de sites, também desenvolvo{' '}
                <strong className="font-semibold text-ink">MicroSaaS, painéis, automações, sistemas de cadastro, áreas de membros, integrações com WhatsApp e soluções digitais sob medida</strong>{' '}
                para transformar uma ideia em produto.
              </p>

              <p className="mt-4 leading-relaxed text-muted">{saasOffer.note}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={waUrl}
                  variant="secondary"
                  size="md"
                  leadingIcon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M8 1.5a6.5 6.5 0 100 13A6.5 6.5 0 008 1.5zM8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                >
                  Tenho uma ideia de sistema
                </Button>
                <Button href={waUrl} variant="ghost" size="md">
                  Tirar dúvidas
                </Button>
              </div>

            </div>

            {/* ── Right: pricing card ──────────────────────── */}
            <div className="flex items-center p-8 sm:p-12">
              <div className="w-full">

                {/* Card */}
                <div className="rounded-[var(--radius)] border border-line bg-bg-soft p-7">

                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-5">
                    {saasOffer.name}
                  </p>

                  {/* Price label */}
                  <div className="mb-8 rounded-[var(--radius-sm)] border border-accent/20 bg-accent/8 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-accent">Orçamento sob consulta</p>
                    <p className="mt-0.5 text-xs text-muted-2">Cada projeto é avaliado individualmente</p>
                  </div>

                  {/* Features */}
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                    O que posso desenvolver
                  </p>
                  <ul className="space-y-3">
                    {saasOffer.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted">
                        <Dot />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Divider + CTA */}
                  <div className="mt-8 border-t border-line pt-6">
                    <Button href={waUrl} variant="secondary" size="md" fullWidth>
                      Quero um orçamento
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-2">
                      Resposta em até 24h · Sem compromisso
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </Container>
    </Section>
  );
}

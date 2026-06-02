import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { nichos } from '@/data/faq';
import { plans } from '@/data/plans';
import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  buildMetadata,
  jsonLdOrganization,
  jsonLdService,
  jsonLdBreadcrumbs,
  serializeJsonLd,
} from '@/lib/seo';
import Portfolio from '@/components/sections/Portfolio';
import FormularioOrcamento from '@/components/sections/FormularioOrcamento';
import { Button, Container } from '@/components/ui';

/* ── Grain texture (performance: data URI, no network request) */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ── Inline icons ──────────────────────────────────────────── */
function CheckCircle() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function XCircle() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function WhatsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
    </svg>
  );
}

/* ── Trust items ───────────────────────────────────────────── */
const trust = [
  { label: 'Site no ar em até 3 dias' },
  { label: '100% adaptado ao celular' },
  { label: 'Aparece no Google' },
  { label: 'Suporte pelo WhatsApp' },
];

/* ── Static generation ─────────────────────────────────────── */
export function generateStaticParams() {
  return nichos.map((n) => ({ nicho: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { nicho: string };
}): Metadata {
  const nicho = nichos.find((n) => n.slug === params.nicho);
  if (!nicho) return {};

  return buildMetadata({
    title: `${nicho.h1} | ${site.name}`,
    description: nicho.intro,
    path: `/para/${nicho.slug}`,
  });
}

/* ── Page ──────────────────────────────────────────────────── */
export default function NichoPage({ params }: { params: { nicho: string } }) {
  const nicho = nichos.find((n) => n.slug === params.nicho);
  if (!nicho) notFound();

  const plan = plans.find((p) => p.id === nicho.recommendedPlan) ?? plans[1];

  const waMsg = `Olá! Trabalho com ${nicho.profissao.toLowerCase()} e quero criar um site profissional. Pode me ajudar? 🚀`;
  const waPlanMsg = `Olá! Me interessa o plano ${plan.name} (${plan.priceLabel}) para ${nicho.profissao.toLowerCase()}. Pode me ajudar?`;
  const waUrl = buildWhatsAppUrl(waMsg);
  const waPlanUrl = buildWhatsAppUrl(waPlanMsg);

  const ld = serializeJsonLd([
    jsonLdOrganization(),
    jsonLdService(plan),
    jsonLdBreadcrumbs([
      { name: 'Início', url: '/' },
      { name: nicho.profissao },
    ]),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <div className="bg-bg text-ink" style={{ fontFamily: 'var(--font-body)' }}>

        {/* ── Minimal header ──────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-lg">
          <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="font-display font-bold text-xl text-ink tracking-tight hover:text-accent transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {site.name}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whats px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.5)] transition-all hover:brightness-110"
            >
              <WhatsIcon size={17} />
              Falar no WhatsApp
            </a>
          </div>
        </header>

        {/* ── Hero ────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden px-6 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24"
          aria-label="Apresentação"
        >
          {/* Bg layers */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,141,0.13) 0%, transparent 65%)',
                'radial-gradient(ellipse 55% 80% at 100% 100%, rgba(45,212,141,0.05) 0%, transparent 60%)',
                'var(--bg)',
              ].join(','),
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.14]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.032]"
            style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-32"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
          />

          <Container size="md">
            <div className="relative mx-auto max-w-2xl text-center">

              {/* Segment badge */}
              <div
                className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent"
                style={{ animationDelay: '0ms' }}
              >
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Para {nicho.profissao}
              </div>

              {/* H1 */}
              <h1
                className="animate-fade-up font-display font-extrabold text-ink text-balance"
                style={{
                  fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
                  letterSpacing: '-0.035em',
                  lineHeight: '1.08',
                  fontFamily: 'var(--font-display)',
                  animationDelay: '60ms',
                }}
              >
                {nicho.h1}
              </h1>

              {/* Intro */}
              <p
                className="animate-fade-up mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
                style={{ animationDelay: '130ms' }}
              >
                {nicho.intro}
              </p>

              {/* CTAs */}
              <div
                className="animate-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                style={{ animationDelay: '200ms' }}
              >
                <Button href={waUrl} variant="whats" size="lg" leadingIcon={<WhatsIcon size={18} />}>
                  Quero meu site agora
                </Button>
                <Button href="#plano" variant="ghost" size="lg">
                  Ver o plano ideal
                </Button>
              </div>

              {/* Trust strip */}
              <div
                className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
                style={{ animationDelay: '280ms' }}
              >
                {trust.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-2"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                      <path d="M1.5 5.5l2.5 2.5 5.5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Pain / Gain ─────────────────────────────────── */}
        <section
          className="bg-bg-soft px-6 py-16 sm:px-8 sm:py-24"
          aria-label="Problemas e soluções"
        >
          <Container size="md">
            <div className="mb-10 text-center">
              <h2
                className="animate-fade-up font-display font-bold text-ink"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.2',
                  fontFamily: 'var(--font-display)',
                  animationDelay: '60ms',
                }}
              >
                Muda tudo quando você tem um site profissional
              </h2>
            </div>

            <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* VS connector — desktop */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--line-hi) 20%, var(--line-hi) 80%, transparent)' }}
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-bg-soft px-2.5 py-1 text-xs font-bold text-muted-2 lg:block"
              >
                VS
              </div>

              {/* Dores */}
              <div className="animate-slide-right rounded-[var(--radius)] border border-danger/15 bg-[rgba(255,122,122,0.03)] p-7" style={{ animationDelay: '80ms' }}>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-danger/70">
                  Sem site profissional
                </p>
                <ul className="space-y-4">
                  {nicho.dores.map((dor) => (
                    <li key={dor} className="flex items-start gap-3 text-sm text-muted">
                      <XCircle />
                      <span>{dor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefícios */}
              <div className="animate-slide-left rounded-[var(--radius)] border border-line-hi bg-accent/[0.03] p-7" style={{ animationDelay: '80ms' }}>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">
                  Com seu site no ar
                </p>
                <ul className="space-y-4">
                  {nicho.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Recommended plan ────────────────────────────── */}
        <section id="plano" className="bg-bg px-6 py-16 sm:px-8 sm:py-24" aria-label="Plano recomendado">
          <Container size="sm">

            {/* Header */}
            <div className="animate-fade-up mb-10 text-center" style={{ animationDelay: '60ms' }}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                Recomendado para você
              </p>
              <h2
                className="font-display font-bold text-ink"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.2',
                  fontFamily: 'var(--font-display)',
                }}
              >
                O plano ideal para {nicho.profissao.toLowerCase()}
              </h2>
            </div>

            {/* Plan card */}
            <div
              className="animate-fade-up relative overflow-hidden rounded-[var(--radius-lg)] border border-accent/40 bg-card-hi shadow-[0_32px_100px_-30px_rgba(45,212,141,0.2)]"
              style={{ animationDelay: '120ms' }}
            >
              {/* Top accent line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.7) 40%, rgba(45,212,141,0.7) 60%, transparent)' }}
              />

              {/* Badge */}
              <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg px-3 py-1 text-xs font-semibold text-accent">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Plano recomendado
                </span>
              </div>

              <div className="p-8 pt-10 sm:p-10 sm:pt-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

                  {/* Left: info */}
                  <div>
                    <p
                      className="font-display font-bold text-ink"
                      style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}
                    >
                      {plan.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{plan.forWho}</p>

                    {/* Price */}
                    <div className="mt-6 flex items-end gap-2">
                      <span
                        className="font-display font-extrabold text-ink"
                        style={{
                          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                          letterSpacing: '-0.04em',
                          lineHeight: '1',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {plan.priceLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-2">{plan.paymentNote}</p>

                    {/* Deadline + maintenance */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-medium text-muted">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        {plan.deadline}
                      </span>
                      {plan.maintenancePrice != null && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-medium text-muted">
                          Manutenção R$ {plan.maintenancePrice}/mês
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: features */}
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                      O que está incluído
                    </p>
                    <ul className="space-y-3">
                      {plan.features
                        .filter((f) => f.included)
                        .map((f) => (
                          <li key={f.label} className="flex items-start gap-3 text-sm text-muted">
                            <CheckCircle />
                            <span>{f.label}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 border-t border-line pt-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button href={waPlanUrl} variant="whats" size="lg" leadingIcon={<WhatsIcon size={18} />}>
                      Quero o {plan.name}
                    </Button>
                    <p className="text-xs text-muted-2">
                      Resposta em até 1h · Sem compromisso
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-muted-2">
                    Prefere outro plano?{' '}
                    <Link href="/#planos" className="text-accent hover:underline underline-offset-2">
                      Compare todos os planos →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

          </Container>
        </section>

        {/* ── Portfolio ────────────────────────────────────── */}
        <Portfolio />

        {/* ── Lead form ────────────────────────────────────── */}
        <FormularioOrcamento
          planoPreSelecionado={nicho.recommendedPlan}
          segmentoPreenchido={nicho.profissao}
          origemSuffix={nicho.slug}
        />

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section className="bg-bg-soft px-6 py-20 sm:px-8 sm:py-28" aria-label="Chamada para ação final">
          <Container size="sm">
            <div
              className="animate-fade-up relative overflow-hidden rounded-[var(--radius-lg)] border border-line-hi text-center"
              style={{ animationDelay: '60ms' }}
            >
              {/* Bg */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: [
                    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,141,0.14) 0%, transparent 60%)',
                    'var(--card-hi)',
                  ].join(','),
                }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.12]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.6) 40%, rgba(45,212,141,0.6) 60%, transparent)' }}
              />

              <div className="relative px-8 py-14 sm:px-14 sm:py-20">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  Vamos começar?
                </p>
                <h2
                  className="font-display font-extrabold text-ink text-balance"
                  style={{
                    fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Seu site profissional no ar em até 3 dias
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted">
                  Você me passa as informações sobre seu negócio, eu entrego tudo configurado e funcionando.
                </p>

                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button href={waUrl} variant="whats" size="lg" leadingIcon={<WhatsIcon size={18} />}>
                    Quero meu site agora
                  </Button>
                  <Button href="/#planos" variant="ghost" size="lg">
                    Ver todos os planos
                  </Button>
                </div>

                {/* Trust pills */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {['Domínio incluso', 'Sem mensalidade', 'Entrega em até 3 dias', 'Suporte pelo WhatsApp'].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-4 py-1.5 text-xs font-medium text-muted"
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <path d="M1.5 5.5l2.5 2.5 5.5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Minimal footer ───────────────────────────────── */}
        <footer className="border-t border-line bg-bg px-6 py-8 text-center text-xs text-muted-2">
          <p>
            {site.name} · {new Date().getFullYear()} ·{' '}
            <Link href="/" className="hover:text-accent transition-colors underline-offset-2 hover:underline">
              Voltar para o início
            </Link>
          </p>
        </footer>

        {/* ── WhatsApp FAB ─────────────────────────────────── */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whats shadow-[0_8px_32px_-8px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 active:scale-95"
        >
          <WhatsIcon size={26} />
        </a>

      </div>
    </>
  );
}

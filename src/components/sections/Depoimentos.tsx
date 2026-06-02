import Image from 'next/image';
import { realTestimonials } from '@/data/testimonials';
import { plans } from '@/data/plans';
import { Container, Section } from '@/components/ui';

/* Seção renderiza SOMENTE se houver depoimentos com real:true.
   Array vazio → null (sem rastro no DOM). */

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Avaliação 5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path
            d="M6.5 1l1.4 2.85L11 4.45l-2.25 2.2.53 3.1L6.5 8.25 3.72 9.75l.53-3.1L2 4.45l3.1-.6L6.5 1z"
            fill="var(--gold)"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-hi bg-accent/10 text-sm font-bold text-accent"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export default function Depoimentos() {
  if (realTestimonials.length === 0) return null;

  const colClass =
    realTestimonials.length === 1
      ? 'mx-auto max-w-md'
      : realTestimonials.length === 2
        ? 'mx-auto grid max-w-2xl gap-5 sm:grid-cols-2'
        : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <Section anchorId="depoimentos" className="bg-bg">
      <Container>

        {/* Header */}
        <div
          className="animate-fade-up mx-auto mb-12 max-w-xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Depoimentos
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: '1.15',
            }}
          >
            O que os clientes dizem
          </h2>
          <p className="mt-4 text-muted">
            Resultados reais de quem saiu do zero e colocou o negócio no mapa.
          </p>
        </div>

        {/* Grid */}
        <div className={colClass}>
          {realTestimonials.map((t, i) => {
            const planName = t.plan
              ? plans.find((p) => p.id === t.plan)?.name
              : undefined;

            return (
              <article
                key={`${t.name}-${i}`}
                className="animate-fade-up flex flex-col gap-4 rounded-[var(--radius)] border border-line bg-card p-6 transition-all duration-200 hover:border-accent/25 hover:bg-card-hi"
                style={{ animationDelay: `${80 + i * 70}ms` }}
              >
                <Stars />

                <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <footer className="flex items-center gap-3">
                  <Avatar name={t.name} src={t.avatar} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                    <p className="truncate text-xs text-muted-2">{t.role}</p>
                  </div>
                  {planName && (
                    <span className="ml-auto shrink-0 rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-[10px] font-medium text-muted-2">
                      {planName}
                    </span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>

      </Container>
    </Section>
  );
}

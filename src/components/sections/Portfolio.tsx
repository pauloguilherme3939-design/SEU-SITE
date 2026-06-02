import Image from 'next/image';
import { portfolio } from '@/data/portfolio';
import type { PortfolioItem } from '@/types';
import { Container, Section } from '@/components/ui';

/* ── Accent theme map (strings completos para Tailwind JIT) */
const CARD: Record<PortfolioItem['accent'], {
  border: string;
  thumbBg: string;
  iconColor: string;
  tagDot: string;
  linkColor: string;
}> = {
  green: {
    border: 'border-accent/25 hover:border-accent/50',
    thumbBg: 'from-accent/20 via-accent/10 to-transparent',
    iconColor: 'text-accent',
    tagDot: 'bg-accent',
    linkColor: 'text-accent hover:text-accent-2',
  },
  amber: {
    border: 'border-amber-400/25 hover:border-amber-400/50',
    thumbBg: 'from-amber-400/20 via-amber-400/10 to-transparent',
    iconColor: 'text-amber-400',
    tagDot: 'bg-amber-400',
    linkColor: 'text-amber-400 hover:text-amber-300',
  },
  gold: {
    border: 'border-gold/25 hover:border-gold/50',
    thumbBg: 'from-gold/20 via-gold/10 to-transparent',
    iconColor: 'text-gold',
    tagDot: 'bg-gold',
    linkColor: 'text-gold hover:text-yellow-300',
  },
};

/* ── Browser chrome mock ─────────────────────────────────── */
function BrowserMock({ accent, name, image }: { accent: PortfolioItem['accent']; name: string; image?: string }) {
  const theme = CARD[accent];
  return (
    <div className={`mb-5 overflow-hidden rounded-[var(--radius-sm)] border border-line bg-bg-soft`}>
      {/* Bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-card px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger/40" />
        <span className="h-2 w-2 rounded-full bg-gold/40" />
        <span className="h-2 w-2 rounded-full bg-accent/40" />
        <div className="ml-2 h-2 flex-1 rounded-full bg-card-hi" />
      </div>
      {/* Preview area */}
      <div className={`relative aspect-[16/9] overflow-hidden ${image ? '' : `flex items-center justify-center bg-gradient-to-br ${theme.thumbBg}`}`}>
        {image ? (
          <Image
            src={image}
            alt={`Print do projeto ${name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <>
            <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-20" />
            <div className={`relative flex flex-col items-center gap-2 ${theme.iconColor} opacity-40`}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect x="2" y="4" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 28h12M16 24v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium tracking-wide">{name}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Arrow icon ──────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <Section anchorId="portfolio" className="bg-bg">
      <Container>

        {/* Header */}
        <div className="animate-fade-up mx-auto mb-12 max-w-xl text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Portfólio
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
          >
            Exemplos do meu trabalho
          </h2>
          <p className="mt-4 text-muted">
            Projetos, páginas e sistemas que mostram minha capacidade de criar soluções digitais profissionais.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item, i) => {
            const theme = CARD[item.accent];
            return (
              <article
                key={item.id}
                className={`animate-fade-up group relative flex flex-col rounded-[var(--radius)] border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-card-hi hover:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.42)] ${theme.border}`}
                style={{ animationDelay: `${80 + i * 80}ms` }}
              >
                {/* Browser mock thumbnail */}
                <BrowserMock accent={item.accent} name={item.name} image={item.image} />

                {/* Meta row */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-2">{item.type}</span>
                  {item.demo && (
                    <span className="rounded-full border border-line bg-card-hi px-2.5 py-0.5 text-[11px] font-semibold text-muted-2">
                      Projeto demonstrativo
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-ink mb-2 leading-snug">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-xs text-muted-2"
                    >
                      <span className={`h-1 w-1 rounded-full shrink-0 ${theme.tagDot}`} aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA link — stretched link: o ::after cobre o card inteiro */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${theme.linkColor} after:absolute after:inset-0 after:z-10 after:rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
                >
                  {item.demo
                    ? 'Ver projeto demonstrativo'
                    : 'Ver projeto no ar'}
                  <ArrowRight />
                </a>

              </article>
            );
          })}
        </div>

        {/* Note about demos */}
        <p className="animate-fade-in mt-8 text-center text-xs text-muted-2" style={{ animationDelay: '400ms' }}>
          Projetos marcados como <strong className="font-medium text-muted">demonstrativos</strong> são
          amostras de design e não representam negócios reais.
        </p>

      </Container>
    </Section>
  );
}

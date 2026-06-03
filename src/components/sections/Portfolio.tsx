import Image from 'next/image';
import { portfolio } from '@/data/portfolio';
import type { PortfolioItem } from '@/types';
import { Container, Section } from '@/components/ui';

/* ── Accent theme map ─────────────────────────────────────── */
const CARD: Record<PortfolioItem['accent'], {
  border: string;
  grad: string;
  line: string;
  dot: string;
  block: string;
  linkColor: string;
  tagDot: string;
}> = {
  green: {
    border:    'border-accent/25 hover:border-accent/50',
    grad:      'from-accent/20 via-accent/8 to-transparent',
    line:      'bg-accent/40',
    dot:       'bg-accent',
    block:     'bg-accent/15',
    linkColor: 'text-accent hover:text-accent-2',
    tagDot:    'bg-accent',
  },
  amber: {
    border:    'border-amber-400/25 hover:border-amber-400/50',
    grad:      'from-amber-400/20 via-amber-400/8 to-transparent',
    line:      'bg-amber-400/40',
    dot:       'bg-amber-400',
    block:     'bg-amber-400/15',
    linkColor: 'text-amber-400 hover:text-amber-300',
    tagDot:    'bg-amber-400',
  },
  gold: {
    border:    'border-gold/25 hover:border-gold/50',
    grad:      'from-gold/20 via-gold/8 to-transparent',
    line:      'bg-gold/40',
    dot:       'bg-gold',
    block:     'bg-gold/15',
    linkColor: 'text-gold hover:text-yellow-300',
    tagDot:    'bg-gold',
  },
};

/* ── Wireframe placeholder ─────────────────────────────────── */
function WireframeMock({
  theme,
  hostname,
  name,
}: {
  theme: typeof CARD[PortfolioItem['accent']];
  hostname: string;
  name: string;
}) {
  return (
    <div className={`relative flex flex-col gap-0 overflow-hidden bg-gradient-to-br ${theme.grad}`}>
      {/* Simulated nav */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <div className={`h-2 w-2 rounded-full ${theme.dot} opacity-70`} aria-hidden />
        <div className="h-1.5 w-12 rounded-full bg-white/10" aria-hidden />
        <div className="flex gap-2 ml-auto">
          {[28, 20, 24].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: w }} aria-hidden />
          ))}
        </div>
        <div className={`h-5 w-12 rounded-full ${theme.block}`} aria-hidden />
      </div>

      {/* Hero area */}
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4">
        <div className="flex flex-col gap-2">
          <div className={`h-2.5 w-4/5 rounded-full ${theme.line} opacity-60`} aria-hidden />
          <div className={`h-2.5 w-3/5 rounded-full ${theme.line} opacity-40`} aria-hidden />
          <div className={`h-2 w-2/3 rounded-full bg-white/10`} aria-hidden />
          <div className={`h-2 w-1/2 rounded-full bg-white/8`} aria-hidden />
        </div>
        <div className="flex gap-2 mt-1">
          <div className={`h-6 w-20 rounded-full ${theme.dot} opacity-80`} aria-hidden />
          <div className={`h-6 w-16 rounded-full bg-white/10`} aria-hidden />
        </div>
      </div>

      {/* Feature blocks */}
      <div className="grid grid-cols-3 gap-2 px-5 pb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`rounded-lg border border-white/8 ${theme.block} p-3 flex flex-col gap-2`} aria-hidden>
            <div className={`h-4 w-4 rounded-full ${theme.dot} opacity-60`} />
            <div className="h-1.5 w-full rounded-full bg-white/15" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2.5 right-3 text-[9px] font-medium tracking-widest uppercase text-white/20 select-none">
        {name}
      </div>
    </div>
  );
}

/* ── Browser chrome mock ─────────────────────────────────── */
function BrowserMock({
  accent, name, type, image, url,
}: {
  accent: PortfolioItem['accent'];
  name: string;
  type: string;
  image?: string;
  url: string;
}) {
  const theme = CARD[accent];
  let hostname = url;
  try { hostname = new URL(url).hostname.replace(/^www\./, ''); } catch { /* keep original */ }

  return (
    <div className="mb-5 overflow-hidden rounded-[var(--radius-sm)] border border-line bg-bg-soft">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-card px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger/40" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-gold/40" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-accent/40" aria-hidden />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-full bg-card-hi px-2.5 py-1">
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 opacity-40">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M6 1.5a5.5 5.5 0 010 9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="truncate text-[9px] font-medium text-muted-2 leading-none">{hostname}</span>
        </div>
      </div>

      {/* Preview area */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`Print do projeto ${name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <WireframeMock theme={theme} hostname={hostname} name={name} />
        )}

        {/* Hover overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-bg/72 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 lg:group-hover:opacity-100"
        >
          <p className="font-display text-sm font-bold text-ink">{name}</p>
          <p className="text-[11px] text-muted-2">{type}</p>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/80 px-3 py-1.5 text-xs font-semibold text-ink">
            Ver projeto
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
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
            Capacidade técnica na prática
          </h2>
          <p className="mt-4 text-muted">
            Projetos reais que mostram o nível de execução — de landing pages a sistemas completos.
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
                <BrowserMock
                  accent={item.accent}
                  name={item.name}
                  type={item.type}
                  image={item.image}
                  url={item.url}
                />

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

                {/* CTA — stretched link cobre o card inteiro */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${theme.linkColor} after:absolute after:inset-0 after:z-10 after:rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
                >
                  {item.demo ? 'Ver projeto demonstrativo' : 'Ver projeto no ar'}
                  <ArrowRight />
                </a>

              </article>
            );
          })}
        </div>

      </Container>
    </Section>
  );
}

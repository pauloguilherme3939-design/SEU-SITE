import Link from 'next/link';
import { site } from '@/data/site';

const navLinks = [
  { label: 'Planos',        href: '/#planos' },
  { label: 'Portfólio',     href: '/#portfolio' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Dúvidas',       href: '/#duvidas' },
  { label: 'Blog',          href: '/blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-bg-soft py-12 sm:py-16">
      {/* Subtle top accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,141,0.22) 40%, rgba(45,212,141,0.22) 60%, transparent)' }}
      />

      <div className="mx-auto max-w-content px-6 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="rounded-sm font-display text-xl font-bold text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-soft"
            >
              {site.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">{site.tagline}</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links do rodapé">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Trust signals — tech stack, pagamentos, segurança */}
        <div className="mt-10 grid grid-cols-2 gap-3 border-t border-line pt-8 sm:grid-cols-4 sm:gap-4">
          {/* Stack técnica */}
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-accent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 11l3-3 3 3M5 8l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">Next.js + Vercel</p>
              <p className="mt-0.5 text-[11px] text-muted-2">Stack das maiores empresas do mundo</p>
            </div>
          </div>

          {/* Segurança SSL */}
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-accent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="8" cy="10.5" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">SSL · HTTPS</p>
              <p className="mt-0.5 text-[11px] text-muted-2">Site seguro com cadeado verde</p>
            </div>
          </div>

          {/* Pagamentos */}
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-accent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2 7h12" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="5" cy="10.5" r="0.7" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">Pix · Cartão</p>
              <p className="mt-0.5 text-[11px] text-muted-2">À vista ou parcelado, à sua escolha</p>
            </div>
          </div>

          {/* LGPD */}
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-accent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 2l5 2v4c0 3-2.2 5.6-5 6.5C5.2 13.6 3 11 3 8V4l5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M5.5 8l2 2 3-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">LGPD</p>
              <p className="mt-0.5 text-[11px] text-muted-2">Em conformidade com a Lei de Proteção de Dados</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. Todos os direitos reservados.{' '}
            <a
              href="/politica-de-privacidade"
              className="underline-offset-2 transition-colors hover:text-muted hover:underline"
            >
              Política de Privacidade
            </a>
          </span>

          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

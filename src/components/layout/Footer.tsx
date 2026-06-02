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

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
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

import Link from 'next/link';
import { site } from '@/data/site';

const navLinks = [
  { label: 'Planos', href: '/#planos' },
  { label: 'Portfólio', href: '/#portfolio' },
  { label: 'Sistemas', href: '/#sistemas' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Dúvidas', href: '/#duvidas' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-soft py-12 sm:py-16">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="max-w-xs">
            <Link href="/" className="font-display font-bold text-xl text-ink hover:text-accent transition-colors">
              {site.name}
            </Link>
            <p className="mt-2 text-sm text-muted">{site.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links do rodapé">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-2">
          <span>
            © {year} {site.name}. Todos os direitos reservados.
          </span>
          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

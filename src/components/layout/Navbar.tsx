'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui';

const navLinks = [
  { label: 'Planos', href: '/#planos' },
  { label: 'Portfólio', href: '/#portfolio' },
  { label: 'Sistemas', href: '/#sistemas' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Dúvidas', href: '/#duvidas' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = buildWhatsAppUrl(site.whatsappDefaultMessage);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-bg/85 backdrop-blur-lg border-b border-line shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 sm:px-8 h-16">
        <Link
          href="/"
          className="rounded-sm font-display font-bold text-xl text-ink tracking-tight transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {site.name}
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-card-hi hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={waUrl} variant="whats" size="sm">
            Falar no WhatsApp
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-ink transition-colors hover:bg-card-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M2 4.5H16M2 9H16M2 13.5H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg/95 px-6 py-5 flex flex-col gap-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card-hi hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-line mt-2">
            <Button href={waUrl} variant="whats" size="md" fullWidth>
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

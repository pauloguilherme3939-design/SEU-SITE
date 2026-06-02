'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui';

const navLinks = [
  { label: 'Planos',        href: '/#planos' },
  { label: 'Portfólio',     href: '/#portfolio' },
  { label: 'Sistemas',      href: '/#sistemas' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Dúvidas',       href: '/#duvidas' },
  { label: 'Blog',          href: '/blog' },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [open,           setOpen]           = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ───────────── */
  useEffect(() => {
    const ids = navLinks
      .filter(l => l.href.startsWith('/#'))
      .map(l => l.href.slice(2));

    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px -52% 0px' },
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const waUrl = buildWhatsAppUrl(site.whatsappDefaultMessage);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-bg/85 shadow-sm backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="rounded-sm font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {navLinks.map(link => {
            const sectionId = link.href.startsWith('/#') ? link.href.slice(2) : null;
            const isActive  = !!sectionId && sectionId === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:bg-card-hi hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href={waUrl} variant="whats" size="sm">
            Falar no WhatsApp
          </Button>
        </div>

        <button
          onClick={() => setOpen(v => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-card-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line bg-bg/95 px-6 py-5 backdrop-blur-md md:hidden">
          {navLinks.map(link => {
            const sectionId = link.href.startsWith('/#') ? link.href.slice(2) : null;
            const isActive  = !!sectionId && sectionId === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:bg-card-hi hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mt-2 border-t border-line pt-3">
            <Button href={waUrl} variant="whats" size="md" fullWidth>
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import { useEffect } from 'react';

/**
 * Ativa animações somente quando o elemento entra no viewport.
 * Elementos abaixo do fold ficam ocultos até serem alcançados pelo scroll.
 * Sem impacto em elementos above-the-fold (hero não é afetado).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const CLASSES = [
      'animate-fade-up',
      'animate-fade-in',
      'animate-slide-right',
      'animate-slide-left',
    ];
    const sel = CLASSES.map(c => `.${c}`).join(',');
    const all = Array.from(document.querySelectorAll<HTMLElement>(sel));
    if (!all.length) return;

    const vh = window.innerHeight;
    const pending: HTMLElement[] = [];

    all.forEach(el => {
      // Só oculta elementos que ainda não estão visíveis
      if (el.getBoundingClientRect().top > vh * 0.9) {
        const isSlidRight = el.classList.contains('animate-slide-right');
        const isSlidLeft  = el.classList.contains('animate-slide-left');

        el.style.opacity      = '0';
        el.style.transform    = isSlidRight ? 'translateX(-18px)'
                              : isSlidLeft  ? 'translateX(18px)'
                              :               'translateY(22px)';
        el.style.animationName = 'none';
        el.style.willChange   = 'opacity, transform';
        pending.push(el);
      }
    });

    if (!pending.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          // Preserva o stagger original do animationDelay do componente
          const ms = parseInt(el.style.animationDelay || '0', 10) || 0;

          setTimeout(() => {
            el.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity    = '1';
            el.style.transform  = 'none';
            setTimeout(() => {
              el.style.transition  = '';
              el.style.willChange  = '';
            }, 700);
          }, ms);

          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    );

    pending.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

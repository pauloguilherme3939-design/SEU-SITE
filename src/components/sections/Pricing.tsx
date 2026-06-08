'use client';

import { useRef, type ReactNode } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackPlanSelect } from '@/lib/analytics';
import { Container, Section } from '@/components/ui';

/* ── Icons ───────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" />
    </svg>
  );
}

/* ── Tier config ─────────────────────────────────────────────── */
const TIER_NUMBER: Record<string, number> = {
  prata: 1, ouro: 2, platina: 3, diamante: 4,
};

const CTA_COLOR: Record<string, { bg: string; text: string; glow: string }> = {
  prata:    { bg: 'linear-gradient(135deg, #3e5060 0%, #58707e 50%, #486070 100%)',              text: '#dde6f0', glow: 'rgba(148,163,184,0.52)' },
  ouro:     { bg: 'linear-gradient(135deg, #a07010 0%, #c98a0e 35%, #e8a812 65%, #c47c08 100%)', text: '#120a00', glow: 'rgba(234,179,8,0.68)'   },
  platina:  { bg: 'linear-gradient(135deg, #0777b0 0%, #0ea5e9 45%, #38bdf8 78%, #0898d8 100%)', text: '#fff',    glow: 'rgba(14,165,233,0.60)'  },
  diamante: { bg: 'linear-gradient(135deg, #5222a8 0%, #7c3aed 45%, #9333ea 78%, #6328c0 100%)', text: '#fff',    glow: 'rgba(124,58,237,0.68)'  },
};

/* ── Pre-computed SVG emblems (crystal-heraldic system) ──────── */
const EMBLEMS: Record<string, string> = {
  prata: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Prata"><defs><linearGradient id="w-prata" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#76828f"/><stop offset=".5" stop-color="#c3cdd7"/><stop offset="1" stop-color="#f7fafc"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#w-prata)" stroke="#76828f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -10 L74 -13 L42 -2 L0 -2 Z"/><path d="M0 -2 L60 5 L36 11 L0 9 Z"/></g><g transform="translate(100,67)" fill="url(#w-prata)" stroke="#76828f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -10 L74 -13 L42 -2 L0 -2 Z"/><path d="M0 -2 L60 5 L36 11 L0 9 Z"/></g><g fill="url(#w-prata)" stroke="#f7fafc" stroke-width=".5" stroke-linejoin="round"><path d="M100 32 L103 18 L100 12 L97 18 Z M92 35 L89 25 L87 23 L91 34 Z M108 35 L111 25 L113 23 L109 34 Z"/></g><path d="M100 70 L100.0 38.0 L116.6 50.0 Z" fill="#eaf0f5"/><path d="M100 70 L116.6 50.0 L124.4 66.0 Z" fill="#f7fafc"/><path d="M100 70 L124.4 66.0 L118.6 88.6 Z" fill="#c3cdd7"/><path d="M100 70 L118.6 88.6 L100.0 110.6 Z" fill="#c3cdd7"/><path d="M100 70 L100.0 110.6 L81.4 88.6 Z" fill="#8b97a3"/><path d="M100 70 L81.4 88.6 L75.6 66.0 Z" fill="#76828f"/><path d="M100 70 L75.6 66.0 L83.4 50.0 Z" fill="#8b97a3"/><path d="M100 70 L83.4 50.0 L100.0 38.0 Z" fill="#c3cdd7"/><path d="M100.0 59.1 L105.6 63.2 L108.3 68.6 L106.3 76.3 L100.0 83.8 L93.7 76.3 L91.7 68.6 L94.4 63.2 Z" fill="#eaf0f5" opacity=".5" stroke="#f7fafc" stroke-width=".5"/><g stroke="#f7fafc" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 38.0 M100 70 L116.6 50.0 M100 70 L124.4 66.0 M100 70 L118.6 88.6 M100 70 L100.0 110.6 M100 70 L81.4 88.6 M100 70 L75.6 66.0 M100 70 L83.4 50.0"/></g><path d="M100.0 38.0 L116.6 50.0 L124.4 66.0 L118.6 88.6 L100.0 110.6 L81.4 88.6 L75.6 66.0 L83.4 50.0 Z" fill="none" stroke="#f7fafc" stroke-width="1.32" stroke-linejoin="round"/><path d="M103.0 47.0 L114.6 51.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 51.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  ouro: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Ouro"><defs><linearGradient id="w-ouro" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6c1f"/><stop offset=".5" stop-color="#ecc05a"/><stop offset="1" stop-color="#ffe6a0"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#w-ouro)" stroke="#9a6c1f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L84 -16 L46 -3 L0 -3 Z"/><path d="M0 -3 L70 3 L40 9 L0 6 Z"/><path d="M0 6 L54 13 L30 18 L0 15 Z"/></g><g transform="translate(100,67)" fill="url(#w-ouro)" stroke="#9a6c1f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L84 -16 L46 -3 L0 -3 Z"/><path d="M0 -3 L70 3 L40 9 L0 6 Z"/><path d="M0 6 L54 13 L30 18 L0 15 Z"/></g><g fill="url(#w-ouro)" stroke="#ffe6a0" stroke-width=".5" stroke-linejoin="round"><path d="M100 31 L104 14 L100 7 L96 14 Z M90 34 L86 22 L84 19 L90 33 Z M110 34 L114 22 L116 19 L110 33 Z"/></g><path d="M100 70 L100.0 35.0 L118.2 46.0 Z" fill="#ffd873"/><path d="M100 70 L118.2 46.0 L126.8 66.0 Z" fill="#ffe6a0"/><path d="M100 70 L126.8 66.0 L120.2 90.2 Z" fill="#ecc05a"/><path d="M100 70 L120.2 90.2 L100.0 112.2 Z" fill="#ecc05a"/><path d="M100 70 L100.0 112.2 L79.8 90.2 Z" fill="#b07f2c"/><path d="M100 70 L79.8 90.2 L73.2 66.0 Z" fill="#9a6c1f"/><path d="M100 70 L73.2 66.0 L81.8 46.0 Z" fill="#b07f2c"/><path d="M100 70 L81.8 46.0 L100.0 35.0 Z" fill="#ecc05a"/><path d="M100.0 58.1 L106.2 61.8 L109.1 68.6 L106.9 76.9 L100.0 84.3 L93.1 76.9 L90.9 68.6 L93.8 61.8 Z" fill="#ffd873" opacity=".5" stroke="#ffe6a0" stroke-width=".5"/><g stroke="#ffe6a0" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 35.0 M100 70 L118.2 46.0 M100 70 L126.8 66.0 M100 70 L120.2 90.2 M100 70 L100.0 112.2 M100 70 L79.8 90.2 M100 70 L73.2 66.0 M100 70 L81.8 46.0"/></g><path d="M100.0 35.0 L118.2 46.0 L126.8 66.0 L120.2 90.2 L100.0 112.2 L79.8 90.2 L73.2 66.0 L81.8 46.0 Z" fill="none" stroke="#ffe6a0" stroke-width="1.44" stroke-linejoin="round"/><path d="M103.0 44.0 L116.2 47.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 48.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  platina: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Platina"><defs><linearGradient id="w-platina" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a7fb8"/><stop offset=".5" stop-color="#54c9e4"/><stop offset="1" stop-color="#cdf6ff"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#w-platina)" stroke="#2a7fb8" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L92 -23 L50 -4 L0 -4 Z"/><path d="M0 -4 L76 -6 L44 6 L0 5 Z"/><path d="M0 5 L58 11 L34 17 L0 14 Z"/></g><g transform="translate(100,67)" fill="url(#w-platina)" stroke="#2a7fb8" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L92 -23 L50 -4 L0 -4 Z"/><path d="M0 -4 L76 -6 L44 6 L0 5 Z"/><path d="M0 5 L58 11 L34 17 L0 14 Z"/></g><g fill="url(#w-platina)" stroke="#cdf6ff" stroke-width=".5" stroke-linejoin="round"><path d="M100 31 L103 12 L100 5 L97 12 Z M89 34 L85 20 L82 17 L90 33 Z M111 34 L115 20 L118 17 L110 33 Z"/></g><path d="M100 70 L100.0 32.0 L119.8 42.0 Z" fill="#8fe2f3"/><path d="M100 70 L119.8 42.0 L129.2 66.0 Z" fill="#cdf6ff"/><path d="M100 70 L129.2 66.0 L121.8 91.8 Z" fill="#54c9e4"/><path d="M100 70 L121.8 91.8 L100.0 113.8 Z" fill="#54c9e4"/><path d="M100 70 L100.0 113.8 L78.2 91.8 Z" fill="#2f93c8"/><path d="M100 70 L78.2 91.8 L70.8 66.0 Z" fill="#2a7fb8"/><path d="M100 70 L70.8 66.0 L80.2 42.0 Z" fill="#2f93c8"/><path d="M100 70 L80.2 42.0 L100.0 32.0 Z" fill="#54c9e4"/><path d="M100.0 57.1 L106.7 60.5 L109.9 68.6 L107.4 77.4 L100.0 84.9 L92.6 77.4 L90.1 68.6 L93.3 60.5 Z" fill="#8fe2f3" opacity=".5" stroke="#cdf6ff" stroke-width=".5"/><path d="M100.0 45.7 L112.7 52.1 L118.7 67.4 L114.0 84.0 L100.0 98.0 L86.0 84.0 L81.3 67.4 L87.3 52.1 Z" fill="none" stroke="#cdf6ff" stroke-width=".5" opacity=".3"/><g stroke="#cdf6ff" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 32.0 M100 70 L119.8 42.0 M100 70 L129.2 66.0 M100 70 L121.8 91.8 M100 70 L100.0 113.8 M100 70 L78.2 91.8 M100 70 L70.8 66.0 M100 70 L80.2 42.0"/></g><path d="M100.0 32.0 L119.8 42.0 L129.2 66.0 L121.8 91.8 L100.0 113.8 L78.2 91.8 L70.8 66.0 L80.2 42.0 Z" fill="none" stroke="#cdf6ff" stroke-width="1.56" stroke-linejoin="round"/><path d="M103.0 41.0 L117.8 43.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 45.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  diamante: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Diamante"><defs><linearGradient id="w-diamante" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a4ce0"/><stop offset=".5" stop-color="#ab84f0"/><stop offset="1" stop-color="#e9ddff"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#w-diamante)" stroke="#5a4ce0" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -14 L98 -27 L52 -5 L0 -5 Z"/><path d="M0 -5 L84 -13 L48 4 L0 3 Z"/><path d="M0 3 L68 3 L40 12 L0 11 Z"/><path d="M0 11 L52 17 L30 23 L0 20 Z"/></g><g transform="translate(100,67)" fill="url(#w-diamante)" stroke="#5a4ce0" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -14 L98 -27 L52 -5 L0 -5 Z"/><path d="M0 -5 L84 -13 L48 4 L0 3 Z"/><path d="M0 3 L68 3 L40 12 L0 11 Z"/><path d="M0 11 L52 17 L30 23 L0 20 Z"/></g><g fill="url(#w-diamante)" stroke="#e9ddff" stroke-width=".5" stroke-linejoin="round"><path d="M100 30 L104 9 L100 2 L96 9 Z M88 34 L83 18 L80 15 L90 32 Z M112 34 L117 18 L120 15 L110 32 Z M79 41 L75 31 L73 29 L80 39 Z M121 41 L125 31 L127 29 L120 39 Z"/></g><path d="M100 70 L100.0 29.0 L121.4 38.0 Z" fill="#c8aef7"/><path d="M100 70 L121.4 38.0 L131.6 66.0 Z" fill="#e9ddff"/><path d="M100 70 L131.6 66.0 L123.4 93.4 Z" fill="#ab84f0"/><path d="M100 70 L123.4 93.4 L100.0 115.4 Z" fill="#ab84f0"/><path d="M100 70 L100.0 115.4 L76.6 93.4 Z" fill="#7a5cf0"/><path d="M100 70 L76.6 93.4 L68.4 66.0 Z" fill="#5a4ce0"/><path d="M100 70 L68.4 66.0 L78.6 38.0 Z" fill="#7a5cf0"/><path d="M100 70 L78.6 38.0 L100.0 29.0 Z" fill="#ab84f0"/><path d="M100.0 56.1 L107.3 59.1 L110.7 68.6 L108.0 78.0 L100.0 85.4 L92.0 78.0 L89.3 68.6 L92.7 59.1 Z" fill="#c8aef7" opacity=".5" stroke="#e9ddff" stroke-width=".5"/><path d="M100.0 43.8 L113.7 49.5 L120.2 67.4 L115.0 85.0 L100.0 99.1 L85.0 85.0 L79.8 67.4 L86.3 49.5 Z" fill="none" stroke="#e9ddff" stroke-width=".5" opacity=".3"/><g stroke="#e9ddff" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 29.0 M100 70 L121.4 38.0 M100 70 L131.6 66.0 M100 70 L123.4 93.4 M100 70 L100.0 115.4 M100 70 L76.6 93.4 M100 70 L68.4 66.0 M100 70 L78.6 38.0"/></g><path d="M100.0 29.0 L121.4 38.0 L131.6 66.0 L123.4 93.4 L100.0 115.4 L76.6 93.4 L68.4 66.0 L78.6 38.0 Z" fill="none" stroke="#e9ddff" stroke-width="1.68" stroke-linejoin="round"/><path d="M103.0 38.0 L119.4 39.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 42.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/><path d="M105.0 78.0 L102.0 101.4" stroke="#fff" stroke-width=".8" opacity=".3" stroke-linecap="round"/></svg>`,
};

/* ── Pre-computed ornamental frame SVGs (corner + crest) ─────── */
const ORNAMENTS: Record<string, string> = {
  prata: `<svg class="oc tl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#f2f7fb" stroke-width="2.30" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#f2f7fb"/><rect x="10" y="10" width="10" height="10" rx="2" transform="rotate(45 15 15)" fill="#f2f7fb"/></svg><svg class="oc tr" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#f2f7fb" stroke-width="2.30" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#f2f7fb"/><rect x="10" y="10" width="10" height="10" rx="2" transform="rotate(45 15 15)" fill="#f2f7fb"/></svg><svg class="oc bl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#f2f7fb" stroke-width="2.30" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#f2f7fb"/><rect x="10" y="10" width="10" height="10" rx="2" transform="rotate(45 15 15)" fill="#f2f7fb"/></svg><svg class="oc br" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#f2f7fb" stroke-width="2.30" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#b9c4cf" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#f2f7fb"/><rect x="10" y="10" width="10" height="10" rx="2" transform="rotate(45 15 15)" fill="#f2f7fb"/></svg><svg class="crest-top" viewBox="0 0 110 28" aria-hidden="true"><path d="M55 4 L63 14 L55 24 L47 14 Z" fill="#f2f7fb"/><path d="M47 14 L16 14 M63 14 L94 14" stroke="#b9c4cf" stroke-width="1.5" stroke-linecap="round"/><path d="M26 9 L16 14 L26 19 M84 9 L94 14 L84 19" fill="none" stroke="#f2f7fb" stroke-width="1.4" stroke-linejoin="round"/><circle cx="55" cy="14" r="1.7" fill="#fff" opacity=".75"/></svg><svg class="crest-bot" viewBox="0 0 200 48" aria-hidden="true"><g transform="translate(100,19) scale(-1,1)" fill="#b9c4cf" stroke="#f2f7fb" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 4 L42 0 L26 11 L0 11 Z"/></g><g transform="translate(100,19)" fill="#b9c4cf" stroke="#f2f7fb" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 4 L42 0 L26 11 L0 11 Z"/></g><path d="M100 5 L111 19 L100 33 L89 19 Z" fill="#f2f7fb" stroke="#7c8896" stroke-width=".6"/><path d="M100 5 L100 33 M89 19 L111 19" stroke="#7c8896" stroke-width=".5" opacity=".5"/><path d="M100 5 L94 19 L100 33 Z" fill="#fff" opacity=".15"/></svg>`,

  ouro: `<svg class="oc tl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#ffe9a6" stroke-width="2.60" stroke-linecap="round"/><path d="M92 16 L44 16 M16 92 L16 44" stroke="#ecc05a" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#ffe9a6"/><rect x="10" y="10" width="11" height="11" rx="2" transform="rotate(45 15.5 15.5)" fill="#ffe9a6"/></svg><svg class="oc tr" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#ffe9a6" stroke-width="2.60" stroke-linecap="round"/><path d="M92 16 L44 16 M16 92 L16 44" stroke="#ecc05a" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#ffe9a6"/><rect x="10" y="10" width="11" height="11" rx="2" transform="rotate(45 15.5 15.5)" fill="#ffe9a6"/></svg><svg class="oc bl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#ffe9a6" stroke-width="2.60" stroke-linecap="round"/><path d="M92 16 L44 16 M16 92 L16 44" stroke="#ecc05a" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#ffe9a6"/><rect x="10" y="10" width="11" height="11" rx="2" transform="rotate(45 15.5 15.5)" fill="#ffe9a6"/></svg><svg class="oc br" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#ffe9a6" stroke-width="2.60" stroke-linecap="round"/><path d="M92 16 L44 16 M16 92 L16 44" stroke="#ecc05a" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ecc05a" stroke-width="1.4" opacity=".85"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#ffe9a6"/><rect x="10" y="10" width="11" height="11" rx="2" transform="rotate(45 15.5 15.5)" fill="#ffe9a6"/></svg><svg class="crest-top" viewBox="0 0 110 28" aria-hidden="true"><path d="M55 4 L63 14 L55 24 L47 14 Z" fill="#ffe9a6"/><path d="M47 14 L16 14 M63 14 L94 14" stroke="#ecc05a" stroke-width="1.5" stroke-linecap="round"/><path d="M26 9 L16 14 L26 19 M84 9 L94 14 L84 19" fill="none" stroke="#ffe9a6" stroke-width="1.4" stroke-linejoin="round"/><circle cx="55" cy="14" r="1.7" fill="#fff" opacity=".75"/></svg><svg class="crest-bot" viewBox="0 0 200 48" aria-hidden="true"><g transform="translate(100,19) scale(-1,1)" fill="#ecc05a" stroke="#ffe9a6" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 3 L46 -2 L28 9 L0 9 Z"/><path d="M0 9 L34 13 L20 19 L0 17 Z"/></g><g transform="translate(100,19)" fill="#ecc05a" stroke="#ffe9a6" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 3 L46 -2 L28 9 L0 9 Z"/><path d="M0 9 L34 13 L20 19 L0 17 Z"/></g><path d="M100 5 L111 19 L100 33 L89 19 Z" fill="#ffe9a6" stroke="#b07f2c" stroke-width=".6"/><path d="M100 5 L100 33 M89 19 L111 19" stroke="#b07f2c" stroke-width=".5" opacity=".5"/><path d="M100 5 L94 19 L100 33 Z" fill="#fff" opacity=".15"/></svg>`,

  platina: `<svg class="oc tl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#bdf1fb" stroke-width="2.90" stroke-linecap="round"/><path d="M92 16 L40 16 M16 92 L16 40" stroke="#54c9e4" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#bdf1fb"/><rect x="10" y="10" width="12" height="12" rx="2" transform="rotate(45 16 16)" fill="#bdf1fb"/></svg><svg class="oc tr" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#bdf1fb" stroke-width="2.90" stroke-linecap="round"/><path d="M92 16 L40 16 M16 92 L16 40" stroke="#54c9e4" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#bdf1fb"/><rect x="10" y="10" width="12" height="12" rx="2" transform="rotate(45 16 16)" fill="#bdf1fb"/></svg><svg class="oc bl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#bdf1fb" stroke-width="2.90" stroke-linecap="round"/><path d="M92 16 L40 16 M16 92 L16 40" stroke="#54c9e4" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#bdf1fb"/><rect x="10" y="10" width="12" height="12" rx="2" transform="rotate(45 16 16)" fill="#bdf1fb"/></svg><svg class="oc br" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#bdf1fb" stroke-width="2.90" stroke-linecap="round"/><path d="M92 16 L40 16 M16 92 L16 40" stroke="#54c9e4" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#54c9e4" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#54c9e4" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#bdf1fb"/><rect x="10" y="10" width="12" height="12" rx="2" transform="rotate(45 16 16)" fill="#bdf1fb"/></svg><svg class="em eml" viewBox="0 0 24 54" aria-hidden="true"><path d="M12 6 L19 27 L12 48 L5 27 Z" fill="#54c9e4" stroke="#bdf1fb" stroke-width="1"/><path d="M12 14 L12 40" stroke="#bdf1fb" stroke-width=".5" opacity=".5"/><path d="M12 6 L15 27 L12 48" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/></svg><svg class="em emr" viewBox="0 0 24 54" aria-hidden="true"><path d="M12 6 L19 27 L12 48 L5 27 Z" fill="#54c9e4" stroke="#bdf1fb" stroke-width="1"/><path d="M12 14 L12 40" stroke="#bdf1fb" stroke-width=".5" opacity=".5"/><path d="M12 6 L15 27 L12 48" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/></svg><svg class="crest-bot" viewBox="0 0 200 48" aria-hidden="true"><path d="M64 32 L100 25 L136 32 L100 42 Z" fill="#54c9e4" opacity=".2"/><g transform="translate(100,19) scale(-1,1)" fill="#54c9e4" stroke="#bdf1fb" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 2 L52 -6 L30 8 L0 8 Z"/><path d="M0 8 L38 11 L22 18 L0 16 Z"/></g><g transform="translate(100,19)" fill="#54c9e4" stroke="#bdf1fb" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 2 L52 -6 L30 8 L0 8 Z"/><path d="M0 8 L38 11 L22 18 L0 16 Z"/></g><path d="M100 5 L111 19 L100 33 L89 19 Z" fill="#bdf1fb" stroke="#2a82bd" stroke-width=".6"/><path d="M100 5 L100 33 M89 19 L111 19" stroke="#2a82bd" stroke-width=".5" opacity=".5"/><path d="M100 5 L94 19 L100 33 Z" fill="#fff" opacity=".15"/></svg>`,

  diamante: `<svg class="oc tl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#e3d2ff" stroke-width="3.20" stroke-linecap="round"/><path d="M92 16 L36 16 M16 92 L16 36" stroke="#ab84f0" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#e3d2ff"/><rect x="10" y="10" width="13" height="13" rx="2" transform="rotate(45 16.5 16.5)" fill="#e3d2ff"/></svg><svg class="oc tr" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#e3d2ff" stroke-width="3.20" stroke-linecap="round"/><path d="M92 16 L36 16 M16 92 L16 36" stroke="#ab84f0" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#e3d2ff"/><rect x="10" y="10" width="13" height="13" rx="2" transform="rotate(45 16.5 16.5)" fill="#e3d2ff"/></svg><svg class="oc bl" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#e3d2ff" stroke-width="3.20" stroke-linecap="round"/><path d="M92 16 L36 16 M16 92 L16 36" stroke="#ab84f0" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#e3d2ff"/><rect x="10" y="10" width="13" height="13" rx="2" transform="rotate(45 16.5 16.5)" fill="#e3d2ff"/></svg><svg class="oc br" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="#e3d2ff" stroke-width="3.20" stroke-linecap="round"/><path d="M92 16 L36 16 M16 92 L16 36" stroke="#ab84f0" stroke-width="1.1" opacity=".55" stroke-linecap="round"/><path d="M27 10 Q48 13 40 33" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="#ab84f0" stroke-width="1.4" opacity=".85"/><path d="M42 9 Q63 15 54 35" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="#ab84f0" stroke-width="1.1" opacity=".55"/><path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="#e3d2ff"/><rect x="10" y="10" width="13" height="13" rx="2" transform="rotate(45 16.5 16.5)" fill="#e3d2ff"/></svg><svg class="em eml" viewBox="0 0 24 54" aria-hidden="true"><path d="M12 6 L19 27 L12 48 L5 27 Z" fill="#ab84f0" stroke="#e3d2ff" stroke-width="1"/><path d="M12 14 L12 40" stroke="#e3d2ff" stroke-width=".5" opacity=".5"/><path d="M12 6 L15 27 L12 48" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/></svg><svg class="em emr" viewBox="0 0 24 54" aria-hidden="true"><path d="M12 6 L19 27 L12 48 L5 27 Z" fill="#ab84f0" stroke="#e3d2ff" stroke-width="1"/><path d="M12 14 L12 40" stroke="#e3d2ff" stroke-width=".5" opacity=".5"/><path d="M12 6 L15 27 L12 48" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/></svg><svg class="crest-bot" viewBox="0 0 200 48" aria-hidden="true"><path d="M64 32 L100 25 L136 32 L100 42 Z" fill="#ab84f0" opacity=".2"/><g transform="translate(100,19) scale(-1,1)" fill="#ab84f0" stroke="#e3d2ff" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 1 L54 -7 L32 7 L0 7 Z"/><path d="M0 7 L42 7 L24 15 L0 14 Z"/><path d="M0 14 L30 18 L16 23 L0 21 Z"/></g><g transform="translate(100,19)" fill="#ab84f0" stroke="#e3d2ff" stroke-width=".6" stroke-linejoin="round" opacity=".96"><path d="M0 1 L54 -7 L32 7 L0 7 Z"/><path d="M0 7 L42 7 L24 15 L0 14 Z"/><path d="M0 14 L30 18 L16 23 L0 21 Z"/></g><path d="M100 5 L111 19 L100 33 L89 19 Z" fill="#e3d2ff" stroke="#6a73ef" stroke-width=".6"/><path d="M100 5 L100 33 M89 19 L111 19" stroke="#6a73ef" stroke-width=".5" opacity=".5"/><path d="M100 5 L94 19 L100 33 Z" fill="#fff" opacity=".15"/></svg>`,
};

/* ── Tier-styled CTA ─────────────────────────────────────────── */
function TierCTA({ href, tier, onClick, children }: {
  href: string;
  tier: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const c = CTA_COLOR[tier] ?? CTA_COLOR.prata;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={[
        'tier-cta-link',
        'inline-flex items-center justify-center gap-2',
        'w-full h-11 px-5 text-[15px]',
        'font-display font-semibold rounded-full',
        'transition-all duration-200 active:scale-[0.98] hover:brightness-110',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
      ].join(' ')}
      style={{
        background:  c.bg,
        color:       c.text,
        boxShadow:  `0 10px 30px -10px ${c.glow}`,
      }}
    >
      {children}
    </a>
  );
}

/* ── TierCard — individual card with spotlight + frame ───────── */
function TierCard({ plan, i }: { plan: typeof plans[number]; i: number }) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const t = plan.tier ?? 'prata';
  const hasBadge = !!(plan.highlight || plan.tagline);
  const tierNum = TIER_NUMBER[t] ?? 1;

  const waUrl = buildWhatsAppUrl(
    `Olá! Tenho interesse no plano ${plan.name} (${plan.tierLabel ?? ''}) de ${plan.priceLabel}. Pode me ajudar?`,
  );

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
    const my = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
    if (spotlightRef.current) {
      spotlightRef.current.style.backgroundImage =
        `radial-gradient(circle at ${mx} ${my}, var(--tier-${t}-glow) 0%, transparent 62%)`;
      spotlightRef.current.style.opacity = '1';
    }
  }

  function handlePointerLeave() {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  }

  return (
    <article
      aria-label={`Plano ${plan.name} — ${plan.tierLabel}`}
      data-featured={plan.featured ? 'true' : 'false'}
      className={[
        'animate-fade-up relative flex flex-col',
        'rounded-[var(--radius)] transition-all duration-300',
        `tier-${t}`,
        plan.highlight ? 'sm:ring-1 sm:ring-[rgba(56,189,248,0.18)] xl:scale-[1.035] xl:z-10' : '',
      ].join(' ')}
      style={{
        animationDelay: `${80 + i * 70}ms`,
        background:    `var(--tier-${t}-bg)`,
        border:        `1px solid var(--tier-${t}-border)`,
        boxShadow:     `var(--tier-${t}-shadow)`,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor =
          `var(--tier-${t}-border-hover)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor =
          `var(--tier-${t}-border)`;
      }}
    >

      {/* ── Cursor spotlight layer ───────────────────────── */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius)]"
        style={{ opacity: 0, transition: 'opacity 0.35s', zIndex: 1 }}
      />

      {/* ── Ornamental frame (corners + crests) ─────────── */}
      <div
        aria-hidden
        className="tier-frame pointer-events-none absolute inset-0 rounded-[var(--radius)]"
        style={{ overflow: 'visible', zIndex: 2 }}
        dangerouslySetInnerHTML={{ __html: ORNAMENTS[t] ?? '' }}
      />

      {/* ── Metallic top bar ──────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[var(--radius)]"
        style={{
          background: `var(--tier-${t}-bar)`,
          height:     `var(--tier-${t}-bar-h)`,
          zIndex: 3,
        }}
      />

      {/* ── Inner top glow ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[var(--radius)]"
        style={{
          background: `radial-gradient(ellipse 100% 55% at 50% 0%, var(--tier-${t}-glow) 0%, transparent 70%)`,
          height: 130,
          zIndex: 3,
        }}
      />

      {/* ── Floating badge — Platina (featured) ──────────── */}
      {plan.highlight && plan.tagline && (
        <div
          aria-hidden
          className="absolute inset-x-0 -top-[18px] flex justify-center"
          style={{ zIndex: 10 }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-[5px] text-[11px] font-bold tracking-wide"
            style={{
              background:  `var(--tier-${t}-seal)`,
              border:      `1px solid var(--tier-${t}-seal-border)`,
              color:       `var(--tier-${t}-text)`,
              boxShadow:   `0 0 22px -4px var(--tier-${t}-glow), 0 4px 14px -4px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.08)`,
              textShadow:  `0 0 12px var(--tier-${t}-glow)`,
              letterSpacing: '0.06em',
            }}
          >
            ✦ {plan.tagline}
          </span>
        </div>
      )}

      {/* ── Floating badge — Diamante (topo) ─────────────── */}
      {!plan.highlight && plan.tagline && (
        <div
          aria-hidden
          className="absolute inset-x-0 -top-[14px] flex justify-center"
          style={{ zIndex: 10 }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-[4px] text-[10px] font-semibold uppercase tracking-[0.10em]"
            style={{
              background: `var(--tier-${t}-seal)`,
              border:     `1px solid var(--tier-${t}-seal-border)`,
              color:      `var(--tier-${t}-text)`,
              boxShadow:  `0 0 18px -4px var(--tier-${t}-glow), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            {plan.tagline}
          </span>
        </div>
      )}

      {/* ── Card body ─────────────────────────────────────── */}
      <div
        className={`relative flex flex-col flex-1 p-6 ${hasBadge ? 'pt-8' : ''}`}
        style={{ zIndex: 4 }}
      >

        {/* Emblem row — SVG emblem + tier label */}
        <div className="mb-5 flex items-center gap-3">
          {/* Crystal-heraldic emblem */}
          <div
            className="tier-emblem-wrap relative shrink-0"
            style={{ width: 58, height: 46 }}
            dangerouslySetInnerHTML={{ __html: EMBLEMS[t] ?? '' }}
            aria-hidden
          />
          {/* Tier meta */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[9px] font-black uppercase tracking-[0.14em] px-1.5 py-0.5 rounded"
                style={{
                  background: `var(--tier-${t}-seal)`,
                  color:      `var(--tier-${t}-text)`,
                  border:     `1px solid var(--tier-${t}-seal-border)`,
                  letterSpacing: '0.14em',
                }}
              >
                TIER {tierNum}
              </span>
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.11em]"
              style={{ color: `var(--tier-${t}-text)` }}
            >
              {plan.tierLabel}
            </span>
          </div>
        </div>

        {/* Plan name */}
        <p
          className="mb-1.5 font-display font-bold leading-snug text-ink"
          style={{ fontSize: '1.05rem' }}
        >
          {plan.name}
        </p>

        {/* For who */}
        <p className="mb-5 text-sm leading-relaxed text-muted">
          {plan.forWho}
        </p>

        {/* Price — gradient text bright→mid (legivel em fundo escuro) */}
        <div className="mb-1 flex items-baseline gap-1">
          <span
            className="font-display font-extrabold leading-none"
            style={{
              fontSize:        'clamp(1.75rem, 3vw, 2.25rem)',
              letterSpacing:   '-0.03em',
              backgroundImage: `linear-gradient(180deg, var(--tier-${t}-bright) 0%, var(--tier-${t}-mid) 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip:  'text',
              color:           'transparent',
              filter:          `drop-shadow(0 2px 14px var(--tier-${t}-glow))`,
            }}
          >
            {plan.priceLabel}
          </span>
        </div>
        <p className="mb-5 text-xs text-muted-2">{plan.paymentNote}</p>

        {/* Features */}
        <ul
          className="mb-5 flex-1 space-y-2"
          aria-label={`Recursos do ${plan.name}`}
        >
          {plan.features.map(f => {
            if (f.label.includes('Tudo do')) {
              return (
                <li key={f.label} className="my-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-px flex-1"
                      style={{ background: `var(--tier-${t}-border)` }}
                    />
                    <span
                      className="shrink-0 text-[10px] font-bold uppercase tracking-[0.09em]"
                      style={{ color: `var(--tier-${t}-text)`, opacity: 0.85 }}
                    >
                      {f.label}
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{ background: `var(--tier-${t}-border)` }}
                    />
                  </div>
                </li>
              );
            }

            return (
              <li key={f.label} className="flex items-start gap-2.5 text-sm">
                <span
                  className={[
                    'mt-[3px] flex shrink-0 items-center justify-center rounded-full',
                    f.included ? '' : 'bg-card-hi text-muted-2',
                  ].join(' ')}
                  style={{
                    width: 17, height: 17, minWidth: 17,
                    ...(f.included ? {
                      background: `var(--tier-${t}-glow)`,
                      color:      `var(--tier-${t}-text)`,
                    } : {}),
                  }}
                  aria-hidden
                >
                  {f.included ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    f.included
                      ? 'text-muted'
                      : 'text-muted-2 line-through decoration-muted-2/30'
                  }
                >
                  {f.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Bonuses */}
        {plan.bonuses && plan.bonuses.length > 0 && (
          <div
            className="mb-6 rounded-[var(--radius-sm)] p-3"
            style={{
              background:   `linear-gradient(135deg, var(--tier-${t}-glow), rgba(0,0,0,0.20) 55%)`,
              borderTop:    `1px solid var(--tier-${t}-border)`,
              borderRight:  `1px solid var(--tier-${t}-border)`,
              borderBottom: `1px solid var(--tier-${t}-border)`,
              borderLeft:   `2px solid var(--tier-${t}-text)`,
            }}
          >
            <p
              className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.09em]"
              style={{ color: `var(--tier-${t}-text)` }}
            >
              <span aria-hidden>🎁</span>
              Bônus inclusos
            </p>
            <ul
              className="space-y-1.5"
              aria-label={`Bônus do ${plan.name}`}
            >
              {plan.bonuses.map(b => (
                <li key={b} className="flex items-start gap-2 text-xs text-muted">
                  <span
                    className="mt-[2px] shrink-0 text-[9px]"
                    style={{ color: `var(--tier-${t}-text)`, opacity: 0.9 }}
                    aria-hidden
                  >
                    ✦
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA + footer */}
        <div className="space-y-2.5">
          <TierCTA
            href={waUrl}
            tier={t}
            onClick={() => trackPlanSelect({
              planId: plan.id,
              planName: plan.name,
              tier: t,
              price: plan.price,
            })}
          >
            {plan.ctaLabel}
          </TierCTA>

          <p className="text-center text-xs text-muted-2">
            {plan.deadline}
          </p>

          <p className="text-center text-xs text-muted-2">
            Ideal para:{' '}
            <span className="font-medium text-muted">{plan.idealFor}</span>
          </p>

          {plan.maintenancePrice != null && (
            <p className="border-t border-[rgba(255,255,255,0.07)] pt-2.5 text-center text-xs text-muted-2">
              Manutenção opcional:{' '}
              <span className="font-medium text-muted">
                R$ {plan.maintenancePrice}/mês
              </span>
            </p>
          )}
        </div>

      </div>
    </article>
  );
}

/* ── Pricing ─────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <Section anchorId="planos">
      {/* Tier frame CSS — scoped to avoid leaking globally */}
      <style>{`
        .tier-frame .oc {
          position: absolute;
          width: 52px;
          height: 52px;
          pointer-events: none;
          opacity: 0.62;
        }
        .tier-frame .oc.tl { top: -1px; left: -1px; }
        .tier-frame .oc.tr { top: -1px; right: -1px; transform: scaleX(-1); }
        .tier-frame .oc.bl { bottom: -1px; left: -1px; transform: scaleY(-1); }
        .tier-frame .oc.br { bottom: -1px; right: -1px; transform: scale(-1,-1); }
        .tier-frame .em {
          position: absolute;
          width: 9px;
          height: 26px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          opacity: 0.65;
        }
        .tier-frame .em.eml { left: -2px; }
        .tier-frame .em.emr { right: -2px; }
        .tier-frame .crest-top {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          pointer-events: none;
          opacity: 0.72;
        }
        .tier-frame .crest-bot {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          pointer-events: none;
          opacity: 0.65;
        }
        article:hover .tier-frame .oc,
        article:hover .tier-frame .em,
        article:hover .tier-frame .crest-top,
        article:hover .tier-frame .crest-bot {
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        /* CTA sheen sweep — linha luminosa que desliza no hover */
        article .tier-cta-link {
          position: relative;
          overflow: hidden;
        }
        article .tier-cta-link::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent);
          transform: skewX(-18deg);
          transition: left 0.7s ease;
          pointer-events: none;
        }
        article:hover .tier-cta-link::after {
          left: 130%;
        }

        /* Autosheen on featured tier (Platina) */
        article[data-featured="true"] .tier-cta-link::after {
          animation: autosheen 5s ease-in-out infinite;
        }
        article[data-featured="true"]:hover .tier-cta-link::after {
          animation: none;
          left: 130%;
        }
        @keyframes autosheen {
          0%, 100% { left: -60%; }
          50%      { left: 130%; }
        }

        /* Variável --c-rgb por tier (cascata para animações compartilhadas) */
        article.tier-prata    { --c-rgb: var(--tier-prata-rgb); }
        article.tier-ouro     { --c-rgb: var(--tier-ouro-rgb); }
        article.tier-platina  { --c-rgb: var(--tier-platina-rgb); }
        article.tier-diamante { --c-rgb: var(--tier-diamante-rgb); }

        /* Remove border solid inline quando borda metalica esta ativa */
        article.tier-prata,
        article.tier-ouro,
        article.tier-platina,
        article.tier-diamante {
          border-color: transparent !important;
        }

        /* Metallic gradient border via CSS mask — usa --tier-{name}-rgb */
        article.tier-prata::before,
        article.tier-ouro::before,
        article.tier-platina::before,
        article.tier-diamante::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background-size: 230% 230%;
          background-position: 0% 50%;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          transition: background-position 1.1s ease, opacity 0.4s ease;
          opacity: 0.55;
          z-index: 2;
          pointer-events: none;
        }
        article.tier-prata::before {
          background: linear-gradient(140deg,
            rgba(var(--tier-prata-rgb), 0.95) 0%,
            rgba(var(--tier-prata-rgb), 0.18) 22%,
            rgba(255,255,255,0.55) 40%,
            rgba(var(--tier-prata-rgb), 0.18) 58%,
            rgba(var(--tier-prata-rgb), 0.85) 100%);
        }
        article.tier-ouro::before {
          background: linear-gradient(140deg,
            rgba(var(--tier-ouro-rgb), 0.95) 0%,
            rgba(var(--tier-ouro-rgb), 0.18) 22%,
            rgba(255,255,255,0.55) 40%,
            rgba(var(--tier-ouro-rgb), 0.18) 58%,
            rgba(var(--tier-ouro-rgb), 0.85) 100%);
        }
        article.tier-platina::before {
          background: linear-gradient(140deg,
            rgba(var(--tier-platina-rgb), 0.95) 0%,
            rgba(var(--tier-platina-rgb), 0.18) 22%,
            rgba(255,255,255,0.55) 40%,
            rgba(var(--tier-platina-rgb), 0.18) 58%,
            rgba(var(--tier-platina-rgb), 0.85) 100%);
        }
        article.tier-diamante::before {
          background: linear-gradient(140deg,
            rgba(var(--tier-diamante-rgb), 0.95) 0%,
            rgba(var(--tier-diamante-rgb), 0.18) 22%,
            rgba(255,255,255,0.55) 40%,
            rgba(var(--tier-diamante-rgb), 0.18) 58%,
            rgba(var(--tier-diamante-rgb), 0.85) 100%);
        }
        /* Borda anima no hover (sheen sweep) e ganha opacidade total */
        article.tier-prata:hover::before,
        article.tier-ouro:hover::before,
        article.tier-platina:hover::before,
        article.tier-diamante:hover::before {
          background-position: 100% 50%;
          opacity: 1;
        }
        /* Featured ganha autosheen contínuo na borda */
        article[data-featured="true"]::before {
          opacity: 0.85 !important;
          animation: border-autosheen 7s ease-in-out infinite;
        }
        article[data-featured="true"]:hover::before {
          animation: none;
          background-position: 100% 50%;
        }
        @keyframes border-autosheen {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* Ring spin sutil ao redor do emblema no tier featured */
        article[data-featured="true"] .tier-emblem-wrap {
          position: relative;
        }
        article[data-featured="true"] .tier-emblem-wrap > svg {
          position: relative;
          z-index: 1;
        }
        article[data-featured="true"] .tier-emblem-wrap::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 160%;
          height: 160%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.42;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(var(--c-rgb), 0.55) 40deg,
            transparent 92deg,
            transparent 180deg,
            rgba(var(--c-rgb), 0.38) 222deg,
            transparent 280deg
          );
          -webkit-mask: radial-gradient(closest-side, transparent 54%, #000 57%, #000 70%, transparent 73%);
                  mask: radial-gradient(closest-side, transparent 54%, #000 57%, #000 70%, transparent 73%);
          animation: ring-spin 12s linear infinite;
        }
        @keyframes ring-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <Container>

        {/* ── Header ───────────────────────────────────── */}
        <div
          className="animate-fade-up mx-auto mb-16 max-w-2xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Planos e preços
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              letterSpacing: '-0.025em',
              lineHeight: '1.12',
            }}
          >
            Não pague preço de agência.{' '}
            <span style={{ color: 'var(--accent)' }}>Receba qualidade de agência.</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Pagamento único · sem mensalidade · o site é seu para sempre.{' '}
            <strong className="font-semibold text-ink">
              A partir do Nível Ouro: textos e copy personalizados para o seu público.
            </strong>
          </p>
          {/* Trust bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              'Domínio .com.br incluso',
              'No ar em até 3 dias',
              'Google Search Console',
              'Sem fidelidade',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-xs text-muted-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6l2.5 2.5 5.5-5.5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Cards grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
          {plans.map((plan, i) => (
            <TierCard key={plan.id} plan={plan} i={i} />
          ))}
        </div>

        {/* ── Bottom notes ─────────────────────────────── */}
        <div
          className="animate-fade-in mt-12 space-y-2 text-center"
          style={{ animationDelay: '500ms' }}
        >
          <p className="text-sm text-muted-2">
            Todos os planos incluem hospedagem inicial. Dúvidas?{' '}
            <a
              href={buildWhatsAppUrl('Olá! Tenho dúvidas sobre os planos. Pode me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Fale no WhatsApp
            </a>
            .
          </p>
          <p className="text-xs text-muted-2">
            * Domínio .com.br incluso por 1 ano desde que seja um domínio comum disponível para
            registro. Após o primeiro ano, a renovação fica por conta do cliente (cerca de R$ 40/ano).
          </p>
        </div>

      </Container>
    </Section>
  );
}

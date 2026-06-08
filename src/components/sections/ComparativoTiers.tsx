'use client';

import type { ReactNode } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackPlanSelect } from '@/lib/analytics';
import { Container, Section } from '@/components/ui';

/* ── Tier display config ─────────────────────────────────────── */
const TIER_NUMBER: Record<string, number> = {
  prata: 1, ouro: 2, platina: 3, diamante: 4,
};

/* ── Pre-computed SVG emblems (crystal-heraldic) ─────────────── */
const EMBLEMS: Record<string, string> = {
  prata: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Prata"><defs><linearGradient id="wc-prata" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#76828f"/><stop offset=".5" stop-color="#c3cdd7"/><stop offset="1" stop-color="#f7fafc"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#wc-prata)" stroke="#76828f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -10 L74 -13 L42 -2 L0 -2 Z"/><path d="M0 -2 L60 5 L36 11 L0 9 Z"/></g><g transform="translate(100,67)" fill="url(#wc-prata)" stroke="#76828f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -10 L74 -13 L42 -2 L0 -2 Z"/><path d="M0 -2 L60 5 L36 11 L0 9 Z"/></g><g fill="url(#wc-prata)" stroke="#f7fafc" stroke-width=".5" stroke-linejoin="round"><path d="M100 32 L103 18 L100 12 L97 18 Z M92 35 L89 25 L87 23 L91 34 Z M108 35 L111 25 L113 23 L109 34 Z"/></g><path d="M100 70 L100.0 38.0 L116.6 50.0 Z" fill="#eaf0f5"/><path d="M100 70 L116.6 50.0 L124.4 66.0 Z" fill="#f7fafc"/><path d="M100 70 L124.4 66.0 L118.6 88.6 Z" fill="#c3cdd7"/><path d="M100 70 L118.6 88.6 L100.0 110.6 Z" fill="#c3cdd7"/><path d="M100 70 L100.0 110.6 L81.4 88.6 Z" fill="#8b97a3"/><path d="M100 70 L81.4 88.6 L75.6 66.0 Z" fill="#76828f"/><path d="M100 70 L75.6 66.0 L83.4 50.0 Z" fill="#8b97a3"/><path d="M100 70 L83.4 50.0 L100.0 38.0 Z" fill="#c3cdd7"/><path d="M100.0 59.1 L105.6 63.2 L108.3 68.6 L106.3 76.3 L100.0 83.8 L93.7 76.3 L91.7 68.6 L94.4 63.2 Z" fill="#eaf0f5" opacity=".5" stroke="#f7fafc" stroke-width=".5"/><g stroke="#f7fafc" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 38.0 M100 70 L116.6 50.0 M100 70 L124.4 66.0 M100 70 L118.6 88.6 M100 70 L100.0 110.6 M100 70 L81.4 88.6 M100 70 L75.6 66.0 M100 70 L83.4 50.0"/></g><path d="M100.0 38.0 L116.6 50.0 L124.4 66.0 L118.6 88.6 L100.0 110.6 L81.4 88.6 L75.6 66.0 L83.4 50.0 Z" fill="none" stroke="#f7fafc" stroke-width="1.32" stroke-linejoin="round"/><path d="M103.0 47.0 L114.6 51.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 51.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  ouro: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Ouro"><defs><linearGradient id="wc-ouro" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6c1f"/><stop offset=".5" stop-color="#ecc05a"/><stop offset="1" stop-color="#ffe6a0"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#wc-ouro)" stroke="#9a6c1f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L84 -16 L46 -3 L0 -3 Z"/><path d="M0 -3 L70 3 L40 9 L0 6 Z"/><path d="M0 6 L54 13 L30 18 L0 15 Z"/></g><g transform="translate(100,67)" fill="url(#wc-ouro)" stroke="#9a6c1f" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L84 -16 L46 -3 L0 -3 Z"/><path d="M0 -3 L70 3 L40 9 L0 6 Z"/><path d="M0 6 L54 13 L30 18 L0 15 Z"/></g><g fill="url(#wc-ouro)" stroke="#ffe6a0" stroke-width=".5" stroke-linejoin="round"><path d="M100 31 L104 14 L100 7 L96 14 Z M90 34 L86 22 L84 19 L90 33 Z M110 34 L114 22 L116 19 L110 33 Z"/></g><path d="M100 70 L100.0 35.0 L118.2 46.0 Z" fill="#ffd873"/><path d="M100 70 L118.2 46.0 L126.8 66.0 Z" fill="#ffe6a0"/><path d="M100 70 L126.8 66.0 L120.2 90.2 Z" fill="#ecc05a"/><path d="M100 70 L120.2 90.2 L100.0 112.2 Z" fill="#ecc05a"/><path d="M100 70 L100.0 112.2 L79.8 90.2 Z" fill="#b07f2c"/><path d="M100 70 L79.8 90.2 L73.2 66.0 Z" fill="#9a6c1f"/><path d="M100 70 L73.2 66.0 L81.8 46.0 Z" fill="#b07f2c"/><path d="M100 70 L81.8 46.0 L100.0 35.0 Z" fill="#ecc05a"/><path d="M100.0 58.1 L106.2 61.8 L109.1 68.6 L106.9 76.9 L100.0 84.3 L93.1 76.9 L90.9 68.6 L93.8 61.8 Z" fill="#ffd873" opacity=".5" stroke="#ffe6a0" stroke-width=".5"/><g stroke="#ffe6a0" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 35.0 M100 70 L118.2 46.0 M100 70 L126.8 66.0 M100 70 L120.2 90.2 M100 70 L100.0 112.2 M100 70 L79.8 90.2 M100 70 L73.2 66.0 M100 70 L81.8 46.0"/></g><path d="M100.0 35.0 L118.2 46.0 L126.8 66.0 L120.2 90.2 L100.0 112.2 L79.8 90.2 L73.2 66.0 L81.8 46.0 Z" fill="none" stroke="#ffe6a0" stroke-width="1.44" stroke-linejoin="round"/><path d="M103.0 44.0 L116.2 47.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 48.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  platina: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Platina"><defs><linearGradient id="wc-platina" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a7fb8"/><stop offset=".5" stop-color="#54c9e4"/><stop offset="1" stop-color="#cdf6ff"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#wc-platina)" stroke="#2a7fb8" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L92 -23 L50 -4 L0 -4 Z"/><path d="M0 -4 L76 -6 L44 6 L0 5 Z"/><path d="M0 5 L58 11 L34 17 L0 14 Z"/></g><g transform="translate(100,67)" fill="url(#wc-platina)" stroke="#2a7fb8" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -12 L92 -23 L50 -4 L0 -4 Z"/><path d="M0 -4 L76 -6 L44 6 L0 5 Z"/><path d="M0 5 L58 11 L34 17 L0 14 Z"/></g><g fill="url(#wc-platina)" stroke="#cdf6ff" stroke-width=".5" stroke-linejoin="round"><path d="M100 31 L103 12 L100 5 L97 12 Z M89 34 L85 20 L82 17 L90 33 Z M111 34 L115 20 L118 17 L110 33 Z"/></g><path d="M100 70 L100.0 32.0 L119.8 42.0 Z" fill="#8fe2f3"/><path d="M100 70 L119.8 42.0 L129.2 66.0 Z" fill="#cdf6ff"/><path d="M100 70 L129.2 66.0 L121.8 91.8 Z" fill="#54c9e4"/><path d="M100 70 L121.8 91.8 L100.0 113.8 Z" fill="#54c9e4"/><path d="M100 70 L100.0 113.8 L78.2 91.8 Z" fill="#2f93c8"/><path d="M100 70 L78.2 91.8 L70.8 66.0 Z" fill="#2a7fb8"/><path d="M100 70 L70.8 66.0 L80.2 42.0 Z" fill="#2f93c8"/><path d="M100 70 L80.2 42.0 L100.0 32.0 Z" fill="#54c9e4"/><path d="M100.0 57.1 L106.7 60.5 L109.9 68.6 L107.4 77.4 L100.0 84.9 L92.6 77.4 L90.1 68.6 L93.3 60.5 Z" fill="#8fe2f3" opacity=".5" stroke="#cdf6ff" stroke-width=".5"/><path d="M100.0 45.7 L112.7 52.1 L118.7 67.4 L114.0 84.0 L100.0 98.0 L86.0 84.0 L81.3 67.4 L87.3 52.1 Z" fill="none" stroke="#cdf6ff" stroke-width=".5" opacity=".3"/><g stroke="#cdf6ff" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 32.0 M100 70 L119.8 42.0 M100 70 L129.2 66.0 M100 70 L121.8 91.8 M100 70 L100.0 113.8 M100 70 L78.2 91.8 M100 70 L70.8 66.0 M100 70 L80.2 42.0"/></g><path d="M100.0 32.0 L119.8 42.0 L129.2 66.0 L121.8 91.8 L100.0 113.8 L78.2 91.8 L70.8 66.0 L80.2 42.0 Z" fill="none" stroke="#cdf6ff" stroke-width="1.56" stroke-linejoin="round"/><path d="M103.0 41.0 L117.8 43.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 45.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/></svg>`,

  diamante: `<svg viewBox="0 0 200 158" role="img" aria-label="Emblema Diamante"><defs><linearGradient id="wc-diamante" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a4ce0"/><stop offset=".5" stop-color="#ab84f0"/><stop offset="1" stop-color="#e9ddff"/></linearGradient></defs><g transform="translate(100,67) scale(-1,1)" fill="url(#wc-diamante)" stroke="#5a4ce0" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -14 L98 -27 L52 -5 L0 -5 Z"/><path d="M0 -5 L84 -13 L48 4 L0 3 Z"/><path d="M0 3 L68 3 L40 12 L0 11 Z"/><path d="M0 11 L52 17 L30 23 L0 20 Z"/></g><g transform="translate(100,67)" fill="url(#wc-diamante)" stroke="#5a4ce0" stroke-width=".5" stroke-linejoin="round" opacity=".96"><path d="M0 -14 L98 -27 L52 -5 L0 -5 Z"/><path d="M0 -5 L84 -13 L48 4 L0 3 Z"/><path d="M0 3 L68 3 L40 12 L0 11 Z"/><path d="M0 11 L52 17 L30 23 L0 20 Z"/></g><g fill="url(#wc-diamante)" stroke="#e9ddff" stroke-width=".5" stroke-linejoin="round"><path d="M100 30 L104 9 L100 2 L96 9 Z M88 34 L83 18 L80 15 L90 32 Z M112 34 L117 18 L120 15 L110 32 Z M79 41 L75 31 L73 29 L80 39 Z M121 41 L125 31 L127 29 L120 39 Z"/></g><path d="M100 70 L100.0 29.0 L121.4 38.0 Z" fill="#c8aef7"/><path d="M100 70 L121.4 38.0 L131.6 66.0 Z" fill="#e9ddff"/><path d="M100 70 L131.6 66.0 L123.4 93.4 Z" fill="#ab84f0"/><path d="M100 70 L123.4 93.4 L100.0 115.4 Z" fill="#ab84f0"/><path d="M100 70 L100.0 115.4 L76.6 93.4 Z" fill="#7a5cf0"/><path d="M100 70 L76.6 93.4 L68.4 66.0 Z" fill="#5a4ce0"/><path d="M100 70 L68.4 66.0 L78.6 38.0 Z" fill="#7a5cf0"/><path d="M100 70 L78.6 38.0 L100.0 29.0 Z" fill="#ab84f0"/><path d="M100.0 56.1 L107.3 59.1 L110.7 68.6 L108.0 78.0 L100.0 85.4 L92.0 78.0 L89.3 68.6 L92.7 59.1 Z" fill="#c8aef7" opacity=".5" stroke="#e9ddff" stroke-width=".5"/><path d="M100.0 43.8 L113.7 49.5 L120.2 67.4 L115.0 85.0 L100.0 99.1 L85.0 85.0 L79.8 67.4 L86.3 49.5 Z" fill="none" stroke="#e9ddff" stroke-width=".5" opacity=".3"/><g stroke="#e9ddff" stroke-width=".5" opacity=".4" fill="none"><path d="M100 70 L100.0 29.0 M100 70 L121.4 38.0 M100 70 L131.6 66.0 M100 70 L123.4 93.4 M100 70 L100.0 115.4 M100 70 L76.6 93.4 M100 70 L68.4 66.0 M100 70 L78.6 38.0"/></g><path d="M100.0 29.0 L121.4 38.0 L131.6 66.0 L123.4 93.4 L100.0 115.4 L76.6 93.4 L68.4 66.0 L78.6 38.0 Z" fill="none" stroke="#e9ddff" stroke-width="1.68" stroke-linejoin="round"/><path d="M103.0 38.0 L119.4 39.0 L104.0 62.0 Z" fill="#fff" opacity=".3"/><path d="M96.0 42.0 L94.0 70.0" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/><path d="M105.0 78.0 L102.0 101.4" stroke="#fff" stroke-width=".8" opacity=".3" stroke-linecap="round"/></svg>`,
};

const CTA_BG: Record<string, string> = {
  prata:    'linear-gradient(135deg, #3e5060 0%, #58707e 50%, #486070 100%)',
  ouro:     'linear-gradient(135deg, #a07010 0%, #c98a0e 35%, #e8a812 65%, #c47c08 100%)',
  platina:  'linear-gradient(135deg, #0777b0 0%, #0ea5e9 45%, #38bdf8 78%, #0898d8 100%)',
  diamante: 'linear-gradient(135deg, #5222a8 0%, #7c3aed 45%, #9333ea 78%, #6328c0 100%)',
};
const CTA_FG: Record<string, string> = {
  prata:    '#dde6f0',
  ouro:     '#120a00',
  platina:  '#fff',
  diamante: '#fff',
};
const CTA_GLOW: Record<string, string> = {
  prata:    'rgba(148,163,184,0.50)',
  ouro:     'rgba(234,179,8,0.65)',
  platina:  'rgba(14,165,233,0.56)',
  diamante: 'rgba(124,58,237,0.60)',
};
const COL_BODY: Record<string, string> = {
  prata:    'rgba(148,163,184,0.05)',
  ouro:     'rgba(234,179,8,0.055)',
  platina:  'rgba(14,165,233,0.06)',
  diamante: 'rgba(124,58,237,0.06)',
};
const COL_HEAD: Record<string, string> = {
  prata:    'rgba(148,163,184,0.10)',
  ouro:     'rgba(234,179,8,0.12)',
  platina:  'rgba(14,165,233,0.14)',
  diamante: 'rgba(124,58,237,0.14)',
};

/* ── Row definitions ─────────────────────────────────────────── */
/* cells order: [prata, ouro, platina, diamante]                  */
/* 'yes' → ✓ verde  |  'no' → — apagado  |  string → texto       */
/* highlight rows = saltos de valor mais relevantes               */
type CellVal = 'yes' | 'no' | string;

interface Row {
  label: string;
  sub?: string;
  highlight?: boolean;
  cells: [CellVal, CellVal, CellVal, CellVal];
}

const ROWS: Row[] = [
  // ── Fundação — presentes em todos os planos
  { label: 'Domínio .com.br incluso', sub: '1 ano de registro grátis',
    cells: ['yes', 'yes', 'yes', 'yes'] },
  { label: 'Site responsivo',         sub: 'perfeito no celular',
    cells: ['yes', 'yes', 'yes', 'yes'] },
  { label: 'Botão de WhatsApp',       sub: 'mensagem pré-pronta',
    cells: ['yes', 'yes', 'yes', 'yes'] },
  { label: 'Publicação no ar',
    cells: ['yes', 'yes', 'yes', 'yes'] },

  // ── Quantidade
  { label: 'Páginas incluídas',       highlight: true,
    cells: ['1 simples', '1 landing page', '1 completa', 'até 5 págs'] },
  { label: 'Rodadas de ajuste',
    cells: ['1 rodada', '1 rodada', '2 rodadas', '2 rodadas'] },

  // ── Qualidade — grande salto a partir do Platina
  { label: 'Textos / copy',           sub: 'escrita persuasiva',   highlight: true,
    cells: ['no', 'no', 'inicial', 'por página'] },
  { label: 'SEO inicial',             sub: 'visibilidade Google',  highlight: true,
    cells: ['no', 'no', 'yes', 'por página'] },
  { label: 'Google Search Console',   sub: '+ indexação manual',   highlight: true,
    cells: ['no', 'no', 'yes', 'yes'] },
  { label: 'Estrutura de conversão',  sub: 'seções que vendem',    highlight: true,
    cells: ['no', 'no', 'yes', 'yes'] },
  { label: 'FAQ no site',             sub: 'quebra objeções',
    cells: ['no', 'yes', 'yes', 'yes'] },
  { label: 'Formulário de contato',
    cells: ['no', 'no', 'no', 'yes'] },
  { label: 'Política de privacidade',
    cells: ['no', 'no', 'no', 'básica'] },

  // ── Bônus e suporte
  { label: 'Bônus exclusivos',        sub: 'itens extras de valor', highlight: true,
    cells: ['1 item', '2 itens', '3 itens', '3+ itens'] },
  { label: 'Suporte após entrega',    highlight: true,
    cells: ['no', 'no', '30 dias', '60 dias'] },
];

/* ── Cell renderers ──────────────────────────────────────────── */
function CheckCell({ tier }: { tier?: string }) {
  return (
    <span
      className="mx-auto inline-flex items-center justify-center rounded-full"
      style={{
        width:      22,
        height:     22,
        background: tier ? `var(--tier-${tier}-glow)` : 'rgba(45, 212, 141, 0.15)',
        color:      tier ? `var(--tier-${tier}-text)` : 'var(--accent)',
      }}
      aria-label="Incluso"
    >
      <svg width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path
          d="M2 6.5l3 3 6-6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DataCell({
  value, tier, highlight,
}: {
  value: CellVal; tier: string; highlight: boolean;
}): ReactNode {
  if (value === 'yes') return <CheckCell tier={tier} />;
  if (value === 'no')  return (
    <span className="select-none text-muted-2/40" aria-label="Não incluso">—</span>
  );
  return (
    <span
      className={`text-[12px] leading-tight ${highlight ? 'font-semibold' : 'font-medium text-muted'}`}
      style={highlight ? { color: `var(--tier-${tier}-text)` } : undefined}
    >
      {value}
    </span>
  );
}

/* ── Component ───────────────────────────────────────────────── */
export default function ComparativoTiers() {
  return (
    <Section anchorId="comparativo" className="bg-bg-soft">
      <Container>

        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="animate-fade-up mx-auto mb-10 max-w-xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Compare os planos
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(1.7rem, 4vw, 2.3rem)',
              letterSpacing: '-0.025em',
              lineHeight:    '1.15',
            }}
          >
            Tudo o que cada nível inclui
          </h2>
          <p className="mt-4 text-muted">
            Quanto mais você sobe, mais o site trabalha para atrair e converter clientes.
          </p>
        </div>

        {/* ── Table wrapper ───────────────────────────────── */}
        {/* Negative margins let the scroll hit the viewport edge on mobile  */}
        {/* while keeping the table content at the correct inset.            */}
        {/* Mobile scroll hint — visible only below lg */}
        <p className="mb-3 flex items-center justify-center gap-1.5 text-xs text-muted-2 lg:hidden" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Deslize para comparar os planos
        </p>

        {/* pt-[18px] creates room for the Platina floating badge (-top-[13px]) above the thead */}
        <div
          className="animate-fade-up -mx-6 overflow-x-auto px-6 pb-4 pt-[18px] sm:-mx-8 sm:px-8"
          style={{ animationDelay: '130ms', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <table
            className="w-full min-w-[580px] table-fixed border-collapse"
            aria-label="Comparativo entre os planos por recurso"
          >
            {/* First col fixed width; remaining 4 share the rest equally */}
            <colgroup>
              <col style={{ width: '170px' }} />
              {plans.map(p => <col key={p.id} />)}
            </colgroup>

            {/* ── Column headers ─────────────────────────── */}
            <thead>
              <tr>
                {/* Top-left anchor cell */}
                <th
                  scope="col"
                  className="sticky left-0 z-20 bg-bg-soft px-4 pb-4 pt-2 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-2"
                >
                  Recurso
                </th>

                {plans.map(plan => {
                  const t = plan.tier ?? 'prata';
                  return (
                    <th
                      key={plan.id}
                      scope="col"
                      className="relative px-2 pb-4 pt-7 text-center"
                      style={{ background: COL_HEAD[t] }}
                    >
                      {/* Tier metallic bar */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0"
                        style={{
                          background: `var(--tier-${t}-bar)`,
                          height:     `var(--tier-${t}-bar-h)`,
                        }}
                      />

                      {/* Inner top glow */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0"
                        style={{
                          background: `radial-gradient(ellipse 100% 60% at 50% 0%, var(--tier-${t}-glow) 0%, transparent 70%)`,
                          height: 80,
                        }}
                      />

                      {/* Platina "Recomendado" floating badge */}
                      {plan.highlight && (
                        <div
                          aria-hidden
                          className="absolute -top-[13px] inset-x-0 flex justify-center"
                        >
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[9px] font-bold"
                            style={{
                              background:    `var(--tier-${t}-seal)`,
                              border:        `1px solid var(--tier-${t}-seal-border)`,
                              color:         `var(--tier-${t}-text)`,
                              boxShadow:     `0 0 14px -3px var(--tier-${t}-glow)`,
                              letterSpacing: '0.06em',
                            }}
                          >
                            ✦ Recomendado
                          </span>
                        </div>
                      )}

                      {/* Emblem + TIER badge + tier label + plan name */}
                      <div className="relative flex flex-col items-center gap-0.5">
                        {/* Crystal-heraldic emblem */}
                        <div
                          style={{ width: 52, height: 41 }}
                          dangerouslySetInnerHTML={{ __html: EMBLEMS[t] ?? '' }}
                          aria-hidden
                        />
                        {/* TIER X badge */}
                        <span
                          className="text-[8px] font-black uppercase tracking-[0.14em] px-1.5 py-0.5 rounded"
                          style={{
                            background:    `var(--tier-${t}-seal)`,
                            border:        `1px solid var(--tier-${t}-seal-border)`,
                            color:         `var(--tier-${t}-text)`,
                            letterSpacing: '0.14em',
                          }}
                        >
                          TIER {TIER_NUMBER[t]}
                        </span>
                        <span
                          className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.10em]"
                          style={{ color: `var(--tier-${t}-text)` }}
                        >
                          {plan.tierLabel}
                        </span>
                        <span className="text-[11px] font-semibold leading-tight text-ink">
                          {plan.name}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* ── Feature rows ───────────────────────────── */}
            <tbody>
              {ROWS.map(row => (
                <tr
                  key={row.label}
                  className="border-b border-[rgba(255,255,255,0.05)]"
                >
                  {/* Sticky row label */}
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-bg-soft px-4 py-3.5 font-normal"
                  >
                    <div className="flex items-start gap-2">
                      {/* Green dot marks high-value rows */}
                      {row.highlight && (
                        <span
                          className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: 'var(--accent)', opacity: 0.65 }}
                          aria-hidden
                        />
                      )}
                      <div>
                        <span className="text-[13px] font-medium text-ink">
                          {row.label}
                        </span>
                        {row.sub && (
                          <span className="block text-[11px] text-muted-2">
                            {row.sub}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>

                  {/* Per-plan cells */}
                  {row.cells.map((cell, ci) => {
                    const plan = plans[ci];
                    const t    = plan?.tier ?? 'prata';
                    return (
                      <td
                        key={ci}
                        className="px-3 py-3.5 text-center align-middle"
                        style={{ background: COL_BODY[t] }}
                      >
                        <DataCell value={cell} tier={t} highlight={!!row.highlight} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            {/* ── Price + CTA ────────────────────────────── */}
            <tfoot>
              {/* Price row */}
              <tr className="border-t-2 border-[rgba(255,255,255,0.09)]">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-bg-soft px-4 py-5 text-left font-normal"
                >
                  <span className="text-[13px] font-bold text-ink">Investimento</span>
                  <span className="block text-[11px] text-muted-2">pagamento único</span>
                </th>

                {plans.map(plan => {
                  const t = plan.tier ?? 'prata';
                  return (
                    <td
                      key={plan.id}
                      className="px-3 py-5 text-center"
                      style={{ background: COL_HEAD[t] }}
                    >
                      <span
                        className="block font-display font-extrabold leading-none"
                        style={{
                          fontSize:   'clamp(1.2rem, 1.8vw, 1.5rem)',
                          color:      `var(--tier-${t}-text)`,
                          textShadow: `0 0 18px var(--tier-${t}-glow)`,
                        }}
                      >
                        {plan.priceLabel}
                      </span>
                      <span className="mt-1 block text-[11px] text-muted-2">
                        {plan.paymentNote}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* CTA row */}
              <tr>
                <td className="sticky left-0 z-10 bg-bg-soft px-4 py-4" />

                {plans.map(plan => {
                  const t     = plan.tier ?? 'prata';
                  const waUrl = buildWhatsAppUrl(
                    `Olá! Tenho interesse no plano ${plan.name} (${plan.tierLabel ?? ''}) de ${plan.priceLabel}. Pode me ajudar?`,
                  );
                  return (
                    <td
                      key={plan.id}
                      className="px-3 py-4 text-center"
                      style={{ background: COL_HEAD[t] }}
                    >
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPlanSelect({
                          planId:   plan.id,
                          planName: plan.name,
                          tier:     t,
                          price:    plan.price,
                        })}
                        className={[
                          'inline-flex w-full items-center justify-center',
                          'rounded-full px-3 py-2.5 text-[12px]',
                          'font-display font-semibold',
                          'transition-all duration-200 active:scale-[0.97] hover:brightness-110',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-accent focus-visible:ring-offset-1',
                          'focus-visible:ring-offset-bg',
                        ].join(' ')}
                        style={{
                          background: CTA_BG[t],
                          color:      CTA_FG[t],
                          boxShadow:  `0 8px 24px -8px ${CTA_GLOW[t]}`,
                        }}
                      >
                        Escolher
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ── Footnote ───────────────────────────────────── */}
        <p
          className="animate-fade-in mt-6 text-center text-xs text-muted-2"
          style={{ animationDelay: '320ms' }}
        >
          * Domínio .com.br incluso por 1 ano. Renovação por conta do cliente após este período (≈ R$ 40/ano).
        </p>

      </Container>
    </Section>
  );
}

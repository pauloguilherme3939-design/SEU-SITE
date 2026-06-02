'use client';

import type { ReactNode } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackPlanSelect } from '@/lib/analytics';
import { Container, Section } from '@/components/ui';

/* ── Tier display config ─────────────────────────────────────── */
const SEAL: Record<string, string> = {
  prata: '🥈', ouro: '🥇', platina: '💠', diamante: '💎',
};

const CTA_BG: Record<string, string> = {
  prata: 'var(--accent)', ouro: 'var(--accent)',
  platina: '#0ea5e9',     diamante: '#7c3aed',
};
const CTA_FG: Record<string, string> = {
  prata: 'var(--bg)', ouro: 'var(--bg)',
  platina: '#fff',    diamante: '#fff',
};
const CTA_GLOW: Record<string, string> = {
  prata:    'rgba(45,212,141,0.32)',
  ouro:     'rgba(45,212,141,0.32)',
  platina:  'rgba(14,165,233,0.42)',
  diamante: 'rgba(124,58,237,0.48)',
};
const COL_BODY: Record<string, string> = {
  prata:    'rgba(148,163,184,0.025)',
  ouro:     'rgba(234,179,8,0.025)',
  platina:  'rgba(14,165,233,0.03)',
  diamante: 'rgba(124,58,237,0.03)',
};
const COL_HEAD: Record<string, string> = {
  prata:    'rgba(148,163,184,0.05)',
  ouro:     'rgba(234,179,8,0.06)',
  platina:  'rgba(14,165,233,0.07)',
  diamante: 'rgba(124,58,237,0.07)',
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
function CheckCell() {
  return (
    <span
      className="mx-auto inline-flex items-center justify-center rounded-full bg-accent/15 text-accent"
      style={{ width: 22, height: 22 }}
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
  if (value === 'yes') return <CheckCell />;
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
                      className="relative px-3 pb-4 pt-7 text-center"
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

                      {/* Seal + tier label + plan name */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="select-none text-xl leading-none" aria-hidden>
                          {SEAL[t]}
                        </span>
                        <span
                          className="mt-1 text-[9px] font-bold uppercase tracking-[0.10em]"
                          style={{ color: `var(--tier-${t}-text)` }}
                        >
                          {plan.tierLabel}
                        </span>
                        <span className="text-[12px] font-semibold leading-tight text-ink">
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
                          fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
                          color:    `var(--tier-${t}-text)`,
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
                          'transition-all duration-200 active:scale-[0.97]',
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

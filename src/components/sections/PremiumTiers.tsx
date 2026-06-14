import type { CSSProperties } from 'react';
import { Container, Section } from '@/components/ui';
import {
  premiumTiers,
  type PremiumTier,
  type PremiumTierId,
} from '@/data/premium-tiers';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './PremiumTiers.module.css';

/* ============================================================
   PORTE FIEL do handoff "Tiers Premium (download).html" (Cloud Design).
   Algoritmo original: crystalCore + emblem + ornaments.
   SVGs gerados como strings e injetados via dangerouslySetInnerHTML
   para manter 100% de fidelidade com o handoff original.

   Classes do handoff (tier-card, tier-prata, frame, oc, em, crest-top,
   crest-bot, finset, spot, emblem, lvl, trank, feats, feat-head, bonus,
   bh, cta, ghost, badge, b-ic, ic) são escopadas em :global() dentro
   de PremiumTiers.module.css sob a classe .scope desta seção.
   ============================================================ */

/* ── Configuração de tier (paleta + wings + crown) ───────── */
interface TierConfig {
  bright: string;
  mid: string;
  deep: string;
  faceHi: string;
  faceLo: string;
  wings: string[];
  crown: string;
}

/* Configs portadas LITERALMENTE do bundle do Cloud Design. */
const TIER_CONFIGS: Record<PremiumTierId, TierConfig> = {
  prata: {
    bright: '#f7fafc', mid: '#c3cdd7', deep: '#76828f',
    faceHi: '#eaf0f5', faceLo: '#8b97a3',
    wings: [
      `<path d="M0 -10 L74 -13 L42 -2 L0 -2 Z"/>`,
      `<path d="M0 -2 L60 5 L36 11 L0 9 Z"/>`,
    ],
    crown: `M100 32 L103 18 L100 12 L97 18 Z M92 35 L89 25 L87 23 L91 34 Z M108 35 L111 25 L113 23 L109 34 Z`,
  },
  ouro: {
    bright: '#ffe6a0', mid: '#ecc05a', deep: '#9a6c1f',
    faceHi: '#ffd873', faceLo: '#b07f2c',
    wings: [
      `<path d="M0 -12 L84 -16 L46 -3 L0 -3 Z"/>`,
      `<path d="M0 -3 L70 3 L40 9 L0 6 Z"/>`,
      `<path d="M0 6 L54 13 L30 18 L0 15 Z"/>`,
    ],
    crown: `M100 31 L104 14 L100 7 L96 14 Z M90 34 L86 22 L84 19 L90 33 Z M110 34 L114 22 L116 19 L110 33 Z`,
  },
  platina: {
    bright: '#cdf6ff', mid: '#54c9e4', deep: '#2a7fb8',
    faceHi: '#8fe2f3', faceLo: '#2f93c8',
    wings: [
      `<path d="M0 -12 L92 -23 L50 -4 L0 -4 Z"/>`,
      `<path d="M0 -4 L76 -6 L44 6 L0 5 Z"/>`,
      `<path d="M0 5 L58 11 L34 17 L0 14 Z"/>`,
    ],
    crown: `M100 31 L103 12 L100 5 L97 12 Z M89 34 L85 20 L82 17 L90 33 Z M111 34 L115 20 L118 17 L110 33 Z`,
  },
  diamante: {
    bright: '#e9ddff', mid: '#ab84f0', deep: '#5a4ce0',
    faceHi: '#c8aef7', faceLo: '#7a5cf0',
    wings: [
      `<path d="M0 -14 L98 -27 L52 -5 L0 -5 Z"/>`,
      `<path d="M0 -5 L84 -13 L48 4 L0 3 Z"/>`,
      `<path d="M0 3 L68 3 L40 12 L0 11 Z"/>`,
      `<path d="M0 11 L52 17 L30 23 L0 20 Z"/>`,
    ],
    crown: `M100 30 L104 9 L100 2 L96 9 Z M88 34 L83 18 L80 15 L90 32 Z M112 34 L117 18 L120 15 L110 32 Z M79 41 L75 31 L73 29 L80 39 Z M121 41 L125 31 L127 29 L120 39 Z`,
  },
  // Tier 5 — paleta especial verde/ciano/violeta misto para "Sob Medida".
  // Mantém a mesma linguagem visual: asas + coroa + faces.
  'sob-medida': {
    bright: '#d2ffe9', mid: '#5ed3ad', deep: '#2a82bd',
    faceHi: '#aff4d6', faceLo: '#3a9c84',
    wings: [
      `<path d="M0 -14 L100 -28 L54 -5 L0 -5 Z"/>`,
      `<path d="M0 -5 L86 -14 L50 4 L0 3 Z"/>`,
      `<path d="M0 3 L70 4 L42 13 L0 11 Z"/>`,
      `<path d="M0 11 L54 18 L32 24 L0 20 Z"/>`,
      `<path d="M0 20 L40 22 L24 28 L0 27 Z"/>`,
    ],
    crown: `M100 29 L104 7 L100 -1 L96 7 Z M87 34 L82 16 L79 13 L90 32 Z M113 34 L118 16 L121 13 L110 32 Z M77 41 L73 30 L71 28 L80 39 Z M123 41 L127 30 L129 28 L120 39 Z M100 -1 L97 5 L103 5 Z`,
  },
};

const ORN_LEVEL: Record<PremiumTierId, number> = {
  prata: 1,
  ouro: 2,
  platina: 3,
  diamante: 4,
  'sob-medida': 5,
};

/* ── crystalCore — porte fiel ───────────────────────────── */
function crystalCore(cfg: TierConfig, lvl: number): string {
  const cx = 100;
  const cy = 70;
  const topY = 41 - lvl * 3;
  const botY = 109 + lvl * 1.6;
  const wU = 15 + lvl * 1.6;
  const wM = 22 + lvl * 2.4;
  const shY = topY + (13 - lvl);
  const pts: [number, number][] = [
    [cx, topY],
    [cx + wU, shY],
    [cx + wM, cy - 4],
    [cx + wU + 2, botY - 22],
    [cx, botY],
    [cx - wU - 2, botY - 22],
    [cx - wM, cy - 4],
    [cx - wU, shY],
  ];
  const shade = [
    cfg.faceHi, cfg.bright, cfg.mid, cfg.mid,
    cfg.faceLo, cfg.deep,   cfg.faceLo, cfg.mid,
  ];
  const f1 = (n: number) => n.toFixed(1);
  const poly = (a: [number, number][]) =>
    `M${a.map((p) => f1(p[0]) + ' ' + f1(p[1])).join(' L')} Z`;
  const scale = (f: number): [number, number][] =>
    pts.map((p) => [cx + (p[0] - cx) * f, cy + (p[1] - cy) * f]);

  let facets = '';
  for (let i = 0; i < 8; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % 8];
    facets += `<path d="M${cx} ${cy} L${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])} Z" fill="${shade[i]}"/>`;
  }
  const edges = `<g stroke="${cfg.bright}" stroke-width=".5" opacity=".4" fill="none"><path d="${pts
    .map((p) => `M${cx} ${cy} L${f1(p[0])} ${f1(p[1])}`)
    .join(' ')}"/></g>`;
  const table = `<path d="${poly(scale(0.34))}" fill="${cfg.faceHi}" opacity=".5" stroke="${cfg.bright}" stroke-width=".5"/>`;
  const ring = lvl >= 3
    ? `<path d="${poly(scale(0.64))}" fill="none" stroke="${cfg.bright}" stroke-width=".5" opacity=".3"/>`
    : '';
  const outline = `<path d="${poly(pts)}" fill="none" stroke="${cfg.bright}" stroke-width="${(1.2 + lvl * 0.12).toFixed(2)}" stroke-linejoin="round"/>`;
  const g1 = `<path d="M${f1(cx + 3)} ${f1(topY + 9)} L${f1(cx + wU - 2)} ${f1(shY + 1)} L${f1(cx + 4)} ${f1(cy - 8)} Z" fill="#fff" opacity=".3"/>`;
  const g2 = `<path d="M${f1(cx - 4)} ${f1(topY + 13)} L${f1(cx - 6)} ${f1(cy)}" stroke="#fff" stroke-width="1.1" opacity=".4" stroke-linecap="round"/>`;
  const g3 = lvl >= 4
    ? `<path d="M${f1(cx + 5)} ${f1(cy + 8)} L${f1(cx + 2)} ${f1(botY - 14)}" stroke="#fff" stroke-width=".8" opacity=".3" stroke-linecap="round"/>`
    : '';
  return facets + table + ring + edges + outline + g1 + g2 + g3;
}

/* ── emblem — porte fiel ────────────────────────────────── */
function emblemSvg(key: PremiumTierId, cfg: TierConfig): string {
  const id = key;
  const lvl = ORN_LEVEL[key];
  const wingG = (dir: number) =>
    `<g transform="translate(100,67)${dir < 0 ? ' scale(-1,1)' : ''}" fill="url(#w-${id})" stroke="${cfg.deep}" stroke-width=".5" stroke-linejoin="round" opacity=".96">${cfg.wings.join('')}</g>`;
  return `
  <svg viewBox="0 0 200 158" role="img" aria-label="Emblema ${key}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="w-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${cfg.deep}"/>
        <stop offset=".5" stop-color="${cfg.mid}"/>
        <stop offset="1" stop-color="${cfg.bright}"/>
      </linearGradient>
    </defs>
    ${wingG(-1)}${wingG(1)}
    <g fill="url(#w-${id})" stroke="${cfg.bright}" stroke-width=".5" stroke-linejoin="round">${cfg.crown}</g>
    ${crystalCore(cfg, lvl)}
  </svg>`;
}

/* ── ornaments — porte fiel ─────────────────────────────── */
const ORN_SHARDS: Record<number, string[]> = {
  1: [`M0 4 L42 0 L26 11 L0 11 Z`],
  2: [`M0 3 L46 -2 L28 9 L0 9 Z`, `M0 9 L34 13 L20 19 L0 17 Z`],
  3: [`M0 2 L52 -6 L30 8 L0 8 Z`, `M0 8 L38 11 L22 18 L0 16 Z`],
  4: [
    `M0 1 L54 -7 L32 7 L0 7 Z`,
    `M0 7 L42 7 L24 15 L0 14 Z`,
    `M0 14 L30 18 L16 23 L0 21 Z`,
  ],
  5: [
    `M0 0 L56 -8 L32 6 L0 6 Z`,
    `M0 6 L44 6 L24 14 L0 13 Z`,
    `M0 13 L32 17 L16 22 L0 20 Z`,
    `M0 20 L24 22 L12 26 L0 24 Z`,
  ],
};

function ornamentsHtml(tier: PremiumTier): string {
  const cfg = TIER_CONFIGS[tier.id];
  const lvl = ORN_LEVEL[tier.id];
  const b = cfg.bright;
  const m = cfg.mid;
  const d = cfg.deep;

  const sw = (2.0 + lvl * 0.3).toFixed(2);
  const gem = (9 + lvl).toFixed(1);
  const gc = (10 + (9 + lvl) / 2).toFixed(2);
  const runner = lvl >= 2
    ? `<path d="M92 16 L${52 - lvl * 4} 16 M16 92 L16 ${52 - lvl * 4}" stroke="${m}" stroke-width="1.1" opacity=".55" stroke-linecap="round"/>`
    : '';
  const curls = `<path d="M27 10 Q48 13 40 33" fill="none" stroke="${m}" stroke-width="1.4" opacity=".85"/><path d="M10 27 Q13 48 33 40" fill="none" stroke="${m}" stroke-width="1.4" opacity=".85"/>`;
  const curls2 = lvl >= 3
    ? `<path d="M42 9 Q63 15 54 35" fill="none" stroke="${m}" stroke-width="1.1" opacity=".55"/><path d="M9 42 Q15 63 35 54" fill="none" stroke="${m}" stroke-width="1.1" opacity=".55"/>`
    : '';
  const tips = `<path d="M10 52 L4 62 L10 64 Z M52 10 L62 4 L64 10 Z" fill="${b}"/>`;
  const oc = (pos: string) =>
    `<svg class="oc ${pos}" viewBox="0 0 100 100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 92 L10 28 Q10 10 28 10 L92 10" fill="none" stroke="${b}" stroke-width="${sw}" stroke-linecap="round"/>
      ${runner}${curls}${curls2}${tips}
      <rect x="10" y="10" width="${gem}" height="${gem}" rx="2" transform="rotate(45 ${gc} ${gc})" fill="${b}"/>
    </svg>`;

  const em = (side: string) =>
    `<svg class="em ${side}" viewBox="0 0 24 54" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6 L19 27 L12 48 L5 27 Z" fill="${m}" stroke="${b}" stroke-width="1"/>
      <path d="M12 14 L12 40" stroke="${b}" stroke-width=".5" opacity=".5"/>
      <path d="M12 6 L15 27 L12 48" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/>
    </svg>`;

  const topCrest = tier.badgeText
    ? ''
    : `<svg class="crest-top" viewBox="0 0 110 28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 4 L63 14 L55 24 L47 14 Z" fill="${b}"/>
        <path d="M47 14 L16 14 M63 14 L94 14" stroke="${m}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M26 9 L16 14 L26 19 M84 9 L94 14 L84 19" fill="none" stroke="${b}" stroke-width="1.4" stroke-linejoin="round"/>
        <circle cx="55" cy="14" r="1.7" fill="#fff" opacity=".75"/>
      </svg>`;

  const wings = ORN_SHARDS[lvl].join('');
  const wingG = (dir: number) =>
    `<g transform="translate(100,19)${dir < 0 ? ' scale(-1,1)' : ''}" fill="${m}" stroke="${b}" stroke-width=".6" stroke-linejoin="round" opacity=".96">${wings}</g>`;
  const underban = lvl >= 3
    ? `<path d="M64 32 L100 25 L136 32 L100 42 Z" fill="${m}" opacity=".2"/>`
    : '';
  const botGem = `<path d="M100 5 L111 19 L100 33 L89 19 Z" fill="${b}" stroke="${d}" stroke-width=".6"/><path d="M100 5 L100 33 M89 19 L111 19" stroke="${d}" stroke-width=".5" opacity=".5"/><path d="M100 5 L94 19 L100 33 Z" fill="#fff" opacity=".15"/>`;
  const botCrest = `<svg class="crest-bot" viewBox="0 0 200 48" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${underban}${wingG(-1)}${wingG(1)}${botGem}</svg>`;

  const sides = lvl >= 3 ? `${em('eml')}${em('emr')}` : '';
  return `<div class="frame"><span class="finset"></span>${oc('tl')}${oc('tr')}${oc('bl')}${oc('br')}${sides}${topCrest}${botCrest}</div>`;
}

/* ── Icons (inline) ──────────────────────────────────────── */
const ICON_CHECK = `<svg class="ic" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8.5l3 3 6-7" stroke="rgba(var(--c-rgb),1)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_X = `<svg class="ic" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="rgba(255,255,255,.35)" stroke-width="1.6" stroke-linecap="round"/></svg>`;

/* ── Card render ─────────────────────────────────────────── */
function TierCard({ tier }: { tier: PremiumTier }) {
  const cfg = TIER_CONFIGS[tier.id];
  const isFeatured = !!tier.featured;
  const isGhost = tier.id === 'prata' || tier.id === 'ouro';

  // Classe principal segue o handoff: "card tier-{key} featured? has-badge?"
  const classes = [
    'card',
    `tier-${tier.id}`,
    isFeatured ? 'featured' : '',
    tier.badgeText ? 'has-badge' : '',
  ].filter(Boolean).join(' ');

  const ornamentsAndEmblem = {
    __html: `${ornamentsHtml(tier)}${
      tier.badgeText
        ? `<span class="badge"><span class="b-ic">✦</span>${tier.badgeText}</span>`
        : ''
    }`,
  };

  const emblemHtml = { __html: emblemSvg(tier.id, cfg) };

  return (
    <article className={classes} aria-label={`Tier ${tier.tierNumber} — ${tier.name}`}>
      <span className="spot" aria-hidden />
      <div dangerouslySetInnerHTML={ornamentsAndEmblem} />

      <div className="emblem-row">
        <div className="emblem" dangerouslySetInnerHTML={emblemHtml} />
        <div className="tier-meta">
          <div className="lvl">
            <span className="trank">TIER {tier.tierNumber}</span>
            {tier.rankLabel}
          </div>
          <div className="plan">{tier.name}</div>
        </div>
      </div>

      <p className="tagline">{tier.tagline}</p>

      <div className="price">
        {tier.currency ? <span className="cur">{tier.currency}</span> : null}
        <span className={`amt ${tier.price === null ? 'amt-custom' : ''}`}>
          {tier.priceLabel}
        </span>
      </div>
      <div className="price-note">{tier.paymentNote}</div>

      <div className="feat-head">
        {tier.featuresHeader}
        <span className="ln" aria-hidden />
      </div>
      <ul className="feats feats-highlight">
        {tier.featuresHighlight.map((label) => (
          <li key={label}>
            <span dangerouslySetInnerHTML={{ __html: ICON_CHECK }} />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <details className="see-all">
        <summary>
          <span className="see-all-label">Ver tudo incluso</span>
          <span className="see-all-count">{tier.features.length} itens</span>
          <span className="see-all-chevron" aria-hidden>▾</span>
        </summary>
        <ul className="feats feats-full">
          {tier.features.map((f) => (
            <li key={f.label} className={f.included ? '' : 'off'}>
              <span
                dangerouslySetInnerHTML={{ __html: f.included ? ICON_CHECK : ICON_X }}
              />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="bonus">
        <div className="bh">✦ {tier.bonusHeader}</div>
        <ul>
          {tier.bonus.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <a
        href={buildWhatsAppUrl(tier.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`cta ${isGhost ? 'ghost' : ''}`}
        data-tier={tier.id}
      >
        {tier.ctaLabel}
      </a>

      <div className="meta">
        <div className="delivery">⌁ {tier.deliveryTag}</div>
        <div className="row">
          Ideal para: <b>{tier.idealFor}</b>
        </div>
        {tier.footerNote ? (
          <div className="row">
            <b>{tier.footerNote}</b>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function PremiumTiers() {
  const sectionStyle = { '--glow': '0.7' } as CSSProperties;

  return (
    <Section
      anchorId="planos"
      spacing="lg"
      className={`bg-bg ${styles.scope}`}
      style={sectionStyle}
    >
      <div className={styles.bgGlow} aria-hidden />
      <Container size="lg">
        <header className={styles.header}>
          <span className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden />
            Tabela de planos
          </span>
          <h2 className={styles.title}>
            Cinco níveis. <span className={styles.titleGrad}>Um padrão premium.</span>
          </h2>
          <p className={styles.subtitle}>
            Do Tier 1 (Prata) ao Tier 5 (Sob Medida). Cada plano entrega presença digital
            profissional com domínio próprio, hospedagem rápida e atendimento direto.
          </p>
        </header>

        <div className="tiers">
          {premiumTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className={styles.compareNote}>
          Todos os planos com preço fixo incluem <strong>domínio .com.br por 1 ano</strong>,
          hospedagem em CDN global, SSL automático e botão de WhatsApp integrado.
        </p>
      </Container>
    </Section>
  );
}

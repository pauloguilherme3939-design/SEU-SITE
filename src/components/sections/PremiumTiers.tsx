import type { CSSProperties, ReactNode } from 'react';
import { Container, Section } from '@/components/ui';
import {
  premiumTiers,
  type PremiumTier,
  type PremiumTierId,
} from '@/data/premium-tiers';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './PremiumTiers.module.css';

/* ── Mapping tier → classe CSS Module ─────────────────────── */
const TIER_CLASS: Record<PremiumTierId, string> = {
  prata:        styles.tierPrata,
  ouro:         styles.tierOuro,
  platina:      styles.tierPlatina,
  diamante:     styles.tierDiamante,
  'sob-medida': styles.tierSobMedida,
};

/* ── Emblems (SVG inline, um por tier — joias/cristais) ───── */
function EmblemPrata() {
  return (
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="prata-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M55 8 L84 24 L84 64 L55 102 L26 64 L26 24 Z"
        stroke="url(#prata-fill)" strokeWidth="2.2"
        fill="rgba(200,214,226,0.06)"
      />
      <path d="M55 22 L70 30 L55 82 L40 30 Z" fill="url(#prata-fill)" opacity="0.9" />
      <path d="M55 22 L55 82 M40 30 L70 30" stroke="var(--c-bright)" strokeWidth="1.5" />
    </svg>
  );
}

function EmblemOuro() {
  return (
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="ouro-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r="40" stroke="url(#ouro-fill)" strokeWidth="2" fill="rgba(233,189,86,0.08)" />
      <path
        d="M55 24 L62 47 L86 47 L67 60 L74 84 L55 70 L36 84 L43 60 L24 47 L48 47 Z"
        fill="url(#ouro-fill)" opacity="0.96"
        stroke="var(--c-bright)" strokeWidth="0.6"
      />
    </svg>
  );
}

function EmblemPlatina() {
  return (
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="platina-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M55 6 L90 32 L76 90 L34 90 L20 32 Z"
        stroke="url(#platina-fill)" strokeWidth="2.2"
        fill="rgba(84,201,228,0.08)"
      />
      <path
        d="M55 24 L75 38 L68 78 L42 78 L35 38 Z"
        fill="url(#platina-fill)" opacity="0.88"
      />
      <path d="M55 24 L55 78 M35 38 L75 38" stroke="var(--c-bright)" strokeWidth="1.2" />
      <circle cx="55" cy="55" r="5" fill="var(--c-bright)" />
    </svg>
  );
}

function EmblemDiamante() {
  return (
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="diamante-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M55 10 L92 42 L55 102 L18 42 Z"
        stroke="url(#diamante-fill)" strokeWidth="2.2"
        fill="rgba(171,132,240,0.08)"
      />
      <path
        d="M55 10 L92 42 L55 56 L18 42 Z"
        fill="url(#diamante-fill)" opacity="0.75"
      />
      <path
        d="M55 56 L92 42 L55 102 L18 42 Z"
        fill="url(#diamante-fill)" opacity="0.48"
      />
      <path d="M55 10 L55 56 M18 42 L92 42" stroke="var(--c-bright)" strokeWidth="1.2" />
      <path d="M35 42 L55 102 L75 42" stroke="var(--c-bright)" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function EmblemSobMedida() {
  // Cristal facetado abstrato — para "sob medida" / personalizado
  return (
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="sobmedida-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
        <linearGradient id="sobmedida-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="var(--c-bright)" />
          <stop offset="100%" stopColor="var(--c-mid)" />
        </linearGradient>
      </defs>
      {/* hexágono externo */}
      <path
        d="M55 10 L92 30 L92 80 L55 100 L18 80 L18 30 Z"
        stroke="url(#sobmedida-stroke)" strokeWidth="2.2"
        fill="rgba(94,211,173,0.06)"
      />
      {/* facetas internas — 3 triângulos sugerindo personalização */}
      <path d="M55 26 L78 55 L55 84 L32 55 Z" fill="url(#sobmedida-fill)" opacity="0.85" />
      <path d="M55 26 L78 55 L55 55 Z" fill="var(--c-bright)" opacity="0.55" />
      <path d="M55 55 L78 55 L55 84 Z" fill="var(--c-mid)" opacity="0.65" />
      <path d="M55 55 L32 55 L55 26 Z" fill="var(--c-bright)" opacity="0.35" />
      {/* ponto central — destaque */}
      <circle cx="55" cy="55" r="4" fill="var(--c-bright)" />
    </svg>
  );
}

const EMBLEMS: Record<PremiumTierId, () => ReactNode> = {
  prata:        EmblemPrata,
  ouro:         EmblemOuro,
  platina:      EmblemPlatina,
  diamante:     EmblemDiamante,
  'sob-medida': EmblemSobMedida,
};

/* ── Icons ─────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      className={styles.featuresIcon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.2 8.4 L6.4 11.6 L12.8 4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className={styles.featuresIcon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path d="M3.5 8 L12.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className={styles.badgeIcon}
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 1 L10 6 L15 6.5 L11.2 10 L12.3 15 L8 12.3 L3.7 15 L4.8 10 L1 6.5 L6 6 Z" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 4.6 L8 8 L10.4 9.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Cantos ornamentais — pequeno V duplo */
function CornerOrn({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M2 2 L12 2 M2 2 L2 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 2 L6 6 L2 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="2" cy="2" r="1.4" fill="currentColor" />
    </svg>
  );
}

/* ── Card ─────────────────────────────────────────────────── */
function TierCard({ tier }: { tier: PremiumTier }) {
  const Emblem = EMBLEMS[tier.id];
  const tierClass = TIER_CLASS[tier.id];
  const isFeatured = !!tier.featured;
  // Prata usa CTA fantasma (contorno); demais tiers usam CTA filled.
  const isGhostCta = tier.id === 'prata';
  const isCustomPrice = tier.price === null;

  const cardClass = [
    styles.card,
    tierClass,
    isFeatured ? styles.cardFeatured : '',
  ]
    .filter(Boolean)
    .join(' ');

  const ctaClass = [styles.cta, isGhostCta ? styles.ctaGhost : '']
    .filter(Boolean)
    .join(' ');

  const priceAmtClass = [
    styles.priceAmt,
    isCustomPrice ? styles.priceAmtCustom : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass} aria-label={`Tier ${tier.tierNumber} — ${tier.name}`}>
      {/* Cantos ornamentais */}
      <CornerOrn className={`${styles.cornerOrn} ${styles.cornerTL}`} />
      <CornerOrn className={`${styles.cornerOrn} ${styles.cornerTR}`} />
      <CornerOrn className={`${styles.cornerOrn} ${styles.cornerBL}`} />
      <CornerOrn className={`${styles.cornerOrn} ${styles.cornerBR}`} />

      {/* Frame interno discreto */}
      <div className={styles.innerFrame} aria-hidden />

      {/* Badge featured */}
      {isFeatured && tier.badgeText ? (
        <div className={styles.badge}>
          <StarIcon />
          {tier.badgeText}
        </div>
      ) : null}

      {/* Ribbon "Tier N" */}
      <div className={styles.emblemRow}>
        <span className={styles.tierNumber}>Tier {tier.tierNumber}</span>
        <div className={styles.emblem}>
          <Emblem />
        </div>
        <div className={styles.tierMeta}>
          <span className={styles.tierRank}>{tier.rankLabel}</span>
          <h3 className={styles.name}>{tier.name}</h3>
          <p className={styles.idealFor}>{tier.idealFor}</p>
        </div>
      </div>

      <p className={styles.desc}>{tier.description}</p>

      {/* Separador ornamental */}
      <div className={styles.divider}>
        <span className={styles.dividerDot} aria-hidden />
      </div>

      <div className={styles.price}>
        {tier.currency ? <span className={styles.priceCur}>{tier.currency}</span> : null}
        <span className={priceAmtClass}>{tier.priceLabel}</span>
      </div>
      <p className={styles.priceNote}>{tier.paymentNote}</p>

      <div className={styles.featuresHead}>
        <span>{tier.featuresHeader}</span>
        <span className={styles.featuresLine} aria-hidden />
      </div>
      <ul className={styles.features}>
        {tier.features.map((f) => (
          <li key={f.label} className={f.included ? '' : styles.off}>
            {f.included ? <CheckIcon /> : <MinusIcon />}
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.bonus}>
        <div className={styles.bonusHead}>{tier.bonusHeader}</div>
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
        className={ctaClass}
        data-tier={tier.id}
      >
        {tier.ctaLabel}
      </a>

      <div className={styles.meta}>
        <span className={styles.delivery}>
          <DeliveryIcon />
          {tier.deliveryTag}
        </span>
        {tier.footerNote ? (
          <span className={styles.metaFooter}>{tier.footerNote}</span>
        ) : null}
      </div>
    </article>
  );
}

/* ── Component ────────────────────────────────────────────── */
export default function PremiumTiers() {
  const sectionStyle = { '--tier-glow': '0.75' } as CSSProperties;

  return (
    <Section
      anchorId="planos"
      spacing="lg"
      className={`bg-bg ${styles.section}`}
      style={sectionStyle}
    >
      <div className={styles.bgGlow} aria-hidden />
      <Container size="lg">
        <header className={styles.header}>
          <span className={styles.kicker}>
            <span className={styles.kickerDot} />
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

        <div className={styles.grid}>
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

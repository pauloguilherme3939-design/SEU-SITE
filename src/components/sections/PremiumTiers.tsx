import type { CSSProperties, ReactNode } from 'react';
import { Container, Section } from '@/components/ui';
import { premiumTiers, type PremiumTier } from '@/data/premium-tiers';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { TierSlug } from '@/types';
import styles from './PremiumTiers.module.css';

/* ── Mapping tier → classe do CSS Module ──────────────────── */
const TIER_CLASS: Record<TierSlug, string> = {
  prata:    styles.tierPrata,
  ouro:     styles.tierOuro,
  platina:  styles.tierPlatina,
  diamante: styles.tierDiamante,
};

/* ── Emblems (SVG inline, um por tier) ────────────────────── */
function EmblemPrata() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="prata-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="60%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M48 8 L72 22 L72 56 L48 88 L24 56 L24 22 Z"
        stroke="url(#prata-fill)" strokeWidth="2"
        fill="rgba(200,214,226,0.06)"
      />
      <path d="M48 22 L60 30 L48 70 L36 30 Z" fill="url(#prata-fill)" opacity="0.85" />
      <path d="M48 22 L48 70 M36 30 L60 30" stroke="var(--c-bright)" strokeWidth="1.5" />
    </svg>
  );
}

function EmblemOuro() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="ouro-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="34" stroke="url(#ouro-fill)" strokeWidth="2" fill="rgba(233,189,86,0.08)" />
      <path
        d="M48 22 L54 42 L74 42 L58 54 L64 74 L48 62 L32 74 L38 54 L22 42 L42 42 Z"
        fill="url(#ouro-fill)" opacity="0.95"
        stroke="var(--c-bright)" strokeWidth="0.6"
      />
    </svg>
  );
}

function EmblemPlatina() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="platina-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M48 6 L78 28 L66 78 L30 78 L18 28 Z"
        stroke="url(#platina-fill)" strokeWidth="2"
        fill="rgba(84,201,228,0.08)"
      />
      <path
        d="M48 22 L66 34 L60 68 L36 68 L30 34 Z"
        fill="url(#platina-fill)" opacity="0.85"
      />
      <path d="M48 22 L48 68 M30 34 L66 34" stroke="var(--c-bright)" strokeWidth="1.2" />
      <circle cx="48" cy="48" r="4" fill="var(--c-bright)" />
    </svg>
  );
}

function EmblemDiamante() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="diamante-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="var(--c-bright)" />
          <stop offset="55%"  stopColor="var(--c-mid)" />
          <stop offset="100%" stopColor="var(--c-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M48 10 L80 38 L48 90 L16 38 Z"
        stroke="url(#diamante-fill)" strokeWidth="2"
        fill="rgba(171,132,240,0.08)"
      />
      <path
        d="M48 10 L80 38 L48 50 L16 38 Z"
        fill="url(#diamante-fill)" opacity="0.7"
      />
      <path
        d="M48 50 L80 38 L48 90 L16 38 Z"
        fill="url(#diamante-fill)" opacity="0.45"
      />
      <path d="M48 10 L48 50 M16 38 L80 38" stroke="var(--c-bright)" strokeWidth="1.2" />
      <path d="M32 38 L48 90 L64 38" stroke="var(--c-bright)" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

const EMBLEMS: Record<TierSlug, () => ReactNode> = {
  prata:    EmblemPrata,
  ouro:     EmblemOuro,
  platina:  EmblemPlatina,
  diamante: EmblemDiamante,
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
    <article className={cardClass} aria-label={`Plano ${tier.name}`}>
      {isFeatured && tier.badgeText ? (
        <div className={styles.badge}>
          <StarIcon />
          {tier.badgeText}
        </div>
      ) : null}

      <div className={styles.emblemRow}>
        <div className={styles.emblem}>
          <Emblem />
        </div>
        <div className={styles.tierMeta}>
          <span className={styles.tierRank}>{tier.rankLabel}</span>
          <h3 className={styles.name}>{tier.name}</h3>
        </div>
      </div>

      <p className={styles.desc}>{tier.description}</p>

      <div className={styles.price}>
        {tier.currency ? <span className={styles.priceCur}>{tier.currency}</span> : null}
        <span className={priceAmtClass}>{tier.priceLabel}</span>
      </div>
      <p className={styles.priceNote}>{tier.priceNote}</p>

      <div className={styles.featuresHead}>
        <span>{tier.featuresHeader}</span>
        <span className={styles.featuresLine} aria-hidden />
      </div>
      <ul className={styles.features}>
        {tier.features.map((f) => (
          <li key={f}>
            <CheckIcon />
            <span>{f}</span>
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
  const sectionStyle = { '--tier-glow': '0.7' } as CSSProperties;

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
            Quatro níveis. <span className={styles.titleGrad}>Um padrão premium.</span>
          </h2>
          <p className={styles.subtitle}>
            Do Prata ao Diamante, cada plano entrega presença digital profissional
            com domínio incluso, hospedagem rápida e atendimento direto.
          </p>
        </header>

        <div className={styles.grid}>
          {premiumTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className={styles.compareNote}>
          Todos os planos incluem <strong>domínio .com.br por 1 ano</strong>,
          hospedagem em CDN global, SSL automático e botão de WhatsApp integrado.
        </p>
      </Container>
    </Section>
  );
}

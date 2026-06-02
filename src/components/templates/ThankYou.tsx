/**
 * ThankYou — Template reutilizável de Página de Obrigado
 * ═══════════════════════════════════════════════════════
 * Bônus exclusivo dos planos Platina e Diamante.
 *
 * COMO REUTILIZAR EM UM NOVO PROJETO DE CLIENTE
 * ─────────────────────────────────────────────
 * 1. Copie este arquivo para o projeto do cliente.
 * 2. Crie uma rota, ex: src/app/obrigado/page.tsx
 *    e renderize <ThankYou {...configDoCliente} />.
 * 3. Preencha as props abaixo com os dados do cliente.
 * 4. O componente dispara evento de conversão automaticamente
 *    ao montar — conecte lib/analytics.ts (ou equivalente) para
 *    registrar o lead no Meta Pixel e GA4 do cliente.
 * 5. Aponte o botão de WhatsApp e o link do formulário para
 *    esta rota após o envio bem-sucedido.
 *
 * EXEMPLO DE USO (src/app/obrigado/page.tsx):
 * ────────────────────────────────────────────
 * import ThankYou from '@/components/templates/ThankYou';
 *
 * export default function ObrigadoPage() {
 *   return (
 *     <ThankYou
 *       businessName="Barbearia do João"
 *       accentColor="#2dd48d"
 *       confirmationMessage="Recebemos seu contato!"
 *       detail="João vai te responder pelo WhatsApp em até 1 hora no horário comercial."
 *       whatsappUrl="https://wa.me/5516999999999?text=Ol%C3%A1%2C+vim+pelo+site"
 *       nextStep={{
 *         label: 'Enquanto isso, veja nosso Instagram',
 *         href: 'https://instagram.com/barbearia',
 *         icon: 'instagram',
 *       }}
 *       socials={[
 *         { platform: 'instagram', href: 'https://instagram.com/barbearia', label: '@barbearia' },
 *       ]}
 *       siteUrl="https://barbearia.com.br"
 *     />
 *   );
 * }
 */

'use client';

import { useEffect } from 'react';

/* ── Types ───────────────────────────────────────────────── */
type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'site';

interface Social {
  platform: SocialPlatform;
  href:     string;
  label:    string;
}

interface NextStep {
  label: string;
  href:  string;
  icon?: SocialPlatform | 'arrow';
}

export interface ThankYouProps {
  /** Nome do negócio — aparece no título e rodapé */
  businessName: string;

  /** Cor de acento hex — usa var(--accent) se omitida */
  accentColor?: string;

  /** Título principal da confirmação */
  confirmationMessage?: string;

  /** Linha de detalhe abaixo do título (o que esperar, prazo) */
  detail?: string;

  /** URL completo do WhatsApp do cliente (wa.me com mensagem pré-pronta) */
  whatsappUrl: string;

  /** Texto do botão principal de WhatsApp */
  whatsappLabel?: string;

  /** Passo seguinte opcional (outro link de apoio) */
  nextStep?: NextStep;

  /** Links de redes sociais */
  socials?: Social[];

  /** URL do site do cliente (para link no rodapé) */
  siteUrl?: string;

  /**
   * Callback de conversão — chamado ao montar o componente.
   * Passe trackLead ou trackContact de @/lib/analytics aqui.
   * Se omitido, tenta usar window.fbq e window.gtag diretamente.
   */
  onConversion?: () => void;
}

/* ── Social icons ────────────────────────────────────────── */
function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const p: Record<SocialPlatform, JSX.Element> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
    tiktok: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor" />
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    site: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3a13 13 0 010 18M3 12h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M5 7a13 13 0 0114 0M5 17a13 13 0 0114 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  };
  return p[platform] ?? p.site;
}

/* ── WhatsApp icon ───────────────────────────────────────── */
function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
    </svg>
  );
}

/* ── Check icon ──────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 16l8 8 14-14" stroke="currentColor" strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function ThankYou({
  businessName,
  accentColor,
  confirmationMessage = 'Recebemos seu contato!',
  detail = 'Em breve você receberá nossa resposta pelo WhatsApp. Fique de olho nas mensagens.',
  whatsappUrl,
  whatsappLabel = 'Acompanhar pelo WhatsApp',
  nextStep,
  socials = [],
  siteUrl,
  onConversion,
}: ThankYouProps) {

  /* Disparo de conversão ao montar */
  useEffect(() => {
    if (onConversion) {
      onConversion();
    } else {
      // Fallback: tenta fbq e gtag diretamente se não houver callback
      try {
        (window as Window & { fbq?: (...a: unknown[]) => void })
          .fbq?.('track', 'Lead');
      } catch { /* noop */ }
      try {
        (window as Window & { gtag?: (...a: unknown[]) => void })
          .gtag?.('event', 'generate_lead');
      } catch { /* noop */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accent = accentColor ?? 'var(--accent)';
  const accentMuted = accentColor
    ? `${accentColor}22`
    : 'var(--accent-glow)';

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-16"
      aria-label="Confirmação de contato"
    >

      {/* ── Card central ───────────────────────────── */}
      <div
        className="w-full max-w-md rounded-[var(--radius-lg)] border border-line bg-card shadow-[var(--shadow)]"
        style={{ borderTop: `2px solid ${accent}` }}
      >

        {/* Topo: ícone de confirmação */}
        <div className="flex flex-col items-center px-8 pt-10 pb-6 text-center">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: accentMuted, color: accent }}
          >
            <CheckIcon />
          </div>

          <h1
            className="font-display font-extrabold text-ink text-balance"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              letterSpacing: '-0.025em',
              lineHeight: '1.15',
              fontFamily: 'var(--font-display)',
            }}
          >
            {confirmationMessage}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {detail}
          </p>
        </div>

        {/* Linha separadora */}
        <div className="mx-6 h-px bg-line" />

        {/* Expectativas */}
        <div className="px-8 py-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-2">
            O que acontece agora
          </p>
          <ul className="space-y-2.5">
            {[
              'Você recebe nossa resposta pelo WhatsApp',
              'Sem spam, sem pressão — só quando tiver novidade',
              'Pode entrar em contato a qualquer hora se tiver dúvida',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <span
                  className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ background: accentMuted, color: accent }}
                  aria-hidden
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Linha separadora */}
        <div className="mx-6 h-px bg-line" />

        {/* CTA WhatsApp */}
        <div className="px-8 py-6 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            style={{
              background: 'var(--whats)',
              boxShadow: '0 10px 30px -10px rgba(37,211,102,0.45)',
              // Use font-display via inline style since we're outside Tailwind class
              fontFamily: 'var(--font-display)',
            }}
          >
            <WAIcon />
            {whatsappLabel}
          </a>

          {nextStep && (
            <a
              href={nextStep.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-line-hi hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {nextStep.icon && nextStep.icon !== 'arrow' && (
                <SocialIcon platform={nextStep.icon as SocialPlatform} />
              )}
              {nextStep.label}
              {(!nextStep.icon || nextStep.icon === 'arrow') && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          )}
        </div>

        {/* Rodapé: redes sociais + nome do negócio */}
        {(socials.length > 0 || businessName) && (
          <>
            <div className="mx-6 h-px bg-line" />
            <div className="flex flex-col items-center gap-3 px-8 py-5">
              {socials.length > 0 && (
                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted-2 transition-colors hover:border-line-hi hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-2">
                {siteUrl ? (
                  <a href={siteUrl} className="hover:text-muted transition-colors">
                    {businessName}
                  </a>
                ) : (
                  businessName
                )}
              </p>
            </div>
          </>
        )}

      </div>

      {/* Nota discreta fora do card */}
      <p className="mt-6 text-xs text-muted-2">
        Pode fechar esta janela — seu contato já foi registrado.
      </p>

    </main>
  );
}

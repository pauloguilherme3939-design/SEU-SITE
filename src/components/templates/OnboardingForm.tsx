/**
 * STUB temporário.
 *
 * O componente OnboardingForm original não existe no working directory local —
 * só foi recuperado o tipo de uso na rota /comecar. Este stub destrava o build
 * mantendo a rota /comecar acessível, com fallback para contato via WhatsApp
 * usando a mensagem padrão do plano escolhido.
 *
 * Não é feature nova; é remediação para o build compilar.
 * Substituir pela versão completa quando recuperar/recriar.
 */

import type { TierSlug } from '@/types';
import { Container, Section } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const TIER_LABEL: Record<TierSlug, string> = {
  prata:    'Prata · Presença Rápida',
  ouro:     'Ouro · Profissional Express',
  platina:  'Platina · Empresarial Completo',
  diamante: 'Diamante · Projeto Sob Medida',
};

interface OnboardingFormProps {
  tier: TierSlug;
}

export default function OnboardingForm({ tier }: OnboardingFormProps) {
  const label = TIER_LABEL[tier] ?? TIER_LABEL.prata;
  const waUrl = buildWhatsAppUrl(
    `Olá! Quero iniciar o atendimento para o plano ${label} do Site no Ar Express. Pode me enviar os próximos passos para começarmos?`,
  );

  return (
    <Section spacing="md">
      <Container size="sm">
        <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-line bg-card p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">
            Plano escolhido
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            {label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            O atendimento desta etapa é feito direto no WhatsApp — assim a gente
            alinha briefing, identidade visual, prazo e início da entrega na
            mesma conversa, sem formulário longo.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whats px-6 text-base font-display font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.55)] transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z"
              />
            </svg>
            Continuar pelo WhatsApp
          </a>

          <p className="mt-5 text-xs text-muted-2">
            Atendimento humano · resposta no mesmo dia útil
          </p>
        </div>
      </Container>
    </Section>
  );
}

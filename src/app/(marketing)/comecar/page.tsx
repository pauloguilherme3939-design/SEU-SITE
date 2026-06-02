import type { Metadata } from 'next';
import type { TierSlug } from '@/types';
import OnboardingForm from '@/components/templates/OnboardingForm';
import { plans } from '@/data/plans';
import { site } from '@/data/site';

/* ── Map plan id → tier ─────────────────────────────────────── */
const PLAN_TIER: Record<string, TierSlug> = {
  inicial:     'prata',
  presenca:    'ouro',
  express:     'platina',
  empresarial: 'diamante',
};

export const metadata: Metadata = {
  title: `Enviar materiais do site — ${site.name}`,
  description:
    'Preencha as informações para iniciarmos a criação do seu site profissional.',
  robots: { index: false, follow: false },
};

export default function ComecarPage({
  searchParams,
}: {
  searchParams: { plano?: string | string[] };
}) {
  const planoParam = Array.isArray(searchParams.plano)
    ? searchParams.plano[0]
    : searchParams.plano;

  const tier: TierSlug = (planoParam ? PLAN_TIER[planoParam] : undefined) ?? 'prata';

  const planName = plans.find((p) => p.id === planoParam)?.name;

  return (
    <main className="min-h-screen bg-bg py-20 sm:py-28">
      {/* Back link */}
      <div className="mx-auto mb-8 max-w-2xl px-5 sm:px-6">
        <a
          href="/#planos"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M9 2L4 7l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {planName ? `Plano ${planName}` : 'Ver planos'}
        </a>
      </div>

      <OnboardingForm tier={tier} />
    </main>
  );
}

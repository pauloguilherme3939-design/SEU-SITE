'use client';

import { useState } from 'react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Container, Section } from '@/components/ui';

/* ── Types ───────────────────────────────────────────────── */
type ResultKey = 'inicial' | 'presenca' | 'express' | 'empresarial' | 'saas';

interface QuizOption {
  label: string;
  scores: Partial<Record<ResultKey, number>>;
}

/* ── Questions ───────────────────────────────────────────── */
const QUESTIONS: { text: string; options: QuizOption[] }[] = [
  {
    text: 'O que você precisa agora?',
    options: [
      { label: 'Uma página simples para apresentar meu negócio', scores: { inicial: 3 } },
      { label: 'Uma landing page mais bonita e organizada',       scores: { presenca: 3 } },
      { label: 'Um site mais profissional com Google/SEO inicial', scores: { express: 3 } },
      { label: 'Um site completo com várias páginas',              scores: { empresarial: 3 } },
      { label: 'Um sistema, painel, automação ou MicroSaaS',       scores: { saas: 10 } },
    ],
  },
  {
    text: 'Você já tem site hoje?',
    options: [
      { label: 'Não, vou começar do zero',                        scores: { inicial: 2 } },
      { label: 'Sim, mas está antigo ou ruim',                    scores: { express: 2 } },
      { label: 'Sim, mas quero algo mais profissional',           scores: { express: 1, presenca: 1 } },
      { label: 'Tenho só Instagram ou WhatsApp',                  scores: { presenca: 2 } },
      { label: 'Quero criar um sistema ou ferramenta online',     scores: { saas: 10 } },
    ],
  },
  {
    text: 'Qual é o principal objetivo?',
    options: [
      { label: 'Passar mais confiança para meus clientes',        scores: { presenca: 2 } },
      { label: 'Receber contatos direto no WhatsApp',             scores: { inicial: 2 } },
      { label: 'Aparecer melhor no Google',                       scores: { express: 3 } },
      { label: 'Apresentar vários serviços ou páginas',           scores: { empresarial: 3 } },
      { label: 'Tirar uma ideia de sistema ou SaaS do papel',     scores: { saas: 10 } },
    ],
  },
  {
    text: 'O que você quer incluir?',
    options: [
      { label: 'Só o básico para estar online',                           scores: { inicial: 3 } },
      { label: 'Página bonita com botão de WhatsApp',                     scores: { presenca: 3 } },
      { label: 'SEO inicial e Google Search Console',                     scores: { express: 3 } },
      { label: 'Várias páginas e estrutura institucional',                scores: { empresarial: 3 } },
      { label: 'Sistema, painel, login, cadastro ou automação',           scores: { saas: 10 } },
    ],
  },
  {
    text: 'Qual prazo você procura?',
    options: [
      { label: 'O mais rápido possível',                          scores: { inicial: 2 } },
      { label: 'Em até 3 dias',                                   scores: { express: 1, presenca: 1 } },
      { label: 'Posso esperar alguns dias por algo mais completo', scores: { empresarial: 2 } },
      { label: 'Preciso de algo sob medida',                      scores: { saas: 5 } },
      { label: 'Ainda quero entender as opções',                  scores: {} },
    ],
  },
];

/* ── Result config ───────────────────────────────────────── */
const RESULTS: Record<ResultKey, {
  title: string;
  price: string;
  description: string;
  ctaLabel: string;
  waMessage: string;
  accentColor: string;
  bgColor: string;
  glowColor: string;
}> = {
  inicial: {
    title:       'Presença Inicial',
    price:       'R$ 497',
    description: 'Ideal para quem quer começar com uma página simples, com domínio incluso, botão para WhatsApp e publicação no ar em até 3 dias.',
    ctaLabel:    'Quero começar pelo básico',
    waMessage:   'Olá, Paulo! Fiz o quiz e o plano indicado foi Presença Inicial de R$497. Quero entender se ele serve para meu negócio.',
    accentColor: '#cbd5e1',
    bgColor:     'rgba(148,163,184,0.08)',
    glowColor:   'rgba(148,163,184,0.20)',
  },
  presenca: {
    title:       'Presença Rápida',
    price:       'R$ 997',
    description: 'Ideal para quem quer uma página mais organizada, bonita e profissional para apresentar o negócio com WhatsApp e depoimentos.',
    ctaLabel:    'Quero a Presença Rápida',
    waMessage:   'Olá, Paulo! Fiz o quiz e o plano indicado foi Presença Rápida de R$997. Quero conversar sobre meu site.',
    accentColor: '#fcd34d',
    bgColor:     'rgba(234,179,8,0.08)',
    glowColor:   'rgba(234,179,8,0.22)',
  },
  express: {
    title:       'Profissional Express',
    price:       'R$ 1.497',
    description: 'Melhor custo-benefício para quem quer site profissional, domínio incluso, WhatsApp, SEO inicial, Google Search Console e estrutura de confiança.',
    ctaLabel:    'Quero o Profissional Express',
    waMessage:   'Olá, Paulo! Fiz o quiz e o plano indicado foi Profissional Express de R$1.497. Quero criar meu site com domínio, WhatsApp e Google.',
    accentColor: '#7dd3fc',
    bgColor:     'rgba(14,165,233,0.08)',
    glowColor:   'rgba(14,165,233,0.25)',
  },
  empresarial: {
    title:       'Empresarial Completo',
    price:       'R$ 2.997',
    description: 'Ideal para empresas que querem um site mais robusto, com até 5 páginas, estrutura institucional e SEO inicial por página.',
    ctaLabel:    'Quero o Empresarial Completo',
    waMessage:   'Olá, Paulo! Fiz o quiz e o plano indicado foi Empresarial Completo de R$2.997. Quero conversar sobre um site mais completo.',
    accentColor: '#c4b5fd',
    bgColor:     'rgba(124,58,237,0.08)',
    glowColor:   'rgba(124,58,237,0.25)',
  },
  saas: {
    title:       'Solução sob medida',
    price:       'Orçamento sob consulta',
    description: 'Ideal para quem quer criar um sistema, painel, automação, área de membros, integração, SaaS ou MicroSaaS.',
    ctaLabel:    'Tenho uma ideia de sistema',
    waMessage:   'Olá, Paulo! Fiz o quiz e quero conversar sobre uma solução sob medida, sistema ou MicroSaaS.',
    accentColor: '#e8c87a',
    bgColor:     'rgba(232,200,122,0.08)',
    glowColor:   'rgba(232,200,122,0.20)',
  },
};

/* ── Scoring ─────────────────────────────────────────────── */
function computeResult(answers: number[]): ResultKey {
  const scores: Record<ResultKey, number> = {
    inicial: 0, presenca: 0, express: 0, empresarial: 0, saas: 0,
  };
  answers.forEach((ansIdx, qIdx) => {
    const s = QUESTIONS[qIdx].options[ansIdx].scores;
    Object.entries(s).forEach(([k, v]) => { scores[k as ResultKey] += v ?? 0; });
  });
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as ResultKey;
}

/* ── WhatsApp icon ───────────────────────────────────────── */
function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function PlanFinder() {
  const [answers,    setAnswers]    = useState<number[]>([]);
  const [currentQ,   setCurrentQ]   = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [advancing,  setAdvancing]  = useState(false);

  const totalQ       = QUESTIONS.length;
  const currentAnswer = answers[currentQ] ?? null;

  function handleSelect(optIdx: number) {
    if (advancing) return;
    setAnswers((prev) => [...prev.slice(0, currentQ), optIdx]);
    setAdvancing(true);
    setTimeout(() => {
      setAdvancing(false);
      if (currentQ < totalQ - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setShowResult(true);
      }
    }, 220);
  }

  function goBack() {
    const prevQ = currentQ - 1;
    setCurrentQ(prevQ);
    setAnswers((prev) => prev.slice(0, prevQ));
  }

  function reset() {
    setAnswers([]);
    setCurrentQ(0);
    setShowResult(false);
    setAdvancing(false);
  }

  const result       = showResult ? computeResult(answers) : null;
  const resultConfig = result ? RESULTS[result] : null;
  const progressPct  = showResult ? 100 : Math.round((currentQ / totalQ) * 100);

  return (
    <Section className="bg-bg-soft">
      <Container size="md">

        {/* ── Section header ──────────────────────────────── */}
        <div
          className="animate-fade-up mx-auto mb-10 max-w-xl text-center"
          style={{ animationDelay: '60ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Não sabe qual plano escolher?
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing: '-0.025em',
              lineHeight:    '1.15',
            }}
          >
            Descubra qual plano combina com seu negócio
          </h2>
          <p className="mt-3 text-muted">
            Responda em menos de 1 minuto e veja a opção mais indicada para o que você precisa.
          </p>
        </div>

        {/* ── Quiz card ───────────────────────────────────── */}
        <div
          className="animate-fade-up mx-auto max-w-xl rounded-[var(--radius-lg)] border border-line bg-card overflow-hidden"
          style={{ animationDelay: '140ms' }}
        >

          {/* Progress bar */}
          <div className="px-7 pt-7 sm:px-10 sm:pt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-2">
                {showResult ? 'Resultado' : `Pergunta ${currentQ + 1} de ${totalQ}`}
              </span>
              <span className="text-xs font-medium text-muted-2">
                {showResult ? '✓ Concluído' : `${progressPct}%`}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-card-hi overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>

          {!showResult ? (
            /* ── Active question ───────────────────────── */
            <div className="px-7 pb-7 pt-6 sm:px-10 sm:pb-10">
              <p className="mb-5 font-display text-[1.1rem] font-semibold text-ink leading-snug">
                {QUESTIONS[currentQ].text}
              </p>

              <div className="space-y-2.5" role="group" aria-label={QUESTIONS[currentQ].text}>
                {QUESTIONS[currentQ].options.map((opt, i) => {
                  const isSelected = currentAnswer === i;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(i)}
                      aria-pressed={isSelected}
                      className={[
                        'w-full rounded-[var(--radius-sm)] border px-4 py-3.5 text-left text-sm',
                        'transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                        isSelected
                          ? 'border-accent/50 bg-accent/10 text-ink'
                          : 'border-line bg-card-hi text-muted hover:border-line-hi hover:text-ink',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={[
                            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150',
                            isSelected ? 'border-accent bg-accent' : 'border-muted-2',
                          ].join(' ')}
                          aria-hidden
                        >
                          {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span>{opt.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              {currentQ > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-5 flex items-center gap-1.5 text-xs text-muted-2 hover:text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Pergunta anterior
                </button>
              )}
            </div>

          ) : resultConfig ? (
            /* ── Result ────────────────────────────────── */
            <div className="px-7 pb-7 pt-6 sm:px-10 sm:pb-10" aria-live="polite">

              <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">
                Plano indicado para você
              </p>

              {/* Result highlight card */}
              <div
                className="rounded-[var(--radius)] border p-6 text-center"
                style={{
                  borderColor: `${resultConfig.accentColor}33`,
                  background:   resultConfig.bgColor,
                  boxShadow:   `0 0 50px -15px ${resultConfig.glowColor}`,
                }}
              >
                <p
                  className="font-display text-2xl font-extrabold"
                  style={{ color: resultConfig.accentColor, letterSpacing: '-0.02em' }}
                >
                  {resultConfig.title}
                </p>
                <p className="mt-1 text-xl font-semibold text-ink">
                  {resultConfig.price}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {resultConfig.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 space-y-3">
                <a
                  href={buildWhatsAppUrl(resultConfig.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 h-12 rounded-full px-5 text-[15px] font-display font-semibold text-white transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  style={{
                    background: 'var(--whats)',
                    boxShadow:  '0 10px 30px -10px rgba(37,211,102,0.45)',
                  }}
                >
                  <WAIcon />
                  {resultConfig.ctaLabel}
                </a>

                <a
                  href="/#planos"
                  className="inline-flex w-full items-center justify-center h-10 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors hover:border-line-hi hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Ver todos os planos
                </a>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-4 w-full text-center text-xs text-muted-2 transition-colors hover:text-muted hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                Refazer o quiz
              </button>
            </div>
          ) : null}

        </div>

      </Container>
    </Section>
  );
}

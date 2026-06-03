'use client';

import { useState, useEffect, type FormEvent } from 'react';
import type { TierSlug } from '@/types';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Input } from '@/components/ui';
import { trackLead } from '@/lib/analytics';

/* ── Section definitions — mirrors gerar-onboarding.js ─────── */
interface ChecklistItem {
  text: string;
  required: boolean;
  note?: string;
  placeholder?: string;
  rows?: number;
}

interface SectionDef {
  id: string;
  title: string;
  minTier: null | 'ouro' | 'platina' | 'diamante';
  tierLabel?: string;
  items: ChecklistItem[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'negocio',
    title: 'Sobre o negócio',
    minTier: null,
    items: [
      { text: 'Nome do negócio', required: true, placeholder: 'Como deve aparecer no site' },
      { text: 'Tipo de negócio / segmento', required: true, placeholder: 'Ex: barbearia, dentista, eletricista…' },
      { text: 'Cidade e região de atendimento', required: true, placeholder: 'Ex: São Paulo, SP' },
      { text: 'Frase curta sobre o que você faz', required: true, placeholder: 'Ex: "Barbearia premium no centro de SP"' },
      { text: 'WhatsApp para o botão do site', required: true, placeholder: 'Ex: (11) 99999-9999' },
    ],
  },
  {
    id: 'dominio',
    title: 'Domínio (.com.br)',
    minTier: null,
    items: [
      { text: '1ª opção de domínio', required: true, placeholder: 'Ex: nomedoseusite — sem o .com.br' },
      { text: '2ª opção de domínio', required: false, placeholder: 'Caso a 1ª já esteja registrada' },
      { text: 'Nome completo + CPF ou CNPJ', required: true, placeholder: 'O domínio ficará registrado no seu nome' },
    ],
  },
  {
    id: 'logo',
    title: 'Logo e identidade visual',
    minTier: null,
    items: [
      {
        text: 'Tem logo? Onde posso encontrar ou você vai enviar?',
        required: false,
        placeholder: 'Link do Drive, "vou enviar pelo WhatsApp", ou "não tenho"',
        note: 'Sem logo? Tudo bem — trabalho com o nome do negócio em tipografia limpa.',
      },
      { text: 'Paleta de cores da marca', required: false, placeholder: 'Ex: verde e dourado, ou "fica à sua escolha"' },
    ],
  },
  {
    id: 'fotos',
    title: 'Fotos',
    minTier: null,
    items: [
      {
        text: 'Onde posso acessar as fotos?',
        required: false,
        placeholder: 'Link do Google Drive, WhatsApp, ou "não tenho ainda"',
        note: 'Fotos do celular com boa luz funcionam perfeitamente. Espaço, serviços, resultados.',
      },
      { text: 'Tem foto pessoal ou da equipe?', required: false, placeholder: 'Sim / Não / Vou enviar pelo WhatsApp' },
      { text: 'Tem fotos de antes e depois?', required: false, placeholder: 'Se aplicável ao seu segmento' },
    ],
  },
  {
    id: 'servicos',
    title: 'Serviços e textos',
    minTier: null,
    items: [
      { text: 'Liste seus principais serviços', required: true, placeholder: 'Nome + breve descrição de cada um', rows: 5 },
      { text: 'Preços ou tabela de valores', required: false, placeholder: '"A partir de…", tabela, ou "sob consulta"' },
      { text: 'Formas de pagamento aceitas', required: false, placeholder: 'Pix, cartão, boleto, dinheiro…' },
      { text: 'O que te diferencia da concorrência na sua cidade?', required: false, placeholder: 'Seu diferencial competitivo' },
      { text: 'Textos ou conteúdo que você já tenha pronto', required: false, placeholder: 'Pode colar aqui ou dizer "nenhum"' },
    ],
  },
  {
    id: 'contato',
    title: 'Contato e redes sociais',
    minTier: null,
    items: [
      { text: 'E-mail de contato do negócio', required: false, placeholder: 'Se quiser exibir no site' },
      { text: 'Instagram', required: false, placeholder: '@seuperfil' },
      { text: 'Facebook', required: false, placeholder: 'Nome da página ou link' },
      { text: 'Outras redes (TikTok, YouTube, LinkedIn…)', required: false, placeholder: 'Se tiver e quiser incluir' },
      { text: 'Horário de atendimento', required: false, placeholder: 'Dias da semana + horários' },
      { text: 'Endereço', required: false, placeholder: 'Se atende presencialmente ou quer exibir localização' },
    ],
  },
  {
    id: 'depoimentos',
    title: 'Depoimentos de clientes',
    minTier: 'ouro',
    tierLabel: 'Ouro+',
    items: [
      {
        text: 'Depoimentos de clientes (2 a 5)',
        required: false,
        placeholder: 'Nome do cliente + texto do depoimento para cada um',
        rows: 6,
        note: 'Prints de avaliações do WhatsApp ou Google também servem — pode enviar pelo WhatsApp.',
      },
    ],
  },
  {
    id: 'seo',
    title: 'SEO e Google',
    minTier: 'platina',
    tierLabel: 'Platina+',
    items: [
      {
        text: 'Palavras que seus clientes usam para te buscar no Google',
        required: false,
        placeholder: 'Ex: "eletricista em Campinas", "manicure Moema"',
        note: 'Qualquer ideia ajuda — não precisa ser exato.',
      },
      { text: 'Você já tem perfil no Google Meu Negócio?', required: false, placeholder: 'Sim / Não / Não sei' },
    ],
  },
  {
    id: 'paginas',
    title: 'Páginas do site',
    minTier: 'diamante',
    tierLabel: 'Diamante',
    items: [
      { text: 'Confirmar páginas desejadas', required: false, placeholder: 'Padrão: Início, Sobre, Serviços, Contato' },
      { text: 'Qual seria a 5ª página extra?', required: false, placeholder: 'Ex: Portfólio, Blog, Localização, FAQ' },
    ],
  },
  {
    id: 'estilo',
    title: 'Estilo e referências',
    minTier: null,
    items: [
      { text: 'Cores que você prefere para o site', required: false, placeholder: '"Fica à sua escolha" também é totalmente válido' },
      { text: 'Tom de comunicação', required: false, placeholder: 'Formal, informal, divertido, técnico…' },
      { text: '2 ou 3 sites de referência que você gosta', required: false, placeholder: 'Links de qualquer segmento que achou bonito' },
      { text: 'O que você NÃO quer no site', required: false, placeholder: 'Estilos, cores, elementos a evitar' },
    ],
  },
];

const TIER_ORDER: TierSlug[] = ['prata', 'ouro', 'platina', 'diamante'];

function sectionVisible(section: SectionDef, tier: TierSlug): boolean {
  if (!section.minTier) return true;
  return TIER_ORDER.indexOf(tier) >= TIER_ORDER.indexOf(section.minTier);
}

const TIER_META: Record<TierSlug, {
  label: string;
  planName: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  dotColor: string;
}> = {
  prata: {
    label: 'Nível Prata',
    planName: 'Presença Inicial',
    textColor: '#cbd5e1',
    borderColor: 'rgba(148,163,184,0.30)',
    bgColor: 'rgba(148,163,184,0.07)',
    dotColor: '#94a3b8',
  },
  ouro: {
    label: 'Nível Ouro',
    planName: 'Presença Rápida',
    textColor: '#fcd34d',
    borderColor: 'rgba(234,179,8,0.40)',
    bgColor: 'rgba(234,179,8,0.07)',
    dotColor: '#fbbf24',
  },
  platina: {
    label: 'Nível Platina',
    planName: 'Profissional Express',
    textColor: '#7dd3fc',
    borderColor: 'rgba(56,189,248,0.40)',
    bgColor: 'rgba(56,189,248,0.07)',
    dotColor: '#38bdf8',
  },
  diamante: {
    label: 'Nível Diamante',
    planName: 'Empresarial Completo',
    textColor: '#c4b5fd',
    borderColor: 'rgba(167,139,250,0.40)',
    bgColor: 'rgba(167,139,250,0.07)',
    dotColor: '#a78bfa',
  },
};

/* ── Types ─────────────────────────────────────────────────── */
interface FormErrors {
  nome?: string;
  whatsapp?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

/* ── Helpers ────────────────────────────────────────────────── */
function validate(nome: string, whatsapp: string): FormErrors {
  const errs: FormErrors = {};
  if (nome.trim().length < 2) errs.nome = 'Informe seu nome (mínimo 2 caracteres).';
  if (whatsapp.replace(/\D/g, '').length < 10) errs.whatsapp = 'Informe DDD + número (mínimo 10 dígitos).';
  return errs;
}

function serializeMensagem(tier: TierSlug, fields: Record<string, string>): string {
  const meta = TIER_META[tier];
  const visible = SECTIONS.filter((s) => sectionVisible(s, tier));
  const parts = visible.map((section) => {
    const lines = [`=== ${section.title.toUpperCase()} ===`];
    section.items.forEach((item, i) => {
      const val = fields[`${section.id}_${i}`]?.trim() || '';
      lines.push(`${item.text}: ${val || '(não informado)'}`);
    });
    return lines.join('\n');
  });
  return `[Formulário de Onboarding — ${meta.planName} (${meta.label})]\n\n${parts.join('\n\n')}`;
}

/* ── WAIcon ─────────────────────────────────────────────────── */
function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden className="shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
    </svg>
  );
}

/* ── Success state ──────────────────────────────────────────── */
function SuccessPanel({ nome }: { nome: string }) {
  const firstName = nome.trim().split(' ')[0];
  const waMsg =
    'Olá! Acabei de preencher o formulário de onboarding com todas as informações do meu negócio. Pode confirmar o recebimento?';
  return (
    <div className="animate-fade-up py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M4.5 14l7 7 12-12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2
        className="font-display font-bold text-ink"
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-display)',
        }}
      >
        {firstName}, recebi tudo!
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-muted">
        Vou analisar as informações e entrar em contato pelo WhatsApp em breve para confirmar o início do projeto.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href={buildWhatsAppUrl(waMsg)} variant="whats" size="lg" leadingIcon={<WAIcon />}>
          Falar no WhatsApp
        </Button>
        <Button href="/" variant="ghost" size="lg">
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function OnboardingForm({ tier }: { tier: TierSlug }) {
  const meta = TIER_META[tier];
  const visibleSections = SECTIONS.filter((s) => sectionVisible(s, tier));

  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [fields, setFields] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ nome?: boolean; whatsapp?: boolean }>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [origem, setOrigem] = useState('');

  useEffect(() => {
    const { pathname, search } = window.location;
    setOrigem(`${pathname}${search} [onboarding]`);
  }, []);

  function setFieldValue(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleContactChange(field: 'nome' | 'whatsapp', value: string) {
    if (field === 'nome') setNome(value);
    else setWhatsapp(value);

    if (touched[field]) {
      const newNome = field === 'nome' ? value : nome;
      const newWa = field === 'whatsapp' ? value : whatsapp;
      const errs = validate(newNome, newWa);
      setErrors((prev) => {
        const n = { ...prev };
        if (errs[field]) n[field] = errs[field];
        else delete n[field];
        return n;
      });
    }
  }

  function handleContactBlur(field: 'nome' | 'whatsapp') {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(nome, whatsapp);
    setErrors((prev) => {
      const n = { ...prev };
      if (errs[field]) n[field] = errs[field];
      else delete n[field];
      return n;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ nome: true, whatsapp: true });
    const errs = validate(nome, whatsapp);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setServerError('');

    const mensagem = serializeMensagem(tier, fields);
    const segmento = fields['negocio_1']?.trim() || undefined;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || undefined,
          segmento,
          plano: meta.planName,
          mensagem,
          origem,
        }),
      });
      if (res.ok) {
        setStatus('success');
        trackLead({ plano: meta.planName, segmento });
      } else {
        setStatus('error');
        setServerError('Erro ao enviar. Tente novamente ou fale pelo WhatsApp.');
      }
    } catch {
      setStatus('error');
      setServerError('Sem conexão. Tente novamente ou fale pelo WhatsApp.');
    }
  }

  const isLoading = status === 'loading';

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-6">
      {status === 'success' ? (
        <SuccessPanel nome={nome} />
      ) : (
        <>
          {/* ── Header ─────────────────────────────────────────── */}
          <div className="mb-10 text-center">
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{
                color: meta.textColor,
                border: `1px solid ${meta.borderColor}`,
                background: meta.bgColor,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: meta.dotColor }}
                aria-hidden
              />
              {meta.label} · {meta.planName}
            </span>

            <h1
              className="mt-4 font-display font-bold text-ink"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                letterSpacing: '-0.025em',
                lineHeight: '1.15',
                fontFamily: 'var(--font-display)',
              }}
            >
              Vamos começar seu site!
            </h1>
            <p className="mt-4 text-muted">
              Preencha as informações abaixo. Quanto mais detalhes, mais rápido e preciso será o resultado.
              <br className="hidden sm:block" />
              Pode deixar campos em branco e completar depois pelo WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate aria-busy={isLoading} className="space-y-5">

            {/* ── Contato ─────────────────────────────────────── */}
            <section
              className="rounded-[var(--radius)] border border-line bg-card p-6 sm:p-7"
              aria-labelledby="section-contato-header"
            >
              <h2
                id="section-contato-header"
                className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent"
              >
                Suas informações de contato
              </h2>
              <div className="space-y-4">
                <Input
                  label="Seu nome"
                  name="contact_nome"
                  placeholder="Como posso te chamar?"
                  value={nome}
                  required
                  disabled={isLoading}
                  error={touched.nome ? errors.nome : undefined}
                  onChange={(e) => handleContactChange('nome', e.target.value)}
                  onBlur={() => handleContactBlur('nome')}
                  autoComplete="name"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Seu WhatsApp"
                    name="contact_whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={whatsapp}
                    required
                    disabled={isLoading}
                    error={touched.whatsapp ? errors.whatsapp : undefined}
                    onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                    onBlur={() => handleContactBlur('whatsapp')}
                    autoComplete="tel"
                  />
                  <Input
                    label="E-mail"
                    name="contact_email"
                    type="email"
                    placeholder="opcional"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    hint="Opcional"
                  />
                </div>
              </div>
            </section>

            {/* ── Checklist sections ───────────────────────────── */}
            {visibleSections.map((section, sectionIdx) => (
              <section
                key={section.id}
                className="rounded-[var(--radius)] border border-line bg-card p-6 sm:p-7"
                aria-labelledby={`section-${section.id}-header`}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2
                    id={`section-${section.id}-header`}
                    className="text-xs font-semibold uppercase tracking-widest text-muted"
                  >
                    {sectionIdx + 1}. {section.title}
                  </h2>
                  {section.tierLabel && (
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{
                        color: meta.textColor,
                        background: meta.bgColor,
                        border: `1px solid ${meta.borderColor}`,
                      }}
                    >
                      {section.tierLabel}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => {
                    const fieldKey = `${section.id}_${itemIdx}`;
                    const labelId = `label_${fieldKey}`;
                    const hintId = item.note ? `hint_${fieldKey}` : undefined;
                    return (
                      <div key={fieldKey} className="flex flex-col gap-1.5">
                        <label id={labelId} htmlFor={fieldKey} className="text-sm font-medium text-ink">
                          {item.text}
                          {item.required && <span className="ml-0.5 text-accent" aria-hidden>*</span>}
                        </label>
                        {item.note && (
                          <p id={hintId} className="text-xs text-muted">
                            {item.note}
                          </p>
                        )}
                        <textarea
                          id={fieldKey}
                          name={fieldKey}
                          rows={item.rows ?? 2}
                          placeholder={item.placeholder}
                          value={fields[fieldKey] ?? ''}
                          disabled={isLoading}
                          aria-labelledby={labelId}
                          aria-describedby={hintId}
                          onChange={(e) => setFieldValue(fieldKey, e.target.value)}
                          className="w-full resize-y rounded-lg border border-line bg-card-hi px-4 py-3 text-sm text-ink placeholder:text-muted-2 transition-colors focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* ── Server error + fallback WhatsApp ─────────────── */}
            {status === 'error' && serverError && (
              <div
                role="alert"
                className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-4 space-y-3"
              >
                <p className="text-sm text-danger">{serverError}</p>
                <a
                  href={buildWhatsAppUrl(
                    `Olá! Tentei enviar o formulário de onboarding pelo site mas houve um erro técnico. Me chamo ${nome.trim().split(' ')[0]}, meu WhatsApp é ${whatsapp}, plano: ${meta.planName}. Pode confirmar o recebimento?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whats px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-all"
                >
                  <WAIcon />
                  Confirmar pelo WhatsApp
                </a>
              </div>
            )}

            {/* ── Submit ──────────────────────────────────────── */}
            <div className="pb-6">
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Enviando…
                  </>
                ) : (
                  'Enviar materiais'
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-2">
                Seus dados são usados exclusivamente para criar o seu site.{' '}
                <a
                  href="/politica-de-privacidade"
                  className="underline-offset-2 transition-colors hover:text-muted hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidade
                </a>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

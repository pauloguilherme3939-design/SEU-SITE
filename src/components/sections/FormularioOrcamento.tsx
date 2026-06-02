'use client';

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { plans } from '@/data/plans';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button, Container, Input, Section, Textarea } from '@/components/ui';
import { trackLead } from '@/lib/analytics';

/* ── Types ─────────────────────────────────────────────────── */
interface FormState {
  nome: string;
  whatsapp: string;
  email: string;
  segmento: string;
  plano: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  whatsapp?: string;
  email?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

/* ── Validation ─────────────────────────────────────────────── */
function validate(d: FormState): FormErrors {
  const errs: FormErrors = {};
  if (d.nome.trim().length < 2) errs.nome = 'Informe seu nome (mínimo 2 caracteres).';
  if (d.whatsapp.replace(/\D/g, '').length < 10)
    errs.whatsapp = 'Informe DDD + número (mínimo 10 dígitos).';
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
    errs.email = 'E-mail inválido.';
  return errs;
}

/* ── WhatsApp icon ──────────────────────────────────────────── */
function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.25C5.168 1.25 1.25 5.168 1.25 10c0 1.5.39 2.91 1.076 4.13l-.951 3.47 3.57-.92A8.72 8.72 0 0010 18.75c4.832 0 8.75-3.918 8.75-8.75S14.832 1.25 10 1.25zM7.3 6.525c-.15-.378-.308-.385-.45-.392-.116-.006-.25-.005-.383-.005s-.35.05-.533.25c-.183.2-.7.684-.7 1.668 0 .983.717 1.933.817 2.066.1.134 1.4 2.234 3.458 3.042 1.713.675 2.059.541 2.43.508.37-.033 1.2-.492 1.368-.967.167-.475.167-.883.117-.967-.05-.083-.183-.133-.383-.233-.2-.1-1.183-.583-1.366-.65-.184-.066-.317-.1-.45.1-.133.2-.517.65-.633.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.608-.992-.594-.53-.997-1.183-1.113-1.383-.117-.2-.012-.308.088-.408.09-.09.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.483z" />
    </svg>
  );
}

/* ── Select wrapper (native select com visual do tema) ─────── */
function SelectField({
  id,
  label,
  value,
  onChange,
  children,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
          disabled={disabled}
          className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-card-hi px-4 pr-10 text-ink transition-colors focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ colorScheme: 'dark' }}
        >
          {children}
        </select>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Success state ──────────────────────────────────────────── */
function SuccessPanel({ nome, planoId }: { nome: string; planoId: string }) {
  const firstName = nome.trim().split(' ')[0];
  const planName = plans.find((p) => p.id === planoId)?.name;
  const waMsg = `Olá! Preenchi o formulário de orçamento no site. Me chamo ${firstName}${planName ? ` e tenho interesse no plano ${planName}` : ''}. Podemos conversar?`;

  return (
    <div className="animate-fade-up mx-auto max-w-md py-8 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path d="M4.5 14l7 7 12-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3
        className="font-display font-bold text-ink"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}
      >
        {firstName}, recebemos seu pedido!
      </h3>
      <p className="mt-3 text-muted">
        Vou analisar e retornar em até{' '}
        <strong className="font-semibold text-ink">1 hora</strong> com uma proposta
        personalizada.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href={buildWhatsAppUrl(waMsg)} variant="whats" size="lg" leadingIcon={<WAIcon />}>
          Também falar no WhatsApp
        </Button>
        <Button href="/#planos" variant="ghost" size="lg">
          Ver os planos
        </Button>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function FormularioOrcamento({
  planoPreSelecionado,
  segmentoPreenchido,
  origemSuffix,
}: {
  planoPreSelecionado?: string;
  segmentoPreenchido?: string;
  origemSuffix?: string;
}) {
  const [form, setForm] = useState<FormState>({
    nome: '',
    whatsapp: '',
    email: '',
    segmento: segmentoPreenchido ?? '',
    plano: planoPreSelecionado ?? '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormErrors, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [origem, setOrigem] = useState('');

  /* Captura origem (UTMs + pathname) no client */
  useEffect(() => {
    const { pathname, search } = window.location;
    const tag = origemSuffix ? ` [${origemSuffix}]` : '';
    setOrigem(`${pathname}${search}${tag}`);
  }, [origemSuffix]);

  function set<K extends keyof FormState>(field: K, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field as keyof FormErrors]) {
      const errs = validate(next);
      const fieldErr = errs[field as keyof FormErrors];
      setErrors((prev) => {
        const n = { ...prev };
        if (fieldErr) n[field as keyof FormErrors] = fieldErr;
        else delete n[field as keyof FormErrors];
        return n;
      });
    }
  }

  function blur(field: keyof FormErrors) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => {
      const n = { ...prev };
      if (errs[field]) n[field] = errs[field];
      else delete n[field];
      return n;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ nome: true, whatsapp: true, email: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origem }),
      });
      if (res.ok) {
        setStatus('success');
        trackLead({ plano: form.plano || undefined, segmento: form.segmento || undefined });
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
    <Section anchorId="orcamento" className="bg-bg-soft">
      <Container size="md">

        {/* Header */}
        <div className="animate-fade-up mx-auto mb-12 max-w-xl text-center" style={{ animationDelay: '60ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Orçamento gratuito
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: '1.15', fontFamily: 'var(--font-display)' }}
          >
            Receba uma proposta personalizada
          </h2>
          <p className="mt-4 text-muted">
            Preencha em 2 minutos. Resposta em até 1h no horário comercial, sem compromisso.
          </p>
        </div>

        <div className="animate-fade-up grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12" style={{ animationDelay: '120ms' }}>

          {/* ── Left: why ──────────────────────────────────── */}
          <div className="lg:pt-2">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-2">
              O que você recebe
            </p>
            <ul className="space-y-5">
              {[
                { icon: '⏱', title: 'Resposta em até 1 hora', sub: 'No horário comercial. Fora desse horário, respondo no dia seguinte.' },
                { icon: '🎯', title: 'Proposta personalizada', sub: 'Para o seu negócio, não um template genérico.' },
                { icon: '💬', title: 'Sem pressão de venda', sub: 'Você decide se quer avançar — sem compromisso.' },
                { icon: '🚀', title: 'Site no ar em até 3 dias', sub: 'Após aprovação da proposta e envio dos materiais.' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="text-xl leading-none">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-8 h-px bg-line" />

            <p className="text-xs text-muted-2">
              Prefere falar direto?{' '}
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline underline-offset-2"
              >
                Manda mensagem no WhatsApp →
              </a>
            </p>
          </div>

          {/* ── Right: form ────────────────────────────────── */}
          <div className="rounded-[var(--radius-lg)] border border-line bg-card p-7 sm:p-9">
            {status === 'success' ? (
              <SuccessPanel nome={form.nome} planoId={form.plano} />
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-busy={isLoading} className="space-y-5">

                {/* Nome */}
                <Input
                  label="Seu nome"
                  name="nome"
                  placeholder="Como posso te chamar?"
                  value={form.nome}
                  required
                  disabled={isLoading}
                  error={touched.nome ? errors.nome : undefined}
                  onChange={(e) => set('nome', e.target.value)}
                  onBlur={() => blur('nome')}
                  autoComplete="name"
                />

                {/* WhatsApp + Email — 2 cols */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="WhatsApp"
                    name="whatsapp"
                    type="tel"
                    placeholder="(16) 99999-9999"
                    value={form.whatsapp}
                    required
                    disabled={isLoading}
                    error={touched.whatsapp ? errors.whatsapp : undefined}
                    onChange={(e) => set('whatsapp', e.target.value)}
                    onBlur={() => blur('whatsapp')}
                    autoComplete="tel"
                  />
                  <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="opcional"
                    value={form.email}
                    disabled={isLoading}
                    error={touched.email ? errors.email : undefined}
                    onChange={(e) => set('email', e.target.value)}
                    onBlur={() => blur('email')}
                    autoComplete="email"
                    hint="Opcional"
                  />
                </div>

                {/* Segmento + Plano — 2 cols */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Seu negócio"
                    name="segmento"
                    placeholder="Ex: salão, dentista…"
                    value={form.segmento}
                    disabled={isLoading}
                    onChange={(e) => set('segmento', e.target.value)}
                    hint="Opcional"
                  />
                  <SelectField
                    id="plano"
                    label="Plano de interesse"
                    value={form.plano}
                    onChange={(v) => set('plano', v)}
                    disabled={isLoading}
                  >
                    <option value="">Não sei ainda — me oriente</option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.priceLabel}
                      </option>
                    ))}
                  </SelectField>
                </div>

                {/* Mensagem */}
                <Textarea
                  label="Mensagem"
                  name="mensagem"
                  placeholder="Conte um pouco sobre o que você precisa…"
                  value={form.mensagem}
                  rows={3}
                  disabled={isLoading}
                  onChange={(e) => set('mensagem', e.target.value)}
                  hint="Opcional — mas quanto mais detalhes, melhor a proposta."
                />

                {/* Server error */}
                {status === 'error' && serverError && (
                  <p className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
                    {serverError}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
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
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando…
                    </>
                  ) : (
                    'Receber proposta gratuita'
                  )}
                </Button>

                <p className="text-center text-xs text-muted-2">
                  Sem spam. Seus dados são usados apenas para montar a proposta.
                </p>

              </form>
            )}
          </div>

        </div>
      </Container>
    </Section>
  );
}

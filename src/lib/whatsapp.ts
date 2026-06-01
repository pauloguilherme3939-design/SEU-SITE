import { site } from '@/data/site';

/**
 * Monta o link wa.me com mensagem opcional pré-preenchida.
 * Usa o número do site.ts. Se mensagem vazia, cai na mensagem padrão.
 */
export function buildWhatsAppUrl(message?: string): string {
  const phone = site.whatsapp.replace(/\D/g, '');
  const text = (message?.trim() || site.whatsappDefaultMessage).trim();
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Mensagem padronizada para cobrança de orçamento por plano.
 * Mantém o contexto do clique no link wa.me.
 */
export function whatsAppForPlan(planName: string): string {
  return buildWhatsAppUrl(
    `Olá! Tenho interesse no plano "${planName}" e gostaria de tirar dúvidas.`,
  );
}

/**
 * Mensagem padronizada para nichos (página /para/[slug]).
 */
export function whatsAppForNicho(profissao: string): string {
  return buildWhatsAppUrl(
    `Olá! Sou ${profissao.toLowerCase()} e quero um site para o meu negócio.`,
  );
}

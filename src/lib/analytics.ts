/**
 * Funções de rastreamento para Meta Pixel e GA4.
 * Seguras para chamar em qualquer momento: verificam se as libs estão carregadas
 * antes de disparar. Nunca lançam exceção.
 *
 * Uso em componentes client:
 *   import { trackLead, trackContact } from '@/lib/analytics';
 */

type AnyFn = (...args: unknown[]) => void;
type Win = Window & { fbq?: AnyFn; gtag?: AnyFn };

function px(event: string, data?: Record<string, unknown>) {
  try { (window as Win).fbq?.('track', event, data ?? {}); } catch { /* noop */ }
}

function ga(eventName: string, params?: Record<string, unknown>) {
  try { (window as Win).gtag?.('event', eventName, params ?? {}); } catch { /* noop */ }
}

/** Dispara ao enviar o formulário de orçamento com sucesso. */
export function trackLead(data?: { plano?: string; segmento?: string }) {
  px('Lead', data);
  ga('generate_lead', data);
}

/** Dispara ao clicar em qualquer botão de WhatsApp. */
export function trackContact() {
  px('Contact');
  ga('contact');
}

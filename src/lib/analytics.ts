/**
 * Funções de rastreamento para Meta Pixel e GA4.
 * Seguras para chamar em qualquer momento: verificam se as libs estão carregadas
 * antes de disparar. Nunca lançam exceção.
 *
 * Uso em componentes client:
 *   import { trackLead, trackContact, trackPlanSelect } from '@/lib/analytics';
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

/** Dispara ao clicar em qualquer botão de WhatsApp (chamado pelo listener global em MetaPixel). */
export function trackContact() {
  px('Contact');
  ga('contact');
}

/**
 * Dispara ao clicar no CTA de um plano específico.
 * Meta: InitiateCheckout · GA4: begin_checkout
 */
export function trackPlanSelect(data: {
  planId: string;
  planName: string;
  tier: string;
  price: number | null;
}) {
  px('InitiateCheckout', {
    content_name: data.planName,
    content_ids: [data.planId],
    content_type: 'product',
    value: data.price ?? 0,
    currency: 'BRL',
  });
  ga('begin_checkout', {
    currency: 'BRL',
    value: data.price ?? 0,
    items: [{
      item_id:       data.planId,
      item_name:     data.planName,
      item_category: data.tier,
      price:         data.price ?? 0,
      quantity:      1,
    }],
  });
}

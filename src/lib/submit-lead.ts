import type { Lead } from '@/types';

/**
 * Envia um lead para os destinos configurados via env vars.
 * - LEAD_WEBHOOK_URL  → POST JSON para qualquer webhook (n8n, Make, Zapier…)
 * - RESEND_API_KEY + NOTIFICATION_EMAIL → e-mail de notificação via Resend REST
 * Degrada com elegância: se nenhuma env estiver definida, loga em dev e retorna ok.
 */
export async function submitLead(lead: Lead): Promise<void> {
  const tasks: Promise<void>[] = [];

  /* 1 — Webhook --------------------------------------------------- */
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    tasks.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, timestamp: new Date().toISOString() }),
      })
        .then((r) => {
          if (!r.ok) console.error(`[lead] webhook status ${r.status}`);
        })
        .catch((e) => console.error('[lead] webhook error:', e)),
    );
  }

  /* 2 — E-mail via Resend REST API (sem SDK, zero deps extra) ----- */
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;
  if (resendKey && toEmail) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'SeuSite Leads <onboarding@resend.dev>',
          to: [toEmail],
          subject: `Novo orçamento: ${lead.nome}${lead.plano ? ` — ${lead.plano}` : ''}`,
          text: formatLeadText(lead),
        }),
      })
        .then((r) => {
          if (!r.ok) console.error(`[lead] resend status ${r.status}`);
        })
        .catch((e) => console.error('[lead] resend error:', e)),
    );
  }

  /* Fallback: log em dev se não há destinos configurados ----------- */
  if (!webhookUrl && (!resendKey || !toEmail)) {
    console.log('[lead] DEV — nenhum destino configurado. Payload:', JSON.stringify(lead, null, 2));
  }

  await Promise.allSettled(tasks);
}

/**
 * Valida que o payload tem os campos mínimos obrigatórios.
 */
export function isValidLead(body: unknown): body is Lead {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  const nome = typeof b.nome === 'string' ? b.nome.trim() : '';
  const digits = typeof b.whatsapp === 'string' ? b.whatsapp.replace(/\D/g, '') : '';
  return nome.length >= 2 && digits.length >= 10;
}

function formatLeadText(lead: Lead): string {
  return [
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.whatsapp}`,
    lead.email ? `E-mail: ${lead.email}` : null,
    lead.segmento ? `Segmento: ${lead.segmento}` : null,
    lead.plano ? `Plano: ${lead.plano}` : null,
    lead.mensagem ? `\nMensagem:\n${lead.mensagem}` : null,
    lead.origem ? `\nOrigem: ${lead.origem}` : null,
    `\nData: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`,
  ]
    .filter(Boolean)
    .join('\n');
}

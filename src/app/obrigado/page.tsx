/**
 * /obrigado — rota de exemplo do template ThankYou.
 *
 * Para usar num projeto de cliente:
 *   1. Copie ThankYou.tsx para o projeto do cliente.
 *   2. Substitua as props abaixo pelos dados do cliente.
 *   3. Aponte a ação pós-envio do formulário / clique do CTA
 *      para esta rota: router.push('/obrigado') ou redirect('/obrigado').
 *
 * Para usar com rastreamento do CLIENTE (não o seu próprio):
 *   - Instale o Pixel e GA4 do cliente no layout do projeto dele.
 *   - O ThankYou chama fbq('track','Lead') e gtag('generate_lead')
 *     automaticamente via onConversion fallback, ou passe a função
 *     onConversion com a lógica específica.
 */

import type { Metadata } from 'next';
import ThankYou from '@/components/templates/ThankYou';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contato recebido — Site no Ar Express',
  robots: { index: false, follow: false }, // não indexar página de obrigado
};

export default function ObrigadoPage() {
  const waUrl = buildWhatsAppUrl(
    'Olá, Paulo! Acabei de preencher o formulário no seu site. Aguardo o retorno!',
  );

  return (
    <ThankYou
      businessName="Site no Ar Express"
      confirmationMessage="Contato recebido!"
      detail="Vou analisar e retornar em até 1 hora no horário comercial com uma proposta personalizada para o seu negócio."
      whatsappUrl={waUrl}
      whatsappLabel="Também falar pelo WhatsApp"
      nextStep={{
        label: 'Ver os planos enquanto isso',
        href: '/#planos',
        icon: 'arrow',
      }}
      siteUrl="/"
    />
  );
}

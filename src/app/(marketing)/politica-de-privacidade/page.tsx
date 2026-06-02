/**
 * /politica-de-privacidade — Política de Privacidade do Site no Ar Express
 *
 * COMO REUTILIZAR EM UM PROJETO DE CLIENTE
 * ─────────────────────────────────────────
 * 1. Copie este arquivo para o projeto do cliente (mesma rota).
 * 2. Copie src/data/politica-privacidade.ts e preencha com os dados do cliente.
 * 3. Atualize as `metadata` abaixo com o nome e URL do cliente.
 * 4. Para permitir indexação, mude `robots` para { index: true, follow: true }
 *    ou remova o campo (o padrão do Next.js é indexar).
 * 5. Adicione o link no footer: <a href="/politica-de-privacidade">Privacidade</a>
 */

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { politicaConfig } from '@/data/politica-privacidade';
import PoliticaPrivacidade from '@/components/templates/PoliticaPrivacidade';

export const metadata: Metadata = {
  ...buildMetadata({
    title: `Política de Privacidade — ${politicaConfig.nomeNegocio}`,
    description:
      `Saiba como ${politicaConfig.nomeNegocio} coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).`,
    path: '/politica-de-privacidade',
  }),
  // Remova ou mude para { index: true } se quiser que o Google indexe esta página.
  robots: { index: false, follow: false },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-bg">
      <PoliticaPrivacidade config={politicaConfig} />
    </div>
  );
}

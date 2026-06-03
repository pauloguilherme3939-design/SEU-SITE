/**
 * politica-privacidade.ts — Configuração da Política de Privacidade
 *
 * ═══════════════════════════════════════════════════════════════
 * COMO REUTILIZAR EM UM PROJETO DE CLIENTE
 * ─────────────────────────────────────────
 * 1. Copie este arquivo para o projeto do cliente.
 * 2. Preencha os campos abaixo com os dados reais do cliente.
 * 3. Passe o objeto `politicaConfig` como prop para o componente
 *    PoliticaPrivacidade: <PoliticaPrivacidade config={politicaConfig} />
 * 4. Para a rota, copie src/app/(marketing)/politica-de-privacidade/page.tsx
 *    e importe o config deste arquivo.
 * 5. Atualize `dataAtualizacao` sempre que a política for alterada.
 *
 * CAMPOS OBRIGATÓRIOS: nomeNegocio, nomeResponsavel, emailContato, siteUrl
 * ═══════════════════════════════════════════════════════════════
 */

export interface PoliticaConfig {
  /** Nome comercial do negócio — aparece no título e no texto */
  nomeNegocio: string;

  /** Nome completo do responsável pelo tratamento de dados (Controlador) */
  nomeResponsavel: string;

  /** CPF ou CNPJ do responsável (opcional — incluir se o cliente quiser) */
  cnpjOuCpf?: string;

  /** E-mail para solicitações de privacidade */
  emailContato: string;

  /** WhatsApp para contato sobre privacidade (opcional) */
  whatsappContato?: string;

  /** URL do site do cliente */
  siteUrl: string;

  /**
   * Lista de finalidades para o tratamento de dados.
   * Ex: 'Entrar em contato para fornecer orçamento', 'Enviar informações solicitadas'
   */
  finalidadeColeta: string[];

  /** O site usa Google Analytics? (afeta a seção de cookies e compartilhamento) */
  usaGoogleAnalytics: boolean;

  /** O site usa Meta Pixel / Facebook Pixel? */
  usaMetaPixel: boolean;

  /** O site tem formulário de contato ou captura de leads? */
  temFormulario: boolean;

  /**
   * Data da última atualização da política — formato legível.
   * Ex: '02 de junho de 2026'
   * Atualize sempre que o conteúdo da política mudar.
   */
  dataAtualizacao: string;
}

/* ──────────────────────────────────────────────────────────────
   CONFIGURAÇÃO DESTE SITE — Site no Ar Express
   Para um projeto de cliente, substitua todos os campos abaixo.
────────────────────────────────────────────────────────────── */
export const politicaConfig: PoliticaConfig = {
  nomeNegocio:       'Site no Ar Express',
  nomeResponsavel:   'Paulo Guilherme',
  cnpjOuCpf:         undefined, // preencha se quiser exibir
  emailContato:      'contato@sitenoarexpress.com.br',
  whatsappContato:   '5516993138450',
  siteUrl:           'https://sitenoarexpress.com.br',
  finalidadeColeta:  [
    'Entrar em contato para fornecer orçamento personalizado',
    'Responder dúvidas enviadas pelo formulário ou WhatsApp',
    'Enviar informações sobre serviços, prazos e condições solicitadas',
  ],
  usaGoogleAnalytics: true,
  usaMetaPixel:       true,
  temFormulario:      true,
  dataAtualizacao:    '02 de junho de 2026',
};

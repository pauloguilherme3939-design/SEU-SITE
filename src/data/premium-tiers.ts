/**
 * Dados da seção PremiumTiers.
 *
 * Fonte: src/data/plans.ts (verdade comercial) + saasOffer para o tier 5.
 * Mapeamento alinhado ao briefing 2026-06-14 (5 tiers):
 *
 *   Tier 1 / Prata     → Presença Inicial      (R$ 497)
 *   Tier 2 / Ouro      → Presença Rápida       (R$ 997)
 *   Tier 3 / Platina   → Profissional Express  (R$ 1.497)  ← FEATURED
 *   Tier 4 / Diamante  → Empresarial Completo  (R$ 2.997)
 *   Tier 5 / Sob Medida→ Projeto Sob Medida    (sob consulta)
 *
 * O arquivo HTML "Tiers Premium (download).html" é referência VISUAL.
 * O conteúdo comercial (nomes, features, bônus, preços, prazos) vem
 * sempre de plans.ts — não do HTML de referência.
 *
 * plans.ts segue intocado (alimenta quiz PlanFinder e JSON-LD da home).
 */

import type { TierSlug } from '@/types';

/** ID local ao PremiumTiers: estende TierSlug global com "sob-medida". */
export type PremiumTierId = TierSlug | 'sob-medida';

export interface PremiumTierFeature {
  /** Texto da feature. */
  label: string;
  /** Se a feature está inclusa neste tier (riscado quando false). */
  included: boolean;
}

export interface PremiumTier {
  id: PremiumTierId;
  /** Ordem no grid (1..5) e label "Tier N" visível no card. */
  tierNumber: 1 | 2 | 3 | 4 | 5;
  /** Etiqueta do nível (ex: "Nível Prata"). */
  rankLabel: string;
  /** Nome comercial do plano (ex: "Presença Inicial"). */
  name: string;
  /** Frase curta de posicionamento (ex: "Primeiro passo online..."). */
  idealFor: string;
  /** Texto descritivo (forWho de plans.ts). */
  description: string;
  /** Símbolo monetário visível (R$). */
  currency: string;
  /** Preço numérico (null para "sob consulta"). */
  price: number | null;
  /** Label visível do preço ("497", "1.497", "Sob consulta"). */
  priceLabel: string;
  /** Forma de pagamento (paymentNote de plans.ts). */
  paymentNote: string;
  /** Cabeçalho da lista de features (ex: "Tudo do Nível Prata, e mais"). */
  featuresHeader: string;
  /** Lista de features inclusos/não inclusos. */
  features: PremiumTierFeature[];
  /** Cabeçalho da caixa de bônus. */
  bonusHeader: string;
  /** Bônus exclusivos do tier. */
  bonus: string[];
  /** Texto do CTA. */
  ctaLabel: string;
  /** Mensagem pré-pronta de WhatsApp. */
  whatsappMessage: string;
  /** Marcado se o card recebe destaque (badge + elevação + autosheen). */
  featured?: boolean;
  /** Texto do badge quando featured. */
  badgeText?: string;
  /** Selo de prazo de entrega (deadline de plans.ts). */
  deliveryTag: string;
  /** Texto pequeno no rodapé do card (ex: manutenção opcional). */
  footerNote?: string;
}

export const premiumTiers: PremiumTier[] = [
  // ── Tier 1 / Prata ─────────────────────────────────────────────────────
  {
    id: 'prata',
    tierNumber: 1,
    rankLabel: 'Nível Prata',
    name: 'Presença Inicial',
    idealFor: 'Primeiro passo online com profissionalismo',
    description:
      'Para quem ainda não tem site e precisa de um endereço online para mandar quando o cliente perguntar. Simples, rápido e no ar em 3 dias.',
    currency: 'R$',
    price: 497,
    priceLabel: '497',
    paymentNote: 'à vista ou entrada para iniciar',
    featuresHeader: 'O essencial premium',
    features: [
      { label: '1 página completa com 5 seções essenciais', included: true },
      { label: 'Design mobile-first (onde 7 em cada 10 clientes acessam)', included: true },
      { label: 'Botão de WhatsApp com texto pronto e direto', included: true },
      { label: 'Domínio .com.br registrado no seu CPF/CNPJ (1 ano incluso)', included: true },
      { label: 'Hospedagem em CDN global (Vercel) — rápido no Brasil todo', included: true },
      { label: 'SSL automático (cadeado verde no navegador)', included: true },
      { label: 'Meta title e description otimizados', included: true },
      { label: 'Open Graph configurado (link bonito ao compartilhar)', included: true },
      { label: 'HTML semântico (acessível e amigável ao Google)', included: true },
      { label: 'URLs amigáveis ao Google', included: true },
      { label: 'Google Search Console configurado', included: true },
      { label: 'Links de redes sociais no rodapé', included: true },
      { label: 'Horário de funcionamento e localização visíveis', included: true },
      { label: '1 rodada de ajustes simples após entrega', included: true },
      { label: 'Textos personalizados para o seu nicho', included: false },
      { label: 'SEO técnico por seção + indexação manual', included: false },
    ],
    bonusHeader: 'Bônus inclusos',
    bonus: [
      'Botão WhatsApp com mensagem pré-escrita por nicho (testada para converter)',
      'Favicon personalizado com a logo ou iniciais do negócio',
      'Bio do Instagram otimizada + 5 ideias de highlights estratégicos',
      'Checklist PDF: 10 ações para divulgar o site no primeiro mês',
    ],
    ctaLabel: 'Quero começar agora',
    whatsappMessage:
      'Olá! Tenho interesse no plano Presença Inicial (R$ 497) do Site no Ar Express. Quero saber o que está incluso e verificar se ainda tem vaga disponível.',
    deliveryTag: 'Entrega em até 3 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 60/mês',
  },

  // ── Tier 2 / Ouro ──────────────────────────────────────────────────────
  {
    id: 'ouro',
    tierNumber: 2,
    rankLabel: 'Nível Ouro',
    name: 'Presença Rápida',
    idealFor: 'Autônomo que quer parecer maior do que é',
    description:
      'Para autônomos que querem um site bonito e profissional — com copy personalizada, portfólio, depoimentos e um visual que passa confiança antes mesmo do primeiro contato.',
    currency: 'R$',
    price: 997,
    priceLabel: '997',
    paymentNote: 'à vista ou entrada para iniciar',
    featuresHeader: 'Tudo do Nível Prata, e mais',
    features: [
      { label: 'Landing page com 7+ seções de impacto (Hero, Serviços, Sobre, Depoimentos, Galeria, FAQ, CTA)', included: true },
      { label: 'Visual elaborado — paleta personalizada + tipografia profissional', included: true },
      { label: 'Copy persuasiva personalizada para o seu público', included: true },
      { label: 'Seção Sobre construída a partir de brief com você', included: true },
      { label: 'Seção de depoimentos pronta para preencher', included: true },
      { label: 'Galeria de portfólio com até 12 imagens do trabalho', included: true },
      { label: 'FAQ que responde dúvidas antes do contato (reduz objeções)', included: true },
      { label: 'Animações suaves ao rolar a página (scroll-reveal)', included: true },
      { label: 'Hover effects e micro-interações profissionais', included: true },
      { label: 'Botões de WhatsApp em pontos estratégicos (não só topo)', included: true },
      { label: 'Google Maps incorporado com a localização do negócio', included: true },
      { label: 'SEO técnico avançado por seção + indexação manual', included: false },
    ],
    bonusHeader: 'Bônus do Ouro',
    bonus: [
      'FAQ com 10+ perguntas que quebram objeções de compra',
      'Google Maps com pin no endereço (cliente acha você pelo celular)',
      'Guia PDF: Bombe seu WhatsApp (estratégias + 12 mensagens prontas)',
      'Modelos de resposta automática para WhatsApp Business',
    ],
    ctaLabel: 'Quero a Presença Rápida',
    whatsappMessage:
      'Olá! Tenho interesse no plano Presença Rápida (R$ 997) do Site no Ar Express. Quero criar um site completo e bonito para o meu negócio. Como funciona?',
    deliveryTag: 'Entrega em até 3 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 80/mês',
  },

  // ── Tier 3 / Platina (FEATURED) ────────────────────────────────────────
  {
    id: 'platina',
    tierNumber: 3,
    rankLabel: 'Nível Platina',
    name: 'Profissional Express',
    idealFor: 'Melhor custo-benefício · mais completo',
    description:
      'Para quem quer ser encontrado no Google, passar imagem de empresa séria e converter visita em contato — sem pagar preço de agência.',
    currency: 'R$',
    price: 1497,
    priceLabel: '1.497',
    paymentNote: '50% de entrada · 50% na entrega',
    featuresHeader: 'Tudo do Nível Ouro, e mais',
    features: [
      { label: 'Copy completa e personalizada de todas as seções', included: true },
      { label: 'SEO técnico por seção (H1, H2, alt text, meta tags)', included: true },
      { label: 'Schema markup LocalBusiness (Google entende seu negócio)', included: true },
      { label: 'Schema markup Service (cada serviço com schema próprio)', included: true },
      { label: 'Open Graph customizado por seção (preview lindo no WhatsApp)', included: true },
      { label: 'Submissão e indexação manual no Google Search Console', included: true },
      { label: 'Otimização automática de imagens (AVIF/WebP — site mais rápido)', included: true },
      { label: 'PageSpeed Score 90+ no mobile (testado e comprovado)', included: true },
      { label: 'Estrutura de conversão testada (CTA, urgência, prova social)', included: true },
      { label: 'Página de Obrigado pós-envio (rastreamento de conversão)', included: true },
      { label: '2 rodadas de ajuste após a entrega', included: true },
      { label: '30 dias de suporte por dúvidas pós-entrega', included: true },
    ],
    bonusHeader: 'Bônus do Platina',
    bonus: [
      'Prioridade absoluta na fila — você entra na frente de outros pedidos',
      'Página de Obrigado pós-conversão (rastreamento + captura de e-mail)',
      'Descrição completa do Perfil da Empresa no Google (pronta para colar)',
      'Script de lançamento: mensagem pronta para divulgar nas redes',
    ],
    ctaLabel: 'Quero o Profissional Express',
    whatsappMessage:
      'Olá! Tenho interesse no plano Profissional Express (R$ 1.497) do Site no Ar Express. Quero um site completo com SEO e Google. Ainda tem vaga disponível?',
    featured: true,
    badgeText: 'Mais escolhido',
    deliveryTag: 'Entrega em até 3 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 150/mês',
  },

  // ── Tier 4 / Diamante ──────────────────────────────────────────────────
  {
    id: 'diamante',
    tierNumber: 4,
    rankLabel: 'Nível Diamante',
    name: 'Empresarial Completo',
    idealFor: 'Empresa com estrutura e presença máxima',
    description:
      'Para negócios com operação robusta que precisam de até 8 páginas, Google Analytics, formulário integrado e suporte contínuo após a entrega.',
    currency: 'R$',
    price: 2997,
    priceLabel: '2.997',
    paymentNote: '50% de entrada · 50% na entrega',
    featuresHeader: 'Tudo do Nível Platina, e mais',
    features: [
      { label: 'Até 8 páginas (Home, Sobre, Serviços, Portfólio, Blog, Contato e +2 livres)', included: true },
      { label: 'Estrutura escalável para até 20 páginas adicionais (cresce com você)', included: true },
      { label: 'Menu superior com hierarquia + breadcrumbs', included: true },
      { label: 'SEO individualizado por página (cada página única para o Google)', included: true },
      { label: 'Schema markup individualizado por página', included: true },
      { label: 'Formulário de contato integrado com notificação por e-mail', included: true },
      { label: 'Google Analytics 4 + metas de conversão configuradas', included: true },
      { label: 'Meta Pixel pronto para campanhas (Instagram/Facebook Ads)', included: true },
      { label: 'Política de Privacidade + Termos de Uso prontos', included: true },
      { label: 'robots.txt customizado + sitemap.xml dinâmico com prioridades', included: true },
      { label: 'Backup mensal automatizado das alterações', included: true },
      { label: 'Atendimento prioritário VIP — resposta em até 2 horas', included: true },
      { label: '60 dias de suporte + 1 ajuste de cortesia no 1º mês', included: true },
    ],
    bonusHeader: 'Bônus do Diamante',
    bonus: [
      'Tudo do Platina incluído (sem exceção)',
      'Setup completo do Meta Pixel para campanhas no Instagram e Facebook Ads',
      'Configuração de eventos personalizados no GA4 (compra, contato, scroll)',
      'Política de Privacidade e Termos de Uso incluídos (segurança jurídica)',
      'Atendimento prioritário VIP com resposta em até 2h',
      '60 dias de suporte + 1 ajuste de cortesia no 1º mês',
    ],
    ctaLabel: 'Quero o Empresarial Completo',
    whatsappMessage:
      'Olá! Tenho interesse no plano Empresarial Completo (R$ 2.997) do Site no Ar Express. Preciso de um site institucional com várias páginas. Como funciona?',
    deliveryTag: 'Entrega em 5 a 10 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 150/mês',
  },

  // ── Tier 5 / Sob Medida (cor especial, sem TierSlug global) ────────────
  {
    id: 'sob-medida',
    tierNumber: 5,
    rankLabel: 'Projeto Personalizado',
    name: 'Projeto Sob Medida',
    idealFor: 'Para projetos especiais e sistemas personalizados',
    description:
      'Se você tem uma ideia de MicroSaaS, painel, automação ou sistema interno, posso transformar em produto real — do layout ao código funcionando.',
    currency: '',
    price: null,
    priceLabel: 'Sob consulta',
    paymentNote: 'orçamento personalizado após análise do escopo',
    featuresHeader: 'O que cabe aqui',
    features: [
      { label: 'MicroSaaS e painéis sob medida', included: true },
      { label: 'Automações com WhatsApp e APIs', included: true },
      { label: 'Sistemas de cadastro e gestão', included: true },
      { label: 'Áreas de membros e login', included: true },
      { label: 'Formulários inteligentes', included: true },
      { label: 'Páginas de captura e campanhas', included: true },
      { label: 'Integrações com ferramentas externas', included: true },
      { label: 'Melhorias e ajustes em sites existentes', included: true },
    ],
    bonusHeader: 'Como funciona',
    bonus: [
      'Conversa inicial para entender objetivo, prazo e investimento',
      'Proposta com escopo, cronograma e valor antes de começar',
      'Acompanhamento direto com você durante toda a execução',
    ],
    ctaLabel: 'Quero um projeto sob medida',
    whatsappMessage:
      'Olá! Tenho um projeto especial em mente (sistema, painel, automação ou MicroSaaS) e gostaria de conversar com o Site no Ar Express. Pode me ajudar com um orçamento?',
    deliveryTag: 'Prazo alinhado no briefing',
  },
];

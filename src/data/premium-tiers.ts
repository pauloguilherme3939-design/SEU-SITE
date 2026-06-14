/**
 * Dados da seção PremiumTiers.
 *
 * Fonte comercial: src/data/plans.ts (verdade dos planos) + saasOffer.
 * Mapeamento (5 tiers):
 *   Tier 1 / Prata     → Presença Inicial      (R$ 497)
 *   Tier 2 / Ouro      → Presença Rápida       (R$ 997)
 *   Tier 3 / Platina   → Profissional Express  (R$ 1.497)  ← FEATURED
 *   Tier 4 / Diamante  → Empresarial Completo  (R$ 2.997)
 *   Tier 5 / Sob Medida→ Projeto Sob Medida    (sob consulta)
 *
 * Estratégia de leitura por card (refinada na Rev 6):
 *   - `tagline`           → 1 linha de valor centrada
 *   - `featuresHighlight` → 5 bullets curtos, SEMPRE visíveis
 *   - `bonus`             → 2 a 3 bônus principais, SEMPRE visíveis
 *   - `features`          → lista COMPLETA mostrada no <details> recolhido
 *                            por padrão ("Ver tudo incluso")
 *
 * O visual aprovado (bordas, emblemas, ornamentos, cores) está intacto.
 * plans.ts segue intocado (alimenta quiz PlanFinder e JSON-LD da home).
 */

import type { TierSlug } from '@/types';

export type PremiumTierId = TierSlug | 'sob-medida';

export interface PremiumTierFeature {
  label: string;
  included: boolean;
}

export interface PremiumTier {
  id: PremiumTierId;
  tierNumber: 1 | 2 | 3 | 4 | 5;
  rankLabel: string;
  name: string;
  idealFor: string;
  tagline: string;
  currency: string;
  price: number | null;
  priceLabel: string;
  paymentNote: string;
  featuresHeader: string;
  /** 5 bullets curtos, SEMPRE visíveis. */
  featuresHighlight: string[];
  /** Lista COMPLETA (com check/x). Mostrada APENAS quando o usuário clicar em "Ver tudo incluso". */
  features: PremiumTierFeature[];
  bonusHeader: string;
  /** 2 a 3 bônus principais, SEMPRE visíveis. */
  bonus: string[];
  ctaLabel: string;
  whatsappMessage: string;
  featured?: boolean;
  badgeText?: string;
  deliveryTag: string;
  footerNote?: string;
}

export const premiumTiers: PremiumTier[] = [
  // ── Tier 1 / Prata ─────────────────────────────────────────────────────
  {
    id: 'prata',
    tierNumber: 1,
    rankLabel: 'Nível Prata',
    name: 'Presença Inicial',
    idealFor: 'Quem está dando o primeiro passo online',
    tagline: 'Seu primeiro endereço profissional na internet.',
    currency: 'R$',
    price: 497,
    priceLabel: '497',
    paymentNote: 'à vista ou entrada para iniciar',
    featuresHeader: 'Está incluso',
    featuresHighlight: [
      'Site profissional no ar em até 3 dias',
      'Domínio .com.br por 1 ano',
      'Botão de WhatsApp pronto',
      'SEO inicial para o Google',
      'Publicação e hospedagem inclusas',
    ],
    features: [
      { label: '1 página completa com 5 seções essenciais', included: true },
      { label: 'Design responsivo (perfeito no celular)', included: true },
      { label: 'Botão de WhatsApp com mensagem pré-pronta', included: true },
      { label: 'Domínio .com.br registrado no seu CPF/CNPJ (1 ano)', included: true },
      { label: 'Hospedagem rápida — site no ar no Brasil todo', included: true },
      { label: 'SSL automático (cadeado verde no navegador)', included: true },
      { label: 'SEO inicial (title, description, Open Graph)', included: true },
      { label: 'Link bonito ao compartilhar no WhatsApp', included: true },
      { label: 'Estrutura preparada para o Google encontrar', included: true },
      { label: 'Google Search Console configurado', included: true },
      { label: 'Links de redes sociais no rodapé', included: true },
      { label: 'Horário de funcionamento e localização', included: true },
      { label: '1 rodada de ajustes simples após entrega', included: true },
      { label: 'Copy/textos profissionais personalizados', included: false },
      { label: 'SEO técnico avançado + indexação manual', included: false },
    ],
    bonusHeader: 'Bônus inclusos',
    bonus: [
      'WhatsApp com mensagem pré-escrita por nicho',
      'Favicon personalizado com sua logo',
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
    tagline: 'Mais presença, mais confiança e mais estrutura para vender.',
    currency: 'R$',
    price: 997,
    priceLabel: '997',
    paymentNote: 'à vista ou entrada para iniciar',
    featuresHeader: 'Tudo do Prata, e mais',
    featuresHighlight: [
      'Landing page com 7+ seções estratégicas',
      'Copy persuasiva personalizada',
      'Galeria de portfólio (até 12 imagens)',
      'Depoimentos e FAQ inclusos',
      'Google Maps com seu endereço',
    ],
    features: [
      { label: 'Landing page com 7+ seções de impacto', included: true },
      { label: 'Visual elaborado — paleta e tipografia próprias', included: true },
      { label: 'Copy persuasiva personalizada por nicho', included: true },
      { label: 'Seção Sobre construída a partir de brief', included: true },
      { label: 'Seção de depoimentos pronta para preencher', included: true },
      { label: 'Galeria de portfólio com até 12 imagens', included: true },
      { label: 'FAQ que responde dúvidas antes do contato', included: true },
      { label: 'Animações suaves (scroll-reveal)', included: true },
      { label: 'Hover effects e micro-interações profissionais', included: true },
      { label: 'Botões de WhatsApp em pontos estratégicos', included: true },
      { label: 'Google Maps com pin do seu endereço', included: true },
      { label: 'SEO técnico avançado + indexação manual', included: false },
    ],
    bonusHeader: 'Bônus do Ouro',
    bonus: [
      'FAQ com 10+ perguntas que quebram objeções',
      'Guia PDF: Bombe seu WhatsApp (12 mensagens prontas)',
      'Modelos de resposta automática WhatsApp Business',
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
    idealFor: 'Quem quer ser encontrado no Google',
    tagline: 'O melhor equilíbrio entre preço, conversão e presença no Google.',
    currency: 'R$',
    price: 1497,
    priceLabel: '1.497',
    paymentNote: '50% de entrada · 50% na entrega',
    featuresHeader: 'Tudo do Ouro, e mais',
    featuresHighlight: [
      'SEO técnico em cada seção (H1, H2, alt, meta)',
      'Schema markup para o Google',
      'PageSpeed 90+ no mobile',
      'Estrutura de conversão testada',
      '30 dias de suporte + 2 ajustes',
    ],
    features: [
      { label: 'Copy completa e personalizada de todas as seções', included: true },
      { label: 'SEO técnico por seção (H1, H2, alt, meta tags)', included: true },
      { label: 'Schema markup LocalBusiness (Google entende seu negócio)', included: true },
      { label: 'Schema markup Service (cada serviço identificado)', included: true },
      { label: 'Link bonito por seção ao compartilhar', included: true },
      { label: 'Submissão e indexação manual no Google', included: true },
      { label: 'Otimização automática de imagens (AVIF/WebP)', included: true },
      { label: 'PageSpeed 90+ no mobile', included: true },
      { label: 'Estrutura de conversão testada', included: true },
      { label: 'Página de Obrigado com rastreamento', included: true },
      { label: '2 rodadas de ajustes após entrega', included: true },
      { label: '30 dias de suporte para dúvidas', included: true },
    ],
    bonusHeader: 'Bônus do Platina',
    bonus: [
      'Prioridade absoluta na fila de entrega',
      'Página de Obrigado pós-conversão',
      'Script de lançamento pronto para suas redes',
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
    idealFor: 'Empresas que querem presença máxima',
    tagline: 'Estrutura completa para empresas que querem presença forte.',
    currency: 'R$',
    price: 2997,
    priceLabel: '2.997',
    paymentNote: '50% de entrada · 50% na entrega',
    featuresHeader: 'Tudo do Platina, e mais',
    featuresHighlight: [
      'Até 8 páginas (Home, Sobre, Serviços, Contato...)',
      'SEO individualizado em cada página',
      'Formulário de contato integrado',
      'Google Analytics 4 + Meta Pixel',
      '60 dias de suporte VIP (resposta em 2h)',
    ],
    features: [
      { label: 'Até 8 páginas (Home, Sobre, Serviços, Portfólio, Blog, Contato + 2)', included: true },
      { label: 'Estrutura escalável para até 20 páginas adicionais', included: true },
      { label: 'Menu superior com hierarquia + breadcrumbs', included: true },
      { label: 'SEO individualizado por página', included: true },
      { label: 'Schema markup por página', included: true },
      { label: 'Formulário de contato integrado (notificação por e-mail)', included: true },
      { label: 'Google Analytics 4 + metas de conversão', included: true },
      { label: 'Meta Pixel pronto para campanhas (Insta/Facebook)', included: true },
      { label: 'Política de Privacidade + Termos prontos', included: true },
      { label: 'robots.txt + sitemap.xml customizados', included: true },
      { label: 'Backup mensal automatizado', included: true },
      { label: 'Atendimento prioritário VIP (resposta em 2h)', included: true },
      { label: '60 dias de suporte + 1 ajuste de cortesia', included: true },
    ],
    bonusHeader: 'Bônus do Diamante',
    bonus: [
      'Setup completo do Meta Pixel para campanhas',
      'Eventos personalizados no GA4',
      'Política de Privacidade + Termos inclusos',
    ],
    ctaLabel: 'Quero o Empresarial Completo',
    whatsappMessage:
      'Olá! Tenho interesse no plano Empresarial Completo (R$ 2.997) do Site no Ar Express. Preciso de um site institucional com várias páginas. Como funciona?',
    deliveryTag: 'Entrega em 5 a 10 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 150/mês',
  },

  // ── Tier 5 / Sob Medida ────────────────────────────────────────────────
  // Card consultivo, sem repetir as mesmas linhas em "features" e "bonus".
  {
    id: 'sob-medida',
    tierNumber: 5,
    rankLabel: 'Projeto Personalizado',
    name: 'Projeto Sob Medida',
    idealFor: 'Quando a ideia passa de site e vira sistema',
    tagline: 'Quando a ideia passa de site e vira sistema.',
    currency: '',
    price: null,
    priceLabel: 'Sob consulta',
    paymentNote: 'orçamento personalizado após análise do escopo',
    featuresHeader: 'O que cabe aqui',
    featuresHighlight: [
      'MicroSaaS e painéis sob medida',
      'Automações com WhatsApp e APIs',
      'Sistemas de cadastro e gestão',
      'Áreas de membros e login',
      'Integrações com ferramentas externas',
    ],
    // Possibilidades adicionais (não repete os 5 da highlight)
    features: [
      { label: 'Formulários inteligentes (multi-etapas, validação avançada)', included: true },
      { label: 'Páginas de captura e campanhas pontuais', included: true },
      { label: 'Melhorias e ajustes em sistemas já existentes', included: true },
      { label: 'Dashboards internos com métricas em tempo real', included: true },
      { label: 'Geração e envio automático de PDFs/relatórios', included: true },
      { label: 'Integração com Pix / Mercado Pago / Stripe', included: true },
      { label: 'Webhooks e gatilhos automatizados (Zapier, n8n)', included: true },
    ],
    bonusHeader: 'Como funciona o processo',
    bonus: [
      'Conversa inicial para entender o objetivo',
      'Proposta com escopo, prazo e investimento antes de começar',
      'Acompanhamento direto durante toda a execução',
    ],
    ctaLabel: 'Quero um projeto sob medida',
    whatsappMessage:
      'Olá! Tenho um projeto especial em mente (sistema, painel, automação ou MicroSaaS) e gostaria de conversar com o Site no Ar Express. Pode me ajudar com um orçamento?',
    deliveryTag: 'Prazo alinhado no briefing',
  },
];

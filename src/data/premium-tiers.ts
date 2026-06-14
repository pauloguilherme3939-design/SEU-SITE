/**
 * Dados da nova seção PremiumTiers (substitui Pricing/ComparativoTiers).
 *
 * Mapeamento conforme briefing 2026-06-13:
 *   Prata    → Presença Rápida      (R$ 997)
 *   Ouro     → Profissional Express (R$ 1.497)  ← FEATURED
 *   Platina  → Empresarial Completo (R$ 2.997)
 *   Diamante → Projeto Sob Medida   (orçamento)
 *
 * Os preços R$ 997, R$ 1.497 e R$ 2.997 espelham os já definidos em
 * src/data/plans.ts. O quinto plano "Diamante / Sob Medida" foi criado aqui
 * porque não existia em plans.ts.
 *
 * Observação: src/data/plans.ts segue intocado — ele alimenta o quiz
 * (PlanFinder) e o JSON-LD da home.
 */

import type { TierSlug } from '@/types';

export interface PremiumTier {
  /** ID estável (slug do tier) */
  id: TierSlug;
  /** Etiqueta curta acima do título (ex: "Nível Prata") */
  rankLabel: string;
  /** Nome comercial do plano (ex: "Presença Rápida") */
  name: string;
  /** Texto descritivo curto (uma frase) */
  description: string;
  /** Símbolo monetário (R$ ou texto livre quando não há preço fechado) */
  currency: string;
  /** Valor (numérico para os fechados, null para "sob orçamento") */
  price: number | null;
  /** Label visível ("997", "1.497", "Sob consulta") — derivada se houver price */
  priceLabel: string;
  /** Sufixo abaixo do preço (ex: "à vista ou entrada · entrega em 3 dias úteis") */
  priceNote: string;
  /** Cabeçalho da lista de features (ex: "O que está incluso") */
  featuresHeader: string;
  /** Lista enxuta de bullets que aparecem no card */
  features: string[];
  /** Bônus exclusivo do tier (caixa destacada) */
  bonusHeader: string;
  bonus: string[];
  /** Texto e destino do CTA */
  ctaLabel: string;
  /** Mensagem pré-pronta para WhatsApp */
  whatsappMessage: string;
  /** Marcado se for o plano em destaque (recebe badge + elevação) */
  featured?: boolean;
  /** Texto do badge quando featured */
  badgeText?: string;
  /** Selo curto de rodapé do card (ex: "Entrega em 3 dias úteis") */
  deliveryTag: string;
  /** Rodapé secundário (ex: manutenção mensal opcional) */
  footerNote?: string;
}

export const premiumTiers: PremiumTier[] = [
  {
    id: 'prata',
    rankLabel: 'Nível Prata',
    name: 'Presença Rápida',
    description:
      'Para quem precisa de uma presença profissional simples — site bonito, WhatsApp integrado e online em poucos dias.',
    currency: 'R$',
    price: 997,
    priceLabel: '997',
    priceNote: 'à vista ou entrada para iniciar · entrega em até 3 dias úteis',
    featuresHeader: 'O essencial premium',
    features: [
      'Landing page profissional com até 7 seções',
      'Design mobile-first responsivo',
      'Botão de WhatsApp com mensagem pré-pronta',
      'Domínio .com.br registrado no seu CPF/CNPJ (1 ano incluso)',
      'Hospedagem em CDN global + SSL automático',
      'SEO inicial (title, description, Open Graph)',
      'Google Search Console configurado',
    ],
    bonusHeader: 'Bônus inclusos',
    bonus: [
      'FAQ com perguntas que quebram objeções',
      'Google Maps com pin do endereço',
      'Guia PDF: Bombe seu WhatsApp',
    ],
    ctaLabel: 'Quero a Presença Rápida',
    whatsappMessage:
      'Olá! Tenho interesse no plano Presença Rápida (R$ 997) do Site no Ar Express. Quero entender os detalhes e verificar se ainda tem vaga disponível.',
    deliveryTag: 'Entrega em até 3 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 80/mês',
  },
  {
    id: 'ouro',
    rankLabel: 'Nível Ouro',
    name: 'Profissional Express',
    description:
      'O plano mais escolhido. Site profissional com SEO técnico, estrutura de conversão testada e tudo pronto para o Google.',
    currency: 'R$',
    price: 1497,
    priceLabel: '1.497',
    priceNote: '50% entrada · 50% na entrega · até 3 dias úteis',
    featuresHeader: 'Tudo do Prata, e mais',
    features: [
      'Copy completa e personalizada por seção',
      'SEO técnico por seção (H1, H2, alt text, meta tags)',
      'Schema markup LocalBusiness + Service',
      'PageSpeed 90+ no mobile (testado)',
      'Estrutura de conversão testada (CTA, urgência, prova social)',
      'Submissão e indexação manual no Google',
      'Página de Obrigado pós-envio com rastreamento',
      '2 rodadas de ajuste após a entrega',
      '30 dias de suporte pós-entrega',
    ],
    bonusHeader: 'Bônus do Ouro',
    bonus: [
      'Prioridade absoluta na fila de produção',
      'Descrição completa do Perfil da Empresa no Google',
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
  {
    id: 'platina',
    rankLabel: 'Nível Platina',
    name: 'Empresarial Completo',
    description:
      'Para empresas com operação robusta. Até 8 páginas, Google Analytics, formulário integrado e estrutura institucional escalável.',
    currency: 'R$',
    price: 2997,
    priceLabel: '2.997',
    priceNote: '50% entrada · 50% na entrega · até 10 dias úteis',
    featuresHeader: 'Tudo do Ouro, e mais',
    features: [
      'Até 8 páginas (Home, Sobre, Serviços, Portfólio, Blog, Contato + 2 livres)',
      'Estrutura escalável para até 20 páginas adicionais',
      'Menu superior com hierarquia + breadcrumbs',
      'SEO e Schema individualizados por página',
      'Formulário de contato integrado com notificação por e-mail',
      'Google Analytics 4 + metas de conversão',
      'Meta Pixel pronto para campanhas Instagram/Facebook',
      'Política de Privacidade + Termos de Uso prontos',
      '60 dias de suporte + 1 ajuste de cortesia',
    ],
    bonusHeader: 'Bônus do Platina',
    bonus: [
      'Setup completo do Meta Pixel para Ads',
      'Atendimento prioritário VIP (resposta em 2h)',
      'Backup mensal automatizado das alterações',
    ],
    ctaLabel: 'Quero o Empresarial Completo',
    whatsappMessage:
      'Olá! Tenho interesse no plano Empresarial Completo (R$ 2.997) do Site no Ar Express. Preciso de um site institucional com várias páginas. Como funciona?',
    deliveryTag: 'Entrega em 5 a 10 dias úteis',
    footerNote: 'Manutenção opcional a partir de R$ 150/mês',
  },
  {
    id: 'diamante',
    rankLabel: 'Nível Diamante',
    name: 'Projeto Sob Medida',
    description:
      'Para projetos especiais: sistema, painel, automação, área de membros, integração, MicroSaaS ou estrutura sob demanda.',
    currency: '',
    price: null,
    priceLabel: 'Sob consulta',
    priceNote: 'orçamento personalizado após análise do escopo',
    featuresHeader: 'Personalização total',
    features: [
      'Análise individual do escopo e do produto',
      'MicroSaaS, painéis e sistemas internos sob medida',
      'Automações com WhatsApp e APIs',
      'Áreas de membros e login',
      'Páginas de captura e campanhas',
      'Integrações com ferramentas externas',
      'Melhorias e ajustes em sistemas já existentes',
    ],
    bonusHeader: 'Como funciona',
    bonus: [
      'Conversa inicial para entender o objetivo',
      'Proposta com escopo, prazo e investimento',
      'Acompanhamento direto durante a execução',
    ],
    ctaLabel: 'Quero um projeto sob medida',
    whatsappMessage:
      'Olá! Tenho um projeto especial em mente (sistema, painel, automação ou MicroSaaS) e gostaria de conversar com o Site no Ar Express. Pode me ajudar com um orçamento?',
    deliveryTag: 'Prazo alinhado no briefing',
  },
];

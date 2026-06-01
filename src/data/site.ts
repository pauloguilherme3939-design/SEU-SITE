export const site = {
  name: 'Site no Ar Express',
  tagline: 'Sites profissionais para pequenos negócios',
  description:
    'Criação de sites profissionais para pequenos negócios com domínio incluso por 1 ano, botão para WhatsApp, SEO inicial e publicação no ar em até 3 dias.',

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sites-captacao.vercel.app',

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5516993138450',

  whatsappDefaultMessage:
    'Olá, Paulo! Vi sua página Site no Ar Express e quero um orçamento para criar um site profissional para meu negócio.',

  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',

  social: {
    instagram: '',
  },

  business: {
    legalName: 'Site no Ar Express',
    area: 'Brasil',
    priceRange: 'R$ 497 – R$ 2.997',
  },
} as const;

export type Site = typeof site;

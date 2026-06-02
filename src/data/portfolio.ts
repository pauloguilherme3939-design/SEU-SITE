import type { PortfolioItem } from '@/types';

export const portfolio: PortfolioItem[] = [
  {
    id: 'recebazap',
    name: 'RecebeZap',
    description:
      'App de cobrança via WhatsApp e Pix para autônomos. Sistema completo com dashboard, planos, ferramentas grátis, blog e SEO avançado — domínio próprio no ar.',
    url: 'https://recebazap.com.br',
    type: 'Sistema / SaaS',
    demo: false,
    tags: ['Dashboard', 'Pix', 'SEO', 'Multi-páginas'],
    accent: 'green',
    image: '/images/portfolio/recebazap.png',
  },
  {
    id: 'sanka-burguers',
    name: 'Sanka Burgers',
    description:
      'Landing page para hamburgueria artesanal em Rio Claro, SP — com identidade visual marcante, cardápio, localização e botão direto para pedido via WhatsApp.',
    url: 'https://sankaburguers.vercel.app/',
    type: 'Landing page',
    demo: false,
    tags: ['Hambúrguer artesanal', 'WhatsApp', 'Local'],
    accent: 'amber',
    image: '/images/portfolio/sanka-burguers.png',
  },
  {
    id: 'adeus-latidos',
    name: 'Adeus Latido de Solidão',
    description:
      'Página de vendas para produto digital, com vídeo, prova social, contador de oferta e estrutura de copy pensada para converter visitante em comprador.',
    url: 'https://adeuslatidos.netlify.app/',
    type: 'Landing de vendas',
    demo: true,
    tags: ['Copy de vendas', 'Conversão', 'Checkout'],
    accent: 'amber',
    image: '/images/portfolio/adeus-latidos.png',
  },
  {
    id: 'benzedeiras',
    name: 'O Livro das Benzedeiras',
    description:
      'Landing page de e-book com identidade visual marcante, narrativa envolvente, depoimentos e oferta — design sob medida para o tema e o público.',
    url: 'https://benzedeiras.netlify.app/',
    type: 'Landing de vendas',
    demo: true,
    tags: ['Design temático', 'Storytelling', 'Oferta'],
    accent: 'gold',
    image: '/images/portfolio/benzedeiras.png',
  },
];

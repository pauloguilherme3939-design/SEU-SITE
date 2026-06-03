import type { PortfolioItem } from '@/types';

export const portfolio: PortfolioItem[] = [
  {
    id: 'recebazap',
    name: 'RecebeZap',
    description:
      'SaaS próprio criado do zero: cobrança via WhatsApp e Pix para autônomos. Dashboard, planos, ferramentas grátis, blog e SEO avançado — domínio próprio no ar.',
    url: 'https://recebazap.com.br',
    type: 'SaaS próprio',
    demo: false,
    tags: ['Dashboard', 'Pix', 'SEO', 'Multi-páginas'],
    accent: 'green',
    image: '/images/portfolio/recebazap.png',
  },
  {
    id: 'sanka-burguers',
    name: 'Sanka Burgers',
    description:
      'Site para hamburgueria artesanal em Rio Claro, SP — identidade visual marcante, cardápio, localização e botão direto para pedido via WhatsApp.',
    url: 'https://sankaburguers.vercel.app/',
    type: 'Site para hamburgueria',
    demo: false,
    tags: ['Hambúrguer artesanal', 'WhatsApp', 'Local'],
    accent: 'amber',
    image: '/images/portfolio/sanka-burguers.png',
  },
  {
    id: 'adeus-latidos',
    name: 'Adeus Latido de Solidão',
    description:
      'Landing page autoral para produto digital — vídeo, prova social, contador de oferta e estrutura de copy desenvolvida para converter visitante em comprador.',
    url: 'https://adeuslatidos.netlify.app/',
    type: 'Landing autoral',
    demo: false,
    tags: ['Copy de vendas', 'Conversão', 'Produto digital'],
    accent: 'amber',
    image: '/images/portfolio/adeus-latidos.png',
  },
  {
    id: 'benzedeiras',
    name: 'O Livro das Benzedeiras',
    description:
      'Landing page autoral para e-book — identidade visual temática, narrativa envolvente e estrutura de oferta desenvolvida para o tema e o público.',
    url: 'https://benzedeiras.netlify.app/',
    type: 'Landing autoral',
    demo: false,
    tags: ['Design temático', 'Storytelling', 'Produto digital'],
    accent: 'gold',
    image: '/images/portfolio/benzedeiras.png',
  },
];

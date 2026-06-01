import type { FaqItem, Nicho } from '@/types';

export const faq: FaqItem[] = [
  {
    question: 'O domínio está incluso?',
    answer:
      'Sim. O domínio .com.br está incluso por 1 ano nos pacotes, desde que seja um domínio comum disponível para registro. Domínios premium, já registrados ou com valor elevado são cobrados à parte.',
  },
  {
    question: 'Depois de 1 ano, quem paga a renovação do domínio?',
    answer:
      'Após o primeiro ano, a renovação do domínio fica por conta do cliente. O custo gira em torno de R$ 40/ano para domínios .com.br. Te aviso antes do vencimento para você não perder o endereço.',
  },
  {
    question: 'O site fica no meu nome?',
    answer:
      'Sim. A entrega é feita de forma transparente. O domínio pode ser registrado com os dados do cliente, e o site fica como ativo do seu negócio.',
  },
  {
    question: 'Quando começa o prazo de entrega?',
    answer:
      'O prazo começa a contar após o pagamento da entrada e o envio de todas as informações necessárias: nome do negócio, serviços, fotos, logo e dados de contato. Quanto mais completo o material, mais rápida e melhor a entrega.',
  },
  {
    question: 'O SEO garante primeira posição no Google?',
    answer:
      'Não. O SEO inicial inclui estrutura básica, título, descrição, configuração no Google Search Console e solicitação de indexação. A posição no Google depende de concorrência, tempo, conteúdo e autoridade do domínio — fatores que evoluem com o uso do site.',
  },
  {
    question: 'Posso pedir alterações depois de pronto?',
    answer:
      'Sim. Cada pacote inclui uma quantidade de rodadas de ajustes simples — textos, cores, imagens e pequenos detalhes. Alterações grandes, novas páginas ou mudanças completas de layout podem ser cobradas à parte, sempre combinadas antes.',
  },
  {
    question: 'Tem mensalidade?',
    answer:
      'Não há mensalidade obrigatória de plataforma. Você paga pelo desenvolvimento do site uma única vez. Manutenção, alterações futuras ou melhorias mensais podem ser contratadas separadamente, conforme a necessidade.',
  },
];

export const nichos: Nicho[] = [
  {
    slug: 'dentistas',
    profissao: 'Dentistas e clínicas odontológicas',
    h1: 'Site profissional para dentistas, pronto em até 3 dias',
    intro:
      'Pacientes pesquisam o dentista no celular antes de marcar consulta. Um site profissional passa confiança e facilita o contato direto pelo WhatsApp.',
    dores: [
      'Depender só do Instagram para conseguir pacientes',
      'Não aparecer quando alguém pesquisa dentista na sua cidade',
      'Passar imagem amadora sem um endereço profissional',
    ],
    beneficios: [
      'Contato direto pelo WhatsApp em 1 toque',
      'Seu negócio sai configurado para o Google reconhecer sua clínica',
      'Visual profissional que transmite confiança antes da consulta',
    ],
    recommendedPlan: 'express',
  },
  {
    slug: 'advogados',
    profissao: 'Advogados e escritórios de advocacia',
    h1: 'Site profissional para advogados, com autoridade e credibilidade',
    intro:
      'No Direito, percepção de autoridade é tudo. Um site sóbrio e bem estruturado converte visitante em cliente e respeita as normas da OAB.',
    dores: [
      'Cliente avalia credibilidade antes de fechar',
      'Concorrentes com presença digital saem na frente',
      'Falta de um canal profissional para contato',
    ],
    beneficios: [
      'Apresentação das áreas de atuação com clareza',
      'Captação de contato sem ferir as regras de publicidade da OAB',
      'Autoridade que justifica seus honorários',
    ],
    recommendedPlan: 'empresarial',
  },
];

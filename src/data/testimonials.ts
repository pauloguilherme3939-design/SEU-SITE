import type { Testimonial } from '@/types';

// ATENÇÃO: adicione APENAS depoimentos reais de clientes seus.
// Nunca invente nomes ou avaliações. Array vazio é melhor que prova social falsa.
// Quando tiver depoimentos reais, preencha aqui com real: true.

export const testimonials: Testimonial[] = [
  // {
  //   quote: 'Texto real do cliente.',
  //   name: 'Nome do cliente',
  //   role: 'Profissão — Cidade',
  //   real: true,
  // },
];

export const realTestimonials = testimonials.filter((t) => t.real);

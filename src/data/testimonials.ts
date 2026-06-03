import type { Testimonial } from '@/types';

// ATENÇÃO: adicione APENAS depoimentos reais de clientes seus.
// NUNCA invente nomes, fotos, empresas ou avaliações — mesmo que pareçam genéricas.
// Prova social falsa é desonesta e pode gerar processos por propaganda enganosa.
// Array vazio é infinitamente melhor que depoimento inventado.
// Quando tiver depoimentos reais (com autorização do cliente), preencha com real: true.

export const testimonials: Testimonial[] = [
  // {
  //   quote: 'Texto real do cliente.',
  //   name: 'Nome do cliente',
  //   role: 'Profissão — Cidade',
  //   real: true,
  // },
];

export const realTestimonials = testimonials.filter((t) => t.real);

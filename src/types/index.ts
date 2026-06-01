// Tipos compartilhados do projeto.

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  forWho: string;
  price: number | null;        // null = "sob orçamento"
  priceLabel: string;          // ex: "R$ 1.497" ou "Sob orçamento"
  paymentNote: string;         // ex: "50% entrada · 50% entrega"
  featured?: boolean;
  badge?: string;              // ex: "Mais escolhido"
  features: PlanFeature[];
  deadline: string;            // ex: "Até 3 dias úteis"
  idealFor: string;
  ctaLabel: string;
  maintenancePrice?: number;   // manutenção mensal opcional em R$
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  url: string;
  type: string;                // ex: "Sistema / SaaS"
  demo: boolean;               // true = projeto demonstrativo (rotular!)
  tags: string[];
  accent: 'green' | 'amber' | 'gold';
  image?: string;              // path relativo a /public, ex: /images/portfolio/recebazap.png
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  real: boolean;               // SOMENTE true vai para produção
}

export interface Nicho {
  slug: string;                // ex: "dentistas"
  profissao: string;           // ex: "Dentistas e clínicas odontológicas"
  h1: string;
  intro: string;
  dores: string[];
  beneficios: string[];
  recommendedPlan: string;     // id do plano sugerido
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;                // ISO
  tags: string[];
  cover?: string;
  readingTime?: string;
}

export interface Lead {
  nome: string;
  whatsapp: string;
  email?: string;
  segmento?: string;
  plano?: string;
  mensagem?: string;
  origem?: string;             // utm / página de origem
}

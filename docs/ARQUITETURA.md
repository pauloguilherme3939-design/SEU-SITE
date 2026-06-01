# Arquitetura do Projeto — Site de Captação (Serviço de Criação de Sites)

> Documento mestre. O Claude Code deve ler este arquivo antes de qualquer tarefa
> para entender a estrutura, as decisões e os padrões do projeto.

## Objetivo do produto
Site profissional de captação de clientes para um serviço de criação de
sites/landing pages/SaaS para pequenos negócios brasileiros. O site precisa:
- Converter tráfego pago (Meta/Google Ads) em leads e conversas no WhatsApp.
- Ranquear no Google organicamente (blog + páginas por nicho) para tráfego grátis.
- Transmitir autoridade e profissionalismo (o site é o portfólio do dono).

## Stack
- **Next.js 14+ (App Router)** — SSR/SSG para SEO de primeira linha.
- **TypeScript** — segurança de tipos em todo o projeto.
- **Tailwind CSS** — design system via tokens (ver `src/styles/tokens.css`).
- **MDX / Markdown** — conteúdo de blog e nichos em arquivos, sem banco de dados.
- **API Routes** — formulário de orçamento e captura de lead (server-side).
- Sem banco de dados nesta fase. Leads vão por e-mail/webhook. Blog em arquivos.

## Princípios de arquitetura
1. **Componentização real.** Nada de página gigante. Cada seção é um componente
   isolado em `src/components/sections/`, recebendo dados por props.
2. **Conteúdo separado de código.** Planos, nichos, FAQ, depoimentos e posts
   ficam em `src/data/` e `src/content/`. Mudar um preço = editar um arquivo de
   dados, nunca caçar no JSX.
3. **SEO por padrão.** Toda rota exporta `metadata`. Sitemap e robots automáticos.
   Dados estruturados (JSON-LD) em todas as páginas relevantes.
4. **Design tokens.** Cores, fontes, espaçamentos e raios vêm de variáveis CSS.
   Nada de cor "hardcoded" espalhada.
5. **Acessibilidade e performance.** Lighthouse 90+ em todas as métricas.
   Imagens via `next/image`, fontes via `next/font`.

## Mapa de pastas
```
src/
  app/
    (marketing)/          # grupo de rotas da landing principal
      page.tsx            # home / landing
      layout.tsx
    blog/
      page.tsx            # índice do blog
      [slug]/page.tsx     # post individual (lê de src/content/blog)
    para/
      [nicho]/page.tsx    # páginas por nicho (lê de src/content/nichos)
    api/
      lead/route.ts       # POST: captura lead leve (e-mail/nome/whats)
      orcamento/route.ts  # POST: formulário de orçamento completo
    sitemap.ts            # sitemap dinâmico
    robots.ts             # robots.txt
    layout.tsx            # layout raiz (fontes, analytics, pixel)
  components/
    layout/               # Navbar, Footer, Container
    sections/             # Hero, Pricing, Portfolio, Saas, Faq, Cta, etc.
    ui/                   # Button, Badge, Card, Accordion, Input (primitivos)
  content/
    blog/                 # posts .mdx
    nichos/               # arquivos .ts/.mdx de cada nicho
  data/
    plans.ts              # os 3 planos + SaaS (fonte única de verdade)
    portfolio.ts          # projetos do portfólio
    faq.ts                # perguntas frequentes
    testimonials.ts       # depoimentos (SOMENTE reais)
    site.ts               # config global: nome, whatsapp, urls, pixel id
  lib/
    seo.ts                # helper de metadata + JSON-LD
    whatsapp.ts           # monta links wa.me com mensagem pré-preenchida
    mdx.ts                # leitura/parse de conteúdo
  styles/
    tokens.css            # design tokens (cores, fontes, espaçamento)
    globals.css
  types/
    index.ts              # tipos compartilhados (Plan, Nicho, Post, Lead...)
```

## Identidade visual (resumo — detalhes em tokens.css)
- Tema escuro, base verde-petróleo com acento verde esmeralda (#2dd48d).
- Display font: Sora. Body font: Outfit.
- Estética: profissional, moderna, com profundidade (gradientes sutis, sombras
  suaves, animações de entrada discretas). Fugir de "cara de template".

## Regras de conteúdo (IMPORTANTE — compliance)
- Depoimentos: SOMENTE de clientes reais. Nunca inventar nomes/avaliações.
- Portfólio: projetos demonstrativos devem ser rotulados como tal (honestidade).
- SEO/Google: nunca prometer "1º lugar garantido". Prometer configuração correta.
- Preços e termos comerciais vêm de `src/data/plans.ts` e `src/data/site.ts`.

## Variáveis de ambiente (.env.local)
```
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
NEXT_PUBLIC_WHATSAPP=5519999999999
NEXT_PUBLIC_META_PIXEL_ID=
LEAD_WEBHOOK_URL=            # opcional: onde os leads são enviados
RESEND_API_KEY=              # opcional: envio de e-mail de lead
```

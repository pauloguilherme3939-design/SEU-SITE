# CLAUDE.md

Instruções para o Claude Code neste repositório. Leia `docs/ARQUITETURA.md` antes de começar qualquer tarefa.

## Stack e padrões
- Next.js 14+ App Router, TypeScript estrito, Tailwind CSS.
- Componentes funcionais. Server Components por padrão; `"use client"` só quando houver interatividade (estado, eventos, hooks de browser).
- Conteúdo (planos, nichos, FAQ, depoimentos, posts) SEMPRE vem de `src/data/` ou `src/content/`. Nunca escreva texto de marketing direto no JSX de uma seção — importe dos dados.
- Cores/fontes/espaços vêm dos tokens em `src/styles/tokens.css`. Nada hardcoded.

## Convenções de código
- Componentes em PascalCase, um por arquivo, com `export default`.
- Props sempre tipadas com `interface`. Tipos compartilhados em `src/types`.
- Imports absolutos via alias `@/` (configurado no tsconfig).
- Cada seção da landing é um componente isolado em `src/components/sections/`.
- Toda rota exporta `metadata` (ou `generateMetadata`). Use o helper `@/lib/seo`.

## SEO (prioridade máxima — é um site de captação)
- Metadata completa por página: title, description, openGraph, twitter, canonical.
- JSON-LD apropriado (Organization, Service, BlogPosting, FAQPage, BreadcrumbList).
- `sitemap.ts` e `robots.ts` dinâmicos cobrindo blog e nichos.
- Imagens com `next/image`, `alt` descritivo, dimensões definidas.
- Performance: alvo Lighthouse 90+. Evitar libs pesadas desnecessárias.

## Acessibilidade
- HTML semântico (header, nav, main, section, article, footer).
- Contraste adequado, foco visível, labels em inputs, aria onde necessário.

## Compliance (NÃO VIOLAR)
- Depoimentos somente reais; nunca inventar.
- Projetos demonstrativos do portfólio devem ser rotulados como demonstrativos.
- Nunca prometer 1º lugar no Google. Linguagem honesta sobre SEO.

## Como trabalhar
- Faça uma camada por vez (ver os prompts numerados que o usuário fornecerá).
- Ao terminar, rode `npm run build` e `npm run lint` e corrija erros antes de finalizar.
- Não instale dependências além das necessárias para a tarefa.
- Comente apenas o que não é óbvio. Código limpo > comentários redundantes.

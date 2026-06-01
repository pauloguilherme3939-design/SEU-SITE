# Site de Captação — Serviço de Criação de Sites

Projeto Next.js (App Router) + TypeScript + Tailwind para captar clientes do seu
serviço de criação de sites/landing pages/SaaS.

## Começar (passo a passo)

1. **Instale o Node.js** (versão 18.18+ ou 20+).
2. Abra esta pasta no terminal e rode:
   ```bash
   npm install
   cp .env.example .env.local   # edite com seus dados
   ```
3. **Abra o Claude Code** nesta pasta:
   ```bash
   claude
   ```
4. Abra `docs/PROMPTS-CLAUDE-CODE.md` e cole os prompts **na ordem**, um por vez.
   Comece pelo PROMPT 0.
5. Entre os prompts, veja o resultado:
   ```bash
   npm run dev
   ```
   e acesse http://localhost:3000

## O que já está pronto (a fundação)
- Estrutura de pastas profissional e documentada (`docs/ARQUITETURA.md`).
- Instruções persistentes para o Claude Code (`CLAUDE.md`).
- Design tokens (`src/styles/tokens.css`) e Tailwind mapeado neles.
- Dados centralizados: planos, portfólio, FAQ, nichos, depoimentos (`src/data/`).
- Tipos compartilhados (`src/types`).
- Configs: tsconfig, tailwind, postcss, next.config, env de exemplo.
- Post de blog de exemplo (`src/content/blog`).

## O que o Claude Code vai construir (via prompts)
Fundação de runtime → layout → seções da landing → blog → páginas por nicho →
formulário + API de lead → SEO/pixel/analytics → polimento.

## Antes de publicar
- Edite `src/data/site.ts` (nome da marca, WhatsApp) e `.env.local`.
- Registre um domínio próprio (.com.br) — não publique em subdomínio grátis.
- Preencha `src/data/testimonials.ts` apenas com depoimentos REAIS.
- Troque os thumbs do portfólio por prints reais quando tiver.

## Deploy sugerido
Vercel (gratuito para começar, ideal para Next.js): conecte o repositório,
defina as variáveis de ambiente e publique. Aponte seu domínio .com.br para lá.

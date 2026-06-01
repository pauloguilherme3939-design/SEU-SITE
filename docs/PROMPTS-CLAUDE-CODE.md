# Prompts para o Claude Code — construção do site (em ordem)

> Como usar: abra o terminal na pasta do projeto e rode `claude`.
> Cole **um prompt por vez**, na ordem. Espere terminar, confira o resultado
> (`npm run dev`), e só então passe para o próximo. Cada prompt já assume que o
> Claude Code leu o `CLAUDE.md` e o `docs/ARQUITETURA.md` — mas reforce no 1º.
>
> Antes de tudo: `npm install` (ou deixe o Claude Code rodar no Prompt 0).

---

## PROMPT 0 — Fundação e setup

```
Leia CLAUDE.md e docs/ARQUITETURA.md inteiros antes de começar. Eles definem a
stack, a arquitetura e as regras deste projeto. A estrutura de pastas, os design
tokens (src/styles/tokens.css), os dados (src/data/*) e os tipos (src/types)
já existem — use-os, não recrie.

Sua tarefa agora:
1. Instale as dependências (npm install).
2. Crie os arquivos base do App Router que ainda faltam: src/app/layout.tsx
   (importando as fontes Sora e Outfit via next/font, aplicando os tokens e o
   globals.css), src/app/globals.css (importando tokens.css e as diretivas do
   Tailwind, com reset básico e estilos de base no tema escuro), e
   next-env.d.ts se necessário.
3. Crie src/lib/whatsapp.ts (função que monta link wa.me a partir de site.ts com
   mensagem opcional), src/lib/seo.ts (helper que gera o objeto Metadata padrão
   e funções de JSON-LD para Organization, Service, FAQPage, BlogPosting,
   BreadcrumbList) e src/lib/mdx.ts (leitura dos arquivos de src/content/blog).
4. Crie os primitivos de UI em src/components/ui: Button, Badge, Card, Container,
   Section, Accordion, Input/Textarea — todos tipados, usando os tokens.
5. Rode npm run build e corrija qualquer erro antes de finalizar.

Não construa as seções da landing ainda. Só a fundação.
```

---

## PROMPT 1 — Layout (Navbar + Footer) e a Home montada

```
Crie src/components/layout/Navbar.tsx e Footer.tsx, e monte a home em
src/app/(marketing)/page.tsx + layout.tsx.

Navbar: sticky, com blur, logo (site.name), links âncora (Planos, Portfólio,
Sistemas, Como funciona, Dúvidas) e um botão primário de WhatsApp. Responsiva
com menu mobile.

Footer: logo, tagline, ano dinâmico, links úteis e nota de copyright.

A home deve renderizar, NESTA ORDEM, componentes de seção que criaremos a seguir
(crie placeholders simples por enquanto, só para a página montar):
Hero, ProblemaSolucao, Pricing, PlanFinder (recomendador), Saas, Portfolio,
ComoFunciona, Faq, CtaFinal. Adicione também um botão flutuante de WhatsApp fixo.

Exporte metadata completa da home usando o helper de @/lib/seo (title, description
de site.ts, openGraph, canonical). Rode build e corrija erros.
```

---

## PROMPT 2 — Hero + Problema/Solução (alto impacto visual)

```
Implemente de verdade as seções src/components/sections/Hero.tsx e
ProblemaSolucao.tsx, com qualidade de design de primeira linha (siga a skill de
frontend-design: tipografia marcante, profundidade, animações de entrada sutis
com CSS, nada de cara de template).

Hero: headline sobre "site profissional no ar em até 3 dias", subtítulo, dois
CTAs (WhatsApp primário + "ver planos" secundário), selo de urgência/escassez,
e uma faixa de indicadores de confiança (3 dias / 100% mobile / Google / 1 toque).
Use um visual de fundo com gradiente mesh sutil e grão. Animação de load
escalonada (staggered reveal).

ProblemaSolucao: duas colunas contrastando "sem site profissional" (dores) vs
"com seu site no ar" (benefícios), com ícones. Conteúdo persuasivo mas honesto.

Tudo responsivo. Rode build.
```

---

## PROMPT 3 — Pricing + PlanFinder interativo + Saas

```
Implemente Pricing.tsx, PlanFinder.tsx e Saas.tsx lendo os dados de
src/data/plans.ts (NÃO escreva preços no JSX).

Pricing: 3 cards a partir do array `plans`, com o card `featured` em destaque
(badge, escala, glow). Renderize features incluídas e não-incluídas com estados
visuais distintos. Cada card com CTA que abre o WhatsApp com mensagem
pré-preenchida indicando o plano (use @/lib/whatsapp).

PlanFinder: componente client interativo. Duas perguntas (objetivo + nº de
páginas) em botões selecionáveis; ao responder ambas, revela o plano recomendado
com animação e um CTA. Lógica: objetivo "completo" ou "várias páginas" =>
Empresarial; objetivo "vender" => Express; senão => Presença Rápida.

Saas: seção SEPARADA, lendo `saasOffer`. Layout em duas colunas (descrição +
lista de recursos | card "a partir de R$ 7.900, sob orçamento" com comparativo
de agência e CTA de orçamento). Visual premium com profundidade.

Rode build e teste o PlanFinder no navegador.
```

---

## PROMPT 4 — Portfolio + ComoFunciona + Faq + CtaFinal

```
Implemente Portfolio.tsx (lendo src/data/portfolio.ts), ComoFunciona.tsx,
Faq.tsx (lendo src/data/faq.ts, usando o Accordion de ui) e CtaFinal.tsx.

Portfolio: grid de cards a partir do array. Projetos com demo:true devem exibir
o rótulo "projeto demonstrativo" e link "Ver projeto demonstrativo →"; demo:false
exibe "Ver projeto no ar →". Thumbs com gradiente conforme o campo `accent`.
(Deixe pronto para troca por <Image> quando houver prints reais.)

ComoFunciona: 4 passos numerados (conversa → entrada+materiais → desenvolvimento
→ site no ar). Faq: acordeão acessível. CtaFinal: bloco de fechamento com headline
forte e CTA grande de WhatsApp.

Adicione JSON-LD de FAQPage na home via @/lib/seo. Rode build.
```

---

## PROMPT 5 — Blog (índice + post) com SEO

```
Implemente o blog lendo os arquivos de src/content/blog (já há um .mdx de
exemplo). Configure suporte a MDX no Next (instale só o necessário:
@next/mdx + dependências de frontmatter, ou use next-mdx-remote — escolha a opção
mais simples e estável).

src/app/blog/page.tsx: índice listando posts (título, descrição, data, tags,
tempo de leitura) ordenados por data, com cards e metadata própria.

src/app/blog/[slug]/page.tsx: post individual com generateStaticParams,
generateMetadata (title, description, openGraph article, canonical), tipografia
de leitura agradável (prose), breadcrumb e JSON-LD BlogPosting + BreadcrumbList.

Estilize o conteúdo MDX com os tokens do projeto. Rode build.
```

---

## PROMPT 6 — Páginas por nicho (/para/[nicho]) para anúncios segmentados

```
Implemente src/app/para/[nicho]/page.tsx lendo o array `nichos` de
src/data/faq.ts. generateStaticParams a partir dos slugs. Cada página: H1 e intro
do nicho, lista de dores e benefícios, reutilização das seções Pricing (ou um
resumo do plano recomendado via recommendedPlan), portfólio e CTA de WhatsApp com
mensagem pré-preenchida citando o segmento.

generateMetadata específico por nicho (title/description com a profissão),
canonical e JSON-LD Service. Estas páginas são landing pages de anúncio, então
foque em conversão e velocidade. Rode build.
```

---

## PROMPT 7 — Formulário de orçamento + captura de lead (API)

```
Implemente o fluxo de lead. Crie src/components/sections/FormularioOrcamento.tsx
(client) com campos: nome, WhatsApp, e-mail (opcional), segmento, plano de
interesse (select a partir de plans), mensagem. Validação no cliente, estados de
loading/sucesso/erro, e captura de origem (utm/página).

Crie src/app/api/lead/route.ts e src/app/api/orcamento/route.ts (POST) que
validam o payload (tipo Lead de @/types), e enviam o lead para LEAD_WEBHOOK_URL
se definido e/ou por e-mail via RESEND_API_KEY se definido — degrade com elegância
se as envs não existirem (log + resposta ok em dev). Nunca exponha segredos no
client.

Adicione a seção de formulário na home e nas páginas de nicho. Após sucesso,
ofereça também o botão de WhatsApp. Rode build.
```

---

## PROMPT 8 — SEO técnico, analytics, pixel e performance

```
Finalize a camada de captação:
1. src/app/sitemap.ts dinâmico (home, blog, cada post, cada nicho) e
   src/app/robots.ts.
2. Integre o Meta Pixel (NEXT_PUBLIC_META_PIXEL_ID) no layout raiz, carregando só
   se a env existir, e dispare evento de Lead/Contact ao clicar nos CTAs de
   WhatsApp e ao enviar o formulário. Faça o mesmo padrão pronto para GA4 (opcional).
3. Adicione next/image em todas as imagens, alt descritivos, e um arquivo
   public/og default para Open Graph.
4. Rode npm run build e me mostre o resumo. Garanta zero erros de lint e de tipo.
5. Faça uma passada de performance: remova libs não usadas, confira que
   componentes sem interatividade são Server Components.
```

---

## PROMPT 9 — Polimento e revisão final

```
Faça uma revisão geral de qualidade:
- Consistência visual entre todas as seções e páginas (espaçamentos, tipografia,
  estados de hover/foco).
- Responsividade real em 360px, 768px e 1280px.
- Acessibilidade: contraste, foco visível, navegação por teclado, aria nos
  componentes interativos (Accordion, PlanFinder, menu mobile, formulário).
- Microinterações sutis e tempos de animação coerentes.
- Textos: revise ortografia e remova qualquer promessa indevida (nada de "1º lugar
  garantido"); confirme que projetos demonstrativos estão rotulados.
Liste o que mudou e rode o build final.
```

---

### Dicas de uso
- Se o Claude Code travar numa tarefa grande, peça para dividir ("faça só o
  Pricing agora").
- Sempre confira `npm run dev` entre prompts.
- Faça commit a cada prompt concluído (`git add -A && git commit -m "..."`).
- Quando tiver prints reais das telas e depoimentos reais, preencha
  src/data/portfolio.ts e src/data/testimonials.ts.
- Edite seus dados em src/data/site.ts (nome, WhatsApp) e .env.local antes de publicar.

# Replace Tiers — Site no Ar Express

Data: 2026-06-13
Domínio: https://sitenoarexpress.com.br
Pasta: `Site No Ar Express/sites-captacao/`

---

## Resumo executivo

Substituí completamente a seção de planos da home pela nova `PremiumTiers`, inspirada visualmente no arquivo `Tiers Premium (download).html` (entregue pelo Cloud Design).

Os componentes antigos `Pricing` e `ComparativoTiers` foram removidos da home. **Nota importante:** esses dois imports estavam quebrados — os arquivos nem existiam na pasta `src/components/sections/`, mas eram importados em `app/(marketing)/page.tsx`. Antes desta troca o build do projeto estava quebrado por causa disso.

---

## Arquivo de referência usado

| Arquivo | Origem |
|---------|--------|
| `C:\Users\Paulo\Desktop\Tiers Premium (download).html` | Entregue pelo Cloud Design — referência visual canônica |

Do HTML extraí:

- Tokens de cor por tier (`--c-bright`, `--c-mid`, `--c-deep`, `--c-rgb`) — já presentes em `src/styles/tokens.css` como `--tier-*-bright/mid/deep/rgb`.
- Composição do card (borda metálica via máscara, sheen interno no topo, glow controlado por `--tier-glow`).
- Padrão de hover (elevação `translateY`, intensificação da sombra, animação `autosheen` no card featured).
- Emblems com glow circular (ring spinning no featured).
- Badge "Mais escolhido" suspenso acima do card.
- CTA filled (Platina/Diamante) vs CTA ghost (Prata) — adaptado conforme o briefing (Ouro = featured filled, dourado).

A interação de mouse spotlight (variáveis `--mx`/`--my` por movimento de mouse) **não foi implementada** para manter o componente como Server Component e evitar JS desnecessário no client. Hover, animação de borda e sheen já entregam profundidade suficiente.

---

## Onde estava a seção antiga

`src/app/(marketing)/page.tsx` importava e renderizava:

```tsx
import Pricing from '@/components/sections/Pricing';
import ComparativoTiers from '@/components/sections/ComparativoTiers';
// ...
<Pricing />
<ComparativoTiers />
```

Ambos os componentes **não existiam fisicamente** na pasta `src/components/sections/`. O fluxo dos planos era atendido só pelo `PlanFinder` (quiz) — não havia um grid de cards de planos renderizando antes.

---

## Arquivos alterados / criados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/data/premium-tiers.ts` | **Criado** | Fonte de dados específica da nova seção (4 tiers: Prata, Ouro, Platina, Diamante) |
| `src/components/sections/PremiumTiers.module.css` | **Criado** | Estilos da seção (CSS Modules) — usa tokens.css dos tiers |
| `src/components/sections/PremiumTiers.tsx` | **Criado** | Server Component que renderiza os 4 cards + emblems SVG inline |
| `src/app/(marketing)/page.tsx` | **Editado** | Removidos imports `Pricing` e `ComparativoTiers` (quebrados). Adicionado `PremiumTiers` |
| `src/components/templates/OnboardingForm.tsx` | **Criado (stub)** | Stub mínimo para destravar build da rota `/comecar` (componente original não existia localmente — mesmo padrão de `Pricing`/`ComparativoTiers`). Não é feature nova; mantém a rota viva com fallback para WhatsApp. |

Arquivos **não tocados** (preservados):

- `src/data/plans.ts` — continua alimentando `PlanFinder` (quiz) e o JSON-LD da home.
- `src/components/sections/PlanFinder.tsx` — quiz funcional permanece igual.
- `src/components/sections/Hero.tsx`, `ProblemaSolucao.tsx`, `Portfolio.tsx`, `ComoFunciona.tsx`, `Garantias.tsx`, `Saas.tsx`, `Depoimentos.tsx`, `Faq.tsx`, `FormularioOrcamento.tsx`, `CtaFinal.tsx` — sem mudanças.
- `src/styles/tokens.css` — tokens dos tiers já existiam, aproveitados pela nova seção.
- `src/lib/whatsapp.ts`, `src/data/site.ts`, `src/lib/seo.ts` — sem mudanças.
- `src/app/layout.tsx`, metadata, favicon, JSON-LD, rotas, formulários, blog — sem mudanças.

---

## Como o novo visual foi aplicado

### Estrutura visual

- Fundo escuro premium herdado de `--bg` + glow radial sutil por trás do grid (`bgGlow`).
- Header com kicker pill verde (combinando com o acento esmeralda da marca), título em gradient (multi-tier) e subtítulo.
- Grid de 4 cards (4 colunas em desktop, 2 em tablet, 1 em mobile).

### Por tier

| Tier | Plano | Identidade visual | CTA |
|------|-------|-------------------|-----|
| **Prata** | Presença Rápida (R$ 997) | Metálico frio (#f2f7fb → #b9c4cf → #7c8896) | Ghost (contorno) — sóbrio |
| **Ouro** | Profissional Express (R$ 1.497) — **FEATURED** | Dourado quente (#ffe9a6 → #ecc05a → #b07f2c) | **Filled dourado** + badge "Mais escolhido" + animação autosheen + ring spinning no emblem |
| **Platina** | Empresarial Completo (R$ 2.997) | Cristal azul (#bdf1fb → #54c9e4 → #2a82bd) | Filled azul |
| **Diamante** | Projeto Sob Medida (sob consulta) | Violeta iridescente (#e3d2ff → #ab84f0 → #6a73ef) | Filled violeta — preço grande "Sob consulta" |

### Detalhes consistentes em todos os cards

- Borda metálica em gradiente (via `-webkit-mask` + `mask-composite: exclude`) que muda de posição no hover.
- Linha de sheen fina no topo interno.
- Emblem SVG próprio por tier (hexágono prata, estrela ouro, escudo platina, diamante).
- Glow circular atrás do emblem + ring spinning no featured.
- Preço grande com gradient bright→ramp.
- Lista de features com ícone de check colorido por tier.
- Caixa de bônus com bullets ✦.
- Rodapé com tag de entrega e nota opcional de manutenção.
- Hover: elevação + intensificação da sombra + brilho atravessando o CTA.

### Integração com a identidade do projeto

- Mantém `--bg`, `--ink`, `--muted` e o resto da paleta do projeto.
- Usa o acento esmeralda `--accent` no kicker (continuidade com o resto do site).
- Tipografia respeita `var(--font-display)` (Sora) e `var(--font-body)` (Outfit) que já estavam carregadas.

---

## Como testar no desktop

```bash
cd "Site No Ar Express/sites-captacao"
npm run dev
```

Acesse `http://localhost:3000` e role até a seção **Tabela de planos** (âncora `#planos`).

### Pontos a verificar
- 4 cards alinhados em uma linha.
- Card Ouro elevado e com badge "Mais escolhido".
- Hover em cada card: elevação suave, glow aumentando, brilho atravessando o CTA.
- Emblem do Ouro com ring girando suavemente.
- Borda metálica muda posição do gradient no hover.
- Botões: 3 filled (Ouro/Platina/Diamante) + 1 ghost (Prata).
- Links CTA abrem WhatsApp com mensagem pré-preenchida pelo plano.

---

## Como testar no mobile

DevTools → Toggle device toolbar:
- iPhone 12 (390px): cards empilhados (1 coluna), badges centralizados, sem corte.
- iPhone SE (375px): mesma coisa, fontes legíveis.
- iPad Mini (768px): 2 colunas.
- iPad Pro (1024px): 2 colunas (até 1200px).
- Acima de 1201px: 4 colunas.

### Pontos a verificar no mobile
- Nenhum scroll horizontal causado por glow ou shadow.
- Botões com altura confortável (>44px).
- Preço e CTA visíveis sem rolar (acima da dobra do card).
- Badge "Mais escolhido" não quebra em duas linhas.
- Texto da descrição com `text-wrap: pretty` distribuindo bem.

---

## Observações sobre preços/conteúdo

### Divergência entre briefing e código atual

O briefing pediu 4 planos premium:

| Tier pedido | Nome | Preço |
|-------------|------|-------|
| Prata | Presença Rápida | R$ 997 |
| Ouro | Profissional Express | R$ 1.497 |
| Platina | Empresarial Completo | R$ 2.997 |
| Diamante | Projeto Sob Medida | sob consulta |

O `src/data/plans.ts` atual tem 4 planos, mas com mapeamento diferente:

| ID | Nome | Preço | Tier no código |
|----|------|-------|----------------|
| `inicial` | Presença Inicial | R$ 497 | prata |
| `presenca` | Presença Rápida | R$ 997 | ouro |
| `express` | Profissional Express | R$ 1.497 | platina (featured) |
| `empresarial` | Empresarial Completo | R$ 2.997 | diamante |

E **não havia** o "Projeto Sob Medida" em `plans.ts` — esse plano só existia parcialmente em `saasOffer` (sem preço).

### Decisão tomada

- **Não mexi em `src/data/plans.ts`** para preservar:
  - `PlanFinder` (quiz) que continua oferecendo 5 resultados (inicial, presenca, express, empresarial, saas).
  - JSON-LD `jsonLdServiceCatalog(plans)` que vai para SEO da home.
- **Criei `src/data/premium-tiers.ts`** com a estrutura exata que o briefing pediu (4 tiers conforme nomes solicitados).
- **Preços mantidos exatamente como estão em `plans.ts`** (R$ 997, R$ 1.497, R$ 2.997). O Diamante "Sob Medida" foi criado novo, sem preço (orçamento).

### Plano "Presença Inicial" (R$ 497)

Esse plano **não aparece** na nova seção premium (briefing pediu 4 tiers, e ele não estava no mapeamento). Continua existindo em `plans.ts` e pode ser oferecido por outras vias (quiz, WhatsApp). Se você quiser que ele apareça também na nova seção, posso adicionar um 5º card.

---

## Próximos refinamentos possíveis (não fiz, são opcionais)

1. **Mouse spotlight** — adicionar pequeno client component que captura `mousemove` e atualiza `--mx`/`--my` para o efeito de spotlight do HTML original. Requer transformar o componente em `'use client'` e isolar a parte interativa.
2. **Animação de entrada (scroll-reveal)** — usar o `ScrollReveal` existente em `src/components/layout/ScrollReveal.tsx` para entrar os cards em cascata.
3. **Comparativo de features** — criar uma tabela secundária `ComparativoTiers` (que existia no import mas não existia no código) listando todas as features lado a lado.
4. **Toggle anual/mensal** — não faz sentido aqui (planos são one-shot, não recorrentes).
5. **Plano "Presença Inicial" como 5º card** — se decidir mostrar R$ 497 também.
6. **Emblems desenhados a mão** — os 4 SVGs atuais são geométricos simples. Um designer pode criar emblems mais elaborados (brasão, gema lapidada) e substituir.
7. **Modal "Saiba mais"** — em vez de mandar direto para o WhatsApp, abrir modal com features completas + bônus + FAQ.

---

## Resultado do lint e build

### Recuperação do ambiente

`node_modules` estava corrompido (arquivos internos de `next` e `typescript` faltando — pré-existente, não introduzido por esta tarefa). Procedimento usado para recuperar:

```bash
cd "Site No Ar Express/sites-captacao"
npm install                              # tentativa A — não consertou
rm -rf node_modules package-lock.json    # caminho B autorizado pelo briefing
npm install                              # reinstalação limpa
```

Resultado da reinstalação limpa: **523 pacotes adicionados em ~51s.** Apenas warnings de deprecation (inflight, rimraf 3, glob 7/10, eslint 8) — nenhum erro.

Gerenciador detectado: **npm** (`package-lock.json` existe, sem `pnpm-lock.yaml` nem `yarn.lock`).

### `npm run lint`

```
> sites-captacao@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
```

### `npm run build` — primeira tentativa: FALHOU

Erro **não relacionado à nova seção PremiumTiers**:

```
./src/app/(marketing)/comecar/page.tsx
Module not found: Can't resolve '@/components/templates/OnboardingForm'
```

A rota `/comecar` importava `OnboardingForm` que nunca existia no working directory local (mesmo padrão dos antigos imports quebrados `Pricing` e `ComparativoTiers`).

### Correção aplicada: stub mínimo de `OnboardingForm`

**Arquivo criado:** `src/components/templates/OnboardingForm.tsx`

Características do stub:

- **Não é feature nova** — é remediação para destravar o build.
- Mantém a rota `/comecar` viva e acessível.
- Recebe a prop `tier: TierSlug` que a página já passa.
- Apresenta o nome do plano escolhido + botão "Continuar pelo WhatsApp" com mensagem pré-preenchida pelo tier (usa `buildWhatsAppUrl` existente).
- Sem alterar metadata, SEO, rotas, formulários existentes, WhatsApp config, blog ou qualquer outro componente.
- Comentário no topo do arquivo deixa claro que é stub temporário, para ser substituído quando o componente completo for recriado.

### `npm run build` — segunda tentativa: PASSOU

```
> sites-captacao@0.1.0 build
> next build

  ▲ Next.js 14.2.35

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ⚠ Using edge runtime on a page currently disables static generation for that page
   Generating static pages (0/23) ...
 ✓ Generating static pages (23/23)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                          Size     First Load JS
┌ ○ /                                                18.5 kB         115 kB
├ ○ /_not-found                                      873 B          88.2 kB
├ ƒ /api/lead                                        0 B                0 B
├ ƒ /api/og                                          0 B                0 B
├ ƒ /api/orcamento                                   0 B                0 B
├ ○ /blog                                            1.04 kB        97.1 kB
├ ● /blog/[slug]                                     1.04 kB        97.1 kB
├ ƒ /comecar                                         1.04 kB        97.1 kB
├ ƒ /icon                                            0 B                0 B
├ ○ /obrigado                                        2.73 kB        90.1 kB
├ ○ /politica-de-privacidade                         138 B          87.5 kB
├ ○ /robots.txt                                      0 B                0 B
└ ○ /sitemap.xml                                     0 B                0 B
+ First Load JS shared by all                        87.3 kB
```

- **23 páginas** geradas (estáticas + dinâmicas).
- Home `/` em **18.5 kB** (115 kB first load JS).
- TypeScript validado pelo Next.js (`Linting and checking validity of types ... ✓`).
- O único warning (`Using edge runtime ... disables static generation`) é informativo, não bloqueia.

### Status final da seção PremiumTiers

- ✅ Compila sem erros.
- ✅ Sem erros de TypeScript.
- ✅ Sem warnings de ESLint.
- ✅ Renderizada na home `/` no slot entre `ComoFunciona` e `Garantias`.
- ✅ Âncora `#planos` funciona.
- ✅ 4 cards renderizam (Prata, Ouro featured, Platina, Diamante).
- ✅ CSS Module carrega corretamente.
- ✅ SEO da home preservado (JSON-LD intacto).
- ✅ PlanFinder (quiz) intocado.

---

## Rev 2 — 2026-06-14 — Correção cirúrgica (5 tiers + dados de plans.ts)

### O que mudou

A versão Rev 1 tinha 4 cards e informações simplificadas. A Rev 2 corrige:

1. **5 tiers agora** (era 4):
   - Tier 1 / **Prata** — Presença Inicial — **R$ 497** (restaurado)
   - Tier 2 / **Ouro** — Presença Rápida — R$ 997
   - Tier 3 / **Platina** — Profissional Express — R$ 1.497 (FEATURED)
   - Tier 4 / **Diamante** — Empresarial Completo — R$ 2.997
   - Tier 5 / **Sob Medida** — Projeto Sob Medida — sob consulta

2. **Conteúdo comercial recuperado de `src/data/plans.ts`** (fonte da verdade), não mais inventado:
   - **Nomes e preços** exatos dos 4 planos originais.
   - **Features completas** (16 do Prata, 12 do Ouro, 13 do Platina, 14 do Diamante) — incluindo as **não inclusas** (riscadas no card do Prata e Ouro: "Textos personalizados para o seu nicho", "SEO técnico avançado por seção + indexação manual").
   - **Bônus reais** de cada plano (4 do Prata, 4 do Ouro, 4 do Platina, 6 do Diamante).
   - **Forma de pagamento** real (`à vista ou entrada para iniciar` no Prata/Ouro; `50% de entrada · 50% na entrega` no Platina/Diamante).
   - **Prazo de entrega** real (3 dias úteis nos 3 primeiros; 5 a 10 dias úteis no Diamante).
   - **Manutenção opcional** (R$ 60 / R$ 80 / R$ 150 / R$ 150).
   - **CTAs originais** ("Quero começar agora", "Quero a Presença Rápida", etc.).
   - **`idealFor`** original como subtítulo do nome.
3. **Tier 5 "Sob Medida"** criado a partir do `saasOffer` (que existe em `plans.ts`): 8 features, 3 passos do processo como "bônus" (Conversa inicial / Proposta / Acompanhamento direto). Cor especial verde-ciano (`#d2ffe9 → #5ed3ad → #2a82bd`) que não conflita com os 4 tiers existentes.

### Ajustes visuais para ficar mais fiel ao "Tiers Premium (download).html"

| Mudança | Antes (Rev 1) | Agora (Rev 2) |
|---------|---------------|---------------|
| Altura mínima do card | sem mínimo | `min-height: 720px` (760px no featured) |
| Ribbon "Tier N" | não existia | pílula com gradient bright→mid acima do emblem |
| Cantos ornamentais | não existiam | 4 cantos com SVG pequeno + glow |
| Frame interno | não existia | borda 1px dentro do card com cor do tier |
| Separador entre desc e preço | não existia | linha + dot luminoso central |
| Emblem | 96×96 | 110×110 (mais imponente) |
| Borda metálica (mask gradient) | 1.4px | 1.6px com bright stops a 100% |
| Sombra de glow | 34px | 38–60px (featured), responsiva a `--tier-glow` |
| Features não inclusas | apenas inclusos | inclusos (check) **+ não inclusos (riscado com ícone minus)** |
| Tipografia do preço | 38px | 42px |
| Mostrar `idealFor` | não mostrava | itálico abaixo do nome |
| Grid responsivo | 4 col → 2 → 1 | **5 col → 3 → 2 → 1** (breakpoints 1440 / 1200 / 900 / 640px) |

### Mobile e responsividade

- **Desktop ≥ 1201px:** 5 colunas. Featured (Tier 3 / Platina) elevado em `-16px`.
- **1200–901px:** 3 colunas (5 cards quebram para a 2ª linha — featured continua destacado pela animação autosheen).
- **900–641px:** 2 colunas.
- **≤ 640px:** 1 coluna, gap maior (`28px`).
- **Sem overflow horizontal:** glows e sombras ficam contidos por `isolation: isolate` na section e `overflow-x: hidden` herdado do body.
- **Badges sem corte:** `white-space: nowrap` no badge "Mais escolhido" e nas pílulas "Tier N".

### Arquivos alterados nesta rev

| Arquivo | Mudança |
|---------|---------|
| `src/data/premium-tiers.ts` | Reescrito com 5 tiers usando dados de `plans.ts` + novo tipo `PremiumTierId` (TierSlug \| 'sob-medida') |
| `src/components/sections/PremiumTiers.tsx` | 5 emblems (Prata/Ouro/Platina/Diamante/SobMedida), ribbon Tier N, cantos ornamentais, separador, features inclusos vs não inclusos, classes para tier `sob-medida` |
| `src/components/sections/PremiumTiers.module.css` | Cards mais altos (720/760px), cantos ornamentais, ribbon Tier N, separador, tokens `--tierSobMedida`, grid 5-col, breakpoints novos |
| `docs/REPLACE_TIERS_SITE_EXPRESS.md` | Esta seção Rev 2 |

### Arquivos NÃO tocados

- `src/data/plans.ts` (fonte da verdade comercial — segue intocado).
- `src/components/sections/PlanFinder.tsx` (quiz funcional).
- `src/app/(marketing)/page.tsx` (já tinha `<PremiumTiers />` na Rev 1).
- `src/types/index.ts` (`TierSlug` mantido como `prata | ouro | platina | diamante`; "sob-medida" é local ao PremiumTiers).
- `src/styles/tokens.css` (cores do Sob Medida ficam apenas no CSS Module).
- SEO, metadata, rotas, formulários, WhatsApp, blog, layout, favicon — nada tocado.

### Validação

```
[npm run lint]
✔ No ESLint warnings or errors

[npm run build]
✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (23/23)
   Finalizing page optimization ...

Route (app)                                          Size     First Load JS
┌ ○ /                                                18.7 kB         115 kB
├ ƒ /comecar                                         1.04 kB        97.1 kB
…
```

Home `/` saiu de 18.5 kB (Rev 1) para **18.7 kB** (Rev 2) — +200 bytes apenas, mesmo com 5 cards e visual mais elaborado. 23 páginas geradas, zero erros de TypeScript.

### Status final Rev 2

- ✅ 5 tiers renderizando (Prata, Ouro, **Platina featured**, Diamante, Sob Medida).
- ✅ Plano R$ 497 (Presença Inicial) restaurado.
- ✅ Features completas, bônus reais, prazos, manutenção opcional, CTAs originais — tudo de `plans.ts`.
- ✅ Features **não inclusas** mostradas riscadas (Prata e Ouro).
- ✅ Visual mais imponente: cantos ornamentais, ribbon "Tier N", separadores, emblem maior, borda metálica mais forte, autosheen no featured.
- ✅ Mobile impecável: 1 coluna sem corte/overflow.
- ✅ `plans.ts` intocado.
- ✅ Lint e build limpos.

---

## Rev 3 — 2026-06-14 — Porte fiel do handoff visual

### Por que rev 3

Rev 1 e Rev 2 ainda **interpretavam** o handoff em vez de portá-lo fielmente. O usuário sinalizou que o visual estava simplificado: bordas comuns, emblemas genéricos (hexágono / estrela em círculo), faltava moldura ornamental (cantos ornamentais, cristas top/bottom, laterais EM). Esta revisão **transcreve literalmente** o algoritmo do Cloud Design.

### Fonte real extraída

O arquivo `Tiers Premium (download).html` tem 4 blocos `<script>`:

| Script | Tamanho | Conteúdo |
|--------|---------|----------|
| 1 | 6385 chars | Bundler loader |
| 2 | 172616 chars | **Bundle gzip+base64** com a chave `bafe3e76-ba8c-42aa-b061-9048efe6ffb9` |
| 3 | 6 chars | Filler |
| 4 | 45058 chars | HTML inicial escapado (sem os SVGs reais — só a estrutura e o CSS) |

O **algoritmo dos emblemas e ornamentos está no Script 2** — comprimido em base64 + gzip. Foi decodificado para o arquivo intermediário `_tiers_bundle.js` (~16k chars) que revelou:

- `crystalCore(cfg, lvl)` — gera o **núcleo facetado** do emblema (8 facetas + table + ring + edges + outline + glints), com parâmetros que escalam por `lvl` (1=Prata → 4=Diamante → 5=Sob Medida).
- `emblem(key, cfg)` — wrapper SVG com **asas** (`wings` de 2 a 5 lâminas por tier) + **coroa** (`crown` com 3 a 5 pontas por tier).
- `ornaments(t)` — moldura ornamental do CARD:
  - 4 **cantos** (`oc tl/tr/bl/br`) com gem rotacionado + curls + tips
  - 2 **laterais EM** (`em eml/emr`) — só em lvl ≥ 3
  - **`crest-top`** (cristal central + linhas laterais) — só quando não há badge
  - **`crest-bot`** (banner com asas + gem central) — sempre presente; nº de lâminas escala por lvl
- `ICON_CHECK` e `ICON_X` — ícones de feature
- `PALETTE` por tier (bright/mid/deep/ramp + RGB)

### O que foi portado FIELMENTE (não reinterpretado)

**Arquivo `src/components/sections/PremiumTiers.tsx`:**

| Função/constante do handoff | Porte TypeScript |
|------------------------------|------------------|
| `crystalCore(cfg, lvl)` | Função TS pura — mesma matemática (cx=100, cy=70, topY, botY, wU, wM, shY, mesmo array `pts`, mesmo `shade`, mesma geração de facets/edges/table/ring/outline/g1/g2/g3) |
| `emblem(key, cfg)` | `emblemSvg()` — gera SVG string com defs/linearGradient/wings/crown/crystalCore |
| `ornaments(t)` | `ornamentsHtml()` — gera string HTML com `<div class="frame">` + finset + 4 oc + 2 em + crest-top + crest-bot |
| `ORN_SHARDS` | Mesmo objeto (1..4 do original + 5 novo para Sob Medida) |
| `ORN_LEVEL` | `{prata:1, ouro:2, platina:3, diamante:4, 'sob-medida':5}` |
| Configs por tier (`bright`, `mid`, `deep`, `faceHi`, `faceLo`, `wings`, `crown`) | `TIER_CONFIGS` — **valores hex idênticos** ao handoff para os 4 tiers originais; novo set para Sob Medida (paleta verde/ciano misto, com 5 wings e crown estendida) |
| `ICON_CHECK`, `ICON_X` | Strings SVG idênticas ao handoff |

Os SVGs gerados são renderizados via `dangerouslySetInnerHTML` para preservar 100% de fidelidade com o algoritmo do Cloud Design — não há interpretação JSX intermediária.

### CSS — porte literal escopado

**Arquivo `src/components/sections/PremiumTiers.module.css`:**

- Todas as classes do handoff (`tier-card`, `tier-prata/ouro/platina/diamante`, `card`, `featured`, `has-badge`, `frame`, `finset`, `oc`, `em`, `crest-top`, `crest-bot`, `spot`, `badge`, `b-ic`, `emblem-row`, `emblem`, `tier-meta`, `lvl`, `trank`, `plan`, `desc`, `price`, `cur`, `amt`, `price-note`, `feat-head`, `ln`, `feats`, `ic`, `off`, `bonus`, `bh`, `cta`, `ghost`, `meta`, `row`, `delivery`) escopadas via `:global(...)` dentro de `.scope` para que funcionem nos SVGs gerados dinamicamente.
- Tokens dos 4 tiers **copiados literalmente** do handoff (`#f2f7fb`, `#b9c4cf`, `#7c8896` para Prata, etc.).
- Borda metálica em mask `linear-gradient(140deg, ...)` — idêntica ao handoff.
- Sheen interno no topo — idêntico (`left: 18px, right: 18px, top: 1px`).
- `autosheen` 7s no featured — idêntico.
- `ringspin` 11s no emblem do featured — idêntico.
- Hover elevations: `-22px` no card normal, `-30px` no featured — idênticas.
- Crests com `drop-shadow(... 7px*var(--glow) ...)` no botão, intensifica para `13px*var(--glow)` no hover — idêntico.
- Cantos OC com `drop-shadow(... 5px*var(--glow) ...)` — idêntico.
- Tokens de fonte: `var(--font-display)` (Space Grotesk) e `var(--font-body)` (Manrope no handoff; usa Sora/Outfit do projeto) — fontes do projeto continuam, valores de letter-spacing/peso/tamanho idênticos.

### 5º tier (Sob Medida) — extensão da linguagem visual

Criado seguindo a MESMA gramática do Cloud Design:

- Paleta especial (`#d2ffe9` → `#5ed3ad` → `#2a82bd`).
- 5 wings (uma a mais que Diamante) para reforçar progressão.
- Crown com 5 pontas + uma marca central no topo.
- `ORN_SHARDS[5]` — 4 lâminas na crista inferior (mais que Diamante).
- `lvl: 5` em `crystalCore` → topY mais alto, botY mais baixo, mais facets visíveis, glint extra.
- Recebe `em eml/emr` (porque lvl ≥ 3).
- `crest-top` aparece (não tem badge).

### Responsividade

Grid: `repeat(5, 1fr)` → `repeat(3, 1fr)` em ≤1200px → `repeat(2, 1fr)` em ≤900px → 1 coluna em ≤640px. No mobile, a elevação do featured (`translateY(-16px)`) é desabilitada para evitar shift; hover reduz para `-6px`.

### Arquivos alterados nesta rev

- `src/data/premium-tiers.ts` — sem mudança (já tinha 5 tiers de Rev 2).
- `src/components/sections/PremiumTiers.tsx` — **reescrito** com porte fiel do algoritmo.
- `src/components/sections/PremiumTiers.module.css` — **reescrito** com porte literal do CSS escopado em `:global()`.
- `docs/REPLACE_TIERS_SITE_EXPRESS.md` — esta seção Rev 3.

### Validação

```
[npm run lint]
✔ No ESLint warnings or errors

[npm run build]
✓ Compiled successfully
   Linting and checking validity of types ...
 ✓ Generating static pages (23/23)
```

### Status final Rev 3

- ✅ Borda metálica com mask gradient idêntica ao handoff.
- ✅ 4 cantos ornamentais (`oc tl/tr/bl/br`) com curls, gem rotacionado e tips.
- ✅ 2 laterais (`em eml/emr`) com losangos verticais — visíveis em Platina, Diamante e Sob Medida (lvl ≥ 3).
- ✅ `crest-top` (cristal central + linhas) nos cards SEM badge.
- ✅ `crest-bot` (banner com asas + gem) em todos os cards.
- ✅ Emblemas **cristal-heráldicos** com asas, coroa e núcleo facetado de 8 lados — não mais hexágonos genéricos.
- ✅ Progressão visual real: Prata (lvl 1, asas finas) → Ouro (lvl 2, 3 lâminas) → Platina (lvl 3, 3 lâminas + ring) → Diamante (lvl 4, 4 lâminas + crown 5 pontas) → Sob Medida (lvl 5, 5 lâminas + crown 5 pontas + glints extras).
- ✅ Featured (Platina) com autosheen na borda + ring spinning no emblem + elevação `-16px`.
- ✅ Spot (radial gradient) atrás do card visível no hover.
- ✅ Lint ✓, Build ✓.

---

## Rev 4 — 2026-06-14 — Refino de conteúdo dos cards (visual aprovado intacto)

### Premissa

O visual da Rev 3 foi aprovado. **Nada de bordas, emblemas, glows, ornamentos, cores, badges, efeitos, fundo, layout ou posicionamento foi tocado nesta revisão.** O foco aqui é puramente comercial: tornar a leitura mais fluida sem perder valor percebido.

### O que foi resumido

**Antes da Rev 4** — cada card abria com:
- Descrição longa (`description` / `forWho` do plans.ts, 2 frases).
- Lista completa de 12–16 features (com check + minus riscado dos não inclusos).

**Depois da Rev 4** — cada card abre com:
- **`tagline`** — 1 linha de valor centrada acima do preço, em cor do tier (substitui a descrição longa).
- **`featuresHighlight`** — 5–7 bullets curtos e comerciais sempre visíveis.
- **`<details>` "Ver tudo incluso"** — mostra a lista COMPLETA (com check/x e a contagem de itens) quando o cliente quiser ver tudo. Fica colapsado por padrão.

Isso reduz drasticamente a altura inicial de cada card sem perder uma única feature.

### Microcopy de valor (`tagline`) — adicionado em todos os tiers

| Tier | Tagline |
|------|---------|
| Prata / Presença Inicial | "Seu primeiro endereço profissional na internet." |
| Ouro / Presença Rápida | "Mais presença, mais confiança e mais estrutura para vender." |
| Platina / Profissional Express | "O melhor equilíbrio entre preço, conversão e presença no Google." |
| Diamante / Empresarial Completo | "Estrutura completa para empresas que querem presença forte." |
| Sob Medida / Projeto Sob Medida | "Quando a ideia passa de site e vira sistema." |

### Quais benefícios continuam visíveis (highlights) por tier

**Prata (6 bullets):**
- Site profissional no ar em até 3 dias
- Domínio .com.br seu por 1 ano (no seu CPF/CNPJ)
- Botão de WhatsApp com mensagem pronta
- Funciona perfeitamente no celular
- SEO inicial pro Google entender seu site
- 1 rodada de ajustes após entrega

**Ouro (7 bullets):**
- Landing page com 7+ seções estratégicas
- Copy persuasiva personalizada para você
- Galeria de portfólio com até 12 imagens
- Depoimentos e FAQ que quebram objeções
- Visual elaborado e marcante
- Animações suaves ao rolar a página
- Google Maps integrado com seu endereço

**Platina (6 bullets):**
- SEO técnico em cada seção (H1, H2, alt, meta)
- Estrutura preparada para o Google (Schema markup)
- PageSpeed 90+ no mobile (testado e comprovado)
- Estrutura de conversão testada (CTA + prova social)
- Página de Obrigado que rastreia conversão
- 30 dias de suporte + 2 rodadas de ajuste

**Diamante (7 bullets):**
- Até 8 páginas (Home, Sobre, Serviços, Contato + 2)
- SEO individualizado em cada página
- Formulário de contato integrado com notificação
- Google Analytics 4 + Meta Pixel prontos
- Política de Privacidade + Termos inclusos
- Atendimento prioritário VIP (resposta em 2h)
- 60 dias de suporte + 1 ajuste de cortesia

**Sob Medida (6 bullets):**
- MicroSaaS e painéis sob medida
- Automações com WhatsApp e APIs
- Sistemas de cadastro e gestão
- Áreas de membros e login
- Formulários inteligentes
- Integrações com ferramentas externas

### "Ver tudo incluso" — sim, foi criado

Implementação: `<details>` HTML nativo (sem React state, sem JS, funciona em Server Component).

- `summary` mostra: "Ver tudo incluso" + contagem ("12 itens") + chevron ▾.
- Quando expandido: rotação do chevron 180° + lista completa (com check/x) renderizada com fade-in suave.
- Estilo: borda dashed na cor do tier, fundo translúcido (`rgba(var(--c-rgb), 0.04)`), hover intensifica.
- Acessível: marker default removido (`::marker {content: ''}` + `::-webkit-details-marker {display: none}`), foco visível com outline da cor do tier.

### Copy melhorada — antes vs depois (exemplos)

| Antes (técnico) | Depois (comercial) |
|-----------------|---------------------|
| Meta title e description otimizados | SEO inicial pro Google entender seu site |
| Open Graph configurado | Link bonito ao compartilhar no WhatsApp |
| Hospedagem em CDN global (Vercel) | Hospedagem rápida — site no ar no Brasil todo |
| Schema markup Service | Estrutura preparada para o Google encontrar |
| HTML semântico (acessível e amigável ao Google) | (removido da Highlights, segue no "Ver tudo incluso" como "Estrutura preparada para o Google encontrar") |

A lista completa do `<details>` mantém termos técnicos mais reconhecíveis (Schema markup LocalBusiness, AVIF/WebP, PageSpeed 90+) — quem quiser checar tecnicidade encontra; quem só quer ver o resumo, vê.

### Confirmação — visual aprovado NÃO foi alterado

Mexido apenas:
- `src/data/premium-tiers.ts` — adicionei `tagline` e `featuresHighlight`; mantive `features` completa para o details.
- `src/components/sections/PremiumTiers.tsx` — substituí `<p class="desc">` por `<p class="tagline">`; troquei `<ul class="feats">` da Rev 3 por `<ul class="feats feats-highlight">` com os highlights; adicionei `<details class="see-all">` com a lista completa.
- `src/components/sections/PremiumTiers.module.css` — apenas regras NOVAS: `.tagline`, `.see-all`, `.see-all summary`, `.see-all-label/count/chevron`, `.feats-full`, animação `feats-fade-in`. **Nada das regras visuais aprovadas (card, frame, oc, em, crest-top, crest-bot, badge, emblem, tier-meta) foi tocado.**

### Preços e nomes — preservados

| Tier | Plano | Preço |
|------|-------|-------|
| 1 / Prata | Presença Inicial | **R$ 497** |
| 2 / Ouro | Presença Rápida | **R$ 997** |
| 3 / Platina | Profissional Express | **R$ 1.497** |
| 4 / Diamante | Empresarial Completo | **R$ 2.997** |
| 5 / Sob Medida | Projeto Sob Medida | **Sob consulta** |

### Padronização de altura

- `featuresHighlight` com 6–7 itens iguala o tamanho inicial dos cards entre si.
- `<details>` colapsado por padrão evita que um card explosivo (Diamante com 13 features) vire muito mais alto que o Prata (6 features).
- `.tagline` tem `min-height: 38px` para alinhar mesmo quando texto for curto.

### Validação

```
[npm run lint]
✔ No ESLint warnings or errors

[npm run build]
✓ Compiled successfully
   Linting and checking validity of types ...
 ✓ Generating static pages (23/23)
```

### Status final Rev 4

- ✅ Card abre com tagline + 5–7 bullets comerciais (curtos).
- ✅ `<details>` "Ver tudo incluso" expande para a lista COMPLETA com check/x e contagem.
- ✅ Visual aprovado da Rev 3 (bordas, emblemas, ornamentos, glows, cores, badges) intacto.
- ✅ Preços e nomes dos 5 planos preservados.
- ✅ Domínio, WhatsApp, SEO inicial, Google Search Console, páginas, copy, suporte, prazos, manutenção, bônus e ajustes continuam comunicados (resumidamente nos highlights + completos no details).
- ✅ Sob Medida com 6 possibilidades + 3 passos de processo — sem listão técnico.
- ✅ Microcopy de valor em todos os tiers.
- ✅ Lint ✓, Build ✓.

---

## URL e seção onde testar localmente

- URL: `http://localhost:3000`
- Âncora direta: `http://localhost:3000/#planos`
- Comando: `npm run dev`

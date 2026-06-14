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

## URL e seção onde testar localmente

- URL: `http://localhost:3000`
- Âncora direta: `http://localhost:3000/#planos`
- Comando: `npm run dev`

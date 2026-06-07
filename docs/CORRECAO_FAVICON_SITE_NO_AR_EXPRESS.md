# Correção do Favicon — Site no Ar Express

**Data:** 07 de junho de 2026
**Motivo:** Site sem favicon próprio — navegadores e Google exibiam globo genérico

---

## Auditoria dos arquivos existentes

| Arquivo | Status antes |
|---------|-------------|
| `public/favicon.ico` | **Ausente** |
| `public/favicon-48x48.png` | **Ausente** |
| `public/favicon-96x96.png` | **Ausente** |
| `public/icon-192.png` | **Ausente** |
| `public/icon-512.png` | **Ausente** |
| `public/apple-touch-icon.png` | **Ausente** |
| `public/site.webmanifest` | **Ausente** |
| `src/app/icon.tsx` | **Presente** — gerador dinâmico 32×32 (edge) |
| `src/app/layout.tsx` | **Presente** — sem campo `icons` e sem `manifest` |

---

## Logo/ícone base utilizado

**`src/app/icon.tsx`** — ícone dinâmico já existente no projeto, design intencional:
- Fundo: `#0a0e0d` (escuro)
- Letra: `S` em verde `#2dd48d`
- Borda arredondada: `border-radius 7px` em canvas 32×32 (≈ 21,875%)

Não existia nenhum logo SVG ou PNG dedicado no projeto. O `icon.tsx` foi usado como fonte de verdade do design.

---

## Arquivos criados

| Arquivo | Dimensão | Finalidade |
|---------|----------|-----------|
| `public/favicon.ico` | 16+32+48 multi-size | Google, navegadores legados |
| `public/favicon-48x48.png` | 48×48 | Aba de navegador / atalho |
| `public/favicon-96x96.png` | 96×96 | Google TV, alta resolução |
| `public/apple-touch-icon.png` | 180×180 | Homescreen iOS/Safari |
| `public/icon-192.png` | 192×192 | PWA Android (manifest) |
| `public/icon-512.png` | 512×512 | Splash screen PWA |
| `public/site.webmanifest` | — | Manifesto PWA |
| `scripts/generate-icons.js` | — | Script de geração (Sharp + SVG) |

---

## Metadata alterada — `src/app/layout.tsx`

Campo `icons` e `manifest` adicionados ao objeto `metadata`:

```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
  apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
},
manifest: '/site.webmanifest',
```

O campo `metadataBase` já estava correto — usa `process.env.NEXT_PUBLIC_SITE_URL` que deve ser `https://sitenoarexpress.com.br` na Vercel.

---

## Manifest criado — `public/site.webmanifest`

```json
{
  "name": "Site no Ar Express",
  "short_name": "Site Express",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2dd48d",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "purpose": "any maskable" }
  ]
}
```

---

## Robots — nenhuma alteração necessária

`src/app/robots.ts` só bloqueia `/api/` — todos os caminhos de favicon/manifest estão liberados pelo `allow: '/'`.

---

## Como regenerar os ícones no futuro

```bash
node scripts/generate-icons.js
```

Para trocar o design, edite a função `svgIcon()` no script. Para usar um logo PNG real, substitua o SVG por um `sharp(Buffer.from(fs.readFileSync('logo.png')))`.

---

## Como testar em produção

Após o deploy na Vercel, verificar:

```
https://sitenoarexpress.com.br/favicon.ico         → deve retornar ICO (não 404)
https://sitenoarexpress.com.br/favicon-48x48.png   → PNG 48×48
https://sitenoarexpress.com.br/favicon-96x96.png   → PNG 96×96
https://sitenoarexpress.com.br/icon-192.png         → PNG 192×192
https://sitenoarexpress.com.br/icon-512.png         → PNG 512×512
https://sitenoarexpress.com.br/apple-touch-icon.png → PNG 180×180
https://sitenoarexpress.com.br/site.webmanifest     → JSON válido
```

- **Google Search Console** → Inspecionar URL → ver prévia do favicon
- **Safari Mobile** → Adicionar à tela inicial → deve exibir o "S" verde
- **Chrome DevTools** → aba Application → Manifest → confirmar icons carregados

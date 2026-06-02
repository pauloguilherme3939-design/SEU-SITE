/**
 * Gerador do PDF de onboarding: "Vamos começar seu site"
 * Execute: node entregaveis/onboarding/gerar-onboarding.js
 * Saída:   entregaveis/onboarding/vamos-comecar-seu-site.pdf
 *
 * Reutiliza as fontes já baixadas em entregaveis/bonus/fonts/.
 * Se ainda não existirem, baixa automaticamente.
 */

'use strict';

const PDFDocument = require('pdfkit');
const fs   = require('fs');
const path = require('path');
const https = require('https');

/* ── Paleta ──────────────────────────────────────────────── */
const C = {
  bg: '#0a0e0d', bgSoft: '#101614', card: '#131b18', cardHi: '#172420',
  line: '#1e2d28', ink: '#f3f6f4', muted: '#9aa6a1', muted2: '#6b7873',
  accent: '#2dd48d', accent2: '#1aa86b', gold: '#e8c87a',
  sky: '#7dd3fc', violet: '#c4b5fd',
};

/* ── Fontes (compartilhadas com bonus/) ──────────────────── */
const FONT_DIR = path.join(__dirname, '..', 'bonus', 'fonts');
const F = {
  soraBold:      path.join(FONT_DIR, 'Sora-Bold.ttf'),
  soraXBold:     path.join(FONT_DIR, 'Sora-ExtraBold.ttf'),
  outfitReg:     path.join(FONT_DIR, 'Outfit-Regular.ttf'),
  outfitMed:     path.join(FONT_DIR, 'Outfit-Medium.ttf'),
  outfitSemi:    path.join(FONT_DIR, 'Outfit-SemiBold.ttf'),
};
const FONT_URLS = {
  soraBold:      'https://fonts.gstatic.com/s/sora/v17/xMQOuFFYT72X5wkB_18qmnndmSe1mX-K.ttf',
  soraXBold:     'https://fonts.gstatic.com/s/sora/v17/xMQOuFFYT72X5wkB_18qmnndmSfSmX-K.ttf',
  outfitReg:     'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf',
  outfitMed:     'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4E.ttf',
  outfitSemi:    'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf',
};

/* ── Helpers ─────────────────────────────────────────────── */
function hex(h) {
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
}
function dl(url, dest) {
  return new Promise((res, rej) => {
    if (fs.existsSync(dest)) { res(); return; }
    const f = fs.createWriteStream(dest);
    function get(u) {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
        if (r.statusCode === 301 || r.statusCode === 302) { get(r.headers.location); return; }
        r.pipe(f);
        f.on('finish', () => { f.close(); res(); });
      }).on('error', rej);
    }
    get(url);
  });
}
async function downloadFonts() {
  fs.mkdirSync(FONT_DIR, { recursive: true });
  for (const [k, url] of Object.entries(FONT_URLS)) {
    process.stdout.write(`  ↓ ${path.basename(F[k])}... `);
    await dl(url, F[k]);
    console.log('ok');
  }
}

/* ── Conteúdo do checklist ───────────────────────────────── */
const SECTIONS = [
  {
    id: 'negocio',
    title: 'Sobre o negócio',
    tier: null,
    items: [
      { text: 'Nome do negócio (como deve aparecer no site)', required: true },
      { text: 'Tipo de negócio / segmento  (ex: barbearia, dentista, eletricista)', required: true },
      { text: 'Cidade e região de atendimento', required: true },
      { text: 'Uma frase curta sobre o que você faz  (ex: "Barbearia premium no centro de SP")', required: true },
      { text: 'Número de WhatsApp que vai aparecer no botão do site', required: true },
    ],
  },
  {
    id: 'dominio',
    title: 'Domínio (.com.br)',
    tier: null,
    items: [
      { text: '1ª opção de domínio desejado  (ex: nomedobusiness.com.br — sem o .com.br)', required: true },
      { text: '2ª opção  (caso a primeira já esteja registrada por outra pessoa)', required: false },
      { text: 'Nome completo + CPF ou CNPJ  (o domínio fica registrado no seu nome)', required: true },
    ],
  },
  {
    id: 'logo',
    title: 'Logo',
    tier: null,
    items: [
      { text: 'Arquivo da logo em PNG ou SVG com fundo transparente  (boa resolução)', required: false, note: 'Não tem logo? Tudo bem — trabalho com o nome do negócio em tipografia limpa.' },
      { text: 'Versão horizontal e/ou vertical, se existir', required: false },
      { text: 'Paleta de cores da marca  (se já tiver cores definidas)', required: false },
    ],
  },
  {
    id: 'fotos',
    title: 'Fotos',
    tier: null,
    items: [
      { text: 'Fotos do espaço / ambiente  (se atende presencialmente)', required: false, note: 'Fotos tiradas do celular em boa luz funcionam muito bem — não precisa de fotógrafo profissional.' },
      { text: 'Fotos dos produtos, serviços ou resultados do seu trabalho', required: false },
      { text: 'Foto pessoal ou da equipe  (recomendado — gera muito mais confiança)', required: false },
      { text: 'Fotos de antes e depois, se aplicável ao seu segmento', required: false },
    ],
  },
  {
    id: 'servicos',
    title: 'Serviços e textos',
    tier: null,
    items: [
      { text: 'Lista dos serviços que oferece  (nome + breve descrição de cada)', required: true },
      { text: 'Preços ou tabela de valores  (pode ser "a partir de" ou "sob consulta")', required: false },
      { text: 'Formas de pagamento aceitas  (Pix, cartão, boleto, dinheiro…)', required: false },
      { text: 'O que diferencia você da concorrência na sua cidade', required: false },
      { text: 'Algum texto ou conteúdo que você já tenha pronto  (pode mandar tudo)', required: false },
    ],
  },
  {
    id: 'contato',
    title: 'Contato e redes sociais',
    tier: null,
    items: [
      { text: 'E-mail de contato do negócio  (se quiser exibir no site)', required: false },
      { text: 'Instagram  (@perfil)', required: false },
      { text: 'Facebook  (nome da página ou link)', required: false },
      { text: 'TikTok, YouTube, LinkedIn ou outras redes  (se tiver e quiser incluir)', required: false },
      { text: 'Horário de atendimento  (dias da semana + horários)', required: false },
      { text: 'Endereço completo  (se atende presencialmente ou quer exibir localização)', required: false },
    ],
  },
  {
    id: 'depoimentos',
    title: 'Depoimentos de clientes',
    tier: 'Ouro+',
    tierColor: C.gold,
    items: [
      { text: '2 a 5 depoimentos reais de clientes  (nome + texto do depoimento)', required: false, note: 'Não tem depoimentos escritos? Prints de avaliações do WhatsApp ou Google também servem.' },
      { text: 'Foto do cliente que deu o depoimento  (opcional, mas aumenta muito a credibilidade)', required: false },
    ],
  },
  {
    id: 'seo',
    title: 'SEO e Google',
    tier: 'Platina+',
    tierColor: C.sky,
    items: [
      { text: 'Palavras que seus clientes usam para te buscar no Google  (ex: "eletricista em Campinas", "manicure Moema")', required: false, note: 'Mesmo que não saiba ao certo, qualquer ideia ajuda bastante.' },
      { text: 'Você já tem perfil no Google Meu Negócio?  (Sim / Não / Não sei)', required: false },
    ],
  },
  {
    id: 'paginas',
    title: 'Páginas do site',
    tier: 'Diamante',
    tierColor: C.violet,
    items: [
      { text: 'Confirmar quais páginas quer  (padrão: Início, Sobre, Serviços, Contato)', required: false },
      { text: 'Qual seria a 5ª página extra?  (ex: Portfólio, Blog, Localização, FAQ)', required: false },
    ],
  },
  {
    id: 'estilo',
    title: 'Estilo e referências',
    tier: null,
    items: [
      { text: 'Cores que você prefere para o site  (pode ser "fica à sua escolha" também)', required: false },
      { text: 'Tom da comunicação  (formal, informal, divertido, técnico…)', required: false },
      { text: '2 ou 3 sites que você gosta como referência  (de qualquer segmento)', required: false },
      { text: 'Algo que você NÃO quer no site  (estilos, cores, elementos)', required: false },
    ],
  },
];

/* ── Geração ─────────────────────────────────────────────── */
function generate() {
  const OUT = path.join(__dirname, 'vamos-comecar-seu-site.pdf');
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title:   'Vamos começar seu site — o que preciso de você',
      Author:  'Site no Ar Express',
      Subject: 'Checklist de materiais para criação de site',
    },
  });
  doc.pipe(fs.createWriteStream(OUT));

  const W = doc.page.width;
  const H = doc.page.height;
  const PAD = 44;
  const CW  = W - PAD * 2;

  /* ── Utilidades ──────────────────────────────── */
  function stripe(y, h, color) {
    doc.rect(0, y, W, h).fill(color);
  }
  function txt(text, x, y, { font = F.outfitReg, size = 10.5, color = C.ink, width = CW, align = 'left', lineGap = 2 } = {}) {
    doc.font(font).fontSize(size).fillColor(color).text(text, x, y, { width, align, lineGap });
    return doc.y;
  }
  function checkbox(x, y, checked = false) {
    doc.roundedRect(x, y, 9, 9, 2)
      .strokeColor(checked ? C.accent : C.line).lineWidth(1).stroke();
    if (checked) {
      doc.font(F.outfitSemi).fontSize(7).fillColor(C.accent)
        .text('✓', x + 1.5, y + 0.5, { width: 8, align: 'center', lineBreak: false });
    }
  }
  function tierBadge(x, y, label, color) {
    const bw = doc.font(F.outfitSemi).fontSize(7.5).widthOfString(label) + 12;
    doc.roundedRect(x, y, bw, 14, 7)
      .fillColor([...hex(color), 0.18]).fill();
    doc.font(F.outfitSemi).fontSize(7.5).fillColor(color)
      .text(label, x, y + 3, { width: bw, align: 'center', lineBreak: false });
    return bw;
  }

  /* ── Rodapé de página ────────────────────────── */
  function footer(pageLabel) {
    doc.font(F.outfitReg).fontSize(7.5).fillColor(C.muted2)
      .text('Site no Ar Express · Checklist de materiais', PAD, H - 26, { width: CW / 2 });
    doc.font(F.outfitReg).fontSize(7.5).fillColor(C.muted2)
      .text(pageLabel, PAD, H - 26, { width: CW, align: 'right' });
    stripe(H - 2, 2, C.accent2);
  }

  /* ════════════════════════════════════════════
     CAPA
  ════════════════════════════════════════════ */
  stripe(0, H, C.bg);
  stripe(0, 3, C.accent);
  stripe(H - 3, 3, C.accent);

  // Glow
  doc.circle(W / 2, 190, 280).fill([...hex(C.accent), 0.05]);

  // Ícone central
  doc.roundedRect(W/2 - 40, 110, 80, 80, 20).fill(C.card);
  doc.roundedRect(W/2 - 39, 111, 78, 78, 19)
    .strokeColor([...hex(C.accent), 0.4]).lineWidth(1).stroke();
  doc.font(F.soraBold).fontSize(44).fillColor(C.accent)
    .text('✓', W/2 - 24, 127, { width: 50, align: 'center', lineBreak: false });

  // Eyebrow
  doc.font(F.outfitSemi).fontSize(9.5).fillColor(C.accent)
    .text('ONBOARDING · SITE NO AR EXPRESS', 0, 218, { width: W, align: 'center' });

  // Título
  doc.font(F.soraXBold).fontSize(32).fillColor(C.ink)
    .text('Vamos começar', 0, 240, { width: W, align: 'center', lineGap: 2 });
  doc.font(F.soraXBold).fontSize(32).fillColor(C.accent)
    .text('seu site!', 0, 278, { width: W, align: 'center' });

  // Subtítulo
  doc.font(F.outfitMed).fontSize(13).fillColor(C.muted)
    .text('Tudo o que preciso de você para começar', 0, 326, { width: W, align: 'center' });

  // Linha divisória
  doc.moveTo(PAD + 60, 366).lineTo(W - PAD - 60, 366)
    .strokeColor([...hex(C.accent), 0.3]).lineWidth(1).stroke();

  // Badges de tier
  const tiers = [
    { label: 'Prata · R$497',     color: '#cbd5e1' },
    { label: 'Ouro · R$997',      color: C.gold },
    { label: 'Platina · R$1.497', color: C.sky },
    { label: 'Diamante · R$2.997',color: C.violet },
  ];
  let bx = PAD;
  const badgeY = 384;
  tiers.forEach(({ label, color }) => {
    const bw = doc.font(F.outfitSemi).fontSize(8.5).widthOfString(label) + 14;
    doc.roundedRect(bx, badgeY, bw, 18, 9).fillColor([...hex(color), 0.12]).fill();
    doc.font(F.outfitSemi).fontSize(8.5).fillColor(color)
      .text(label, bx, badgeY + 4, { width: bw, align: 'center', lineBreak: false });
    bx += bw + 8;
  });

  // Nota de prazo — card
  const noteY = 430;
  doc.roundedRect(PAD, noteY, CW, 82, 12).fill(C.card);
  doc.moveTo(PAD, noteY).lineTo(PAD + CW, noteY)
    .strokeColor([...hex(C.accent), 0.5]).lineWidth(1.5).stroke();
  doc.font(F.outfitSemi).fontSize(9.5).fillColor(C.accent)
    .text('Sobre o prazo de entrega', PAD + 16, noteY + 14);
  doc.font(F.outfitReg).fontSize(9.5).fillColor(C.muted)
    .text(
      'O prazo (3 dias para Prata/Ouro/Platina · 5–10 dias para Diamante) começa a contar\n' +
      'a partir do momento em que você me enviar TODOS os materiais desta lista.\n' +
      'Envie tudo junto para garantir que o prazo funcione.',
      PAD + 16, noteY + 32, { width: CW - 32, lineGap: 2 }
    );

  // Branding rodapé capa
  doc.font(F.soraBold).fontSize(12).fillColor(C.ink)
    .text('Site no Ar Express', 0, H - 68, { width: W, align: 'center' });
  doc.font(F.outfitReg).fontSize(9).fillColor(C.muted2)
    .text('Criação de sites profissionais para pequenos negócios', 0, H - 50, { width: W, align: 'center' });

  /* ════════════════════════════════════════════
     PÁGINAS DE CHECKLIST
  ════════════════════════════════════════════ */
  const TOP    = 36;
  const BOTTOM = H - 44;
  let y = TOP;
  let pageNum = 1;

  function newPage() {
    doc.addPage();
    stripe(0, H, C.bg);
    stripe(0, 2, C.accent);
    footer(`Página ${++pageNum}`);
    y = TOP;
  }

  function needSpace(n) {
    if (y + n > BOTTOM) newPage();
  }

  function drawSection(sec) {
    needSpace(56);

    // Seção header
    const headerY = y;
    // Linha acento esquerda
    doc.rect(PAD, headerY + 2, 3, 18).fill(C.accent);

    doc.font(F.soraBold).fontSize(13).fillColor(C.ink)
      .text(sec.title, PAD + 10, headerY + 2, { width: CW - 100, lineBreak: false });

    // Badge de tier (direita)
    if (sec.tier) {
      const bw = doc.font(F.outfitSemi).fontSize(7.5).widthOfString(sec.tier) + 12;
      const bx = W - PAD - bw;
      doc.roundedRect(bx, headerY + 2, bw, 14, 7)
        .fillColor([...hex(sec.tierColor), 0.18]).fill();
      doc.font(F.outfitSemi).fontSize(7.5).fillColor(sec.tierColor)
        .text(sec.tier, bx, headerY + 5, { width: bw, align: 'center', lineBreak: false });
    }

    y = headerY + 28;

    // Items
    sec.items.forEach((item) => {
      const lineCount = Math.ceil((item.text.length * 5.8) / CW);
      const itemH = (lineCount > 1 ? 26 + (lineCount - 1) * 12 : 22) + (item.note ? 18 : 0);
      needSpace(itemH);

      // Checkbox
      checkbox(PAD, y, false);

      // Required star
      const reqX = PAD + 14;
      if (item.required) {
        doc.font(F.outfitSemi).fontSize(8).fillColor(C.accent)
          .text('*', reqX, y, { width: 8, lineBreak: false });
      }

      // Text
      doc.font(F.outfitReg).fontSize(9.5).fillColor(C.ink)
        .text(item.text, PAD + 14, y, { width: CW - 14, lineGap: 1.5 });
      y = doc.y + 3;

      // Note
      if (item.note) {
        needSpace(16);
        doc.font(F.outfitReg).fontSize(8.5).fillColor(C.accent2)
          .text('↳ ' + item.note, PAD + 14, y, { width: CW - 14, lineGap: 1 });
        y = doc.y + 3;
      }
    });

    y += 12;

    // Linha separadora
    if (y + 2 < BOTTOM) {
      doc.moveTo(PAD, y).lineTo(W - PAD, y)
        .strokeColor([...hex(C.line), 0.6]).lineWidth(0.5).stroke();
      y += 14;
    }
  }

  newPage(); // primeira página de conteúdo

  // Nota "*" legenda no topo
  doc.font(F.outfitReg).fontSize(8).fillColor(C.muted2)
    .text('* campo obrigatório · itens sem * são opcionais mas ajudam muito', PAD, y);
  y = doc.y + 16;

  SECTIONS.forEach(drawSection);

  /* ════════════════════════════════════════════
     PÁGINA FINAL — PRÓXIMOS PASSOS
  ════════════════════════════════════════════ */
  newPage();

  doc.font(F.soraXBold).fontSize(22).fillColor(C.ink)
    .text('E agora?', PAD, y);
  y = doc.y + 4;
  doc.font(F.outfitMed).fontSize(11).fillColor(C.muted)
    .text('Siga estes passos para o projeto começar:', PAD, y, { width: CW });
  y = doc.y + 20;

  const steps = [
    {
      num: '1',
      title: 'Junte os materiais desta lista',
      body: 'Não precisa estar tudo perfeito. Mande o que tiver — o que faltar a gente resolve juntos.',
    },
    {
      num: '2',
      title: 'Envie tudo pelo WhatsApp de uma vez',
      body: 'Prefiro receber tudo junto para não perder nada. Se precisar, organize numa pasta do Google Drive e mande o link.',
    },
    {
      num: '3',
      title: 'Confirmarei o recebimento em até 1h',
      body: 'Assim que receber tudo, confirmo e te informo a data exata de entrega.',
    },
    {
      num: '4',
      title: 'Prazo começa — site no ar em até 3 dias',
      body: 'A partir da confirmação dos materiais, corro para entregar no prazo combinado.',
    },
  ];

  steps.forEach((step) => {
    needSpace(70);
    const cardH = 60;
    doc.roundedRect(PAD, y, CW, cardH, 10).fill(C.card);

    // Número badge
    doc.roundedRect(PAD + 14, y + 14, 28, 28, 14).fill(C.accent);
    doc.font(F.soraBold).fontSize(13).fillColor(C.bg)
      .text(step.num, PAD + 14, y + 19, { width: 28, align: 'center', lineBreak: false });

    // Textos
    doc.font(F.outfitSemi).fontSize(10.5).fillColor(C.ink)
      .text(step.title, PAD + 52, y + 12, { width: CW - 66, lineBreak: false });
    doc.font(F.outfitReg).fontSize(9.5).fillColor(C.muted)
      .text(step.body, PAD + 52, y + 28, { width: CW - 66, lineGap: 1.5 });

    y += cardH + 8;
  });

  y += 12;
  needSpace(80);

  // CTA final
  doc.roundedRect(PAD, y, CW, 70, 12).fill(C.card);
  doc.rect(PAD, y, CW, 2).fill(C.accent);
  doc.font(F.outfitSemi).fontSize(9).fillColor(C.accent)
    .text('ENVIE OS MATERIAIS PARA', 0, y + 16, { width: W, align: 'center' });
  doc.font(F.soraBold).fontSize(18).fillColor(C.ink)
    .text('(XX) XXXXX-XXXX', 0, y + 32, { width: W, align: 'center' });
  doc.font(F.outfitReg).fontSize(9).fillColor(C.muted2)
    .text('Substitua pelo seu número antes de enviar ao cliente.', 0, y + 52, { width: W, align: 'center' });

  doc.end();
  return OUT;
}

/* ── Main ────────────────────────────────────────────────── */
(async () => {
  console.log('\n📋 Gerando checklist de onboarding...\n');
  console.log('Verificando fontes:');
  await downloadFonts();
  console.log('\nCriando PDF...');
  const out = generate();
  console.log(`\n✅ PDF gerado: ${out}\n`);
  console.log('Lembre-se de substituir "(XX) XXXXX-XXXX" pelo seu número na última página.\n');
})();

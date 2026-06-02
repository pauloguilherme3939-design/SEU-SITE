/**
 * Gerador do PDF bônus: "Bombe seu WhatsApp"
 * Execute: node entregaveis/bonus/gerar-pdf.js
 * Saída:   entregaveis/bonus/bombe-seu-whatsapp.pdf
 */

'use strict';

const PDFDocument = require('pdfkit');
const fs   = require('fs');
const path = require('path');
const https = require('https');

/* ── Paleta (tokens do site) ─────────────────────────────── */
const C = {
  bg:       '#0a0e0d',
  bgSoft:   '#101614',
  card:     '#131b18',
  cardHi:   '#172420',
  line:     '#1e2d28',
  ink:      '#f3f6f4',
  muted:    '#9aa6a1',
  muted2:   '#6b7873',
  accent:   '#2dd48d',
  accent2:  '#1aa86b',
  gold:     '#e8c87a',
  danger:   '#ff7a7a',
};

/* ── Fontes ──────────────────────────────────────────────── */
const FONT_DIR   = path.join(__dirname, 'fonts');
const FONTS = {
  soraBold:     path.join(FONT_DIR, 'Sora-Bold.ttf'),
  soraExtraBold:path.join(FONT_DIR, 'Sora-ExtraBold.ttf'),
  outfitReg:    path.join(FONT_DIR, 'Outfit-Regular.ttf'),
  outfitMed:    path.join(FONT_DIR, 'Outfit-Medium.ttf'),
  outfitSemi:   path.join(FONT_DIR, 'Outfit-SemiBold.ttf'),
};

const FONT_URLS = {
  soraBold:      'https://fonts.gstatic.com/s/sora/v17/xMQOuFFYT72X5wkB_18qmnndmSe1mX-K.ttf',
  soraExtraBold: 'https://fonts.gstatic.com/s/sora/v17/xMQOuFFYT72X5wkB_18qmnndmSdWmX-K.ttf',
  outfitReg:     'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf',
  outfitMed:     'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4E.ttf',
  outfitSemi:    'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf',
};

/* ── Helpers ─────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
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
  for (const [key, url] of Object.entries(FONT_URLS)) {
    process.stdout.write(`  ↓ ${path.basename(FONTS[key])}... `);
    await dl(url, FONTS[key]);
    console.log('ok');
  }
}

/* ── Conteúdo das 10 dicas ───────────────────────────────── */
const TIPS = [
  {
    num: '01',
    title: 'Foto e nome do perfil',
    body: 'A primeira impressão acontece antes de você responder. Use uma foto real — do rosto, do estabelecimento ou do produto. Evite logos cortadas ou imagens desfocadas.\n\nNo nome do perfil, coloque o nome real do negócio — não apelido, número de telefone ou "PROMOÇÃO". O cliente pesquisa você antes de mandar mensagem.',
    como: 'No WhatsApp Business → Mais opções (⋮) → Configurações → Perfil da empresa. Atualize foto e nome.',
  },
  {
    num: '02',
    title: 'Mensagem de saudação automática',
    body: 'É enviada automaticamente quando alguém manda a primeira mensagem ou abre conversa após 14 dias de inatividade. Ela serve para confirmar o recebimento e definir uma expectativa.\n\nExemplo real:\n"Olá! Aqui é [Nome/Negócio]. Recebi sua mensagem e retorno em breve. Se quiser, já me conte o que você precisa 😊"',
    como: 'Configurações → Ferramentas comerciais → Mensagem de saudação → Ative e edite o texto.',
  },
  {
    num: '03',
    title: 'Mensagem de ausência',
    body: 'Configura o que o cliente recebe fora do horário de atendimento. Sem ela, o silêncio parece descaso. Com ela, o cliente entende e fica tranquilo.\n\nExemplo real:\n"Olá! Estamos fora do horário agora. Atendemos de seg a sex, das 9h às 18h. Deixe sua mensagem — respondemos no próximo dia útil."',
    como: 'Ferramentas comerciais → Mensagem de ausência → Ative, defina o horário e edite o texto.',
  },
  {
    num: '04',
    title: 'Catálogo de produtos e serviços',
    body: 'O catálogo do WhatsApp Business permite listar seus serviços com foto, descrição, preço e link. O cliente consegue ver o que você faz antes mesmo de perguntar.\n\nIsso reduz o trabalho de explicar o mesmo serviço repetidamente e transmite muito mais profissionalismo.',
    como: 'Ferramentas comerciais → Catálogo → Adicionar item. Coloque foto (mesmo que do celular), nome, descrição e preço.',
  },
  {
    num: '05',
    title: 'Etiquetas para organizar conversas',
    body: 'Etiquetas são como pastas coloridas para suas conversas. Crie uma estrutura simples e use todo dia:\n\n🟢 Novo contato  →  primeira mensagem\n🟡 Aguardando    →  esperando o cliente responder\n🔵 Em andamento  →  serviço confirmado\n✅ Concluído     →  entregue e pago',
    como: 'Abra uma conversa → segure o nome → Etiquetar conversa. Crie suas etiquetas em Configurações → Etiquetas.',
  },
  {
    num: '06',
    title: 'Respostas rápidas',
    body: 'Mensagens que você repete todo dia podem virar atalhos de teclado. Economiza tempo e garante consistência no atendimento.\n\nExemplos de atalhos úteis:\n/ola      → mensagem de boas-vindas padrão\n/preco    → lista de preços ou link do catálogo\n/horario  → dias e horários de atendimento\n/pix      → chave Pix e instruções de pagamento',
    como: 'Ferramentas comerciais → Respostas rápidas → Adicionar. Defina o atalho (começando com /) e o texto completo.',
  },
  {
    num: '07',
    title: 'Link wa.me com mensagem pronta',
    body: 'O link wa.me permite que qualquer pessoa inicie uma conversa com você no WhatsApp — com uma mensagem já pré-preenchida. Ideal para site, bio do Instagram e cartão de visita.\n\nFormato:\nhttps://wa.me/55XXXXXXXXXX?text=Olá,%20vim%20pelo%20site...\n\nIsso reduz o esforço do cliente e aumenta as chances de contato.',
    como: 'Crie o link em api.whatsapp.com/send ou use um gerador online. Substitua o número e o texto conforme seu negócio.',
  },
  {
    num: '08',
    title: 'Status como vitrine',
    body: 'O status do WhatsApp é visto por todos os seus contatos — sem você precisar mandar mensagem. É uma vitrine gratuita que muita gente ignora.\n\nUse para:\n• Mostrar fotos de trabalhos recentes\n• Anunciar novidade ou promoção real\n• Lembrar seus horários de atendimento\n• Postar um depoimento de cliente (com permissão)',
    como: 'Aba Status → botão + → escolha foto, vídeo ou texto. Status some em 24h automaticamente.',
  },
  {
    num: '09',
    title: 'Tempo de resposta e horário claro',
    body: 'Clientes não esperam resposta instantânea — mas precisam saber quando esperar. Defina e comunique seu horário de atendimento em todos os lugares (perfil, bio, mensagem de ausência).\n\nResponder dentro de 1 hora no horário comercial já coloca você à frente de boa parte da concorrência. Consistência gera confiança.',
    como: 'Configure o horário de funcionamento em: Ferramentas comerciais → Horário de funcionamento. Ative e defina os dias e turnos.',
  },
  {
    num: '10',
    title: 'Pedir avaliação e indicação sem ser chato',
    body: 'O melhor momento para pedir uma indicação é logo depois de uma entrega bem-feita — quando o cliente está satisfeito.\n\nUm exemplo simples que funciona:\n"[Nome], ficou do seu agrado? Se você conhecer alguém que precise de [serviço], fico feliz com a indicação. Muito obrigado! 🙏"\n\nCurto, humano, sem pressão. Clientes que indicam não precisam de desconto — precisam de uma deixa.',
    como: 'Crie uma resposta rápida com o atalho /obrigado para enviar esse texto após cada conclusão de serviço.',
  },
];

/* ── Geração do PDF ──────────────────────────────────────── */
function generate() {
  const OUT = path.join(__dirname, 'bombe-seu-whatsapp.pdf');
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title:   'Bombe seu WhatsApp — 10 ajustes que transformam conversas em clientes',
      Author:  'Site no Ar Express',
      Subject: 'Guia prático de WhatsApp Business para pequenos negócios',
    },
  });

  doc.pipe(fs.createWriteStream(OUT));

  const W = doc.page.width;   // 595.28
  const H = doc.page.height;  // 841.89
  const PAD = 48;

  /* ── Fundo de página ──────────────────────────────── */
  function bg(color = C.bg) {
    doc.rect(0, 0, W, H).fill(color);
  }

  /* ── Linha decorativa acento ──────────────────────── */
  function accentLine(y = 0, alpha = 0.7) {
    const [r,g,b] = hexToRgb(C.accent);
    doc.moveTo(PAD, y).lineTo(W - PAD, y)
      .strokeColor([r,g,b], alpha).lineWidth(1).stroke();
  }

  /* ── Card (retângulo arredondado) ─────────────────── */
  function card(x, y, w, h, color = C.card, radius = 12) {
    doc.roundedRect(x, y, w, h, radius).fill(color);
  }

  /* ── Texto helper ─────────────────────────────────── */
  function txt(text, x, y, opts = {}) {
    const {
      font    = FONTS.outfitReg,
      size    = 11,
      color   = C.ink,
      width   = W - PAD * 2,
      align   = 'left',
      lineGap = 2,
    } = opts;
    doc.font(font).fontSize(size).fillColor(color)
       .text(text, x, y, { width, align, lineGap });
  }

  /* ═══════════════════════════════════════════════════
     PÁGINA 1 — CAPA
  ════════════════════════════════════════════════════ */
  bg();

  // Glow superior
  doc.circle(W / 2, 0, 320)
    .fill([...hexToRgb(C.accent), 0.07]);

  // Linha topo acento
  doc.rect(0, 0, W, 3).fill(C.accent);

  // Linha inferior acento
  doc.rect(0, H - 3, W, 3).fill(C.accent);

  // Grid de pontos decorativo
  doc.fillColor(C.accent).fillOpacity(0.06);
  for (let cx = PAD; cx < W - PAD; cx += 24) {
    for (let cy = 120; cy < H - 120; cy += 24) {
      doc.circle(cx, cy, 1).fill();
    }
  }
  doc.fillOpacity(1);

  // Emoji WhatsApp grande (círculo verde decorativo)
  doc.circle(W / 2, 230, 64).fill(C.card);
  doc.circle(W / 2, 230, 62)
    .strokeColor(C.accent).lineWidth(1.5).stroke();
  // Texto WA
  doc.font(FONTS.soraBold).fontSize(52)
    .fillColor(C.accent)
    .text('💬', W/2 - 30, 204, { width: 60, align: 'center', lineBreak: false });

  // Eyebrow
  doc.font(FONTS.outfitSemi).fontSize(10)
    .fillColor(C.accent)
    .text('GUIA PRÁTICO · BÔNUS EXCLUSIVO', 0, 316, { width: W, align: 'center' });

  // Título
  doc.font(FONTS.soraBold).fontSize(30)
    .fillColor(C.ink)
    .text('Bombe seu', 0, 340, { width: W, align: 'center' });
  doc.font(FONTS.soraBold).fontSize(30)
    .fillColor(C.accent)
    .text('WhatsApp', 0, 375, { width: W, align: 'center' });

  // Subtítulo
  doc.font(FONTS.outfitMed).fontSize(14)
    .fillColor(C.muted)
    .text('10 ajustes que transformam\nconversas em clientes', 0, 422, { width: W, align: 'center', lineGap: 4 });

  // Linha divisória
  accentLine(490, 0.3);

  // Marca
  doc.font(FONTS.soraBold).fontSize(13)
    .fillColor(C.ink)
    .text('Site no Ar Express', 0, 504, { width: W, align: 'center' });
  doc.font(FONTS.outfitReg).fontSize(10)
    .fillColor(C.muted2)
    .text('siteno.ar · criação de sites para pequenos negócios', 0, 522, { width: W, align: 'center' });

  // Número de dicas + nota inferior
  doc.font(FONTS.outfitReg).fontSize(9)
    .fillColor(C.muted2)
    .text('Este guia é um material gratuito. Compartilhe com quem pode se beneficiar.', 0, H - 52, { width: W, align: 'center' });

  /* ═══════════════════════════════════════════════════
     PÁGINAS 2–6 — DICAS (2 por página)
  ════════════════════════════════════════════════════ */

  function tipPage(tipA, tipB) {
    doc.addPage();
    bg();

    // Linha topo
    doc.rect(0, 0, W, 2).fill(C.accent);

    const CARD_H = 340;
    const CARD_Y1 = 36;
    const CARD_Y2 = CARD_Y1 + CARD_H + 16;
    const CX = PAD;
    const CW = W - PAD * 2;

    [tipA, tipB].forEach((tip, idx) => {
      if (!tip) return;
      const cy = idx === 0 ? CARD_Y1 : CARD_Y2;

      // Card background
      card(CX, cy, CW, CARD_H, C.card, 14);

      // Número decorativo (fundo)
      doc.font(FONTS.soraBold).fontSize(80)
        .fillColor([...hexToRgb(C.accent), 0.06])
        .text(tip.num, CX + CW - 88, cy + 8, { width: 80, align: 'right', lineBreak: false });

      // Número badge
      doc.roundedRect(CX + 16, cy + 16, 36, 22, 11).fill(C.accent);
      doc.font(FONTS.soraBold).fontSize(11)
        .fillColor(C.bg)
        .text(tip.num, CX + 16, cy + 20, { width: 36, align: 'center', lineBreak: false });

      // Título
      doc.font(FONTS.soraBold).fontSize(16)
        .fillColor(C.ink)
        .text(tip.title, CX + 60, cy + 17, { width: CW - 80, lineBreak: false });

      // Linha divisória
      doc.moveTo(CX + 16, cy + 50).lineTo(CX + CW - 16, cy + 50)
        .strokeColor(C.line).lineWidth(1).stroke();

      // Corpo
      doc.font(FONTS.outfitReg).fontSize(10.5)
        .fillColor(C.muted)
        .text(tip.body, CX + 16, cy + 60, { width: CW - 32, lineGap: 3 });

      // Bloco "Como fazer"
      const comoY = cy + CARD_H - 86;
      doc.roundedRect(CX + 16, comoY, CW - 32, 70, 8).fill(C.cardHi);

      doc.font(FONTS.outfitSemi).fontSize(9)
        .fillColor(C.accent)
        .text('▸  COMO FAZER', CX + 26, comoY + 10, { width: CW - 52 });

      doc.font(FONTS.outfitReg).fontSize(9.5)
        .fillColor(C.muted)
        .text(tip.como, CX + 26, comoY + 24, { width: CW - 52, lineGap: 2 });
    });

    // Rodapé
    doc.font(FONTS.outfitReg).fontSize(8)
      .fillColor(C.muted2)
      .text('Site no Ar Express · Guia Bombe seu WhatsApp', CX, H - 28, { width: CW });
    doc.font(FONTS.outfitReg).fontSize(8)
      .fillColor(C.muted2)
      .text(`${(tipA?.num ?? '').replace(/^0/, '')} – ${(tipB?.num ?? '').replace(/^0/, '')} de 10`, CX, H - 28, { width: CW, align: 'right' });
  }

  // Distribui 10 dicas em 5 páginas, 2 por página
  for (let i = 0; i < TIPS.length; i += 2) {
    tipPage(TIPS[i], TIPS[i + 1]);
  }

  /* ═══════════════════════════════════════════════════
     PÁGINA 7 — FECHAMENTO / CTA
  ════════════════════════════════════════════════════ */
  doc.addPage();
  bg();

  // Glow central
  doc.circle(W / 2, H / 2, 260)
    .fill([...hexToRgb(C.accent), 0.05]);

  doc.rect(0, 0, W, 2).fill(C.accent);
  doc.rect(0, H - 2, W, 2).fill(C.accent);

  // Emoji checkmark
  doc.font(FONTS.soraBold).fontSize(52)
    .fillColor(C.accent)
    .text('✓', 0, 140, { width: W, align: 'center' });

  // Título
  doc.font(FONTS.soraBold).fontSize(26)
    .fillColor(C.ink)
    .text('Você já tem o caminho.', 0, 210, { width: W, align: 'center' });

  // Subtítulo
  doc.font(FONTS.outfitMed).fontSize(13)
    .fillColor(C.muted)
    .text('Comece pelos 3 ajustes mais rápidos:\nfoto do perfil, mensagem de saudação e link wa.me.', 0, 252, { width: W, align: 'center', lineGap: 4 });

  // Card CTA
  const ctaY = 330;
  card(PAD, ctaY, W - PAD * 2, 240, C.card, 16);

  // Linha superior do card
  doc.rect(PAD, ctaY, W - PAD * 2, 2).fill(C.accent);

  doc.font(FONTS.outfitSemi).fontSize(10)
    .fillColor(C.accent)
    .text('QUER QUE EU CONSTRUA O SITE DO SEU NEGÓCIO?', 0, ctaY + 24, { width: W, align: 'center' });

  doc.font(FONTS.soraBold).fontSize(18)
    .fillColor(C.ink)
    .text('Seu site profissional no ar em até 3 dias.', 0, ctaY + 48, { width: W, align: 'center' });

  doc.font(FONTS.outfitReg).fontSize(11)
    .fillColor(C.muted)
    .text('Domínio incluso · Botão de WhatsApp · SEO inicial\nPagamento único, sem mensalidade.', 0, ctaY + 78, { width: W, align: 'center', lineGap: 3 });

  // Linha divisória
  accentLine(ctaY + 126, 0.2);

  // WhatsApp / contato — preencha com seu número
  doc.font(FONTS.outfitSemi).fontSize(11)
    .fillColor(C.muted2)
    .text('Fale comigo no WhatsApp:', 0, ctaY + 142, { width: W, align: 'center' });

  doc.font(FONTS.soraBold).fontSize(16)
    .fillColor(C.accent)
    .text('(XX) XXXXX-XXXX', 0, ctaY + 162, { width: W, align: 'center' });

  doc.font(FONTS.outfitReg).fontSize(10)
    .fillColor(C.muted2)
    .text('wa.me/55XXXXXXXXXXX', 0, ctaY + 186, { width: W, align: 'center' });

  // Nota rodapé
  doc.font(FONTS.outfitReg).fontSize(8.5)
    .fillColor(C.muted2)
    .text('Site no Ar Express · siteno.ar', 0, H - 44, { width: W, align: 'center' });
  doc.font(FONTS.outfitReg).fontSize(8)
    .fillColor(C.muted2)
    .text('Substitua o número de telefone acima com o seu antes de enviar ao cliente.', 0, H - 30, { width: W, align: 'center' });

  doc.end();
  return OUT;
}

/* ── Main ────────────────────────────────────────────────── */
(async () => {
  console.log('\n📄 Gerando PDF "Bombe seu WhatsApp"...\n');
  console.log('Baixando fontes:');
  await downloadFonts();
  console.log('\nCriando PDF...');
  const out = generate();
  console.log(`\n✅ PDF gerado: ${out}\n`);
})();

/**
 * Generates all favicon/PWA icon assets for Site no Ar Express.
 * Run with: node scripts/generate-icons.js
 *
 * Uses sharp from PROJETO 2 (same machine, same Node version).
 * The design is exclusive to Site no Ar Express — NOT from RecebeZap.
 * Design: dark (#0a0e0d) background + "S" in green (#2dd48d), matching src/app/icon.tsx
 */
const sharp = require('C:/Users/Paulo/Desktop/PROJETO 2/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const ROOT   = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

// Matching src/app/icon.tsx: borderRadius 7 @ 32px = 21.875%, green "#2dd48d", dark "#0a0e0d", letter "S"
function svgIcon(size) {
  const rx       = ((7 / 32) * size).toFixed(1);
  const fontSize = Math.round(size * 0.625); // 20/32 ratio from icon.tsx
  const cy       = (size / 2 + size * 0.025).toFixed(1); // slight optical center
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#0a0e0d"/>
  <text
    x="${(size / 2).toFixed(1)}"
    y="${cy}"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    font-size="${fontSize}"
    fill="#2dd48d"
    letter-spacing="-0.5"
  >S</text>
</svg>`,
  );
}

function buildIco(pngBuffers, sizes) {
  const count   = pngBuffers.length;
  const dirSize = 6 + 16 * count;
  const offsets = [];
  let pos = dirSize;
  for (const buf of pngBuffers) { offsets.push(pos); pos += buf.length; }

  const ico = Buffer.alloc(pos);
  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(count, 4);

  for (let i = 0; i < count; i++) {
    const b = 6 + i * 16;
    const s = sizes[i];
    ico.writeUInt8(s >= 256 ? 0 : s, b);
    ico.writeUInt8(s >= 256 ? 0 : s, b + 1);
    ico.writeUInt8(0, b + 2);
    ico.writeUInt8(0, b + 3);
    ico.writeUInt16LE(1, b + 4);
    ico.writeUInt16LE(32, b + 6);
    ico.writeUInt32LE(pngBuffers[i].length, b + 8);
    ico.writeUInt32LE(offsets[i], b + 12);
  }
  for (let i = 0; i < count; i++) pngBuffers[i].copy(ico, offsets[i]);
  return ico;
}

async function main() {
  console.log('Generating Site no Ar Express icons...\n');

  if (!fs.existsSync(PUBLIC)) fs.mkdirSync(PUBLIC, { recursive: true });

  const pngTasks = [
    { size: 48,  file: path.join(PUBLIC, 'favicon-48x48.png') },
    { size: 96,  file: path.join(PUBLIC, 'favicon-96x96.png') },
    { size: 180, file: path.join(PUBLIC, 'apple-touch-icon.png') },
    { size: 192, file: path.join(PUBLIC, 'icon-192.png') },
    { size: 512, file: path.join(PUBLIC, 'icon-512.png') },
  ];

  for (const { size, file } of pngTasks) {
    await sharp(svgIcon(size)).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
    console.log(`  ✓ public/${path.basename(file)} (${size}x${size})`);
  }

  // favicon.ico — multi-size 16, 32, 48
  const icoSizes   = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) => sharp(svgIcon(s)).resize(s, s).png().toBuffer()),
  );
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), buildIco(icoBuffers, icoSizes));
  console.log('  ✓ public/favicon.ico (16+32+48 multi-size)');

  console.log('\nAll icons generated successfully.');
}

main().catch((e) => { console.error(e); process.exit(1); });

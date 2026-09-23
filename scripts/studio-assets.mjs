// Gera os novos assets com SVG + sharp, sem navegador ou fontes de rede.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const read = async (p) => JSON.parse(await readFile(new URL(p, import.meta.url), 'utf8'));
const vesperveil = await read('../src/data/vesperveil.palette.json');
const studio = { paper: vesperveil.deep, surface: vesperveil.surface, ink: vesperveil.foreground, muted: vesperveil.muted, accent: vesperveil.accent, line: vesperveil.border };
const { color } = await read('../src/data/cinder.foundation.json');
const owl = (ink, size = 80, stroke = 2) => {
  const drawing = `<path d="M10 12 27 21Q40 16 53 21L70 12V40Q70 62 40 74 10 62 10 40Z"/><circle cx="28" cy="39" r="12"/><circle cx="52" cy="39" r="12"/><path d="m36 54 4 5 4-5"/>`;
  const pupils = `<circle cx="28" cy="39" r="3.2"/><circle cx="52" cy="39" r="3.2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 80 80"><g fill="none" stroke="${vesperveil.info}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" transform="translate(-1.4 0)" opacity=".5">${drawing}<g fill="${vesperveil.info}" stroke="none">${pupils}</g></g><g fill="none" stroke="${studio.accent}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.4 0)" opacity=".5">${drawing}<g fill="${studio.accent}" stroke="none">${pupils}</g></g><g fill="none" stroke="${ink}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${drawing}<g fill="${ink}" stroke="none">${pupils}</g></g></svg>`;
};
const mark = (ink, size, stroke) => {
  const svg = owl(ink, size, stroke);
  return svg.slice(svg.indexOf('<g'), svg.lastIndexOf('</svg>'));
};
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 96 96"><rect width="96" height="96" rx="20" fill="${studio.paper}"/><g transform="translate(8 8)">${mark(studio.ink, 80, 2)}</g></svg>`;
await writeFile(new URL('../public/icon.svg', import.meta.url), icon);
await sharp(Buffer.from(icon)).png().toFile(fileURLToPath(new URL('../public/icon.png', import.meta.url)));
// O favicon usa a mesma marca; os deslocamentos cromáticos sobrevivem ao tamanho reduzido.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 80 80"><rect width="80" height="80" rx="18" fill="${studio.paper}"/>${mark(studio.ink, 80, 3)}</svg>`;
await writeFile(new URL('../public/owl.svg', import.meta.url), favicon);
const faviconBuffers = [];
for (const size of [16, 32, 48, 180]) {
  const png = await sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer();
  if (size !== 180) faviconBuffers.push({ size, png });
  if (size === 32 || size === 180) await writeFile(new URL(`../public/owl-${size}.png`, import.meta.url), png);
}
// ICO com múltiplas resoluções para clientes que procuram /favicon.ico.
const header = Buffer.alloc(6 + 16 * faviconBuffers.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(faviconBuffers.length, 4);
let offset = header.length;
faviconBuffers.forEach(({ size, png }, index) => {
  const entry = 6 + index * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, ...faviconBuffers.map(({ png }) => png)]));
for (const card of [
  { name: 'muowl', file: 'default', bg: studio.paper, ink: studio.ink, accent: studio.accent, muted: studio.muted, label: 'FELIPE LAZZARINI / INDEPENDENT WORK', tagline: 'Code with intention. Colour with soul.', strip: [studio.ink, studio.accent, studio.muted, studio.line] },
  { name: 'Cinder', file: 'cinder', bg: color.ash['975'].$value, ink: color.ash['100'].$value, accent: color.ember['300'].$value, muted: color.ash['300'].$value, label: 'MUOWL / VS CODE THEME', tagline: 'Charcoal, embers and room to think.', strip: [color.ember['300'].$value, color.gold['300'].$value, color.verdigris['300'].$value, color.slate['300'].$value, color.heather['300'].$value] },
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${card.bg}"/><path d="M72 112H1128M72 534H1128" stroke="${card.muted}" stroke-opacity=".35"/><text x="72" y="80" font-family="Arial" font-size="17" letter-spacing="3" fill="${card.muted}">${card.label}</text><text x="66" y="320" font-family="Georgia" font-size="170" fill="${card.ink}">${card.name}<tspan fill="${card.accent}">.</tspan></text><text x="76" y="396" font-family="Georgia" font-style="italic" font-size="35" fill="${card.accent}">${card.tagline}</text><g transform="translate(920 190) scale(2)">${owl(card.accent)}</g>${card.strip.map((c, i) => `<rect x="${76 + i * 56}" y="463" width="44" height="10" fill="${c}"/>`).join('')}<text x="1128" y="583" text-anchor="end" font-family="Arial" font-size="20" fill="${card.muted}">muowl.dev</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`../public/og/${card.file}.png`, import.meta.url)));
  console.log(`✓ og/${card.file}.png`);
}

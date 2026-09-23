// Gera os novos assets com SVG + sharp, sem navegador ou fontes de rede.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const read = async (p) => JSON.parse(await readFile(new URL(p, import.meta.url), 'utf8'));
const vesperveil = await read('../src/data/vesperveil.palette.json');
const studio = { paper: vesperveil.deep, surface: vesperveil.surface, ink: vesperveil.foreground, muted: vesperveil.muted, accent: vesperveil.accent, line: vesperveil.border };
const { color } = await read('../src/data/cinder.foundation.json');
const owl = (ink) => `<g fill="none" stroke="${ink}" stroke-width="2"><path d="M12 17 27 24Q40 18 53 24L68 17V43Q68 65 40 73 12 65 12 43Z"/><circle cx="28" cy="39" r="13"/><circle cx="52" cy="39" r="13"/><circle cx="28" cy="39" r="4" fill="${ink}" stroke="none"/><circle cx="52" cy="39" r="4" fill="${ink}" stroke="none"/><path d="m35 52 5 6 5-6M26 60l14 8 14-8"/></g>`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 96 96"><rect width="96" height="96" rx="20" fill="${studio.paper}"/><g transform="translate(8 4)">${owl(studio.ink)}</g></svg>`;
await writeFile(new URL('../public/icon.svg', import.meta.url), icon);
await sharp(Buffer.from(icon)).png().toFile(fileURLToPath(new URL('../public/icon.png', import.meta.url)));
// Desenho óptico para abas: olhos maiores, traço firme e menos detalhes.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${studio.paper}"/><g fill="none" stroke="${studio.ink}" stroke-width="3.5" stroke-linejoin="round"><path d="M10 12 23 18Q32 14 41 18L54 12V34Q54 49 32 56 10 49 10 34Z"/><circle cx="23" cy="30" r="10"/><circle cx="41" cy="30" r="10"/><path d="m28 42 4 5 4-5"/></g><g fill="${studio.ink}"><circle cx="23" cy="30" r="3.5"/><circle cx="41" cy="30" r="3.5"/></g></svg>`;
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

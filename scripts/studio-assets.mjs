// Gera os novos assets com SVG + sharp, sem navegador ou fontes de rede.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const read = async (p) => JSON.parse(await readFile(new URL(p, import.meta.url), 'utf8'));
const studio = await read('../src/data/studio.palette.json');
const { color } = await read('../src/data/cinder.foundation.json');
const owl = (ink) => `<g fill="none" stroke="${ink}" stroke-width="2"><path d="M12 17 27 24Q40 18 53 24L68 17V43Q68 65 40 73 12 65 12 43Z"/><circle cx="28" cy="39" r="13"/><circle cx="52" cy="39" r="13"/><circle cx="28" cy="39" r="4" fill="${ink}" stroke="none"/><circle cx="52" cy="39" r="4" fill="${ink}" stroke="none"/><path d="m35 52 5 6 5-6M26 60l14 8 14-8"/></g>`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 96 96"><rect width="96" height="96" rx="20" fill="${studio.paper}"/><g transform="translate(8 4)">${owl(studio.ink)}</g></svg>`;
await writeFile(new URL('../public/icon.svg', import.meta.url), icon);
await sharp(Buffer.from(icon)).png().toFile(fileURLToPath(new URL('../public/icon.png', import.meta.url)));
for (const card of [
  { name: 'muowl', file: 'default', bg: studio.paper, ink: studio.ink, accent: studio.accent, muted: studio.muted, label: 'FELIPE LAZZARINI / INDEPENDENT WORK', tagline: 'Code with intention. Colour with soul.', strip: [studio.ink, studio.accent, studio.muted, studio.line] },
  { name: 'Cinder', file: 'cinder', bg: color.ash['975'].$value, ink: color.ash['100'].$value, accent: color.ember['300'].$value, muted: color.ash['300'].$value, label: 'MUOWL / VS CODE THEME', tagline: 'Charcoal, embers and room to think.', strip: [color.ember['300'].$value, color.gold['300'].$value, color.verdigris['300'].$value, color.slate['300'].$value, color.heather['300'].$value] },
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${card.bg}"/><path d="M72 112H1128M72 534H1128" stroke="${card.muted}" stroke-opacity=".35"/><text x="72" y="80" font-family="Arial" font-size="17" letter-spacing="3" fill="${card.muted}">${card.label}</text><text x="66" y="320" font-family="Georgia" font-size="170" fill="${card.ink}">${card.name}<tspan fill="${card.accent}">.</tspan></text><text x="76" y="396" font-family="Georgia" font-style="italic" font-size="35" fill="${card.accent}">${card.tagline}</text><g transform="translate(920 190) scale(2)">${owl(card.accent)}</g>${card.strip.map((c, i) => `<rect x="${76 + i * 56}" y="463" width="44" height="10" fill="${c}"/>`).join('')}<text x="1128" y="583" text-anchor="end" font-family="Arial" font-size="20" fill="${card.muted}">muowl.dev</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`../public/og/${card.file}.png`, import.meta.url)));
  console.log(`✓ og/${card.file}.png`);
}

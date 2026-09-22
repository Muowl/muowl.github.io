// Card social derivado da paleta original e do ícone aprovado do tema.
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const palette = JSON.parse(await readFile(new URL('../src/data/vesperveil.palette.json', import.meta.url), 'utf8'));
const icon = (await readFile(new URL('../public/themes/vesperveil/icon.png', import.meta.url))).toString('base64');
const strip = [palette.accent, palette.keyword, palette.function, palette.type, palette.string, palette.number];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${palette.background}"/>
  <path d="M72 112H1128M72 534H1128" stroke="${palette.border}"/>
  <text x="72" y="80" font-family="Arial" font-size="17" letter-spacing="3" fill="${palette.muted}">MUOWL / VS CODE THEME</text>
  <image x="880" y="172" width="260" height="260" href="data:image/png;base64,${icon}"/>
  <text x="66" y="320" font-family="Georgia" font-size="132" fill="${palette.foreground}">Vesperveil<tspan fill="${palette.accent}">.</tspan></text>
  <text x="76" y="396" font-family="Georgia" font-style="italic" font-size="35" fill="${palette.keyword}">Wine, ivory and a veil of carmine.</text>
  ${strip.map((color, index) => `<rect x="${76 + index * 56}" y="463" width="44" height="10" fill="${color}"/>`).join('')}
  <text x="1128" y="583" text-anchor="end" font-family="Arial" font-size="20" fill="${palette.muted}">muowl.dev</text>
</svg>`;
await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('../public/og/vesperveil.png', import.meta.url)));
console.log('✓ og/vesperveil.png');

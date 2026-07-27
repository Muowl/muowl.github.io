/**
 * Gera os cards sociais em public/og/.
 *
 * Mesma regra do resto do repo: nenhum hex digitado aqui — as cores saem das
 * cópias de paleta em src/data/. Renderiza com o Chrome do sistema via
 * playwright-core, como o repo do tema já fazia para o preview.png.
 *
 *   npm run og
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { parse as parseToml } from 'smol-toml';
import { load as parseYaml } from 'js-yaml';

const root = new URL('../', import.meta.url);
const read = (p) => readFile(fileURLToPath(new URL(p, root)), 'utf8');

const carmilla = parseToml(await read('src/data/carmilla.palette.toml'));
const papilio = parseYaml(await read('src/data/papilio.palette.yaml'));

/** Um card por tema — e o `default`, usado pelas páginas sem card próprio. */
const CARDS = [
  {
    file: 'carmilla',
    name: 'Carmilla',
    tagline: 'crypt warmth for nights of code',
    bg: carmilla.colors.crypt,
    surface: carmilla.colors.boudoir,
    text: carmilla.colors.pearl,
    muted: carmilla.colors['ash-mauve'],
    accent: carmilla.colors.carmine,
    strip: [
      carmilla.colors.carmine,
      carmilla.colors.wisteria,
      carmilla.colors.verdigris,
      carmilla.colors.absinthe,
      carmilla.colors.champagne,
      carmilla.colors['peach-velvet'],
    ],
  },
  {
    file: 'papilio',
    name: 'Papilio',
    tagline: 'deep red-brown, crimson and antique gold',
    bg: papilio.palette.bg0,
    surface: papilio.palette.bg1,
    text: papilio.palette.fg0,
    muted: papilio.palette.muted,
    accent: papilio.palette.crimson,
    strip: [
      papilio.palette.crimson,
      papilio.palette.blossom,
      papilio.palette.gold,
      papilio.palette.ember,
      papilio.palette.ghost,
      papilio.palette.plum,
    ],
  },
  {
    file: 'default',
    name: 'muowl',
    tagline: 'tools with an identity, not a preset',
    bg: carmilla.colors.crypt,
    surface: carmilla.colors.boudoir,
    text: carmilla.colors.pearl,
    muted: carmilla.colors['ash-mauve'],
    accent: carmilla.colors.carmine,
    strip: [
      carmilla.colors.carmine,
      carmilla.colors.wisteria,
      carmilla.colors.verdigris,
      carmilla.colors.absinthe,
      carmilla.colors.champagne,
      carmilla.colors['peach-velvet'],
    ],
  },
];

const html = (c) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; background:${c.bg}; color:${c.text};
    font-family:'Inter',system-ui,sans-serif; overflow:hidden; position:relative;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 96px;
  }
  body::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(ellipse 55% 60% at 12% 0%, ${c.accent}22, transparent 62%),
      radial-gradient(ellipse 45% 45% at 90% 100%, ${c.surface}cc, transparent 60%);
  }
  .eyebrow {
    font-size:19px; letter-spacing:.42em; text-transform:uppercase;
    color:${c.muted}; margin-bottom:26px;
  }
  h1 {
    font-family:'Cormorant Garamond',Georgia,serif; font-weight:500;
    font-size:150px; line-height:.92; letter-spacing:-.02em;
    background:linear-gradient(180deg, ${c.text} 0%, ${c.accent} 78%);
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .tagline {
    font-family:'Cormorant Garamond',Georgia,serif; font-style:italic;
    font-size:38px; color:${c.muted}; margin-top:14px;
  }
  .strip { display:flex; gap:12px; margin-top:52px; }
  .strip span { width:76px; height:14px; border-radius:99px; }
  .domain {
    position:absolute; right:96px; bottom:56px;
    font-size:22px; letter-spacing:.06em; color:${c.muted};
  }
  .domain b { color:${c.accent}; font-weight:500; }
</style></head>
<body>
  <div class="eyebrow">${c.file === 'default' ? 'themes · projects · open source' : 'vs code theme'}</div>
  <h1>${c.name}</h1>
  <div class="tagline">${c.tagline}</div>
  <div class="strip">${c.strip.map((h) => `<span style="background:${h}"></span>`).join('')}</div>
  <div class="domain">muowl<b>.dev</b></div>
</body></html>`;

const outDir = fileURLToPath(new URL('public/og/', root));
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const card of CARDS) {
  await page.setContent(html(card), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await writeFile(new URL(`public/og/${card.file}.png`, root), buf);
  console.log(`✓ og/${card.file}.png`);
}

await browser.close();

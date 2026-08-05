/**
 * Sincroniza as paletas a partir dos repos dos temas.
 *
 * O site não guarda cores próprias: cada arquivo em src/data/ é uma cópia
 * byte-a-byte da fonte da verdade no repo do tema. As cópias são commitadas de
 * propósito — assim o build é determinístico e offline, e qualquer mudança de cor
 * aparece como diff no git em vez de escorregar em silêncio.
 *
 *   npm run sync:palette            → busca todas e reescreve as cópias
 *   npm run sync:palette -- --check → só verifica se estão em dia (exit 1 se não)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** Uma entrada por tema. O formato do arquivo é escolha de cada repo. */
const SOURCES = [
  {
    theme: 'carmilla',
    url: 'https://raw.githubusercontent.com/Muowl/carmilla/main/palette/carmilla.toml',
    target: '../src/data/carmilla.palette.toml',
  },
  {
    theme: 'papilio',
    url: 'https://raw.githubusercontent.com/Muowl/papilio-theme/main/palette/papilio.yaml',
    target: '../src/data/papilio.palette.yaml',
  },
  // Overlay da variante: só os tokens que mudam. O loader mescla com a base.
  {
    theme: 'papilio-blood-blossom',
    url: 'https://raw.githubusercontent.com/Muowl/papilio-theme/main/palette/papilio-blood-blossom.yaml',
    target: '../src/data/papilio-blood-blossom.palette.yaml',
  },
];

const checkOnly = process.argv.includes('--check');
let stale = 0;
let failed = 0;

for (const { theme, url, target } of SOURCES) {
  const path = fileURLToPath(new URL(target, import.meta.url));

  let upstream;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    upstream = await res.text();
  } catch (err) {
    console.error(`✗ ${theme}: não consegui ler a paleta — ${err.message}`);
    failed++;
    continue;
  }

  let current = '';
  try {
    current = await readFile(path, 'utf8');
  } catch {
    // primeira execução — segue e escreve
  }

  if (current === upstream) {
    console.log(`✓ ${theme}: em dia`);
    continue;
  }

  if (checkOnly) {
    console.error(`✗ ${theme}: desatualizada — rode \`npm run sync:palette\``);
    stale++;
    continue;
  }

  await writeFile(path, upstream, 'utf8');
  console.log(`✓ ${theme}: atualizada — confira o diff antes de commitar`);
}

if (failed) process.exit(1);
if (stale) process.exit(1);

/**
 * Sincroniza a paleta a partir do repo do tema.
 *
 * O site não guarda hexes próprios: `src/data/carmilla.palette.toml` é uma cópia
 * byte-a-byte de `palette/carmilla.toml` em Muowl/carmilla. A cópia é commitada de
 * propósito — assim o build é determinístico e offline, e qualquer mudança de cor
 * aparece como diff no git em vez de escorregar em silêncio.
 *
 *   npm run sync:palette          → busca de main e reescreve a cópia
 *   npm run sync:palette -- --check → só verifica se está em dia (exit 1 se não)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SOURCE =
  'https://raw.githubusercontent.com/Muowl/carmilla/main/palette/carmilla.toml';
const TARGET = fileURLToPath(new URL('../src/data/carmilla.palette.toml', import.meta.url));

const checkOnly = process.argv.includes('--check');

const res = await fetch(SOURCE);
if (!res.ok) {
  console.error(`✗ não consegui ler a paleta (${res.status} ${res.statusText})\n  ${SOURCE}`);
  process.exit(1);
}
const upstream = await res.text();

let current = '';
try {
  current = await readFile(TARGET, 'utf8');
} catch {
  // primeira execução — segue e escreve
}

if (current === upstream) {
  console.log('✓ paleta em dia com Muowl/carmilla@main');
  process.exit(0);
}

if (checkOnly) {
  console.error('✗ paleta desatualizada — rode `npm run sync:palette`');
  process.exit(1);
}

await writeFile(TARGET, upstream, 'utf8');
console.log('✓ paleta atualizada — confira o diff antes de commitar');

/**
 * Leitura da paleta Papilio a partir do YAML machine-readable.
 *
 * `src/data/papilio.palette.yaml` é uma cópia byte-a-byte de
 * `palette/papilio.yaml` no repo Muowl/papilio-theme, atualizada por
 * `npm run sync:palette`. A variante Blood Blossom é um OVERLAY
 * (`papilio-blood-blossom.palette.yaml`) — só os tokens que mudam —,
 * mesclado aqui do mesmo jeito que `loadPaletteVariant` no tema.
 *
 * Mesmo contrato do Carmilla: nenhum hex digitado aqui.
 *
 * O YAML do Papilio é mais rico que o TOML do Carmilla — traz `anchors` (as
 * cores brutas da personagem, matéria-prima não consumida pelos geradores) e
 * `roles` (o mapeamento semântico papel → token). O showcase aproveita os dois.
 */
import { load } from 'js-yaml';
import rawBase from '../data/papilio.palette.yaml?raw';
import rawBloodBlossom from '../data/papilio-blood-blossom.palette.yaml?raw';
import { contrastRatio, formatRatio, wcagLevel, type WcagLevel } from './contrast';
import { rgbTriplet } from './palette';

interface PapilioMeta {
  name: string;
  slug: string;
  variant: string;
  author: string;
  description: string;
}

interface PapilioFile {
  meta: PapilioMeta;
  anchors: Record<string, string>;
  palette: Record<string, string>;
  roles: {
    syntax: Record<string, string>;
    ui: Record<string, string>;
    terminal: Record<string, string>;
    'terminal-bright'?: Record<string, string>;
  };
}

/** Overlay: meta própria + só os tokens de palette que mudam. */
interface PapilioOverlay {
  meta: PapilioMeta;
  palette?: Record<string, string>;
  roles?: Partial<PapilioFile['roles']>;
}

export type PapilioFlavorId = 'base' | 'blood-blossom';

const base = load(rawBase) as PapilioFile;
const overlay = load(rawBloodBlossom) as PapilioOverlay;

/** Mescla overlay com a base — espelho de `loadPaletteVariant` no tema. */
function resolve(id: PapilioFlavorId): PapilioFile {
  if (id === 'base') return base;
  return {
    meta: overlay.meta,
    anchors: base.anchors,
    palette: { ...base.palette, ...(overlay.palette ?? {}) },
    roles: overlay.roles
      ? {
          syntax: { ...base.roles.syntax, ...(overlay.roles.syntax ?? {}) },
          ui: { ...base.roles.ui, ...(overlay.roles.ui ?? {}) },
          terminal: { ...base.roles.terminal, ...(overlay.roles.terminal ?? {}) },
          'terminal-bright':
            overlay.roles['terminal-bright'] ?? base.roles['terminal-bright'],
        }
      : base.roles,
  };
}

const FLAVOR_IDS: PapilioFlavorId[] = ['base', 'blood-blossom'];
const resolved: Record<PapilioFlavorId, PapilioFile> = {
  base: resolve('base'),
  'blood-blossom': resolve('blood-blossom'),
};

/** Atalhos da base — a maior parte do showcase e o card da listagem usam esta. */
export const meta = base.meta;
export const palette = base.palette;
export const anchors = base.anchors;
export const roles = base.roles;

/** O fundo do editor da base — referência de contraste default. */
export const BG = base.palette.bg0;

export function paletteOf(id: PapilioFlavorId = 'base'): Record<string, string> {
  return resolved[id].palette;
}

export function bgOf(id: PapilioFlavorId = 'base'): string {
  return resolved[id].palette.bg0;
}

export interface SwatchView {
  key: string;
  hex: string;
  label: { pt: string; en: string };
  /** Contraste sobre bg0; ausente nos próprios fundos, onde não faz sentido. */
  ratio?: string;
  level?: WcagLevel;
}

/**
 * Descrições dos tokens. Vivem aqui, e não no YAML, porque são texto editorial
 * bilíngue — os comentários do YAML não sobrevivem ao parser.
 */
const TOKEN_LABELS: Record<string, { pt: string; en: string }> = {
  bg0: { pt: 'fundo do editor', en: 'editor background' },
  bg1: { pt: 'sidebar, painéis', en: 'sidebar, panels' },
  bg2: { pt: 'hover, item ativo', en: 'hover, active item' },
  bg3: { pt: 'bordas, separadores', en: 'borders, separators' },
  selection: { pt: 'seleção de texto', en: 'text selection' },
  fg0: { pt: 'texto principal', en: 'primary text' },
  fg1: { pt: 'texto secundário, operadores', en: 'secondary text, operators' },
  muted: { pt: 'comentários, desabilitado', en: 'comments, disabled' },
  crimson: {
    pt: 'a cor-assinatura — olhos e pontas do cabelo',
    en: 'the signature colour — eyes and hair tips',
  },
  blossom: { pt: 'rosa das flores de ameixeira', en: 'plum-blossom pink' },
  gold: { pt: 'dourado dos adornos', en: 'gold of the ornaments' },
  ghost: { pt: 'azul-fantasma do Boo Tao', en: "Boo Tao's ghost blue" },
  ember: { pt: 'laranja-brasa (pyro)', en: 'ember orange (pyro)' },
  plum: { pt: 'violeta do laço do chapéu', en: 'violet of the hat ribbon' },
  dusk: { pt: 'índigo do céu noturno', en: 'indigo of the night sky' },
  error: { pt: 'diagnósticos de erro', en: 'error diagnostics' },
  warning: { pt: 'avisos', en: 'warnings' },
  info: { pt: 'informação', en: 'information' },
  success: {
    pt: 'jade discreto — diffs precisam de verde',
    en: 'a discreet jade — diffs need green',
  },
  cursor: { pt: 'cursor, acompanha crimson', en: 'cursor, follows crimson' },
};

/** Tokens de fundo: contraste sobre bg0 não diz nada útil sobre eles. */
const SURFACES = new Set(['bg0', 'bg1', 'bg2', 'bg3', 'selection']);

export function swatches(id: PapilioFlavorId = 'base'): SwatchView[] {
  const p = resolved[id].palette;
  const bg = p.bg0;
  return Object.entries(p).map(([key, hex]) => {
    const baseView: SwatchView = {
      key,
      hex: hex.toUpperCase(),
      label: TOKEN_LABELS[key] ?? { pt: key, en: key },
    };
    if (SURFACES.has(key)) return baseView;
    const r = contrastRatio(hex, bg);
    return { ...baseView, ratio: formatRatio(r), level: wcagLevel(r) };
  });
}

export interface AnchorPair {
  anchor: { key: string; hex: string; ratio: string; level: WcagLevel };
  token: { key: string; hex: string; ratio: string; level: WcagLevel };
  note: { pt: string; en: string };
}

/**
 * Curadoria: qual âncora deu origem a qual token. É julgamento editorial — o
 * YAML declara as duas listas mas não as liga —, então o par mora aqui. Os
 * hexes e as razões de contraste continuam vindo do arquivo e do cálculo.
 */
const ANCHOR_TO_TOKEN: [string, string, { pt: string; en: string }][] = [
  [
    'eyes',
    'crimson',
    {
      pt: 'o vermelho dos olhos, clareado até passar em texto normal',
      en: 'the red of her eyes, lifted until it passes for body text',
    },
  ],
  [
    'blossom',
    'blossom',
    {
      pt: 'o vermelho vivo da flor é lindo e ilegível; virou rosa',
      en: 'the flower’s vivid red is beautiful and unreadable; it became pink',
    },
  ],
  [
    'gold-trim',
    'gold',
    { pt: 'o bronze do chapéu, puxado ao dourado', en: 'the hat’s bronze, pulled toward gold' },
  ],
  [
    'ribbon',
    'plum',
    {
      pt: 'o laço violeta é quase preto na arte; aqui ele acende',
      en: 'the violet ribbon is nearly black in the art; here it lights up',
    },
  ],
  [
    'night-sky',
    'dusk',
    {
      pt: 'o céu noturno atrás dela, elevado a azul de sintaxe',
      en: 'the night sky behind her, raised to a syntax blue',
    },
  ],
];

export function anchorPairs(id: PapilioFlavorId = 'base'): AnchorPair[] {
  const file = resolved[id];
  const bg = file.palette.bg0;
  return ANCHOR_TO_TOKEN.map(([aKey, tKey, note]) => {
    const aHex = file.anchors[aKey];
    const tHex = file.palette[tKey];
    const ar = contrastRatio(aHex, bg);
    const tr = contrastRatio(tHex, bg);
    return {
      anchor: { key: aKey, hex: aHex.toUpperCase(), ratio: formatRatio(ar), level: wcagLevel(ar) },
      token: { key: tKey, hex: tHex.toUpperCase(), ratio: formatRatio(tr), level: wcagLevel(tr) },
      note,
    };
  });
}

export interface RoleView {
  role: string;
  token: string;
  hex: string;
}

/** roles.syntax resolvido em hex — o token map do Papilio é gerado, não escrito. */
export function syntaxRoles(id: PapilioFlavorId = 'base'): RoleView[] {
  const file = resolved[id];
  return Object.entries(file.roles.syntax).map(([role, token]) => ({
    role,
    token,
    hex: (file.palette[token] ?? '#000000').toUpperCase(),
  }));
}

export interface PapilioFlavorView {
  id: PapilioFlavorId;
  name: string;
  accent: string;
  strip: string[];
  mood: { pt: string; en: string };
  /** Fundo do editor — barra do navegador e theme-color. */
  bg: string;
}

const FLAVOR_MOODS: Record<PapilioFlavorId, { pt: string; en: string }> = {
  base: {
    pt: 'quente e contido — construído para sessões longas',
    en: 'warm and restrained — built for long sessions',
  },
  'blood-blossom': {
    pt: 'a mesma escada de luminosidade, com mais sangue',
    en: 'the same lightness ladder, with more blood',
  },
};

export function flavors(): PapilioFlavorView[] {
  return FLAVOR_IDS.map((id) => {
    const p = resolved[id].palette;
    return {
      id,
      name: resolved[id].meta.name,
      accent: p.crimson.toUpperCase(),
      strip: [p.bg0, p.bg1, p.bg2, p.selection, p.crimson, p.gold],
      mood: FLAVOR_MOODS[id],
      bg: p.bg0,
    };
  });
}

/** Clareia um hex puxando cada canal para o branco — só para o estado hover. */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(c + (255 - c) * amount),
  );
  return '#' + ch.map((c) => c.toString(16).padStart(2, '0')).join('');
}

/** Variáveis `--pp-*` de um flavor, sem seletor. */
function ppVars(id: PapilioFlavorId): string {
  return Object.entries(resolved[id].palette)
    .map(([k, v]) => `--pp-${k}: ${v};`)
    .join('\n    ');
}

/**
 * Variáveis do site (vocabulário Carmilla) reescritas com as cores do Papilio.
 * A página inteira usa esses nomes de superfície; cada flavor recebe o
 * equivalente papiliano, então header, cards e rodapé acompanham.
 */
function siteVars(id: PapilioFlavorId): string {
  const p = resolved[id].palette;
  const pairs: [string, string][] = [
    ['crypt', p.bg0],
    ['crypt-rgb', rgbTriplet(p.bg0)],
    ['tabstrip', p.bg1],
    ['boudoir', p.bg1],
    ['velvet', p.bg2],
    ['velvet-rgb', rgbTriplet(p.bg2)],
    ['selection', p.selection],
    ['selection-rgb', rgbTriplet(p.selection)],
    ['pearl', p.fg0],
    ['pearl-rgb', rgbTriplet(p.fg0)],
    ['carmine', p.crimson],
    ['carmine-rgb', rgbTriplet(p.crimson)],
    ['carmine-hover', lighten(p.crimson, 0.22)],
    ['wisteria', p.plum],
    ['wisteria-rgb', rgbTriplet(p.plum)],
    ['verdigris', p.ghost],
    ['absinthe', p.success],
    ['champagne', p.gold],
    ['peach-velvet', p.ember],
    ['pomegranate', p.error],
    ['ash-mauve', p.muted],
    ['ash-mauve-rgb', rgbTriplet(p.muted)],
    ['mauve', p.muted],
  ];
  return pairs.map(([k, v]) => `--${k}: ${v};`).join('\n    ');
}

/**
 * CSS do showcase: `.papilio` com a base e um bloco por flavor alternativo.
 * O switcher só troca `data-flavor` no `<html>`.
 */
export function papilioCss(selector = '.papilio'): string {
  const blocks = [`${selector} {\n    ${ppVars('base')}\n}`];
  for (const id of FLAVOR_IDS) {
    if (id === 'base') continue;
    blocks.push(`:root[data-flavor="${id}"] ${selector} {\n    ${ppVars(id)}\n}`);
  }
  return blocks.join('\n\n');
}

/**
 * CSS que pinta a página do tema com o Papilio. Emite a base em `selector` e
 * cada variante sob `:root[data-flavor=…]`, para o switcher reescrever a
 * página inteira sem nenhuma regra nova.
 */
export function siteVarsCss(selector = ':root'): string {
  const blocks = [`${selector} {\n    ${siteVars('base')}\n}`];
  for (const id of FLAVOR_IDS) {
    if (id === 'base') continue;
    // data-flavor vive no <html>; o seletor precisa ser :root[…] para vencer
    // o bloco base por especificidade, independente do selector passado.
    blocks.push(`:root[data-flavor="${id}"] {\n    ${siteVars(id)}\n}`);
  }
  return blocks.join('\n\n');
}

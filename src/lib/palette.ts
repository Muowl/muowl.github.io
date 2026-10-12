/**
 * Leitura da paleta Carmilla a partir do TOML machine-readable.
 *
 * `src/data/carmilla.palette.toml` é uma cópia byte-a-byte de `palette/carmilla.toml`
 * no repo Muowl/carmilla, atualizada por `npm run sync:palette`. O TOML é a fonte
 * da verdade; nenhum hex é digitado à mão neste site. Trocar uma cor lá e rodar o
 * sync propaga para swatches, token map, flavor cards e variáveis CSS de uma vez.
 */
import { parse } from 'smol-toml';
import rawToml from '../data/carmilla.palette.toml?raw';

export interface FlavorSpec {
  name: string;
  accent: string;
  'accent-hover': string;
  crypt: string;
  boudoir: string;
  velvet: string;
  selection: string;
  sidebar: string;
  mauve: string;
}

interface PaletteFile {
  meta: {
    name: string;
    description: string;
    author: string;
    license: string;
    homepage: string;
    repository: string;
    'palette-version': string;
  };
  colors: Record<string, string>;
  ui: { sidebar: string; mauve: string; 'accent-hover': string };
  terminal: {
    background: string;
    foreground: string;
    normal: Record<string, string>;
    bright: Record<string, string>;
  };
  flavors: Record<string, FlavorSpec>;
}

const file = parse(rawToml) as unknown as PaletteFile;

export const meta = file.meta;
export const terminal = file.terminal;

export type FlavorId = 'base' | 'amethyst' | 'moonstone';
export const FLAVOR_IDS: FlavorId[] = ['base', 'amethyst', 'moonstone'];

/** `#FF5FA2` → `255, 95, 162` — para uso em `rgba(var(--x-rgb), .5)`. */
export function rgbTriplet(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * O flavor `base` não aparece em `[flavors]` do TOML — ele é o próprio `[colors]`.
 * Os tokens de UI também vêm da fonte, incluindo sidebar e hover do accent.
 */
function flavorSpec(id: FlavorId): FlavorSpec {
  if (id === 'base') {
    return {
      name: file.meta.name,
      accent: file.colors.carmine,
      'accent-hover': file.ui['accent-hover'],
      crypt: file.colors.crypt,
      boudoir: file.colors.boudoir,
      velvet: file.colors.velvet,
      selection: file.colors.selection,
      sidebar: file.ui.sidebar,
      mauve: file.ui.mauve,
    };
  }
  return file.flavors[id];
}

/** Os 13 tokens já com as substituições do flavor aplicadas. */
export function resolveColors(id: FlavorId): Record<string, string> {
  const f = flavorSpec(id);
  return {
    ...file.colors,
    crypt: f.crypt,
    boudoir: f.boudoir,
    velvet: f.velvet,
    selection: f.selection,
    carmine: f.accent,
  };
}

export interface TokenView {
  key: string;
  name: string;
  hex: string;
  role: { pt: string; en: string };
  /** Tokens claros pedem um chip de hex mais opaco para o texto não sumir. */
  dark: boolean;
  /**
   * Os quatro tons de fundo. O nome deles fica em pearl: pintá-lo com a própria
   * cor sobre o card velvet deixaria "Boudoir" ilegível.
   */
  surface: boolean;
}

/** Ordem de exibição do showcase (Pearl fecha a grade, não segue a ordem do TOML). */
const TOKEN_ORDER = [
  'crypt',
  'boudoir',
  'velvet',
  'selection',
  'carmine',
  'wisteria',
  'verdigris',
  'absinthe',
  'champagne',
  'peach-velvet',
  'pomegranate',
  'ash-mauve',
  'pearl',
] as const;

const TOKEN_NAMES: Record<string, string> = {
  crypt: 'Crypt',
  boudoir: 'Boudoir',
  velvet: 'Velvet',
  selection: 'Selection',
  carmine: 'Carmine',
  wisteria: 'Wisteria',
  verdigris: 'Verdigris',
  absinthe: 'Absinthe',
  champagne: 'Champagne',
  'peach-velvet': 'Peach Velvet',
  pomegranate: 'Pomegranate',
  'ash-mauve': 'Ash Mauve',
  pearl: 'Pearl',
};

/** Nas variantes o token de assinatura muda de nome junto com o hex. */
const TOKEN_NAMES_BY_FLAVOR: Partial<Record<FlavorId, Record<string, string>>> = {
  amethyst: { carmine: 'Amethyst' },
  moonstone: { carmine: 'Moonstone' },
};

const TOKEN_ROLES: Record<string, { pt: string; en: string }> = {
  crypt: {
    pt: 'background mais profundo — página, gutter',
    en: 'deepest background — page, gutter',
  },
  boudoir: {
    pt: 'background principal — editor, painéis',
    en: 'main background — editor, panels',
  },
  velvet: {
    pt: 'superfície elevada — cards, status bar',
    en: 'elevated surface — cards, status bar',
  },
  selection: {
    pt: 'linha atual, seleção, ranges',
    en: 'current line, selection, ranges',
  },
  carmine: {
    pt: 'keywords, storage — <code>const, let, class, if, return</code>',
    en: 'keywords, storage — <code>const, let, class, if, return</code>',
  },
  wisteria: {
    pt: 'instâncias — <code>this, super, null</code>',
    en: 'language instances — <code>this, super, null</code>',
  },
  verdigris: {
    pt: 'classes, tipos, suporte',
    en: 'classes, types, support',
  },
  absinthe: {
    pt: 'funções, métodos',
    en: 'functions, methods',
  },
  champagne: {
    pt: 'strings, template literals',
    en: 'strings, template literals',
  },
  'peach-velvet': {
    pt: 'números, booleanos',
    en: 'numbers, booleans',
  },
  pomegranate: {
    pt: 'erros, deleções, alertas',
    en: 'errors, deletions, alerts',
  },
  'ash-mauve': {
    pt: 'comentários',
    en: 'comments',
  },
  pearl: {
    pt: 'texto principal, foreground',
    en: 'primary text, foreground',
  },
};

/** Tokens escuros o bastante para o chip de hex dispensar reforço de fundo. */
const DARK_TOKENS = new Set(['crypt', 'boudoir', 'velvet', 'selection', 'ash-mauve']);

/** Os tons de fundo da paleta — nome em pearl, não na própria cor. */
const SURFACE_TOKENS = new Set(['crypt', 'boudoir', 'velvet', 'selection']);

export function tokens(id: FlavorId): TokenView[] {
  const resolved = resolveColors(id);
  return TOKEN_ORDER.map((key) => ({
    key,
    name: TOKEN_NAMES_BY_FLAVOR[id]?.[key] ?? TOKEN_NAMES[key],
    hex: resolved[key].toUpperCase(),
    role: TOKEN_ROLES[key],
    dark: DARK_TOKENS.has(key),
    surface: SURFACE_TOKENS.has(key),
  }));
}

export interface FlavorView {
  id: FlavorId;
  name: string;
  accent: string;
  accentHover: string;
  /** Amostra do card: os quatro fundos + accent + hover. */
  strip: string[];
  mood: { pt: string; en: string };
}

const FLAVOR_MOODS: Record<FlavorId, { pt: string; en: string }> = {
  base: {
    pt: 'Fundos vinho rosado e destaque carmim',
    en: 'Rosé-wine backgrounds and a carmine accent',
  },
  amethyst: {
    pt: 'Fundos violetas e destaque ametista',
    en: 'Violet backgrounds and an amethyst accent',
  },
  moonstone: {
    pt: 'Fundos azul-ardósia e destaque azul-céu',
    en: 'Slate-blue backgrounds and a sky-blue accent',
  },
};

export function flavors(): FlavorView[] {
  return FLAVOR_IDS.map((id) => {
    const f = flavorSpec(id);
    return {
      id,
      name: f.name,
      accent: f.accent.toUpperCase(),
      accentHover: f['accent-hover'].toUpperCase(),
      strip: [f.crypt, f.boudoir, f.velvet, f.selection, f.accent, f['accent-hover']],
      mood: FLAVOR_MOODS[id],
    };
  });
}

/** Variáveis CSS de um flavor, sem o seletor em volta. */
function varsFor(id: FlavorId): string {
  const c = resolveColors(id);
  const f = flavorSpec(id);
  const pairs: [string, string][] = [
    ['crypt', c.crypt],
    ['crypt-rgb', rgbTriplet(c.crypt)],
    ['boudoir-rgb', rgbTriplet(c.boudoir)],
    ['absinthe-rgb', rgbTriplet(c.absinthe)],
    ['tabstrip', f.sidebar],
    ['boudoir', c.boudoir],
    ['velvet', c.velvet],
    ['velvet-rgb', rgbTriplet(c.velvet)],
    ['selection', c.selection],
    ['selection-rgb', rgbTriplet(c.selection)],
    ['pearl', c.pearl],
    ['pearl-rgb', rgbTriplet(c.pearl)],
    ['carmine', c.carmine],
    ['carmine-rgb', rgbTriplet(c.carmine)],
    ['carmine-hover', f['accent-hover']],
    ['wisteria', c.wisteria],
    ['wisteria-rgb', rgbTriplet(c.wisteria)],
    ['verdigris', c.verdigris],
    ['absinthe', c.absinthe],
    ['champagne', c.champagne],
    ['peach-velvet', c['peach-velvet']],
    ['pomegranate', c.pomegranate],
    ['ash-mauve', c['ash-mauve']],
    ['ash-mauve-rgb', rgbTriplet(c['ash-mauve'])],
    ['mauve', f.mauve],
  ];
  return pairs.map(([k, v]) => `--${k}: ${v};`).join('\n    ');
}

/**
 * CSS completo da paleta: `:root` com o flavor base e um bloco por flavor
 * alternativo. O switcher só troca `data-flavor` no `<html>`.
 */
export function paletteCss(): string {
  const blocks = [`:root {\n    ${varsFor('base')}\n}`];
  for (const id of FLAVOR_IDS) {
    if (id === 'base') continue;
    blocks.push(`:root[data-flavor="${id}"] {\n    ${varsFor(id)}\n}`);
  }
  return blocks.join('\n\n');
}

/** Cor da barra do navegador por flavor. */
export function themeColor(id: FlavorId): string {
  return flavorSpec(id).crypt;
}

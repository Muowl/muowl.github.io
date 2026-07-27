/**
 * Leitura da paleta Papilio a partir do YAML machine-readable.
 *
 * `src/data/papilio.palette.yaml` é uma cópia byte-a-byte de
 * `palette/papilio.yaml` no repo Muowl/papilio-theme, atualizada por
 * `npm run sync:palette`. Mesmo contrato do Carmilla: nenhum hex digitado aqui.
 *
 * O YAML do Papilio é mais rico que o TOML do Carmilla — traz `anchors` (as
 * cores brutas da personagem, matéria-prima não consumida pelos geradores) e
 * `roles` (o mapeamento semântico papel → token). O showcase aproveita os dois.
 */
import { load } from 'js-yaml';
import raw from '../data/papilio.palette.yaml?raw';
import { contrastRatio, formatRatio, wcagLevel, type WcagLevel } from './contrast';
import { rgbTriplet } from './palette';

interface PapilioFile {
  meta: {
    name: string;
    slug: string;
    variant: string;
    author: string;
    description: string;
  };
  anchors: Record<string, string>;
  palette: Record<string, string>;
  roles: {
    syntax: Record<string, string>;
    ui: Record<string, string>;
    terminal: Record<string, string>;
  };
}

const file = load(raw) as PapilioFile;

export const meta = file.meta;
export const palette = file.palette;
export const anchors = file.anchors;
export const roles = file.roles;

/** O fundo do editor — referência de contraste de tudo que é texto. */
export const BG = file.palette.bg0;

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
  crimson: { pt: 'a cor-assinatura — olhos e pontas do cabelo', en: 'the signature colour — eyes and hair tips' },
  blossom: { pt: 'rosa das flores de ameixeira', en: 'plum-blossom pink' },
  gold: { pt: 'dourado dos adornos', en: 'gold of the ornaments' },
  ghost: { pt: 'azul-fantasma do Boo Tao', en: "Boo Tao's ghost blue" },
  ember: { pt: 'laranja-brasa (pyro)', en: 'ember orange (pyro)' },
  plum: { pt: 'violeta do laço do chapéu', en: 'violet of the hat ribbon' },
  dusk: { pt: 'índigo do céu noturno', en: 'indigo of the night sky' },
  error: { pt: 'diagnósticos de erro', en: 'error diagnostics' },
  warning: { pt: 'avisos', en: 'warnings' },
  info: { pt: 'informação', en: 'information' },
  success: { pt: 'jade discreto — diffs precisam de verde', en: 'a discreet jade — diffs need green' },
  cursor: { pt: 'cursor, acompanha crimson', en: 'cursor, follows crimson' },
};

/** Tokens de fundo: contraste sobre bg0 não diz nada útil sobre eles. */
const SURFACES = new Set(['bg0', 'bg1', 'bg2', 'bg3', 'selection']);

export function swatches(): SwatchView[] {
  return Object.entries(file.palette).map(([key, hex]) => {
    const base: SwatchView = {
      key,
      hex: hex.toUpperCase(),
      label: TOKEN_LABELS[key] ?? { pt: key, en: key },
    };
    if (SURFACES.has(key)) return base;
    const r = contrastRatio(hex, BG);
    return { ...base, ratio: formatRatio(r), level: wcagLevel(r) };
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

export function anchorPairs(): AnchorPair[] {
  return ANCHOR_TO_TOKEN.map(([aKey, tKey, note]) => {
    const aHex = file.anchors[aKey];
    const tHex = file.palette[tKey];
    const ar = contrastRatio(aHex, BG);
    const tr = contrastRatio(tHex, BG);
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
export function syntaxRoles(): RoleView[] {
  return Object.entries(file.roles.syntax).map(([role, token]) => ({
    role,
    token,
    hex: (file.palette[token] ?? '#000000').toUpperCase(),
  }));
}

/** Variáveis CSS do Papilio, escopadas para não vazar na paleta do site. */
export function papilioCss(selector = '.papilio'): string {
  const vars = Object.entries(file.palette)
    .map(([k, v]) => `--pp-${k}: ${v};`)
    .join('\n    ');
  return `${selector} {\n    ${vars}\n}`;
}

/** Clareia um hex puxando cada canal para o branco — só para o estado hover. */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(c + (255 - c) * amount),
  );
  return '#' + ch.map((c) => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Reescreve as variáveis do site com as cores do Papilio, para que a página do
 * tema seja pintada pelo próprio tema. O site inteiro usa os nomes da paleta do
 * Carmilla como vocabulário de superfície; aqui cada um recebe o equivalente
 * papiliano, então header, cards e rodapé acompanham sem nenhuma regra nova.
 */
export function siteVarsCss(selector: string): string {
  const p = file.palette;
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
  return `${selector} {\n    ${pairs.map(([k, v]) => `--${k}: ${v};`).join('\n    ')}\n}`;
}

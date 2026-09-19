import foundation from '../data/cinder.foundation.json';
import semantic from '../data/cinder.semantic.json';
import syntax from '../data/cinder.syntax.json';
import { rgbTriplet } from './palette';

const source = { ...foundation, ...semantic, ...syntax };
export function cinderToken(path: string, seen = new Set<string>()): string {
  if (seen.has(path)) throw new Error(`Cinder: referência circular em ${path}`);
  seen.add(path);
  const node = path.split('.').reduce<any>((value, key) => value?.[key], source);
  if (typeof node?.$value !== 'string') throw new Error(`Cinder: token ausente ${path}`);
  const value = node.$value;
  return value.startsWith('{') ? cinderToken(value.slice(1, -1), seen) : value;
}
export const cinder = {
  bg: cinderToken('background.default'), deep: cinderToken('background.subtle'),
  surface: cinderToken('background.elevated'), overlay: cinderToken('background.overlay'),
  text: cinderToken('text.primary'), muted: cinderToken('text.secondary'),
  accent: cinderToken('accent.primary'), keyword: cinderToken('syntax.keyword'),
  fn: cinderToken('syntax.function'), string: cinderToken('syntax.string'),
  type: cinderToken('syntax.type'), number: cinderToken('syntax.number'),
  comment: cinderToken('syntax.comment'),
};
export const cinderSwatches = [
  ['Char', cinder.bg], ['Coal', cinder.surface], ['Parchment', cinder.text],
  ['Ember', cinder.accent], ['Coral', cinder.keyword], ['Antique Gold', cinder.fn],
  ['Patina', cinder.string], ['Steel', cinder.type], ['Heather', cinder.number],
  ['Linen', cinder.comment],
];
export const cinderStyle = Object.entries(cinder).map(([k, v]) => `--c-${k}:${v}`).join(';');
export function cinderSiteCss() {
  const aliases = {
    crypt: cinder.deep, boudoir: cinder.bg, velvet: cinder.surface,
    selection: cinder.overlay, pearl: cinder.text, carmine: cinder.keyword,
    'carmine-hover': cinder.fn, wisteria: cinder.fn, 'ash-mauve': cinder.muted,
    absinthe: cinder.string, champagne: cinder.fn, verdigris: cinder.type,
  };
  return `:root {${Object.entries(aliases).map(([k, v]) => `--${k}:${v};--${k}-rgb:${rgbTriplet(v)};`).join('')}}`;
}

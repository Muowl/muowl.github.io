import palette from '../data/vesperveil.palette.json';
import { rgbTriplet } from './palette';

export const vesperveil = palette;
export const vesperveilSwatches = [
  { pt: 'Fundo', en: 'Background', color: palette.background },
  { pt: 'Superfície', en: 'Surface', color: palette.surface },
  { pt: 'Marfim', en: 'Ivory', color: palette.foreground },
  { pt: 'Carmim', en: 'Carmine', color: palette.accent },
  { pt: 'Palavras-chave', en: 'Keywords', color: palette.keyword },
  { pt: 'Funções', en: 'Functions', color: palette.function },
  { pt: 'Tipos', en: 'Types', color: palette.type },
  { pt: 'Strings', en: 'Strings', color: palette.string },
  { pt: 'Números', en: 'Numbers', color: palette.number },
  { pt: 'Comentários', en: 'Comments', color: palette.muted },
];

export function vesperveilSiteCss() {
  const aliases = {
    crypt: palette.deep, boudoir: palette.background, velvet: palette.surface,
    selection: palette.selection, pearl: palette.foreground, carmine: palette.keyword,
    'carmine-hover': palette.function, wisteria: palette.type, 'ash-mauve': palette.muted,
    absinthe: palette.string, champagne: palette.function, verdigris: palette.info,
  };
  return `:root {${Object.entries(aliases).map(([key, value]) => `--${key}:${value};--${key}-rgb:${rgbTriplet(value)};`).join('')}}`;
}

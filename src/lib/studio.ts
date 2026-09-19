import palette from '../data/studio.palette.json';
import { rgbTriplet } from './palette';
export const studio = palette;
// A identidade do portfólio é independente das paletas dos temas.
export function studioCss() {
  const aliases: Record<string, string> = {
    crypt: palette.paper, boudoir: palette.paper, velvet: palette.surface,
    selection: palette.line, pearl: palette.ink, carmine: palette.accent,
    'carmine-hover': palette.hover, wisteria: palette.accent,
    'ash-mauve': palette.muted, absinthe: palette.accent,
    champagne: palette.accent, verdigris: palette.accent,
  };
  return `:root {${Object.entries(aliases).map(([key, value]) =>
    `--${key}:${value};--${key}-rgb:${rgbTriplet(value)};`).join('')}}`;
}

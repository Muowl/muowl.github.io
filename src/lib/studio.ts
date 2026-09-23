import palette from '../data/vesperveil.palette.json';
import { rgbTriplet } from './palette';

// O portfólio usa a mesma origem cromática que o Vesperveil.
export const studio = {
  paper: palette.deep,
  surface: palette.surface,
  ink: palette.foreground,
  muted: palette.muted,
  accent: palette.accent,
  hover: palette.keyword,
  line: palette.border,
  gold: palette.function,
  lavender: palette.type,
};

export function studioCss() {
  const aliases: Record<string, string> = {
    crypt: studio.paper, boudoir: palette.background, velvet: studio.surface,
    selection: palette.selection, pearl: studio.ink, carmine: studio.accent,
    'carmine-hover': studio.hover, wisteria: studio.lavender,
    'ash-mauve': studio.muted, absinthe: palette.string,
    champagne: studio.gold, verdigris: palette.info,
  };
  return `:root {${Object.entries(aliases).map(([key, value]) =>
    `--${key}:${value};--${key}-rgb:${rgbTriplet(value)};`).join('')}}`;
}

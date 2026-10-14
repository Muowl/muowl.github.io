import { vesperveil } from './vesperveil';
import { cinder } from './cinder';
import { resolveColors } from './palette';

// A mesma amostra usa os papéis de sintaxe de cada paleta, sem cores locais.
const carmilla = resolveColors('base');
export const previewPalettes = {
  vesperveil: {
    background: vesperveil.background, surface: vesperveil.deep,
    text: vesperveil.foreground, muted: vesperveil.muted, border: vesperveil.border,
    keyword: vesperveil.keyword, type: vesperveil.type, fn: vesperveil.function,
    string: vesperveil.string, number: vesperveil.number,
  },
  cinder: {
    background: cinder.bg, surface: cinder.deep, text: cinder.text,
    muted: cinder.comment, border: cinder.overlay, keyword: cinder.keyword,
    type: cinder.type, fn: cinder.fn, string: cinder.string, number: cinder.number,
  },
  carmilla: {
    background: carmilla.boudoir, surface: carmilla.crypt, text: carmilla.pearl,
    muted: carmilla['ash-mauve'], border: carmilla.selection, keyword: carmilla.carmine,
    type: carmilla.verdigris, fn: carmilla.absinthe, string: carmilla.champagne,
    number: carmilla['peach-velvet'],
  },
};

export type PreviewTheme = keyof typeof previewPalettes;
export function previewStyle(theme: PreviewTheme) {
  return Object.entries(previewPalettes[theme])
    .map(([role, color]) => `--preview-${role}:${color}`).join(';');
}

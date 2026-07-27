/**
 * Registro de temas. Adicionar um tema novo ao site é acrescentar uma entrada
 * aqui — a listagem, os cards da home e o sitemap seguem sozinhos. A página de
 * detalhe fica em `src/pages/[lang]/themes/<slug>.astro`.
 */
import { flavors, tokens } from '../lib/palette';

export interface ThemeEntry {
  slug: string;
  name: string;
  /** Versão publicada — espelha ports/vscode/package.json no repo do tema. */
  version: string;
  tagline: { pt: string; en: string };
  summary: { pt: string; en: string };
  repo: string;
  marketplace?: string;
  openVsx?: string;
  tokenCount: number;
  flavorCount: number;
  /** Amostra de cores do card da listagem. */
  strip: string[];
  accent: string;
  published: boolean;
}

export const themes: ThemeEntry[] = [
  {
    slug: 'carmilla',
    name: 'Carmilla',
    version: '1.6.0',
    tagline: {
      pt: 'calor de cripta para noites de código',
      en: 'crypt warmth for nights of code',
    },
    summary: {
      pt: 'Treze cores destiladas em torno de um fundo rosado-vinho. Accents quentes — carmim, lavanda, mint absinto, pêssego veludo, champagne — sobre um boudoir escuro.',
      en: 'Thirteen colours distilled around a rosé-wine background. Warm accents — carmine, wisteria, absinthe mint, peach velvet, champagne — over a dark boudoir.',
    },
    repo: 'https://github.com/Muowl/carmilla',
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=muowl.carmilla',
    openVsx: 'https://open-vsx.org/extension/muowl/carmilla',
    tokenCount: tokens('base').length,
    flavorCount: flavors().length,
    strip: flavors()[0].strip,
    accent: flavors()[0].accent,
    published: true,
  },
];

export function themeBySlug(slug: string): ThemeEntry | undefined {
  return themes.find((t) => t.slug === slug);
}

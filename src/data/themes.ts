/**
 * Registro de temas. Adicionar um tema novo ao site é acrescentar uma entrada
 * aqui — a listagem, os cards da home e o sitemap seguem sozinhos. A página de
 * detalhe fica em `src/pages/[lang]/themes/<slug>.astro`.
 */
import { flavors, tokens } from '../lib/palette';
import {
  flavors as papilioFlavors,
  palette as papilioPalette,
  swatches as papilioSwatches,
} from '../lib/papilio';

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
  /** `false` esconde os botões de instalar e liga o selo de "em construção". */
  published: boolean;
  /** Aviso legal obrigatório na página, quando o tema é fan-made. */
  disclaimer?: { pt: string; en: string };
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
  {
    slug: 'papilio',
    name: 'Papilio',
    version: '0.2.0',
    tagline: {
      pt: 'marrom-avermelhado, carmesim e ouro antigo',
      en: 'deep red-brown, crimson and antique gold',
    },
    summary: {
      pt: 'Tema escuro a partir das cores de uma personagem: âncoras da arte, escada de luminosidade para daltonismo, e a variante Blood Blossom com mais sangue. Três gates (contraste, daltonismo, tokens) e export Base24.',
      en: 'A dark theme from a character’s colours: art anchors, a lightness ladder for colour blindness, and the Blood Blossom variant with more blood. Three gates (contrast, CVD, tokens) and a Base24 export.',
    },
    repo: 'https://github.com/Muowl/papilio-theme',
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=muowl.papilio-theme',
    // Antes de adicionar um openVsx, confirme pela API
    // (https://open-vsx.org/api/muowl/<slug>): a página devolve 200 mesmo para
    // extensão inexistente, porque é uma SPA — dá falso positivo.
    openVsx: 'https://open-vsx.org/extension/muowl/papilio-theme',
    tokenCount: papilioSwatches().length,
    flavorCount: papilioFlavors().length,
    strip: [
      papilioPalette.bg0,
      papilioPalette.bg1,
      papilioPalette.bg2,
      papilioPalette.selection,
      papilioPalette.crimson,
      papilioPalette.gold,
    ],
    accent: papilioPalette.crimson.toUpperCase(),
    published: true,
    disclaimer: {
      pt: 'Projeto de fã, sem vínculo com a HoYoverse. Inspirado na paleta da Hu Tao (Genshin Impact); todas as marcas pertencem aos seus donos.',
      en: 'A fan-made project, unaffiliated with HoYoverse. Inspired by Hu Tao’s palette (Genshin Impact); all trademarks belong to their owners.',
    },
  },
];

export function themeBySlug(slug: string): ThemeEntry | undefined {
  return themes.find((t) => t.slug === slug);
}

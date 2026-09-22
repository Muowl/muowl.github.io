/**
 * Registro de temas. Adicionar um tema novo ao site é acrescentar uma entrada
 * aqui — a listagem, os cards da home e o sitemap seguem sozinhos. A página de
 * detalhe fica em `src/pages/[lang]/themes/<slug>.astro`.
 */
import { flavors, tokens } from '../lib/palette';
import { cinder, cinderSwatches } from '../lib/cinder';
import { vesperveil, vesperveilSwatches } from '../lib/vesperveil';
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
  tokenLabel?: { pt: string; en: string };
  flavorCount: number;
  /** Amostra de cores do card da listagem. */
  strip: string[];
  accent: string;
  /** `false` esconde os botões de instalar e liga o selo de "em construção". */
  published: boolean;
  pendingLabel?: { pt: string; en: string };
  pendingNote?: { pt: string; en: string };
  /** Aviso legal obrigatório na página, quando o tema é fan-made. */
  disclaimer?: { pt: string; en: string };
}

export const themes: ThemeEntry[] = [
  {
    slug: 'vesperveil', name: 'Vesperveil', version: '0.1.0',
    tagline: { pt: 'vinho, marfim e um véu de carmim', en: 'wine, ivory and a veil of carmine' },
    summary: {
      pt: 'Fundos vinho quase pretos, texto marfim e acentos suaves. Um tema escuro para VS Code, com comentários em itálico e cores contidas para a sintaxe.',
      en: 'Near-black wine backgrounds, ivory text and soft accents. A dark VS Code theme with italic comments and restrained syntax colours.',
    },
    repo: 'https://github.com/Muowl/vesperveil',
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=muowl.vesperveil',
    openVsx: 'https://open-vsx.org/extension/muowl/vesperveil',
    tokenCount: vesperveilSwatches.length, flavorCount: 1,
    tokenLabel: { pt: 'cores em destaque', en: 'featured colours' },
    strip: [vesperveil.deep, vesperveil.background, vesperveil.accent, vesperveil.function, vesperveil.type, vesperveil.string],
    accent: vesperveil.accent, published: true,
    disclaimer: {
      pt: 'Projeto independente, sem vínculo com a HoYoverse. Sutilmente inspirado na paleta da Ronova (Genshin Impact); não inclui arte oficial.',
      en: 'An independent project, unaffiliated with HoYoverse. Subtly inspired by Ronova’s palette (Genshin Impact); no official artwork is included.',
    },
  },
  {
    slug: 'cinder', name: 'Cinder', version: '0.3.1',
    tagline: { pt: 'carvão, brasa e espaço para pensar', en: 'charcoal, embers and room to think' },
    summary: {
      pt: 'Carvão quente, coral e ouro antigo. Uma linguagem visual para código, com variáveis neutras e cores que dão estrutura à leitura.',
      en: 'Warm charcoal, coral and antique gold. A design language for code, with neutral variables and colours that give structure to reading.',
    },
    repo: 'https://github.com/Muowl/cinder',
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=muowl.cinder-warm-theme',
    openVsx: 'https://open-vsx.org/extension/muowl/cinder-warm-theme',
    tokenCount: cinderSwatches.length, flavorCount: 1,
    tokenLabel: { pt: 'cores em destaque', en: 'featured colours' },
    strip: [cinder.deep, cinder.bg, cinder.accent, cinder.fn, cinder.string, cinder.type],
    accent: cinder.accent, published: true,
  },
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

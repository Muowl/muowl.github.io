/**
 * Projetos em destaque. Acrescentar uma entrada aqui já publica o card na home e
 * na listagem — nenhuma rota nova precisa ser criada.
 */
export interface ProjectEntry {
  name: string;
  summary: { pt: string; en: string };
  url: string;
  /** Tecnologias mostradas como chips no card. */
  stack: string[];
  year: number;
}

export const projects: ProjectEntry[] = [
  {
    name: 'carmilla',
    summary: {
      pt: 'Monorepo do tema: paleta documentada em TOML como fonte da verdade, port para VS Code publicado no Marketplace e no Open VSX, e dois flavors.',
      en: 'The theme monorepo: a palette documented in TOML as the source of truth, the VS Code port published on the Marketplace and Open VSX, and two flavors.',
    },
    url: 'https://github.com/Muowl/carmilla',
    stack: ['TOML', 'JSON', 'VS Code'],
    year: 2026,
  },
  {
    name: 'papilio-theme',
    summary: {
      pt: 'Tema a partir de âncoras de personagem: paleta em YAML, variante Blood Blossom, export Base24 e três gates de build (contraste WCAG, daltonismo e tokenização real).',
      en: 'A theme from character anchors: YAML palette, Blood Blossom variant, Base24 export, and three build gates (WCAG contrast, colour blindness and real tokenisation).',
    },
    url: 'https://github.com/Muowl/papilio-theme',
    stack: ['TypeScript', 'YAML', 'VS Code', 'Base24'],
    year: 2026,
  },
];

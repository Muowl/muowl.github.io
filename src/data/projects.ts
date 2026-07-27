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
      pt: 'Tema construído a partir das cores de uma personagem: âncoras extraídas da arte, paleta em YAML e um gerador que checa contraste antes de emitir o tema.',
      en: 'A theme built from a character’s colours: anchors pulled from the art, a YAML palette, and a generator that checks contrast before emitting the theme.',
    },
    url: 'https://github.com/Muowl/papilio-theme',
    stack: ['TypeScript', 'YAML', 'VS Code'],
    year: 2026,
  },
];

/**
 * Projetos que não são temas. Acrescentar uma entrada aqui já publica o card na
 * home e na listagem — nenhuma rota nova precisa ser criada.
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
      pt: 'Monorepo do tema: paleta documentada em TOML, port para VS Code e o showcase que virou este site.',
      en: 'The theme monorepo: a palette documented in TOML, the VS Code port, and the showcase that became this site.',
    },
    url: 'https://github.com/Muowl/carmilla',
    stack: ['TOML', 'JSON', 'VS Code'],
    year: 2026,
  },
  {
    name: 'muowl.dev',
    summary: {
      pt: 'Este site. Astro estático, bilíngue, com as cores lidas direto do TOML da paleta em vez de copiadas à mão.',
      en: 'This site. Static Astro, bilingual, with colours read straight from the palette TOML instead of hand-copied.',
    },
    url: 'https://github.com/Muowl/muowl.github.io',
    stack: ['Astro', 'TypeScript', 'GitHub Pages'],
    year: 2026,
  },
];

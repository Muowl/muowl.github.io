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
  /** `false` mantém o registro no código, mas o oculta das listagens públicas. */
  listed?: boolean;
}

export const projects: ProjectEntry[] = [
  {
    name: 'vesperveil',
    summary: {
      pt: 'Tema para VS Code e esquema de cores para Windows Terminal. A paleta fica em JSON e também é usada neste site.',
      en: 'A VS Code theme and a Windows Terminal colour scheme. Its palette is stored in JSON and also used by this site.',
    },
    url: 'https://github.com/Muowl/vesperveil',
    stack: ['Design tokens', 'JSON', 'VS Code'],
    year: 2026,
  },
  {
    name: 'cinder',
    summary: {
      pt: 'Tema para VS Code com cores organizadas por função em arquivos JSON e checagens automáticas de contraste.',
      en: 'A VS Code theme with colours organized by role in JSON files and automated contrast checks.',
    },
    url: 'https://github.com/Muowl/cinder',
    stack: ['Design tokens', 'JSON', 'VS Code'], year: 2026,
  },
  {
    name: 'carmilla',
    summary: {
      pt: 'Tema com duas variantes, Carmilla e Amethyst. As versões para editores são geradas a partir da mesma paleta em TOML.',
      en: 'A theme with two variants, Carmilla and Amethyst. The editor ports are generated from a shared TOML palette.',
    },
    url: 'https://github.com/Muowl/carmilla',
    stack: ['TOML', 'JSON', 'VS Code'],
    year: 2026,
  },
  {
    name: 'papilio-theme',
    summary: {
      pt: 'Um exercício de transformar cores de referência em uma paleta utilizável: YAML, uma variante alternativa e verificações de contraste, distinção de cores e tokens.',
      en: 'An exercise in turning reference colours into a usable palette: YAML, an alternate variant, and checks for contrast, colour distinction and tokens.',
    },
    url: 'https://github.com/Muowl/papilio-theme',
    stack: ['TypeScript', 'YAML', 'VS Code', 'Base24'],
    year: 2026,
    listed: false,
  },
];

export const listedProjects = projects.filter((project) => project.listed !== false);

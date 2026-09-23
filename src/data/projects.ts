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
    name: 'cinder',
    summary: {
      pt: 'Um estudo de como levar uma paleta para uma ferramenta de desenvolvimento: tokens separados por função, port para VS Code e checagens automáticas de contraste.',
      en: 'An exploration of bringing a palette into a developer tool: tokens organized by role, a VS Code port and automated contrast checks.',
    },
    url: 'https://github.com/Muowl/cinder',
    stack: ['Design tokens', 'JSON', 'VS Code'], year: 2026,
  },
  {
    name: 'carmilla',
    summary: {
      pt: 'Um tema e tudo que precisa para mantê-lo: a paleta em TOML como fonte única, versões para editores e dois flavors com identidades próprias.',
      en: 'A theme and the pieces needed to maintain it: a TOML palette as the single source, editor ports and two flavours with their own identities.',
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
  },
];

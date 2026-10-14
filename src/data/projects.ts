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
  themeSlug?: string;
  caseStudy?: {
    challenge: { pt: string; en: string };
    approach: { pt: string; en: string };
    result: { pt: string; en: string };
  };
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
    themeSlug: 'vesperveil',
    caseStudy: {
      challenge: {
        pt: 'Manter a mesma identidade de cores no editor, no terminal e neste site sem editar cada saída manualmente.',
        en: 'Keep the same colour identity across the editor, terminal and this site without editing every output by hand.',
      },
      approach: {
        pt: 'Uma paleta JSON alimenta o gerador dos arquivos para VS Code e Windows Terminal. As verificações cobrem pares de contraste selecionados, o formato das cores e os valores ANSI compartilhados.',
        en: 'A JSON palette feeds the generator for VS Code and Windows Terminal files. Checks cover selected contrast pairs, colour format and shared ANSI values.',
      },
      result: {
        pt: 'Um tema para VS Code e um esquema com as 16 cores ANSI para Windows Terminal, derivados da mesma fonte. O portfólio reutiliza essa paleta.',
        en: 'A VS Code theme and a Windows Terminal scheme with all 16 ANSI colours, derived from the same source. This portfolio reuses that palette.',
      },
    },
  },
  {
    name: 'cinder',
    summary: {
      pt: 'Tema para VS Code com cores organizadas por função em arquivos JSON e checagens automáticas de contraste.',
      en: 'A VS Code theme with colours organized by role in JSON files and automated contrast checks.',
    },
    url: 'https://github.com/Muowl/cinder',
    stack: ['Design tokens', 'JSON', 'VS Code'], year: 2026,
    themeSlug: 'cinder',
    caseStudy: {
      challenge: {
        pt: 'Organizar as cores de uma ferramenta de desenvolvimento por função, mantendo separadas a identidade visual e as regras do editor.',
        en: 'Organize developer-tool colours by purpose, keeping the visual identity separate from editor rules.',
      },
      approach: {
        pt: 'Tokens de base, interface e sintaxe vivem em arquivos separados. Um template adapta esses papéis ao VS Code, e o processo de build gera o tema e verifica o contraste.',
        en: 'Foundation, interface and syntax tokens live in separate files. A template maps these roles to VS Code, and the build process generates the theme and checks contrast.',
      },
      result: {
        pt: 'Um tema gerado para VS Code, com uma prévia ilustrativa e tokens compartilhados que podem orientar futuros adaptadores.',
        en: 'A generated VS Code theme, with an illustrative preview and shared tokens that can guide future adapters.',
      },
    },
  },
  {
    name: 'carmilla',
    summary: {
      pt: 'Três variantes para VS Code, geradas a partir de uma paleta TOML: Carmilla, Amethyst e Moonstone.',
      en: 'Three VS Code variants generated from a TOML palette: Carmilla, Amethyst and Moonstone.',
    },
    url: 'https://github.com/Muowl/carmilla',
    stack: ['TOML', 'JSON', 'VS Code'],
    year: 2026,
    themeSlug: 'carmilla',
    caseStudy: {
      challenge: {
        pt: 'Oferecer três atmosferas visuais sem manter três conjuntos independentes de regras de sintaxe e interface.',
        en: 'Offer three visual moods without maintaining three independent sets of syntax and interface rules.',
      },
      approach: {
        pt: 'A paleta TOML define as cores compartilhadas e as substituições de cada variante. A geração produz os temas e a prévia de código; os testes verificam arquivos gerados, contraste e comportamento de gramáticas.',
        en: 'The TOML palette defines shared colours and per-variant overrides. Generation produces the themes and code preview; tests check generated files, contrast and grammar behaviour.',
      },
      result: {
        pt: 'Carmilla, Amethyst e Moonstone reunidos na versão 1.7.0, com a mesma linguagem de sintaxe e superfícies próprias. A vitrine permite comparar as três variantes.',
        en: 'Carmilla, Amethyst and Moonstone in version 1.7.0, sharing a syntax language with distinct surfaces. The showcase lets visitors compare all three variants.',
      },
    },
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

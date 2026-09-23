export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const localeTag: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

/** `/pt/themes/carmilla/` → `pt`. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg in languages ? (seg as Lang) : defaultLang;
}

/** Caminho sem o prefixo de idioma: `/pt/themes/` → `/themes/`. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] in languages) parts.shift();
  return '/' + parts.join('/') + (parts.length ? '/' : '');
}

/** Monta a URL de uma rota num idioma. As rotas são idênticas entre idiomas. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return `/${lang}${withSlash === '/' ? '/' : withSlash}`;
}

export const ui = {
  pt: {
    'nav.home': 'Início',
    'nav.label': 'Navegação principal',
    'nav.themes': 'Temas',
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.skip': 'Pular para o conteúdo',

    'home.eyebrow': 'Desenvolvimento · Engenharia · Design',
    'home.subtitle': 'entender o problema também faz parte de programar',
    'home.lead':
      'Sou Felipe, desenvolvedor full stack. Aprendo construindo: estudo engenharia de software, desenho interfaces e testo ideias em projetos próprios. No momento, também ando explorando o que dá para fazer com LLMs — e onde eles realmente ajudam.',
    'home.cta.themes': 'Ver os temas',
    'home.cta.github': 'GitHub',
    'home.themes.title': 'Temas',
    'home.themes.subtitle': 'cor, contraste e leitura tratados como parte da interface',
    'home.projects.title': 'Projetos',
    'home.projects.subtitle': 'ideias que viraram código e continuam evoluindo',
    'home.all.themes': 'Todos os temas',
    'home.all.projects': 'Todos os projetos',

    'themes.title': 'Temas',
    'themes.subtitle': 'projetados para passar horas olhando para código',
    'themes.lead':
      'Faço cada tema como faria uma interface: começo pela paleta, defino o papel de cada cor e confiro como ela se comporta no editor. Os detalhes e critérios de cada projeto estão abertos para consulta.',
    'themes.view': 'Ver o tema',
    'themes.tokens': 'tokens',
    'themes.flavors': 'flavors',

    'theme.install': 'Instalar — VS Code Marketplace',
    'theme.openvsx': 'Open VSX',
    'theme.github': 'Ver no GitHub',
    'theme.palette.title': 'A paleta',
    'theme.palette.subtitle': 'treze tons, um humor',
    'theme.editor.title': 'No editor',
    'theme.editor.subtitle': 'como ela se comporta em código real',
    'theme.anatomy.title': 'Anatomia',
    'theme.anatomy.subtitle': 'cada token, sua cor, seu papel',
    'theme.flavors.title': 'Os flavors',
    'theme.flavors.subtitle': 'o mesmo tema, sob outra luz',
    'theme.flavors.active': 'ativo',
    'theme.back': 'Todos os temas',
    'theme.wip': 'em construção',
    'theme.wip.note':
      'Ainda não publicado no Marketplace. A paleta já está fechada e o código é aberto — dá para instalar do fonte.',
    'theme.anchors.title': 'Da personagem à tela',
    'theme.anchors.subtitle': 'a cor bruta e a cor que sobreviveu ao contraste',
    'theme.anchors.lead':
      'As âncoras são as cores tiradas direto da arte. Quase nenhuma passa em contraste sobre o fundo do editor — então cada uma foi ajustada até passar, preservando o matiz. As razões abaixo são calculadas sobre o fundo, não copiadas de anotação.',
    'theme.anchors.raw': 'âncora',
    'theme.anchors.adjusted': 'token',
    'theme.roles.title': 'Papéis',
    'theme.roles.subtitle': 'o que cada token colore no código',

    'projects.title': 'Projetos',
    'projects.subtitle': 'projetos que uso para estudar fazendo',
    'projects.lead': 'Aqui ficam os experimentos que saíram das anotações e foram parar no código: temas, sistemas de design e ferramentas para organizar decisões.',
    'projects.visit': 'Ver projeto',

    'about.title': 'Sobre',
    'about.subtitle': 'o que venho aprendendo e construindo',
    'about.contact': 'Contato',

    'notfound.title': 'Perdeu-se no corredor',
    'notfound.lead': 'Esta página não existe — ou foi levada embora na última noite.',
    'notfound.back': 'Voltar ao início',

    'footer.built': 'Feito por muowl · código aberto no GitHub',
    'flavor.label': 'Flavor',
    'lang.label': 'Idioma',
  },
  en: {
    'nav.home': 'Home',
    'nav.label': 'Main navigation',
    'nav.themes': 'Themes',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.skip': 'Skip to content',

    'home.eyebrow': 'Development · Engineering · Design',
    'home.subtitle': 'understanding the problem is part of programming',
    'home.lead':
      'I’m Felipe, a full stack developer. I learn by building: studying software engineering, designing interfaces and testing ideas in personal projects. Lately, I’ve also been exploring what LLMs can do — and where they actually help.',
    'home.cta.themes': 'See the themes',
    'home.cta.github': 'GitHub',
    'home.themes.title': 'Themes',
    'home.themes.subtitle': 'colour, contrast and readability treated as interface design',
    'home.projects.title': 'Projects',
    'home.projects.subtitle': 'ideas turned into code, still evolving',
    'home.all.themes': 'All themes',
    'home.all.projects': 'All projects',

    'themes.title': 'Themes',
    'themes.subtitle': 'made for spending hours looking at code',
    'themes.lead':
      'I make each theme the way I would approach an interface: start with the palette, give every colour a role, then see how it behaves in the editor. The details and criteria behind each project are open to explore.',
    'themes.view': 'View the theme',
    'themes.tokens': 'tokens',
    'themes.flavors': 'flavors',

    'theme.install': 'Install — VS Code Marketplace',
    'theme.openvsx': 'Open VSX',
    'theme.github': 'View on GitHub',
    'theme.palette.title': 'The palette',
    'theme.palette.subtitle': 'thirteen tones, one mood',
    'theme.editor.title': 'In the editor',
    'theme.editor.subtitle': 'how it behaves in real code',
    'theme.anatomy.title': 'Anatomy',
    'theme.anatomy.subtitle': 'each token, its colour, its role',
    'theme.flavors.title': 'The flavors',
    'theme.flavors.subtitle': 'the same theme in a different light',
    'theme.flavors.active': 'active',
    'theme.back': 'All themes',
    'theme.wip': 'work in progress',
    'theme.wip.note':
      'Not on the Marketplace yet. The palette is settled and the code is open — you can install it from source.',
    'theme.anchors.title': 'From the character to the screen',
    'theme.anchors.subtitle': 'the raw colour and the one that survived contrast',
    'theme.anchors.lead':
      'The anchors are colours taken straight from the art. Almost none of them pass contrast over the editor background — so each was lifted until it did, keeping its hue. The ratios below are computed against that background, not copied from a note.',
    'theme.anchors.raw': 'anchor',
    'theme.anchors.adjusted': 'token',
    'theme.roles.title': 'Roles',
    'theme.roles.subtitle': 'what each token colours in code',

    'projects.title': 'Projects',
    'projects.subtitle': 'projects I use to learn by making',
    'projects.lead': 'These are experiments that made it out of my notes and into code: themes, design systems and tools for making decisions visible.',
    'projects.visit': 'View project',

    'about.title': 'About',
    'about.subtitle': 'what I’m learning and building',
    'about.contact': 'Contact',

    'notfound.title': 'Lost in the corridor',
    'notfound.lead': 'This page does not exist — or it was carried off last night.',
    'notfound.back': 'Back to the start',

    'footer.built': 'Made by muowl · open source on GitHub',
    'flavor.label': 'Flavor',
    'lang.label': 'Language',
  },
} as const;

export type UiKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<UiKey, string>)[key] ?? (ui[defaultLang] as Record<UiKey, string>)[key];
  };
}

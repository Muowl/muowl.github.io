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
    'nav.themes': 'Temas',
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.skip': 'Pular para o conteúdo',

    'home.eyebrow': 'Desenvolvedor · Temas · Open source',
    'home.subtitle': 'ferramentas com identidade, não com preset',
    'home.lead':
      'Faço temas e ferramentas pequenas com atenção a cor, tipografia e contraste. Tudo aberto, tudo com paleta própria — nenhum hex copiado de outro tema.',
    'home.cta.themes': 'Ver os temas',
    'home.cta.github': 'GitHub',
    'home.themes.title': 'Temas',
    'home.themes.subtitle': 'paletas autorais, portadas para vários editores',
    'home.projects.title': 'Projetos',
    'home.projects.subtitle': 'o que mais anda em construção',
    'home.all.themes': 'Todos os temas',
    'home.all.projects': 'Todos os projetos',

    'themes.title': 'Temas',
    'themes.subtitle': 'uma paleta por vez, levada a sério',
    'themes.lead':
      'Cada tema nasce de uma paleta documentada — tokens nomeados, papéis definidos e alvos de contraste WCAG antes de qualquer linha de JSON.',
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
    'projects.subtitle': 'o que anda em construção',
    'projects.lead': 'Coisas pequenas, feitas com cuidado, abertas de ponta a ponta.',
    'projects.visit': 'Ver projeto',

    'about.title': 'Sobre',
    'about.subtitle': 'quem faz isto',
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
    'nav.themes': 'Themes',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.skip': 'Skip to content',

    'home.eyebrow': 'Developer · Themes · Open source',
    'home.subtitle': 'tools with an identity, not a preset',
    'home.lead':
      'I build themes and small tools with care for colour, type and contrast. All open, all with an original palette — not a single hex copied from another theme.',
    'home.cta.themes': 'See the themes',
    'home.cta.github': 'GitHub',
    'home.themes.title': 'Themes',
    'home.themes.subtitle': 'original palettes, ported to several editors',
    'home.projects.title': 'Projects',
    'home.projects.subtitle': 'what else is being built',
    'home.all.themes': 'All themes',
    'home.all.projects': 'All projects',

    'themes.title': 'Themes',
    'themes.subtitle': 'one palette at a time, taken seriously',
    'themes.lead':
      'Every theme starts from a documented palette — named tokens, defined roles and WCAG contrast targets, before a single line of JSON.',
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
    'projects.subtitle': 'what is being built',
    'projects.lead': 'Small things, made with care, open end to end.',
    'projects.visit': 'View project',

    'about.title': 'About',
    'about.subtitle': 'who makes this',
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

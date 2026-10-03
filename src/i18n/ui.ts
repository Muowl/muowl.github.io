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

    'home.title': 'muowl — Felipe Lazzarini, software e temas de editor',
    'home.role': 'Desenvolvedor full stack',
    'home.headline': 'Software.',
    'home.headline.themes': 'Temas de editor.',
    'home.eyebrow': 'Software e temas de editor',
    'home.subtitle': 'desenvolvedor full stack desde 2020',
    'home.lead':
      'Sou Felipe Lazzarini, desenvolvedor full stack. Trabalho com software para negócios desde 2020. Nos meus projetos pessoais, também crio temas para VS Code: Vesperveil, Cinder e Carmilla.',
    'home.cta.themes': 'Ver os temas',
    'home.cta.about': 'Sobre mim',
    'home.cta.github': 'GitHub',
    'home.folio.work': 'Projetos pessoais · Código aberto',
    'home.folio.location': 'Feito no Brasil',
    'home.featured.title': 'Em destaque',
    'home.featured.lead': 'O Vesperveil combina fundos vinho quase pretos e texto marfim com cores de sintaxe mais vivas. Rosa marca as palavras-chave, dourado quente as funções e lavanda os tipos. Veja a versão 0.2.0 nas capturas do VS Code com TypeScript e Python.',
    'home.featured.link': 'Ver capturas e paleta',
    'home.featured.alt': 'Captura do Vesperveil no VS Code com código TypeScript',
    'home.featured.caption': 'Captura real · VS Code',
    'screenshot.open': 'Abrir captura completa',
    'home.themes.title': 'Temas',
    'home.themes.subtitle': 'paletas e capturas no editor',
    'home.projects.title': 'Projetos',
    'home.projects.subtitle': 'Meus projetos no GitHub.',
    'home.projects.lead': 'Os repositórios dos temas incluem as paletas e os arquivos de cada projeto. A paleta do Vesperveil também é usada neste site.',
    'home.all.themes': 'Todos os temas',
    'home.all.projects': 'Todos os projetos',

    'themes.title': 'Temas',
    'themes.subtitle': 'Vesperveil, Cinder e Carmilla para VS Code',
    'themes.lead':
      'Cada tema tem sua própria paleta. Nas páginas abaixo, você pode ver as cores, os exemplos de código e os links para instalar.',
    'themes.view': 'Ver o tema',
    'themes.tokens': 'tokens',
    'themes.flavors': 'variantes',

    'theme.install': 'Instalar — VS Code Marketplace',
    'theme.openvsx': 'Open VSX',
    'theme.download': 'Baixar VSIX',
    'theme.download.hint': 'Para instalar o pacote, use “Extensions: Install from VSIX…” no VS Code.',
    'theme.github': 'Ver no GitHub',
    'theme.palette.title': 'A paleta',
    'theme.palette.subtitle': 'as treze cores do Carmilla e seus usos',
    'theme.editor.title': 'No editor',
    'theme.editor.subtitle': 'prévia ilustrativa com TypeScript',
    'theme.vesperveil.editor.title': 'As cores da sintaxe.',
    'theme.vesperveil.editor.lead': 'Rosa mais vivo nas palavras-chave, dourado quente nas funções, lavanda nos tipos e verde nas strings. As variáveis usam marfim e os comentários, itálico.',
    'theme.cinder.editor.title': 'Coral, ouro e verde-pátina.',
    'theme.cinder.editor.lead': 'O fundo é carvão quente e as variáveis usam tons neutros. Palavras-chave em coral, funções em ouro e strings em verde-pátina.',
    'theme.cinder.palette.title': 'As cores do Cinder.',
    'theme.contrast.title': 'Contraste da paleta.',
    'theme.anatomy.title': 'Cores da sintaxe',
    'theme.anatomy.subtitle': 'a cor usada em cada elemento do código',
    'theme.flavors.title': 'Variantes',
    'theme.flavors.subtitle': 'compare as paletas e selecione uma variante',
    'theme.flavors.lead': 'Amethyst troca o carmim por ametista e usa fundos mais violetas. As demais cores de texto e sintaxe são as mesmas nas duas variantes. Selecione uma delas para comparar a paleta e a prévia de código.',
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
    'projects.subtitle': 'Meus projetos no GitHub',
    'projects.lead': 'Aqui estão os repositórios dos meus temas para VS Code, com as paletas e os arquivos de cada projeto.',
    'projects.visit': 'Ver projeto',

    'about.title': 'Sobre',
    'about.subtitle': 'Felipe Lazzarini · Desenvolvedor full stack',
    'about.contact': 'Contato',

    'notfound.title': 'Página não encontrada',
    'notfound.lead': 'Não há uma página neste endereço.',
    'notfound.back': 'Voltar ao início',

    'footer.built': 'Feito por muowl · código aberto no GitHub',
    'flavor.label': 'Variante',
    'lang.label': 'Idioma',
  },
  en: {
    'nav.home': 'Home',
    'nav.label': 'Main navigation',
    'nav.themes': 'Themes',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.skip': 'Skip to content',

    'home.title': 'muowl — Felipe Lazzarini, software and editor themes',
    'home.role': 'Full stack developer',
    'home.headline': 'Software.',
    'home.headline.themes': 'Editor themes.',
    'home.eyebrow': 'Software and editor themes',
    'home.subtitle': 'a full stack developer since 2020',
    'home.lead':
      'I’m Felipe Lazzarini, a full stack developer. I’ve been building software for businesses since 2020. My personal projects include three VS Code themes: Vesperveil, Cinder and Carmilla.',
    'home.cta.themes': 'See the themes',
    'home.cta.about': 'About me',
    'home.cta.github': 'GitHub',
    'home.folio.work': 'Personal projects · Open source',
    'home.folio.location': 'Made in Brazil',
    'home.featured.title': 'Featured',
    'home.featured.lead': 'Vesperveil combines near-black wine backgrounds and ivory text with richer syntax colours. Keywords are rose, functions warm gold and types lavender. See version 0.2.0 in VS Code screenshots with TypeScript and Python.',
    'home.featured.link': 'View screenshots and palette',
    'home.featured.alt': 'Vesperveil in VS Code with TypeScript code',
    'home.featured.caption': 'Actual screenshot · VS Code',
    'screenshot.open': 'Open full screenshot',
    'home.themes.title': 'Themes',
    'home.themes.subtitle': 'palettes and editor screenshots',
    'home.projects.title': 'Projects',
    'home.projects.subtitle': 'My projects on GitHub.',
    'home.projects.lead': 'The theme repositories include their palettes and project files. This site also uses the Vesperveil palette.',
    'home.all.themes': 'All themes',
    'home.all.projects': 'All projects',

    'themes.title': 'Themes',
    'themes.subtitle': 'Vesperveil, Cinder and Carmilla for VS Code',
    'themes.lead':
      'Each theme has its own palette. The pages below show the colours, code examples and installation links.',
    'themes.view': 'View the theme',
    'themes.tokens': 'tokens',
    'themes.flavors': 'variants',

    'theme.install': 'Install — VS Code Marketplace',
    'theme.openvsx': 'Open VSX',
    'theme.download': 'Download VSIX',
    'theme.download.hint': 'To install the package, use “Extensions: Install from VSIX…” in VS Code.',
    'theme.github': 'View on GitHub',
    'theme.palette.title': 'The palette',
    'theme.palette.subtitle': 'Carmilla’s thirteen colours and their uses',
    'theme.editor.title': 'In the editor',
    'theme.editor.subtitle': 'an illustrative TypeScript preview',
    'theme.vesperveil.editor.title': 'Syntax colours.',
    'theme.vesperveil.editor.lead': 'Richer rose keywords, warm golden functions, lavender types and green strings. Variables use ivory and comments are italic.',
    'theme.cinder.editor.title': 'Coral, gold and patina green.',
    'theme.cinder.editor.lead': 'The background is warm charcoal and variables use neutral tones. Keywords are coral, functions gold and strings patina green.',
    'theme.cinder.palette.title': 'Cinder’s colours.',
    'theme.contrast.title': 'Palette contrast.',
    'theme.anatomy.title': 'Syntax colours',
    'theme.anatomy.subtitle': 'the colour used for each code element',
    'theme.flavors.title': 'Variants',
    'theme.flavors.subtitle': 'compare the palettes and select a variant',
    'theme.flavors.lead': 'Amethyst replaces carmine with amethyst and uses more violet backgrounds. The remaining text and syntax colours are shared by both variants. Select one to compare the palette and code preview.',
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
    'projects.subtitle': 'My projects on GitHub',
    'projects.lead': 'These are the repositories for my VS Code themes, including their palettes and project files.',
    'projects.visit': 'View project',

    'about.title': 'About',
    'about.subtitle': 'Felipe Lazzarini · Full stack developer',
    'about.contact': 'Contact',

    'notfound.title': 'Page not found',
    'notfound.lead': 'There is no page at this address.',
    'notfound.back': 'Back to the start',

    'footer.built': 'Made by muowl · open source on GitHub',
    'flavor.label': 'Variant',
    'lang.label': 'Language',
  },
} as const;

export type UiKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<UiKey, string>)[key] ?? (ui[defaultLang] as Record<UiKey, string>)[key];
  };
}

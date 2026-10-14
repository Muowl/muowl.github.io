<div align="center">

# muowl.dev

**Portfólio, temas e projetos.** · [muowl.dev](https://muowl.dev)

</div>

Site estático em [Astro](https://astro.build), bilíngue (PT/EN), publicado no
GitHub Pages a cada push na `main`.

## Rodando

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/
npm run preview    # serve o dist/
```

## Identidade e paletas

A identidade principal do portfólio deriva diretamente da paleta Vesperveil em
`src/data/vesperveil.palette.json`, com marcas VHS discretas. Cada vitrine
preserva a identidade do próprio tema.
As paletas de Carmilla, Papilio e Cinder são cópias byte-a-byte dos repositórios
originais; o loader do Cinder resolve os tokens semânticos e de sintaxe.
`npm run assets:studio` gera o ícone e os cards sociais de muowl e Cinder.

```sh
npm run sync:palette             # atualiza a cópia a partir de main
npm run sync:palette -- --check  # só verifica (é o que o CI roda)
```

Trocar uma cor no TOML do tema e rodar o sync propaga para as variáveis CSS, a
grade de swatches, o token map e os cards de flavor de uma vez só.

## Estrutura

```
src/
├── data/        temas, projetos e a cópia da paleta
├── i18n/        strings PT/EN e helpers de rota
├── lib/         leitura do TOML → tokens e CSS
├── layouts/     Base.astro (head, SEO, header, footer)
├── components/  cards e o showcase do Carmilla
└── pages/
    ├── index.astro   raiz — redireciona por idioma do navegador
    ├── 404.astro     404 real, bilíngue
    └── [lang]/       /pt/… e /en/…
```

Adicionar um tema é uma entrada em `src/data/themes.ts`; um projeto, uma entrada
em `src/data/projects.ts`. Nenhuma rota nova precisa ser criada.

A home compara Vesperveil, Cinder e Carmilla com a mesma amostra TypeScript.
O seletor usa radios nativos e CSS, funciona sem JavaScript e aceita navegação
por teclado. `src/lib/theme-preview.ts` mapeia as paletas existentes para os
papéis dessa amostra; nenhum componente define cores próprias. Os cards usam
a mesma prévia e uma descrição curta em `cardSummary`.

As vitrines mostram primeiro o editor e depois a instalação, usando o slot
`installation`. A página de projetos pode apresentar desafio, implementação
e resultado por meio de `caseStudy`, com traduções junto aos dados.

## Licença

MIT.

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

A identidade editorial do portfólio tem paleta própria em `src/data/studio.palette.json`:
papel, tinta e verde discreto. Cada vitrine preserva a identidade do seu tema.
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

## Licença

MIT.

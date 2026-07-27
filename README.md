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

## A paleta não mora aqui

As cores vêm de [`Muowl/carmilla`](https://github.com/Muowl/carmilla), do arquivo
`palette/carmilla.toml`. Este repo guarda uma cópia byte-a-byte em
`src/data/carmilla.palette.toml` e a lê no build — nenhum hex é digitado à mão.

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

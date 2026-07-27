// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// O domínio final é muowl.dev. Antes do cutover o deploy de revisão roda com
// SITE_URL=https://muowl.github.io para que canonical/OG/sitemap apontem para
// onde o site realmente está naquele momento.
const site = process.env.SITE_URL ?? 'https://muowl.dev';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: {
      // Ambos os idiomas têm URL própria (/pt/…, /en/…) — é isso que torna as
      // duas versões indexáveis, ao contrário do toggle por localStorage.
      prefixDefaultLocale: true,
      // O redirect automático do Astro insere um meta-refresh de 2 s e ignora o
      // idioma do visitante. `src/pages/index.astro` faz melhor: redireciona na
      // hora e manda quem não fala português direto para /en/.
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // Sem a opção `i18n`: ela pressupõe o idioma padrão na raiz e, com
      // prefixDefaultLocale, colapsava /pt/ em / — que é justamente a página de
      // redirect marcada como noindex. As alternâncias hreflang já vão no <head>
      // de cada página, que é forma igualmente válida de declará-las.
      //
      // Só entram rotas sob um idioma. Tudo que fica fora (/ e /themes/<slug>/)
      // é página de redirect marcada como noindex — pedir indexação delas seria
      // contradizer a própria meta tag.
      filter: (page) => /^\/(pt|en)\//.test(new URL(page).pathname),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  // Nenhuma imagem passa por astro:assets — as que existem são arquivos estáticos
  // em public/. O passthrough evita carregar o sharp à toa no build.
  image: {
    service: passthroughImageService(),
  },
});

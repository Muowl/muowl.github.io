import type { APIRoute } from 'astro';

/** Gerado em vez de estático para o sitemap apontar sempre para o domínio do build. */
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

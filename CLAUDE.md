# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

## What this is

The site behind **muowl.dev** — portfolio, theme showcases and projects. Astro,
static output, no framework runtime, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

It is a **separate repo from the themes themselves**. `Muowl/carmilla` holds the
theme (palette, VS Code port, changelog); this repo only presents it.

## The palette rule — read this before touching any colour

**Never write a hex literal in this repo.** Each theme's palette lives in that
theme's own repo, and `src/data/` holds byte-identical copies refreshed by:

```sh
npm run sync:palette              # busca todas e reescreve as cópias
npm run sync:palette -- --check   # falha se alguma estiver desatualizada (roda no CI)
```

| Tema     | Fonte                                       | Cópia                            | Loader              |
| -------- | ------------------------------------------- | -------------------------------- | ------------------- |
| Carmilla | `Muowl/carmilla` → `palette/carmilla.toml`  | `src/data/carmilla.palette.toml` | `src/lib/palette.ts` |
| Papilio  | `Muowl/papilio-theme` → `palette/papilio.yaml` | `src/data/papilio.palette.yaml` | `src/lib/papilio.ts` |

The format is each theme repo's choice — TOML and YAML both, parsed by
`smol-toml` and `js-yaml`. Do not convert one to the other to "standardise":
those files are read by the themes' own generators, which would break.

These loaders are the only source of colour in the site: CSS custom properties,
swatch grids, token maps and flavor cards all derive from them. A colour changes
in exactly one place. Adding a hardcoded hex re-creates the drift problem this
structure was built to solve.

**Contrast ratios are computed, never typed.** `src/lib/contrast.ts` implements
WCAG relative luminance; the Papilio page measures every token against its own
background at build time. If a palette changes, the published ratios follow.

Two colour values are deliberately *not* in the TOML, and are documented where
they live in `src/lib/palette.ts`: `TABSTRIP` (chrome of the editor mockup, not a
palette token) and the base accent hover (taken from `terminal.bright.magenta`).

## i18n

Every page exists at `/pt/…` and `/en/…` — real routes, not a JS toggle, so both
languages are indexable. Rules:

- Routes live under `src/pages/[lang]/` and use `langPaths()` from `src/i18n/paths.ts`.
- Paths are **identical across languages**; only the prefix differs. This is what
  makes the language switch in `Base.astro` a simple prefix swap.
- UI strings go in `src/i18n/ui.ts`. Content strings that belong to a piece of
  data (theme summaries, project descriptions) live beside the data as `{pt, en}`.
- `/` is `src/pages/index.astro`: it redirects by `navigator.language`. Astro's
  built-in `redirectToDefaultLocale` is off on purpose — it emitted a 2-second
  meta-refresh and ignored the visitor's language.
- `404.astro` sits at the root and is bilingual, because the bad URL could be in
  either language. GitHub Pages serves it with a real 404 status.

## Adding things

- **A theme**: add an entry to `src/data/themes.ts`. The listing, the home cards
  and the sitemap follow automatically. The detail route
  `src/pages/[lang]/themes/[slug].astro` renders a per-theme showcase component
  chosen by slug.
- **A project**: add an entry to `src/data/projects.ts`. No new route needed.

## Deploy

- `SITE_URL` (a repository *variable*) overrides the canonical/OG/sitemap origin.
  It exists so the site could be reviewed on `muowl.github.io` before the domain
  moved. With the variable unset, the build uses `https://muowl.dev`.
- The custom domain is configured in the repo's Pages settings. If a `CNAME` file
  is ever added to `public/`, it must agree with that setting.

## Why `@emnapi/runtime` is a devDependency

Nothing in this site imports it. It is declared because npm on Windows resolves
the lockfile without the `@emnapi/*` entries that `@img/sharp-libvips-linux-*`
needs, and the Linux runner's `npm ci` then fails with `EUSAGE — Missing:
@emnapi/runtime`. Declaring it keeps the lock complete on every platform.

Do not "clean it up". `--omit=optional` is *not* an alternative: it also drops
the esbuild and Astro compiler platform binaries, which are required — the build
dies with `MODULE_NOT_FOUND`.

## Conventions

- Commit messages in **Portuguese**, sentence-style subject. Solo repo, commits go
  straight to `main`.
- Comments in the code are in Portuguese, matching the sibling theme repo.

## Astro reference

Full documentation: https://docs.astro.build

- [Routing and dynamic routes](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)

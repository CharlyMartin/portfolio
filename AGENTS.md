# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build` (also regenerates `public/sitemap.xml` via `scripts/generate-sitemap.js`, hooked into the Next.js webpack config)
- Start production build: `npm run start`
- Lint: `npm run lint`
- Typecheck: no dedicated script; run `npx tsc --noEmit`
- Tests: none configured — no test framework, no test files, no test script

## Architecture

Next.js 13 App Router site (TypeScript, strict mode) with no CMS — content lives in the repo as TypeScript data files and Markdown files with frontmatter.

**Content layer (`src/data/`)** — the part of this repo that changes most often:

- `articles.ts` — globs `src/data/articles/<slug>/index.md`, validates frontmatter with a `zod` schema (`title`, `description`, `created`, `updated?`, `highlight?`, `topic`), computes word count. `src/data/articles/_drafts/` and `_archive/` are gitignored (unpublished content).
- `projects.ts` — a hardcoded array of project metadata; each entry cross-references `skills.ts`, `people.ts`, and `uses.ts` by numeric ID, and pairs with a long-form body at `src/data/projects/<slug>.md`.
- `bio.ts` + `bio/short.md` / `bio/long.md` — bio content.
- `config.ts` (site-wide `AVAILABILITY`, `BASE_URL`, `META`), `routes.ts` (nav).

**Markdown pipeline** (`src/lib/parse-markdown.ts`): reads a file from `src/data/<location>/<slug>.md` (`location` = `"projects" | "bio" | "articles"`), extracts frontmatter with `gray-matter`, then pipes through `unified`: `remark-parse` → `remark-gfm` → `remark-rehype` → `rehype-prism-plus` (code highlighting) → `rehype-external-links` → a custom UTM-injection plugin → `rehype-stringify`. This runs server-side inside Server Components at request/build time — there's no separate SSG data-fetching step.

**Components** are organized in tiers under `src/components/`: `atoms/` (primitives), `blocks/` (composed components), `sections/` (page-level sections used by `src/app/*/page.tsx`).

**Path alias**: `@/*` maps to `./src/*` — used throughout instead of relative imports.

**Styling**: Tailwind CSS only (no CSS modules/CSS-in-JS), with `@tailwindcss/typography` for rendered markdown prose and `darkMode: "class"`. Prettier auto-sorts classes via `prettier-plugin-tailwindcss`.

**Deployment**: Vercel (`@vercel/analytics`, `@vercel/speed-insights`). No CI config — Vercel's own build (`npm run build`) is the de facto gate.

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

Next.js 14 App Router site (TypeScript, strict mode) with no CMS — qino manages repo-local Markdown files with frontmatter and JSON content.

**Content layer (`src/content/`)** — configured by `contentFolder` in `qino/index.ts`, with schemas, relations, and views defined in `qino/`:

- `articles/<slug>.md` — article frontmatter and body, validated by `qino/articles.ts`, which also computes Markdown stats. `articles/_drafts/` and `articles/_archive/` are gitignored (unpublished content).
- `projects/<slug>.md` — project metadata and body, with slug-based relations to the `roles/`, `tools/`, and `people/` JSON collections.
- `bio/short.md` and `bio/long.md` — singleton bio content.
- `people/`, `roles/`, and `tools/` — JSON content collections.

**Application data (`src/data/`)**: TypeScript modules remain here: `bio.ts` combines profile metadata with the qino bio singletons; `config.ts`, `contact.ts`, and `routes.ts` provide site configuration, contact details, and navigation. Public media stays in `public/`, configured by qino's `mediaFolder`.

**Components** are organized in tiers under `src/components/`: `atoms/` (primitives), `blocks/` (composed components), `sections/` (page-level sections used by `src/app/*/page.tsx`).

**Path alias**: `@/*` maps to `./src/*` — used throughout instead of relative imports.

**Styling**: Tailwind CSS only (no CSS modules/CSS-in-JS), with `@tailwindcss/typography` for rendered markdown prose and `darkMode: "class"`. Prettier auto-sorts classes via `prettier-plugin-tailwindcss`.

**Deployment**: Vercel (`@vercel/analytics`, `@vercel/speed-insights`). No CI config — Vercel's own build (`npm run build`) is the de facto gate.

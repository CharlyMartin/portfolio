---
name: set-up-qino-cms
description: Use when adding qino (@qino/cms) to a JavaScript or TypeScript project, when asked to install, set up, or configure qino as the Markdown/JSON content layer of an app, when starting a new blog or content site with qino, when making a qino site agent-ready (llms.txt), or when `qino build` or `qino check` fails during setup.
---

# Set up qino CMS

If the installed version is newer and an API here doesn't match, the live docs win. Doc paths here, such as `/guide/cli`, are relative to `https://www.qino.works/docs`. Read a page as Markdown by appending `.md`, as in `https://www.qino.works/docs/guide/cli.md`, where a `#fragment` names the heading to read. `https://www.qino.works/docs/llms.txt` lists every page with a one-line description.

## Overview

qino is a flat-file CMS: content lives as `.md`, `.mdx`, `.markdown`, or `.json` files, definitions live in a `qino/` folder, and a `qino` CLI validates everything and generates slug types.

**Done means:** `qino build` exits 0 and, in TypeScript projects, `tsc --noEmit` passes. If you made the site agent-ready, step 6's agent-ready probes pass too, apart from those it has you report. Keep going until all of these hold.

Match the target project's code style (quotes, semicolons, import paths, validator).

## 1. Detect the setup

Before writing anything, find:

- **Package manager** from the lockfile:

  | Lockfile            | Install                        | Run CLI           |
  | ------------------- | ------------------------------ | ----------------- |
  | `pnpm-lock.yaml`    | `pnpm add @qino/cms@latest`    | `pnpm qino build` |
  | `package-lock.json` | `npm install @qino/cms@latest` | `npx qino build`  |
  | `bun.lock(b)`       | `bun add @qino/cms@latest`     | `bunx qino build` |
  | `yarn.lock`         | `yarn add @qino/cms@latest`    | `yarn qino build` |

- **Package root.** In a monorepo, work inside the package that owns the app. The CLI resolves `qino/` from the working directory.
- **Requirements.** Node 22+. If TypeScript is used, 5.9+ with `strict: true`. If these aren't met, stop and tell the user.
- **Validator.** Any [Standard Schema](https://standardschema.dev) library works. If the project already has one (zod, valibot, arktype), use it. Otherwise also install `zod`.
- **Framework.** Look for `next.config.*` or similar.
- **Existing content.** Look for folders of `.md`/`.mdx`/`.markdown`/`.json` content, and a static folder (`public/`) for `mediaFolder`.

The CLI supports `compilerOptions.paths` aliases from the nearest `tsconfig.json` walking up from the working directory, including paths inherited through `extends`. Use the project's aliases in the instance, definitions, and shared schemas. Keep their import chain free of CSS, images, and Markdown imports that need bundler loaders.

### Starting point

- **qino already set up** (`qino/index.ts` exists): upgrade to `@qino/cms@latest`, keep the instance and definitions, and apply each breaking change in the [changelog](https://github.com/CharlyMartin/qino/blob/main/packages/cms/CHANGELOG.md) since the installed version. For 0.25's removal of `raw`, read a page's Markdown with `getPageMarkdown` once step 5 declares its pages, or the source file from `_meta.filePath`. Get `qino build` green, bring step 4's wiring up to date, then go to step 5.
- **Content found:** model it (step 3).
- **A project, no content:** offer a starter blog (below). If declined, create one `posts` collection with `src/content/posts/hello-world.md`.
- **No `package.json`:** ask whether to scaffold an app first (e.g. `create-next-app`) and with which framework. Don't pick one yourself. Then continue as "a project, no content".

**Starter blog**, based on `/examples/next-js`:

- `posts/*.md`: `title`, `description`, `date`, `author`, `categories`, body
- `authors/*.json` and `categories/*.json`, linked from posts as relations (see "Shared entities and relations")
- `pages/home.md` item with `title` and `tagline`
- Two or three sample files per collection

## 2. Install and create the instance

Install `@qino/cms@latest`, plus `zod@latest` if the project has no validator. Keep the `@latest` tag: pnpm's minimum release age otherwise resolves the previous version for a day after each release, and the docs describe the latest one. Then create `qino/index.ts` with a default export:

```ts
import { initQino } from "@qino/cms";

export default initQino({
  contentFolder: "src/content", // the existing content root
  mediaFolder: "public",
});
```

Both paths are relative to the package root and must be existing directories. Create them only if the project has none.

## 3. Model the content

Write one definition per primitive under `qino/collections/`, `qino/trees/`, or `qino/items/`, each exported by name and created from the default instance:

```ts
import { z } from "zod";

import qino from "../";

export const postCollection = qino.defineCollection({
  directory: "posts",
  extension: ".md",
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
  }),
});
```

For new content, follow the starting point chosen in step 1. For existing content, model what exists.

### Choosing a file type (new content only)

| Content needs                   | Use     |
| ------------------------------- | ------- |
| A prose body                    | `.md`   |
| A body with components          | `.mdx`  |
| Only structured fields, no body | `.json` |

- Use `.mdx` only if the app already renders MDX (e.g. `next-mdx-remote`, `@next/mdx`, `@mdx-js/*`) or the user asks for it. qino returns the body as a string; the app does the rendering.
- JSON suits relation targets such as authors, categories, and settings.
- Existing content keeps its extension. If `.md` files never have a body, suggest JSON, but don't convert without the user's agreement.

### Folder → primitive

| On disk                    | Primitive  | Options                                |
| -------------------------- | ---------- | -------------------------------------- |
| Flat folder, one extension | Collection | `directory`, `extension`               |
| Nested folder with anchors | Tree       | `directory`, `extension`, `titleField` |
| One file at a fixed path   | Item       | `file` (with extension)                |

All three also take `schema`, and optionally `relations` and `views`.

- Collections read only direct children; nested files are ignored.
- A tree folder `guides/` needs an anchor file `guides.md` next to it. qino has no index files. Details: `/guide/content-folder`.
- Items suit one-off files such as the home page or site settings.
- One primitive owns one extension. For mixed folders, use the dominant extension and flag the rest.

### Layouts that don't fit

Don't move, rename, or restructure files without the user's agreement. Model what fits, and report what you skipped and why.

**`index.md` layouts** (`guides/index.md` instead of `guides.md`): offer to convert them. If the user agrees:

1. Show the planned moves.
2. Move each `<folder>/index.<ext>` to `<folder>.<ext>` beside the folder, deepest first, with `git mv` if in git.
3. Turn a root `index.md` into a regular node (e.g. `introduction.md`) or an item.
4. Update app code that relies on `index.md` paths.
5. Add `_order.json` where the existing order isn't alphabetical.

If they decline, skip the folder and flag it.

**Self-named files inside their folder** (`guides/guides.md`): offer to move the file beside the folder (`guides.md`), or model it as an item. If declined, skip it and flag it.

### Inferring schemas

- **Read every file**, not a sample. A field missing from some files becomes `.optional()`. One that's sometimes `null` becomes `.nullable()`.
- **Markdown bodies:** model frontmatter only. qino adds the body as `markdown` to every Markdown entry after validation. Never declare it; it's a type error. Files without frontmatter get `z.object({})`.
- **YAML is 1.2 core:** unquoted dates arrive as strings (use `z.string()` or `z.iso.date()`, never `z.date()`), and `yes`/`no` are strings. See `/guide/frontmatter`.
- **Reserved keys:** a top-level `_meta`, or `markdown`/`_stats`/`_toc` in Markdown frontmatter, is an error. Tell the user; don't rename them.
- **YAML syntax errors:** qino's parser is stricter than some older ones, so files that parsed before may fail (e.g. under-indented continuation lines). Show the file and error and propose a minimal whitespace or quoting fix. Apply it only with the user's agreement. If the error doesn't name the file, parse the folder's files one by one to find it.

### Existing schemas

If the app already validates its content, reuse those schemas instead of inferring new ones. This avoids drift and keeps existing refinements and enums. Adapt them:

- Remove the field that held the body, whatever its name. Never add `markdown`: qino adds it after validation, and declaring it is an error.
- Replace `z.date()` with an ISO string format, e.g. `z.iso.date()` or `z.iso.datetime()` (or the equivalent in other validators).

### Shared entities and relations

When several files repeat the same entity (e.g. `author_name` + `author_title` on every post), move it into its own collection and link it:

1. Create one JSON file per distinct entity: `authors/jane-doe.json` → `{ "name": "Jane Doe", "title": "Editor" }`. If the same entity has conflicting values across files, flag them instead of picking one.
2. Replace the fields in each file with a content path: `author: "authors/jane-doe.json"`.
3. Declare the relation. Getters resolve it to the target entry, one hop deep by default:

   ```ts
   relations: { author: authorCollection, "categories[*]": categoryCollection },
   ```

Do this directly for new content. For existing content, offer it first and list the app code that reads the old fields. If the user declines, keep the fields as they are. Values that are already content paths can be linked as relations without restructuring. Bare slugs (`author: jane`) stay `z.string()`.

### Migrating existing content loaders

If the app already reads content with its own code and you replace it with qino getters:

- **Field mapping:** slug → `_meta.slug`, body → `markdown`. `_meta.filePath` is relative to the working directory, not absolute.
- **Key transforms:** utilities that rename or filter keys (case conversion, sanitizers) can mangle `_meta`. Exclude it.
- **Async:** synchronous, build-time content imports become async getters. List the affected call sites before changing them.
- **Parity check:** capture the old loader output before switching, then deep-compare it with the new output. Types don't catch value drift.

## 4. Wire it up

- **`package.json`.** Add `"prebuild": "qino build"`. If a `prebuild` already exists, chain onto it; never replace it. Order matters: put `qino build` after existing steps that generate files the schemas or content depend on, and before the rest. Run the build once and confirm `qino build` output appears: Yarn 2+ doesn't run `pre*` scripts, so if it didn't run, chain it into `build` instead (`qino build && <existing build>`).
- **Generated types.** `qino/_generated/` is gitignored, so on a fresh clone `tsc` and the editor fail until `qino build` runs. Also run it before dev (`predev` or equivalent). In monorepos with task caching, add `qino/_generated/**` and `<contentFolder>/.qino/**` (the image manifest `qino build` writes for image fields) to the build task's cache outputs, and with `cloud`, `CI` to its cache key (Turborepo's `env`), so a build cached locally can't skip the CI check.
- **`.gitignore`.** Add `qino/_generated/`. If `initQino` sets `cloud`, use `qino/_generated/*` plus `!qino/_generated/config.json` instead: that file is meant to be committed, and `qino build` fails in CI (`CI` set) when it's stale. Also exclude `qino/_generated/` from Prettier/Biome, or `qino check` reports `config.json` as out of date.
- **`tsconfig.json`.** `include` must cover `qino/`. If it's narrowed (e.g. `["src"]`), add `"qino"`.
- **Frameworks.** See the framework examples at `/examples`. If yours isn't listed, don't invent config.
- **Runtime.** qino reads the file system. Call getters only in server code, never in client components or edge runtimes. If pages render on request, the deployed server needs the content folder; check the deploy's file tracing includes it. See `/guide/installation#runtime`.
- **Dynamic routes.** Check route params against `getAllSlugs()` before calling `getEntry(slug)`, and return a 404 if the slug isn't there. Unknown slugs throw a raw file-system error, and unchecked params shouldn't reach the file system.

## 5. Make it agent-ready

If the app serves public pages, offer to serve them to AI agents as Markdown and to build `llms.txt`, and recommend it: agent-readiness scanners such as is-agentic.com score both. If the user declines, go to step 6. The guide is `/guide/agent-ready-content`.

1. **Instance.** Set `siteUrl`, and turn on `llms.txt` with section files:

   ```ts
   export default initQino({
     // contentFolder, mediaFolder, …
     siteUrl: "https://example.com",
     cli: { build: { llmsTxt: { sections: true } } },
   });
   ```

   `siteUrl` is the production origin that the site's canonical URLs use. Take it from the project (Next's `metadataBase`, a site constant, the sitemap config), or ask the user. Agents and scanners follow every link built on it, so it's never `localhost`, even though the Next.js example uses that. Keep `sections` unless a collection's or tree's index page is `/`, or two of them share one: with `sections`, either fails the build.

2. **Pages.** Give each collection and tree the app displays `pages`, with paths matching its routes: `pages: { index: "/blog", entry: "/blog/{slug}", title: "Blog" }`. Give each item that has a route of its own `page: "/about"`. Leave `/` to the `index.md` that `qino build` writes from `llms.txt`, which summarizes the site and links every section, rather than an item's page.

3. **Titles and descriptions.** Page Markdown's frontmatter block, its heading and the `llms.txt` links read each entry's `title` (or the tree's `titleField`) and its `description`. If a collection's summary field has another name, such as `excerpt`, add `description` in its default view's `augment` and leave the content's frontmatter as it is. Trees read their files without views, so report a tree that has no `description`.

4. **MDX components.** For each component the content uses, add a `pages.markdownComponents` entry that returns its Markdown. For example, `({ children }) => children` fits one that only styles text. An item takes the map in `page: { path, markdownComponents }`. A component without an entry reaches agents as raw JSX.

5. **Template.** Write `llms.md` in the content folder. It holds an H1 with the site's name and a one-line `>` summary, which become `index.md`'s frontmatter. Then comes a `## When to use` section naming the jobs the site or product fits and the ones it doesn't, and last a `## Optional` section for outside links. Draft it from the README and the homepage copy, and have the user approve it. It states their positioning, and its "When to use" is what scanners look for to tell agents when the site fits.

6. **Routes.** Follow the host recipe for the framework: `/guide/agent-ready-content/next-js`, `/guide/agent-ready-content/tanstack-start`, or `/guide/agent-ready-content/nitro-on-vercel` for prerendered pages on Vercel. Each entry page and index page answers with `negotiateMarkdown` and `getPageMarkdown`, at its own URL and at its Markdown URL. For a framework without a recipe, call `negotiateMarkdown` in the server handlers of pages that render on request, and report prerendered pages as not covered.

7. **Advertise.** Add `<link rel="alternate" type="text/markdown">` to each page's head, with the URL from `getMarkdownUrl` (`/index.md` on the homepage). Add the matching `Link` header wherever the recipe sets headers, because scanners read the tag and the header separately. The homepage's `Link` header also names `</llms.txt>; rel="describedby"`.

8. **Generated files.** `qino build` writes `llms.txt`, `llms-full.txt` and `index.md` into `mediaFolder`, plus, with `sections`, a `llms.txt` at each index page's path, such as `public/blog/llms.txt`. It skips `index.md` when a page already has `/index.md` as its Markdown URL. Add each one to `.gitignore`. With task caching, also list each one in the build task's outputs, because a cache hit restores only those.

## 6. Verify

Run the CLI's `build` command. Fix each reported error and rerun until it exits 0. Then run `tsc --noEmit` if the project uses TypeScript.

Look up each error message in `/api/errors`, a long page, by searching it for the message. The ones setup usually hits:

- `Tree: folder "<path>" is missing its sibling file…`: add the anchor file, or convert the `index.md` layout.
- `Validation failed for <filePath>:`: make the field optional or fix its type. Don't edit content to fit the schema. YAML syntax errors are different; see "Inferring schemas".
- `…fields reserved for qino cannot appear…`: `_meta`, `markdown`, `_stats`, or `_toc` in frontmatter or schema output. Flag frontmatter conflicts to the user; drop them from schemas.
- `Relation "<key>"…expected value under "<dir>/"…`: the value is a bare slug. Keep it as `z.string()`, or convert it to a path.

If you made the site agent-ready, check that `<mediaFolder>/llms.txt` holds "When to use", and `## Sections` with `sections` on. Then run the project's own build and start scripts (e.g. `pnpm build && pnpm start`), so `prebuild` runs `qino build`, and probe the server. `<index>` and `<entry>` are the paths of a real index page and entry page, such as `/posts` and `/posts/hello-world`:

```sh
curl -si -H "Accept: text/markdown" http://localhost:3000/             # 200, text/markdown, Vary: Accept
curl -si http://localhost:3000/                                         # HTML; Link header naming /index.md and /llms.txt; <link> tag naming /index.md
curl -si http://localhost:3000<index>.md                                # the index page's Markdown, listing its entries
curl -si -H "Accept: text/markdown" http://localhost:3000<entry>        # page Markdown, opening with ---
curl -si http://localhost:3000<entry>.md                                # the same page Markdown
curl -si -H "Accept: text/markdown" http://localhost:3000/no-such-page  # 404, text/markdown
```

A failing probe is a setup bug to fix, unless the host recipe doesn't cover that case, which you report. is-agentic scans only deployed sites and publishes each report at a public URL, so leave the scan to the user: once production serves the new files, suggest `npx is-agentic <domain>`. On a preview deploy, its check that `llms.txt` links resolve fails, because they point at `siteUrl`.

Report back:

- the primitives you defined and their paths
- the files and fields you made optional
- anything you flagged and left alone
- the parity-check result, if you migrated existing loaders
- for an agent-ready site: the `siteUrl` and where it came from, whether the user approved `llms.md`, and each probe the host recipe can't meet

## Quick reference

| CLI          | Does                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `qino lint`  | Config, paths, overlaps, relations. Reads no content                                                                                                |
| `qino check` | Validates every content file against its schema                                                                                                     |
| `qino build` | `lint`, then `check`, then writes `qino/_generated/types.d.ts` (plus `config.json` with `cloud`, and the `llms.txt` files with `cli.build.llmsTxt`) |

## Common mistakes

| Mistake                                         | Fix                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `directory: "/posts"`                           | No leading slash: `"posts"` (relative to `contentFolder`)                      |
| Overwrote an existing `prebuild`                | Chain it                                                                       |
| `import qino from "../"` fails under `NodeNext` | Use the project's convention, e.g. `"../index.js"`                             |
| Collection pointed at a nested folder           | Nested files are ignored; use a tree or several collections                    |
| Script fails with `No "exports" main defined`   | `@qino/cms` is ESM-only; run the script as ESM (`.mts`, or `"type": "module"`) |

## Docs

If something isn't covered here, read one of these pages, or find another in the docs `llms.txt` named at the top:

- guide: `/guide/installation`, `/guide/project-structure`, `/guide/content-folder`, `/guide/frontmatter`, `/guide/cli`
- concepts: `/concepts/schemas`, `/concepts/relations`, `/concepts/trees`
- agent-ready: `/guide/agent-ready-content` and its host recipes, `/api/negotiate-markdown`
- API: `/api`, `/api/errors`
- examples: `/examples`

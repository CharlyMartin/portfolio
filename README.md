# Charly Martin's portfolio

A Next.js 16 App Router site using React 19, Tailwind CSS 4, Headless UI 2, and Sharp. Content lives in repository-local Markdown and JSON collections managed by qino.

## Development

Use Node.js 22 (`nvm use`) and npm. The local `qino-0.0.13.tgz` package must be present before installation; it is intentionally gitignored.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_BASE_URL` in `.env` to the site's canonical URL so generated metadata and `/sitemap.xml` use the correct origin.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

The build runs ESLint before Next.js compiles, checks types, and generates static pages. Development and production builds use Turbopack. Vercel should use Node.js 22.x and `npm run build`; public routes and the qino content structure are unchanged.

There is no automated browser test suite. For UI changes, check desktop and mobile layouts in light and dark mode, article typography/code blocks, mobile navigation dismissal and focus, and gallery opening, closing, keyboard navigation, and image loading.

## Styling

`src/css/index.css` is the Tailwind entrypoint and Prettier's class-sorting reference. It explicitly scans application, component, and data code, excluding content examples. The site uses Tailwind's default palette and type scale, plus the official `@tailwindcss/typography` plugin for Markdown prose. Syntax highlighting remains in `prism.css`.

Dark mode uses the `.dark` class. The custom `site-container` utility retains the site's centered 72rem width without inheriting Tailwind's responsive container defaults.

Tailwind 4 requires Safari 16.4+, Chrome 111+, or Firefox 128+.

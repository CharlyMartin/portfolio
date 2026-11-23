// Serves page Markdown to AI agents, following qino's Next.js recipe:
// https://www.qino.works/docs/guide/agent-ready-content/next-js

// A range's parameters other than q, whose quoted values can hold `,` and `;`,
// and RFC 9110's qvalue above 0.
const OTHER_PARAMS = String.raw`(?:\s*;(?!\s*[qQ]\s*=)(?:[^;,"]|"(?:[^"\\]|\\.)*")*)*`;
const QVALUE_ABOVE_0 = String.raw`(?:1(?:\.0{0,3})?|0\.(?!0{1,3}\s*(?:[;,]|$))\d{1,3})(?=\s*(?:[;,]|$))`;

// An `Accept` header whose first range is Markdown, in lowercase, with a
// well-formed q-value above 0 or none.
const LISTS_MARKDOWN_FIRST = String.raw`^text/(?:x-)?markdown${OTHER_PARAMS}(?:\s*;\s*[qQ]\s*=\s*${QVALUE_ABOVE_0}${OTHER_PARAMS})?\s*(?:,.*)?$`;
const markdownFirstAccept = [
  { type: "header", key: "accept", value: LISTS_MARKDOWN_FIRST },
];

// Entry pages. A slug never holds a `.`, which keeps Markdown URLs and
// section llms.txt files out.
const ARTICLE_PAGE = "/articles/:slug([^/.]+)";
const PROJECT_PAGE = "/projects/:slug([^/.]+)";

// Pages with page Markdown, the route handler serving it, and its Markdown URL.
const markdownPages = [
  { source: "/", handler: "/md", markdownUrl: "/index.md" },
  { source: "/about", handler: "/md/about", markdownUrl: "/about.md" },
  { source: "/articles", handler: "/md/articles", markdownUrl: "/articles.md" },
  {
    source: ARTICLE_PAGE,
    handler: "/md/articles/:slug",
    markdownUrl: "/articles/:slug.md",
  },
  { source: "/projects", handler: "/md/projects", markdownUrl: "/projects.md" },
  {
    source: PROJECT_PAGE,
    handler: "/md/projects/:slug",
    markdownUrl: "/projects/:slug.md",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The route handlers under `/md` render on request, and read content then.
  outputFileTracingIncludes: {
    "/md": ["./public/index.md"],
    "/md/**": ["./src/content/**/*", "./src/content/.qino/**/*"],
  },
  async rewrites() {
    return {
      // `beforeFiles` runs before prerendered pages, which would answer first.
      beforeFiles: [
        // Markdown URLs, whatever the `Accept` header. `/index.md` is a static file.
        ...markdownPages
          .filter((page) => page.source != "/")
          .map((page) => ({
            source: page.markdownUrl,
            destination: page.handler,
          })),
        // Page URLs, when `Accept` lists Markdown first.
        ...markdownPages.map((page) => ({
          source: page.source,
          has: markdownFirstAccept,
          destination: page.handler,
        })),
      ],
      // Unknown pages get a Markdown 404 when Markdown is asked for.
      fallback: [
        { source: "/:path(.+\\.md)", destination: "/md/missing" },
        {
          source: "/:path*",
          has: markdownFirstAccept,
          destination: "/md/missing",
        },
      ],
    };
  },
  // Next sets an App Router page's `Vary` itself, so only `Link` is added.
  async headers() {
    return markdownPages.map(({ source, markdownUrl }) => ({
      source,
      headers: [
        {
          key: "Link",
          value: [
            `<${markdownUrl}>; rel="alternate"; type="text/markdown"`,
            source == "/" && `</llms.txt>; rel="describedby"`,
          ]
            .filter(Boolean)
            .join(", "),
        },
      ],
    }));
  },
};

module.exports = nextConfig;

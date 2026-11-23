import { type LoadPageMarkdown, negotiateMarkdown } from "@qino/cms";

// A rewritten request keeps its own URL, such as `/articles/hello`, so it's
// read as the page's Markdown URL: route handlers under `/md` always answer Markdown.
export async function servePageMarkdown(
  request: Request,
  load: LoadPageMarkdown,
) {
  const url = new URL(request.url);
  if (!url.pathname.endsWith(".md")) url.pathname += ".md";

  // Never `null`: a path ending in `.md` always wants Markdown.
  return (
    (await negotiateMarkdown(new Request(url, request), load)) ??
    new Response(null, { status: 500 })
  );
}

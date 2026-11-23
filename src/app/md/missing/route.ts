import { servePageMarkdown } from "@/lib/serve-page-markdown";

// Markdown 404 for unknown pages, from the `fallback` rewrites.
export function GET(request: Request) {
  return servePageMarkdown(request, () => null);
}

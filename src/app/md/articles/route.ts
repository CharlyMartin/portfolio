import { servePageMarkdown } from "@/lib/serve-page-markdown";
import { articleCollection } from "@/cms/articles";

// `/articles.md`, and `/articles` when `Accept` lists Markdown first.
export function GET(request: Request) {
  return servePageMarkdown(request, () => articleCollection.getPageMarkdown());
}

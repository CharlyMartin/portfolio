import { servePageMarkdown } from "@/lib/serve-page-markdown";
import { longBio } from "@/cms/bio";

// `/about.md`, and `/about` when `Accept` lists Markdown first.
export function GET(request: Request) {
  return servePageMarkdown(request, () => longBio.getPageMarkdown());
}

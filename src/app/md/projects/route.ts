import { servePageMarkdown } from "@/lib/serve-page-markdown";
import { projectsCollection } from "@/cms/projects";

// `/projects.md`, and `/projects` when `Accept` lists Markdown first.
export function GET(request: Request) {
  return servePageMarkdown(request, () => projectsCollection.getPageMarkdown());
}

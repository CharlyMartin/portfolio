import { servePageMarkdown } from "@/lib/serve-page-markdown";
import { projectsCollection } from "@/cms/projects";

type Context = { params: Promise<{ slug: string }> };

// `/projects/<slug>.md`, and `/projects/<slug>` when `Accept` lists Markdown first.
export async function GET(request: Request, ctx: Context) {
  const { slug } = await ctx.params;
  // The entry page's view, which keeps hidden projects, as their pages do.
  return servePageMarkdown(request, () =>
    projectsCollection.getPageMarkdown(slug, { view: "page" }),
  );
}

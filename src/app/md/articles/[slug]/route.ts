import { servePageMarkdown } from "@/lib/serve-page-markdown";
import { articleCollection } from "@/cms/articles";

type Context = { params: Promise<{ slug: string }> };

// `/articles/<slug>.md`, and `/articles/<slug>` when `Accept` lists Markdown first.
export async function GET(request: Request, ctx: Context) {
  const { slug } = await ctx.params;
  return servePageMarkdown(request, () =>
    articleCollection.getPageMarkdown(slug),
  );
}

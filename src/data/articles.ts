import { globSync } from "fast-glob";
import { z } from "zod";

import { parseFileContent } from "@/lib/parse-markdown";

type Filters = {
  highlight?: boolean;
};

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.date(),
  updated: z.date().optional(),
  highlight: z.boolean().optional(),
  topic: z.enum(["code", "life", "startup"]),
});

export async function getArticlesMeta(filters?: Filters) {
  const { highlight } = filters || {};
  const slugs = getAllSlugs();

  const metas = [];

  for (const slug of slugs) {
    const content = await parseFileContent("articles", `${slug}/index`);
    const metadata = metadataSchema.parse(content.metadata);
    metas.push({ slug, ...metadata });
  }

  metas.sort((a, z) => {
    return z.created.getTime() - a.created.getTime();
  });

  if (highlight) {
    return metas.filter((meta) => meta.highlight);
  }

  return metas;
}

export async function getArticle(slug: string) {
  return parseFileContent("articles", `${slug}/index`);
}

function getAllSlugs(): Array<string> {
  const files = globSync("*/index.md", { cwd: "./src/data/articles" });

  return files.map((file) => {
    return file.replace("/index.md", "");
  });
}

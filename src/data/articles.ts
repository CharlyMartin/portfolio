import { globSync } from "fast-glob";

import { parseFileContent } from "@/lib/parse-markdown";

type Filters = {
  highlight?: boolean;
};

type Metadata = {
  title: string;
  description: string;
  date: string;
  highlight?: boolean;
};

export async function getArticlesMeta(filters?: Filters) {
  const { highlight } = filters || {};
  const slugs = getAllSlugs();

  const metas = [];

  for (const slug of slugs) {
    const { metadata } = await parseFileContent("articles", slug);
    metas.push({ slug, ...(metadata as unknown as Metadata) });
  }

  // @ts-ignore
  metas.sort((a, z) => new Date(z.date) - new Date(a.date));

  if (highlight) {
    // @ts-ignore: highlight is defined in the article header
    return metas.filter((meta) => meta.highlight);
  }

  return metas;
}

export async function getArticle(slug: string) {
  return parseFileContent("articles", slug);
}

function getAllSlugs(): Array<string> {
  const files = globSync("*.md", {
    cwd: "./src/data/articles",
  });

  return files.map((file) => {
    const slug = file.replace(".md", "");
    return slug;
  });
}

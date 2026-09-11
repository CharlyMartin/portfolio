import type { MetadataRoute } from "next";
import glob from "fast-glob";
import path from "node:path";

import { articleCollection } from "@qino/articles";
import { projectsCollection } from "@qino/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, projects, articles] = await Promise.all([
    glob("**/page.tsx", {
      cwd: path.join(process.cwd(), "src/app"),
    }),
    projectsCollection.getAllSlugs(),
    articleCollection.getAllSlugs(),
  ]);

  const routes = [
    ...pages
      .filter((page) => !page.includes("["))
      .map((page) => `/${page.replace(/(^|\/)page\.tsx$/, "")}`),
    ...projects.map((slug) => `/projects/${slug}`),
    ...articles.map((slug) => `/articles/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    changeFrequency: "monthly",
  }));
}

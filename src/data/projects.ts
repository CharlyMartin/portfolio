import { z } from "zod";

import { parseFileContent } from "@/lib/parse-markdown";
import type { ProjectPreview } from "@/types";
import { projectsCollection } from "@qino/projects";

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  hq: z.string(),
  logo: z
    .object({
      src: z.string(),
      style: z
        .object({
          backgroundColor: z.string().optional(),
          padding: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  images: z.array(z.string()),
  dates: z.object({
    start: z.string(),
    end: z.string().optional(),
  }),
  url: z.string(),
  display: z.boolean(),
  highlight: z.boolean().optional(),
  roles: z.array(z.string()),
  stack: z.array(z.string()),
  people: z
    .array(z.object({ slug: z.string(), role: z.object({ slug: z.string() }) }))
    .optional(),
  status: z.enum(["live", "wip", "archived"]),
  area: z.enum(["web2", "web3", "ai"]),
  employment: z.enum(["permanent", "contract", "side"]),
});

type Filters = {
  highlight?: boolean;
};

// Getters
export async function getProjects(
  filters?: Filters
): Promise<Array<ProjectPreview>> {
  const { highlight } = filters || {};
  const slugs = await projectsCollection.getAllSlugs();

  const projects: Array<ProjectPreview> = [];

  for (const slug of slugs) {
    const content = await parseFileContent("projects", slug);
    const metadata = metadataSchema.parse(content.metadata);

    if (!metadata.display) continue;
    if (highlight && !metadata.highlight) continue;

    const { title, description, logo, dates, area } = metadata;

    projects.push({
      title,
      description,
      logo,
      dates,
      slug,
      area,
    });
  }

  return projects.sort((a, b) => {
    if (!a.dates.end) return -1;
    if (!b.dates.end) return 1;

    const endDiff = Number(b.dates.end) - Number(a.dates.end);
    if (endDiff != 0) return endDiff;

    return Number(b.dates.start) - Number(a.dates.start);
  });
}

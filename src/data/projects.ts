import path from "path";

import { globSync } from "fast-glob";
import { DateTime } from "luxon";
import sharp from "sharp";
import { z } from "zod";

import { parseFileContent } from "@/lib/parse-markdown";
import type { ProjectPreview } from "@/types";
import { getSkill } from "@/data/skills";
import { getPerson } from "@/data/people";
import { getUse } from "./uses";

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
  const slugs = getAllSlugs();

  const projects: Array<ProjectPreview> = [];

  for (const slug of slugs) {
    const content = await parseFileContent("projects", slug);
    const metadata = metadataSchema.parse(content.metadata);

    if (!metadata.display) continue;
    if (highlight && !metadata.highlight) continue;

    const { title, description, logo, dates, area } = metadata;

    projects.push({
      name: title,
      description,
      logo,
      dates: toDateRange(dates),
      slug,
      area,
    });
  }

  return projects.sort((a, b) => {
    if (!a.dates.end) return -1;
    if (!b.dates.end) return 1;

    const endDiff = b.dates.end.toMillis() - a.dates.end.toMillis();
    if (endDiff != 0) return endDiff;

    return b.dates.start.toMillis() - a.dates.start.toMillis();
  });
}

export async function getProject(slug: string) {
  if (!getAllSlugs().includes(slug)) {
    throw new Error(`No project found with slug: ${slug}`);
  }

  const content = await parseFileContent("projects", slug);
  const metadata = metadataSchema.parse(content.metadata);

  if (!metadata.display) {
    throw new Error(`Project with slug ${slug} is not displayed`);
  }

  const roles = metadata.roles.map(getSkill);
  const stack = metadata.stack.map(getUse);
  const people = metadata.people?.map((person) => {
    return { ...getPerson(person.slug), role: getSkill(person.role.slug) };
  });
  const images = await Promise.all(metadata.images.map(withImageDimensions));

  return {
    ...metadata,
    name: metadata.title,
    slug,
    dates: toDateRange(metadata.dates),
    roles,
    stack,
    people,
    images,
    html: content.html,
  };
}

function toDateRange(dates: { start: string; end?: string }) {
  return {
    start: DateTime.fromISO(dates.start),
    end: dates.end ? DateTime.fromISO(dates.end) : undefined,
  };
}

async function withImageDimensions(src: string) {
  const filePath = path.join(process.cwd(), "public", src);
  const { width, height } = await sharp(filePath).metadata();

  if (!width || !height) {
    throw new Error(`Could not read dimensions for image: ${src}`);
  }

  return { src, width, height };
}

function getAllSlugs(): Array<string> {
  const files = globSync("*.md", { cwd: "./src/data/projects" });

  return files.map((file) => file.replace(".md", ""));
}

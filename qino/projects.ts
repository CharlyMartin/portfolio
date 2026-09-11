import { z } from "zod";

import qino from ".";

import { rolesCollection } from "./roles";
import { toolsTree } from "./tools";
import path from "node:path";
import sharp from "sharp";
import { peopleCollection } from "./people";
import { DateTime } from "luxon";

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  hq: z.string(),
  logo: z
    .object({
      src: z.string().startsWith("/"),
      style: z.record(z.string()).optional(),
    })
    .optional(),
  images: z.array(z.string().startsWith("/")).default([]),
  dates: z.object({
    start: yearMonth,
    end: yearMonth.optional(),
  }),
  url: z.string().url(),
  display: z.boolean(),
  highlight: z.boolean(),
  roles: z.array(z.string()),
  stack: z.array(z.string()),
  people: z
    .array(
      z.object({
        slug: z.string(),
        role: z.object({ slug: z.string() }),
      })
    )
    .optional(),
  status: z.enum(["live", "archived", "wip"]),
  area: z.enum(["ai", "web3", "web2"]),
  employment: z.enum(["contract", "permanent", "side"]),
  body: z.string(),
});

export const projectsCollection = qino.createCollection({
  directory: "/projects",
  schema: ProjectSchema,
  extension: ".md",
  relations: {
    // TS autocomplete should trigger here
    "roles[*]": rolesCollection,
    "stack[*]": toolsTree,
    "people[*].slug": peopleCollection,
    "people[*].role.slug": rolesCollection,
  },
  views: (view) => ({
    index: view({
      resolveRelations: 1,
      augment: async (project) => {
        return {
          luxonDates: toLuxonDates(project.dates),
        };
      },
      filter: (entry) => entry.display,
      sort: (a, b) => sortDatesDesc(a.luxonDates, b.luxonDates),
    }),
    page: view({
      resolveRelations: 2,
      augment: async (project) => {
        return {
          imagesWithDimenstions: await Promise.all(
            project.images.map((src) => withImageDimensions(src))
          ),
          luxonDates: toLuxonDates(project.dates),
        };
      },
    }),
    highlight: view({
      augment: async (project) => {
        return {
          luxonDates: toLuxonDates(project.dates),
        };
      },
      filter: (entry) => entry.highlight,
      sort: (a, b) => sortDatesDesc(a.luxonDates, b.luxonDates),
    }),
  }),
});

async function withImageDimensions(src: string) {
  const filePath = path.join(process.cwd(), "public", src);
  const { width, height } = await sharp(filePath).metadata();

  if (!width || !height) {
    throw new Error(`Could not read dimensions for image: ${src}`);
  }

  return { src, width, height };
}

function toLuxonDates(dates: { start: string; end?: string }) {
  return {
    start: DateTime.fromISO(dates.start),
    end: dates.end ? DateTime.fromISO(dates.end) : undefined,
  };
}

export type ProjectDates = {
  start: DateTime;
  end?: DateTime;
};

function sortDatesDesc(a: ProjectDates, b: ProjectDates) {
  if (!a.end) return -1;
  if (!b.end) return 1;

  const endDiff = b.end.toMillis() - a.end.toMillis();
  if (endDiff != 0) return endDiff;

  return b.start.toMillis() - a.start.toMillis();
}

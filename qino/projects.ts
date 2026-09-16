import { z } from "zod";
import type { Infer } from "@qino/cms";

import qino from ".";

import { rolesCollection } from "./roles";
import { toolsCollection } from "./tools";
import path from "node:path";
import sharp from "sharp";
import { peopleCollection } from "./people";
import { DateTime } from "luxon";

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export type ZodProjectType = z.infer<typeof ProjectSchema>;
export type QinoProjectType = Infer<typeof projectsCollection>;
export type IndexProject = QinoProjectType["output"];

export const ProjectSchema = z
  .object({
    title: z.string().min(1),
    description: z.string(),
    hq: z.string(),
    logo: z
      .object({
        src: z.string().startsWith("/"),
        style: z.record(z.string(), z.string()).optional(),
      })
      .optional(),
    images: z.array(z.string().startsWith("/")).default([]),
    dates: z
      .object({
        start: yearMonth,
        end: yearMonth.optional(),
      })
      .transform((dates) => ({
        start: DateTime.fromISO(dates.start),
        end: dates.end ? DateTime.fromISO(dates.end) : undefined,
      })),
    url: z.url(),
    display: z.boolean(),
    highlight: z.boolean(),
    roles: z.array(z.string()),
    stack: z.array(z.string()),
    people: z
      .array(
        z.object({
          slug: z.string(),
          role: z.object({ slug: z.string() }),
        }),
      )
      .optional(),
    status: z.enum(["live", "archived", "wip"]),
    area: z.enum(["ai", "web3", "web2"]),
    employment: z.enum(["contract", "permanent", "side"]),
    markdown: z.string(),
  })
  .strict();

export const projectsCollection = qino.defineCollection({
  directory: "/projects",
  schema: ProjectSchema,
  extension: ".md",
  relations: {
    "roles[*]": rolesCollection,
    "stack[*]": toolsCollection,
    "people[*].slug": peopleCollection,
    "people[*].role.slug": rolesCollection,
  },
  views: (view) => {
    const base = view({
      resolveRelations: 1,
      sort: (a, b) => sortDatesDesc(a.dates, b.dates),
      filter: (entry) => entry.display,
    });

    return {
      default: base,
      highlight: view({
        ...base,
        filter: (entry) => entry.highlight && entry.display,
      }),
      page: view({
        resolveRelations: 2,
        augment: async (project) => {
          return {
            imagesWithDimenstions: await Promise.all(
              project.images.map((src) => withImageDimensions(src)),
            ),
          };
        },
      }),
    };
  },
});

async function withImageDimensions(src: string) {
  const filePath = path.join(process.cwd(), "public", src);
  const { width, height } = await sharp(filePath).metadata();

  if (!width || !height) {
    throw new Error(`Could not read dimensions for image: ${src}`);
  }

  return { src, width, height };
}

type LuxonDates = { start: DateTime; end?: DateTime };

function sortDatesDesc(a: LuxonDates, b: LuxonDates) {
  if (!a.end) return -1;
  if (!b.end) return 1;

  const endDiff = b.end.toMillis() - a.end.toMillis();
  if (endDiff != 0) return endDiff;

  return b.start.toMillis() - a.start.toMillis();
}

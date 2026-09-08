import { z } from "zod";

import qino from ".";

import { rolesCollection } from "./roles";
import { toolsTree } from "./tools";

export const JsonSlugSchema = z.string().regex(/^[\w/-]+\.json$/);
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  hq: z.string(),
  logo: z.object({
    src: z.string().startsWith("/"),
    style: z.record(z.string()).optional(),
  }),
  images: z.array(z.string().startsWith("/")).default([]),
  dates: z.object({
    start: yearMonth,
    end: yearMonth.optional(),
  }),
  url: z.string().url(),
  display: z.boolean(),
  highlight: z.boolean(),
  roles: z.array(JsonSlugSchema),
  stack: z.array(JsonSlugSchema),
  people: z.array(
    z.object({
      slug: JsonSlugSchema,
      role: z.object({ slug: JsonSlugSchema }),
    })
  ),
  status: z.enum(["live", "archived", "wip"]),
  area: z.enum(["ai", "web3", "design"]),
  employment: z.enum(["contract", "full-time", "freelance"]),
});

export const projectsCollection = qino.createCollection({
  directory: "/projects",
  schema: ProjectSchema,
  extension: ".md",
  relations: {
    // TS autocomplete should trigger here
    "roles[*]": rolesCollection,
    "stack[*]": toolsTree,
  },
});

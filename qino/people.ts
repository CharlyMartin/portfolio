import { z } from "zod";

import qino from ".";
import { JsonSlugSchema } from "./projects";

import { toolsTree } from "./tools";

const PersonSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  skills: z.array(JsonSlugSchema),
});

export const peopleCollection = qino.createCollection({
  directory: "/people",
  schema: PersonSchema,
  extension: ".md",
  relations: {
    "skills[*]": toolsTree,
  },
});

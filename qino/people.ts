import { z } from "zod";

import qino from ".";

import { rolesCollection } from "./roles";

const PersonSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  skills: z.array(z.string()),
});

export const peopleCollection = qino.createCollection({
  directory: "/people",
  schema: PersonSchema,
  extension: ".json",
  relations: {
    "skills[*]": rolesCollection,
  },
});

import { z } from "zod";

import qino from ".";

const RoleSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
});

export const rolesCollection = qino.defineCollection({
  directory: "/roles",
  schema: RoleSchema,
  extension: ".json",
});

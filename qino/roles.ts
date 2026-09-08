import { z } from "zod";

import qino from ".";

const RoleSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
});

export const rolesCollection = qino.createCollection({
  directory: "/roles",
  schema: RoleSchema,
  extension: ".md",
});

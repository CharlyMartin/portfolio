import { z } from "zod";

import qino from ".";

const BioSchema = z.object({
  body: z.string(),
});

export const shortBio = qino.createSingleton({
  file: "/bio/short.md",
  schema: BioSchema,
});

export const longBio = qino.createSingleton({
  file: "/bio/long.md",
  schema: BioSchema,
});

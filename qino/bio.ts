import { z } from "zod";

import qino from ".";

const BioSchema = z
  .object({
    markdown: z.string(),
  })
  .strict();

export const shortBio = qino.defineItem({
  file: "/bio/short.md",
  schema: BioSchema,
});

export const longBio = qino.defineItem({
  file: "/bio/long.md",
  schema: BioSchema,
});

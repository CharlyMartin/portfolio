import { z } from "zod";

import qino from ".";

export const shortBio = qino.defineItem({
  file: "bio/short.md",
  schema: z.object({}).strict(),
});

export const longBio = qino.defineItem({
  file: "bio/long.md",
  schema: z.object({ title: z.string(), description: z.string() }).strict(),
  page: "/about",
});

import { z } from "zod";
import { markdown } from "qino/utils";

import qino from ".";

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.date(),
  updated: z.date().optional(),
  highlight: z.boolean().optional(),
  topic: z.enum(["code", "life", "startup"]),
  body: z.string(),
});

export const articleCollection = qino.createCollection({
  directory: "/articles",
  schema: ArticleSchema,
  extension: ".md",
  transform: ({ body }) => ({
    _stats: markdown.stats(body),
  }),
});

import { z } from "zod";
import { markdown } from "qino/utils";

import qino from ".";

export const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.iso.date().transform((value) => new Date(value)),
  updated: z.iso
    .date()
    .optional()
    .transform((value) =>
      typeof value == "string" ? new Date(value) : undefined
    ),
  highlight: z.boolean().optional(),
  topic: z.enum(["code", "life", "startup"]),
  body: z.string(),
});

export type RawArticle = z.output<typeof ArticleSchema>;

export const articleCollection = qino.createCollection({
  directory: "/articles",
  schema: ArticleSchema,
  extension: ".md",
  augment: (article) => ({
    stats: markdown.stats(article.body),
  }),
  sort: sortDatesDesc,
  views: (view) => ({
    highlight: view({
      augment: (article) => ({
        stats: markdown.stats(article.body),
      }),
      filter: (entry) => Boolean(entry.highlight),
      sort: sortDatesDesc,
    }),
  }),
});

function sortDatesDesc(a: RawArticle, b: RawArticle) {
  return (
    (b.updated ?? b.created).getTime() - (a.updated ?? a.created).getTime()
  );
}

import { z } from "zod";

import qino from ".";

export const ArticleSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    created: z.iso.date().transform((value) => new Date(value)),
    updated: z.iso
      .date()
      .optional()
      .transform((value) =>
        typeof value == "string" ? new Date(value) : undefined,
      ),
    highlight: z.boolean().optional(),
    topic: z.enum(["code", "life", "startup"]),
    markdown: z.string(),
  })
  .strict();

type ZodOutput = z.output<typeof ArticleSchema>;

export const articleCollection = qino.defineCollection({
  directory: "/articles",
  schema: ArticleSchema,
  extension: ".md",
  views: (view) => {
    const base = view({
      sort: (a: ZodOutput, b: ZodOutput) => {
        return (
          (b.updated ?? b.created).getTime() -
          (a.updated ?? a.created).getTime()
        );
      },
    });

    return {
      default: base,
      highlight: view({ ...base, filter: (entry) => Boolean(entry.highlight) }),
    };
  },
});

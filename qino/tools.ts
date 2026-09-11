import z from "zod";

import qino from ".";

const ToolsSchema = z
  .object({
    name: z.string().min(1),
    meta: z.string().min(1),
    type: z.enum([
      "language",
      "library",
      "framework",
      "devtool",
      "productivity",
      "workspace",
      "sdk",
    ]),
    oneLiner: z.string().min(1),
    description: z.string().min(1).optional(),
    url: z.string().url(),
    highlight: z.boolean().optional(),
    favorite: z.boolean().optional(),
  })
  .strict();

export type Tool = z.infer<typeof ToolsSchema>;

export const toolsCollection = qino.createCollection({
  directory: "/tools",
  schema: ToolsSchema,
  extension: ".json",
  views: (view) => ({
    highlight: view({
      filter: (entry) => Boolean(entry.highlight),
    }),
  }),
});

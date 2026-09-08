import z from "zod";

import qino from ".";

const ToolsSchema = z
  .object({
    name: z.string().min(1),
    meta: z.string().min(1),
    oneLiner: z.string().min(1),
    description: z.string().min(1),
    url: z.string().url(),
  })
  .strict();

export const toolsTree = qino.createTree({
  directory: "/tools",
  schema: ToolsSchema,
  extension: ".json",
  titleField: "name",
});

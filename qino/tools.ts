import z from "zod";

import qino from ".";

const meta = z.enum([
  "Programming Language",
  "Web Language",
  "Query Language",
  "Web Framework",
  "UI Library",
  "Authentication Library",
  "State Management",
  "Component Library",
  "CSS Framework",
  "Code Editor",
  "Version Control",
  "Productivity Tool",
  "Web Browser",
  "Operating System",
  "Hardware",
  "Web API",
  "Code Formatter",
  "Code Linter",
  "Container Platform",
  "Database",
  "ORM",
  "Web API",
  "Blockchain SDK",
  "Animation Library",
  "BigNum Library",
  "Async State Management",
  "Data Fetching",
  "Form Management",
  "Routing",
  "Shell Tool",
  "AI Tool",
  "Bundler",
  "Code Collaboration",
  "Design Tool",
  "Build System",
  "Validation Library",
]);

const ToolsSchema = z
  .object({
    name: z.string().min(1),
    meta: meta,
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
    url: z.url(),
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
    default: view({
      sort: (a, b) =>
        Number(Boolean(b.favorite || b.highlight)) -
        Number(Boolean(a.favorite || a.highlight)),
    }),
    highlight: view({
      filter: (entry) => Boolean(entry.highlight),
    }),
  }),
});

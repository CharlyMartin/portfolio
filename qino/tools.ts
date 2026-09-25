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
  "CMS",
]);

const ToolsSchema = z
  .object({
    name: z.string().min(1),
    meta: meta,
    type: z.enum([
      "language",
      "library",
      "framework",
      "editor",
      "tooling",
      "utility",
      "productivity",
      "workspace",
      "sdk",
    ]),
    description: z.string().min(1),
    url: z.url(),
    highlight: z.boolean().optional(),
    favorite: z.boolean().optional(),
  })
  .strict();

export type Tool = z.infer<typeof ToolsSchema>;

export const toolsCollection = qino.defineCollection({
  directory: "/tools",
  schema: ToolsSchema,
  extension: ".json",

  views: (view) => ({
    default: view({
      sort: (a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    }),
    highlight: view({
      filter: (entry) => Boolean(entry.highlight),
    }),
  }),
});

import fs from "fs";
import path from "path";

import { globSync } from "fast-glob";
import { z } from "zod";

import type { Use } from "@/types";

const typeSchema = z.enum([
  "language",
  "library",
  "framework",
  "devtool",
  "productivity",
  "workspace",
  "sdk",
]);

const metadataSchema = z.object({
  name: z.string(),
  oneLiner: z.string(),
  description: z.string().optional(),
  highlight: z.boolean().optional(),
  favorite: z.boolean().optional(),
  meta: z.string(),
  url: z.string(),
});

export function getUse(slugPath: string): Use {
  const type = typeSchema.parse(path.basename(path.dirname(slugPath)));
  const slug = path.parse(slugPath).name;

  if (!getAllSlugs(type).includes(slug)) {
    throw new Error(`No tool found with slug: ${type}/${slug}`);
  }

  const source = fs.readFileSync(
    path.join(process.cwd(), "src/data/tools", type, `${slug}.json`),
    "utf8"
  );

  const metadata = metadataSchema.parse(JSON.parse(source));

  return { ...metadata, type } as Use;
}

function getAllSlugs(type: string): Array<string> {
  const files = globSync("*.json", { cwd: `./src/data/tools/${type}` });

  return files.map((file) => file.replace(".json", ""));
}

function getAllUses(): Array<Use> {
  const files = globSync("*/*.json", { cwd: "./src/data/tools" });

  return files
    .map((file) => getUse(`tools/${file}`))
    .sort((a, b) => a.name.localeCompare(b.name));
}

type Filters = {
  type?: Use["type"];
  highlight?: Use["highlight"];
};

export function getUses(filters?: Filters) {
  const { type, highlight } = filters || {};

  const data = getAllUses();

  if (type && highlight) {
    return data.filter((use) => use.type == type && use.highlight);
  }

  if (type) return data.filter((use) => use.type == type);
  if (highlight) return data.filter((use) => use.highlight);

  return data;
}

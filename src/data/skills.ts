import fs from "fs";
import path from "path";

import { globSync } from "fast-glob";
import { z } from "zod";

const metadataSchema = z.object({
  name: z.string(),
  position: z.string(),
});

export function getSkill(slugPath: string) {
  const slug = path.parse(slugPath).name;

  if (!getAllSlugs().includes(slug)) {
    throw new Error(`No skill found with slug: ${slug}`);
  }

  const source = fs.readFileSync(
    path.join(process.cwd(), "src/data/roles", `${slug}.json`),
    "utf8"
  );

  return metadataSchema.parse(JSON.parse(source));
}

function getAllSlugs(): Array<string> {
  const files = globSync("*.json", { cwd: "./src/data/roles" });

  return files.map((file) => file.replace(".json", ""));
}

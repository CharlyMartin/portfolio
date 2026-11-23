import { readFile } from "node:fs/promises";
import path from "node:path";

import { servePageMarkdown } from "@/lib/serve-page-markdown";

// `/` when `Accept` lists Markdown first. `qino build` writes `public/index.md`.
export function GET(request: Request) {
  return servePageMarkdown(request, () =>
    readFile(path.join(process.cwd(), "public/index.md"), "utf8"),
  );
}

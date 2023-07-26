// https://www.npmjs.com/package/gray-matter
// https://github.com/markedjs/marked/issues/655

import { readFileSync } from "fs";
import { join } from "path";
import { marked } from "marked";
import matter from "gray-matter";

import { addUtm } from "./add-utm";

const renderer = new marked.Renderer();

renderer.link = function addTargetToLinks(href, title, text) {
  if (!href) return "";

  const t = title || text;

  if (href.startsWith("/")) {
    return `<a href="${href}" title="${t}">${text}</a>`;
  }

  return `<a href="${addUtm(
    href
  )}" target="_blank" title="${t}" rel="noopener noreferrer">${text}</a>`;
};

const root = process.cwd();

type Location = "projects" | "bio";

type Return = {
  metadata: Record<string, string>;
  html: string;
};

export function parseFileContent(location: Location, slug: string): Return {
  const source = readFileSync(
    join(root, "src/data/", location, `${slug}.md`),
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    metadata: data,
    html: marked(content, {
      mangle: false,
      headerIds: false,
      renderer,
    }),
  };
}

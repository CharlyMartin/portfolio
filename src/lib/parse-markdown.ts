// https://www.npmjs.com/package/gray-matter

import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { unified } from "unified";
import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

import { addUtm } from "./add-utm";

const root = process.cwd();

type Location = "projects" | "bio" | "articles";

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

  const processor = unified()
    .use(remarkParse as any)
    .use(remarkGfm as any)
    .use(remarkRehype as any)
    .use(rehypeExternalLinks, {
      rel: ["noopener", "noreferrer"],
      target: "_blank",
    })
    .use(addUtmPlugin)
    .use(rehypeStringify);

  const file = processor.processSync(content);

  return {
    metadata: data,
    html: String(file),
  };
}

function addUtmPlugin() {
  return function plugin(tree: any) {
    visit(tree, "element", function updateUrl(node) {
      // Only add utm info to external links
      if (node.tagName == "a" && !node.properties.href.startsWith("/")) {
        node.properties.href = addUtm(node.properties.href);
      }
    });
  };
}

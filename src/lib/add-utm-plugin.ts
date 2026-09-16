import type { Root } from "hast";
import { visit } from "unist-util-visit";

import { addUtm } from "./add-utm";

export function addUtmPlugin() {
  return function plugin(tree: Root) {
    visit(tree, "element", function updateUrl(node) {
      if (!node.properties) return;

      const href = node.properties.href;

      // Only add utm info to external links
      if (
        node.tagName === "a" &&
        typeof href === "string" &&
        !href.startsWith("/")
      ) {
        node.properties.href = addUtm(href);
      }
    });
  };
}

import type { Root } from "hast";
import { visit } from "unist-util-visit";

// Code blocks scroll horizontally: make them reachable by keyboard.
export function focusableCodePlugin() {
  return function plugin(tree: Root) {
    let count = 0;

    visit(tree, "element", function makeFocusable(node) {
      if (node.tagName != "pre") return;
      count++;

      node.properties = {
        ...node.properties,
        tabIndex: 0,
        role: "region",
        ariaLabel: `Code block ${count}`,
      };
    });
  };
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrismPlus from "rehype-prism-plus";
import { twMerge } from "tailwind-merge";
import type { PluggableList } from "unified";

import { addUtmPlugin } from "@/lib/add-utm-plugin";

const remarkPlugins: PluggableList = [remarkGfm];
const rehypePlugins: PluggableList = [
  [rehypeExternalLinks, { rel: ["noopener", "noreferrer"], target: "_blank" }],
  addUtmPlugin,
];
const highlightedRehypePlugins: PluggableList = [
  [rehypePrismPlus, { showLineNumbers: true }],
  ...rehypePlugins,
];

type Props = {
  children: string;
  className?: string;
  highlightCode?: boolean;
};

export default function Markdown({
  children,
  className,
  highlightCode = false,
}: Props) {
  return (
    <div
      className={twMerge("prose", className)}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={highlightCode ? highlightedRehypePlugins : rehypePlugins}
        skipHtml
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

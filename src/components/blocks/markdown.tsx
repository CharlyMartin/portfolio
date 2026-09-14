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
      className={twMerge(
        "prose leading-[1.85] dark:prose-invert prose-a:text-teal-500 prose-a:hover:text-teal-600 dark:prose-a:text-teal-400 dark:prose-a:hover:text-teal-400",
        className,
      )}
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

import React from "react";
import { Metadata } from "next";

import PageLayout from "@/components/blocks/page-layout";
import { slugify } from "@/lib/slugify";
import { metadata as globalMeta } from "@/app/layout";
import { toolsCollection, type Tool as ToolType } from "@/cms/tools";
import { Tool } from "./components/tool";

const toolSections = [
  { type: "framework", title: "Frameworks" },
  { type: "library", title: "Libraries" },
  { type: "language", title: "Languages" },
  { type: "sdk", title: "SDKs" },
  { type: "devtool", title: "Dev Tools" },
  { type: "productivity", title: "Productivity" },
  { type: "workspace", title: "Workstation" },
] satisfies Array<{ type: ToolType["type"]; title: string }>;

export const metadata: Metadata = {
  ...globalMeta,
  title: "Uses",
  description: "Software I use and gadgets I love",
};

export default async function UsesPage() {
  const tools = await toolsCollection.getMany();

  return (
    <PageLayout
      title="Software I use and gadgets I love ✨"
      text="Here’s a big list of all the tools, software, and hardware I use (or used to use) to stay productive and build great things."
    >
      <div className="space-y-24">
        {toolSections.map(({ type, title }) => {
          const items = tools.filter((tool) => tool.type == type);

          if (items.length === 0) return null;

          return (
            <ToolsSection key={type} title={title}>
              {items.map((tool) => (
                <Tool key={tool.name} {...tool} />
              ))}
            </ToolsSection>
          );
        })}
      </div>
    </PageLayout>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function ToolsSection({ title, children }: SectionProps) {
  const id = slugify(title);

  return (
    <section
      id={id}
      aria-labelledby={id}
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
        >
          {title}
        </h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-12">
            {children}
          </ul>
        </div>
      </div>
    </section>
  );
}

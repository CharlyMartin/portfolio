import React from "react";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import PageLayout from "@/components/blocks/page-layout";
import { getUses } from "@/data/uses";
import { slugify } from "@/lib/slugify";
import { metadata as globalMeta } from "@/app/layout";
import { Use } from "@/types";
import A from "@/components/atoms/a";
import Icons from "@/components/atoms/icons";
import { getHostname } from "@/lib/get-hostname";

const languages = getUses({ type: "language" });
const libraries = getUses({ type: "library" });
const frameworks = getUses({ type: "framework" });
const devtools = getUses({ type: "devtool" });
const productivity = getUses({ type: "productivity" });
const hardware = getUses({ type: "workspace" });
const sdks = getUses({ type: "sdk" });

export const metadata: Metadata = {
  ...globalMeta,
  title: "Uses",
  description: "Software I use and gadgets I love",
};

export default function UsesPage() {
  return (
    <PageLayout
      title="Software I use and gadgets I love ✨"
      text="Here’s a big list of all the tools, software, and hardware I use (or used to use) to stay productive and build great things."
    >
      <div className="space-y-24">
        {frameworks.length && (
          <ToolsSection title="Frameworks">
            {frameworks.map((framework, i) => {
              return <Tool key={i} {...framework} />;
            })}
          </ToolsSection>
        )}

        {libraries.length && (
          <ToolsSection title="Librairies">
            {libraries.map((library, i) => {
              return <Tool key={i} {...library} />;
            })}
          </ToolsSection>
        )}

        {languages.length && (
          <ToolsSection title="Languages">
            {languages.map((item, i) => {
              return <Tool key={i} {...item} />;
            })}
          </ToolsSection>
        )}

        {sdks.length && (
          <ToolsSection title="SDKs">
            {sdks.map((sdk, i) => {
              return <Tool key={i} {...sdk} />;
            })}
          </ToolsSection>
        )}

        {devtools.length && (
          <ToolsSection title="Dev Tools">
            {devtools.map((tool, i) => {
              return <Tool key={i} {...tool} />;
            })}
          </ToolsSection>
        )}

        {productivity.length && (
          <ToolsSection title="Productivity">
            {productivity.map((item, i) => {
              return <Tool key={i} {...item} />;
            })}
          </ToolsSection>
        )}

        {hardware.length && (
          <ToolsSection title="Workstation">
            {hardware.map((item, i) => {
              return <Tool key={i} {...item} />;
            })}
          </ToolsSection>
        )}
      </div>
    </PageLayout>
  );
}

function ToolsSection(type: SectionProps) {
  let { children, ...props } = type;
  return (
    <Section {...props}>
      <ul role="list" className="space-y-12">
        {children}
      </ul>
    </Section>
  );
}

function Tool(props: Use) {
  const { name, url, description, oneLiner, highlight, favorite } = props;

  const text = description || oneLiner;
  const fav = highlight || favorite;

  return (
    <li className="group relative">
      <div
        className={twMerge(
          "absolute -inset-x-4 -inset-y-6 z-0 transition sm:-inset-x-6 sm:m-0.5 sm:rounded-2xl",
          fav &&
            "bg-emerald-50/30 group-hover:bg-emerald-50 dark:bg-emerald-950/30 group-hover:dark:bg-emerald-950/60",
          !fav &&
            "scale-95 bg-zinc-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50"
        )}
      />
      <A href={url}>
        <span className="relative z-10">
          {/* Title */}
          <div className="flex items-center">
            {fav && (
              <div className="mr-1.5 shrink-0">
                <Icons.Star
                  size={18}
                  className="mb-0.5 text-emerald-800 dark:!text-emerald-100/90"
                />
              </div>
            )}
            <h2
              className={twMerge(
                "text-base font-semibold tracking-tight",
                !fav && "text-zinc-800 dark:text-zinc-100",
                fav && "text-emerald-800 dark:text-emerald-100/90"
              )}
            >
              {name}
            </h2>
          </div>

          {/* Link */}
          <div
            className={twMerge(
              "-mt-0.5 flex -translate-x-5 items-center pb-3 transition group-hover:translate-x-0",
              !fav && "text-zinc-400 dark:text-zinc-500/80",
              fav && "text-emerald-600/50 dark:text-emerald-600/80"
            )}
          >
            <Icons.Link
              size={14}
              className="mr-1.5 mt-0.5 opacity-0 transition group-hover:opacity-100"
            />
            <p className="relative z-10 text-sm">{getHostname(url)}</p>
          </div>

          {/* Description */}
          <p
            className={twMerge(
              "relative z-10 text-sm",
              !fav && "text-zinc-600 dark:text-zinc-400",
              fav && "text-emerald-700 dark:text-emerald-300/80"
            )}
          >
            {text}
          </p>
        </span>
      </A>
    </li>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section(props: SectionProps) {
  let { title, children } = props;
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
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  );
}

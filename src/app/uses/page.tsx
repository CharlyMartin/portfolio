import React from "react";
import { Metadata } from "next";

import Card from "@/components/blocks/card";
import PageLayout from "@/components/blocks/page-layout";
import { getUses } from "@/data/uses";
import { slugify } from "@/lib/slugify";
import { metadata as globalMeta } from "@/app/layout";

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
      title="Software I use and gadgets I love 🤓"
      text="Here’s a big list of all the tools, software, and hardware I use (or used to use) to stay productive and build awesome things."
    >
      <div className="space-y-24">
        {languages.length && (
          <ToolsSection title="Languages">
            {languages.map((item, i) => {
              const { name, description, oneLiner } = item;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {frameworks.length && (
          <ToolsSection title="Frameworks">
            {frameworks.map((framework, i) => {
              const { name, description, oneLiner } = framework;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {libraries.length && (
          <ToolsSection title="Librairies">
            {libraries.map((library, i) => {
              const { name, description, oneLiner } = library;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {sdks.length && (
          <ToolsSection title="SDKs">
            {sdks.map((sdk, i) => {
              const { name, description, oneLiner } = sdk;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {devtools.length && (
          <ToolsSection title="Dev Tools">
            {devtools.map((item, i) => {
              const { name, description, oneLiner } = item;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {productivity.length && (
          <ToolsSection title="Productivity">
            {productivity.map((item, i) => {
              const { name, description, oneLiner } = item;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
            })}
          </ToolsSection>
        )}

        {hardware.length && (
          <ToolsSection title="Workstation">
            {hardware.map((item, i) => {
              const { name, description, oneLiner } = item;

              return (
                <Tool key={i} title={name}>
                  {description || oneLiner}
                </Tool>
              );
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

type ToolProps = {
  title: string;
  href?: string;
  children: React.ReactNode;
};

function Tool(props: ToolProps) {
  const { title, href, children } = props;

  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section(props: SectionProps) {
  let { title, children } = props;
  const id = slugify(title);

  // Add link to the source url

  return (
    <section
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

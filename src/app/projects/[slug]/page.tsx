import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import clsx from "clsx";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import Section from "@/components/blocks/section";
import Icons from "@/components/atoms/icons";
import { getProject } from "@/data/projects";
import { formatProjectDates } from "@/lib/format-date";
import { Use } from "@/types";
import Badge from "@/components/atoms/badge";
import PageTitle from "@/components/blocks/page-title";
import ProjectStatus from "@/components/blocks/project-status";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;

  const project = await getProject(params.slug);

  return {
    title: project.file.metadata.title,
    description: project.file.metadata.description,
  };
}

type Props = {
  params: { slug: string };
};

export default async function ProjectPage(props: Props) {
  const { params } = props;

  const project = await getProject(params.slug);
  const { name, dates, hq, roles, people, images, file, stack, url, status } =
    project;

  return (
    <Container>
      <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />

      <PageTitle title={name} subtitle={[formatProjectDates(dates), hq]} />

      <div className="my-8 md:my-12">
        {roles.map((item, i) => {
          const { name } = item;
          return (
            <Badge className="mb-3 mr-3" size="lg" key={i}>
              {name}
            </Badge>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        {/* Left */}
        <div className="basis-full lg:basis-4/6" id="left">
          <Image
            {...images[0]}
            placeholder="blur"
            className="image-ring rounded-2xl"
            priority
          />

          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        </div>

        {/* Right */}
        <div className="flex basis-full flex-col gap-4 lg:basis-2/6" id="right">
          <Section
            title="Stack"
            icon={Icons.Stack}
            subtitle="The technologies I worked with"
          >
            <ul className="space-y-1.5">
              {sortStack(stack).map((item, i) => {
                const { name, meta } = item;
                return <ListItem left={name} right={meta} key={i} />;
              })}
            </ul>
          </Section>

          {people && (
            <Section
              title="Team"
              icon={Icons.Team}
              subtitle="The fantastic people I worked with"
            >
              <ul className="space-y-1.5">
                {people.map((item, i) => {
                  const { name, role } = item;
                  return <ListItem left={name} right={role.name} key={i} />;
                })}
              </ul>
            </Section>
          )}

          <ProjectStatus url={url} status={status} />
        </div>
      </div>
    </Container>
  );
}

type ListItemProps = {
  left: string;
  right?: string;
};

function ListItem(props: ListItemProps) {
  const { left, right } = props;
  return (
    <li className="leading-none">
      <span className="mr-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {left}
      </span>

      {right && (
        <span className="text-sm text-zinc-400 dark:text-zinc-500">
          / {right}
        </span>
      )}
    </li>
  );
}

function sortStack(stack: Array<Use>) {
  // Sort stack by the following order:
  // 1. Languages
  // 3. Libraries
  // 4. SDK
  // 5. Rest
  return stack.sort((a, b) => {
    const aType = a.type;
    const bType = b.type;

    if (aType == bType) return 0;

    if (aType == "language") return -1;
    if (bType == "language") return 1;

    if (aType == "framework") return -1;
    if (bType == "framework") return 1;

    if (aType == "library") return -1;
    if (bType == "library") return 1;

    if (aType == "sdk") return -1;
    if (bType == "sdk") return 1;

    return 0;
  });
}

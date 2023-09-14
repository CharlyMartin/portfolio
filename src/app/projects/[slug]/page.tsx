import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import clsx from "clsx";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import Text from "@/components/atoms/text";
import Back from "@/components/atoms/back";
import Section from "@/components/blocks/section";
import Button from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import A from "@/components/atoms/a";
import { getHostname } from "@/lib/get-hostname";
import { getProject } from "@/data/projects";
import { formatProjectDates } from "@/lib/format-date";
import { Project, Use } from "@/types";

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
  const formattedDates = formatProjectDates(project.dates);

  return (
    <Container>
      <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />
      <Title className="!mb-1">{project.name}</Title>
      <Text className="text-sm">{formattedDates}</Text>

      <div className="mt-8">
        {project.roles.map((item, i) => {
          const { name } = item;
          return (
            <Badge className="mb-3 mr-3" key={i}>
              {name}
            </Badge>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 pt-12 lg:flex-row lg:gap-12">
        {/* Left */}
        <div className="basis-full lg:basis-4/6" id="left">
          <Image
            {...project.images[0]}
            placeholder="blur"
            className="image-ring rounded-xl"
            priority
          />

          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: project.file.html }}
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
              {sortStack(project.stack).map((item, i) => {
                const { name, meta } = item;
                return <ListItem left={name} right={meta} key={i} />;
              })}
            </ul>
          </Section>

          {project.people && (
            <Section
              title="Team"
              icon={Icons.Team}
              subtitle="The fantastic people I worked with"
            >
              <ul className="space-y-1.5">
                {project.people.map((item, i) => {
                  const { name, role } = item;
                  return <ListItem left={name} right={role.name} key={i} />;
                })}
              </ul>
            </Section>
          )}
          <div>
            {project.url && (
              <A href={project.url}>
                <Button variant="secondary" className="mb-2 w-full">
                  {getHostname(project.url)}
                  <Icons.Link className="mt-0.5 h-4 w-4" />
                </Button>
              </A>
            )}

            <Status status={project.status} />
          </div>
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

type BadgeProps = React.ComponentProps<"span">;

function Badge(props: BadgeProps) {
  const { children, className } = props;

  // h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-800 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800 dark:bg-zinc-800/90 dark:text-zinc-100 dark:ring-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}

type StatusProps = {
  status: Project["status"];
} & React.ComponentProps<"div">;

function Status(props: StatusProps) {
  const { status, ...rest } = props;

  return (
    <div
      className={clsx(
        "rounded-lg px-3 py-1 text-center text-sm font-medium",
        status == "live" &&
          "bg-green-200/20 text-green-600 dark:bg-green-900/10 dark:text-green-500",
        status == "archived" &&
          "bg-red-200/20 text-red-600 dark:bg-red-900/10 dark:text-red-500",
        status == "wip" &&
          "bg-purple-200/20 text-purple-600 dark:bg-purple-900/10 dark:text-purple-500",
        status == "private" &&
          "bg-blue-200/20 text-blue-600 dark:bg-blue-900/10 dark:text-blue-500"
      )}
      {...rest}
    >
      <span>
        {status == "archived" && "Archived"}
        {status == "wip" && "Coming Soon!"}
        {status == "live" && "Live"}
        {status == "private" && "Private"}
      </span>
    </div>
  );
}

function sortStack(stack: Use[]): Use[] {
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

import React from "react";
import { Metadata } from "next";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import Section from "@/components/blocks/section";
import Icons from "@/components/atoms/icons";

import { DATE_FORMATS, formatProjectDates } from "@/lib/format-date";
import Badge from "@/components/atoms/badge";
import PageTitle from "@/components/blocks/page-title";
import ProjectStatus from "@/components/blocks/project-status";
import ImageGallery from "@/components/blocks/image-gallery";
import { projectsCollection } from "@qino/projects";
import Markdown from "@/components/blocks/markdown";

export async function generateStaticParams() {
  const slugs = await projectsCollection.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const project = await projectsCollection.getOne(params.slug, {
    view: "page",
  });

  return {
    title: project.title,
    description: `${
      project.title
    } was done by Charly Martin along with ${project.people
      ?.map((item) => item.slug.name)
      ?.join(", ")}.`,
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage(props: Props) {
  const params = await props.params;

  const project = await projectsCollection.getOne(params.slug, {
    view: "page",
  });

  const {
    title: name,
    dates,
    hq,
    roles,
    people,
    imagesWithDimenstions,
    markdown,
    stack,
    url,
    status,
    employment,
  } = project;

  return (
    <Container>
      <Back className="lg:top-1.5 lg:-left-25.5 xl:absolute" href="/projects" />

      <PageTitle
        title={name}
        subtitle={[
          formatProjectDates(dates, DATE_FORMATS.PROJECT_LONG),
          employment == "contract" && "Contract",
          employment == "permanent" && "Permanent",
          employment == "side" && "Side Project",
          hq,
        ]}
      />

      <div className="my-8 md:my-12">
        {roles.map((item, i) => {
          const { name } = item;
          return (
            <Badge className="mr-2 mb-2 sm:mr-3 sm:mb-3" size="lg" key={i}>
              {name}
            </Badge>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        {/* Left */}
        <div className="basis-full lg:basis-4/6" id="left">
          {/* <Image
            {...images[0]}
            placeholder="blur"
            className="image-ring rounded-2xl"
            preload
          /> */}
          <ImageGallery images={imagesWithDimenstions} name={name} />

          <br />
          <br />

          <Markdown>{markdown}</Markdown>
        </div>

        {/* Right */}
        <div className="flex basis-full flex-col gap-4 lg:basis-2/6" id="right">
          <Section
            title="Stack"
            icon={Icons.Stack}
            subtitle="The technologies I worked with"
          >
            <ul className="space-y-1.5">
              {stack.map((item, i) => {
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
                  // Investigate how role is fetched here
                  return (
                    <ListItem
                      left={item.slug.name}
                      right={item.role.slug.name}
                      key={i}
                    />
                  );
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

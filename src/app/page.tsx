import React from "react";
import { Metadata } from "next";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import Section from "@/components/blocks/section";
import Projects from "@/components/sections/projects";
import SeeMore from "@/components/atoms/see-more";
import Separator from "@/components/atoms/separator";
import GetEmail from "@/components/blocks/get-email";
import DmOnTelegram from "@/components/blocks/dm-on-telegram";
import Icons from "@/components/atoms/icons";
import Availability from "@/components/blocks/availability";
import { getProjects } from "@/data/projects";
import { getUses } from "@/data/uses";
import Card from "@/components/blocks/card";
import { Use } from "@/types";
import { getBio } from "@/data/bio";
import Prose from "@/components/atoms/prose";
import { META } from "@/data/config";
import { metadata as globalMeta } from "@/app/layout";

export const metadata: Metadata = {
  ...globalMeta,
  title: META.title + " | " + META.name,
  description:
    "Senior software developer with nearly a decade of experience working with startups and entrepreneurs.",
};

export default function Home() {
  const projects = getProjects({ highlight: true });
  const favoriteUses = getUses({ favorite: true });
  const bio = getBio();

  return (
    <React.Fragment>
      <Container>
        <div className="max-w-2xl">
          <Title>{bio.headline}</Title>
          <Prose html={bio.short.html} className="standalone mt-8 sm:mt-12" />
          <SeeMore href="/about" className="mt-2 inline">
            Read more
          </SeeMore>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 sm:mt-14">
          <GetEmail />
          <DmOnTelegram />
        </div>
        <div className="flex justify-center pt-3 sm:block">
          <Availability />
        </div>
      </Container>

      <Separator />

      <Container id="work">
        <Section.Title icon={Icons.Work} title="Featured Projects" />
        <Projects data={projects.slice(0, 3)} className="mt-10" />

        <SeeMore href="/projects" className="mt-12">
          See all projects
        </SeeMore>
      </Container>

      <Separator />

      <Container id="stack">
        <Section.Title icon={Icons.Stack} title="Favourite Stack" />

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {favoriteUses.map((use, i) => {
            return <FavoriteUse {...use} key={i} />;
          })}
        </ul>

        <SeeMore href="/uses" className="mt-10">
          See full stack
        </SeeMore>
      </Container>
    </React.Fragment>
  );
}

type FavoriteUseProps = Use;

function FavoriteUse(props: FavoriteUseProps) {
  const { name, oneLiner, meta } = props;

  return (
    <Card as="li">
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {name}
      </h2>
      {meta && <Card.Eyebrow className="mb-2">{meta}</Card.Eyebrow>}

      <Card.Description>{oneLiner}</Card.Description>
    </Card>
  );
}

// function SocialIcons() {
//   const contacts = getContacts();

//   return (
//     <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-4">
//       <div className="flex items-center justify-center gap-6 sm:ml-1.5 sm:gap-3">
//         {contacts.map((contact, i) => {
//           const { url, icon: Icon, name, action } = contact;
//           return (
//             <SocialLink
//               key={i}
//               href={url}
//               aria-label={action}
//               icon={Icon}
//               title={name}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

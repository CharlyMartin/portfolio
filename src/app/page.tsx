import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import clsx from "clsx";

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

import image1 from "@/images/home/beach.jpeg";
import image2 from "@/images/home/forest.jpeg";
import image3 from "@/images/home/dj.jpeg";
import image4 from "@/images/home/sunset.jpeg";
import image5 from "@/images/home/ocean.jpeg";
import image6 from "@/images/home/her.jpeg";

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
          {/* Top badge */}
          <span className="mb-3 inline-flex items-baseline rounded-full bg-zinc-300/30 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-400">
            <p className="mr-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              INTERESTS
            </p>
            <p className="block sm:hidden">{bio.badge.short}</p>
            <p className="hidden sm:block">{bio.badge.long}</p>
            <p className="pl-2 pr-1">🌳</p>
            <p className="pl-1">💿</p>
          </span>

          <Title>{bio.headline}</Title>
          <Prose html={bio.short.html} className="standalone mt-8 sm:mt-12" />
          <SeeMore href="/about" className="mt-2.5 inline">
            Read more
          </SeeMore>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-16">
          <GetEmail />
          <DmOnTelegram />
        </div>
        <div className="flex justify-center pt-3 sm:block">
          <Availability />
        </div>
      </Container>

      <Photos />

      {/* <Separator /> */}

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

function Photos() {
  // TODO:
  // [ ] With or without border?
  // [ ] With or without rotation?
  // [ ] With or without shadow?
  // [ ] Which images?

  // let rotations = [
  //   "rotate-2",
  //   "-rotate-2",
  //   "rotate-2",
  //   "rotate-2",
  //   "-rotate-2",
  //   "rotate-2",
  // ];

  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="my-16 sm:my-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map(function renderImage(image, i) {
          return (
            <div
              key={image.src}
              className={clsx(
                "relative aspect-[10/10] w-36 flex-none -rotate-1 overflow-hidden rounded-xl border-2 border-zinc-100 bg-zinc-100 dark:bg-zinc-800 sm:w-52 sm:rounded-2xl"
                // rotations[i % rotations.length]
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full  object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
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

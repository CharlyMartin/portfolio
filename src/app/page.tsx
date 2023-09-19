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
import Photos from "@/components/sections/photos";
import { getArticlesMeta } from "@/data/articles";
import Article from "@/components/blocks/article";

export const metadata: Metadata = {
  ...globalMeta,
  title: META.title + " | " + META.name,
  description:
    "Senior software developer with nearly a decade of experience working with startups and entrepreneurs.",
};

export default async function Home() {
  const projects = getProjects({ highlight: true });
  const favoriteUses = getUses({ favorite: true });
  const articlesMeta = await getArticlesMeta({ highlight: true });
  const bio = await getBio();

  return (
    <React.Fragment>
      <Container>
        <div className="max-w-2xl">
          <Interests short={bio.badge.short} long={bio.badge.long} />

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

      <Container id="work">
        <Section.Title icon={Icons.Work} title="Featured Projects" />
        <Projects data={projects.slice(0, 3)} className="mt-10" />

        <SeeMore href="/projects" className="mt-12">
          See all projects
        </SeeMore>
      </Container>

      <Separator />

      {!!articlesMeta.length && (
        <Container id="articles">
          <Section.Title icon={Icons.Article} title="Featured Articles" />
          <div
            role="list"
            className="mt-10 grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2"
          >
            {articlesMeta.map((article, i) => {
              return <Article.Square {...article} key={i} />;
            })}
          </div>

          <SeeMore href="/articles" className="mt-12">
            See all articles
          </SeeMore>
        </Container>
      )}

      {!!articlesMeta.length && <Separator />}

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

type InterestProps = {
  short: string;
  long: string;
};

function Interests(props: InterestProps) {
  const { short, long } = props;

  return (
    <span className="mb-3 inline-flex items-baseline rounded-full bg-zinc-300/30 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-400">
      <p className="mr-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        INTERESTS
      </p>
      <p className="block sm:hidden">{short}</p>
      <p className="hidden sm:block">{long}</p>
      <p className="pl-2 pr-1">🌳</p>
      <p className="pl-1">💿</p>
    </span>
  );
}

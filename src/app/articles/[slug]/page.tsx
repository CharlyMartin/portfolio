import React from "react";
// import Image from "next/image";
import { Metadata } from "next";
// import clsx from "clsx";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import Text from "@/components/atoms/text";
import Back from "@/components/atoms/back";
// import Section from "@/components/blocks/section";
// import Button from "@/components/atoms/button";
// import Icons from "@/components/atoms/icons";
// import A from "@/components/atoms/a";
// import { getHostname } from "@/lib/get-hostname";
import { getArticle } from "@/data/articles";
// import { formatProjectDates } from "@/lib/format-date";
import Prose from "@/components/atoms/prose";
// import { Project, Use } from "@/types";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;

  const article = await getArticle(params.slug);

  return {
    title: article.metadata.title,
    description: article.metadata.description,
  };
}

type Props = {
  params: { slug: string };
};

export default async function ArticlePage(props: Props) {
  const { params } = props;

  const article = await getArticle(params.slug);

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />
        <Title className="!mb-1">Title</Title>
        <Text className="text-sm">Date...</Text>

        <Prose html={article.html} />
      </div>
    </Container>
  );
}

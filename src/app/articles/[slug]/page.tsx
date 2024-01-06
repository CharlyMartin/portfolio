import React from "react";
import type { Metadata } from "next";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import { getArticle } from "@/data/articles";
import Prose from "@/components/atoms/prose";
import { formatArticleDate } from "@/lib/format-date";
import PageTitle from "@/components/blocks/page-title";

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
  const { metadata, html } = article;

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />
        <PageTitle
          title={metadata.title}
          subtitle={[
            `Published on ${formatArticleDate(new Date(metadata.created))}`,
            metadata.updated &&
              `Updated on ${formatArticleDate(new Date(metadata.updated))}`,
          ]}
        />

        <br />
        {/* To replace with a header picture later on */}

        <Prose html={html} />
      </div>
    </Container>
  );
}

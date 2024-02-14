import React from "react";
import type { Metadata } from "next";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import { getArticle } from "@/data/articles";
import Prose from "@/components/atoms/prose";
import { DATE_FORMATS, formatArticleDate } from "@/lib/format-date";
import PageTitle from "@/components/blocks/page-title";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;

  const article = await getArticle(params.slug);

  return {
    title: article.title,
    description: article.description,
  };
}

type Props = {
  params: { slug: string };
};

export default async function ArticlePage(props: Props) {
  const { params } = props;

  const article = await getArticle(params.slug);
  const { title, html, topic, wordCount } = article;

  const created = formatArticleDate(article.created, DATE_FORMATS.ARTICLE_LONG);
  const updated = formatArticleDate(article.updated, DATE_FORMATS.ARTICLE_LONG);
  const formattedCount = new Intl.NumberFormat("en-US").format(wordCount);

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />
        <PageTitle
          title={title}
          subtitle={[
            `Published on ${created}`,
            article.updated && `Updated on ${updated}`,
            topic == "code" && "Code",
            topic == "life" && "Life",
            topic == "startup" && "Startups",
            `${formattedCount} words`,
          ]}
        />

        <br />
        {/* To replace with a header picture later on */}

        <Prose html={html} />
      </div>
    </Container>
  );
}

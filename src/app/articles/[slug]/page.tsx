import React from "react";
import type { Metadata } from "next";
import Markdown from "@/components/blocks/markdown";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import { DATE_FORMATS, formatArticleDate } from "@/lib/format-date";
import PageTitle from "@/components/blocks/page-title";
import { articleCollection } from "@qino/articles";
import { markdown } from "qino/utils";

export async function generateStaticParams() {
  const slugs = await articleCollection.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await articleCollection.getOne(slug);

  return {
    title: article.title,
    description: article.description,
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage(props: Props) {
  const { slug } = await props.params;
  const { title, body, topic, created, updated } =
    await articleCollection.getOne(slug);

  const formattedCreated = formatArticleDate(
    created,
    DATE_FORMATS.ARTICLE_LONG,
  );
  const formattedUpdated = formatArticleDate(
    updated,
    DATE_FORMATS.ARTICLE_LONG,
  );
  const formattedCount = new Intl.NumberFormat("en-US").format(
    markdown.stats(body).wordCount,
  );

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <Back className="lg:top-1.5 lg:-left-[102px] xl:absolute" />
        <PageTitle
          title={title}
          subtitle={[
            `Published on ${formattedCreated}`,
            updated && `Updated on ${formattedUpdated}`,
            topic == "code" && "Code",
            topic == "life" && "Life",
            topic == "startup" && "Startups",
            `${formattedCount} words`,
          ]}
        />

        <br />
        {/* To replace with a header picture later on */}

        <Markdown highlightCode>{body}</Markdown>
      </div>
    </Container>
  );
}

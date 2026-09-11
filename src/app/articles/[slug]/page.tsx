import React from "react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";

import Container from "@/components/blocks/container";
import Back from "@/components/atoms/back";
import { addUtmPlugin } from "@/lib/add-utm-plugin";
import { DATE_FORMATS, formatArticleDate } from "@/lib/format-date";
import PageTitle from "@/components/blocks/page-title";
import { articleCollection } from "@qino/articles";

export async function generateStaticParams() {
  const slugs = await articleCollection.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const article = await articleCollection.getOne(props.params.slug);

  return {
    title: article.title,
    description: article.description,
  };
}

type Props = {
  params: { slug: string };
};

export default async function ArticlePage(props: Props) {
  const { title, body, topic, created, updated, _stats } =
    await articleCollection.getOne(props.params.slug);

  const formattedCreated = formatArticleDate(
    created,
    DATE_FORMATS.ARTICLE_LONG
  );
  const formattedUpdated = formatArticleDate(
    updated,
    DATE_FORMATS.ARTICLE_LONG
  );
  const formattedCount = new Intl.NumberFormat("en-US").format(
    _stats.wordCount
  );

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <Back className="lg:-left-[102px] lg:top-1.5 xl:absolute" />
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

        <div className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypePrismPlus, { showLineNumbers: true }],
              [
                rehypeExternalLinks,
                { rel: ["noopener", "noreferrer"], target: "_blank" },
              ],
              addUtmPlugin,
            ]}
            skipHtml
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </Container>
  );
}

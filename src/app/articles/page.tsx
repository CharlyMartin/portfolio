import { Metadata } from "next";

import PageHeading from "@/components/blocks/page-layout";
// import { getArticlesMeta } from "@/data/articles";
import { metadata as globalMeta } from "@/app/layout";
import Article from "@/components/blocks/article";

import { articleCollection } from "@qino/articles";

export const metadata: Metadata = {
  ...globalMeta,
  title: "Articles",
  description: "Articles I've written about life and tech",
};

export default async function ArticlesPage() {
  const articles = await articleCollection.getAll();

  return (
    <PageHeading
      title="Writing on web development, design and life ✍️"
      text="I write mostly for myself to clarify my thoughts and document my learnings. Nonetheless, I hope you find something useful here!"
    >
      <div className="space-y-12 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        {articles.map((article) => {
          return (
            <Article.Line
              key={article._meta.slug}
              slug={article._meta.slug}
              title={article.title}
              created={new Date(article.created)}
              description={article.description}
              topic={article.topic}
              wordCount={article._stats.wordCount}
            />
          );
        })}
      </div>
    </PageHeading>
  );
}

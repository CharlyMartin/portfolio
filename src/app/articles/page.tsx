import { Metadata } from "next";

import PageHeading from "@/components/blocks/page-layout";
import { getArticlesMeta } from "@/data/articles";
import { metadata as globalMeta } from "@/app/layout";
import Article from "@/components/blocks/article";

export const metadata: Metadata = {
  ...globalMeta,
  title: "Articles",
  description: "Articles I've written about life and tech",
};

export default async function ArticlesPage() {
  const metas = await getArticlesMeta();

  return (
    <PageHeading
      title="Writing on software design, company building, and life philosophy"
      text="I'm mostly writing for myself, as a way to clarify thoughts and document my learnings. Nonetheless, I hope you find something useful here!"
    >
      <div className="space-y-12 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        {metas.map((meta, i) => {
          return <Article.Line {...meta} key={i} />;
        })}
      </div>
    </PageHeading>
  );
}

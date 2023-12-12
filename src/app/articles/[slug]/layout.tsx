import React from "react";

import Container from "@/components/blocks/container";
import Separator from "@/components/atoms/separator";
import Title from "@/components/atoms/title";
import DmOnTelegram from "@/components/blocks/dm-on-telegram";
import OpenGitHub from "@/components/blocks/open-github";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export default function ArticlePageLayout(props: Props) {
  const { children, params } = props;

  return (
    <React.Fragment>
      {children}

      <Separator />

      <Container>
        <div className="mx-auto max-w-2xl">
          <Title as="h2" className="mb-6">
            Enjoyed this article? Want to add something? Get in touch!
          </Title>

          <div className="flex flex-wrap gap-3">
            <OpenGitHub slug={`/src/data/articles/${params.slug}/index.md`} />
            <DmOnTelegram />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

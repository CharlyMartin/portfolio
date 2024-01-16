import React from "react";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import GetEmail from "@/components/blocks/get-email";
import Separator from "@/components/atoms/separator";
import Availability from "@/components/blocks/availability";
import DmTelegram from "@/components/blocks/dm-telegram";
import BookCall from "@/components/blocks/book-call";

type Props = {
  children: React.ReactNode;
};

export default function ProjectPageLayout(props: Props) {
  const { children } = props;

  return (
    <React.Fragment>
      {children}

      <Separator />

      <Container>
        <Title as="h2">
          {"Let's team up and build something meaningful together!"}
        </Title>
        <Availability className="mb-6" />

        <div className="flex flex-wrap gap-3">
          <GetEmail />
          <BookCall />
          <DmTelegram />
        </div>
      </Container>
    </React.Fragment>
  );
}

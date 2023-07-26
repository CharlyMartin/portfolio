import React from "react";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import GetEmail from "@/components/blocks/get-email";
import Separator from "@/components/atoms/separator";
import Availability from "@/components/blocks/availability";
import DmOnTelegram from "@/components/blocks/dm-on-telegram";

type Props = {
  children: React.ReactNode;
};

export default function ProjectPageLayout(props: Props) {
  const { children } = props;
  // To improve design-wise

  return (
    <React.Fragment>
      {children}

      <Separator />

      <Container>
        <Title as="h2">
          {"Let's team up and build something meaningful together!"}
        </Title>
        <Availability />

        <div className="mt-8 flex flex-wrap gap-3">
          <GetEmail />
          <DmOnTelegram />
        </div>
      </Container>
    </React.Fragment>
  );
}

import React from "react";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import Text from "@/components/atoms/text";
import GetEmail from "@/components/blocks/get-email";
import Separator from "@/components/atoms/separator";
import DmOnTelegram from "@/components/blocks/dm-on-telegram";

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
        <Title as="h2" className="mb-6">
          {"Have any questions? Feel free to get in touch!"}
        </Title>
        <Text>I reply to all emails and requests.</Text>

        <div className="flex flex-wrap gap-3">
          <GetEmail />
          <DmOnTelegram />
        </div>
      </Container>
    </React.Fragment>
  );
}

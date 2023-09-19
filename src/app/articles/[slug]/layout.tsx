import React from "react";

import Container from "@/components/blocks/container";
// import Title from "@/components/atoms/title";
// import GetEmail from "@/components/blocks/get-email";
import Separator from "@/components/atoms/separator";
// import Availability from "@/components/blocks/availability";
// import DmOnTelegram from "@/components/blocks/dm-on-telegram";

type Props = {
  children: React.ReactNode;
};

export default function ArticlePageLayout(props: Props) {
  const { children } = props;
  // To improve design-wise

  return (
    <React.Fragment>
      {children}

      <Separator />

      <Container>
        <p>TODO</p>
      </Container>
    </React.Fragment>
  );
}

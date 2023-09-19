import React from "react";

// import Container from "@/components/blocks/container";
// import Separator from "@/components/atoms/separator";

type Props = {
  children: React.ReactNode;
};

export default function ArticlePageLayout(props: Props) {
  const { children } = props;
  // To improve design-wise

  return (
    <React.Fragment>
      {children}

      {/* <Separator />

      <Container>
        <div className="mx-auto max-w-2xl">
          <p>Todo: Add comments section</p>
        </div>
      </Container> */}

      <br />
      <br />
      <br />
    </React.Fragment>
  );
}

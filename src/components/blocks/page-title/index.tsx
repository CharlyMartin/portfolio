import React from "react";

import Title from "@/components/atoms/title";
import Text from "@/components/atoms/text";

type Props = {
  title: string;
  subtitle?: Array<string> | string;
};

export default function PageTitle(props: Props) {
  const { title, subtitle } = props;

  const list = Array.isArray(subtitle) ? subtitle : [subtitle];

  return (
    <React.Fragment>
      <Title className="!mb-1.5 ">{title}</Title>
      <Text className="text-sm !text-zinc-500/80 dark:!text-zinc-400 sm:text-base">
        {list.join(" • ")}
      </Text>
    </React.Fragment>
  );
}

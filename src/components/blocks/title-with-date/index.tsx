import React from "react";

import Title from "@/components/atoms/title";
import Text from "@/components/atoms/text";

type Props = {
  title: string;
  date: string;
};

export default function TitleWithDate(props: Props) {
  const { title, date } = props;

  return (
    <React.Fragment>
      <Title className="!mb-1">{title}</Title>
      <Text className="text-xs text-zinc-400 dark:text-zinc-400">{date}</Text>
    </React.Fragment>
  );
}

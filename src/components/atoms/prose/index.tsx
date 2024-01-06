import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  html: string;
} & React.ComponentProps<"div">;

export default function Prose(props: Props) {
  const { html, className, ...rest } = props;

  return (
    <div
      className={twMerge("prose dark:prose-invert", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}

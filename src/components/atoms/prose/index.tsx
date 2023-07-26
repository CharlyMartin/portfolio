import clsx from "clsx";
import React from "react";

type Props = {
  html: string;
} & React.ComponentProps<"div">;

export default function Prose(props: Props) {
  const { html, className, ...rest } = props;

  return (
    <div
      className={clsx("prose dark:prose-invert", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}

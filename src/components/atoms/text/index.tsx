import React from "react";
import { twMerge } from "tailwind-merge";

export type Props = React.ComponentPropsWithoutRef<"p">;

export default function Text(props: Props) {
  const { className, children, ...rest } = props;

  return React.createElement(
    "p",
    {
      className: twMerge(
        "text-base text-zinc-600 dark:text-zinc-400",
        className
      ),
      ...rest,
    },
    children
  );
}

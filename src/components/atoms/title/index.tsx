import React from "react";
import clsx from "clsx";

export type Props = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & React.ComponentPropsWithoutRef<"h1">;

export default function Title(props: Props) {
  const { as = "h1", className, children, ...rest } = props;

  return React.createElement(
    as,
    {
      className: clsx(
        as == "h1" &&
          "text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-6",
        as == "h2" && "font-semibold text-zinc-800 dark:text-zinc-100 mb-1.5",
        className
      ),
      ...rest,
    },
    children
  );
}

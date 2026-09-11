import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"hr">;

export default function Separator(props: Props) {
  const { className, ...rest } = props;
  return (
    <hr
      className={twMerge(
        "container my-14 border-zinc-100 dark:border-zinc-700/40",
        className
      )}
      {...rest}
    />
  );
}

import React from "react";
import clsx from "clsx";

type Props = React.ComponentProps<"hr">;

export default function Separator(props: Props) {
  const { className, ...rest } = props;
  return (
    <hr
      className={clsx(
        "my-14 border-zinc-100 dark:border-zinc-700/40",
        className
      )}
      {...rest}
    />
  );
}

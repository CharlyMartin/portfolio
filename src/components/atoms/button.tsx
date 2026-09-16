import React from "react";
import { twMerge } from "tailwind-merge";

export type Props = {
  variant?: "primary" | "secondary" | "unstyled";
  size?: "sm" | "md";
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function Button(props: Props) {
  const { variant = "primary", size = "md", className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center rounded-md px-3 py-2 outline-offset-2 transition active:transition-none",
        variant == "primary" &&
          "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
        variant == "secondary" &&
          "bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 active:bg-zinc-200 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
        size == "sm" && "gap-2 rounded-md px-3 py-2 text-sm",
        size == "md" && "gap-2.5 rounded-lg px-4 py-2.5 text-base",
        className
      )}
      {...rest}
    />
  );
}

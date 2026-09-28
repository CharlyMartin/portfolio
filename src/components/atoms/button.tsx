import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "unstyled";
type Size = "sm" | "md";

export type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function Button(props: Props) {
  const { variant = "primary", size = "md", className, ...rest } = props;

  return (
    <button className={buttonClasses({ variant, size, className })} {...rest} />
  );
}

type ClassOptions = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function buttonClasses(options: ClassOptions = {}) {
  const { variant = "primary", size = "md", className } = options;

  return twMerge(
    "inline-flex items-center justify-center rounded-md px-3 py-2 outline-offset-2 transition active:transition-none",
    variant == "primary" &&
      "bg-zinc-800 font-semibold text-zinc-50 hover:bg-zinc-900 focus-visible:bg-zinc-900 active:bg-zinc-950 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus-visible:bg-zinc-600 dark:active:bg-zinc-500 active:translate-y-px",
    variant == "secondary" &&
      "bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700 active:translate-y-px",
    size == "sm" && "gap-2 rounded-md px-3 py-2 text-sm",
    size == "md" && "gap-2.5 rounded-lg px-4 py-2.5 text-base",
    className,
  );
}

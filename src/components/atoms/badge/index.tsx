import { twMerge } from "tailwind-merge";

type Props = {
  size: "sm" | "lg";
} & React.ComponentProps<"span">;

export default function Badge(props: Props) {
  const { children, size, className } = props;

  return (
    <span
      className={twMerge(
        "inline-flex items-center bg-zinc-200/50 font-medium dark:bg-zinc-700/80",
        size == "sm" &&
          "rounded-md px-1.5 text-xs text-zinc-800 dark:text-zinc-50",
        size == "lg" &&
          "rounded-lg px-2 py-0.5 text-sm text-zinc-700 dark:text-zinc-100 sm:px-2.5 sm:py-1",
        className
      )}
    >
      {children}
    </span>
  );
}

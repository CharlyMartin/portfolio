import { twMerge } from "tailwind-merge";

type Props = {
  size: "sm" | "lg";
} & React.ComponentProps<"span">;

export default function Badge(props: Props) {
  const { children, size, className } = props;

  return (
    <span
      className={twMerge(
        "inline-flex items-center bg-zinc-200/40 font-medium text-zinc-700 dark:bg-zinc-700/80 dark:text-zinc-100",
        size == "sm" && "rounded-md px-1.5 text-xs ",
        size == "lg" && "rounded-lg px-2 py-0.5 text-sm sm:px-2.5 sm:py-1",
        className
      )}
    >
      {children}
    </span>
  );
}

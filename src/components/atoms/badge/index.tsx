import clsx from "clsx";

type Props = {
  size: "sm" | "lg";
} & React.ComponentProps<"span">;

export default function Badge(props: Props) {
  const { children, size, className } = props;

  return (
    <span
      className={clsx(
        "inline-flex items-center bg-zinc-200/50 font-medium dark:bg-zinc-600/80",
        size == "sm" &&
          "rounded-md px-1.5 text-xs text-zinc-800 dark:text-zinc-50",
        size == "lg" &&
          "rounded-lg px-2.5 py-1 text-sm text-zinc-700 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </span>
  );
}

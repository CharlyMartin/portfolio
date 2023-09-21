import clsx from "clsx";

type Props = {
  size: "sm" | "lg";
} & React.ComponentProps<"span">;

export default function Badge(props: Props) {
  const { children, size, className } = props;

  return (
    <span
      className={clsx(
        "inline-flex items-center text-zinc-600 shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:text-zinc-300 dark:ring-white/20",
        size == "sm" &&
          "rounded-md bg-transparent px-1.5 text-xs font-medium shadow-sm",
        size == "lg" &&
          "rounded-lg bg-zinc-50 px-2 py-1 text-sm shadow dark:bg-zinc-800",
        className
      )}
    >
      {children}
    </span>
  );
}

// shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800 dark:bg-zinc-800/90 dark:text-zinc-100 dark:ring-white/10

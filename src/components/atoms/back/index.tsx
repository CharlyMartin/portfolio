"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import Icons from "@/components/atoms/icons";

type Props = {
  href?: string;
} & React.ComponentProps<"button">;

export default function Back(props: Props) {
  const { href, className } = props;

  const router = useRouter();

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className={twMerge(
        "group mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20",
        className
      )}
    >
      <Icons.Back className="h-4 w-4 stroke-zinc-500 text-zinc-500 transition group-hover:stroke-zinc-700 group-hover:text-zinc-700 dark:stroke-zinc-500 dark:text-zinc-500 dark:group-hover:stroke-zinc-400 dark:group-hover:text-zinc-400" />
    </button>
  );

  function handleClick() {
    if (href) return router.push(href);
    router.back();
  }
}

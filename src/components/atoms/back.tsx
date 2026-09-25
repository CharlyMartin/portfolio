import Link from "next/link";
import { twMerge } from "tailwind-merge";

import Icons from "@/components/atoms/icons";

type Props = {
  href: string;
  label: string;
  className?: string;
};

export default function Back(props: Props) {
  const { href, label, className } = props;

  return (
    <Link
      href={href}
      aria-label={label}
      className={twMerge(
        "group mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20",
        className,
      )}
    >
      <Icons.Back className="h-4 w-4 stroke-zinc-500 text-zinc-500 transition group-hover:stroke-zinc-700 group-hover:text-zinc-700 dark:stroke-zinc-500 dark:text-zinc-500 dark:group-hover:stroke-zinc-400 dark:group-hover:text-zinc-400" />
    </Link>
  );
}

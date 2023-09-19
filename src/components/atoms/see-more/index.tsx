import Link, { LinkProps } from "next/link";
import clsx from "clsx";

import Icons from "@/components/atoms/icons";

type Props = {
  children?: React.ReactNode;
  className?: string;
} & LinkProps;

export default function SeeMore(props: Props) {
  const { children, className, ...rest } = props;

  return (
    <Link
      {...rest}
      className={clsx(
        "relative -left-2.5 inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-2 text-xs font-medium leading-none tracking-wide text-zinc-700 transition hover:text-teal-500 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-teal-500",
        className
      )}
    >
      <span>{children}</span>
      <Icons.ArrowRightOutline className="h-3.5 w-3.5" />
    </Link>
  );
}

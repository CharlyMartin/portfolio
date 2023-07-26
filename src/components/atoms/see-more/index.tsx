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
        "inline-flex items-center gap-1.5 text-xs font-medium leading-none tracking-wide text-zinc-700 transition hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-500",
        className
      )}
    >
      <span>{children}</span>
      <Icons.ArrowRightOutline className="h-3.5 w-3.5" />
    </Link>
  );
}

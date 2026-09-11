import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import avatarImage from "@/images/avatar.jpeg";

type Props = {
  large?: boolean;
  className?: string;
} & Omit<LinkProps, "href">;

export default function Avatar(props: Props) {
  const { large = false, className, ...rest } = props;

  return (
    <Link
      href="/"
      aria-label="Home"
      className={twMerge("pointer-events-auto", className)}
      {...rest}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={twMerge(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
}

Avatar.Container = AvatarContainer;

// AvatarContainer
type ContainerProps = React.ComponentPropsWithoutRef<"div">;

function AvatarContainer(props: ContainerProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={twMerge(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10",
        className
      )}
      {...rest}
    />
  );
}

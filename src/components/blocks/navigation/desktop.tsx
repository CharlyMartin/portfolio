"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/data/routes";

// DesktopNavigation
type Props = React.ComponentPropsWithoutRef<"nav">;

export default function DesktopNavigation(props: Props) {
  const pathname = usePathname();

  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {routes.map((route, i) => {
          const { link, label, isCurrent } = route;
          return (
            <NavItem key={i} link={link} isActive={isCurrent(pathname)}>
              {label}
            </NavItem>
          );
        })}
      </ul>
    </nav>
  );
}

// NavItem
type NavItemProps = {
  link: LinkProps;
  children: React.ReactNode;
  isActive: boolean;
} & React.ComponentPropsWithoutRef<"li">;

function NavItem(props: NavItemProps) {
  const { link, children, isActive, ...rest } = props;

  return (
    <li {...rest}>
      <Link
        {...link}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "hover:text-teal-500 dark:hover:text-teal-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
}

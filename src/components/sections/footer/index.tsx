import Link, { LinkProps } from "next/link";

import Container from "../../blocks/container";
import Separator from "@/components/atoms/separator";
import { routes } from "@/data/routes";
import { META } from "@/data/config";

export default function Footer() {
  return (
    <footer>
      <Separator />

      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {routes.map((route, i) => {
              const { link, label } = route;

              return (
                <NavLink {...link} key={i}>
                  {label}
                </NavLink>
              );
            })}
          </div>

          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            {META.name} / 2015 - {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}

type NavLinkProps = {
  children: React.ReactNode;
} & LinkProps;

function NavLink(props: NavLinkProps) {
  const { children, ...link } = props;

  return (
    <Link
      {...link}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

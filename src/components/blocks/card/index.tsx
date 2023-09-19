import React from "react";
import Link, { LinkProps } from "next/link";
import clsx from "clsx";

import Icons from "@/components/atoms/icons";

type Props<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export default function Card<T extends React.ElementType = "div">(
  props: Props<T>
) {
  const { as: Component = "div", className, children } = props;

  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;

// Card Title
type CardTitleProps<T extends React.ElementType> = {
  as?: T;
  href?: LinkProps["href"];
} & React.ComponentPropsWithoutRef<T>;

function CardTitle<T extends React.ElementType = "h2">(
  props: CardTitleProps<T>
) {
  const { as: Component = "h2", href, children, className } = props;

  return (
    <Component
      className={clsx(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
    >
      {href ? <CardLink href={href}>{children}</CardLink> : children}
    </Component>
  );
}

// Card Description
type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardDescription(props: CardDescriptionProps) {
  const { children, className } = props;

  return (
    <p
      className={clsx(
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </p>
  );
}

// Card Link
type CardLinkProps = {
  children: React.ReactNode;
} & LinkProps;

function CardLink(props: CardLinkProps) {
  const { children, ...rest } = props;

  return (
    <React.Fragment>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...rest}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </React.Fragment>
  );
}

// Card Cta
type CardCtaProps = {
  children: React.ReactNode;
};

export function CardCta(props: CardCtaProps) {
  const { children } = props;

  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-zinc-400 transition-colors group-hover:text-teal-500 dark:text-zinc-500"
    >
      {children}
      <Icons.ChevronRight className="ml-1 h-3.5 w-3.5 stroke-current" />
    </div>
  );
}

// Card Eyebrow
type CardEyebrowProps<T extends React.ElementType> = {
  as?: T;
  decorate?: boolean;
  top?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export function CardEyebrow<T extends React.ElementType = "p">(
  props: CardEyebrowProps<T>
) {
  const {
    as: Component = "p",
    decorate = false,
    top = false,
    className,
    children,
    ...rest
  } = props;

  return (
    <Component
      className={clsx(
        className,
        "relative z-10 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        top && "order-first mb-3",
        decorate && "pl-3.5"
      )}
      {...rest}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-3.5 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
}

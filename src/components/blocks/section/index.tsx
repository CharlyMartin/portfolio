import React from "react";
import clsx from "clsx";

type Props = {
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
} & TitleProps &
  OutlineProps;

export default function Section(props: Props) {
  const { icon: Icon, title, subtitle, children, ...rest } = props;
  return (
    <SectionOutline {...rest}>
      <SectionTitle icon={Icon} title={title} />

      {subtitle && (
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </SectionOutline>
  );
}

Section.Title = SectionTitle;
Section.Outline = SectionOutline;

type TitleProps = {
  icon: React.FunctionComponent<any>;
  title: string;
};

function SectionTitle(props: TitleProps) {
  const { icon: Icon, title } = props;

  return (
    <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <Icon className="h-6 w-6 flex-none fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
      <span className="ml-2.5 mt-0.5">{title}</span>
    </h2>
  );
}

type OutlineProps = React.ComponentProps<"div">;

function SectionOutline(props: OutlineProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={clsx(
        "rounded-2xl border border-zinc-200/60 p-6 dark:border-zinc-700/50",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

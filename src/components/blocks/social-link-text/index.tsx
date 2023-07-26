import clsx from "clsx";

import A from "@/components/atoms/a";

type Props = {
  icon: React.FunctionComponent<any>;
  href: React.ComponentProps<"a">["href"];
} & React.ComponentProps<"li">;

export default function SocialLinkText(props: Props) {
  const { href, className, children, icon: Icon, onClick } = props;
  return (
    <li className={clsx(className, "flex")} onClick={onClick}>
      <A
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </A>
    </li>
  );
}

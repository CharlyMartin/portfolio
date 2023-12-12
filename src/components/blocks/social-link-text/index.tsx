import clsx from "clsx";

import A from "@/components/atoms/a";

type Props = {
  icon: React.FunctionComponent<any>;
  href: React.ComponentProps<"a">["href"];
  action: string;
} & React.ComponentProps<"li">;

export default function SocialLinkText(props: Props) {
  const { href, className, action, icon: Icon } = props;
  return (
    <A href={href} title={action}>
      <li
        className={clsx(
          "group rounded-2xl p-3 transition hover:bg-zinc-100/70 dark:hover:bg-zinc-700/60",
          className
        )}
      >
        <Icon
          size={24}
          className="fill-zinc-400 transition group-hover:fill-zinc-500 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
        />
      </li>
    </A>
  );
}

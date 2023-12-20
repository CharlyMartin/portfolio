import { twMerge } from "tailwind-merge";

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
        className={twMerge(
          "group rounded-xl p-2.5 transition hover:bg-zinc-100/70 dark:hover:bg-zinc-700/60",
          className
        )}
      >
        <Icon
          size={22}
          className="fill-zinc-400 transition group-hover:fill-zinc-500 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
        />
      </li>
    </A>
  );
}

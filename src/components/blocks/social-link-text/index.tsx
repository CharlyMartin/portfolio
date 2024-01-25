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
      <li className={twMerge("group p-2.5 lg:p-2", className)}>
        <span className="inline-flex items-center">
          <Icon
            size={17}
            className="text-zinc-500 transition group-hover:text-emerald-500"
          />
          <p className="pl-3.5 text-sm font-medium text-zinc-700 transition group-hover:text-emerald-400 dark:text-zinc-100/80">
            {action}
          </p>
        </span>
      </li>
    </A>
  );
}

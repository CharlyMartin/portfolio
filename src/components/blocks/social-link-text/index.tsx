import { twMerge } from "tailwind-merge";

import A from "@/components/atoms/a";
import Text from "@/components/atoms/text";

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
        <span className="flex items-center text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-300/80 dark:group-hover:text-zinc-200">
          <Icon size={18} />
          <p className="pl-3">{action}</p>
        </span>
      </li>
    </A>
  );
}

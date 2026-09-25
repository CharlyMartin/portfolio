import { twMerge } from "tailwind-merge";

import Icons from "@/components/atoms/icons";
import { buttonClasses } from "@/components/atoms/button";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const telegram = getContact("telegram");

type Props = {
  className?: string;
};

export default function DmTelegram(props: Props) {
  const { className } = props;

  return (
    <A
      href={telegram.url}
      className={buttonClasses({
        variant: "secondary",
        className: twMerge("w-full sm:w-auto", className),
      })}
    >
      {telegram.action}
      <Icons.Telegram size={18} />
    </A>
  );
}

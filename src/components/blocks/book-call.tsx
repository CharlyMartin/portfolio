import { twMerge } from "tailwind-merge";

import Icons from "@/components/atoms/icons";
import { buttonClasses } from "@/components/atoms/button";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const cal = getContact("cal");

type Props = {
  className?: string;
};

export default function BookCall(props: Props) {
  const { className } = props;

  return (
    <A
      href={cal.url}
      className={buttonClasses({
        variant: "secondary",
        className: twMerge("w-full sm:w-auto", className),
      })}
    >
      {cal.action}
      <Icons.Calendar size={18} />
    </A>
  );
}

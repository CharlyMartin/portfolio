"use client";

import { twMerge } from "tailwind-merge";

import Icons from "@/components/atoms/icons";
import Button, { Props as ButtonProps } from "@/components/atoms/button";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const cal = getContact("cal");

type Props = ButtonProps;

export default function BookCall(props: Props) {
  const { className, ...rest } = props;

  return (
    <A href={cal.url} className={twMerge("w-full sm:w-auto", className)}>
      <Button variant="secondary" className="w-full" {...rest}>
        {cal.action}
        <Icons.Calendar size={18} />
      </Button>
    </A>
  );
}

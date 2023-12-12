"use client";

import clsx from "clsx";

import Icons from "@/components/atoms/icons";
import Button, { Props as ButtonProps } from "@/components/atoms/button";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const telegram = getContact("telegram");

type Props = ButtonProps;

export default function DmOnTelegram(props: Props) {
  const { className, ...rest } = props;

  return (
    <A href={telegram.url} className={clsx("w-full sm:w-auto", className)}>
      <Button variant="secondary" className="w-full" {...rest}>
        {telegram.action}
        <Icons.Telegram size={18} />
      </Button>
    </A>
  );
}

"use client";

import clsx from "clsx";

import Icons from "@/components/atoms/icons";
import Button, { Props as ButtonProps } from "@/components/atoms/button";
import A from "@/components/atoms/a";
import { getContacts } from "@/data/contact";

type Props = ButtonProps;

export default function DmOnTelegram(props: Props) {
  const { className, ...rest } = props;
  const contacts = getContacts();

  const telegram = contacts.find((contact) => contact.name == "telegram");
  if (!telegram) throw new Error("No telegram contact found");

  return (
    <A href={telegram.url} className={clsx("w-full sm:w-auto", className)}>
      <Button variant="secondary" className="w-full" {...rest}>
        {telegram.action}
        <Icons.Telegram className="h-[18px] w-[18px]" />
      </Button>
    </A>
  );
}

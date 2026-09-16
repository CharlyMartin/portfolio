"use client";

import { twMerge } from "tailwind-merge";

import Button, { Props as ButtonProps } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { EMAIL } from "@/data/contact";

type Props = ButtonProps;

export default function GetEmail(props: Props) {
  const { className, ...rest } = props;
  const { onCopy, hasCopied } = useClipboard(EMAIL);

  return (
    <Button
      className={twMerge("w-full sm:w-[148px]", className)}
      onClick={onCopy}
      {...rest}
    >
      {hasCopied && "Copied!"}
      {!hasCopied && "Copy email"}
      {hasCopied && <Icons.Check size={18} />}
      {!hasCopied && <Icons.Clipboard size={18} />}
    </Button>
  );
}

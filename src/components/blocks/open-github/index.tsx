"use client";

import clsx from "clsx";

import Button, { Props as ButtonProps } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const github = getContact("github");

type Props = {
  slug: string;
} & ButtonProps;

// "src/data/articles/"

export default function OpenGitHub(props: Props) {
  const { className, slug, ...rest } = props;

  return (
    <A href={`${github.url}/portfolio/tree/main${slug}`}>
      <Button className={clsx("w-auto", className)} {...rest}>
        View on GitHub
        <Icons.GitHub size={18} />
      </Button>
    </A>
  );
}

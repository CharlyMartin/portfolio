"use client";

import clsx from "clsx";

import Button from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import A from "@/components/atoms/a";
import { getContact } from "@/data/contact";

const github = getContact("github");

type Props = {
  slug: string;
} & React.ComponentProps<"a">;

export default function OpenGitHub(props: Props) {
  const { className, slug, ...rest } = props;

  return (
    <A
      href={`${github.url}/portfolio/tree/main${slug}`}
      className={clsx("w-full sm:w-auto", className)}
      {...rest}
    >
      <Button className="w-full">
        View on GitHub
        <Icons.GitHub size={18} />
      </Button>
    </A>
  );
}

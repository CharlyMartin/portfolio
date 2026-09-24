import React from "react";
import { twMerge } from "tailwind-merge";

import A from "@/components/atoms/a";
import Button from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import type { ZodProjectType } from "@/cms/projects";
import { getHostname } from "@/lib/get-hostname";

type Props = {
  url: ZodProjectType["url"];
  status: ZodProjectType["status"];
};

export default function ProjectStatus(props: Props) {
  const { url, status } = props;

  if (status == "live") {
    return (
      <A href={url}>
        <Button variant="secondary" className="w-full">
          {getHostname(url)}
          <Icons.Link className="mt-0.5 h-4 w-4" />
        </Button>
      </A>
    );
  }

  if (status == "archived") {
    return (
      <Button
        variant="unstyled"
        title="Link no longer active"
        className="w-full cursor-not-allowed bg-zinc-100 font-medium text-zinc-900 opacity-50 dark:bg-zinc-800/50 dark:text-zinc-300"
        disabled
      >
        {getHostname(url)}
        <span className="sr-only">(link no longer active)</span>
        <Icons.Link className="mt-0.5 h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="unstyled"
      className={twMerge(
        "w-full cursor-not-allowed bg-zinc-50 font-medium text-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-500",
      )}
    >
      link not yet available
    </Button>
  );
}

import React from "react";

import A from "@/components/atoms/a";
import { buttonClasses } from "@/components/atoms/button";
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
      <A
        href={url}
        className={buttonClasses({ variant: "secondary", className: "w-full" })}
      >
        {getHostname(url)}
        <Icons.Link className="mt-0.5 h-4 w-4" />
      </A>
    );
  }

  if (status == "archived") {
    return (
      <p
        title="Link no longer active"
        className={buttonClasses({
          variant: "unstyled",
          className:
            "w-full cursor-not-allowed bg-zinc-100 font-medium text-zinc-600 line-through dark:bg-zinc-800/50 dark:text-zinc-400",
        })}
      >
        {getHostname(url)}
        <span className="sr-only">(link no longer active)</span>
        <Icons.Link className="mt-0.5 h-4 w-4" />
      </p>
    );
  }

  return (
    <p
      className={buttonClasses({
        variant: "unstyled",
        className:
          "w-full cursor-not-allowed bg-zinc-50 font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400",
      })}
    >
      link not yet available
    </p>
  );
}

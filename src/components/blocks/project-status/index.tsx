import React from "react";
import clsx from "clsx";

import A from "@/components/atoms/a";
import Button from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import { Project } from "@/types";
import { getHostname } from "@/lib/get-hostname";

type Props = {
  url: Project["url"];
  status: Project["status"];
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

  return (
    <Button
      variant="unstyled"
      className={clsx(
        "w-full cursor-not-allowed bg-zinc-50 font-medium text-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-500"
      )}
    >
      {status == "archived" && "link no longer available"}
      {status == "wip" && "link not yet available"}
    </Button>
  );
}

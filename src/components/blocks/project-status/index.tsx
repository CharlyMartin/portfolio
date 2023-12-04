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

type StatusProps = {
  status: Project["status"];
} & React.ComponentProps<"div">;

function Status(props: StatusProps) {
  const { status, ...rest } = props;

  return (
    <div
      className={clsx(
        "rounded-lg px-3 py-1 text-center text-sm font-medium",
        status == "live" &&
          "bg-green-200/20 text-green-600 dark:bg-green-900/10 dark:text-green-500",
        status == "archived" &&
          "bg-red-200/20 text-red-600 dark:bg-red-900/10 dark:text-red-500",
        status == "wip" &&
          "bg-purple-200/20 text-purple-600 dark:bg-purple-900/10 dark:text-purple-500"
        // status == "private" &&
        //   "bg-blue-200/20 text-blue-600 dark:bg-blue-900/10 dark:text-blue-500"
      )}
      {...rest}
    >
      <span>
        {status == "archived" && "Archived"}
        {status == "wip" && "Coming Soon!"}
        {status == "live" && "Live"}
        {/* {status == "private" && "Private"} */}
      </span>
    </div>
  );
}

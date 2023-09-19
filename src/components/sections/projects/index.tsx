import React from "react";
import clsx from "clsx";

import Project from "@/components/blocks/project";
import type { ProjectPreview } from "@/types";

type Props = {
  data: ProjectPreview[];
} & React.ComponentProps<"ul">;

export default function Projects(props: Props) {
  const { data, className, ...rest } = props;

  return (
    <ul
      role="list"
      className={clsx(
        "grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...rest}
    >
      {data.map(function renderProjects(project, i) {
        return <Project key={i} {...project} />;
      })}
    </ul>
  );
}

import React from "react";
import { twMerge } from "tailwind-merge";

import Project from "@/components/blocks/project";
import type { ProjectPreview } from "@/types";

type Props = {
  data: Array<ProjectPreview>;
} & React.ComponentProps<"ul">;

export default function Projects(props: Props) {
  const { data, className, ...rest } = props;

  return (
    <ul
      role="list"
      className={twMerge(
        "grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...rest}
    >
      {data.map(function renderProjects(project, i) {
        return (
          <li key={i}>
            <Project {...project} />
          </li>
        );
      })}
    </ul>
  );
}

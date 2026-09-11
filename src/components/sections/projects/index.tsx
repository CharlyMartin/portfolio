import React from "react";
import { twMerge } from "tailwind-merge";

import Project, {
  type Props as ProjectProps,
} from "@/components/blocks/project";
import { ProjectDates, ProjectType } from "@qino/projects";

type Props = {
  data: Array<
    ProjectType & {
      _meta: {
        slug: string;
      };
      luxonDates: ProjectDates;
    }
  >;
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
      {data.map(function renderProjects(project) {
        return (
          <li key={project._meta.slug}>
            <Project
              title={project.title}
              description={project.description}
              dates={project.luxonDates}
              area={project.area}
              logo={project.logo}
              slug={project._meta.slug}
            />
          </li>
        );
      })}
    </ul>
  );
}

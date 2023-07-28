import { Metadata } from "next";

import PageHeading from "@/components/blocks/page-layout";
import Projects from "@/components/sections/projects";
import { getProjects } from "@/data/projects";
import { metadata as globalMeta } from "@/app/layout";

export const metadata: Metadata = {
  ...globalMeta,
  title: "Projects",
  description: "Things I’ve made and contributed to",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <PageHeading
      title="Things I’ve made and contributed to 💻"
      text="I’ve worked on countless projects over the years, with startups spanning all industries and sizes. These are the ones I’m most proud of."
    >
      <Projects data={projects} />
    </PageHeading>
  );
}

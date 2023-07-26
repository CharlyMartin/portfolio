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
      text="I’ve worked on tons of projects over the years, in many industries and with startups or all sizes. These are the ones that I’m most proud of."
    >
      <Projects data={projects} />
    </PageHeading>
  );
}

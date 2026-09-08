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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageHeading
      title="Things I’ve made and contributed to 💻"
      text="I’ve worked on countless projects over the years, with startups spanning all industries. These are the ones that has made me grow the most."
    >
      <Projects data={projects} />
    </PageHeading>
  );
}

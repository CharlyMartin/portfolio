import { Metadata } from "next";

import PageHeading from "@/components/blocks/page-layout";
import Projects from "@/components/sections/projects";
import { metadata as globalMeta } from "@/app/layout";
import { projectsCollection } from "@qino/projects";

export const metadata: Metadata = {
  ...globalMeta,
  title: "Projects",
  description: "Things I’ve made and contributed to",
};

export default async function ProjectsPage() {
  const projects = await projectsCollection.getAll({ view: "index" });

  const projectsPreview = projects.sort((a, b) => {
    if (!a.dates.end) return -1;
    if (!b.dates.end) return 1;

    const endDiff = Number(b.dates.end) - Number(a.dates.end);
    if (endDiff != 0) return endDiff;

    return Number(b.dates.start) - Number(a.dates.start);
  });

  return (
    <PageHeading
      title="Things I’ve made and contributed to 💻"
      text="I’ve worked on countless projects over the years, with startups spanning all industries. These are the ones that has made me grow the most."
    >
      <Projects data={projectsPreview} />
    </PageHeading>
  );
}

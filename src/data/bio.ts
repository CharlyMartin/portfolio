import { parseFileContent } from "@/lib/parse-markdown";
import type { Bio } from "@/types";
import image from "@/images/avatar.jpeg";

const data: Bio = {
  name: "Charly",
  headline: "Senior Software Developer, ex-Founder & UI Designer",
  // headline: "Software Engineer, ex-Founder & OSS Contributor",
  // headline: "Senior Software Developer 🧑‍💻, ex-Founder ⚙️ and UI Designer 💅",
  badge: {
    long: "Projects in the sustainability or music space",
    short: "Earth re-gen / Music tech",
  },
  avatar: {
    src: image,
    alt: "Photo of Charly",
  },
};

export async function getBio() {
  const short = await parseFileContent("bio", "short");
  const long = await parseFileContent("bio", "long");

  return {
    ...data,
    short: short.html,
    long: long.html,
  };
}

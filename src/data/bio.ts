import { parseFileContent } from "@/lib/parse-markdown";
import type { Bio } from "@/types";
import image from "@/images/avatar.jpeg";

const data: Bio = {
  name: "Charly",
  headline: "Senior Software Developer, ex-Founder & UI Designer",
  // headline: "Senior Software Developer 🧑‍💻, ex-Founder ⚙️ and UI Designer 💅",
  badge: {
    long: "Looking for companies in the earth re-gen or music technology spaces",
    short: "Earth re-gen / music tech",
  },
  avatar: {
    src: image,
    alt: "Photo of Charly",
  },
};

type BioWithHtml = Bio & {
  short: ReturnType<typeof parseFileContent>;
  long: ReturnType<typeof parseFileContent>;
};

export function getBio(): BioWithHtml {
  return {
    ...data,
    short: parseFileContent("bio", "short"),
    long: parseFileContent("bio", "long"),
  };
}

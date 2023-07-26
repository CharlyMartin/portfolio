import { parseFileContent } from "@/lib/parse-markdown";
import type { Bio } from "@/types";
import image from "@/images/avatar.jpeg";

const data: Bio = {
  name: "Charly",
  headline: "Senior Software Developer 🧑‍💻, ex-Founder ⚙️ and UI Designer 💅 ", // To re-write
  avatar: {
    src: image,
    alt: "Photo of Charly",
  },
};

type BioWithHtml = Bio & {
  short: ReturnType<typeof parseFileContent>;
  long: ReturnType<typeof parseFileContent>;
};

export function getBio(): Bio & BioWithHtml {
  return {
    ...data,
    short: parseFileContent("bio", "short"),
    long: parseFileContent("bio", "long"),
  };
}

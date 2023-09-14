import { parseFileContent } from "@/lib/parse-markdown";
import type { Bio, FileContent } from "@/types";
import image from "@/images/avatar.jpeg";

const data: Bio = {
  name: "Charly",
  headline: "Senior Software Developer, ex-Founder & UI Designer",
  // headline: "Senior Software Developer 🧑‍💻, ex-Founder ⚙️ and UI Designer 💅",
  badge: {
    long: "Looking for companies in the earth re-gen or music space",
    short: "Earth re-gen / Music tech",
  },
  avatar: {
    src: image,
    alt: "Photo of Charly",
  },
};

type BioWithHtml = Bio & {
  short: FileContent;
  long: FileContent;
};

export async function getBio(): Promise<BioWithHtml> {
  const short = await parseFileContent("bio", "short");
  const long = await parseFileContent("bio", "long");

  return { ...data, short, long };
}

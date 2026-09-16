import image from "@/images/avatar.jpeg";
import { longBio, shortBio } from "@/cms/bio";

const data = {
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
} as const;

export async function getBio() {
  return {
    ...data,
    short: await shortBio.getData(),
    long: await longBio.getData(),
  };
}

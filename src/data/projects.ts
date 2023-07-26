import { parseFileContent } from "@/lib/parse-markdown";
import type { Project, ProjectPreview, ProjectWithDeps } from "@/types";
import { getSkill } from "@/data/skills";
import { getPerson } from "@/data/people";
import { getUse } from "./uses";

// 1. Lottie Studio
import lottieImg from "@/images/projects/lottie-studio/landing-1.png";
import lottieLogo from "@/images/projects/lottie-studio/logo.png";

// 2. Syncly
import synclyImg from "@/images/projects/syncly/app-8.png";
import synclyLogo from "@/images/projects/syncly/logo.png";

// 3. Immunefi
import immunefiImg from "@/images/projects/immunefi/landing-1.png";
import immunefiLogo from "@/images/projects/immunefi/logo.png";

// 4. Relief
import reliefImg from "@/images/projects/relief/landing-1.png";
import reliefLogo from "@/images/projects/relief/logo.png";

// 5. OpenWork
import openworkImg from "@/images/projects/openwork/landing-1.png";
import openworkLogo from "@/images/projects/openwork/logo.png";

// 6. MyStudiolo
import myStudioloImg from "@/images/projects/my-studiolo/app-1.png";
import myStudioloLogo from "@/images/projects/my-studiolo/logo.png";

// 7. Hubsy
import hubsyImg from "@/images/projects/hubsy/website-1.jpg";
import hubsyLogo from "@/images/projects/hubsy/logo.png";

// 8. Mayoneese
import mayoneeseLogo from "@/images/projects/mayoneese/logo.png";
import mayoneeseImg from "@/images/projects/mayoneese/landing-1.png";

// 9. Motolangage
import motolangageImg from "@/images/projects/motolangage/app-1.png";

// 10. Microchain Systems
import microchainLogo from "@/images/projects/microchain-systems/logo.png";
import microchainImg from "@/images/projects/microchain-systems/app-1.png";

// 11. ENS Everywhere
import ensLogo from "@/images/projects/ens-everywhere/logo.png";
import ensImg from "@/images/projects/ens-everywhere/app-1.png";

// Data
const data: Project[] = [
  {
    id: 1,
    name: "Lottie Studio",
    slug: "lottie-studio",
    description:
      "The design studio for high-quality web and native animations.",
    logo: {
      src: lottieLogo,
      style: { backgroundColor: "#1b2126" },
    },
    images: [{ src: lottieImg, alt: "Lottie Studio Image" }],
    dates: { start: new Date(2019, 10), end: new Date(2020, 0) },
    url: "https://lottiestudio.com/",
    display: true,
    highlight: true,
    roles: [1, 3],
    stack: [8, 9, 10, 22, 45],
    people: [
      { id: 1, role: { id: 10 } },
      { id: 2, role: { id: 4 } },
    ],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 2,
    name: "Syncly",
    slug: "syncly",
    description:
      "The real-time meeting room booking engine designed to boost sales.",
    logo: {
      src: synclyLogo,
      style: { backgroundColor: "#f3f3ff" },
    },
    images: [{ src: synclyImg, alt: "Syncly Image" }],
    dates: { start: new Date(2019, 9), end: new Date(2021, 10) },
    url: "https://www.syncly.fr",
    display: true,
    highlight: true,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 11],
    stack: [1, 3, 12, 13, 14, 16, 18, 19, 39, 40],
    people: [
      { id: 3, role: { id: 1 } },
      { id: 4, role: { id: 2 } },
    ],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 3,
    name: "Immunefi",
    slug: "immunefi",
    description:
      "Web3's leading bug bounty platform, protecting billions in user funds.",
    logo: { src: immunefiLogo },
    images: [{ src: immunefiImg, alt: "Immunefi Image" }],
    dates: { start: new Date(2021, 10), end: new Date(2022, 3) },
    url: "https://immunefi.com/",
    display: true,
    highlight: false,
    roles: [1, 2],
    stack: [1, 3, 4, 15, 23, 24, 42, 38, 36],
    people: [
      { id: 5, role: { id: 1 } },
      { id: 6, role: { id: 2 } },
      { id: 7, role: { id: 1 } },
      { id: 15, role: { id: 12 } },
    ],
    status: "live",
    areas: ["web2", "web3"],
  },
  {
    id: 4,
    name: "Relief",
    slug: "relief",
    description: "The app that destroys your debt forever.",
    logo: { src: reliefLogo, style: { padding: "12px" } },
    images: [{ src: reliefImg, alt: "Relief Image" }],
    dates: { start: new Date(2021, 3), end: new Date(2021, 4) },
    url: "https://www.relief.app/",
    display: true,
    highlight: false,
    roles: [1, 3],
    stack: [10, 3, 12, 17, 40],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 5,
    name: "OpenWork",
    slug: "openwork",
    description: "The payroll company that protects freelancers anywhere.",
    logo: { src: openworkLogo, style: { padding: "10px" } },
    images: [{ src: openworkImg, alt: "OpenWork Image" }],
    dates: { start: new Date(2020, 4), end: new Date(2021, 4) },
    url: "https://www.openwork.co/",
    display: true,
    highlight: false,
    roles: [1],
    stack: [1, 3, 29, 20, 31, 40],
    people: [
      { id: 8, role: { id: 4 } },
      { id: 9, role: { id: 3 } },
      { id: 12, role: { id: 2 } },
      { id: 13, role: { id: 1 } },
      { id: 14, role: { id: 1 } },
    ],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 6,
    name: "My Studiolo",
    slug: "my-studiolo",
    description: "The modern management tool for art collectors.",
    logo: { src: myStudioloLogo, style: { padding: "12px" } },
    images: [{ src: myStudioloImg, alt: "My Studiolo Image" }],
    dates: { start: new Date(2019, 2), end: new Date(2019, 8) },
    display: true,
    highlight: false,
    roles: [1],
    stack: [1, 26, 16, 2, 27, 28, 14, 41, 22],
    people: [
      { id: 9, role: { id: 11 } },
      { id: 8, role: { id: 4 } },
      { id: 10, role: { id: 8 } },
      { id: 4, role: { id: 2 } },
      { id: 11, role: { id: 1 } },
    ],
    status: "archived",
    areas: ["web2"],
  },
  {
    id: 7,
    name: "Hubsy",
    slug: "hubsy",
    description: "TODO",
    logo: { src: hubsyLogo, style: { padding: "8px" } },
    images: [{ src: hubsyImg, alt: "Hubsy Image" }],
    dates: { start: new Date(2018, 9), end: new Date(2018, 11) },
    url: "https://www.hubsy.fr/",
    display: false,
    highlight: false,
    roles: [1, 3, 4, 5, 8],
    stack: [10, 26, 21, 29, 9],
    people: [{ id: 3, role: { id: 11 } }],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 8,
    name: "Mayoneese",
    slug: "mayoneese",
    description: "TODO",
    logo: {
      src: mayoneeseLogo,
      style: { backgroundColor: "#EDBA2F", padding: "8px" },
    },
    images: [{ src: mayoneeseImg, alt: "Mayoneese Image." }],
    dates: { start: new Date(2019, 0), end: new Date(2019, 1) },
    // url: "https://www.mayoneese.club/",
    display: false,
    highlight: false,
    roles: [1, 3, 4, 5, 8],
    stack: [10, 26, 21, 29, 9],
    status: "archived",
    areas: ["web2"],
  },
  {
    id: 9,
    name: "Motolangage",
    slug: "motolangage",
    description:
      "A language learning experiment by the National Institute of Health and Medical Research.",
    images: [{ src: motolangageImg, alt: "Motolangage Image" }],
    dates: { start: new Date(2019, 6), end: new Date(2019, 10) },
    url: "https://www.inserm.fr/en/home/",
    display: true,
    highlight: false,
    roles: [1],
    stack: [10, 9, 2, 28, 41, 43],
    people: [{ id: 9, role: { id: 2 } }],
    status: "private",
    areas: ["web2"],
  },
  {
    id: 10,
    name: "Microchain Systems",
    slug: "microchain-systems",
    description: "The first DEX on the Fuel Network, currently on testnet.",
    logo: {
      src: microchainLogo,
      style: { backgroundColor: "#EEECE7" },
    },
    images: [{ src: microchainImg, alt: "Microchain Systems Image" }],
    dates: { start: new Date(2022, 7) },
    display: true,
    highlight: true,
    roles: [1, 4],
    stack: [1, 2, 4, 33, 34, 35, 37, 38, 40, 46],
    people: [
      { id: 15, role: { id: 12 } },
      { id: 16, role: { id: 14 } },
      { id: 17, role: { id: 14 } },
    ],
    status: "wip",
    areas: ["web3"],
  },
  {
    id: 11,
    name: "ENS Everywhere",
    slug: "ens-everywhere",
    description:
      "Register your native L2 ENS domain for a fraction of the cost.",
    logo: {
      src: ensLogo,
      style: { backgroundColor: "#F7FAFC", padding: "12px" },
    },
    images: [{ src: ensImg, alt: "ENS Everywhere Image" }],
    dates: { start: new Date(2022, 9), end: new Date(2022, 9) },
    url: "https://ens-everywhere.vercel.app/",
    display: true,
    highlight: false,
    roles: [1, 4, 3],
    stack: [1, 3, 12, 24, 40],
    people: [
      { id: 15, role: { id: 5 } },
      { id: 16, role: { id: 14 } },
    ],
    status: "archived",
    areas: ["web3"],
  },
];

type Filters = {
  highlight?: Project["highlight"];
};

// Getters
export function getProjects(filters?: Filters): ProjectPreview[] {
  const { highlight } = filters || {};

  return data
    .filter((project) => {
      if (highlight) return project.highlight;
      return true;
    })
    .filter((project) => project.display)
    .map((project) => {
      const { id, name, description, logo, dates, slug } = project;
      return { id, name, description, logo, dates, slug };
    })
    .sort((a, z) => {
      if (!a.dates.end) return -1;
      if (!z.dates.end) return 1;
      return Number(z.dates.end) - Number(a.dates.end);
    });
}

export function getProject(slug: string): ProjectWithDeps {
  const project = data.find((project) => project.slug == slug);

  if (!project) {
    throw new Error(`No project found with slug: ${slug}`);
  }

  if (!project.display) {
    throw new Error(`Project with slug ${slug} is not displayed`);
  }

  const roles = project.roles.map(getSkill);

  const people =
    project.people &&
    project.people.map((person) => {
      const { id, role } = person;
      return { ...getPerson(id), role: getSkill(role.id) };
    });

  const stack = project.stack.map(getUse);
  const file = parseFileContent("projects", project.slug);

  return { ...project, roles, stack, file, people };
}

import { parseFileContent } from "@/lib/parse-markdown";
import type { Project, ProjectPreview } from "@/types";
import { getSkill } from "@/data/skills";
import { getPerson } from "@/data/people";
import { getUse } from "./uses";

// 1. Lottie Studio
import lottieLogo from "@/images/projects/lottie-studio/logo.png";
import lottieImg1 from "@/images/projects/lottie-studio/landing-1.png";
import lottieImg2 from "@/images/projects/lottie-studio/landing-2.png";

// 2. Syncly
import synclyLogo from "@/images/projects/syncly/logo.png";
import synclyImg1 from "@/images/projects/syncly/app-8.png";
import synclyImg2 from "@/images/projects/syncly/app-1.png";
import synclyImg3 from "@/images/projects/syncly/app-2.png";
import synclyImg4 from "@/images/projects/syncly/app-3.png";
import synclyImg5 from "@/images/projects/syncly/app-4.png";
import synclyImg6 from "@/images/projects/syncly/app-5.png";
import synclyImg7 from "@/images/projects/syncly/app-6.png";
import synclyImg8 from "@/images/projects/syncly/app-7.png";

// 3. Immunefi
import immunefiImg1 from "@/images/projects/immunefi/landing-1.png";
import immunefiImg2 from "@/images/projects/immunefi/app-1.png";
import immunefiImg3 from "@/images/projects/immunefi/app-2.png";
import immunefiLogo from "@/images/projects/immunefi/logo.png";

// 4. Relief
import reliefLogo from "@/images/projects/relief/logo.png";
import reliefImg1 from "@/images/projects/relief/landing-1.png";
import reliefImg2 from "@/images/projects/relief/app-1.png";
import reliefImg3 from "@/images/projects/relief/app-2.png";

// 5. OpenWork
import openworkImg from "@/images/projects/openwork/landing-1.png";
import openworkLogo from "@/images/projects/openwork/logo.png";

// 6. MyStudiolo
import myStudioloLogo from "@/images/projects/my-studiolo/logo.png";
import myStudioloImg1 from "@/images/projects/my-studiolo/app-1.png";
import myStudioloImg2 from "@/images/projects/my-studiolo/app-2.png";
import myStudioloImg3 from "@/images/projects/my-studiolo/app-3.png";

// 7. Hubsy
import hubsyLogo from "@/images/projects/hubsy/logo.png";
import hubsyImg1 from "@/images/projects/hubsy/website-1.jpg";

// 8. Mayoneese
import mayoneeseLogo from "@/images/projects/mayoneese/logo.png";
import mayoneeseImg from "@/images/projects/mayoneese/landing-1.png";

// 9. Motolangage
import motolangageImg from "@/images/projects/motolangage/app-1.png";

// 10. Microchain Systems
import microchainLogo from "@/images/projects/microchain-systems/logo.png";
import microchainImg1 from "@/images/projects/microchain-systems/app-1.png";
import microchainImg2 from "@/images/projects/microchain-systems/app-2.png";

// 11. ENS Everywhere
import ensLogo from "@/images/projects/ens-everywhere/logo.png";
import ensImg1 from "@/images/projects/ens-everywhere/app-1.png";
import ensImg2 from "@/images/projects/ens-everywhere/app-2.png";

// 12. Cofactory
import cofactoryLogo from "@/images/projects/cofactory/logo.jpg";
import cofactoryImg1 from "@/images/projects/cofactory/figma-1.png";
// import cofactoryImg2 from "@/images/projects/cofactory/figma-2.png";
import cofactoryImg3 from "@/images/projects/cofactory/figma-3.png";

// Data
const data: Array<Project> = [
  {
    id: 1,
    name: "Lottie Studio",
    slug: "lottie-studio",
    hq: "Montreal, Canada",
    description:
      "The design studio for high-quality web and native animations.",
    logo: {
      src: lottieLogo,
      style: { backgroundColor: "#1b2126" },
    },
    images: [
      { src: lottieImg1, alt: "Lottie Studio Image" },
      { src: lottieImg2, alt: "Lottie Studio Image" },
    ],
    dates: { start: new Date(2019, 10), end: new Date(2020, 1) },
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
    hq: "Paris, France",
    description:
      "The real-time booking engine designed to boost meeting room sales.",
    logo: {
      src: synclyLogo,
      style: { backgroundColor: "#f3f3ff" },
    },
    images: [
      { src: synclyImg1, alt: "Syncly Image" },
      { src: synclyImg2, alt: "Syncly Image" },
      { src: synclyImg3, alt: "Syncly Image" },
      { src: synclyImg4, alt: "Syncly Image" },
      { src: synclyImg5, alt: "Syncly Image" },
      { src: synclyImg6, alt: "Syncly Image" },
      { src: synclyImg7, alt: "Syncly Image" },
      { src: synclyImg8, alt: "Syncly Image" },
    ],
    dates: { start: new Date(2019, 9), end: new Date(2021, 10) },
    url: "https://www.syncly.fr",
    display: true,
    highlight: true,
    roles: [1, 2, 3, 4, 5, 6, 8, 11, 12, 13],
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
    hq: "Lisbon, Portugal",
    description:
      "Web3's leading bug bounty platform, protecting billions in user funds.",
    logo: { src: immunefiLogo },
    images: [
      { src: immunefiImg1, alt: "Immunefi Image" },
      { src: immunefiImg2, alt: "Immunefi Image" },
      { src: immunefiImg3, alt: "Immunefi Image" },
    ],
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
    hq: "Miami, USA",
    description:
      "The app navigating you through financial hurdles in a simple way.",
    logo: { src: reliefLogo, style: { padding: "12px" } },
    images: [
      { src: reliefImg1, alt: "Relief Image" },
      { src: reliefImg2, alt: "Relief Image" },
      { src: reliefImg3, alt: "Relief Image" },
    ],
    dates: { start: new Date(2021, 3), end: new Date(2021, 4) },
    url: "https://www.relief.app/",
    display: true,
    highlight: false,
    roles: [1, 3],
    stack: [10, 3, 12, 17, 40],
    people: [{ id: 22, role: { id: 11 } }],
    status: "live",
    areas: ["web2"],
  },
  {
    id: 5,
    name: "OpenWork",
    slug: "openwork",
    hq: "Paris, France",
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
    hq: "Paris, France",
    description: "The modern management tool for art collectors.",
    logo: { src: myStudioloLogo, style: { padding: "12px" } },
    images: [
      { src: myStudioloImg1, alt: "My Studiolo Image" },
      { src: myStudioloImg2, alt: "My Studiolo Image" },
      { src: myStudioloImg3, alt: "My Studiolo Image" },
    ],
    dates: { start: new Date(2019, 2), end: new Date(2019, 8) },
    url: "https://www.mystudiolo.com/",
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
    hq: "Paris, France",
    description: "TODO",
    logo: { src: hubsyLogo, style: { padding: "8px" } },
    images: [{ src: hubsyImg1, alt: "Hubsy Image" }],
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
    hq: "Paris, France",
    description: "The curated music newsletter that makes you come alive.",
    logo: {
      src: mayoneeseLogo,
      style: { backgroundColor: "#EDBA2F", padding: "8px" },
    },
    images: [{ src: mayoneeseImg, alt: "Mayoneese Image." }],
    dates: { start: new Date(2018, 9), end: new Date(2019, 6) },
    url: "https://mayoneese.netlify.app/",
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
    hq: "Paris, France",
    description:
      "A language learning experiment by the French National Institute Research.",
    images: [{ src: motolangageImg, alt: "Motolangage Image" }],
    dates: { start: new Date(2019, 6), end: new Date(2019, 10) },
    url: "https://www.inserm.fr/en/home/",
    display: false,
    highlight: false,
    roles: [1],
    stack: [10, 9, 2, 28, 41],
    people: [{ id: 9, role: { id: 2 } }],
    status: "archived",
    areas: ["web2"],
  },
  {
    id: 10,
    name: "Microchain Systems",
    slug: "microchain-systems",
    hq: "Lisbon, Portugal",
    description: "The first DEX on the Fuel Network, currently on testnet.",
    logo: {
      src: microchainLogo,
      style: { backgroundColor: "#EEECE7" },
    },
    images: [
      { src: microchainImg1, alt: "Microchain Systems Image" },
      { src: microchainImg2, alt: "Microchain Systems Image" },
    ],
    dates: { start: new Date(2022, 7), end: new Date(2023, 7) },
    display: true,
    highlight: true,
    url: "https://microchain.systems/",
    roles: [1, 4],
    stack: [1, 2, 4, 33, 34, 35, 37, 38, 40, 46],
    people: [
      { id: 15, role: { id: 12 } },
      { id: 16, role: { id: 14 } },
      { id: 17, role: { id: 14 } },
    ],
    status: "live",
    areas: ["web3"],
  },
  {
    id: 11,
    name: "ENS Everywhere",
    slug: "ens-everywhere",
    hq: "Lisbon, Portugal",
    description:
      "Register your native L2 ENS domain for a fraction of the cost.",
    logo: {
      src: ensLogo,
      style: { backgroundColor: "#F7FAFC", padding: "12px" },
    },
    images: [{ src: ensImg1, alt: "ENS Everywhere Image" }],
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
  {
    id: 12,
    name: "Cofactory",
    slug: "cofactory",
    hq: "San Francisco, USA",
    description: " The future of value creation in an AI-based economy.",
    logo: {
      src: cofactoryLogo,
      style: { backgroundColor: "#000", padding: "10px" },
    },
    images: [
      { src: cofactoryImg1, alt: "Cofactory Image" },
      // { src: cofactoryImg2, alt: "Cofactory Image" },
      { src: cofactoryImg3, alt: "Cofactory Image" },
    ],
    dates: { start: new Date(2023, 9), end: new Date(2023, 11) },
    url: "https://cofactory.ai/",
    display: true,
    highlight: true,
    roles: [1, 2, 11, 12],
    stack: [1, 3, 4, 15, 40, 16, 53, 54, 55],
    people: [
      { id: 18, role: { id: 2 } },
      { id: 19, role: { id: 5 } },
      { id: 20, role: { id: 15 } },
      { id: 21, role: { id: 12 } },
    ],
    status: "live",
    areas: ["ai"],
  },
];

type Filters = {
  highlight?: Project["highlight"];
};

// Getters
export function getProjects(filters?: Filters): Array<ProjectPreview> {
  const { highlight } = filters || {};

  return data
    .filter((project) => {
      if (highlight) return project.highlight;
      return true;
    })
    .filter((project) => project.display)
    .map((project) => {
      const { id, name, description, logo, dates, slug, areas } = project;
      return { id, name, description, logo, dates, slug, areas };
    })
    .sort((a, z) => {
      if (!a.dates.end) return -1;
      if (!z.dates.end) return 1;
      return Number(z.dates.end) - Number(a.dates.end);
    });
}

export async function getProject(slug: string) {
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
  const file = await parseFileContent("projects", project.slug);

  return { ...project, roles, stack, html: file.html, people };
}

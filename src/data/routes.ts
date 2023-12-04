import { Route } from "@/types";

export const routes: Array<Route> = [
  { link: { href: "/" }, label: "Home" },
  { link: { href: "/projects" }, label: "Projects" },
  // { link: { href: "/training" }, label: "Training" }, // V2
  { link: { href: "/about" }, label: "About" },
  // { link: { href: "/blog" }, label: "Blog" }, // V2
  { link: { href: "/uses" }, label: "Uses" },
];

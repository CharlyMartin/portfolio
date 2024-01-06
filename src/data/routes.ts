import { Route } from "@/types";

export const routes: Array<Route> = [
  {
    link: { href: "/" },
    label: "Home",
    isCurrent: (href) => href == "/",
  },
  {
    link: { href: "/projects" },
    label: "Projects",
    isCurrent: (href) => href.startsWith("/projects"),
  },
  {
    link: { href: "/articles" },
    label: "Articles",
    isCurrent: (href) => href.startsWith("/articles"),
  },
  // { link: { href: "/training" }, label: "Training" }, // V2
  {
    link: { href: "/about" },
    label: "About",
    isCurrent: (href) => href == "/about",
  },
  // { link: { href: "/blog" }, label: "Blog" }, // V2
  {
    link: { href: "/uses" },
    label: "Uses",
    isCurrent: (href) => href == "/uses",
  },
];

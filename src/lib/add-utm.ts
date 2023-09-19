import { META } from "@/data/config";

export function addUtm(href: string | null | undefined): string {
  if (!href) return "";

  const url = new URL(href);
  url.searchParams.set("utm_source", META.name.replace(" ", "_").toLowerCase());
  url.searchParams.set("utm_medium", "link");

  return url.toString();
}

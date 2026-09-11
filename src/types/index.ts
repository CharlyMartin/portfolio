import React from "react";
import type { LinkProps } from "next/link";

// INTERNAL USE
export type Availability = "available" | "limited" | "busy";

export type Route = {
  link: LinkProps;
  label: string;
  isCurrent: (href: string) => boolean;
};

export type Contact = {
  id: "telegram" | "github" | "linkedin" | "email" | "cal";
  name: string;
  url: string;
  action: string;
  icon: React.FunctionComponent<any>;
};

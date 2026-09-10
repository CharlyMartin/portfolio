import React from "react";
import type { ImageProps } from "next/image";
import type { LinkProps } from "next/link";
import type { DateTime } from "luxon";
import { ProjectSchema } from "@qino/projects";
import { z } from "zod";

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

export type Bio = {
  name: string;
  headline: string;
  badge: { short: string; long: string };
  avatar: ImageProps;
};

// DATA MODEL (exposed via API routes)
export type Project = z.infer<typeof ProjectSchema>;

export type ProjectPreview = Pick<
  Project,
  "title" | "description" | "logo" | "dates" | "area"
> & {
  _meta: {
    slug: string;
  };
};

export type Use = {
  name: string;
  oneLiner: string;
  description?: string;
  highlight?: boolean;
  favorite?: boolean;
  meta:
    | "Programming Language"
    | "Web Language"
    | "Query Language"
    | "Web Framework"
    | "UI Library"
    | "Authentication Library"
    | "State Management"
    | "Component Library"
    | "CSS Framework"
    | "Code Editor"
    | "Version Control"
    | "Productivity Tool"
    | "Web Browser"
    | "Operating System"
    | "Hardware"
    | "Web API"
    | "Code Formatter"
    | "Code Linter"
    | "Container Platform"
    | "Database"
    | "ORM"
    | "Web API"
    | "Blockchain SDK"
    | "Animation Library"
    | "BigNum Library"
    | "Async State Management"
    | "Data Fetching"
    | "Form Management"
    | "Routing"
    | "Shell Tool"
    | "AI Tool"
    | "Bundler"
    | "Code Collaboration"
    | "Design Tool"
    | "Build System"
    | "Validation Library";
  url: string;
  type:
    | "language"
    | "library"
    | "framework"
    | "devtool"
    | "productivity"
    | "workspace"
    | "sdk";
};

export type Skill = {
  id: number;
  name: string;
  position: string;
};

export type People = {
  id: number;
  name: string;
  image?: ImageProps;
  description: string;
  // location?: string;
  url?: string;
  skills: Array<Skill["id"]>;
};
// language: "TypeScript", "HTML", "CSS"...
// library: "Next.js", "React", "TailwindCSS"...
// devtool: "VSCode", "Git", "GitHub", "CoPilot"... & Plugins (browser or VSCode): "TailwindCSS Intellisense", "Prettier", "ESLint"...
// productivity: "Notion", "Todoist", "Pocket"...
// workspace: "MacBook Pro", "Magic Keyboard", "Magic Mouse"...
// SDK: "Stripe", "Firebase", "Supabase"... (Web API wrapper)

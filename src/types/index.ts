import React from "react";
import type { ImageProps } from "next/image";
import type { LinkProps } from "next/link";

// INTERNAL USE
export type Availability = "available" | "limited" | "busy";

export type Route = {
  link: LinkProps;
  label: string;
  isCurrent: (href: string) => boolean;
};

export type Contact = {
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

type Area = "web2" | "web3" | "ai";

export type FileContent = {
  metadata: Record<string, string>;
  html: string;
};

// DATA MODEL (exposed via API routes)
export type Project = {
  id: number;
  name: string;
  slug: string;
  hq: string;
  description: string;
  logo?: { src: ImageProps["src"]; style?: React.CSSProperties };
  images: Array<ImageProps>;
  dates: { start: Date; end?: Date };
  highlight?: boolean; // Whether or not to highlight the project on the home page
  url: string; // The URL of the project. If not provided, the project is shown as "archived".
  status: "live" | "wip" | "archived";
  areas: Array<Area>; // Whether I worked on the web2 or web3 part
  display: boolean; // Whether or not to display the project on the projects page
  stack: Array<Use["id"]>;
  roles: Array<Skill["id"]>;
  people?: Array<{ id: People["id"]; role: { id: Skill["id"] } }>;
};

export type ProjectWithDeps = Omit<Project, "roles" | "people" | "stack"> & {
  file: FileContent;
  roles: Array<Skill>;
  stack: Array<Use>;
  people?: Array<People & { role: Skill }>;
};

export type ProjectPreview = Pick<
  Project,
  "id" | "name" | "description" | "logo" | "dates" | "slug" | "areas"
>;

export type Use = {
  id: number;
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
    | "External Monitor";
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

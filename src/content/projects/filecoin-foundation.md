---
title: Filecoin Foundation
description: "The nonprofit working to grow Filecoin, the decentralized storage network."
hq: "San Francisco, USA"
logo:
  src: /images/logos/filecoin-foundation-logo.webp
  style:
    padding: "0px"
    backgroundColor: "#08072e"
images:
  - /images/projects/filecoin-foundation/filecoin-foundation-1.webp
  - /images/projects/filecoin-foundation/filecoin-foundation-2.webp
  - /images/projects/filecoin-foundation/filecoin-foundation-3.webp
  - /images/projects/filecoin-foundation/filecoin-foundation-4.webp
  - /images/projects/filecoin-foundation/filecoin-foundation-5.webp
  - /images/projects/filecoin-foundation/filecoin-foundation-6.webp
dates:
  start: "2024-04"
  end: "2025-05"
url: "https://fil.org/"
display: true
highlight: false
roles:
  - "roles/frontend.json"
  - "roles/backend.json"
  - "roles/devops.json"
stack:
  - "tools/turborepo.json"
  - "tools/typescript.json"
  - "tools/next.json"
  - "tools/tailwind-css.json"
  - "tools/headless-ui.json"
  - "tools/swr.json"
  - "tools/react-hook-form.json"
  - "tools/zod.json"
people:
  - slug: "people/mirha-masala.json"
    role:
      slug: "roles/eng-management.json"
  - slug: "people/filipa-ribeiro.json"
    role:
      slug: "roles/product-design.json"
  - slug: "people/barbara-peric.json"
    role:
      slug: "roles/frontend.json"
  - slug: "people/gary-moran.json"
    role:
      slug: "roles/branding.json"
status: live
area: web2
employment: contract
---

Filecoin Foundation stewards the growth of the Filecoin network, a decentralized storage protocol. Their flagship site, fil.org, was still running on Webflow, which had become a bottleneck for performance and for the amount of content the team needed to publish and maintain. I was hired in April 2024 to lead a full revamp of the site, moving it off Webflow onto a codebase the team could actually own and iterate on.

I worked across the stack, rebuilding the site on [Next.js](https://nextjs.org/) and owning both the frontend architecture and a chunk of the backend work, now [open source](https://github.com/FilecoinFoundationWeb/filecoin-foundation/tree/main/apps/ff-site). Beyond the migration itself, I also automated a number of internal processes that used to be manual, freeing up time for the team to focus on content and ecosystem work rather than site upkeep.

A good part of my time also went into UX work that had nothing to do with the site itself: dogfooding projects across the Filecoin ecosystem and writing up UX reports to help those teams improve the usability of their own products. [The findings from those sessions are published here.](https://uxit.fil.org/) It gave me a much broader view of the network than a typical "rebuild the marketing site" contract would have.

The migration itself came with the usual tension of moving off a no-code tool like Webflow: content editors are used to a certain flexibility, and a custom codebase has to replicate or replace that without slowing the team down. Getting the content model and authoring workflow right, so non-technical teammates could keep publishing without needing a PR for every change, took real iteration.

The ecosystem dogfooding and UX reporting work, on the other hand, was rewarding but open-ended by nature: there was no clear finish line, and I had to balance it against the more concrete deadlines of the site rebuild itself.

In the end, the rebuild paid off: traffic to fil.org roughly doubled, and every performance metric we tracked improved. The site is live today at [fil.org](https://fil.org/), running on the stack we built together.

---
title: Filecoin
description: "The decentralized storage network securing the world's most important data."
hq: "San Francisco, USA"
logo: /images/logos/filecoin-logo.webp
images:
  - /images/projects/filecoin/filecoin-1.webp
  - /images/projects/filecoin/filecoin-2.webp
  - /images/projects/filecoin/filecoin-3.webp
  - /images/projects/filecoin/filecoin-4.webp
  - /images/projects/filecoin/filecoin-5.webp
  - /images/projects/filecoin/filecoin-6.webp
  - /images/projects/filecoin/filecoin-7.webp
dates:
  start: "2025-06"
  end: "2026-03"
url: "https://www.filecoin.io/"
display: true
highlight: true
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
  - "tools/tinacms.json"
  - "tools/swr.json"
  - "tools/react-hook-form.json"
  - "tools/zod.json"
  - "tools/wagmi.json"
  - "tools/viem.json"
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
area: web3
employment: contract
---

After the Filecoin Foundation contract, I moved on to Filecoin's own flagship site, [filecoin.io](https://filecoin.io). The scope also got bigger. Rebuilding one site wasn't the whole job anymore: we wanted to build something other Filecoin teams could reuse, so each of them wouldn't have to rebuild their UI from scratch.

We rebuilt filecoin.io as a new app inside the same Turborepo monorepo that already hosted fil.org. It shares configuration, utilities and components with the other Foundation sites, and it's [open source](https://github.com/FilecoinFoundationWeb/filecoin-foundation/tree/main/apps/filecoin-site). We migrated the some of the content from the old site and configuted TinaCMS, so the team can publish without going through code.

Alongside the site, we published [`@filecoin-foundation/ui-filecoin`](https://www.npmjs.com/package/@filecoin-foundation/ui-filecoin) on npm. It's a Filecoin-branded UI library extracted from the site work, for the rest of the ecosystem to build on. Other teams picked it up quickly. It let us contribute to two new Filecoin products, [filecoin.cloud](https://filecoin.cloud/) and [pay.filecoin.cloud](https://pay.filecoin.cloud/mainnet), which were built directly on the package instead of starting their own design system.

That shift from site to library came with its own challenges. Turning site-specific components into a shared library changes the design problem. Each component no longer serves one site; it has to hold up across teams and use cases I couldn't fully predict upfront. The hard part was keeping the API flexible enough for reuse without making it so abstract that it slowed adoption down, and that took real iteration. Publishing to npm also brought its own discipline: versioning, build output, and not breaking downstream apps with every change.

Today, filecoin.io is live on the new codebase. The UI library it produced is already used beyond the site it came from, on Filecoin Cloud and Filecoin Pay.

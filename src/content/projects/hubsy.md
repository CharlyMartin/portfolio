---
title: Hubsy
description: "One of the first independant coworking cafés in Paris"
hq: "Paris, France"
logo:
  src: /images/logos/hubsy-logo.webp
  style:
    padding: "8px"
images:
  - /images/projects/hubsy/hubsy-1.webp
dates:
  start: "2018-08"
  end: "2018-12"
url: "https://www.hubsy.fr/"
display: true
highlight: false
roles:
  - "roles/frontend.json"
  - "roles/devops.json"
  - "roles/ui-design.json"
  - "roles/ux-design.json"
  - "roles/branding.json"
stack:
  - "tools/javascript.json"
  - "tools/gatsby.json"
  - "tools/airtable-sdk.json"
  - "tools/graphql.json"
  - "tools/css.json"
people:
  - slug: "people/jeremy-marcillaud.json"
    role:
      slug: "roles/project-management.json"
status: live
area: web2
employment: contract
---

Hubsy is a coworking chain in Paris founded by my long-time friend Jeremy Marcillaud, with whom I later co-founded Syncly. In 2018, I built Hubsy's new website, taking care of the branding, the UI and UX design, and the development.

The main challenge was letting the Hubsy team update the website's content with tools they were already familiar with. There are a lot of solid headless CMS options out there, but they all require some training for people who are not that tech-savvy. Airtable offered the best of both worlds. It's not a CMS per se, but its spreadsheet-like interface is familiar to most people. It also has no publishing or versioning workflow: great features for sure, but they would have added friction to the content creation process.

I built the website with Gatsby, pulling the content from Airtable at build time. Then, I created a dead-simple UI that makes a POST request to Netlify to trigger a new build of the Gatsby app, so the website picks up the latest content. And voilà!

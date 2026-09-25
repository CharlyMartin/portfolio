---
title: Relief
description: "The app navigating you through financial hurdles in a simple way."
hq: "Miami, USA"
logo:
  src: /images/projects/relief-logo.webp
  style:
    padding: "12px"
images:
  - /images/projects/relief-1.webp
  - /images/projects/relief-2.webp
  - /images/projects/relief-3.webp
dates:
  start: "2021-03"
  end: "2021-04"
url: "https://www.relief.app/"
display: true
highlight: false
roles:
  - "roles/frontend.json"
  - "roles/devops.json"
stack:
  - "tools/javascript.json"
  - "tools/next.json"
  - "tools/chakra-ui.json"
  - "tools/twilio-sdk.json"
  - "tools/react-hook-form.json"
people:
  - slug: "people/aurelien-salomon.json"
    role:
      slug: "roles/project-management.json"
status: live
area: web2
employment: contract
---

Relief is a Canadian FinTech startup that helps people pay off their debt faster. They built an app that navigates users through financial hurdles in the simplest manner, so they can return to enjoying life.

The branding and design of the app were done by [Orizon](https://orizon.co/), a leading branding agency in Montreal. They wanted to add a phone verification step to the signup flow using Twilio, but Webflow didn't allow them to do that out of the box. So they reached out to me for help!

I built a simple Node.js server connecting to the Twilio API, then a Next.js app interacting with that server. The challenge was to make [the Next.js app](https://verify.relief.app/) look like it was part of the Webflow site.

Once the user's phone number was verified, the app would redirect them back to the Webflow site to complete the onboarding process. This works fine for an MVP, but it would be better and more robust to have the whole onboarding process in the Next.js app.

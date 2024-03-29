---
title: Relief
description: The description of the project
---

## Context

Relief is a Canadian FinTech startup that helps people pay off their debt faster. They built an app that navigates users through financial hurdles in the simplest manner, so they can return to enjoying life.

## Contribution

The branding and design of the app were done by [Orizon](https://orizon.co/), a leading branding agency in Montreal. They wanted to add a phone verification step to the signup flow using Twilio, but Webflow didn't allow them to do that out of the box. So they reached out to me for help!

I built a simple Node.js server connecting to the Twilio API, then a Next.js app interacting with that server. The challenge was to make [the Next.js app](https://verify.relief.app/) look like it was part of the Webflow site.

Once the user's phone number was verified, the app would redirect them back to the Webflow site to complete the onboarding process. This works fine for an MVP, but it would be better and more robust to have the whole onboarding process in the Next.js app.

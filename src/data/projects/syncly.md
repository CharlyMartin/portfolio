---
title: Syncly
description: The description of the project
---

## Context

I co-founded Syncly, my second company, in 2019 with my long-time friend Jeremy Marcillaud, founder of Hubsy, a successful coworking chain in Paris.

The idea for Syncly came from his growing frustration with meeting room booking requests. He was getting a lot of them by email, phone, or in person. He would spend time daily to manually check rooms' availability and sending confirmations. As the business grew, this became increasingly time-consuming and error-prone.

He called me to see if I could help automate this tedious process. As we started reflecting on what the solution would look like, we realised that we could solve this problem for all venues with similar issues, not only his. Syncly was born.

## Contribution

As the CTO of Syncly, I was in charge of building the product's first version and bringing it to our customers. Hence, I took care of every step of the product development process: UX research, database design, branding, UI design, frontend development, backend development, deployment, and monitoring.

This first iteration took about 6 months on my own, after which we hired a few freelancers to help us ship faster. I was splitting my time between customer interviews, product roadmap, frontend development, and team management.

## Main Challenge

We ran into countless challenges with Syncly, most unrelated to the product, but building our vision was undoubtedly challenging. We wanted users to be able to book meeting rooms like they shopped online: in a few clicks, with real-time availability and an integrated checkout.

During customer interviews, we realised that most independent coworking venues, our target market, used Google Calendar to manage their meeting rooms' availabilities. Thus, we had to find a way to sync with our clients ' calendars to read and write events from our app in real time. This was the main technical challenge of the project, as Google Calendar's API is not primarily designed for this use case. We had to "bend it" to meet our needs.

Unlike Stripe's, Google Calendar's webhooks, called channels, come with a short expiration date. If a channel expires without us noticing, our database could be out of sync and leave the door open for double bookings. We had to find a way to keep channels alive at all times if we were to scale the product.

After some research, we ended up building a separate server with a series of cron jobs running daily. A first cron job was responsible for checking the validity of Google auth tokens for each account on our platform and refreshing them if necessary. Another cron job needed these valid tokens to re-register channels about to expire. Every night, we would ensure that all channels were still active so that final customers could confidently book meetings.

## Results

This system proved very reliable and turned out to be the competitive edge of Syncly. Many competing products used a more straightforward calendar integration with availability gaps. Hence, customers would have to wait for a manual intervention from the venue to confirm their booking.

Cherry on top, we managed to hide all this complexity behind a dead-simple UX flow that stood out from industry standards. When a new coworking venue signed up to Syncly, they could sync their availability with us on their own in a few simple steps. Other tools required reading some unappealing setup manual or waiting for the support team to do the installation.

As a result, Syncly was the only tool to offer real-time availabilities on meeting rooms with integrated checkout, thanks to Stripe, and a modern booking experience. As of 2023, when we decided to shut down the company for personal reasons, Syncly had collected about half a million euros in bookings for our customers over the course of nearly 3 years.

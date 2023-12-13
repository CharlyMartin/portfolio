---
title: Syncly
description: The description of the project
---

## Context

I co-founded Syncly, my second company, in 2019 with my long-time friend Jeremy Marcillaud, founder of Hubsy, a successful coworking chain in Paris.

The idea for Syncly came from his growing frustration with meeting room booking requests. He was getting many of them by email, phone, or in person. He would spend more and more time daily to manually check rooms' availability and send confirmations. As his coworking business grew, it became increasingly time-consuming and error-prone.

He called me to see if I could help automate this tedious process. As we started reflecting on what a solution could look like, we realised that we could solve this problem for all venues with similar issues, not only his. Syncly was born.

## Contribution

As the CTO of Syncly, I built the product's first version and brought it to our first customers. Hence, I took care of every step of the product development process: UX research, database design, branding, UI design, frontend development, backend development, deployment, and monitoring.

This first iteration took about 6 months on my own, after which we hired a few freelancers to help us ship faster. I was splitting my time between customer interviews, product roadmap, frontend development, and team management.

## Main Challenge

We ran into countless challenges with Syncly, most unrelated to the product, but building our vision was undoubtedly challenging. We wanted users to be able to book meeting rooms like they shopped online: in a few clicks, with real-time availability and an integrated checkout.

During customer interviews, we realised that most independent coworking venues, our target market, used Google Calendar to manage their meeting rooms' availabilities, so we needed to integrate Syncly into their current tools to maximise adoption.

To make Syncly's vision come true, we want to provide customers an easy and fast booking experience. Hence, we had to find a way to connect and sync with our clients ' calendars to read and write events from our app in real-time. This way, we can book a slot and capture the payment instantly instead of in a few hours.

This was the main technical challenge of the project, as Google Calendar's API is not primarily designed for this use case. We needed to "bend it" to meet our needs. Google Calendar's webhooks (called channels) come with an expiration date. If a channel expires without us noticing, our event database is potentially out of sync with a given coworking. It leaves the door open for double bookings, an awful user experience. We needed a way to keep channels alive at all times if we were to scale the product.

After some research and much trial and error, we successfully built a separate server with cron jobs running daily. A first cron job was responsible for checking the validity of Google auth tokens for each coworking's Google account on our platform and refreshing them if necessary. Another cron job needed these valid tokens to re-register channels about to expire. Every night, we would ensure that all channels were active so that final customers could confidently book meetings. If, for some reason, we lost access to our customer's calendar overnight and couldn't refresh channels, we would know first thing in the morning and ask them to grant Syncly access again. Crisis averted.

## Results

This system proved very reliable and turned out to be the competitive edge of Syncly. Many competing products used a more straightforward calendar integration with availability gaps. Hence, customers would have to wait for a manual intervention from the venue to confirm their booking.

Cherry on top, we hid all this complexity behind a dead-simple UX flow that stood out from industry standards. When a new coworking venue signs up for Syncly, they can sync their availability with us on their own in a few simple steps. Other tools required reading some unappealing setup manual or waiting for the support team to do the installation.

Syncly was the only tool to offer real-time availabilities on meeting rooms with integrated checkout and a modern booking experience. As a result, Syncly was able to collect about 500,000 EUR in booking revenue for our customers in about 2 years, with a team of 2. In 2022, after 2 long years up against COVID lockdowns, we decided to shut down the company.

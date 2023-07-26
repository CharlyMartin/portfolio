---
title: Syncly
description: The description of the project
---

## Context

I co-founded Syncly, my second company, in 2019 with my long-time friend Jeremy Marcillaud, founder of Hubsy at the time, a succesful coworking chain in Paris that was growing fast.

The idea for Syncly came from his daily frustation with meeting room booking requests. He was receiving them by email, phone, or in person. He would spend time on a daily basis to manually check availabilities and send confirmations. As the business grew, this became increasingly time-consuming and error-prone. We decided to solve that problem, not only for Hubsy, but all venues with a similar issue.

## Contribution

As the CTO of Syncly, I was in charge of building the first version of product and bring it to our customers. Hence, I took care of every step of the product development process: UX research, database design, branding, UI design, frontend development, backend development, deployment and monitoring.

This first iteration took about 6 months on my own, after which we started working with a few freelancers to help us ship faster. I was splitting my time between customer interviews, product roadmap, frontend development and managing the development team.

## Main Challenge

We ran into countless challenges with Syncly, most of which unrelared to the product itself. But building our vision of the product was not easy either. We wanted customers to be able to book meeting rooms like they would book train tickets: in a few clicks, with real-time availability and an integrated checkout.

During customer interviews, we realised that most independant coworking venues, our target market, were using Google Calendar to manage their meeting rooms' availabilities. Thus, we had to find a way to integrate with Google Calendar, to be able to read and write events from our app in real-time. This was the main technical challenge of the project, as Google Calendar's API is not primarily designed for this use case. We had to "bend it" to meet our needs.

Unlike Stripe's, the Google Calendar's API uses webhooks, called channels, with a rather short expiration date. If a webhook expires without us noticing, our database would potentially be out of sync and leave the door open for double bookings. We had to find a way to keep channels alive at all time if we were to scale the product.

After some research, we ended up building a separate server with a bunch of cron jobs running daily. A first cron job was responsible for check the validity of Google auth tokens for each account on our platform, and refresh them if necessary. Another cron job needed these valid tokens to re-register channels about to expire. Every night, we would make sure that all channels were still alive and valid, so that final customers could confidently book meetings.

## Results

This system proved to be very reliable and turned out to be the real edge of Syncly. Many competing products were using a much simple calendar integration, with availability gaps. Hence, customers would have to wait for a manual intervention from the venue to confirm their booking.

Cherry on the cake, we managed to hide all this complexity behinf a dead-simple UX flow that really stood out from industry standards. When a new coworking venue would sign up to Syncly, they could sync their availabilty with us on their own, in a few minutes and a few clicks. Other tools required reading some unappealing setup manual or waiting for help from a support team.

As a result, Syncly was the only tool able to offer a real-time availabilities on meeting room with integrated checkout, thanks to the Stripe API, and a modern booking experience. As of 2023, when we decided to shut down the company for personal reasons, Syncly had collected about half a million euros in bookings for our customers, over the course of nearly 3 years.

```

```

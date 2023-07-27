---
title: Lottie Studio
description: The description of the project
---

## Context

Lottie Studio is a fun yet impressive side-project built with my long-time friends Alexis & André back when we all lived in Montreal, Canada. It's a product studio based on [Lottie](https://airbnb.design/lottie/), a powerful tool to render [After Effects](https://www.adobe.com/products/aftereffects.html) animations on the web and in native apps. Lottie was developed by the Airbnb design team.

Lottie Studio gathers three highly complementary skills: product design, motion design, and web development. Our value proposition is to create, build, and integrate stunning animations into our clients' products.

## Contribution

Alexis & André came up with the idea for Lottie Studio when they realised their clients often struggled to integrate the Lottie files they handed them. They first tried to use [Webflow](https://webflow.com/), a no-code website builder, to integrate Lottie animations on the web and embed them in their clients' websites. However, they often struggled to get the desired visual results.

That's when they came to me. They wanted to build a promotional website to see how far we could push Lottie animations and showcase our expertise to future clients. I was thrilled by the idea and jumped on board as the creative developer of the team.

## Main Challenge

A Lottie animation is a big JSON file. It's easy to load, and rather easy to integrate on the web, thanks to the official [web plugin](https://github.com/airbnb/lottie-web). The real challenge arises when you're loading many animations and want to create complex sequences, react to user interactions, and ensure the website is still performant. Which is precisely what we wanted to do.

I also gave Webflow a try, but quickly realised it would not make the cut. It's not designed to coordinate multiple animations, just one at a time. It's still a fantastic tool, but not powerful enough for our use case. Even [React](https://react.dev/) seemed to struggle with the performance requirements of our project. So I returned to the basics and built our website with good old HTML, CSS, and JavaScript.

I still ran into 2 main challenges:

1. **Orchestrating animations**. The Lottie web plugin is fairly basic, and so is its documentation. It can play, pause, and stop animations. But each animation is unaware of the others. For instance, animations start playing as soon as loaded. Some animations we built consisted of multiple Lottie files, so we needed to override that default mechanism. I created a promise-based wrapper of the plugin to enhance it to our need: wait for a group of animations to load before playing them.

2. **Staying performant**. A Lottie file is a JSON file with vectors and coordinates data. This data blob tells the browser's rendering engine how to draw and animate SVGs. Playing more than one animation can be CPU intensive and make your laptop fan go crazy. To keep the website pleasant to use, especially on mobile, I created a mechanism to automatically pause animations when out of the viewport.

Not as problematic, but still significant, I lazy-loaded the JSON files to ensure the website would load fast. About half of the animations on the website are not visible on page load, so there was no point in loading them immediately. The same applies to the images.

## Results

We are proud and delighted with the final result. The website is an excellent showcase of what Lottie can do. It's stunning, fun, and performant:

- On mobile with a 3G connection, we achieve a First Contentful Paint of 1 second and a speed index of 2.2 seconds.
- On a laptop with a high-speed Wi-Fi connection, the First Contentful Paint is 0.2 seconds, and the Speed Index is 1.2 seconds.
- The lighthouse SEO & Best Practices scores are 100.

This project is a great example of what can be achieved with a small team of highly complementary skills and seamless collaboration between them. I had a lot of fun building it. [See it](https://lottiestudio.com/) for yourself!

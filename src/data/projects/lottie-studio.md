---
title: Lottie Studio
description: The description of the project
---

## Context

Lottie Studio is a fun yet impressive side-project built with my long-time friends Alexis & André, back when we all lived in Montreal, Canada. It's a product studio based on [Lottie](https://airbnb.design/lottie/), a powerful tool to render [After Effects](https://www.adobe.com/products/aftereffects.html) animations on the web and in native apps. Lottie is developed by the Airbnb design team.

Lottie Studio gathers three highly complementary skills: product design, motion design, and web development. Our value proposition is to take care of the whole process of creating, building and integrating stunning animations in our clients' products.

## Contribution

Alexis & André came up with the idea for Lottie Studio when they realised that their clients often struggled to integrate the animations they handed them. They first tried to use [Webflow](https://webflow.com/), a no-code website builder, to integrate Lottie animations on the web and embed them in their clients' websites. But they were struggling to implement the kind of animations they wanted to create.

That's when they came to me. They wanted to build a promotional website to see how far we could push Lottie animations, and showcase our their expertise to future clients. I was thrilled by the idea and jumped on board as the creative developer of the team.

## Main Challenge

A Lottie animation is a big JSON file. It's easy to load, and rather easy to integrate on the web, thanks to the official [web plugin](https://github.com/airbnb/lottie-web). The real challenge arises when you're dealing with loading many animations and want to create complex sequences, react to user interactions, and make sure the website is still performant. Which is exactly what we wanted to do.

I gave Webflow a try, but quickly realised it would not make the cut. It's not designed to coordinate multiple animations, but one at a time. It's still a fantastic tool, but not powerful enough for our use case. Even [React](https://react.dev/) seemed to struggle with the performance requirements of our project. So I went back to the basics and built the our website with good old HTML, CSS and JavaScript.

While doing so, I ran into 2 main challenges:

1. **Orchestrating animations**. The Lottie web plugin is fairly basic, and so is its documentation. It can play, pause, and stop animations. But each animation is unaware of the others. For instance, animations start playing as soon as loaded. Some animations we built consisted of multiple Lottie files, so that default mechanism wouldn't work for us. I had to create a promise-based wrapper of the plugin to make this work: wait for a group of animations to load before playing them.

2. **Staying performant**. As said earlier, a Lottie file is a big JSON file with vectors and coordinates data. This blob of data tells the browser rendering engine how to draw and animate SVGs. Playing more than one animation can be CPU intensive, and will make your laptop fan go crazy. To keep the website pleasant to use, especially on mobile, I had to create a mechanism so that animations would automatically pause when out of the viewport.

Not as problematic, but still important, I lazy-loaded the JSON files to make sure the website would load fast. About half of the animations on the website are not visible on page load, so there was no point in loading them right away. Same goes for the images.

## Results

We are extremely happy with the final result. The website is a great showcase of what Lottie can do, and we're proud of it. It's stunning, fun, and performant. A few metrics:

- On mobile with a 3G connection, we achieve a First Contentful Paint of 1 second, and a speed index of 2.2 seconds.
- On laptop with a high-speed wifi connection, the First Contentful Paint is 0.2 seconds and the Speed Index is 1.2 seconds.
- The lighthouse SEO & Best Practices scores are 100.

This project is a great example of what can be achieved with a small team of highly complementary skills, and seamless collaboration between them. I had a lot of fun building it. [See it](https://lottiestudio.com/) for yourself!

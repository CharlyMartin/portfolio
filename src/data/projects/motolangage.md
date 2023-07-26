---
title: Motolangage
description: The description of the project
---

## Context

Motolangage is a experimental app developed for [INSERM](https://www.inserm.fr/en/home/), the French National Institute of Health and Medical Research. It's a tool to help researchers understand how people learn language.

The app is a game where the user has to guess whether a sentence, in a fictional language, matches the image displayed on the screen. They first receive a brief training with a series of examples.

Researchers can then analyze the user's performance and tweak the parameters of the game (duration, cycles, sentence complexity...) to see how it affects the user's learning.

## Contribution

I built the interface of the app with React and Redux. Each time a user answered, or failed to answer, a sentence, the frontend would send their answer along with a bunch of behavioural metadata, for researchers to analyze.

Unlike most projects I work on, the React app lives in a monolithic Laravel app.

---
title: Motolangage
description: "A language learning experiment by the French National Institute Research."
hq: "Paris, France"
images:
  - /images/projects/motolangage-1.png
dates:
  start: "2019-07"
  end: "2019-11"
url: "https://www.inserm.fr/en/home/"
display: false
highlight: false
roles:
  - "roles/frontend.json"
stack:
  - "tools/language/javascript.json"
  - "tools/language/css.json"
  - "tools/library/react.json"
  - "tools/library/redux.json"
  - "tools/library/react-router.json"
people:
  - slug: "people/louis-roufinaud.json"
    role:
      slug: "roles/backend.json"
status: archived
area: web2
employment: contract
---

## Context

Motolangage is an experimental app developed for [INSERM](https://www.inserm.fr/en/home/), the French National Institute of Health and Medical Research. It's a tool to help researchers understand how people learn a language.

The app is a game where the user has to guess whether a sentence in a fictional language matches the image displayed on the screen. They first receive a brief training with a series of examples.

Researchers can then analyze the user's performance and tweak the game's parameters (duration, cycles, sentence complexity..., etc.) to see how it affects learning.

## Contribution

I built the interface of the app with React and Redux. Each time a user answered, or failed to answer, a sentence, the frontend would send their answer along with a bunch of behavioural metadata for researchers to analyze.

Unlike most projects I work on, the React app lives in a monolithic Laravel app. It was a brief dive into the PHP world, which reminded me of my Ruby on Rails days.

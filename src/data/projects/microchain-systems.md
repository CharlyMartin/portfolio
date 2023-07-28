---
title: Microchain Systems
description: The description of the project
---

## Context

Microchain Systems will be the first decentralised exchange (DEX) to launch on the [Fuel](https://www.fuel.network/) network, whose mainnet will go live in Q4 2023. Unlike most L2s, Fuel relies on the UTXO model and uses its own language (Sway) and virtual machine (FuelVM).

Microchain Systems is one of the few projects [funded by Fuel](https://fuel-labs.ghost.io/introducing-the-fuel-grants-program/) to build on their blockchain. Microchain is a low-cost token-swapping terminal with a focus on versatility and simplicity.

## Contribution

I've been in charge of building the DEX user interface and overall frontend architecture. In recent months, I've also taken the lead on some design decisions.

## Main Challenges

The sweet spot for difficulty in a new project is when there's only one area of uncertainty, one area of the project I need clarification on how to do. For Microchain, there was a decent amount of these, which made it one of the most challenging projects I've worked on.

- First challenge: **the blockchain**. It was my first project integrating our own smart contracts and all the complexity that comes with it. API calls seem trivial in comparison. I had to learn about the blockchain ecosystem and its different ways of interacting with it.

- Second challenge, **the complexity of the interface**. The same page can have many states and as many user inputs. I decided to learn about finite [state machines](https://xstate.js.org/) and state charts to manage all of them. I realised the complexity came from trying to keep a mental modal of the state tree in my head. Everything made a lot more sense once all states were logically connected in the machine.

- Third challenge, **the precision of the math**. Most web apps don't need advanced calculations, just integers for pagination or list indexes. With Microchain, we must handle numbers with up to 9 decimals or 10^9. Plain Javascript isn't precise enough for this kind of computations. I reached for [bn.js](https://github.com/indutny/bn.js/) to handle large or small numbers. It eventually got added to the Fuel SDK.

- Finally, working with an **ecosystem of beta software** made the above even more challenging. We've been building on the Fuel testnet since V1, so we've been running into all sorts of bugs and issues along the way. Getting things right took a lot of digging, intuition, and David's immense crypto expertise.

## Results

The project is now fairly advanced but still work-in-progress. It's already possible to trade on the testnet, but I will share more about it when it's ready!

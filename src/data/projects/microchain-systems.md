---
title: Microchain Systems
description: The description of the project
---

## Context

Microchain Systems will be the first decentralised exchange (DEX) to launch on the [Fuel](https://www.fuel.network/) network, whose mainnet will go live in 2024. Unlike most L2s, Fuel relies on the UTXO model and uses its own language (Sway) and virtual machine (FuelVM). Microchain Systems is one of the few projects [funded by Fuel](https://fuel-labs.ghost.io/introducing-the-fuel-grants-program/) to build on their blockchain. Microchain is a low-cost token-swapping terminal with a focus on versatility and simplicity.

## Contribution

I've been responsible for building the DEX user interface and overall frontend architecture. As the launch neared, I also took the lead on some design decisions as Kalle focused on tokenomics and marketing. I've worked closely with David and Kalle, both founders of Microchain Systems and experienced crypto professionals. I've also had the chance to be part of the Fuel beta developer community and provide feedback on the SDK.

## Main Challenges

Building Microchain has been both challenging and rewarding; these two usually go hand in hand. I think the sweet spot for difficulty in any new project is when there's only one area of uncertainty or novelty. For Microchain, there were a decent number of things I had never done, which made it one of the most difficult projects I've worked on.

- First challenge: **the blockchain**. It was my first project directly interacting with a blockchain. David wrote the DEX's smart contracts in [Sway](https://fuellabs.github.io/sway), and I integrated them into our UI, with all the complexity that came with it. API calls seem trivial in comparison. The confusion came from my initial lack of understanding of how a blockchain works and how Fuel differed from regular smart contract chains.

- Second challenge, **the complexity of the interface**. Building a DEX is like building a bank; the UI is packed with data and the same page can have many states and as many user inputs. It was hard to encapsulate all that intricacy using React's built-in states. I learned about finite [state machines](https://xstate.js.org/) and state charts to untangle my mental confusion. I realised the complexity came from trying to keep a mental modal of the state tree in my head. Everything made much more sense once all states were logically connected in the machine.

- Third challenge, **the precision of the math**. Most web apps don't need advanced calculations, only integers for pagination or list indexes. With Microchain and its bank-like features, we had to handle numbers with up to 9 decimals or 10^9. Plain Javascript numbers are not precise enough for this kind of computations. I reached for [bn.js](https://github.com/indutny/bn.js/) to handle large or small numbers. It eventually got added to the Fuel SDK.

- Finally, working with an **ecosystem of beta software** made all of the above even more challenging. We've been building on the Fuel testnet since V1, so we've been running into all sorts of bugs and issues along the way. Getting things right took a lot of digging, intuition, and David's immense crypto expertise.

## Results

The project is now fairly advanced but still a work in progress. It's already possible to trade on the testnet, but it's awaiting the Fuel mainnet launch to go public. Hopefully, that should be the case sometime in 2024.

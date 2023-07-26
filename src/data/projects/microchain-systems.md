---
title: Microchain Systems
description: The description of the project
---

## Context

Microchain Systems will be the first decentralised exchange (DEX) to launch on the [Fuel](https://www.fuel.network/) blockchain, whose mainnet will go live in Q4 2023. Unlike most L2s, Fuel relies on UTXO model, uses its own language (Sway) and virtual machine (FuelVM). Microchain Systems is one of the few projects funded by the Fuel team to build on their blockchain.

## Contribution

I've been in charge of building the user interface of the DEX and overall architecture of the frontend. In recent months, I've also taken the lead on some design decisions.

## Main Challenges

I usually say that the sweet spot for difficulty is when there's only one area of uncertainty: one thing that I've never done. For Microchain, there were a few of these which made it one of the most challenging projects I've worked on.

- First challenge, it was my first projet interacting directly with a blockchain. API calls seem trivial in comparison with the complexity of smart contracts. I had to learn about the blockchain ecosystem and the different ways to interact with it.

- Second challenge, the complexity of the interface. The same page can have many states and as many user inputs. It's similar to building an interface online bank or calculator. I deciced to learn about finite state machines and statecharts to pull this off.

- Third challenge, the precision of the math. We handle numbers with up to 9 decimals or 10^9. Plain Javascript is not precise enough to handle this kind of operations. I reached for bn.js, which eventually got added to the Fuel SDK.

- Finally, working with a new ecosystem of beta software made all of the above even more challenging. We've been building on the Fuel testnet since V1, so we've run into all sort of bugs and issues along the way. It took a lot of digging and intuition to get things right.

## Results

The project is still work-in-progress, but it's already possible to trade on the testnet. I will share more about it when it's ready!

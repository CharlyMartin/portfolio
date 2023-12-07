import type { Use } from "@/types";

// Add long description for highlighted or favorite uses

const data: Array<Use> = [
  {
    id: 1,
    name: "TypeScript",
    meta: "Programming Language",
    oneLiner: "A typed superset of JavaScript.",
    description:
      "My go-to language for most projects these days. It takes some time to get the types right at the beginning, but it always pays off as the project grows.",
    highlight: true,
    url: "https://www.typescriptlang.org/",
    type: "language",
  },
  {
    id: 2,
    name: "React.js",
    meta: "UI Library",
    oneLiner: "A JavaScript library for building user interfaces.",
    description:
      "React blew my mind away and got me into frontend development. I taught myself the basics early 2018 and hit the ground running with projects. I have mainly been working with the React ecosystem since then.",
    url: "https://reactjs.org/",
    type: "library",
  },
  {
    id: 3,
    name: "Next.js",
    meta: "Web Framework",
    oneLiner: "The React Framework for Production.",
    description:
      "After using standalone React for a while and running into the same configuration and optimisation hurdles (routing, code splitting, lazy loading, SSR, ...), I found Next.js v9 back in the day and was hooked by its simplicity. Every new major version manages to make the tool even simpler to use, which is not always the case in the JavaScript ecosystem. Next.js is my go-to choice for any web project, my new Ruby on Rails.",
    highlight: true,
    url: "https://nextjs.org/",
    type: "framework",
  },
  {
    id: 4,
    name: "Tailwind CSS",
    meta: "CSS Framework",
    highlight: true,
    oneLiner: "The CSS framework to build any design.",
    description:
      "I love Tailwind! In a world of JavaScript everything, it stands out for its simplicity while being extremely powerful.",
    url: "https://tailwindcss.com/",
    type: "library",
  },
  {
    id: 5,
    name: "Visual Studio Code",
    meta: "Code Editor",
    oneLiner: "Code editing. Redefined.",
    description:
      "I was a Sublime Text lover for years. It was a sad moment when I could no longer lie to myself and admit that VS Code was the best code editor out there. It's such a pleasure to use.",
    url: "https://code.visualstudio.com/",
    type: "devtool",
  },
  {
    id: 6,
    name: "Notion",
    meta: "Productivity Tool",
    oneLiner: "The all-in-one workspace.",
    description: "My external brain",
    url: "https://www.notion.so/",
    type: "productivity",
  },
  {
    id: 7,
    name: `15" M2 MacBook Air (2023)`,
    meta: "Hardware",
    oneLiner:
      "MacBook Air combined with the M2 chip. An incredibly portable laptop.",
    description:
      "I've been on the Mackbook Pro bandwagon since 2009, but the latest M chip series is such a game changer that a MacBook Air (with some extra RAM) is now more than enough for modern web development.",
    favorite: true,
    url: "https://www.apple.com/macbook-air/",
    type: "workspace",
  },
  {
    id: 8,
    name: "HTML",
    meta: "Web Language",
    oneLiner: "The markup language for the web.",
    description:
      "Writing clean and accessible HTML is still a useful skill in 2023. I made the mistake of neglecting it when JavaScript frameworks were all the rage, but not anymore.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    type: "language",
  },
  {
    id: 9,
    name: "CSS",
    meta: "Web Language",
    oneLiner: "The styling language for the web.",
    description:
      "CSS has become incredibly powerful over the years. Advanced layouts and animations can be achieved with little CSS when understood properly.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    type: "language",
  },
  {
    id: 10,
    name: "JavaScript",
    meta: "Web Language",
    oneLiner: "The programming language for the web.",
    description:
      "Coming from Ruby, learning JavaScript came with its set of challenges. The language is extremely flexible and can fit multiple programming paradigms. It's a beautiful language when used properly.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    type: "language",
  },
  {
    id: 11,
    name: "Prettier",
    meta: "Code Formatter",
    oneLiner: "An opinionated code formatter.",
    description:
      "Prettier changed my (dev) life. I discovered it around the same time as React, as I was transitioning from the Ruby world to the - much vaster - JavaScript world. It’s incredible enough as a solo developer and indispensable for team work. And the tailwind formatter plugin makes using Tailwind much structured and pleasant. I remember days when I used to format code manually, I can't believe it was a thing Thank you, Prettier.",
    url: "https://prettier.io/",
    favorite: true,
    type: "devtool",
  },
  {
    id: 12,
    name: "Chakra UI",
    meta: "Component Library",
    oneLiner: "A simple, modular and accessible component library.",
    description:
      "When I don't use Tailwind CSS, Chakra UI is my go-to (and favourite) React component library. It's well designed, accessible, themeable and composable. All the good stuff!",
    url: "https://chakra-ui.com/",
    type: "library",
  },
  {
    id: 13,
    name: "Strapi",
    meta: "Web Framework",
    oneLiner: "The leading open-source headless CMS.",
    description:
      "Strapi is one of those tools so flexible that it can fit many use cases. I've used it as a backend, admin panel and web API for my previous company. It's a great tool! A TypeScript support would be nice though.",
    url: "https://strapi.io/",
    type: "framework",
  },
  {
    id: 14,
    name: "Docker",
    meta: "Container Platform",
    oneLiner: "Empowering App Development for Developers.",
    description:
      "I've barely scratched the surface of Docker. I've used it to run a few databases locally and it makes that process so much easier already.",
    url: "https://www.docker.com/",
    type: "devtool",
  },
  {
    id: 15,
    name: "Prisma",
    highlight: true,
    meta: "ORM",
    oneLiner: "Next-generation TypeScript ORM.",
    description:
      "Prisma is the perfect ORM companion for my Next.js projects, if I ever need to make use of Next's API routes. And the native TypeScript support makes database interactions so much safer.",
    url: "https://www.prisma.io/",
    type: "library",
  },
  {
    id: 16,
    name: "Stripe SDK",
    meta: "Web API",
    oneLiner: "The most popular payment API.",
    description:
      "It would be hard to imagine a world where Stripe doesn't exist. Their API documentation is the gold standard for web APIs. I started using their API back in 2018, a few times a year since then. Whenever I come back to their documentation, they managed to make it even more enjoyable and intuitive. Bravo, Stripe!",
    favorite: true,
    url: "https://stripe.com/",
    type: "sdk",
  },
  {
    id: 17,
    name: "Twilio SDK",
    meta: "Web API",
    oneLiner: "Communication API for SMS and Voice.",
    description:
      "I used Twilio to create onboarding flows with SMS verification. They made that process a breeze.",
    url: "https://www.twilio.com/",
    type: "sdk",
  },
  {
    id: 18,
    name: "Google Auth SDK",
    meta: "Web API",
    oneLiner: "The gateway to Google's API ecosystem.",
    // description: "",
    url: "https://developers.google.com/identity/protocols/oauth2",
    type: "sdk",
  },
  {
    id: 19,
    name: "Google Calendar SDK",
    meta: "Web API",
    oneLiner: "The web API for the most popular calendar app.",
    description:
      "I've worked a lot with Google's Calendar API when implementing a real-time, bi-directional calendar sync. Their webhook system is tricky to work with, but we made it work!",
    url: "https://developers.google.com/calendar",
    type: "sdk",
  },
  {
    id: 20,
    name: "Mapbox SDK",
    meta: "Web API",
    oneLiner: "Maps and location for developers.",
    description:
      "I tried Mapbox when Google Maps API became too expensive for our use case. It's a great alternative and simpler to set up than Google Maps.",
    url: "https://www.mapbox.com/",
    type: "sdk",
  },
  {
    id: 21,
    name: "Airtable SDK",
    meta: "Web API",
    oneLiner: "Powerful low-code platform for building apps.",
    description:
      "I love Airtable so much that I've used their API as a backend or CMS for a few projects. It's not always a long-term solution, but it's a great way to get started quickly.",
    url: "https://airtable.com/",
    type: "sdk",
  },
  {
    id: 22,
    name: "Lottie Web",
    meta: "Animation Library",
    oneLiner: "High-quality animations without the hassle.",
    description:
      "As a developer, building animations with plain CSS or JavaScript is always a lengthy process. Lottie solved that problem for me. I've been able to integrate incredibly complex animations as easily as importing a static image.",
    url: "https://airbnb.io/lottie/",
    type: "library",
  },
  {
    id: 23,
    name: "Firebase SDK",
    meta: "Web API",
    oneLiner: "Backend as a service.",
    description:
      "Like most Google APIS, Firebase can be a bit tricky to work with but covers a lot of use cases.",
    url: "https://firebase.google.com/",
    type: "sdk",
  },
  {
    id: 24,
    name: "Ethers",
    meta: "Blockchain SDK",
    oneLiner: "The library for interacting with the Ethereum blockchain.",
    // description: "The most popular Ethereum SDK",
    url: "https://docs.ethers.io/",
    type: "sdk",
  },
  {
    id: 25,
    name: "Ruby on Rails",
    meta: "Web Framework",
    oneLiner: "The Ruby framework for building web applications.",
    description:
      "Ah Ruby on Rails... This is where it all started for me. Even though I haven't used it in years, I still use its priceless principles and patterns in my work today. I still believe it's one of the best framework for building web applications faster.",
    url: "https://rubyonrails.org/",
    type: "framework",
  },
  {
    id: 26,
    name: "Gatsby.js",
    meta: "Web Framework",
    oneLiner: "Powerful framework and static site generator.",
    description:
      "I used Gatsby as a static site generator for a few projects back in 2018. The built-in lazy-loading and image optimization features felt like magic at the time. It was indeed blazing fast!",
    url: "https://www.gatsbyjs.com/",
    type: "framework",
  },
  {
    id: 27,
    name: "Rebass",
    meta: "Component Library",
    oneLiner: "Primitive UI components built with styled-system.",
    description:
      "Rebass was one of the first component libraries I used. Its themeable and constraint-based design principles was exactly what I needed at the time, when I started building larger frontend apps.",
    url: "https://rebassjs.org/",
    type: "library",
  },
  {
    id: 28,
    name: "Redux",
    meta: "State Management",
    oneLiner: "Popular state management library.",
    description:
      "I've always had a love-hate relationship with Redux. It's a great tool, but the boilerplate can be a bit much. I love the one-way data flow and predictability of the state tree, but I believe there are better alternatives today.",
    url: "https://redux.js.org/",
    type: "library",
  },
  {
    id: 29,
    name: "GraphQL",
    meta: "Query Language",
    oneLiner: "Query language for your API.",
    // description: "The most popular query language",
    url: "https://graphql.org/",
    type: "language",
  },
  {
    id: 30,
    name: "Apollo Client",
    meta: "Async State Management",
    oneLiner: "Popular GraphQL client.",
    description: "Appolo Client is as good as react-query, but for GraphQL.",
    url: "https://www.apollographql.com/",
    type: "library",
  },
  {
    id: 31,
    name: "Intercom SDK",
    meta: "Web API",
    oneLiner: "Popular communication API.",
    // description: "Popular communication API",
    url: "https://developers.intercom.com/",
    type: "sdk",
  },
  // Duplicate
  // {
  //   id: 32,
  //   name: "Airtable SDK",
  //   meta: "Web API",
  //   description: "The most popular database API",
  //   url: "https://airtable.com/",
  //   type: "sdk",
  // },
  {
    id: 33,
    name: "XState",
    meta: "State Management",
    oneLiner: "Popular library for state machines and statecharts",
    description:
      "XState is pretty awesome! Finite state machines are a mind shift from the traditional state management libraries, but a worthwhile one. It forces you to clearly map out the different states and transitions of your application, which is a great thing!",
    url: "https://xstate.js.org/",
    favorite: true,
    type: "library",
  },
  {
    id: 34,
    name: "Fuels",
    meta: "Blockchain SDK",
    oneLiner: "The library for interacting with the Fuel blockchain.",
    // description: "The most popular Ethereum SDK",
    url: "https://fuellabs.github.io/fuels-ts/",
    type: "sdk",
  },
  {
    id: 35,
    name: "bn.js",
    meta: "BigNum Library",
    oneLiner: "Popular math library",
    description:
      "JavaScript was not designed to handle precision math, but bn.js makes it possible. It's a non-negotiable dependency for projects with banking features.",
    url: "https://github.com/indutny/bn.js/",
    type: "library",
  },
  {
    id: 36,
    name: "Headless UI",
    meta: "Component Library",
    oneLiner: "A set of completely unstyled, fully accessible UI components",
    description:
      "Headless UI is made by the same team behind Tailwind CSS, hence both tools work together like magic, pretty neat! It's my go-to component library for Tailwind projects.",
    //  works hand-in-hand with Tailwind CSS, and that is pretty awesome!",
    url: "https://headlessui.dev/",
    type: "library",
  },
  {
    id: 37,
    name: "Radix UI",
    meta: "Component Library",
    oneLiner:
      "Unstyled, accessible components for building high‑quality design systems and web apps in React.",
    description:
      "I love the level of details that went into making Radix UI. I use wherever Headless UI doesn't cut it.",
    url: "https://www.radix-ui.com/",
    type: "library",
  },
  {
    id: 38,
    name: "React Query",
    highlight: true,
    meta: "Async State Management",
    oneLiner: "The React async state management library.",
    description:
      "The most popular async state management library for React projects. Trying to handle network requests and data caching without it feels so primitive now.",
    url: "https://tanstack.com/query/latest",
    type: "library",
  },
  {
    id: 39,
    name: "SWR",
    meta: "Async State Management",
    oneLiner:
      "Popular  async state management library, by the team behind Next.js.",
    description:
      "I found out about SWR as I was browsing the Next.js docs. I was impressed by all the features of the tool and the simplicity of the API.",
    url: "https://swr.vercel.app/",
    type: "library",
  },
  {
    id: 40,
    name: "React Hook Form",
    meta: "Form Management",
    oneLiner: "Popular form library built with React hooks.",
    description:
      "Managing complex forms is one of the hardest things in web development. React Hook Form makes it so much easier and scalable.",
    favorite: true,
    url: "https://react-hook-form.com/",
    type: "library",
  },
  {
    id: 41,
    name: "React Router",
    meta: "Routing",
    oneLiner: "The most popular routing library for React",
    description:
      "React Router has been around for a while now, and has remained the most popular routing library for React, which is impressive. I always use it on standalone React projetcs.",
    url: "https://reactrouter.com/",
    type: "library",
  },
  {
    id: 42,
    name: "React Final Form",
    meta: "Form Management",
    oneLiner: "The react adapter for the popular final-form library.",
    url: "https://final-form.org/react",
    type: "library",
  },
  // {
  //   id: 43,
  //   name: "Laravel",
  //   meta: "Web Framework",
  //   oneLiner: "The most popular PHP framework for building web apps.",
  //   url: "https://laravel.com/",
  //   type: "framework",
  // },
  {
    id: 44,
    name: "Z - jump around",
    meta: "Shell Tool",
    oneLiner: "Shell script to move around the file system",
    description:
      "Z is a tiny shell script but such a cool one. It makes moving around the file system so much easier. I 'z' my way around directories instead of 'cd'ing like a caveman.",
    url: "https://github.com/rupa/z",
    type: "devtool",
  },
  {
    id: 45,
    name: "Parcel",
    meta: "Bundler",
    oneLiner: "A zero-configuration bundler for the rest of us",
    url: "https://parceljs.org/",
    type: "devtool",
  },
  {
    id: 46,
    name: "Vite",
    meta: "Bundler",
    oneLiner: "Next-generation bundler for frontend projects.",
    url: "https://vitejs.dev/",
    type: "devtool",
  },
  {
    id: 47,
    name: "Github",
    meta: "Code Collaboration",
    oneLiner: "The most popular code hosting & collaboration platform",
    description: "The most popular code hosting & collaboration platform",
    url: "https://www.github.com/",
    type: "devtool",
  },
  {
    id: 48,
    name: "Github Copilot",
    meta: "AI Tool",
    oneLiner: "The most popular AI code editor assistant",
    favorite: true,
    description:
      "Gitub Copilot is one of these tools with such a massive wow factor you only have every few years. Somedays, I feel like I am the co-pilot of Github Copilot, as it seems to increasingly know what I want to do. Mind blowing!",
    url: "https://github.com/features/copilot/",
    type: "devtool",
  },
  {
    id: 49,
    name: "Firefox Developer Edition",
    meta: "Web Browser",
    oneLiner: "The most popular browser for developers",
    description:
      "I find Firefox's devtools more advanced and enjoyable to use than Chrome's. The network panel is particularly impressive.",
    url: "https://www.mozilla.org/en-US/firefox/developer/",
    type: "devtool",
  },
  {
    id: 50,
    name: "Samsung Smart Monitor M7 UHD",
    meta: "External Monitor",
    oneLiner: "External monitor",
    description:
      "I've been dreaming of having a 4K external monitor like this during all my travel years. It is now the case! It makes frontend development so much enjoyable.",
    url: "https://www.samsung.com/pt/monitors/high-resolution/smart-m7-32-inch-smart-tv-experience-ls32bm700uuxen/",
    type: "workspace",
  },
  {
    id: 51,
    name: "Postman",
    meta: "Productivity Tool",
    oneLiner: "The most popular API tool",
    description:
      "Postman was a game changer for me as I started building or working with APIs. The collaboration features they added make it the ultimate tool for API development.",
    url: "https://www.postman.com/",
    type: "devtool",
  },
  {
    id: 52,
    name: "iTerm",
    meta: "Shell Tool",
    oneLiner: "MacOs terminal replacement",
    description:
      "I've never used the default MacOs terminal, but whenever I see someone's screen with it, I feel like I am looking at a computer from the 80s. iTerm feels like the way to go.",
    url: "https://iterm2.com/",
    favorite: true,
    type: "devtool",
  },
  {
    id: 53,
    name: "Auth.js",
    meta: "Authentication Library",
    oneLiner: "Authentication for the Web",
    description:
      "Auth.js - previously NextAuth.js - is incredibly intuitive and covers most, if not all, authentication use cases. It's not my go to authentication library for my Next.js projects.",
    url: "https://authjs.dev/",
    // highlight: true,
    type: "library",
  },
  {
    id: 54,
    name: "tRPC",
    highlight: true,
    meta: "Data Fetching",
    oneLiner: "End-to-end typesafe APIs made easy.",
    description:
      "tRPC is incredibly powerful! I had a big wow moment when I first tried it. Data fetching is usually where type safety ends in frontend projects, but tRPC not only makes it possible, but also easy and enjoyable.",
    url: "https://trpc.io/",
    type: "library",
  },
  {
    id: 55,
    name: "Vercel AI SDK",
    meta: "AI Tool",
    oneLiner: "The library for streaming AI responses and chat UIs",
    description:
      "It would be much harder to build a snappy chat UI without Vercel AI SDK. It's a great tool that work with a wide variety of AI providers. And the SDK works on the frontend and backend, which is pretty neat!",
    url: "https://sdk.vercel.ai/docs",
    type: "sdk",
  },
];

export function getUse(id: number) {
  const use = data.find((use) => use.id == id);

  if (!use) {
    throw new Error(`Cannot find use with id ${id}`);
  }

  return use;
}

type Filters = {
  type?: Use["type"];
  highlight?: Use["highlight"];
};

export function getUses(filters?: Filters) {
  const { type, highlight } = filters || {};

  if (type && highlight) {
    return data.filter((use) => use.type == type && use.highlight);
  }

  if (type) return data.filter((use) => use.type == type);
  if (highlight) return data.filter((use) => use.highlight);

  return data;
}

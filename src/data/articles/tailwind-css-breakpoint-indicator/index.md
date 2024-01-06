---
title: "How I Stopped Guessing Breakpoints in Tailwind CSS"
description: Ever struggled with identifying active breakpoints in Tailwind CSS? This tiny React component helps me see which Tailwind breakpoint I'm developing for. No more guesswork.
created: 2023-09-16
highlight: false
topic: "tech"
# tags: [react, tailwindcss, best-practices]
---

Tailwind CSS makes my life easy when it comes to building responsive user interfaces. But, I often find myself wondering which breakpoint is currently active and which CSS rules are being applied to the current screen size. Is my laptop screen `lg` or `xl`? Is `sm` for mobile or tablet? I can never remember.

This can lead to guesswork, which can lead to unexpected visual behaviours. So, I created this simple component below to solve this problem for myself. And hopefully for you too. It renders a tiny badge in the bottom left corner of the screen that shows the current breakpoint. One could even colour code each breakpoint for an even more intuitive dev experience, but I'm happy with the simplicity of this solution.

```tsx
// src/components/screen-size-indicator.tsx

export default function ScreenSizeIndicator() {
  if (process.env.NODE_ENV == "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 rounded bg-zinc-800 px-1 font-mono text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
      {/* Add as many breakpoints as you need */}
    </div>
  );
}
```

I import it into the global layout component so it's rendered on every page, but only in development mode. I use this component on this site, but you can't see it as it returns `null` in production, which tells React not to render it. It could also return `false` or `<Fragment />` for a similar effect.

```tsx
// src/app/layout.tsx (Next.js)

import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ScreenSizeIndicator from "@/components/screen-size-indicator";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" className="antialiased">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScreenSizeIndicator />
      </body>
    </html>
  );
}
```

Now, when I use a preset device size in Firefox's devtools, I know instantly which breakpoint is active without comparing the current width in pixel against Tailwind's breakpoints. I can immediately see that an iPhone 13 mini is `xs`; an iPad is `md` but `lg` in landscape; and and my 13" MacBook Air is `xl`. No guesswork required, no documentation to look up, no surprises. It just works.

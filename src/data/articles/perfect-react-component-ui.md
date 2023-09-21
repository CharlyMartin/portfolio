---
title: "The Perfect React (UI) Component"
description: lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum. lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum. lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum
date: 2023-06-14
tags: [tech, react, ui, component, design, best practices]
---

Each project I collaborate on brings new persectives on how to write better code. Each developer I work with has their own flavours of what clean code means. I've been essentially working with [React](https://react.dev/) for the last 5 years, so naturally I've been exposed to many different minds and ways of doing things.

As a consequence, I've refined the way I write React components a lot. For the last year or so, it has reached a stable state, I'm happy with the way I write components and I instinctively follow the same patterns over and over again. I believe conventions and consistency are such an important part of clean and scalable code. Once you understand them, you feel at home wherever you find yourself in the code. It's like a routine, it makes you feel at home wherever you do it.

Writing this article is an effort to rationalise my thinking and share what I consider to be the _perfect_ way to write a React component. Until I come across a new pattern that will shamble my engineering world and make me rethink everything I know. I'm also hoping to use this article a starting point for discussions with future coworkers, as an open window into my mind.

<!-- What should I do with this?? -->

> I want to walk you through all the micro improvements I've made over the years, and the rationale behind them. These micro decisions feel natural to me, until I have to explain them to someone else. Then I realize how much I've thought about them and how much they matter to me.

## A little tangent on UI components

I'm gonna use UI components, also called presentational components, as an example - I might write a separate article about data components. UI components are responsible for painting the interface (the stuff we see in our web page) and handling user interactions. And that's it. If we consider React components form a tree, UI components are the leaves. They are, usually, at the extremity of your component tree and receive data once it's been fetched, loaded and formatted.

For that reason, UI components should _not_ hold any state - other than UI states, like _is the dropdown open?_ - perform data fetching or contain any business logic. I will add that frontend apps should not contain any business logic in general, but that's for another article.

UI components are often referred as _dumb_, a bit harsh! I prefer the term agnostic. Both mean the same thing: they have no awareness of their surroundings. They do not know anything about the data they display, they just display it. They are pure in that sense, they only rely on inputs.

If you follow this rule and separate concerns between UI and data, you can port UI components from one project to another. They will work almost as is, with mininal design tweaks. It's like having a private component library you carry around with you.

## Let's use a button as an example

A button component is a great example because:

- it's present in almost every project
- it's responsible for both painting the UI and handling important user interactions
- it can contains many states and variants
- it has accessibility concerns
- it looks simple but it requires a lot of attention to detail

### Show me the code!

My `<Button>` component looks like this:

```tsx
import React from "react";
import cn from "classnames";
import type { IconType } from "react-icons";

import Loader from "./loader";

type Props = {
  variant?: "primary" | "secondary" | "cancel";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: IconType;
  iconRight?: IconType;
} & React.ComponentProps<"button">;

const chars = ["-", "\\", "|", "/", "-", "\\", "|", "/"];

export default function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    loading,
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={cn(
        "w-full font-sans",
        variant == "primary" && "btn-primary", // Mutually exclusive union operators
        variant == "secondary" && "btn-secondary",
        variant == "cancel" && "btn-cancel",
        disabled && "btn-primary btn-disabled",
        (disabled || loading) && "cursor-not-allowed",
        size == "sm" && "rounded-md px-2 py-1 text-xs",
        size == "md" && "w-auto rounded-md p-2 px-3 text-sm",
        size == "lg" && "rounded-lg px-3 py-2.5 text-base",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {renderChildren(props)}
    </button>
  );
}

function renderChildren(props: ButtonProps) {
  const { loading, children, icon, size = "xl" } = props;

  if (loading) return <Loader chars={chars} />;
  if (!icon) return children;

  const { src: Icon, side } = icon;

  const iconSize = cn(
    size == "xs" && "10px",
    size == "sm" && "12px",
    size == "md" && "14px",
    size == "lg" && "16px",
    size == "xl" && "18px"
  );

  const iconMargin = cn(
    size == "xs" && "0.25rem",
    size == "sm" && "0.25rem",
    size == "md" && "0.25rem",
    size == "lg" && "0.375rem",
    size == "xl" && "0.375rem"
  );

  return (
    <span className="flex items-center justify-center">
      {side == "left" && (
        <Icon
          style={{ marginRight: iconMargin, marginTop: "1px" }}
          size={iconSize}
        />
      )}
      {children}
      {side == "right" && (
        <Icon
          style={{ marginLeft: iconMargin, marginTop: "1px" }}
          size={iconSize}
        />
      )}
    </span>
  );
}
```

<!-- Also show the Tailwind CSS file -->

### Tools

Before we jump in the code, here's a list of the essential tools I'm using to build components. My stack of choice is:

- [Next.js](https://nextjs.org/) - a React framework with tons of built-in configuration making frontend development and deployment a breeze
- [Typescript](https://www.typescriptlang.org/) - for type safety and enable better IDE support like autocompletion and error checking
- [Tailwind CSS](https://tailwindcss.com/) - It's CSS on steroids, but I love that it's still good old CSS.
- [classnames](https://www.npmjs.com/package/classnames) / [clsx](https://www.npmjs.com/package/clsx) - A neat utility to conditionally apply CSS classes.

For buttons specifically, I also use [React Icons](https://react-icons.github.io/react-icons/) in case I need to display an icon next to the call to action.

## Breaking down the code

I'm gonna walk you through the code and explain each decision I've made.

### Imports

At the top of every component file, we find the list of imported modules. I like to separate them in 2 groups:

1. External libraries, such as React and other node modules
2. Internal modules, such as other components or utility functions

```tsx
import React from "react";
import cn from "classnames";
import type { IconType } from "react-icons";

import Loader from "./loader";
```

Whenever I need to import a module, I add it to the bottom of the relevant list. I don't try to reorder this list as I add new imports, for cleaner git diffs. I just like to have `import React from "react"` at the top of the file, even though Next.js doesn't require us to import React. It [automatically adds it when jsx is detected](https://github.com/vercel/next.js/issues/12964#issuecomment-629642157) - or `tsx`.

But I still like to import it at the top of the file, for consistency. And more often than not, I end up using some React module, like `useState`, or some type, like `React.ComponentProps`. By having React imported at the top automatically, I don't have to move it up the list when I end up needing it. And it makes the component more portable, should I need to copy/paste it in another React environment. I think it's a good habit to have.

Finally, I like to explicity `import type` when I import a type. It's not required, and TypeScript is smart enough to know whether a module is a type, but I find it easier to scan, for readability purposes.

### Typing Props

This is where TypeScript shines. Typing props is a great way to list what inputs are needed to make this component work. And allows the IDE to provide autocompletion as you use thet component later one.

```tsx
import React from "react";
import type { IconType } from "react-icons";

type Props = {
  variant?: "primary" | "secondary" | "cancel";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: IconType;
  iconRight?: IconType;
} & React.ComponentProps<"button">;
```

I use types over interfaces, because I find `TypeA && TypeB` more intuitive than `InterfaceA extends InterfaceB`. It's a personal perference, and I believe the consensus in the TypeScript community. In this case, all the props are optional. I will explain why later on.

<!-- HERE! -->

Always extend the native HTML element props, so that you can pass any prop to the component. This is especially useful for the `Button` component, which is a wrapper around the native `button` element.

I usually call it `Props`, not `ButtonProps`, and declare it next to the component. If for some reason I need this type outside of the module, I export it and rename it in the import, to avoid name collision with the local component.

```tsx
import React from "react";

import { Props as ButtonProps } from "./button";

type Props = {
  // ... list of props
  message: ButtonProps["children"];
};

export default function WrapperComponent(props: Props) {
  const { message, ...otherProps } = props;

  return (
    <>
      {/* ... */}
      <Button>{message}</Button>
    </>
  );
}
```

## Function Declaration

This is a side note, not specific to UI components, but I like to use function declaration instead of function expression for my components. because it makes it easier to name the function, which is useful for debugging.

`export default function Button` in one go.

## Destructuing Props

I like to destructure props at the top of the component's body to clearly list the variables that will be used below.

Destructuing props is also great to set default values. It's good to have flexible components that can accept many props and have many variants. It's even better to have sensible defaults so that components render what you want in most cases, that is the most use case in your app.

Apps I've work on usually have the primary variant used a lot, and a secondary button used for some "destructuve" actions like close modals or cancel actions. I tend to think most apps So I set the variant to `primary` and size to `lg` by default. It yields the desired result in most cases, and it's easy to override when needed.

```tsx
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", ...rest } = props;

  return <button {...rest}>...</button>;
}
```

One could argue that forcing to pass the `variant` and `size` make clearer what version of a component is used in a given instance. Both are valid points, it depends on your use case. If you use many variants and sizes, then it might be best to follow this route.

Flexibility doesn't matter as much if you get the defaults right.

I also like to destructure props outside of the function declaration. I find it more readable, especially when you have many props. It's also easier to add new props, as you don't have to move the closing parenthesis.

```tsx
// ✅ I find this more readable...
export default function Button(props: ButtonProps) {
  const { prop1, prop2, prop3, prop4, ...rest } = props;

  return <button {...rest}>...</button>;
}

// ❌ ... than this
export default function Button({
  prop1,
  prop2,
  prop3,
  prop4,
  ...rest
}: ButtonProps) {
  return <button {...rest}>...</button>;
}
```

type = "button", // Do not do that, so that you can use the button in a form
A default I never set is the one above. I want my button to submit the form by default, so that I can use it in a form without having to pass the `type` prop, which is the standard HTML behaviour.

Finally, I then pass and spread the `...rest` to whatever is rendered.

## Return

Return an actual button element, not a div. This has many accessibility implications, like the ability to submit a form by pressing enter.

<!-- Destructuring Props -->

<!-- consistent formatting -->

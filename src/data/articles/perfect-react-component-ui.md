---
title: "The perfect React (UI) component"
description: Writing this article is an effort to make explicit all the implicit decisions I make when building React components and document what I consider to be the best way to do so.
created: 2023-11-14
highlight: false
topic: "code"
---

I've been essentially working with [React](https://react.dev/) and its ecosystem for the last 5 years. Each project and developer has exposed me to new perspectives on how to write _good_ code. As a consequence, I've refined the way I write React components a lot. For the last year or so, my thinking has reached a stable state, and I instinctively follow the same patterns.

Writing this article is an effort to make explicit all the implicit decisions I make when building React components and document what I consider to be the best way to do so. At least for now, until my thinking evolves again.

## The Button Example

I'm going to use a button component to illustrate my points. I like this example because even though they look simple enough at first, they require a lot of attention to detail. They are a crucial part of any website and are present in almost every project. They paint the UI and handle key user interactions, sometimes even navigation. They can have many states (disabled, focus, active, etc.), usually come in a bunch variants and sizes, and have accessibility concerns. In short, you don't want to mess them up.

Here's how my `<Button>` component looks like. You can play around with the code in [this sandbox](https://stackblitz.com/edit/stackblitz-starters-ugbdid?file=src%2Fbutton.tsx) I created for this article. The prop interface is inspired by [Chakra UI](https://chakra-ui.com/docs/components/button/usage), a great component library for React.

```tsx
import React from "react";
import { twMerge } from "tailwind-merge";
import { PiSpinnerBold } from "react-icons/pi";
import type { IconType } from "react-icons";

export type Props = {
  color: "primary" | "secondary";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
} & React.ComponentProps<"button">;

export default function Button(props: Props) {
  const {
    color,
    variant = "solid",
    size = "lg",
    className,
    children,
    disabled,
    loading,
    loadingText,
    iconLeft,
    iconRight,
    ...rest
  } = props;

  return (
    <button
      className={twMerge(
        // Base
        "rounded-full tracking-tight transition-colors duration-150",
        !disabled && !loading && "active:translate-y-[1px]",

        // States
        disabled && "cursor-not-allowed opacity-70",
        loading && "cursor-wait opacity-90",

        // Size
        size == "xl" && "px-10 py-4 text-xl font-bold",
        size == "lg" && "px-8 py-2.5 text-lg font-semibold",
        size == "md" && "px-6 py-2 text-base font-medium",
        size == "sm" && "px-4 py-1.5 text-sm font-medium",

        // Primary
        color == "primary" &&
          variant == "solid" &&
          "bg-indigo-600 text-white hover:bg-indigo-700",
        color == "primary" &&
          variant == "ghost" &&
          "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
        color == "primary" &&
          variant == "outline" &&
          "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-600 hover:bg-indigo-50",

        // Secondary
        color == "secondary" &&
          variant == "solid" &&
          "bg-emerald-600 text-white hover:bg-emerald-700",
        color == "secondary" &&
          variant == "ghost" &&
          "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
        color == "secondary" &&
          variant == "outline" &&
          "bg-white text-emerald-700 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-50",

        // Custom
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {renderChildren({
        children,
        loading,
        loadingText,
        iconLeft,
        iconRight,
      })}
    </button>
  );
}

type ChildrenProps = Pick<
  Props,
  "children" | "loading" | "loadingText" | "iconLeft" | "iconRight"
>;

function renderChildren(props: ChildrenProps) {
  const {
    children,
    loading,
    loadingText,
    iconLeft: IconLeft,
    iconRight: IconRight,
  } = props;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <PiSpinnerBold className="mr-2 animate-spin" />
        {loadingText || "Loading..."}
      </div>
    );
  }

  if (IconLeft || IconRight) {
    return (
      <div className="flex items-center justify-center">
        {IconLeft && (
          <IconLeft className="-ml-[0.4em] mr-[0.6em] h-[1.2em] w-[1.2em]" />
        )}
        {children}
        {IconRight && (
          <IconRight className="-mr-[0.4em] ml-[0.6em] h-[1.2em] w-[1.2em]" />
        )}
      </div>
    );
  }

  return children;
}
```

Before we jump into explanations, here's the list of the tools I use to build this component (and most React projects):

- [Next.js](https://nextjs.org/), a React framework with tons of built-in configuration, making frontend development and deployment a breeze,
- [Typescript](https://www.typescriptlang.org/), for type safety and to enable better IDE support like auto-completion and error checking,
- [Tailwind CSS](https://tailwindcss.com/), it's CSS on steroids, but I love that it's still good old CSS,
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge), similar to the [classnames](https://www.npmjs.com/package/classnames) utility, but tailored for Tailwind CSS,
- and [React Icons](https://react-icons.github.io/react-icons/), a collection of popular icon libraries as React components.

Now, let's go over the code top to bottom together!

## Import Statements

At the top of every React component file, we find the list of imported modules. I usually split imports into 2 groups: the external libraries, such as React and other node modules, and the internal modules, such as other components or utility functions. Then, whenever I need to import a module, I add it to the bottom of the relevant list. I don't try to reorder this list as I add imports for cleaner git diffs. I only use external libraries in this example, so there's only one group.

```tsx
import React from "react";
import { twMerge } from "tailwind-merge";
import { PiSpinnerBold } from "react-icons/pi";
import type { IconType } from "react-icons";
```

I like to have `import React from "react"` at the top of the file, even though Next.js doesn't require us to do so - it is clever enough to [automatically add it when jsx is detected](https://github.com/vercel/next.js/issues/12964#issuecomment-629642157). But I still like to have it there for consistency. And more often than not, I end up using some React module, like `React.useState`, or some types like `React.ComponentProps`. Having React imported at the top mechanically means I don't have to move it up the list when I need it. Plus, it makes the component more portable should I need to copy/paste it outside a Next.js project.

Finally, I like explicitly specifying the `import type` when relevant. It's not required, and TypeScript is smart enough to know what imported modules are, but I find it easier to read.

## Props Type

This is where TypeScript with React shines. Typing the `props` object is a great way to list the inputs needed to make the component work. It also allows the IDE to provide autocompletion when you - or one member of your team - use the component later.

```tsx
export type Props = {
  color: "primary" | "secondary";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
} & React.ComponentProps<"button">;
```

First, I like to use types over interfaces; I find `TypeA & TypeB` more intuitive and concise than `InterfaceA extends InterfaceB`. It's a personal preference, and I believe the consensus in the community.

This type definition is relatively straightforward; I list a bunch of variants and sizes. Only the `color` prop is required, while the rest are optional. The optional properties have default values set inside the component; we'll review these in a minute. What is worth talking about is the last line: `& React.ComponentProps<"button">`. It automatically adds to our custom type all the right attributes for our button element, like `className`, `type`, `disabled`, `onClick`, etc.

When I started using Typescript, I made the mistake of typing all these attributes manually. Not only is it a tedious process, it's almost always wrong and incomplete. There are dozens of prop attributes for each React element, some of which are pretty exotic. On top of that, the type of each attribute is not as obvious as you might think. I used to type the `onClick` handler as `() => void;`, when in reality it is `MouseEventHandler<T> | undefined;`. Quite a difference. And this is just one instance, there are many more details like this. You get all of them available for free and correctly typed by adding this type union. A worthwhile investment!

Last thing worth nothing, I name this type declaration `Props`, not `ButtonProps`, and declare it next to the component. If for some reason I need to use this type outside of the module, I export it and rename on the go, to avoid name collision with the local component, as shown below.

```tsx
import { Props as ButtonProps } from "@/components/button";

type Props = {
  // ... list of props
  message: ButtonProps["children"];
};

export default function Section(props: Props) {
  const { message, ...otherProps } = props;

  return (
    <React.Fragment>
      {/* Other Components */}
      <Button>{message}</Button>
    </React.Fragment>
  );
}
```

## Function Declarations over Expressions

I like to use function declarations instead of function expressions for my components. This is not specific to React components. I only use arrow functions for callbacks, and function declarations for everything else. There's a readability aspect to it; the `function` keyword makes it evident that it's a function declaration. And there are also some cool things you can only do with declarations.

Like you saw in the sample code above, I'm able to declare the `renderChildren` function after calling it. We can do it thanks to how the JavaScript compiler hoists function declarations. In my code, the `renderChildren` function is an implementation detail; it's only used locally, so I "hide" it by putting it at the end of the file.

Hence, I can write the most important function, the React component, as the first function of the file and export it in one go with the `export default`, something I couldn't do with a `const` function expression.

## Destructuring Props

I like to destructure the `props` object at the top of the component's body, outside the function declaration. I find it more readable, especially when you have many props.

```tsx
export default function Button(props: Props) {
  const {
    color,
    variant = "solid",
    size = "lg",
    className,
    children,
    disabled,
    loading,
    loadingText,
    iconLeft,
    iconRight,
    ...rest
  } = props;

  // ...
}
```

I like this pattern for a number of reasons. First, it's a visual way to explicitly list the properties at use in the component. I find it cleaner to create local variable names instead of calling `props.color` or `props.variant` everywhere in the component.

Second, it's a great way to set default values for the optional props. You may remember that only the `color` prop is required when using the component. The `variant` and `size` are optional and have default values. It's a personal preference; I optimize for the most common case. One could turn the `color` prop optional and default to `primary`. It would make sense if that colour was used in most instances in your app. That ultimately depends on the project. It's nice to have flexible components that accept many props and create many variants with one module. It's even nicer to have sensible defaults so that your component renders what you want in most cases.

Third and finally, I group in the `...rest` variable all the properties I don't use explicitly but still need to pass to the rendered element, like `type`, `onClick`, `value`, `id`, etc.

Side note: I never set a default value for the `type` attribute. When inside form tags, buttons automatically submit the form they belong to when clicked or when the user presses enter. This is the standard HTML behaviour, and I want to keep it. If I explicitly set `type = button` as a default, I override it.

## Return Statement

I return a `<button>` element, not a `<div>`. This has some accessibility implications, like the ability to submit a form by pressing enter, as I mentioned above, or the ability to tab to the button.

```tsx
return <button>{children}</button>;
```

## Button Attributes

The 2 attributes I set are `className` and `disabled`. The other ones are passed to the button element via the `...rest` variable.

```tsx
<button
  className={twMerge(
    // Base
    "rounded-full tracking-tight transition-colors duration-150",
    !disabled && !loading && "active:translate-y-[1px]",

    // States
    disabled && "cursor-not-allowed opacity-70",
    loading && "cursor-wait opacity-90",

    // Size
    size == "xl" && "px-10 py-4 text-xl font-bold",
    size == "lg" && "px-8 py-2.5 text-lg font-semibold",
    size == "md" && "px-6 py-2 text-base font-medium",
    size == "sm" && "px-4 py-1.5 text-sm font-medium",

    // Primary
    color == "primary" &&
      variant == "solid" &&
      "bg-indigo-600 text-white hover:bg-indigo-700",
    color == "primary" &&
      variant == "ghost" &&
      "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    color == "primary" &&
      variant == "outline" &&
      "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-600 hover:bg-indigo-50",

    // Secondary
    color == "secondary" &&
      variant == "solid" &&
      "bg-emerald-600 text-white hover:bg-emerald-700",
    color == "secondary" &&
      variant == "ghost" &&
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    color == "secondary" &&
      variant == "outline" &&
      "bg-white text-emerald-700 ring-1 ring-inset ring-emerald-700 hover:bg-emerald-50",

    // Custom
    className
  )}
  disabled={disabled || loading}
  {...rest}
>
  // ...
</button>
```

The `className` attribute is where the magic of Tailwind CSS happens. First, I call the `twMerge` utility function, which takes any number of arguments, filters out the falsy ones, and returns a concatenated string with the rest. It essentially builds a string of CSS classes. `twMerge` also prevents conflicts in the Tailwind classes you pass to it. For instance, if two classes targeting the same property are present, like `text-white` and `text-black`, it will only keep the last one. Very handy!

Thanks to `twMerge`, I can conditionally apply classes based on the button size, colour and variant, and create many button styles. I defined 2 colours, 3 variants, and 4 sizes, which gives me 24 possible combinations. Not bad! And if one button instance requires a one-off style, I can apply new Tailwind classes via the `className` prop to override the default design while keeping the core functionality. This is possible because `className` variable is the last argument of the class list.

Side note: You may have noticed, or choked on your muffin, that I use the "dangerous" double equal operator instead of the stricter triple equal one. I blame [Kyle Sympson](https://github.com/getify) for opening my eyes to this matter. If you know the types being compared, and you should always know the types at hand in your program, `==` and `===` do exactly the same thing. They only differ when types are different, in that `==` allows coercion before the comparison while `===` doesn't. In our case, we know for a fact that `color`, `variant`, and `size` can only be of type string, and that the value of these strings will always be the handful ones listed in the props type. TypeScript will yell at us if we try to pass a different value before the code has a chance to run in the browser. So, `==` is fine. I would even say it's encouraged!

Last, the `disabled` attribute of the button is set to `true` whenever the `disabled` or `loading` props are `true`. That renders the button unclickable when it is in its loading state. Most buttons trigger an async operation, like submitting a form to a server, and you want users to submit the form only once. So, as soon as the form is submitted, I disable the button until the server responds. [React Query](https://tanstack.com/query/latest) exposes an `isLoading` boolean that integrates nicely with this component.

## Button Children

Finally, let's talk about the children of the component. I want to render children conditionally depending on the value of the `loading`, `loadingText`, `iconLeft`, and `iconRight` props. Instead of having a bunch of `if` statements, I prefer to use a `renderChildren` function to keep the code readable.

```tsx
<button>
  {renderChildren({
    children,
    loading,
    loadingText,
    iconLeft,
    iconRight,
  })}
</button>;

// ...

function renderChildren(props: ChildrenProps) {
  const {
    children,
    loading,
    loadingText,
    iconLeft: IconLeft,
    iconRight: IconRight,
  } = props;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <PiSpinnerBold className="mr-2 animate-spin" />
        {loadingText || "Loading..."}
      </div>
    );
  }

  if (IconLeft || IconRight) {
    return (
      <div className="flex items-center justify-center">
        {IconLeft && (
          <IconLeft className="-ml-[0.4em] mr-[0.6em] h-[1.2em] w-[1.2em]" />
        )}
        {children}
        {IconRight && (
          <IconRight className="-mr-[0.4em] ml-[0.6em] h-[1.2em] w-[1.2em]" />
        )}
      </div>
    );
  }

  return children;
}
```

In a nutshell, the `renderChildren` function renders in this order:

1. A spinner icon with some loading text when the `loading` prop is `true`
2. An icon on the left or right of the children when the `iconLeft` or `iconRight` props are set. Nothing prevents the user from passing both props and having 2 icons, but fixing this visual "bug" is easy.
3. If none are set, it will render the children as is.

I like to use the `&&` operator to conditionally render JSX. This operator returns _the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy._, as per [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND).

The idea behind this common pattern is to have the first operand as a dynamic value, hence potentially false, and the second operand as a JSX snippet or a string, hence always truthful. If the first operand is falsy, the comparison stops and the falsy value is returned, usually `false`, `null` or `undefined`, which tells React not to render anything. If the first operand is truthy, the comparison continues and the second operand is returned, so it gets mounted by React.

Finally, I would like to point out that `renderChildren` is not a React component but rather a plain JavaScript function conditionally returning JSX snippets. It won't add a new node to the React tree, it will only return the right children to be rendered by the button component. Because I only use it internally for cleaner code, I don't feel the need to create a component for it.

## That's it, folks!

And there you have it, my perfect React component! If you wish to play with the code, I created a CodeSandbox demo. I hope you learned something or at least enjoyed reading this article. I will come back to it and update it as I learn new things and change my mind on some of the points I made.

Happy hacking!

<!-- Create ESling rules with all the preferences below -->

<!-- Flexibility doesn't matter as much if you get the defaults right. -->

---
title: "The deception of rendering React children"
description: All React developers learn early on that when a component re-renders, so do all of its children. But there's a nuance to this foundational concept that's not immediately obvious.
created: 2024-02-22
highlight: false
topic: "code"
---

I understand why impostor syndrome runs wild among programmers. Behind each language's high-level concepts hide endless implementation details and technicalities. And we, programmers, work with half a dozen of them on a weekly basis. So, naturally, we tend to learn as we go and let our intuition fill the gaps. We create cognitive shortcuts and leave the details out, lest our brains explode. We overly simplify what is, in reality, more nuanced.

Then, one day, we discover that something we assumed to be unquestionably true is not. This article is a story about one of those times. It's scary to think back on all the code I've written with an incorrect mental model. And it's equally remarkable to realise that it's never stopped me from contributing quality code to many projects. A beautiful metaphor for life.

So, let's dive into the topic of the day: React components. More specifically, component composition. I was today years old when I learned that components passed as children don't re-render when their parent does. Let me say that again because it's a bit of a mind-bender, to stay polite: **A React component passed via the children prop does not re-render when its parent does.** If you feel caught off guard or dizzy after reading this statement, you know how I felt a few days ago. Welcome to the Matrix, Neo.

## The docs deceived us (sort of)

<!-- I don't recall reading about this fact in the documentation, or anywhere else.  -->

The [React documentation](https://react.dev/learn/render-and-commit) clearly states that a component re-renders when the state of one of its ancestors changes. [Josh Comeau](https://twitter.com/JoshWComeau) also explains this foundational concept in his excellent article [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/): _when a component re-renders, it also re-renders all of its descendants._ This is React 101: The user clicks a button, some data gets fetched or updated, the component's state changes, it gets re-rendered, and so do all of its children.

All of the above is absolutely true, but there's a nuance. The call site of the component decides whether it will re-render with its parent, and the visual hierarchy of JSX can be misleading in that regard. It's easy to assume a parent-child relationship between components where there is none. React introduced JSX, I imagine, to make front-end developers coming from HTML feel at home. But, as I just discovered, this familiarity can create false assumptions when composing components.

React allows components to be composed in a number of ways, and depending on the one you choose, they may or may not re-render with their parents. So, let's explore this nuance together. I can think of three ways to compose components in React, meaning passing components to other components.

<!-- HTML is a markup language (what ML stands for), it's static, there's no concept of function calls or re-rendering. JSX, on the other hand, is a syntax extension of JavaScript. Where the component is called and where it's rendered can differ, depending on how you choose to compose components. -->

<!-- This is React 101: The user clicks a button, some data gets fetched or updated, the component's state changes, it gets re-rendered and so do all of its children. But the answer is more nuanced than that, as I just stated above. -->

### 1. The import way

The first way is something React developers do all the time: directly import a component from another module and call it inside the exported component. In the code below, `App`, the exported component, renders a div which in turn renders `Child`.

The call site of the imported component is inside the parent component, which makes one the descendant of the other. When `App` re-renders, it will re-render the div, which will then re-render `Child` in a recursive fashion. There's no funny business; the visual hierarchy and re-rendering chain match.

```tsx
import Child from "@/components/child";

export default function App() {
  return (
    <div>
      <Child />;
    </div>
  );
}
```

This is great for composability but doesn't make `App` very reusable. The child component is hard-coded inside the parent. If it was a layout component, for instance, it would be hard to use it in another context. This is where the second and third ways come in.

<!-- As a side note, re-rendering doesn't necessarily mean users see a change on their screen. It means the component is called again by React. If the returned JSX differs from the previous one, the DOM is updated, and the UI changes accordingly. -->

### 2. The reference way

The second way I can think of is a bit more abstract and less common, but it's still a valid way to compose components in React. It consists in passing a reference to the component via a prop. The name of the prop doesn't matter; what matters is that only a reference is passed. In the code below, a reference to `Child` is passed down to `Parent`, where it gets called. The call site of `Child` is inside `Parent`, so when `Parent` re-renders, `Child` does too.

This example is fairly similar to the first example, in fact. Whether we import the component from a different file or from the same file, or pass it as a prop, the result is the same. The call site is inside the parent, and the re-rendering chain is preserved. But, `Parent` is now more reusable, as it can render any component passed to it.

<!-- import the reference to the component from another file, then call it. In this example, we import the reference, pass it as a prop, then call it.  -->

```tsx
// src/components/app.tsx
import Parent from "@/components/parent";
import Child from "@/components/child";

export default function App() {
  return <Parent component={Child} />;
}

// src/components/parent.tsx
type Props = {
  component: () => React.ReactElement;
};

export default function Parent(props) {
  const { component: Component } = props;

  return (
    <div>
      <Component />
    </div>
  );
}
```

We could also include the render prop pattern in this category, which is a prop that takes a function and returns a React element. The function is defined outside the parent component but called inside it. In the code below, we pass a JavaScript function to `Parent` via a prop. When the function is called, it returns `Child`. The call site is still inside `Parent`, so the re-rendering chain is preserved.

```tsx
// src/components/app.tsx
import Parent from "@/components/parent";
import Child from "@/components/child";

export default function App() {
  return (
    <Parent
      render={(data) => {
        return <Child data={data} />;
      }}
    />
  );
}

// src/components/parent.tsx
type Props = {
  render: (state: number) => React.ReactElement;
};

export default function Parent(props) {
  const [state, setState] = useState(0);
  const { render } = props;

  return <div>{render(state)}</div>;
}
```

<!-- As a side note, I like to use the render prop pattern to "reverse" the flow of data between components. Usually data flows down from the parent to the child. By passing a function, the child can pass or expose data to the parent. -->

### 3. The children way

The third way is the one we all know and love, the children prop. It's what makes composing components a breeze and React so great at building scalable UIs.

When we look at the code example below, it's obvious that `Child` is a descendant of `Parent`; one is visually inside the other. And If you pop open the React devtools and inspect the component tree, you will see the same thing. `Parent` is responsible for rendering `Child`. If `Parent` were to unmount - meaning to be removed from the React tree - then `Child` and all its descendants would also be removed.

So we have all the reasons to assume that when `Parent` re-renders, `Child` also does. But that's not the case, and where the deception happens. Let's look at the call site. `Child` is not called inside `Parent`, it's called inside `App` and then passed as a prop to `Parent`. So it will re-render when `App` does, not `Parent`. I've put together a [demo sandbox](https://stackblitz.com/edit/stackblitz-starters-uhht8a?file=src%2Fapp.tsx) if you want to see it in action.

```tsx
// src/components/app.tsx
import Parent from "@/components/parent";
import Child from "@/components/child";

export default function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}

// src/components/parent.tsx
export default function Parent(props: React.PropsWithChildren) {
  const { children } = props;
  return <div>{children}</div>;
}
```

The children prop acts as a slot for a React element that comes one level up, like a variable storing the return value of a function call. It's the result, not the call site. We could even rename children something else, and it would be the same issue; the call site is not inside `Parent`.

To make this mechanism more apparent, we could write the same thing by explicitly adding the children prop to `Parent`, as shown below. This gives us a clearer visual clue that `Child` does not live inside `Parent`. It lives in `App` and is passed to `Parent` as a prop.

```tsx
import Parent from "@/components/parent";
import Child from "@/components/child";

export default function App() {
  return <Parent children={<Child />} />;
}
```

### The JavaScript equivalent

In JavaScript land, the same difference exists between passing a reference to a function, what we refer to as a callback, and passing the result of a function. The `children` is the result of the function, not the function itself. Plain JavaScript makes it more obvious, as we can see in the code below.

```ts
function child() {
  return "Some JSX";
}

function parent(props) {
  if (typeof props == "function") return `More JSX ${props()}`;
  return `More JSX ${props}`;
}

parent(child); // reference
parent(child()); // output
```

## How do we "fix" it?

After learning about this non-negligible detail, I looked closely at how I had used the `children` prop in my last few projects. The good news is that I didn't find an instance where it could have introduced a bug. It's probably why I never paid close attention to it before.

I identified two categories of components that rely on the children prop. The first category is what I call the "leaves" of the react tree, the components at the very end of the component tree. Their children are usually text values and do not render anything else. We don't have to worry about breaking the re-rendering chain because nothing is below them.

```tsx
export default function PageTitle(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <h1
      className={cn("pb-8 text-xl font-medium md:pb-12 md:text-2xl", className)}
      {...rest}
    >
      {children}
    </h1>
  );
}
```

The second category of components is higher up in the tree, much closer to the root. They are layout components and render important parts of the UI, so they could, in theory, break the re-rendering chain. But in practice, they don't.

```tsx
export default function PageLayout(props: LayoutProps) {
  const { children, className, ...rest } = props;

  return (
    <main className={cn("mx-auto w-full md:max-w-6xl", className)} {...rest}>
      {children}
    </main>
  );
}
```

Both leaf and layout components are stateless; they are purely presentational. They don't hold any state or logic and cannot trigger an update on their own. Re-renders only happen above or below them, not because of them.

So, in conclusion, I don't think we have to "fix" anything. Still, we have to be careful when we pass children to stateful components because this is where bugs can sneak in. Updating the direct parent's state will NOT trigger an update in the children. This also means using `React.memo` on the children is unnecessary in that context.

## That's a wrap

Thank you for reading this far! I hope you learned something and now understand the nuance of the children prop a bit better. I know I do.

Happy coding ✌️

<!-- Draft -->

<!-- ## What would be the JavaScript equivalent?

In JavaScript land, this is the equivalent of passing a function vs passing the result of a function. In the code below, in the first case the function is called inside the parent, and the result is passed to the child. In the second case, the function is called outside of the parent, and the result is passed to the child. The call site is different, and so is the re-rendering chain.

```ts
function computeSomthing() {
  const value = Math.random() * 100;
  console.log(this, value);
  return value;
}

function getValue(prop) {
  if (typeof prop == "function") {
    const value = prop.bind(this);
    console.log(this, value);
    return value;
  }
  return prop;
}

getValue(computeSomthing()); // the call site is in the global scope
getValue(computeSomthing); // the call site is inside getValue
```

Children is a special prop in React, sort of the syntax sugar for `props.children`.
It's more visible when you use JSX, so that it follows more closely the HTML syntax

It's the JS equivalent of passing the result of a function vs passing a reference to the function itself.

Look at the call site!

<!-- https://legacy.reactjs.org/docs/composition-vs-inheritance.html -->

<!-- It actually doesn't matter if `Child` makes use of the children prop internally. The call is already done, and the hit is taken. --> -->

<!-- https://react.dev/learn/understanding-your-ui-as-a-tree#the-render-tree -->

<!-- Re-rendering a component doesn't mean it will make it to the DOM. A component can re-render and nothing changes. -->

<!-- On the other hand, a DOM update / new browser paint means a the component re-rendered. -->

<!-- And this is where JSX can be deceiving. -->
<!-- This relationship is not as obvious as JSX makes it look, and this is where it can be deceiving.  -->

<!-- Composition -->
<!-- What you see visually on the screen doesn't follow up the update chain -->
<!-- What you see in the component tree dev tools doesn't guarantee re-renders, outside of React.memo -->

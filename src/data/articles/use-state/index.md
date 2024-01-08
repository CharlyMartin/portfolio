---
title: "React evaluates the state more than I thought"
description: TODO
created: 2024-01-8
topic: "tech"
# link: https://codesandbox.io/p/sandbox/react-button-tailwind-62xm23
---

A few days ago I was browsing the React documentation. I stumbled upon a bit about the initial value of `useState` hook that I made me pause:

> It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.

I was surprised. I know that passing a function to `useState` is a way to lazily initialise the state. But it made me wonder, what happens to non-function values then? If they are not ignored and evaluated on re-renders, could they be setting the state? That goes against my mental model of `useState`.

In my mind, the only way to update a given state is via its associated setter function. And this is absolutely true. But I never payed much attention to the initial value and assumed it was used once and then "thrown away" by React. This is not the case, as I learned.

I couldn't find an answer in the docs, so I decided to create a little experiment and see for myself.

<!-- that whatever value I pass to the `useState` hook is used once and then ignored. I was wrong. -->

## Experiment 1

I created two similar components rendering a simple form with a single text input field. They both render the same JSX and both rely on a local `useState` to control the value of the input field. They only differ in the way their state is initialised.

```jsx {11, 24}
import React from "react";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div className="container" style={{ background: "#fee2e2" }}>
          <Form />
        </div>

        <div className="container" style={{ background: "#dcfce7" }}>
          <LazyForm />
        </div>
      </div>
    </div>
  );
}

// The parameter of useState will get evaluated on mount and every re-renders
function Form() {
  const [name, setName] = React.useState(
    console.log("runs in Form") || "Charly"
  );

  return (
    <form>
      <label htmlFor="name">Form: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}

// The parameter of useState will only get evaluated on mount
function LazyForm() {
  const [name, setName] = React.useState(() => {
    console.log("runs in LazyForm");
    return "Charly";
  });

  return (
    <form>
      <label htmlFor="name">Lazy Form: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}
```

The first one uses a value:

```jsx
const [name, setName] = React.useState(
  console.log("runs in Form") || generateRandom()
);
```

And the second one uses a function:

```jsx
const [name, setName] = React.useState(() => {
  console.log("runs in LazyForm");
  return generateRandom();
});
```

In each of them, I added a logger in each where the state gets initialised to see when they run.

I also added

the second one uses a string. Both components log the state to the console on every render.

The answer is a nutshell is this: **evaluation is different than assignment**.

I was today years old when I learned that useState re-evaluates the initial parameter on every render.

My mental model for useState was that it's never changes unless you call the setter function. It is true, but I was oversymplifying it.

---

Unless some state changes up the component, React calls a function only once. In React linguo, this is called rendering a component, or mounting a component if it's the first time it's being rendered.

Bugs happen in your mind, not in the code. The code always done what it's instructed to do. Sometimes our minds believe a given code will run a certain way, because there's a gap in our knowledge, a bug in our minds.

---

Even though it re-evaluates the parameters, the initial value is still persisted and useState keeps its promise. The state can only update via the associated setter function.

---

Some useful lingo.
Mount is when React adds the component to the component tree. The component didn't exist before, it's the first time it's being rendered. React didn't know about it before, it's being mounted.

Rendering means react is call the function associated with the component again. But the component is already in the component tree, so react re-renders it, computes the diff with the previous version, and updates the DOM accordingly.

<!-- https://reacttraining.com/blog/mount-vs-render -->

If you're reading from localStorage or computing the value to set your state, you might want to wrap these operations in a function. These can be expensive operations and slow down your app as it grows. Sometimes you might need expensive operations, but in this case, not only are they expensive, but they are also unnecessary. You can avoid them by wrapping them in a function.

Alternatively, you can lift the state initialiser to the parent component and pass it down via a prop. This way it gets evaluated outside the component and only the final value makes it to the component's state, not the operation.

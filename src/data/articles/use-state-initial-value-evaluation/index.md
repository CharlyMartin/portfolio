---
title: "React evaluates the initial value of useState more than I realised"
description: TODO
created: 2024-01-08
highlight: false
topic: "code"
---

As I was browsing the React documentation a few days ago, I stumbled upon [this line](https://react.dev/reference/react/useState#parameters) about `useState` and its `initialState`, React's way to initialise a local state. The line read:

> It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.

I paused for a second. I instinctively knew that passing a function to `useState` was better for performace. What I failed to consider until now was the other side of this coin: If function arguments are ignored after the initial render, what happens to non-function values then? If they are not ignored on re-renders, could they be modifying the state? That goes against my elemental understanding of `useState`, the most fundamental hook in React.

In my mind, the only way to update a given state is via its associated setter function. But I never payed much attention to the initial value. I assumed that it was used once and then disregarded, thrown away by React. This is not the case, as I learned. JavaScript doesn't work like that, and React is JavaScript.

I decided to run a little experiment to see for myself how `useState` treats its parameter. Here they are.

## Experiment 1 - Triggering re-renders locally

For this [first experiment](https://codesandbox.io/p/sandbox/use-state-1-hnlnzj?file=%2Fsrc%2FApp.js), I've created two similar components rendering a single text input within a form. Nothing fancy. Both components render the same React elements and both rely on `useState` to control the value of the text input. They only differ in the way their state is initialised.

The first one uses a primitive value, a string, and the second one a function declaration. I've added a `console.log` alongside each initialiser to see how many times they are called. To "attach" a logger to a primitive value, I've used the [OR logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR), written as `||`. It evaluates expressions left to right and returns the first truthy value. The first expression, `console.log`, evaluates to `undefined`, which is falsy, so the second expression is evaluated and the operator returns `"Charly"`.

```jsx {18, 31-32}
import React from "react";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <PrimitiveValue />
        <FunctionValue />
      </div>
    </div>
  );
}

function PrimitiveValue() {
  const [name, setName] = React.useState(
    console.log("runs in PrimitiveValue") || "Charly"
  );

  return (
    <form className="container" style={{ background: "#fee2e2" }}>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}

function FunctionValue() {
  const [name, setName] = React.useState(() => {
    console.log("runs in FunctionValue");
    return "Charly";
  });

  return (
    <form className="container" style={{ background: "#dcfce7" }}>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}
```

To my surprise, the first component, the one using a primitive value, logs `"runs in PrimitiveValue"` every time I type in the text field. That means everytime the state changes and the component re-renders, the primitive is evaluated. The second component, the one using a function declaration, only logs `"runs in FunctionValue"` once, on mount, as the documentation promised.

It's got my thinking, if the initial value is evaluated on every re-render, could it be interacting with the state? Again, it would be wild and go against my fundamental understanding of `useState`.

I've expanded on the experiment to find out.

## Experiment 2 - Trigger re-renders globally

For the [second experiment](https://codesandbox.io/p/sandbox/use-state-2-w3pxfk?file=%2Fsrc%2FApp.js%3A1%2C1-52%2C1), I have made the initial value of the state dynamic using `Math.random()`. I've also added a button in the `App` component to trigger a re-render in both children components. Finally, I turned the text inputs into paragraph tags to simplify the code.

The goal is to see how the state reacts when it gets a new initial value on re-renders. And with a randomised value, we are guaranteed to get a new value on each function call. Passing a dynamically-generated value to `useState` is not common in a React applications. It might be the first time I try it, so perhaps I've overlooked it and missed on an important detail.

So let's run the experiment!

```jsx {6, 10-12, 23, 30, 37, 44}
import React from "react";

import "./styles.css";

export default function App() {
  const [state, setState] = React.useState(false);

  return (
    <div className="App">
      <div style={{ textAlign: "center", padding: "8px" }}>
        <button onClick={() => setState(!state)}>Re-render</button>
      </div>

      <div style={{ display: "flex" }}>
        <PrimitiveValue />
        <FunctionValue />
      </div>
    </div>
  );
}

function PrimitiveValue() {
  const value = generateRandom();
  const [name] = React.useState(
    console.log("runs in PrimitiveValue: " + value) || value
  );

  return (
    <div className="container" style={{ background: "#fee2e2" }}>
      <p>{name}</p>
    </div>
  );
}

function FunctionValue() {
  const [name] = React.useState(() => {
    const value = generateRandom();
    console.log("runs in FunctionValue: " + value);
    return value;
  });

  return (
    <div className="container" style={{ background: "#dcfce7" }}>
      <p>{name}</p>
    </div>
  );
}

function generateRandom() {
  return (Math.random() + 1).toString(36).substring(6).toUpperCase();
}
```

On the first render, the values logged in the console match the respective values in the paragraph tags. So far so good. When I click "Re-render", only the first component logs an output, and I can see new random values being evaluated and popping up the console. But, the value of the paragraph tag remains the same. It means these new values do NOT interfere with the current state, they are only evaluated. Phew, that's a relief!

## Takeaways

The React documentation is right, as expected. I created a simplified, and wrong, mental model around `useState` and the evaluation concept. In the context of the argument of a function, evaluating means retrieving the value associated with a variable, or allocation memory for a value if it's not tied to a variable. But, **evaluating does not mean assigning**, and this is where my mind jumped to conclusions.

**The ONLY way to update a given state is by calling its associated setter function.** If the setter function is never called, React guarantees that the value of the state remains the same. All is well, the internet will not fall apart overnight, we can sleep tight.

In hindsight, this behaviour makes sense. React components are just JavaScript functions. Apart from some exotic JSX syntax, they have to abide by the same rules as any other function. When React re-renders a component, the JavaScript function gets called again and its inner code gets executed, but the JavaScript engine treats primitive values and function declarations differently.

At runtime, primitives are executed immediately, that's why we see the logs in our first component every time it renders. Function declarations, on the other hand, only get executed when they are called. The compiler "sees" them but only allocates memory and assign values if the function is ever called.

When we pass a function to `useState`, it's not up to us, the code authors, to call it. It's React's job. We delegate the call responsibility to the hook. This is why React is able to call it only on mount and then stop. React simply cannot do it with primitive values because JavaScript doesn't work like that.

<!-- It's like when we have to wrap `window.addEventListener` in a function delcaration and pass it to `useEffect`, for server-side rendering. The `window` object doesn't exist on the server, so we have to delegate the call to the hook once the code hits the browser. -->

## Implications

In big React applications, I never manage the state directly with `useState`. I rely on robust state managers like [React Query](https://tanstack.com/query/latest), or [Redux](https://redux.js.org/) a few years back, to manage the complexity of the app's state. Hence, I never have to think much about how they initialise it. I trust the authors behind it, and open-source contributors, to do the right thing.

I usually only reach for `useState` to manage local UI state, like opening and closing modals, or toggling a dropdown. In these cases, performance is almost never a concern. Evaluating a boolean on every render is not going to slow down the app, even on a low-end device. Painting the UI is much more expensive.

But if today I were to create a custom state manager for my app, I now would pay closer attention to this detail. For instance, if want to persist the state and I read from `localStorage` to initialise it:

```tsx
function Component(props) {
  const { initialValue = "" } = props;

  const [name, setName] = React.useState(
    // ❌ Evaluates on every render and potentially impacts performance
    window.localStorage.getItem("name") || initialValue
  );
}
```

Reading from `localStorage` is a synchronous operation that can be expensive and block the main thread. So it would be wise to wrap the `localStorage` call in a function declaration to avoid calling it on every render, especially since the result of the evaluation is never used past the first render.

```tsx
function Component(props) {
  const { initialValue = "" } = props;

  const [name, setName] = React.useState(
    // ✅ Evaluates once on mount
    () => window.localStorage.getItem("name") || initialValue
  );
}
```

Alternatively, you can move the expensive evaluation outside the hook parameter by lifting it up to the parent component, then passing the result down via a prop. This way, only the value makes it to the component's initialiser, not the operation itself.

In the example below, the `App` component reads from `localStorage` on mount and pass the string result to the `Child` component via a prop. On each re-render, the `Child` component re-evaluates the string, which is cheap, but doesn't read from `localStorage` ever again, provided that `App` doesn't re-render obviously.

```tsx
function App() {
  const name = window.localStorage.getItem("name");

  return <Child initialValue={name || ""} />;
}

function Child(props) {
  const [name, setName] = React.useState(props.initialValue);

  return (
    <form>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}
```

## That's it, folks!

Thank you for following my little, very specific experiment in the world of React state. In a nutshell:

> The initial value of `useState` is evaluated on every re-render if it's a non-function value like a primitive, an object or an array.

> The initial value of `useState` is only evaluated on mount if it's a function declaration.

I hope you learned something, or at least, you got a refresher on the fundamentals of React. I know I did!

<!-- As I learn and learn new things, I like to go back to the basics, instead of going down the rabbit hole of complexity. The basics get you 90% of the way. -->

<!-- Unless some state changes up the component, React calls a function only once. In React linguo, this is called rendering a component, or mounting a component if it's the first time it's being rendered. -->

<!-- Some useful lingo.
Mount is when React adds the component to the component tree. The component didn't exist before, it's the first time it's being rendered. React didn't know about it before, it's being mounted.

Rendering means react is call the function associated with the component again. But the component is already in the component tree, so react re-renders it, computes the diff with the previous version, and updates the DOM accordingly. -->

<!-- https://reacttraining.com/blog/mount-vs-render -->

<!-- essentially calls the same function again. And React is written in JavaScript, so the JavaScipt engine evaluates the values stored in the variable at runtime. -->

<!-- The compiler "sees" them but the JavaScript engine will only assign value and allocate memory if the function is ever called. -->

<!-- React doesn't know what the initial value is until it evaluates it. It can't know if it's a function or not. It has to evaluate it to know. It's not like it can look at the code and know what it is. It has to run it. -->

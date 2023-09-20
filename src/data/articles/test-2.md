---
title: "Test Tile 2"
description: lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum. lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum. lorem ipsum dolor sit amet consectetur adipiscing elit dolor lorem ipsum
date: 2020-05-01
tags: [life, tech]
highlight: false # highlight the post in the featured post widget
---

## Heading 2

Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor. _Lorem ipsum dolor sit_ amet consectetur adipiscing elit lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing **elit lorem** ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor

This is some `inline-code` for the road.

```tsx {1,2}
import React from "react";
import clsx from "clsx";

export type Props = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function Button(props: Props) {
  const { variant = "primary", size = "md", className, ...rest } = props;

  return (
    <button className={clsx("button", variant, size, className)} {...rest} />
  );
}
```

### Heading 3

Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor. Lorem ipsum dolor sit amet _consectetur adipiscing elit lorem_ ipsum dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor

> A quote of life and how it goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on

#### Heading 4

| Heading 1 | Heading 2 | Heading 3 |
| --------- | --------- | --------- |
| Item 1    | Item 2    | Item 3    |
| Item 1    | Item 2    | Item 3    |
| Item 1    | Item 2    | Item 3    |
| Item 1    | Item 2    | Item 3    |

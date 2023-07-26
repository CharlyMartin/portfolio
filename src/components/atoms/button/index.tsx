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

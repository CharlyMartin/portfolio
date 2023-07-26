import clsx from "clsx";

export type Props = React.ComponentPropsWithoutRef<"div">;

export default function Container(props: Props) {
  const { children, ...rest } = props;

  return (
    <OuterContainer {...rest}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}

Container.Outer = OuterContainer;
Container.Inner = InnerContainer;

// Outer Container
function OuterContainer(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <div className={clsx("sm:px-8", className)} {...rest}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
}

// Inner Container
export function InnerContainer(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <div
      className={clsx("relative px-4 sm:px-8 lg:px-12", className)}
      {...rest}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
}

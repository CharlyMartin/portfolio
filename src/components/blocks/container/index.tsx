import clsx from "clsx";

export type Props = React.ComponentPropsWithoutRef<"div">;

export default function Container(props: Props) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={clsx("px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20", className)}
      {...rest}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

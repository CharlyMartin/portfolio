import { addUtm } from "@/lib/add-utm";

type Props = React.ComponentProps<"a">;

export default function A(props: Props) {
  const { href, ...rest } = props;
  return (
    <a
      href={addUtm(href)}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    />
  );
}

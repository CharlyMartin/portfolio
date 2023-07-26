import { Props as IconProps } from "@/components/atoms/icons";
import A from "../a";

// SocialLink
type Props = {
  icon: React.FunctionComponent<IconProps>;
  title?: string;
} & React.ComponentPropsWithoutRef<"a">;

export default function SocialLink(props: Props) {
  const { icon: Icon, ...rest } = props;

  return (
    <A className="group -m-1 p-1" {...rest}>
      <Icon className="h-8 w-8 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300 sm:h-6 sm:w-6" />
    </A>
  );
}

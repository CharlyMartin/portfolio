import A from "@/components/atoms/a";

type Props = {
  icon: React.FunctionComponent<any>;
  href: React.ComponentProps<"a">["href"];
  action: string;
} & React.ComponentProps<"li">;

export default function SocialLinkText(props: Props) {
  const { href, className, action, icon: Icon } = props;

  return (
    <li className={className}>
      <A
        href={href}
        className="group inline-flex items-center rounded-lg p-3 lg:px-3 lg:py-2"
      >
        <Icon
          size={17}
          className="text-zinc-500 transition group-hover:text-teal-500 group-focus-visible:text-teal-500"
        />
        <span className="pl-3.5 text-sm font-medium text-zinc-700 transition group-hover:text-teal-600 group-focus-visible:text-teal-600 dark:text-zinc-100/80 dark:group-hover:text-teal-400 dark:group-focus-visible:text-teal-400">
          {action}
        </span>
      </A>
    </li>
  );
}

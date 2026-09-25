import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = {
  logo: string;
  title: string;
};

export default function ProjectLogo({ logo, title }: Props) {
  return (
    <ImageBackground>
      <div className="relative h-full w-full">
        <Image src={logo} fill={true} alt={`${title}'s Logo`} unoptimized />
      </div>
    </ImageBackground>
  );
}

export function ProjectLogoPlaceholder({ title }: { title: string }) {
  return (
    <ImageBackground className="bg-teal-50">
      <span className="text-2xl font-medium text-teal-600">{title[0]}</span>
    </ImageBackground>
  );
}

function ImageBackground(props: React.ComponentProps<"div">) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={twMerge(
        className,
        "size-13 rounded-full p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

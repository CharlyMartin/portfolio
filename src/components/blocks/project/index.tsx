import clsx from "clsx";
import Image from "next/image";
import type { LinkProps } from "next/link";

import Card from "@/components/blocks/card";
import { formatProjectDates } from "@/lib/format-date";
import type { ProjectPreview } from "@/types";

type Props = ProjectPreview & {
  link: LinkProps;
};

export default function Project(props: Props) {
  const { name, logo, description, link, dates } = props;
  const formattedDates = formatProjectDates(dates, { month: "short" });

  return (
    <Card as="li" key={name}>
      <div className="z-10">
        {logo && (
          <ImageBackground
            style={{ backgroundColor: "#fff", padding: "14px", ...logo.style }}
          >
            <div className="relative h-full w-full">
              <Image
                src={logo.src}
                fill={true}
                alt={`${name}'s Logo`}
                unoptimized
              />
            </div>
          </ImageBackground>
        )}

        {!logo && (
          <ImageBackground className="bg-teal-50">
            <span className="text-2xl font-medium text-teal-600">
              {name[0]}
            </span>
          </ImageBackground>
        )}
      </div>

      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link href={link.href}>{name}</Card.Link>
      </h2>
      <Card.Eyebrow
        as="time"
        dateTime={dates.end?.toLocaleDateString()}
        className="mb-2"
      >
        {formattedDates}
      </Card.Eyebrow>

      <Card.Description>{description}</Card.Description>

      {/* <p className="relative z-10 mt-5 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <LinkIcon className="h-4 w-4 flex-none" />
        <span className="ml-2">{getHostname(link.href.toString())}</span>
      </p> */}
    </Card>
  );
}

type ImageCircleProps = React.ComponentProps<"div">;

function ImageBackground(props: ImageCircleProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={clsx(
        className,
        "flex h-14 w-14 items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-2 ring-zinc-200/20 dark:ring-zinc-700"
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

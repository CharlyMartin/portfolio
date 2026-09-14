import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Card from "@/components/blocks/card";
import { DATE_FORMATS, formatProjectDates } from "@/lib/format-date";

import Badge from "@/components/atoms/badge";
import { IndexProject } from "@qino/projects";

export type Props = {
  title: string;
  logo: IndexProject["logo"];
  description: string;
  dates: IndexProject["dates"];
  area: IndexProject["area"];
  slug: string;
};

export default function Project(props: Props) {
  const { title, logo, description, dates, area, slug } = props;

  const formattedDates = formatProjectDates(dates, DATE_FORMATS.PROJECT_SHORT);

  return (
    <Card className="gap-5">
      {/* Logo */}
      <div className="z-10 pb-2">
        {logo && (
          <ImageBackground
            style={{
              backgroundColor: "#fff",
              padding: "14px",
              ...logo.style,
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={logo.src}
                fill={true}
                alt={`${title}'s Logo`}
                unoptimized
              />
            </div>
          </ImageBackground>
        )}

        {!logo && (
          <ImageBackground className="bg-teal-50">
            <span className="text-2xl font-medium text-teal-600">
              {title[0]}
            </span>
          </ImageBackground>
        )}
      </div>

      {/* Title + badge + dates */}
      <div className="flex flex-col space-y-1">
        <Card.Title href={`/projects/${slug}`}>{title}</Card.Title>

        <div className="flex items-center">
          <Badge size="sm" className="z-10 mr-2.5">
            {area}
          </Badge>
          <Card.Eyebrow as="time" dateTime={dates.end?.toLocaleString()}>
            {formattedDates}
          </Card.Eyebrow>
        </div>
      </div>

      {/* Description */}
      <Card.Description className="mt-0">{description}</Card.Description>

      {/* CTA */}
      <Card.Cta className="mt-0">See project</Card.Cta>
    </Card>
  );
}

type ImageCircleProps = React.ComponentProps<"div">;

function ImageBackground(props: ImageCircleProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={twMerge(
        className,
        "flex h-12 w-12 items-center justify-center rounded-full shadow-md ring-2 shadow-zinc-800/5 ring-zinc-200/20 dark:ring-zinc-700",
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Card from "@/components/blocks/card";
import { DATE_FORMATS, formatProjectDates } from "@/lib/format-date";

import Badge from "@/components/atoms/badge";
import { IndexProject } from "@/cms/projects";

export type Props = {
  title: string;
  logo: IndexProject["logo"];
  description: string;
  dates: IndexProject["dates"];
  area: IndexProject["area"];
  employment: IndexProject["employment"];
  slug: string;
};

export default function Project(props: Props) {
  const { title, logo, description, dates, area, employment, slug } = props;

  const formattedDates = formatProjectDates(dates, DATE_FORMATS.PROJECT_SHORT);

  return (
    <Card className="gap-5">
      {/* Logo */}
      <div className="z-10 pb-2">
        {logo && (
          <ImageBackground>
            <div className="relative h-full w-full">
              <Image
                src={logo}
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

      {/* Title + badges + dates */}
      <div className="flex flex-col space-y-1">
        <Card.Title href={`/projects/${slug}`}>{title}</Card.Title>

        <Card.Eyebrow as="time" dateTime={dates.end?.toLocaleString()}>
          {formattedDates}
        </Card.Eyebrow>

        <div className="mt-1 -ml-1 flex flex-wrap items-center gap-1">
          <Badge size="sm" className="z-10">
            {area}
          </Badge>
          <Badge size="sm" className="z-10">
            {employment}
          </Badge>
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
        "size-13 rounded-full p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

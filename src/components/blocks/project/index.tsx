import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Card from "@/components/blocks/card";
import { DATE_FORMATS, formatProjectDates } from "@/lib/format-date";
import type { ProjectPreview } from "@/types";
import Badge from "@/components/atoms/badge";

type Props = ProjectPreview;

export default function Project(props: Props) {
  const { name, logo, description, dates, slug, area } = props;
  const formattedDates = formatProjectDates(dates, DATE_FORMATS.PROJECT_SHORT);

  return (
    <Card className="space-y-5">
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

      {/* Title + badge + dates */}
      <div className="flex flex-col space-y-1">
        <Card.Title href={`/projects/${slug}`}>{name}</Card.Title>

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
      <Card.Description>{description}</Card.Description>

      {/* CTA */}
      <Card.Cta>See project</Card.Cta>
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
        "flex h-12 w-12 items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-2 ring-zinc-200/20 dark:ring-zinc-700"
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

import clsx from "clsx";
import Image from "next/image";

import Card from "@/components/blocks/card";
import { formatProjectDates } from "@/lib/format-date";
import type { ProjectPreview } from "@/types";
import Badge from "@/components/atoms/badge";

type Props = ProjectPreview;

export default function Project(props: Props) {
  const { name, logo, description, dates, slug, areas } = props;
  const formattedDates = formatProjectDates(dates, { month: "short" });

  return (
    <Card className="min-h-full">
      <div className="flex w-full items-start justify-between">
        <div className="z-10 mb-6">
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

        <div className="z-10 space-x-2">
          {areas.slice(0, 2).map(function renderAreas(area, i) {
            return (
              <Badge size="sm" key={i}>
                {area}
              </Badge>
            );
          })}
        </div>
      </div>

      <Card.Title href={`/projects/${slug}`}>{name}</Card.Title>
      <Card.Eyebrow
        as="time"
        dateTime={dates.end?.toLocaleDateString()}
        className="mb-2"
      >
        {formattedDates}
      </Card.Eyebrow>

      <Card.Description>{description}</Card.Description>

      <Card.Cta>See project</Card.Cta>
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
        "flex h-12 w-12 items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-2 ring-zinc-200/20 dark:ring-zinc-700"
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

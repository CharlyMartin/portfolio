import React from "react";
import { twMerge } from "tailwind-merge";

import Text from "@/components/atoms/text";
import type { Availability } from "@/types";
import { AVAILABILITY } from "@/data/config";

const data: Record<Availability, any> = {
  available: {
    text: "available for new opportunities",
    color: "bg-teal-500",
    ping: "bg-teal-400",
  },
  limited: {
    text: "part-time availability for opportunities",
    color: "bg-orange-500",
    ping: "bg-orange-400",
  },
  busy: {
    text: "currently unavailable for new opportunities",
    color: "bg-red-500",
    ping: "bg-red-400",
  },
};

type Props = React.ComponentProps<"div">;

export default function Availability(props: Props) {
  const { className, ...rest } = props;

  const { text, color, ping } = data[AVAILABILITY];

  return (
    <div
      className={twMerge("flex items-center sm:items-center", className)}
      {...rest}
    >
      <span className="relative mr-2.5 flex h-3 w-3">
        <span
          className={twMerge(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            ping,
          )}
          style={{
            animationDuration: "1400ms",
          }}
        />
        <span
          className={twMerge(
            "relative inline-flex h-3 w-3 rounded-full bg-sky-500",
            color,
          )}
        />
      </span>

      <Text className="text-sm">{text}</Text>
    </div>
  );
}

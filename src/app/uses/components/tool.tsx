import React from "react";
import { twMerge } from "tailwind-merge";

import A from "@/components/atoms/a";
import Icons from "@/components/atoms/icons";
import { getHostname } from "@/lib/get-hostname";
import { type Tool } from "@/cms/tools";

export function Tool({ name, url, description, highlight, favorite }: Tool) {
  const fav = highlight || favorite;

  return (
    <li className="group relative">
      <div
        className={twMerge(
          "absolute -inset-x-4 -inset-y-3 z-0 transition sm:-inset-x-6 sm:m-0.5 sm:rounded-2xl",
          fav &&
            "bg-teal-50/30 group-hover:bg-teal-50 group-has-focus-visible:bg-teal-50 dark:bg-teal-950/30 group-hover:dark:bg-teal-950/60 dark:group-has-focus-visible:bg-teal-950/60",
          !fav &&
            "scale-95 bg-zinc-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-has-focus-visible:scale-100 group-has-focus-visible:opacity-100 dark:bg-zinc-800/50",
        )}
      />
      <div className="relative z-10">
        {/* Title */}
        <div className="flex items-center">
          {fav && (
            <div className="mr-1.5 shrink-0">
              <Icons.Star
                size={18}
                className="mb-0.5 text-teal-800 dark:text-teal-100/90!"
              />
            </div>
          )}
          <h3
            className={twMerge(
              "text-base font-semibold tracking-tight",
              !fav && "text-zinc-800 dark:text-zinc-100",
              fav && "text-teal-800 dark:text-teal-100/90",
            )}
          >
            <A href={url} className="group/link outline-hidden">
              {/* Stretched link: makes the whole card clickable and outlines it on focus */}
              <span className="absolute -inset-x-4 -inset-y-3 z-20 group-focus-visible/link:outline-2 sm:-inset-x-6 sm:rounded-2xl" />
              {name}
              {fav && <span className="sr-only"> (favourite)</span>}
            </A>
          </h3>
        </div>

        {/* Link */}
        <div
          className={twMerge(
            "-mt-0.5 flex -translate-x-5 items-center transition group-hover:translate-x-0 group-has-focus-visible:translate-x-0",
            !fav && "text-zinc-400 dark:text-zinc-500",
            fav && "text-teal-600 dark:text-teal-500",
          )}
        >
          <Icons.Link
            size={14}
            className="mt-0.5 mr-1.5 opacity-0 transition group-hover:opacity-100 group-has-focus-visible:opacity-100"
          />
          <p className="text-sm">{getHostname(url)}</p>
        </div>

        {/* Description */}
        <p
          className={twMerge(
            "pt-3 text-sm",
            !fav && "text-zinc-600 dark:text-zinc-400",
            fav && "text-teal-700 dark:text-teal-300/80",
          )}
        >
          {description}
        </p>
      </div>
    </li>
  );
}

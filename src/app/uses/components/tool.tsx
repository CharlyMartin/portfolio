import React from "react";
import { twMerge } from "tailwind-merge";

import A from "@/components/atoms/a";
import Icons from "@/components/atoms/icons";
import { getHostname } from "@/lib/get-hostname";
import { type Tool } from "@qino/tools";

export function Tool({
  name,
  url,
  description,
  oneLiner,
  highlight,
  favorite,
}: Tool) {
  const text = description || oneLiner;
  const fav = highlight || favorite;

  return (
    <li className="group relative">
      <div
        className={twMerge(
          "absolute -inset-x-4 -inset-y-6 z-0 transition sm:-inset-x-6 sm:m-0.5 sm:rounded-2xl",
          fav &&
            "bg-emerald-50/30 group-hover:bg-emerald-50 dark:bg-emerald-950/30 group-hover:dark:bg-emerald-950/60",
          !fav &&
            "scale-95 bg-zinc-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50"
        )}
      />
      <A href={url}>
        <span className="relative z-10">
          {/* Title */}
          <div className="flex items-center">
            {fav && (
              <div className="mr-1.5 shrink-0">
                <Icons.Star
                  size={18}
                  className="mb-0.5 text-emerald-800 dark:!text-emerald-100/90"
                />
              </div>
            )}
            <h2
              className={twMerge(
                "text-base font-semibold tracking-tight",
                !fav && "text-zinc-800 dark:text-zinc-100",
                fav && "text-emerald-800 dark:text-emerald-100/90"
              )}
            >
              {name}
            </h2>
          </div>

          {/* Link */}
          <div
            className={twMerge(
              "-mt-0.5 flex -translate-x-5 items-center pb-3 transition group-hover:translate-x-0",
              !fav && "text-zinc-400 dark:text-zinc-500/80",
              fav && "text-emerald-600/50 dark:text-emerald-600/80"
            )}
          >
            <Icons.Link
              size={14}
              className="mr-1.5 mt-0.5 opacity-0 transition group-hover:opacity-100"
            />
            <p className="relative z-10 text-sm">{getHostname(url)}</p>
          </div>

          {/* Description */}
          <p
            className={twMerge(
              "relative z-10 text-sm",
              !fav && "text-zinc-600 dark:text-zinc-400",
              fav && "text-emerald-700 dark:text-emerald-300/80"
            )}
          >
            {text}
          </p>
        </span>
      </A>
    </li>
  );
}

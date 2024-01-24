import { DateTime } from "luxon";

import { Project } from "@/types";

type Options = Intl.DateTimeFormatOptions;

export function formatProjectDates(dates: Project["dates"], options?: Options) {
  const { start, end } = dates;
  const opt = options || {};

  // If no end date, show "Present"
  if (!end) {
    return `${start.toLocaleString(opt)} to Present`;
  }

  // If dates are the same, only show one
  if (start.toISO() == end.toISO()) {
    return start.toLocaleString(opt);
  }

  // If years are the same, only show the year once
  if (start.year == end.year) {
    const startMonth = start.toLocaleString({ month: opt.month });
    const endMonth = end.toLocaleString({ month: opt.month });

    return `${startMonth} to ${endMonth} ${start.year}`;
  }

  // Otherwise, show both dates
  return `${start.toLocaleString(opt)} to ${end.toLocaleString(opt)}`;
}

export function formatArticleDate(date?: Date, options?: Options) {
  if (!date) return "";

  const d = DateTime.fromJSDate(date);

  const opt = options || {};
  return d.toLocaleString(opt);
}

export const DATE_FORMATS: Record<string, Intl.DateTimeFormatOptions> = {
  PROJECT_LONG: { month: "long", year: "numeric" },
  PROJECT_SHORT: { month: "short", year: "numeric" },
  ARTICLE_LONG: { day: "numeric", month: "long", year: "numeric" },
  ARTICLE_SHORT: { day: "numeric", month: "short", year: "numeric" },
};

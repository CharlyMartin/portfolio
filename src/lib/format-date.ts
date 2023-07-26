import { Project } from "@/types";

export function formatProjectDates(
  dates: Project["dates"],
  opt?: Intl.DateTimeFormatOptions
): string {
  const { start, end } = dates;

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
    ...opt,
  };

  const formattedStart = formatDate(start, options);

  // If no end date, show "Present"
  if (!end) return `${formattedStart} to Present`;

  // If dates are the same, only show one
  if (start.getTime() == end.getTime()) return formattedStart;

  // If years are the same, only show year once
  if (start.getFullYear() == end.getFullYear()) {
    const year = start.getFullYear();
    const startMonth = formatDate(start, { month: "long", ...opt });
    const endMonth = formatDate(end, { month: "long", ...opt });

    return `${startMonth} to ${endMonth} ${year}`;
  }

  // Otherwise, show both dates
  const formattedEnd = formatDate(end, options);
  return `${formattedStart} to ${formattedEnd}`;
}

export function formatArticleDate(date: Date) {
  return formatDate(date, { day: "numeric", month: "long", year: "numeric" });
}

function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString("en-AU", {
    timeZone: "UTC",
    ...options,
  });
}

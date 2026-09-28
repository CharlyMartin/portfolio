import React from "react";

import Title from "@/components/atoms/title";

type V = string | undefined | null | false;

type Props = {
  title: string;
  subtitle?: Array<V> | V;
};

export default function PageTitle(props: Props) {
  const { title, subtitle } = props;

  const list = Array.isArray(subtitle) ? subtitle : [subtitle];
  const truthyList = list.filter(Boolean);

  return (
    <React.Fragment>
      <Title className="mb-1.5!">{title}</Title>
      <p className="text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
        {renderSubtitle(truthyList)}
      </p>
    </React.Fragment>
  );
}

function renderSubtitle(subtitle: Array<V>) {
  return subtitle.map((item, i) => {
    return (
      <React.Fragment key={i}>
        {item}
        {i != subtitle.length - 1 && (
          <React.Fragment>
            <span className="sr-only">, </span>
            <span
              aria-hidden="true"
              className="inline-block px-2 text-zinc-200 dark:text-zinc-700/80"
            >
              •
            </span>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  });
}

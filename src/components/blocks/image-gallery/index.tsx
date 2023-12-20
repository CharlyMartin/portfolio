"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import Image, { ImageProps } from "next/image";

import Gallery from "./gallery";

type Props = {
  images: Array<ImageProps>;
};

export default function ImageGallery(props: Props) {
  const { images } = props;
  const image = images[0];

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Image
        {...image}
        alt={image.alt}
        placeholder="blur"
        className={twMerge(
          "image-ring rounded-2xl",
          images.length > 1 && "cursor-zoom-in"
        )}
        priority
        onClick={() => {
          if (!images.length) return;
          setOpen(true);
        }}
      />

      {images.length > 1 && (
        <Gallery open={open} setOpen={setOpen} images={images} />
      )}
    </React.Fragment>
  );
}

// TODO
// - [ ] Add keyboard navigation that also updates the hash

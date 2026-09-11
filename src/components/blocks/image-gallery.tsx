"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Gallery from "./image-gallery/gallery";

type Props = {
  images: Array<{ src: string; width: number; height: number }>;
  name: string;
};

export default function ImageGallery(props: Props) {
  const { images, name } = props;

  const galleryImages = images.map((image, i) => ({
    ...image,
    alt: `${name} Image ${i + 1}`,
  }));

  const image = galleryImages[0];

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Image
        {...image}
        alt={image.alt}
        className={twMerge(
          "image-ring rounded-2xl",
          galleryImages.length > 1 && "cursor-zoom-in"
        )}
        priority
        onClick={() => {
          if (!galleryImages.length) return;
          setOpen(true);
        }}
      />

      {galleryImages.length > 1 && (
        <Gallery open={open} setOpen={setOpen} images={galleryImages} />
      )}
    </React.Fragment>
  );
}

// TODO
// - [ ] Add keyboard navigation that also updates the hash

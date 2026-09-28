"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

import Gallery from "./image-gallery/gallery";

type Props = {
  images: Array<{ src: string; width: number; height: number; alt?: string }>;
  name: string;
};

export default function ImageGallery(props: Props) {
  const { images, name } = props;

  const galleryImages = images.map((image, i) => ({
    ...image,
    alt: image.alt ?? `${name} screenshot ${i + 1}`,
  }));

  const image = galleryImages[0];

  const [open, setOpen] = React.useState<boolean>(false);

  const preview = (
    <Image
      {...image}
      alt={image.alt}
      className={twMerge(
        "image-ring rounded-2xl",
        galleryImages.length > 1 && "cursor-zoom-in",
      )}
      preload
    />
  );

  return (
    <React.Fragment>
      {galleryImages.length > 1 ? (
        <button
          type="button"
          className="block w-full rounded-2xl text-left"
          aria-label={`Open ${name} image gallery`}
          onClick={() => setOpen(true)}
        >
          {preview}
        </button>
      ) : (
        preview
      )}

      {galleryImages.length > 1 && (
        <Gallery open={open} setOpen={setOpen} images={galleryImages} />
      )}
    </React.Fragment>
  );
}

// TODO
// - [ ] Add keyboard navigation that also updates the hash

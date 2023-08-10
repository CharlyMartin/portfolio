// "use client";

import React from "react";
import Image from "next/image";
// import clsx from "clsx";

import imageBeach from "@/images/home/beach.jpeg";
import imageConcert from "@/images/home/concert.jpeg";
import imageDJ from "@/images/home/dj.jpeg";
import imageDrum from "@/images/home/drum.jpeg";
import imageForest from "@/images/home/forest.jpeg";
import imageHer from "@/images/home/her.jpeg";
import imageHome from "@/images/home/home.jpeg";
import imageHome2 from "@/images/home/home-2.jpeg";
import imageHotel from "@/images/home/hotel.jpeg";
import imageNicaragua from "@/images/home/nicaragua.jpeg";
import imageOcean from "@/images/home/ocean.jpeg";
import imagePool from "@/images/home/pool.jpeg";
// import imageSunset from "@/images/home/sunset.jpeg";
import imageTrees from "@/images/home/trees.jpeg";

export default function Photos() {
  const images = [
    imageBeach,
    imageConcert,
    imageDJ,
    imageDrum,
    imageForest,
    imageHer,
    imageHome,
    imageHome2,
    imageHotel,
    imageNicaragua,
    imageOcean,
    imagePool,
    // imageSunset,
    imageTrees,
  ];

  const selectedImages = shuffle(images).slice(0, 6);

  // TODO:
  // [ ] Find a cool combination of images (no shuffling)
  // [ ] Try to add a spread effect on page load
  // [ ] Instead of shuffling images, shuffle cool collections of images. For better UI.

  // Cool combinations:
  // home + dj + trees + forest + drum + (+ concert?)

  return (
    <div className="my-16 sm:my-24">
      <div className="relative flex justify-center space-x-4 sm:space-x-6">
        {selectedImages.map(function renderImage(image, i) {
          return (
            <div
              key={image.src}
              className="relative aspect-[8/10] w-32 flex-none -rotate-1 overflow-hidden rounded-xl drop-shadow dark:shadow-zinc-900/10 sm:aspect-[10/10] sm:w-72 sm:rounded-3xl"
            >
              <Image
                src={image}
                alt=""
                placeholder="blur"
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// const [dynamicClasses, setDynamicClasses] = React.useState([
//   "relative",
//   "flex",
//   "justify-center",
//   "p-2",
//   "-space-x-56",
// ]);
// Split into music and nature, both
// Add a light ring on dark mode
// Split into dark and light images

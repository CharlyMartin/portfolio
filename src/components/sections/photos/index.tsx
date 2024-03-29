import React from "react";
import Image from "next/image";

import imageDJ from "@/images/home/dj.jpeg";
import imageDrum from "@/images/home/drum.jpeg";
import imageHome from "@/images/home/home.jpeg";
import imageNicaragua from "@/images/home/nicaragua.jpeg";
import imageOcean from "@/images/home/ocean.jpeg";
// import imageHer from "@/images/home/her.jpeg";
// import imageBeach from "@/images/home/beach.jpeg";
// import imageConcert from "@/images/home/concert.jpeg";
// import imageForest from "@/images/home/forest.jpeg";
// import imageHotel from "@/images/home/hotel.jpeg";
// import imageHome2 from "@/images/home/home-2.jpeg";
// import imagePool from "@/images/home/pool.jpeg";
// import imageSunset from "@/images/home/sunset.jpeg";
// import imageTrees from "@/images/home/trees.jpeg";
// import imageDune from "@/images/home/dune.jpeg";

export default function Photos() {
  const images = [imageNicaragua, imageDJ, imageHome, imageDrum, imageOcean];

  return (
    <div className="my-20 sm:my-24 lg:my-32">
      <div className="relative flex justify-center space-x-3 sm:space-x-4 lg:space-x-5">
        {images.map(function renderImage(image, i) {
          return (
            <div
              key={image.src}
              className="image-ring relative aspect-[7/10] w-32 flex-none -rotate-1 overflow-hidden rounded-xl sm:aspect-[9/10] sm:w-48 lg:w-72 lg:rounded-2xl"
              style={{
                top: `${i % 2 ? "-" : "+"}8px`,
                animationName: "fade-in",
                animationDelay: `${640 + i * 100}ms`,
                animationDuration: "1s",
                animationFillMode: "both", // applies opacity before and after the animation runs
              }}
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

// function shuffle<T>(array: T[]): T[] {
//   const copy = [...array];

//   for (let i = copy.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [copy[i], copy[j]] = [copy[j], copy[i]];
//   }

//   return copy;
// }

// TODO:
// [ ] Find a cool combination of images (no shuffling)
// [ ] Try to add a spread effect on page load
// [ ] Instead of shuffling images, shuffle cool collections of images. For better UI.

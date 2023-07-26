import Image from "next/image";

import image1 from "@/images/dummy/image-1.jpg";
import image2 from "@/images/dummy/image-2.jpg";
import image3 from "@/images/dummy/image-3.jpg";
import image4 from "@/images/dummy/image-4.jpg";
import image5 from "@/images/dummy/image-5.jpg";

export default function Photos() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image) => {
          return (
            <div
              key={image.src}
              className="relative aspect-[9/10] w-40 flex-none -rotate-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-52 sm:rounded-2xl md:w-56"
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 680px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

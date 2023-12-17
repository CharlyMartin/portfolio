"use client";

import React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Icons from "@/components/atoms/icons";

type Props = {
  images: Array<ImageProps>;
};

const PREFIX = "slide-";

export default function ImageGallery(props: Props) {
  const { images } = props;
  const image = images[0];

  const [open, setOpen] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(0);
  console.log("active", active);

  // Sync hash with active state
  const updateActive = React.useCallback(function syncHash() {
    const hash = window.location.hash; // .hash returns empty string is non existent
    const index = hash.split("-")[1];
    if (index) setActive(Number(index));
  }, []);

  React.useEffect(() => {
    window.addEventListener("hashchange", updateActive);
    return () => window.removeEventListener("hashchange", updateActive);
  }, [updateActive]);

  return (
    <React.Fragment>
      <Image
        {...image}
        alt={image.alt}
        placeholder="blur"
        className={clsx(
          "image-ring rounded-2xl",
          images.length > 1 && "cursor-pointer"
        )}
        priority
        onClick={() => {
          if (!images.length) return;
          setOpen(true);
        }}
      />

      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-50/10 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-6xl sm:p-6">
                  <div className="h-full overflow-hidden">
                    <ul
                      id="slider"
                      className="flex h-full items-stretch justify-start"
                      style={{
                        overflowX: "scroll",
                        scrollSnapType: "x mandatory",
                        scrollBehavior: "smooth",
                        WebkitOverflowScrolling: "touch",
                      }}
                    >
                      {images.map((image, i) => {
                        return (
                          <li
                            key={i}
                            className="grow-1 shrink-0 basis-full"
                            style={{ scrollSnapAlign: "start" }} // scroll-padding-top: 160px;
                            id={PREFIX + i}
                          >
                            <Image
                              {...image}
                              alt={image.alt}
                              placeholder="blur"
                              className="w-full rounded-2xl"
                              priority
                            />
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8 flex items-center justify-center">
                      <div className="flex items-center space-x-10 rounded-full bg-white p-1.5">
                        <button
                          className="rounded-full p-1.5 transition hover:bg-zinc-100"
                          onClick={back}
                        >
                          <Icons.ChevronLeft
                            size={20}
                            className="text-zinc-800"
                          />
                        </button>

                        {images.map((_image, i) => {
                          return (
                            <div
                              role="button"
                              tabIndex={0}
                              key={i}
                              className={clsx(
                                "inline-block cursor-pointer rounded-full bg-zinc-50 p-1.5",
                                active == i && "bg-emerald-50"
                              )}
                              onClick={() => updateHash(i)}
                            >
                              <div
                                className={clsx(
                                  "h-2 w-2 rounded-full bg-zinc-500",
                                  active == i && "bg-emerald-600"
                                )}
                              />
                            </div>
                          );
                        })}

                        <button
                          className="rounded-full p-1.5 transition hover:bg-zinc-100"
                          onClick={next}
                        >
                          <Icons.ChevronRight
                            size={20}
                            className="text-zinc-800"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );

  // Browse methods
  function next(): void {
    if (active >= images.length - 1) return updateHash(0);
    return updateHash(active + 1);
  }

  function back(): void {
    if (active == 0) return updateHash(images.length - 1);
    return updateHash(active - 1);
  }
}

function updateHash(index: number): void {
  window.location.hash = "#" + PREFIX + index;
}

// TODO
// - [ ] On unmount, remove hash from url
// - [ ] Add keyboard navigation
// - [ ] Add swipe navigation
// https://stackoverflow.com/questions/20160854/add-padding-to-id-link-but-not-show-padding

{
  /* <Slide */
}
// as="li"
// flex="1 0 98%"
// maxWidth="98%"
// height="100%"
// mr={1}
// key={index}
// id={PREFIX + index}
// pt={spaceUp}
// mt={-spaceUp}
/* This is to prevent id navigation */
/*  */

// import { ReactElement, Fragment } from "react";
// import { Box, BoxProps } from "@chakra-ui/react";

// // Components
// import Single from "./single";
// import Multiple, { Props as MultipleProps } from "./multiple";

// // TypeScript
// import { Image } from "src/typescript/lib/image";

// // Sizes
// import { sectionSpacing } from "src/components/blocks/section/public";

// export const height = { base: 240, md: 380, lg: 480 };
// export const maxHeight = { base: "86%", md: "90%", lg: "94%" };
// export const minHeight = { base: "14%", md: "10%", lg: "6%" };

// interface Props extends BoxProps, Pick<MultipleProps, "spaceUp"> {
//   images: Image[] | [];
// }

// export default function Carousel(props: Props): ReactElement {
//   const { images, spaceUp, ...rest } = props;

//   if (images.length == 0) return <Fragment />;

//   return (
//     <Box as="section" id="carousel" pb={sectionSpacing} {...rest}>
//       {images.length == 1 && <Single image={images[0]} />}
//       {images.length > 1 && <Multiple images={images} spaceUp={spaceUp} />}
//     </Box>
//   );
// }

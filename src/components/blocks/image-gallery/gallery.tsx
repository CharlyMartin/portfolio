import React from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Icons from "@/components/atoms/icons";
import Button from "@/components/atoms/button";

const PREFIX = "slide-";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: Array<ImageProps>;
};

export default function Gallery(props: Props) {
  const { open, setOpen, images } = props;

  const [active, setActive] = React.useState<number>(0);

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

  // Only handle slide navigation while the gallery is open.
  React.useEffect(() => {
    if (!open) return;

    function disableArrowNavigation(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      }
    }

    window.addEventListener("keydown", disableArrowNavigation);
    return () => window.removeEventListener("keydown", disableArrowNavigation);
  });

  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        aria-label="Image gallery"
      >
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white dark:bg-zinc-900" />
        </TransitionChild>

        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          afterLeave={() => updateHash(0)}
          beforeEnter={() => updateHash(0)}
        >
          <div className="fixed inset-0 z-10 w-screen">
            <div className="fixed right-3 bottom-3 left-3 xl:top-6 xl:left-6">
              <Button
                variant="secondary"
                className="w-full xl:w-auto"
                onClick={() => setOpen(false)}
              >
                Close
                <Icons.X size={22} />
              </Button>
            </div>
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="relative h-full w-full transform px-4 md:px-12 lg:px-16 xl:max-w-4xl xl:px-0 2xl:max-w-6xl">
                <div
                  id="arrows"
                  className="absolute inset-0 z-10 hidden xl:block"
                >
                  <div className="relative flex h-full items-center justify-between">
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="relative -left-20 rounded-full border-none bg-zinc-100 p-4 shadow-none transition hover:bg-zinc-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-700"
                      onClick={back}
                    >
                      <Icons.ChevronLeft
                        size={28}
                        className="text-zinc-800 dark:text-zinc-200"
                      />
                    </button>

                    <button
                      type="button"
                      aria-label="Next image"
                      className="relative left-20 rounded-full border-none bg-zinc-100 p-4 shadow-none transition hover:bg-zinc-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-700"
                      onClick={next}
                    >
                      <Icons.ChevronRight
                        size={28}
                        className="text-zinc-800 dark:text-zinc-200"
                      />
                    </button>

                    <div
                      className="absolute right-0 bottom-0 left-0 flex h-12 items-center justify-center bg-white dark:bg-zinc-900"
                      id="dots"
                    >
                      {images.map((_image, i) => {
                        return (
                          <button
                            type="button"
                            aria-label={`Show image ${i + 1}`}
                            aria-current={active === i ? "true" : undefined}
                            key={i}
                            className="group cursor-pointer p-2 px-2.5"
                            onClick={() => updateHash(i)}
                          >
                            <div
                              className={twMerge(
                                "inline-block rounded-full p-[1px] transition",
                                active != i && "bg-transparent",
                                active == i && "bg-zinc-500 dark:bg-zinc-300",
                              )}
                            >
                              <div
                                className={twMerge(
                                  "h-2 w-2 rounded-full transition",
                                  active != i &&
                                    "bg-zinc-300 group-hover:bg-zinc-500 dark:bg-zinc-500 dark:group-hover:bg-zinc-300",
                                  active == i && "bg-zinc-500 dark:bg-zinc-300",
                                )}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <ul
                  id="slider"
                  className="flex items-stretch justify-start space-x-2 pb-2 xl:pb-14"
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
                        className="shrink-0 grow-1 basis-full"
                        style={{ scrollSnapAlign: "start" }} // scroll-padding-top: 160px;
                        id={PREFIX + i}
                      >
                        <Image
                          {...image}
                          alt={image.alt}
                          className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-700/70"
                          preload
                        />
                      </li>
                    );
                  })}
                </ul>
              </DialogPanel>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
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

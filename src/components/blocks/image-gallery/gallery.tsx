import React from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
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

  return (
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
          <div className="fixed inset-0 bg-white" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          beforeLeave={() => updateHash(0)}
          beforeEnter={() => updateHash(0)}
        >
          <div className="fixed inset-0 z-10 w-screen">
            <div className="fixed bottom-3 left-3 right-3 xl:left-6 xl:top-6 ">
              <Button variant="secondary" className="w-full xl:w-auto">
                Close
                <Icons.X size={22} />
              </Button>
            </div>
            <div className="flex min-h-full items-center justify-center">
              <Dialog.Panel className="relative h-full w-full transform px-4 md:px-12 lg:px-16 xl:max-w-4xl xl:px-0 2xl:max-w-6xl">
                <div
                  id="arrows"
                  className="absolute inset-0 z-10 hidden bg-transparent xl:block"
                >
                  <div className="relative flex h-full items-center justify-between">
                    <button
                      className="relative -left-20 rounded-full bg-zinc-100 p-4 transition hover:bg-zinc-200"
                      onClick={back}
                    >
                      <Icons.ChevronLeft size={28} className="text-zinc-800" />
                    </button>

                    <button
                      className="relative left-20 rounded-full bg-zinc-100 p-4 transition hover:bg-zinc-200"
                      onClick={next}
                    >
                      <Icons.ChevronRight size={28} className="text-zinc-800" />
                    </button>

                    <div
                      className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-white"
                      id="dots"
                    >
                      {images.map((_image, i) => {
                        return (
                          <div
                            role="button"
                            tabIndex={0}
                            key={i}
                            className="group p-2 px-2.5"
                            onClick={() => updateHash(i)}
                          >
                            <div
                              className={clsx(
                                "inline-block cursor-pointer rounded-full p-[1px] transition",
                                active != i && "bg-transparent",
                                active == i && "bg-zinc-500"
                              )}
                            >
                              <div
                                className={clsx(
                                  "h-2 w-2 rounded-full transition",
                                  active != i &&
                                    "bg-zinc-300 group-hover:bg-zinc-500",
                                  active == i && "bg-zinc-500"
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <ul
                  id="slider"
                  className="flex items-stretch justify-start space-x-2 pb-2 xl:pb-16"
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
                        className="grow-1 shrink-0 basis-[98%]"
                        style={{ scrollSnapAlign: "start" }} // scroll-padding-top: 160px;
                        id={PREFIX + i}
                      >
                        <Image
                          {...image}
                          alt={image.alt}
                          placeholder="blur"
                          className="w-full rounded-2xl border border-zinc-200/80 drop-shadow-sm"
                          priority
                        />
                      </li>
                    );
                  })}
                </ul>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
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

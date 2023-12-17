import {
  ReactElement,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { Flex, Box, BoxProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

// Components
import StrapiImage from "src/components/atoms/strapi-image";
import Arrows from "./arrows";
import Caption from "./caption";

// TypeScript
import { Image as ImageType } from "src/typescript/lib/image";

// Sizes
import { height, maxHeight, minHeight } from "./index";

const PREFIX = "slide-";

export interface Props extends BoxProps {
  images: ImageType[];
  spaceUp: number;
}

export default function MultipleImages(props: Props): ReactElement {
  const { images, spaceUp, ...rest } = props;
  const [active, setActive] = useState<number>(0);

  // Browse methods
  function next(): void {
    if (active >= images.length - 1) return updateHash(0);
    return updateHash(active + 1);
  }

  function back(): void {
    if (active == 0) return updateHash(images.length - 1);
    return updateHash(active - 1);
  }

  // Sync hash with active state
  const updateActive = useCallback(function () {
    const hash = window.location.hash; // .hash returns empty string is non existent
    const index = hash.split("-")[1];
    if (index) setActive(Number(index));
  }, []);

  useEffect(function reactToHashChange() {
    window.addEventListener("hashchange", updateActive);
    return () => window.removeEventListener("hashchange", updateActive);
  }, []);

  return (
    <Fragment>
      <Box height={height} pos="relative" {...rest}>
        <Arrows
          next={next}
          back={back}
          active={active}
          length={images.length}
          height="95%"
        />
        <Box height="100%" overflow="hidden">
          <Slider
            justify="flex-start"
            align="stretch"
            wrap="nowrap"
            height="100%"
            as="ul"
          >
            {images.map(function (image: ImageType, index: number) {
              return (
                <Slide
                  as="li"
                  flex="1 0 98%"
                  maxWidth="98%"
                  height="100%"
                  mr={1}
                  key={index}
                  id={PREFIX + index}
                  pt={spaceUp}
                  mt={-spaceUp}
                  /* This is to prevent id navigation */
                  /* https://stackoverflow.com/questions/20160854/add-padding-to-id-link-but-not-show-padding */
                >
                  <StrapiImage
                    image={image}
                    rounded="sm"
                    width="100%"
                    height="100%"
                    maxHeight={maxHeight}
                  />

                  <Caption
                    active={index}
                    length={images.length}
                    minHeight={minHeight}
                  >
                    {image.caption}
                  </Caption>
                </Slide>
              );
            })}
          </Slider>
        </Box>
      </Box>

      {/* Buttons */}
      <Flex
        justify="flex-start"
        align="center"
        pt={2}
        wrap="wrap"
        display={{ base: "none", md: "flex" }}
      >
        {images.map(function (image: ImageType, index: number) {
          const src =
            image && image.formats && image.formats.thumbnail
              ? image.formats.thumbnail.url
              : image.url;

          return (
            <a href={"#" + PREFIX + index} key={index}>
              <Thumbnail
                as="img"
                src={src}
                opacity={index == active ? 1 : 0.33}
                mr={3}
                rounded="xs"
                bg="gray.100"
              />
            </a>
          );
        })}
      </Flex>
    </Fragment>
  );
}

export function updateHash(index: number): void {
  window.location.hash = "#" + PREFIX + index;
}

const Thumbnail = styled(Box)`
  object-position: center;
  object-fit: cover;
  height: 42px;
  width: 80px;
  transition: 0.1s opacity ease-in-out;
`;

// The element with the scroll bar
const Slider = styled(Flex)`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* scroll-padding-top: 160px; */
  /* Kill the scrollbar */
  box-sizing: content-box;
  padding-bottom: 32px;
`;

const Slide = styled(Box)`
  scroll-snap-align: start;
  scroll-padding-top: 160px;
`;

// Glide slider
// style="transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s; width: 10649px; transform: translate3d(-4105px, 0px, 0px);"
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

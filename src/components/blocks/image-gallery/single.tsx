import { ReactElement } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

// Components
import StrapiImage from "src/components/atoms/strapi-image";
import Caption from "./caption";

// TypeScript
import { Image } from "src/typescript/lib/image";

// Sizes
import { height, maxHeight, minHeight } from "./index";

interface Props extends BoxProps {
  image: Image;
}

export default function Single(props: Props): ReactElement {
  const { image, ...rest } = props;

  return (
    <Box height={height} pos="relative" {...rest}>
      <StrapiImage
        image={image}
        rounded="sm"
        width="100%"
        maxHeight={maxHeight}
      />
      <Caption active={0} length={1} minHeight={minHeight}>
        {image.caption}
      </Caption>
    </Box>
  );
}

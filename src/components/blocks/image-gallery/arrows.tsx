// Packages
import { ReactElement } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "react-feather";

// Components
import RoundIcon from "../round-icon";

const sharedDesktop = {
  cursor: "pointer",
  is: "lg" as "lg",
  variant: "purple",
  strokeWidth: 1,
  bg: "white",
  shadow: "center.dark",
  display: { base: "none", md: "flex" },
  borderColor: "gray.100",
  borderWidth: 1,
};

interface DateSwitcherProps extends FlexProps {
  next: () => void;
  back: () => void;
  active: number;
  length: number;
}

// For desktop only
export default function Arrows(props: DateSwitcherProps): ReactElement {
  const { next, back, active, length, ...rest } = props;

  return (
    <Flex
      position="absolute"
      width="107%"
      align="center"
      justify="space-between"
      left="-3.5%"
      display={{ base: "none", md: "flex" }}
      {...rest}
    >
      <RoundIcon
        src={ArrowLeft}
        onClick={back}
        visibility={active == 0 ? "hidden" : "visible"}
        {...sharedDesktop}
      />
      <RoundIcon
        src={ArrowRight}
        onClick={next}
        visibility={active >= length - 1 ? "hidden" : "visible"}
        {...sharedDesktop}
      />
    </Flex>
  );
}

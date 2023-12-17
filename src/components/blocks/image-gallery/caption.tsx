import { ReactElement } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

// Components
import Text from "src/components/atoms/text";

// Hooks
import { useTranslation } from "src/hooks/use-translation";

interface Props extends FlexProps {
  active: number;
  length: number;
}

export default function Caption(props: Props): ReactElement {
  const { children, active, length, ...rest } = props;

  const { t } = useTranslation();

  return (
    <Flex
      align="baseline"
      justify="space-between"
      mt={{ base: 1, md: 2 }}
      px={{ base: 2, md: 4 }}
      {...rest}
    >
      <Text
        styleAs="small"
        fontWeight={600}
        fontSize="12px"
        color="gray.700"
        visibility={{ base: "visible", md: "hidden" }}
      >
        {`${t("life.image").toUpperCase()} ${active + 1} / ${length}`}
      </Text>

      <Text styleAs="small" fontSize={{ base: "14px", md: "13px" }}>
        {children}
      </Text>
    </Flex>
  );
}

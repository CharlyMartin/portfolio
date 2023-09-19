import Container from "@/components/blocks/container";
import Title, { Props as TitleProps } from "@/components/atoms/title";
import Text, { Props as TextProps } from "@/components/atoms/text";

type Props = {
  title: TitleProps["children"];
  text: TextProps["children"];
  children: React.ReactNode;
};

export default function PageLayout(props: Props) {
  const { title, text, children } = props;

  return (
    <Container>
      <div className="max-w-2xl">
        <Title>{title}</Title>
        <Text>{text}</Text>
      </div>
      <div className="mt-16 sm:mt-20 md:mt-28">{children}</div>
    </Container>
  );
}

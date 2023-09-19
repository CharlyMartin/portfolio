import Card from "@/components/blocks/card";

type Props = {
  slug: string;
  title: string;
  date?: string;
  description: string;
};

export default function Article(props: Props) {
  const { title, slug, date, description } = props;

  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      {date && (
        <Card.Eyebrow as="time" dateTime={date} decorate top>
          {date}
        </Card.Eyebrow>
      )}
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

import Card from "@/components/blocks/card";
import { formatArticleDate } from "@/lib/format-date";

type Props = {
  slug: string;
  title: string;
  created: Date;
  description: string;
};

function ArticlePreviewSquare(props: Props) {
  const { title, slug, created, description } = props;

  const date = formatArticleDate(new Date(created));

  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={date} decorate top>
        {date}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function ArticlePreviewLine(props: Props) {
  const { slug, title, created, description } = props;

  const date = formatArticleDate(new Date(created));

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={date}
          className="md:hidden"
          decorate
          top
        >
          {date}
        </Card.Eyebrow>
        <Card.Description>{description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
    </article>
  );
}

const Articles = {
  Square: ArticlePreviewSquare,
  Line: ArticlePreviewLine,
};

export default Articles;

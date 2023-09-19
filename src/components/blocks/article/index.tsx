import Card from "@/components/blocks/card";
import { formatArticleDate } from "@/lib/format-date";

type Props = {
  slug: string;
  title: string;
  date: string | Date;
  description: string;
};

function ArticlePreviewSquare(props: Props) {
  const { title, slug, date, description } = props;

  const d = formatArticleDate(new Date(date));

  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={d} decorate top>
        {d}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function ArticlePreviewLine(props: Props) {
  const { slug, title, date, description } = props;

  const d = formatArticleDate(new Date(date));

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={d} className="md:hidden" decorate top>
          {d}
        </Card.Eyebrow>
        <Card.Description>{description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={d} className="md:bloc mt-0.5" top>
        {d}
      </Card.Eyebrow>
    </article>
  );
}

const Articles = {
  Square: ArticlePreviewSquare,
  Line: ArticlePreviewLine,
};

export default Articles;

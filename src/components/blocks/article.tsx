import Card from "@/components/blocks/card";
import { DATE_FORMATS, formatArticleDate } from "@/lib/format-date";
import Badge from "@/components/atoms/badge";

type Props = {
  slug: string;
  title: string;
  wordCount: number;
  created: Date;
  description: string;
  topic: string;
};

function ArticlePreviewSquare(props: Props) {
  const { title, slug, created, description } = props;

  const date = formatArticleDate(created, DATE_FORMATS.ARTICLE_SHORT);
  const isoDate = created.toISOString().slice(0, 10);

  return (
    <Card as="article">
      <Card.Title as="h3" href={`/articles/${slug}`}>
        {title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={isoDate} decorate top>
        {date}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function ArticlePreviewLine(props: Props) {
  const { slug, title, created, description, topic, wordCount } = props;

  const date = formatArticleDate(created, DATE_FORMATS.ARTICLE_LONG);
  const isoDate = created.toISOString().slice(0, 10);
  const formattedCount = new Intl.NumberFormat("en-US").format(wordCount);

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={isoDate}
          className="md:hidden"
          decorate
          top
        >
          {date}
        </Card.Eyebrow>
        <Card.Description>{description}</Card.Description>

        <div className="mt-2.5 mb-1.5 flex items-center">
          <Badge size="sm" className="z-10 mr-2.5">
            {topic}
          </Badge>
          <Card.Eyebrow>{formattedCount} words</Card.Eyebrow>
        </div>

        <Card.Cta>Read article</Card.Cta>
      </Card>

      {/* Item on the left on md+ */}
      <Card.Eyebrow
        as="time"
        dateTime={isoDate}
        className="mt-0.5 hidden md:block"
        top
      >
        {date}
      </Card.Eyebrow>
    </article>
  );
}

const Article = {
  Square: ArticlePreviewSquare,
  Line: ArticlePreviewLine,
};

export default Article;

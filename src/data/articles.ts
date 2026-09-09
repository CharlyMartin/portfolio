import { articleCollection } from "@qino/articles";

export async function getHighligthedArticles() {
  const articles = await articleCollection.getAll();
  return articles.filter((article) => article.highlight);
}

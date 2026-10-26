import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  categorySlug: string;
  image: string;
  imageAlt: string;
  mood?: string;
  content: string;
};

export function getArticleSlugs() {
  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getArticleBySlug(slug: string): Article {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    categorySlug: data.categorySlug,
    image: data.image,
    imageAlt: data.imageAlt,
    mood: data.mood,
    content
  };
}

export function getAllArticles() {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getArticlesByCategory(categorySlug: string) {
  return getAllArticles().filter((article) => article.categorySlug === categorySlug);
}

export function getRelatedArticles(slug: string, categorySlug: string, limit = 3) {
  return getArticlesByCategory(categorySlug).filter((article) => article.slug !== slug).slice(0, limit);
}

export function getAdjacentArticles(slug: string) {
  const articles = getAllArticles();
  const index = articles.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : null
  };
}

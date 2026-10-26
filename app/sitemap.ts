import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { absoluteImageUrl } from "@/lib/seo";
import { categories, site } from "@/lib/site";

function latestDate(dates: string[]) {
  const timestamps = dates
    .map((date) => new Date(date).getTime())
    .filter((timestamp) => !Number.isNaN(timestamp));

  return new Date(Math.max(...timestamps, new Date(site.startedAt).getTime()));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const latest = latestDate(articles.map((article) => article.date));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteImageUrl(site.ogImage)]
    },
    {
      url: `${site.url}/archive`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date(site.startedAt),
      changeFrequency: "monthly",
      priority: 0.4
    },
    ...categories.map((category) => {
      const categoryArticles = articles.filter((article) => article.categorySlug === category.slug);

      return {
        url: `${site.url}/${category.slug}`,
        lastModified: latestDate(categoryArticles.map((article) => article.date)),
        changeFrequency: "weekly" as const,
        priority: 0.8
      };
    })
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${site.url}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteImageUrl(article.image)]
  }));

  return [...staticPages, ...articlePages];
}

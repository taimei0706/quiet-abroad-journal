import type { Article } from "@/lib/content";
import { site } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImageUrl(image: string) {
  return absoluteUrl(image);
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: {
      "@id": `${site.url}/#organization`
    }
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.svg")
    }
  };
}

export function articleJsonLd(article: Article): JsonLd {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const keywords = [article.category, article.mood].filter(Boolean).join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    headline: article.title,
    description: article.description,
    image: absoluteImageUrl(article.image),
    datePublished: `${article.date}T00:00:00+09:00`,
    dateModified: `${article.date}T00:00:00+09:00`,
    inLanguage: site.language,
    articleSection: article.category,
    keywords,
    wordCount: article.content.replace(/\s/g, "").length,
    author: {
      "@type": "Organization",
      name: site.author,
      url: site.url
    },
    publisher: {
      "@id": `${site.url}/#organization`
    },
    isPartOf: {
      "@id": `${site.url}/#website`
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function itemListJsonLd(articles: Article[], name: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/articles/${article.slug}`),
      name: article.title
    }))
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  articles
}: {
  name: string;
  description: string;
  path: string;
  articles: Article[];
}): JsonLd {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name,
    description,
    inLanguage: site.language,
    isPartOf: {
      "@id": `${site.url}/#website`
    },
    mainEntity: itemListJsonLd(articles, name)
  };
}

export function webPageJsonLd({
  name,
  description,
  path
}: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: site.language,
    isPartOf: {
      "@id": `${site.url}/#website`
    }
  };
}

import { getAllArticles } from "@/lib/content";
import { absoluteImageUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return character;
    }
  });
}

export async function GET() {
  const articles = getAllArticles();
  const latestArticleDate = articles.reduce((latest, article) => {
    const timestamp = new Date(article.date).getTime();
    return Number.isNaN(timestamp) ? latest : Math.max(latest, timestamp);
  }, 0);

  const items = articles
    .map((article) => {
      const url = `${site.url}/articles/${article.slug}`;
      const image = absoluteImageUrl(article.image);

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <description>${escapeXml(article.description)}</description>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <pubDate>${new Date(article.date).toUTCString()}</pubDate>
          <category>${escapeXml(article.category)}</category>
          <media:content url="${escapeXml(image)}" medium="image" />
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title>${escapeXml(site.name)}</title>
        <description>${escapeXml(site.description)}</description>
        <link>${escapeXml(site.url)}</link>
        <language>${site.language}</language>
        <copyright>${escapeXml(`© ${new Date().getFullYear()} ${site.name}`)}</copyright>
        <lastBuildDate>${new Date(latestArticleDate).toUTCString()}</lastBuildDate>
        <ttl>60</ttl>
        <atom:link href="${escapeXml(`${site.url}/rss.xml`)}" rel="self" type="application/rss+xml" />
        <image>
          <url>${escapeXml(absoluteImageUrl(site.ogImage))}</url>
          <title>${escapeXml(site.name)}</title>
          <link>${escapeXml(site.url)}</link>
        </image>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://quiet-abroad-journal.vercel.app").replace(/\/$/, "");
const key = "27a1bef1e81a06545ccf2d75d7aa45f8";

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`, {
  headers: { "User-Agent": "quiet-abroad-journal/1.0 (IndexNow)" }
});

if (!sitemapResponse.ok) {
  throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  throw new Error("No URLs found in sitemap");
}

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList
  })
});

console.log(`IndexNow response: ${response.status} ${response.statusText}`);

if (!response.ok && response.status !== 202) {
  const body = await response.text();
  throw new Error(`IndexNow failed: ${body}`);
}

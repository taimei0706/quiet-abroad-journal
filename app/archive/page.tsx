import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { sampleTitles } from "@/lib/site";

export const metadata = pageMetadata({
  title: "記録",
  description: "遠くの生活手帖の記事一覧。海外の部屋、水と空気、机まわり、眠りの記録。",
  path: "/archive"
});

export default function ArchivePage() {
  const articles = getAllArticles();

  return (
    <main className="page-shell fade-in py-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: "記録",
            description: "遠くの生活手帖の記事一覧。",
            path: "/archive",
            articles
          }),
          breadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name: "記録", path: "/archive" }
          ])
        ]}
      />
      <Breadcrumbs items={[{ name: "記録" }]} />
      <h1 className="mt-6 text-[1.85rem] font-normal leading-[1.7]">記録</h1>
      <p className="mt-6 max-w-[32rem] text-sm leading-8 text-muted">
        書き終えたこと、まだ途中の気持ち、いつか静かな朝に戻ってきたい題名。
      </p>

      <div className="mt-16 grid gap-7">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="border-t border-line pt-6 no-underline">
            <p className="text-xs text-muted">{article.category}</p>
            <h2 className="mt-2 text-lg font-normal leading-8 text-ink">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{article.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-24 border-t border-line pt-10">
        <h2 className="text-sm font-normal text-ink">これから書きたいこと</h2>
        <ul className="mt-6 grid gap-4 text-sm leading-7 text-muted">
          {sampleTitles.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

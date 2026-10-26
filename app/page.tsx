import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryList } from "@/components/CategoryList";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles } from "@/lib/content";
import { itemListJsonLd } from "@/lib/seo";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.find((article) => article.slug === "dry-throat-winter-room") ?? articles[0];
  const latest = articles.filter((article) => article.slug !== featured.slug);
  const startHere = ["dry-throat-winter-room", "room-key-in-small-pouch", "one-cup-dripper-small-kitchen"]
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is (typeof articles)[number] => Boolean(article));

  return (
    <main className="fade-in">
      <JsonLd data={itemListJsonLd(articles.slice(0, 10), "最近の記録")} />
      <section className="page-shell pb-16 pt-16 md:pb-24 md:pt-28">
        <p className="text-xs tracking-[0.22em] text-muted">海外で暮らす日本人の生活手帖</p>
        <h1 className="mt-7 max-w-[34rem] text-[1.48rem] font-normal leading-[1.95] text-ink md:mt-8 md:text-[2.05rem]">
          遠い国の部屋で、今日を少しだけやわらかくする。
        </h1>
        <p className="mt-7 max-w-[30rem] text-[0.88rem] leading-8 text-muted md:mt-8 md:text-sm md:leading-9">
          硬水、乾燥、机の上、眠り、日本から届く小さなもの。便利さよりも、生活の手触りを取り戻すための静かな記録です。
        </p>
      </section>

      <section className="page-shell grid gap-8 md:grid-cols-[1fr_72px] md:items-start">
        <ArticleCard article={featured} priority />
        <p className="vertical-note border-t border-line pt-5 text-xs leading-7 tracking-[0.12em] text-muted md:border-t-0 md:pt-4 md:tracking-[0.18em]">
          生活は、ときどき道具より先に、空気の湿り気を必要としている。
        </p>
      </section>

      <section className="page-shell mt-24 md:mt-32">
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-line pb-4">
          <h2 className="text-sm font-normal text-ink">最近の記録</h2>
          <Link href="/archive" className="quiet-link text-xs">
            すべて読む
          </Link>
        </div>
        <div className="grid gap-14 md:gap-20">
          {latest.slice(0, 4).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="page-shell mt-24 md:mt-28">
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-line pb-4">
          <h2 className="text-sm font-normal text-ink">読みはじめ</h2>
          <Link href="/archive" className="quiet-link text-xs">
            すべて読む
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {startHere.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group border-t border-line py-5 no-underline"
            >
              <p className="text-xs text-muted">{article.category}</p>
              <h3 className="mt-2 text-sm font-normal leading-7 text-ink transition group-hover:text-muted">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell mt-24 md:mt-32">
        <h2 className="mb-8 text-sm font-normal text-ink">この手帖の棚</h2>
        <CategoryList />
      </section>
    </main>
  );
}

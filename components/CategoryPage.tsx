import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getArticlesByCategory } from "@/lib/content";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { categories } from "@/lib/site";

export function CategoryPage({ slug }: { slug: string }) {
  const category = categories.find((item) => item.slug === slug);
  const articles = getArticlesByCategory(slug);
  const name = category?.name ?? "記録";
  const description = category?.description ?? "";

  return (
    <main className="page-shell fade-in py-16 md:py-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            name,
            description,
            path: `/${slug}`,
            articles
          }),
          breadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name, path: `/${slug}` }
          ])
        ]}
      />
      <Breadcrumbs items={[{ name }]} />
      <h1 className="mt-6 text-[1.55rem] font-normal leading-[1.8] text-ink md:mt-7 md:text-[1.85rem]">{name}</h1>
      <p className="mt-5 max-w-[32rem] text-[0.88rem] leading-8 text-muted md:mt-6 md:text-sm">{description}</p>
      <p className="mt-4 text-xs tracking-[0.16em] text-muted">{articles.length}件の記録</p>

      <div className="mt-14 grid gap-14 md:mt-16 md:gap-16">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}

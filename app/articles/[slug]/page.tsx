import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { ArticleNav } from "@/components/ArticleNav";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { QuietImage } from "@/components/QuietImage";
import { ShareLinks } from "@/components/ShareLinks";
import { getAllArticles, getAdjacentArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const components = {
  ProductCard,
  QuietImage
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getAllArticles().find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  const path = `/articles/${article.slug}`;
  const publishedTime = `${article.date}T00:00:00+09:00`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      publishedTime,
      modifiedTime: publishedTime,
      authors: [site.author],
      section: article.category,
      tags: [article.category, article.mood].filter(Boolean) as string[],
      images: [
        {
          url: article.image,
          alt: article.imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  try {
    const article = getArticleBySlug(slug);
    const relatedArticles = getRelatedArticles(article.slug, article.categorySlug);
    const { previous, next } = getAdjacentArticles(article.slug);

    return (
      <main className="fade-in">
        <JsonLd
          data={[
            articleJsonLd(article),
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: article.category, path: `/${article.categorySlug}` },
              { name: article.title, path: `/articles/${article.slug}` }
            ])
          ]}
        />
        <article className="page-shell pb-10 pt-14 md:pt-20">
          <Breadcrumbs
            items={[
              { name: article.category, path: `/${article.categorySlug}` },
              { name: article.title }
            ]}
          />
          <h1 className="mt-6 text-[1.62rem] font-normal leading-[1.8] text-ink md:text-[2.25rem] md:leading-[1.55]">{article.title}</h1>
          <p className="mt-5 max-w-[34rem] text-[0.88rem] leading-8 text-muted md:mt-6 md:text-sm">{article.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-muted md:mt-8">
            <time dateTime={article.date}>
              {new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(new Date(article.date))}
            </time>
            {article.mood ? <span>{article.mood}</span> : null}
          </div>
          <QuietImage src={article.image} alt={article.imageAlt} />
          <div className="prose prose-quiet max-w-none">
            <MDXRemote source={article.content} components={components} />
          </div>
          <ShareLinks path={`/articles/${article.slug}`} title={article.title} />
          <ArticleNav previous={previous} next={next} />
          {relatedArticles.length > 0 ? (
            <section className="mt-20 border-t border-line pt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.16em] text-muted">同じ棚の記録</p>
                  <h2 className="mt-3 text-sm font-normal text-ink">もう少しだけ、この空気の近くで</h2>
                </div>
                <Link href={`/${article.categorySlug}`} className="quiet-link text-xs whitespace-nowrap">
                  {article.category}
                </Link>
              </div>
              <div className="mt-8 grid gap-10">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/articles/${related.slug}`} className="border-t border-line pt-6 no-underline">
                    <p className="text-xs text-muted">{related.mood ?? related.category}</p>
                    <h3 className="mt-2 text-base font-normal leading-8 text-ink">{related.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{related.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}

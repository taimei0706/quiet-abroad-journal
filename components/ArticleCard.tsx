import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="block no-underline">
        <div className="relative aspect-[4/3] overflow-hidden bg-soft">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 760px) 100vw, 680px"
            className="object-cover opacity-[0.92] saturate-[0.72] transition duration-700 ease-quiet group-hover:scale-[1.025] group-hover:opacity-100"
          />
        </div>
        <div className="mt-6">
          <p className="text-xs text-muted">{article.category}</p>
          <h2 className="mt-3 text-[1.08rem] font-normal leading-[1.9] text-ink md:text-[1.22rem]">{article.title}</h2>
          <p className="mt-3 text-[0.88rem] leading-8 text-muted md:text-sm">{article.description}</p>
        </div>
      </Link>
    </article>
  );
}

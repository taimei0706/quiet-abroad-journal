import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleNav({
  previous,
  next
}: {
  previous: Article | null;
  next: Article | null;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav aria-label="前後の記事" className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
      <div>
        {previous ? (
          <Link href={`/articles/${previous.slug}`} className="group block no-underline">
            <p className="text-[0.7rem] tracking-[0.12em] text-muted">新しい記録</p>
            <p className="mt-2 text-sm leading-7 text-ink transition group-hover:text-muted">
              {previous.title}
            </p>
          </Link>
        ) : null}
      </div>
      <div className="sm:text-right">
        {next ? (
          <Link href={`/articles/${next.slug}`} className="group block no-underline">
            <p className="text-[0.7rem] tracking-[0.12em] text-muted">古い記録</p>
            <p className="mt-2 text-sm leading-7 text-ink transition group-hover:text-muted">
              {next.title}
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

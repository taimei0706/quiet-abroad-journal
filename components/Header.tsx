import Link from "next/link";
import { categories } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/82 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(100%-36px,920px)] flex-col items-start gap-3 py-4 md:w-[min(100%-48px,920px)] md:flex-row md:items-center md:justify-between md:gap-6">
        <Link href="/" className="whitespace-nowrap text-[0.82rem] font-normal tracking-[0.18em] text-ink no-underline">
          遠くの生活手帖
        </Link>
        <nav aria-label="メインナビゲーション" className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] leading-6 text-muted md:w-auto md:flex-nowrap md:gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`} className="quiet-link whitespace-nowrap">
              {category.name}
            </Link>
          ))}
          <Link href="/archive" className="quiet-link whitespace-nowrap">
            記録
          </Link>
          <Link href="/about" className="quiet-link whitespace-nowrap">
            この場所
          </Link>
        </nav>
      </div>
    </header>
  );
}

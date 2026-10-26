import Link from "next/link";

export const metadata = {
  title: "ページが見つかりません",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <main className="page-shell fade-in py-24 md:py-32">
      <p className="text-xs tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-6 text-[1.55rem] font-normal leading-[1.8] text-ink md:text-[1.85rem]">
        この記録は、まだここにありません。
      </h1>
      <p className="mt-5 max-w-[30rem] text-sm leading-8 text-muted">
        URL が変わったか、記事を整理したのかもしれません。記録の一覧から、もう一度たどってみてください。
      </p>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link href="/" className="quiet-link">
          ホーム
        </Link>
        <Link href="/archive" className="quiet-link">
          記録
        </Link>
        <Link href="/about" className="quiet-link">
          この場所
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="page-shell py-12 text-sm leading-7 text-muted">
        <p className="max-w-[34rem]">
          海外の部屋から、ゆっくり書いています。いくつかの記事には、実際に使っているものや日本から取り寄せたいものへの小さなアフィリエイトリンクが含まれます。
        </p>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem]">
          <Link href="/rss.xml" className="quiet-link">
            RSS
          </Link>
          <Link href="/archive" className="quiet-link">
            記録
          </Link>
          <Link href="/about" className="quiet-link">
            この場所
          </Link>
        </div>
      </div>
    </footer>
  );
}

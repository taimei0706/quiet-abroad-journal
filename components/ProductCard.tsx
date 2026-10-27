import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  name: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  shop?: "Amazon Japan" | "Japan";
};

export function ProductCard({ name, description, href, image, imageAlt, shop = "Japan" }: ProductCardProps) {
  const shopLabel = shop === "Amazon Japan" ? "Amazon Japan" : shop;

  return (
    <aside className="my-10 rounded border border-line bg-paper/60 p-4 md:my-12 md:p-5">
      <div className="grid grid-cols-[80px_1fr] gap-4 md:grid-cols-[100px_1fr] md:gap-5">
        <div className="relative aspect-square overflow-hidden rounded bg-soft">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 640px) 80px, 100px" className="object-cover saturate-[0.8]" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block rounded bg-soft px-2 py-0.5 text-[0.68rem] tracking-wider text-muted">{shopLabel}</span>
            <p className="mt-1.5 text-[0.88rem] font-medium leading-6 text-ink md:text-sm">{name}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
          </div>
          <div className="mt-3">
            <a
              href={href}
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
              aria-label={`${name}を${shopLabel}で見る（新しいタブで開きます）`}
              className="inline-flex items-center gap-1.5 rounded border border-line bg-paper px-3 py-1.5 text-xs font-normal text-ink shadow-sm transition hover:border-ink hover:bg-soft"
            >
              <span>{shopLabel}で詳細・レビューを見る</span>
              <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

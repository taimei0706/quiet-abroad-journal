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
  return (
    <aside className="my-10 border-y border-line py-5 md:my-12">
      <div className="grid grid-cols-[76px_1fr] gap-4 md:grid-cols-[92px_1fr] md:gap-5">
        <div className="relative aspect-square overflow-hidden bg-soft">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 640px) 76px, 92px" className="object-cover saturate-[0.75]" />
        </div>
        <div className="self-center">
          <p className="text-[0.7rem] text-muted">{shop}</p>
          <p className="mt-1 text-[0.86rem] leading-6 text-ink md:text-sm">{name}</p>
          <p className="mt-2 text-xs leading-6 text-muted">{description}</p>
          <a
            href={href}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
            aria-label={`${name}を${shop}で見る（新しいタブで開きます）`}
            className="mt-3 inline-flex items-center gap-1 text-xs text-muted no-underline transition hover:text-ink"
          >
            そっと見る <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </aside>
  );
}

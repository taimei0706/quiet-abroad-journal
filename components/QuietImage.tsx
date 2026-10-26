import Image from "next/image";

export function QuietImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-14">
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 680px" className="object-cover saturate-[0.72]" />
      </div>
      {caption ? <figcaption className="mt-3 text-xs leading-6 text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

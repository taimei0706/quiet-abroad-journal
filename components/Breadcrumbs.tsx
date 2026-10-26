import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-[0.7rem] leading-6 text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="quiet-link">
            ホーム
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex items-center gap-x-2">
            <span aria-hidden="true" className="text-line">
              /
            </span>
            {item.path ? (
              <Link href={item.path} className="quiet-link">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

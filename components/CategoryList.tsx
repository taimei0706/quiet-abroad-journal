import Link from "next/link";
import { getArticlesByCategory } from "@/lib/content";
import { categories } from "@/lib/site";

export function CategoryList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <Link key={category.slug} href={`/${category.slug}`} className="group border-t border-line py-5 no-underline">
          <p className="text-sm text-ink transition duration-500 group-hover:translate-x-1">
            {category.name}
            <span className="ml-2 text-xs text-muted">{getArticlesByCategory(category.slug).length}件</span>
          </p>
          <p className="mt-2 text-xs leading-6 text-muted">{category.description}</p>
        </Link>
      ))}
    </div>
  );
}

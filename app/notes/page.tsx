import { CategoryPage } from "@/components/CategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "手帖",
  description: "部屋、移動、夜、ふと思い出した日本のもの。まとまる前の生活の断片。",
  path: "/notes"
});

export default function NotesPage() {
  return <CategoryPage slug="notes" />;
}

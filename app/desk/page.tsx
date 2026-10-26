import { CategoryPage } from "@/components/CategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "机まわり",
  description: "ケーブル、灯り、ノート、作業の気配。集中よりも、落ち着きを整える場所。",
  path: "/desk"
});

export default function DeskPage() {
  return <CategoryPage slug="desk" />;
}

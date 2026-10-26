import { CategoryPage } from "@/components/CategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "眠り",
  description: "寝具、灯り、湿度、夜の習慣。部屋を少しだけ安心できる場所にすること。",
  path: "/sleep"
});

export default function SleepPage() {
  return <CategoryPage slug="sleep" />;
}

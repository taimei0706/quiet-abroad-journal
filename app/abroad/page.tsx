import { CategoryPage } from "@/components/CategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "海外生活",
  description: "別の言葉の中で暮らすこと。慣れたふりをしながら、少しずつ作る日常。",
  path: "/abroad"
});

export default function AbroadPage() {
  return <CategoryPage slug="abroad" />;
}

import { CategoryPage } from "@/components/CategoryPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "水と空気",
  description: "硬水、乾燥、喉、肌、白い水あと。海外の部屋で身体が先に気づくこと。",
  path: "/water"
});

export default function WaterPage() {
  return <CategoryPage slug="water" />;
}

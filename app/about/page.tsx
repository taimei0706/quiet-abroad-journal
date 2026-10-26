import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "この場所",
  description: "遠くの生活手帖について。海外で暮らす日本人の、静かな生活改善と小さな道具の記録。",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="page-shell fade-in py-20">
      <JsonLd
        data={[
          webPageJsonLd({
            name: "この場所",
            description: "遠くの生活手帖について。",
            path: "/about"
          }),
          breadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name: "この場所", path: "/about" }
          ])
        ]}
      />
      <Breadcrumbs items={[{ name: "この場所" }]} />
      <p className="mt-8 text-xs tracking-[0.18em] text-muted">この場所について</p>
      <h1 className="mt-8 text-[1.85rem] font-normal leading-[1.8] text-ink">
        海外生活の、説明しにくい疲れと、小さな安心のために。
      </h1>

      <div className="prose prose-quiet mt-12 max-w-none">
        <p>
          このサイトは、別の国で暮らす日本人の感覚から書いています。慣れたふりをしながら、部屋の水や空気、スーパーの棚、夜の静けさに少しずつ身体を合わせていく日々の記録です。
        </p>
        <p>
          扱うのは、大きな成功ではなく、普通の改善です。やわらかいタオル。夜の作業を少し寂しくなくする灯り。海外で探す気力がないから、日本から持ってくる小さなもの。
        </p>
        <p>
          一部の記事には、Amazon Japan への控えめなアフィリエイトリンクがあります。道具は主役ではありません。記憶や生活の中に自然に置かれていたものだけを、そっと残しています。
        </p>
        <p>
          ランキングも、強いボタンも、急がせる言葉も置きません。距離の寂しさを、ものが全部解決できるとは思っていないからです。ただ、静かに助けてくれるものを見逃さない場所でありたいと思っています。
        </p>
      </div>
    </main>
  );
}

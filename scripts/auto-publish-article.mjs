import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");

// 高単価・高成約率・海外生活で切実な需要のあるテーマプール
const topicPool = [
  {
    slug: "travel-compact-rice-cooker-abroad",
    title: "異国の台所で、一合の白いご飯を炊く小さな鍋",
    description: "現地の大きなオーブンを温める代わりに、手のひらサイズの炊飯器で一人分の湯気を立てる朝。",
    category: "海外生活",
    categorySlug: "abroad",
    mood: "台所の湯気",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "白い器に盛られたご飯と静かな台所",
    quietImage: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=82",
    quietImageAlt: "小さな木製テーブルと調理器具",
    quietImageCaption: "どんなに遠くに来ても、湯気の立つご飯の匂いだけは身体を最初の場所に戻してくれる。",
    productName: "海外対応 1合炊きコンパクト炊飯器",
    productDesc: "全世界対応の電圧切り替え。海外の小さな台所でも場所を取らず、一合分のご飯がふっくら炊ける。",
    productHref: "https://www.amazon.co.jp/s?k=%E6%B5%B7%E5%A4%96%E5%AF%BE%E5%BF%9C+%E7%82%8A%E9%83%AD%E5%99%A8+%E5%B0%8F%E5%9E%8B&tag=taimei03-22",
    productImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    productImageAlt: "コンパクトな炊飯用の器",
    contentBody: `海外のスーパーに並ぶお米は、長細くてぱらぱらしているものが多い。

それはそれで現地の煮込み料理や炒め物にはよく合うのだけれど、ふと疲れた夜に恋しくなるのは、つやつやとして甘みのある日本のお米だったりする。

現地の大きな炊飯器を買うと、海外のアパートの狭いキッチンの大半を占領してしまう。何合も炊いても食べきれず、結局冷凍庫を重たくしてしまう。

だから、手のひらに乗るような小さな炊飯器をひとつ迎えた。

スイッチを入れると、小さなことことという音とともに、懐かしい甘い香りが部屋の隅々まで満ちていく。
遠く離れた街の小さな部屋でも、お茶碗一杯分の安心は自分で作ることができる。`
  },
  {
    slug: "hot-water-bottle-cold-winter-apartment",
    title: "セントラルヒーティングが止まった夜の湯たんぽ",
    description: "夜中に冷え込む海外の古いアパート。足元にそっと忍ばせる、昔ながらの温もり。",
    category: "眠り",
    categorySlug: "sleep",
    mood: "冬の夜",
    image: "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "温かなニットと毛布のあるベッド",
    quietImage: "https://images.unsplash.com/photo-1445759714881-b657423023e1?auto=format&fit=crop&w=1400&q=82",
    quietImageAlt: "窓辺の雪景色と温かな室内",
    quietImageCaption: "機械の風ではなく、お湯の重みと温度で眠る。",
    productName: "ファシー（fashy）湯たんぽ フリースカバー付き",
    productDesc: "ドイツ製の頑丈な湯たんぽ。ケトルのお湯を入れるだけで、朝まで優しい温もりが続く冬の必需品。",
    productHref: "https://www.amazon.co.jp/s?k=%E6%B9%AF%E3%81%9F%E3%82%93%E3%81%BD+%E3%83%95%E3%82%A1%E3%82%B7%E3%83%BC&tag=taimei03-22",
    productImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80",
    productImageAlt: "柔らかいフリースと温かな部屋",
    contentBody: `海外のアパートの暖房は、壁に埋め込まれた温水パイプ（ラジエーター）が主流のところが多い。

一定の温度を保ってくれるのはありがたいけれど、夜間になると建物の設定で出力が絞られ、急に部屋が底冷えすることがある。

エアコンのように好きな温度に上げられない夜、助けてくれたのが湯たんぽだった。

電気ケトルでお湯を沸かし、ゴムの容器に注いで布カバーをかける。布団の足元に入れておくと、重みと一緒に柔らかな温もりがじんわりと広がっていく。

朝起きたとき、まだほんのり温かいそれを抱きしめながら、冬の静けさをやり過ごしている。`
  },
  {
    slug: "noise-cancelling-headphones-foreign-city-sounds",
    title: "異国の喧騒から耳を離す、静かなイヤーカップ",
    description: "救急車のサイレン、硬い石畳の反響音。耳を包むだけで、いつもの静けさに戻れる場所。",
    category: "手帖",
    categorySlug: "notes",
    mood: "カフェの窓辺",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "机の上に置かれたヘッドホンと落ち着いた空間",
    quietImage: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1400&q=82",
    quietImageAlt: "雨の街と窓ガラス",
    quietImageCaption: "外の音を消すのではなく、自分の周りに透明な余白をつくる。",
    productName: "ワイヤレス ノイズキャンセリングヘッドホン",
    productDesc: "長時間のフライトや海外の街歩き、カフェでの作業に。周囲の雑音を静かに抑え、集中と安らぎをもたらす。",
    productHref: "https://www.amazon.co.jp/s?k=%E3%83%8E%E3%82%A4%E3%82%BA%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%BB%E3%83%AA%E3%83%B3%E3%82%B0+%E3%83%98%E3%83%83%E3%83%89%E3%83%9B%E3%83%B3&tag=taimei03-22",
    productImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    productImageAlt: "耳を包み込む柔らかなヘッドホン",
    contentBody: `海外の街の音は、日本で聞き慣れた音と周波数が少し違う。

石畳を叩く硬い靴音、高いトーンで鳴り響くサイレン、カフェでの朗らかな話し声。
旅行のときは刺激的だったそれらの音も、日常として毎日浴び続けていると、知らないうちに耳と頭が疲れてしまうことがある。

そんなとき、ノイズキャンセリングのスイッチを入れる。

すうっと音が遠のき、まるで深い水の中に潜ったような静寂が訪れる。
無音になった空間で深呼吸をすると、張り詰めていた肩の力がふっと抜けていくのがわかる。

どこにいても自分だけの静けさを持ち歩ける。海外生活において、それは何よりの防御具だ。`
  }
];

export function generateNextArticle() {
  const existingFiles = new Set(fs.readdirSync(articlesDir));

  // まだ作成されていないトピックを探す
  const nextTopic = topicPool.find((t) => !existingFiles.has(`${t.slug}.mdx`));

  if (!nextTopic) {
    console.log("すべての予定テーマは既に公開済みです。");
    return null;
  }

  const today = new Date().toISOString().slice(0, 10);

  const mdxContent = `---
title: "${nextTopic.title}"
description: "${nextTopic.description}"
date: "${today}"
category: "${nextTopic.category}"
categorySlug: "${nextTopic.categorySlug}"
mood: "${nextTopic.mood}"
image: "${nextTopic.image}"
imageAlt: "${nextTopic.imageAlt}"
---

${nextTopic.contentBody.split("\n\n")[0]}

${nextTopic.contentBody.split("\n\n")[1]}

<QuietImage
  src="${nextTopic.quietImage}"
  alt="${nextTopic.quietImageAlt}"
  caption="${nextTopic.quietImageCaption}"
/>

${nextTopic.contentBody.split("\n\n").slice(2).join("\n\n")}

<ProductCard
  name="${nextTopic.productName}"
  description="${nextTopic.productDesc}"
  href="${nextTopic.productHref}"
  shop="Amazon Japan"
  image="${nextTopic.productImage}"
  imageAlt="${nextTopic.productImageAlt}"
/>
`;

  const targetPath = path.join(articlesDir, `${nextTopic.slug}.mdx`);
  fs.writeFileSync(targetPath, mdxContent, "utf-8");
  console.log(`新着記事を作成しました: ${targetPath}`);
  return nextTopic;
}

generateNextArticle();

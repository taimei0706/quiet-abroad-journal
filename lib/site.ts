const defaultSiteUrl = "https://quiet-abroad-journal.vercel.app";

export const site = {
  name: "遠くの生活手帖",
  description: "海外で暮らす日本人のための、静かな生活改善と小さな道具の記録。",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, ""),
  author: "遠くの生活手帖",
  locale: "ja_JP",
  language: "ja",
  themeColor: "#f7f5f2",
  startedAt: "2026-05-01",
  ogImage: "/og-default.jpg"
};

export const categories = [
  {
    slug: "notes",
    name: "手帖",
    description: "部屋、移動、夜、ふと思い出した日本のもの。まとまる前の生活の断片。"
  },
  {
    slug: "desk",
    name: "机まわり",
    description: "ケーブル、灯り、ノート、作業の気配。集中よりも、落ち着きを整える場所。"
  },
  {
    slug: "water",
    name: "水と空気",
    description: "硬水、乾燥、喉、肌、白い水あと。海外の部屋で身体が先に気づくこと。"
  },
  {
    slug: "abroad",
    name: "海外生活",
    description: "別の言葉の中で暮らすこと。慣れたふりをしながら、少しずつ作る日常。"
  },
  {
    slug: "sleep",
    name: "眠り",
    description: "寝具、灯り、湿度、夜の習慣。部屋を少しだけ安心できる場所にすること。"
  }
];

export const sampleTitles = [
  "海外に来てからも、なぜか残った習慣",
  "朝起きると喉が痛かったころ",
  "机を静かにしたら、仕事の入り方が変わった",
  "日本から今でも買っている小さなもの",
  "電気ケトルが部屋の一部になるまで",
  "硬水の国で、タオルだけを変えた日",
  "ひとつの灯りで暮らす小さな部屋",
  "説明しなくていいものを入れる旅のポーチ",
  "机を空っぽにするのをやめた理由",
  "三つの国を越えて残った夜の手順"
];

# 遠くの生活手帖

Next.js App Router、TypeScript、Tailwind CSS、MDX で作った、海外在住の日本人向けの静かな生活手帖サイトです。

主役は商品ではなく、生活の空気、記憶、身体感覚です。Amazon Japan アフィリエイトリンクは記事の中に控えめに置き、ランキングや強い CTA は使いません。

## Local Development

```bash
npm install
npm run dev
```

`http://localhost:3000` を開きます。

## Content

記事は `content/articles/*.mdx` にあります。frontmatter でタイトル、カテゴリ、日付、説明文、画像、ムードを管理します。

Reusable MDX components:

- `QuietImage`
- `ProductCard`

アフィリエイトリンクは文脈の中に静かに置いてください。ランキング、強い購入導線、割引表現、EC 風の UI は避けます。

## Quality Checks

```bash
npm run check        # frontmatter、カテゴリ、画像ホスト、MDX コンポーネントを検証
npm run check:remote # 上記に加えて、記事中の画像 URL が実際に配信されているか確認
npm test             # check + lint + typecheck
npm run build        # 本番ビルド
```

リモート画像は `next.config.mjs` の `images.remotePatterns` に登録されているホストだけを使えます。記事画像を追加・変更したら `npm run check:remote` も実行してください。

ローカル記事画像は `public/images/articles/` に置き、`npm run check` で重複利用がないことを確認します。出典とライセンスは `public/images/CREDITS.md` にまとめています。

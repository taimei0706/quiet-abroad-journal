# 公開・集客チェックリスト

## 公開直後

- [ ] 本番 URL を `NEXT_PUBLIC_SITE_URL` に設定して再デプロイ
- [ ] `/sitemap.xml`、`/robots.txt`、`/rss.xml`、`/manifest.webmanifest` が 200 で返る
- [ ] 記事ページの canonical が本番 URL になっている
- [ ] OGP 画像が X / LINE / Facebook で表示される
- [ ] `npm run indexnow` で IndexNow に URL を送信

## 検索エンジン

- [ ] Google Search Console にプロパティ追加
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` を設定して再デプロイ
- [ ] Search Console で sitemap を送信
- [ ] Bing Webmaster Tools に登録
- [ ] `NEXT_PUBLIC_BING_SITE_VERIFICATION` を設定して再デプロイ
- [ ] 1〜2 週間後にインデックス状況とクエリを確認

## 初期の集客

- [ ] X で「読みはじめ」の 3 記事を紹介
- [ ] はてなブックマークに投稿
- [ ] note に要約記事を書き、元記事へリンク
- [ ] 同じ悩みを持つコミュニティで、宣伝ではなく体験として共有
- [ ] 知人 5 人に URL を直接送る

## 継続

- [ ] 週 1 本を目安に、検索されやすい具体的な悩みで記事を追加
- [ ] 記事末の関連リンクと前後リンクを切らさない
- [ ] Search Console で表示回数のあるクエリを次の記事に反映
- [ ] 3 か月ごとに古い記事の情報と画像を更新
- [ ] Core Web Vitals と 404 を月 1 回確認

## 計測

- Vercel Analytics と Speed Insights を有効化済み
- 公開後、Vercel ダッシュボードで訪問数・参照元・人気記事を確認

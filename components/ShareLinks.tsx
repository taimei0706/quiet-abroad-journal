"use client";

import { useState } from "react";
import { absoluteUrl } from "@/lib/seo";

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック（クリップボードAPI非対応時）
    }
  };

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    },
    {
      label: "はてブ",
      href: `https://b.hatena.ne.jp/entry/panel/?url=${encodedUrl}&btitle=${encodedTitle}`
    },
    {
      label: "LINE",
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
    }
  ];

  return (
    <section aria-label="この記事を共有" className="mt-14 border-t border-line pt-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span>この記録を共有</span>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link"
            aria-label={`${link.label}で共有（新しいタブで開きます）`}
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          className="quiet-link bg-transparent p-0 border-0 cursor-pointer text-xs"
          aria-label="URLをクリップボードにコピー"
        >
          {copied ? "コピーしました" : "URLをコピー"}
        </button>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          element: string
        ) => void;
      };
    };
  }
}

const languages = [
  { code: "ja", name: "日本語" },
  { code: "en", name: "English" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "zh-CN", name: "简体中文" },
  { code: "ko", name: "한국어" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" }
];

export function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState("ja");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Google Translate script loading
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google!.translate!.TranslateElement(
          {
            pageLanguage: "ja",
            includedLanguages: "en,zh-TW,zh-CN,ko,fr,de,es,it,pt,ja",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
    }

    // Auto-detect browser language for overseas visitors
    const browserLang = navigator.language.toLowerCase();
    if (!browserLang.startsWith("ja")) {
      const match = languages.find(
        (l) => browserLang === l.code.toLowerCase() || browserLang.startsWith(l.code.toLowerCase().split("-")[0])
      );
      if (match && match.code !== "ja") {
        // 海外ユーザー向けに自動案内または切り替え
        changeLanguage(match.code);
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setIsOpen(false);

    if (langCode === "ja") {
      // リセット
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
      return;
    }

    const value = `/ja/${langCode}`;
    document.cookie = `googtrans=${value}; path=/;`;
    document.cookie = `googtrans=${value}; path=/; domain=.${window.location.hostname};`;

    // Google Translate のトリガー
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="quiet-link inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
        aria-label="言語を切り替える / Select Language"
      >
        <Globe size={13} strokeWidth={1.5} />
        <span>{languages.find((l) => l.code === selectedLang)?.name ?? "Language"}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 z-50 mt-2 w-36 rounded border border-line bg-paper py-1 shadow-md">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full px-3 py-1.5 text-left text-xs transition ${
                  selectedLang === lang.code ? "bg-soft font-medium text-ink" : "text-muted hover:bg-soft hover:text-ink"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

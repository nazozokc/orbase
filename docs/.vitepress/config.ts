import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "orbase",
  description: "ローカルで使えるライフ管理 CLI",
  // GitHub Pages serves this project under https://nazozokc.github.io/orbase/.
  base: "/orbase/",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230f172a'/%3E%3Ctext x='13' y='45' font-family='monospace' font-size='38' font-weight='700' fill='%2360a5fa'%3E%E2%9D%AF%3C/text%3E%3Crect x='32' y='38' width='18' height='5' rx='2.5' fill='%2393c5fd'/%3E%3C/svg%3E",
      },
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "ホーム", link: "/" },
      { text: "ガイド", link: "/guides" },
      { text: "コマンド一覧", link: "/commands" },
      { text: "FAQ", link: "/faq" },
    ],
    sidebar: [
      {
        text: "ドキュメント",
        items: [
          { text: "はじめに", link: "/" },
          { text: "インストール", link: "/installation" },
          { text: "基本ガイド", link: "/guides" },
          { text: "コマンド一覧", link: "/commands" },
          { text: "データ形式", link: "/data" },
          { text: "FAQ", link: "/faq" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/nazozokc/orbase" },
    ],
    footer: {
      message: "Local-first life management CLI",
      copyright: "© 2026 nazozokc",
    },
    search: {
      provider: "local",
    },
    outline: {
      label: "このページ内",
    },
    lastUpdated: {
      text: "最終更新",
    },
    docFooter: {
      prev: "前へ",
      next: "次へ",
    },
    returnToTopLabel: "トップに戻る",
    sidebarMenuLabel: "メニュー",
    darkModeSwitchLabel: "テーマ",
    darkModeSwitchTitle: "ダークモードに切り替え",
    lightModeSwitchTitle: "ライトモードに切り替え",
  },
});

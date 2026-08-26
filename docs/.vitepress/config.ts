import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "orbase",
  description: "ローカルで使えるライフ管理 CLI",
  themeConfig: {
    nav: [
      { text: "ホーム", link: "/" },
      { text: "ガイド", link: "/guides" },
      { text: "コマンド一覧", link: "/commands" },
      { text: "FAQ", link: "/faq" },
      { text: "GitHub", link: "https://github.com/nazozokc/orbase" },
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
  },
});

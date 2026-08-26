import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "orbase",
  description: "ローカルで使えるライフ管理 CLI",
  themeConfig: {
    nav: [
      { text: "ホーム", link: "/" },
      { text: "コマンド一覧", link: "/commands" },
      { text: "GitHub", link: "https://github.com/nazozokc/orbase" },
    ],
    sidebar: [
      {
        text: "ドキュメント",
        items: [
          { text: "はじめに", link: "/" },
          { text: "コマンド一覧", link: "/commands" },
        ],
      },
    ],
  },
});

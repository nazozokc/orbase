---
layout: home

hero:
  name: orbase
  text: ターミナルから始める、ローカルなライフ管理
  tagline: タスク・メモ・日記をシンプルに管理する CLI
  actions:
    - theme: brand
      text: はじめる
      link: /installation
    - theme: alt
      text: コマンド一覧
      link: /commands

features:
  - title: CLI-first
    details: 対話的なプロンプトで、タスク・メモ・日記をターミナルから管理できます。
  - title: Local-first
    details: データはすべて ~/.orbase/ に保存されます。サーバー、アカウント、テレメトリーはありません。
  - title: Plain text
    details: JSON と Markdown で保存されるため、エディタや Git で直接扱えます。
---

タスク・メモ・日記をローカルで管理する CLI ツールです。

すべてのデータは `~/.orbase/` に JSON または Markdown として保存されます。

## クイックスタート

```bash
nix run github:nazozokc/orbase
```

または npm / Bun からインストールできます。

```bash
npm install -g @nazozokc/orbase
# または
bun add -g @nazozokc/orbase
```

インストール後は次のコマンドでタスクを作成できます。

```bash
orbase task add
orbase task list
```

## 主な機能

- タスクの追加・編集・削除・一覧表示
- Markdown メモの管理
- 日付ごとの日記の管理
- タスク・メモ・日記の横断検索
- テンプレートの登録と再利用

インストール方法は [インストール](./installation)、詳しい使い方は [コマンド一覧](./commands) を参照してください。

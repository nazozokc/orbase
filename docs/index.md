---
layout: home

hero:
  name: mybase-cli
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
    details: 対話的なプロンプトで、タスク・メモ・日記をターミナルから管理。マウスに触れずに終わります。
  - title: Local-first
    details: データはすべて ~/.mybase/ に保存。サーバー、アカウント、テレメトリーは一切ありません。
  - title: Plain text
    details: JSON と Markdown で保存。エディタや Git で直接編集でき、データの鎖はつながります。
---

タスク・メモ・日記をローカルで管理する CLI ツールです。

すべてのデータは `~/.mybase/` に JSON または Markdown として保存されます。

## クイックスタート

```bash
nix run github:nazozokc/mybase
```

または npm / Bun からインストールできます。

```bash
npm install -g mybase-cli
# または
bun add -g mybase-cli
```

インストール後は次のコマンドでタスクを作成できます。

```bash
mybase-cli task add
mybase-cli task list
```

`mybase-cli` の各コマンドは対話形式です。タスクは JSON、メモと日記は Markdown として `~/.mybase/` に保存されるため、使い始めるときにアカウント登録やデータベースの準備は必要ありません。

## まず覚えるコマンド

| やりたいこと           | コマンド                                       |
| ---------------------- | ---------------------------------------------- |
| タスクを追加・確認する | `mybase-cli task add` / `mybase-cli task list` |
| メモを作成する         | `mybase-cli note add`                          |
| 今日の日記を書く       | `mybase-cli diary add`                         |
| キーワードを探す       | `mybase-cli search string <キーワード>`        |
| タグを探す             | `mybase-cli search tags <タグ>`                |
| カレンダーを表示する   | `mybase-cli calendar [<year>] [<month>]`       |
| 操作方法を確認する     | `mybase-cli --help`                            |

## 主な機能

- タスクの追加・編集・削除・一覧表示（優先度・状態での絞り込み）
- タグの作成・選択・削除・タグ検索（タスクとメモ）
- Markdown メモの管理（本棚ごとに整理）
- 日付ごとの日記の管理
- タスク・メモの横断検索（キーワードとタグ）
- カレンダーの表示と、その月の期限のタスク一覧
- テンプレートの登録と再利用
- 初期設定ファイルの作成

カレンダーの `month` 引数は 0 始まり（`0` = 1月）です。詳しくは [コマンド一覧](./commands#calendar) を参照してください。
タグの保存先と表示場所は [タグ](./tags) にまとめています。

インストール方法は [インストール](./installation)、詳しい使い方は [コマンド一覧](./commands) を参照してください。

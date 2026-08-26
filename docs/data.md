---
title: データ形式
description: orbase が保存するファイルとディレクトリ。
---

# データ形式

orbase のデータはすべて `~/.orbase/` 以下に保存されます。

```text
~/.orbase/
├── task/            # タスク（JSON）
│   └── <uuid>.json
├── note/            # メモ（Markdown + front matter）
│   └── <name>.md
├── diary/           # 日記（Markdown）
│   └── YYYY/MM/YYYY-MM-DD.md
├── template/        # テンプレート（任意）
└── tags.json        # タグ一覧（JSON）
```

## タスク

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "title": "買い物",
  "text": "牛乳と卵を買う",
  "dueDate": "2026-08-21",
  "done": false,
  "priority": "medium",
  "tag": ["買い物"],
  "createdAt": "2026-08-20T04:00:00.000Z"
}
```

## メモ

メモは front matter 付き Markdown です。本文は自由に編集できます。

```markdown
---
name: ""
date: "2026-8-20"
tags: []
---

# 本文
```

これらはプレーンテキストなので、必要に応じてエディタや Git から直接バックアップできます。

## 直接編集するときの注意

ファイルは通常の JSON / Markdown ですが、タスクの JSON は壊れた形式にすると一覧や検索で読み込めなくなります。直接変更する場合は、先に `~/.orbase/` をバックアップしてください。日記のパスは `YYYY/MM/YYYY-MM-DD.md` の形式を維持します。

## バックアップと復元

`~/.orbase/` をディレクトリごと保存しておけば、同じ場所へ戻すことで復元できます。orbase は自動同期を行わないため、バックアップの頻度と保管先は利用者が決める必要があります。

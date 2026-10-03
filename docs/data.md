---
title: データ形式
description: orbase が保存するファイルとディレクトリ。
---

# データ形式

orbase のデータはすべて `~/.orbase/` 以下に保存されます。

保存先を変更する設定ファイルは `~/.config/orbase/config.json` にあります。

```text
~/.orbase/
├── task/            # タスク（JSON）
│   └── <uuid>.json
├── note/            # メモ（Markdown + front matter）
│   └── <book>/
│       └── <name>.md
├── diary/           # 日記（Markdown）
│   └── YYYY/MM/YYYY-MM-DD.md
├── template/        # テンプレート（任意）
├── tags.json        # タグ名の一覧（JSON 配列）
└── book.json        # 最後に作成した本棚名（JSON 文字列）
```

## タスク

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "title": "買い物",
  "detail": "牛乳と卵を買う",
  "dueDate": "2026-10-05",
  "priority": "Medium",
  "tag": ["買い物"],
  "status": "Todo",
  "createdAt": "2026-09-20T04:00:00.000Z"
}
```

`priority` は `Low`、`Medium`、`High`、`Extra-high`、`status` は `Todo`、`Pending`、`In-Progress`、`Done` のいずれかです。`id` は作成時にランダムに付与される UUID です。

`dueDate` は `YYYY-M-D` 形式の自由入力です。`orbase task add` の初期値は翌日日付で、`orbase calendar` はこの値を `YYYY-MM` として切り出して、表示中の年月に一致するタスクを絞り込みます。**カレンダーでの絞り込みは `dueDate` のみで行われ、`tag` は影響しません。**

## タグ名の一覧

`tags.json` は、タスクでタグを新規作成したときに記録されるタグ名の一覧です。

```json
["買い物", "家", "仕事"]
```

文字列の配列で、重複は登録されません。`orbase task add` / `orbase task edit` の `create` 選択時のみ更新されます。メモの front matter のタグはここには登録されません。詳しくは [タグ](./tags) を参照してください。

## メモ

メモは本棚（`~/.orbase/note/<book>/`）内に保存される front matter 付き Markdown です。本文は自由に編集できます。

```markdown
---
date: "2026-8-20"
tags:
  - 買い物
---

# 本文
```

`orbase note add` は `tags` を空配列としてファイルを作り、以降は front matter を直接編集してタグを足します。`tags` は単一の文字列でも配列でも構いません。

`book.json` には `orbase note add` で最後に作成した本棚名が1つだけ入ります。本棚の一覧は `~/.orbase/note/` 以下のディレクトリが正です。

## 日記

日記は `~/.orbase/diary/YYYY/MM/YYYY-MM-DD.md` に保存されます。front matter はなく、タグの概念もありません。`orbase search string` の対象にはなりますが、`orbase search tags` の対象にはなりません。

## テンプレート

テンプレートは `~/.orbase/template/` にファイルまたはディレクトリとして配置します。`orbase template <name>` を実行すると、その内容がカレントディレクトリへコピーされます。

## 直接編集するときの注意

ファイルは通常の JSON / Markdown ですが、タスクの JSON は壊れた形式にすると一覧・カレンダー・検索で読み込めなくなります。直接変更する場合は、先に `~/.orbase/` をバックアップしてください。日記のパスは `YYYY/MM/YYYY-MM-DD.md` の形式を維持します。

`tags.json` だけを編集しても既存タスクの `tag` 配列は変わりません。タグ名を消すと、そのタグは `orbase task add` / `edit` の選択肢からなくなりますが、すでに付与済みのタスクには残ります。

## バックアップと復元

`~/.orbase/` をディレクトリごと保存しておけば、同じ場所へ戻すことで復元できます。orbase は自動同期を行わないため、バックアップの頻度と保管先は利用者が決める必要があります。

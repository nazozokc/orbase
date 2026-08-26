---
title: コマンド一覧
description: orbase CLI のコマンドリファレンス。
---

# コマンド一覧

各コマンドは対話形式で実行します。`orbase --help` や `orbase <command> --help` でも確認できます。

## コマンド早見表

| コマンド | 用途 |
| --- | --- |
| `task` | タスクの追加、編集、削除、一覧、優先度での絞り込み |
| `note` | Markdown メモの作成、編集、削除 |
| `diary` | 日付ごとの日記の作成、編集、削除 |
| `search` | キーワードまたはタグで横断検索 |
| `template` | 登録済みテンプレートをカレントディレクトリへコピー |

<details>
<summary><strong>クイックナビゲーション</strong></summary>

- [`task`](#task)
- [`note`](#note)
- [`diary`](#diary)
- [`search`](#search)
- [`template`](#template)

</details>

## `task`

```bash
orbase task add
orbase task edit
orbase task del
orbase task list
orbase task priority
```

タスクを管理します。タスクは `~/.orbase/task/` に JSON 形式で保存されます。

`add` ではタイトル、本文、期限、優先度（`low` / `medium` / `high` / `extra-high`）、タグを入力します。`list` は一覧を表示し、`priority` は優先度を選んで絞り込みます。

追加直後のタスクは未完了（`done: false`）です。タスクの編集では対象を選択して内容を更新できます。

```bash
orbase task add
orbase task list
orbase task priority
orbase task edit
orbase task del
```

## `note`

メモを Markdown で管理します。`add` はファイル名を尋ねてファイルを作成し、`$EDITOR` で開きます。`edit` は既存メモを選択して開き、`del` は複数選択して削除します。

```bash
orbase note add
orbase note edit
orbase note del
```

## `diary`

```bash
orbase diary add
orbase diary edit
orbase diary del
```

日記を管理します。`add` は今日の日記を作成して `$EDITOR` で開きます。`edit` と `del` では年・月・日を入力します。

## `search`

```bash
orbase search string <keyword>
orbase search tags <tag>
```

`string` はタスク・メモ・日記の内容を横断して検索し、`tags` はタグが一致するタスク・メモを検索します。

検索語はコマンド引数として渡します。空白を含む場合は引用符で囲んでください。

```bash
orbase search string "買い物 メモ"
```

## `template`

`~/.orbase/template/` にテンプレート用のディレクトリを作成しておくと、選択したテンプレートの中身をカレントディレクトリへコピーできます。

```bash
orbase template
```

## エディタの設定

メモや日記の編集には `$EDITOR` を使用します。

```bash
export EDITOR=vim
```

編集コマンドを実行する前に `$EDITOR` を設定してください。

## ヘルプとバージョン

```bash
orbase --help
orbase task --help
orbase --version
```

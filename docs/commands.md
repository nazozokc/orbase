---
title: コマンド一覧
description: orbase CLI のコマンドリファレンス。
---

# コマンド一覧

各コマンドは対話形式で実行します。`orbase --help` や `orbase <command> --help` でも確認できます。

## コマンド早見表

| コマンド                      | 用途                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| `task`                        | タスクの追加、編集、削除、一覧、優先度・状態での絞り込み   |
| `note`                        | 本棚ごとの Markdown メモの作成、編集、削除                 |
| `diary`                       | 日付ごとの日記の作成、編集、削除                           |
| `search`                      | キーワードまたはタグで横断検索                             |
| `calendar [<year>] [<month>]` | 指定した年月のカレンダーと、その月の期限のタスク一覧を表示 |
| `template <name>`             | 登録済みテンプレートをカレントディレクトリへコピー         |
| `init`                        | 設定ファイルを作成                                         |

`task` / `note` / `diary` / `search` / `calendar` にはサブコマンドがあります。タグの扱いは [タグ](./tags) にまとめています。

<details>
<summary><strong>クイックナビゲーション</strong></summary>

- [`task`](#task)
- [`note`](#note)
- [`diary`](#diary)
- [`search`](#search)
- [`calendar`](#calendar)
- [`template`](#template)
- [`init`](#init)

</details>

## `task`

```bash
orbase task add
orbase task edit
orbase task del
orbase task list
orbase task priority
orbase task status
orbase task tagdel
```

タスクを管理します。タスクは `~/.orbase/task/` に `<uuid>.json` として保存されます。

`add` ではタイトル、本文、期限、優先度（`Low` / `Medium` / `High` / `Extra-high`）、タグ、状態を入力します。`list` は一覧を表示し、`priority` は優先度、`status` は状態を選んで絞り込みます。

`edit` は編集するタスクを選択したあと、タイトル、本文、期限、優先度、タグ、状態を順番に更新します。

`del` は削除するタスクを複数選択してまとめて削除します。

状態は `Todo`（未着手）、`Pending`（保留）、`In-Progress`（進行中）、`Done`（完了）から選択します。`list` / `priority` / `status` は同じ列構成のテーブルを表示し、`status` 列は色付きで出力されます。

`tagdel` はタグ名を `tags.json` から削除するコマンドとして実装されていますが、現時点では引数を受け取らず `TypeError` で終了します。詳しくは [タグを削除する](./tags#タグを削除する) を参照してください。

### タグの入力

`add` と `edit` はどちらも `create or select?` と尋ねます。

- `create` — 自由入力。`,` 区切りで複数タグを指定でき、入力したタグ名は `~/.orbase/tags.json` に登録されます。
- `select` — `tags.json` に登録済みのタグから選択します。`edit` では1つ以上選ぶ必要があります。

```bash
$ orbase task add
? task title 買い物
? task detail 牛乳と卵を買う
? goal date 2026-10-05
? Select priority Medium
? create or select? create
? create and select tags 買い物, 家
? Select status To Do
```

```bash
$ orbase task list
┌──────┬────────────┬────────────┬────────┬──────────┬────────┐
│ title │ detail     │ dueDate    │ tag    │ priority │ status │
├──────┼────────────┼────────────┼────────┼──────────┼────────┤
│ 買い物 │ 牛乳と卵を買う │ 2026-10-05 │ 買い物,家 │ Medium   │  Todo  │
└──────┴────────────┴────────────┴────────┴──────────┴────────┘
```

タスクを新規作成するときの期限の初期値は、翌日の日付（`YYYY-M-D` 形式）です。

## `note`

メモを本棚ごとに Markdown で管理します。`add` はファイル名と本棚を尋ねて `~/.orbase/note/<book>/` にファイルを作成し、`$EDITOR` で開きます。`edit` は本棚と既存メモを選択して開き、`del` は本棚内のメモを複数選択して削除します。

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

`string` はタスク・メモ・日記の内容を横断して検索し、ファイルパスと内容を表示します。
`tags` はタグが一致するタスク・メモのパスを表示します。メモは front matter の `tags` を、タスクは JSON の `tag` 配列を照合します。日記にはタグがないため対象になりません。

検索語はコマンド引数として渡します。空白を含む場合は引用符で囲んでください。

```bash
orbase search string "買い物 メモ"
```

```bash
$ orbase search tags 買い物
/home/user/.orbase/task/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
/home/user/.orbase/note/personal/買い物.md
```

メモの front matter で `tags` を単一の文字列（`tags: 買い物`）で書いている場合、`search tags` は部分一致で判定します。

## `calendar`

```bash
orbase calendar [<year>] [<month>]
```

出力は2段構えです。上の表が日付のカレンダー、下の表がその月の期限を持つタスクの一覧です。

### 引数

`year` と `month` はどちらも省略できます。省略時の既定値には注意が必要です。

| 実行例                   | 表示される年月    |
| ------------------------ | ----------------- |
| `orbase calendar`        | 今日の年月        |
| `orbase calendar 2027`   | 2027 年の**今月** |
| `orbase calendar 2026 9` | **2026 年 10 月** |

**`month` は 0 始まりです。** `0` が1月、`11` が12月に対応します。したがって `orbase calendar 2026 9` が表示するのは9月ではなく10月です。

`month` だけを省略すると、1月ではなく現在の月が表示されます。

### カレンダーの表

日曜始まりの7列で、その月の1日から月末日までを配置します。表示中の月が今月の場合、今日の日付は `[3]` のように角括弧で囲まれます。

### タスクの表

カレンダーの下に、その月の期限を持つタスクを `title` / `detail` / `dueDate` / `tag` / `priority` / `status` の列で表示します。条件は `dueDate` の年月（`YYYY-MM`）が指定した年月と一致することだけです。**タグは絞り込み条件になりません。**

`tag` 列はタスクの `tag` 配列を `,` で連結した文字列です。

```bash
$ orbase calendar 2026 9
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ Sun │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │  1  │  2  │ [3] │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  4  │  5  │  6  │  7  │  8  │  9  │ 10  │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 11  │ 12  │ 13  │ 14  │ 15  │ 16  │ 17  │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 18  │ 19  │ 20  │ 21  │ 22  │ 23  │ 24  │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 25  │ 26  │ 27  │ 28  │ 29  │ 30  │ 31  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
┌────────┬────────────────┬────────────┬───────────┬──────────┬────────┐
│ title  │ detail         │ dueDate    │ tag       │ priority │ status │
├────────┼────────────────┼────────────┼───────────┼──────────┼────────┤
│ 買い物 │ 牛乳と卵を買う │ 2026-10-05 │ 買い物,家 │ Medium   │  Todo  │
└────────┴────────────────┴────────────┴───────────┴──────────┴────────┘
```

対象タスクがない場合もヘッダだけの表が表示されます。カレンダーは `~/.orbase/task/` のタスクしか読みません。メモと日記は表示されません。

## `template`

`~/.orbase/template/` にテンプレート用のファイルまたはディレクトリを手動で作成しておくと、指定したテンプレートをカレントディレクトリへコピーできます。`template` に登録・削除用のサブコマンドはありません。

```bash
orbase template project
```

## `init`

`~/.config/orbase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は実行してください。

```bash
orbase init
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

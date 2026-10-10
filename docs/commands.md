---
title: コマンド一覧
description: mybase-cli CLI のコマンドリファレンス。
---

# コマンド一覧

各コマンドは対話形式で実行します。`mybase-cli --help` や `mybase-cli <command> --help` でも確認できます。

## コマンド早見表

| コマンド                         | 用途                                                       |
| -------------------------------- | ---------------------------------------------------------- |
| `task`                           | タスクの追加、編集、削除、一覧、優先度・状態での絞り込み   |
| `note`                           | 本棚ごとの Markdown メモの作成、編集、削除                 |
| `diary`                          | 日付ごとの日記の作成、編集、削除                           |
| `search`                         | キーワードまたはタグでタスク・メモを検索                   |
| `calendar [<year>] [<month>]`    | 指定した年月のカレンダーと、その月の期限のタスク一覧を表示 |
| `template --templateName <name>` | 登録済みテンプレートをカレントディレクトリへコピー         |
| `init`                           | 設定ファイルを作成                                         |

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
mybase-cli task add
mybase-cli task edit
mybase-cli task del
mybase-cli task list
mybase-cli task priority
mybase-cli task status
mybase-cli task tagdel
```

タスクを管理します。タスクは `~/.mybase/task/` に `<uuid>.json` として保存されます。

`add` ではタイトル、本文、期限、優先度（`Low` / `Medium` / `High` / `Extra-high`）、タグ、状態を入力します。`list` は一覧を表示し、`priority` は優先度、`status` は状態を選んで絞り込みます。

`edit` は編集するタスクを選択したあと、`title` / `detail` / `dueDate` / `priority` / `tag` / `status` / `done` のメニューを繰り返し表示します。項目を選んで値を更新しても保存されず、そのたびにメニューへ戻ります。**`done` を選んだ時点でファイルに書き込んで終了します。** 途中で中断すると編集内容は保存されません。

```bash
$ mybase-cli task edit
? Select task to edit 買い物
? what edit it? dueDate
? change dueDate? 2026-10-10
? what edit it? done
```

`del` は削除するタスクを複数選択してまとめて削除します。

状態は `Todo`（未着手）、`Pending`（保留）、`In-Progress`（進行中）、`Done`（完了）から選択します。`list` / `priority` / `status` は同じ列構成のテーブルを表示し、`status` 列は色付きで出力されます。

`tagdel` は `~/.mybase/tags.json` に登録されたタグ名をチェックボックスで表示し、選んだタグを一覧から削除します。詳しくは [タグを削除する](./tags#タグを削除する) を参照してください。

### タグの入力

`add` と `edit` はどちらも `create or select?` と尋ねます。`edit` では `tag` 項目を選んだときに尋ねられます。

- `create` — 自由入力。`,` 区切りで複数タグを指定でき、入力したタグ名は `~/.mybase/tags.json` に登録されます。
- `select` — `tags.json` に登録済みのタグから選択します。`edit` では1つ以上選ぶ必要があります。

```bash
$ mybase-cli task add
? task title 買い物
? task detail 牛乳と卵を買う
? goal date 2026-10-05
? Select priority Medium
? create or select? create
? create and select tags 買い物, 家
? Select status To Do
```

```bash
$ mybase-cli task list
┌────────┬────────────────┬────────────┬───────────┬──────────┬────────┐
│ title  │ detail         │ dueDate    │ tag       │ priority │ status │
├────────┼────────────────┼────────────┼───────────┼──────────┼────────┤
│ 買い物 │ 牛乳と卵を買う │ 2026-10-05 │ 買い物,家 │ Medium   │  Todo  │
└────────┴────────────────┴────────────┴───────────┴──────────┴────────┘
```

タスクを新規作成するときの期限の初期値は、当日の日付に 1 を足した値（`YYYY-M-D` 形式）です。月をまたぐ計算はしないので、月末には存在しない日付（例: `2026-1-32`）が入ることがあります。

## `note`

メモを本棚ごとに Markdown で管理します。`add` はファイル名と本棚を尋ねて `~/.mybase/note/<book>/` にファイルを作成し、`$EDITOR` で開きます。本棚は `create or select book?` で新規作成するか既存のものを選択でき、新規作成した本棚名は `~/.mybase/book.json` に記録されます。`edit` は本棚と既存メモを選択して開き、`del` は本棚内のメモを複数選択して削除します。

```bash
mybase-cli note add
mybase-cli note edit
mybase-cli note del
mybase-cli note tagdel
```

`tagdel` は `~/.mybase/book.json` に登録された本棚名をチェックボックスで表示し、選んだ本棚名を一覧から削除します。**削除されるのは `book.json` の登録だけ**で、`~/.mybase/note/` 以下のディレクトリ、メモ本体、front matter の `tags` は変わりません。メモのタグを消すにはメモの front matter を直接編集してください。

## `diary`

```bash
mybase-cli diary add
mybase-cli diary edit
mybase-cli diary del
```

日記を管理します。`add` は今日の日記を作成して `$EDITOR` で開きます。`edit` と `del` では年・月・日を入力します。

パスは `~/.mybase/diary/YYYY/MM/` 以下に入力値をそのまま繋げて組み立てるため、月・日はファイル名と同じゼロ埋め 2 桁（例: `08`、`01`）で入力します。`8` のように桁が足りないと `No such file or directory` になります。

## `search`

```bash
mybase-cli search string <keyword>
mybase-cli search tags <tag>
```

`string` はタスク・メモの内容を横断して検索し、ファイルパスと内容を表示します。タスクがヒットした場合は JSON の全文、メモがヒットした場合はファイルの全文が出力されます。
`tags` はタグが一致するタスク・メモのパスを表示します。メモは front matter の `tags` を、タスクは JSON の `tag` 配列を照合します。日記にはタグがないため対象になりません。

**日記は `string` の検索対象になりません。** 現在のバージョンでは `~/.mybase/diary/YYYY/MM/` の月ディレクトリをファイルとして読もうとしてエラーになるため、日記の本文はキーワード検索にヒットしません。日記を探すには `~/.mybase/diary/` 以下を直接開いてください。

検索語はコマンド引数として渡します。空白を含む場合は引用符で囲んでください。

```bash
mybase-cli search string "買い物 メモ"
```

```bash
$ mybase-cli search tags 買い物
/home/user/.mybase/task/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
/home/user/.mybase/note/personal/買い物.md
```

メモの front matter で `tags` を単一の文字列（`tags: 買い物`）で書いている場合、`search tags` は部分一致で判定します。

## `calendar`

```bash
mybase-cli calendar [<year>] [<month>]
```

出力は2段構えです。上の表が日付のカレンダー、下の表がその月の期限を持つタスクの一覧です。

### 引数

`year` と `month` はどちらも省略できます。省略時の既定値には注意が必要です。

| 実行例                       | 表示される年月    |
| ---------------------------- | ----------------- |
| `mybase-cli calendar`        | 今日の年月        |
| `mybase-cli calendar 2027`   | 2027 年の**今月** |
| `mybase-cli calendar 2026 9` | **2026 年 10 月** |

**`month` は 0 始まりです。** `0` が1月、`11` が12月に対応します。したがって `mybase-cli calendar 2026 9` が表示するのは9月ではなく10月です。

`month` だけを省略すると、1月ではなく現在の月が表示されます。

### カレンダーの表

日曜始まりの7列で、その月の1日から月末日までを配置します。表示中の月が今月の場合、今日の日付は `[3]` のように角括弧で囲まれます。

### タスクの表

カレンダーの下に、その月の期限を持つタスクを `title` / `detail` / `dueDate` / `tag` / `priority` / `status` の列で表示します。条件は `dueDate` の年月（`YYYY-MM`）が指定した年月と一致することだけです。**タグは絞り込み条件になりません。**

`tag` 列はタスクの `tag` 配列を `,` で連結した文字列です。

```bash
$ mybase-cli calendar 2026 9
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ Sun │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │ 1   │ 2   │ [3] │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 4   │ 5   │ 6   │ 7   │ 8   │ 9   │ 10  │
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

対象タスクがない場合もヘッダだけの表が表示されます。カレンダーは `~/.mybase/task/` のタスクしか読みません。メモと日記は表示されません。

## `template`

`~/.mybase/template/` にテンプレート用のファイルまたはディレクトリを手動で作成しておくと、指定したテンプレートをカレントディレクトリへコピーできます。`template` に登録・削除用のサブコマンドはありません。

```bash
mybase-cli template --templateName project
```

テンプレート名は `--templateName` に指定します。このオプションは必須で、`mybase-cli template project` のように位置引数で渡すと `Optional argument '--templateName' is required` で失敗します。

## `init`

`~/.config/mybase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は実行してください。

```bash
mybase-cli init
```

## エディタの設定

メモや日記の編集には `$EDITOR` を使用します。

```bash
export EDITOR=vim
```

編集コマンドを実行する前に `$EDITOR` を設定してください。

## ヘルプとバージョン

```bash
mybase-cli --help
mybase-cli task --help
mybase-cli --version
```

---
title: ガイド
description: mybase-cli の基本的な使い方。
---

# 基本的な使い方

## 1日の流れ

朝に `task list` で予定を確認し、思いついたことは `note add`、一日の終わりには `diary add` に記録する、という使い方ができます。後から `search string` でタスクとメモをまとめて探せます（日記は現在のバージョンでは検索対象外です）。

## タスクを登録する

```bash
mybase-cli task add
mybase-cli task list
```

`task add` はタイトル、本文、期限、優先度、タグ、状態の順番に尋ねます。タグを複数付ける場合は作成時にカンマ区切りで入力できます。優先度だけで絞り込むには次を使います。

```bash
mybase-cli task priority
```

状態で絞り込むには `mybase-cli task status` を使います。`Todo`、`Pending`、`In-Progress`、`Done` から状態を選択できます。

```bash
mybase-cli task status
```

追加時に期限、優先度、タグを設定できます。タグを新規作成するか、既存のタグから選択できます。

登録済みのタスクを変更する場合は `mybase-cli task edit` を実行します。タスクを選び、`title` / `detail` / `dueDate` / `priority` / `tag` / `status` / `done` のメニューから項目を選んで更新します。項目を変更するたびにメニューに戻り、`done` を選んだ時点でファイルに保存されます。

## タグを整理する

タグはカンマ区切りの自由入力で新規作成するか、`~/.mybase/tags.json` に登録済みのタグから選びます。新規作成したタグ名は自動的に `tags.json` に追加されるので、次回以降の選択肢に現れます。

```bash
$ mybase-cli task add
? create or select? create
? create and select tags 買い物, 家
```

次回以降のタスクでは `select` を選ぶと、この2件が候補として表示されます。

```bash
? create or select? select
? select tags ◉ 買い物  ◯ 家
```

メモのタグは `mybase-cli note add` で開いたエディタの中で front matter の `tags` を直接書きます。メモのタグは `tags.json` には登録されないため、`mybase-cli search tags` はメモ側の front matter の値だけを照合します。

候補に無いタグを足したいときは `~/.mybase/tags.json` を直接編集します。不要になったタグは `mybase-cli task tagdel` で `tags.json` から削除できます。チェックボックスで選んだタグが一覧から消えます。詳しくは [タグを削除する](./tags#タグを削除する) を参照してください。

## メモを作る

```bash
export EDITOR=vim
mybase-cli note add
```

ファイル名と本棚を入力すると `~/.mybase/note/<book>/` に Markdown ファイルが作成され、エディタが開きます。本棚は新規作成するか、既存のものを選択できます。

## 日記を書く

```bash
mybase-cli diary add
```

今日の日付のファイルが `~/.mybase/diary/YYYY/MM/` に作成されます。過去の日記は `mybase-cli diary edit` で年・月・日を指定して開けます。

## 検索する

```bash
mybase-cli search string キーワード
mybase-cli search tags タグ名
```

文字列検索はタスクとメモの保存ファイルの内容を検索します（日記は現在のバージョンでは検索対象外です）。タグ検索もタスクとメモを対象にします。

## カレンダーを確認する

```bash
mybase-cli calendar 2026 9
```

出力が2段になります。上の表が日付のカレンダー（表示中の月が今月の場合、今日の日付は角括弧で囲まれます）、下の表がその月の期限を持つタスクの一覧です。下の表の `tag` 列にタスクのタグが `,` 区切りで表示されます。

**`month` は 0 始まりです。** `0` が1月、`11` が12月です。上の例は9月ではなく10月のカレンダーになります。

```bash
mybase-cli calendar 2026 8   # 2026 年 9 月
mybase-cli calendar 2026     # 2026 年の今月
mybase-cli calendar          # 今日の年月
```

`month` を省略すると1月ではなく**今月**が表示されます。1月を表示したい場合は `mybase-cli calendar 2026 0` のように明示してください。

タスクの表は期限（`dueDate`）が指定した年月と一致するタスクだけが対象です。タグによる絞り込みは行いません。タグ別の絞り込みには `mybase-cli search tags <tag>` を使ってください。詳しくは [タグが現れる場所](./tags#タグが現れる場所) を参照してください。

カレンダーはタスクのみを読みます。メモと日記は表示されないため、メモの予定は `mybase-cli search string` で探します。日記は現在のバージョンでは `mybase-cli search string` の対象外なので、`~/.mybase/diary/` 以下を直接開きます。

## テンプレートを使う

`~/.mybase/template/` にテンプレート用のファイルまたはディレクトリを作成します。テンプレート名を指定すると、ディレクトリ内のファイル構成、またはファイルそのものが実行時のカレントディレクトリへコピーされます。

```bash
mkdir -p ~/.mybase/template/project
mybase-cli template --templateName project
```

テンプレートは実行時のカレントディレクトリにコピーされます。既存ファイルと同名になる可能性がある場所では、コピー先を確認してから実行してください。

## バックアップする

データは1つのディレクトリにまとまっているため、定期的にコピーできます。

```bash
tar -czf mybase-backup.tar.gz -C ~ .mybase
```

Git で管理する場合は、個人情報や秘密情報が含まれていないことを確認してからリポジトリへ追加してください。

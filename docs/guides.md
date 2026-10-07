---
title: ガイド
description: orbase の基本的な使い方。
---

# 基本的な使い方

## 1日の流れ

朝に `task list` で予定を確認し、思いついたことは `note add`、一日の終わりには `diary add` に記録する、という使い方ができます。後から `search string` で3種類のデータをまとめて探せます。

## タスクを登録する

```bash
orbase task add
orbase task list
```

`task add` はタイトル、本文、期限、優先度、タグを順番に尋ねます。タグを複数付ける場合は作成時にカンマ区切りで入力できます。優先度だけで絞り込むには次を使います。

```bash
orbase task priority
```

状態で絞り込むには `orbase task status` を使います。`Todo`、`Pending`、`In-Progress`、`Done` から状態を選択できます。

```bash
orbase task status
```

追加時に期限、優先度、タグを設定できます。タグを新規作成するか、既存のタグから選択できます。

登録済みのタスクを変更する場合は `orbase task edit` を実行します。タスクを選び、`title` / `detail` / `dueDate` / `priority` / `tag` / `status` / `done` のメニューから項目を選んで更新します。項目を変更するたびにメニューに戻り、`done` を選んだ時点でファイルに保存されます。

## タグを整理する

タグはカンマ区切りの自由入力で新規作成するか、`~/.orbase/tags.json` に登録済みのタグから選びます。新規作成したタグ名は自動的に `tags.json` に追加されるので、次回以降の選択肢に現れます。

```bash
$ orbase task add
? create or select? create
? create and select tags 買い物, 家
```

次回以降のタスクでは `select` を選ぶと、この2件が候補として表示されます。

```bash
? create or select? select
? select tags ◉ 買い物  ◯ 家
```

メモのタグは `orbase note add` で開いたエディタの中で front matter の `tags` を直接書きます。メモのタグは `tags.json` には登録されないため、`orbase search tags` はメモ側の front matter の値だけを照合します。

候補に無いタグを足したいときは `~/.orbase/tags.json` を直接編集します。不要になったタグは `orbase task tagdel` で `tags.json` から削除できます。チェックボックスで選んだタグが一覧から消えます。詳しくは [タグを削除する](./tags#タグを削除する) を参照してください。

## メモを作る

```bash
export EDITOR=vim
orbase note add
```

ファイル名と本棚を入力すると `~/.orbase/note/<book>/` に Markdown ファイルが作成され、エディタが開きます。本棚は新規作成するか、既存のものを選択できます。

## 日記を書く

```bash
orbase diary add
```

今日の日付のファイルが `~/.orbase/diary/YYYY/MM/` に作成されます。過去の日記は `orbase diary edit` で年・月・日を指定して開けます。

## 検索する

```bash
orbase search string キーワード
orbase search tags タグ名
```

文字列検索は保存ファイルの内容を検索します。タグ検索はタスクとメモを対象にします。

## カレンダーを確認する

```bash
orbase calendar 2026 9
```

出力が2段になります。上の表が日付のカレンダー（表示中の月が今月の場合、今日の日付は角括弧で囲まれます）、下の表がその月の期限を持つタスクの一覧です。下の表の `tag` 列にタスクのタグが `,` 区切りで表示されます。

**`month` は 0 始まりです。** `0` が1月、`11` が12月です。上の例は9月ではなく10月のカレンダーになります。

```bash
orbase calendar 2026 8   # 2026 年 9 月
orbase calendar 2026     # 2026 年の今月
orbase calendar          # 今日の年月
```

`month` を省略すると1月ではなく**今月**が表示されます。1月を表示したい場合は `orbase calendar 2026 0` のように明示してください。

タスクの表は期限（`dueDate`）が指定した年月と一致するタスクだけが対象です。タグによる絞り込みは行いません。タグ別の絞り込みには `orbase search tags <tag>` を使ってください。詳しくは [タグが現れる場所](./tags#タグが現れる場所) を参照してください。

カレンダーはタスクのみを読みます。メモと日記は表示されないため、メモや日記の予定は `orbase search string` で探します。

## テンプレートを使う

`~/.orbase/template/` にテンプレート用のファイルまたはディレクトリを作成します。テンプレート名を指定すると、ディレクトリ内のファイル構成、またはファイルそのものが実行時のカレントディレクトリへコピーされます。

```bash
mkdir -p ~/.orbase/template/project
orbase template project
```

テンプレートは実行時のカレントディレクトリにコピーされます。既存ファイルと同名になる可能性がある場所では、コピー先を確認してから実行してください。

## バックアップする

データは1つのディレクトリにまとまっているため、定期的にコピーできます。

```bash
tar -czf orbase-backup.tar.gz -C ~ .orbase
```

Git で管理する場合は、個人情報や秘密情報が含まれていないことを確認してからリポジトリへ追加してください。

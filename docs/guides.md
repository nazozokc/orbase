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

状態で絞り込むには `orbase task status` を使います。`todo`、`pending`、`inprogress`、`done` から状態を選択できます。

```bash
orbase task status
```

追加時に期限、優先度、タグを設定できます。タグを新規作成するか、既存のタグから選択できます。

## メモを作る

```bash
export EDITOR=vim
orbase note add
```

ファイル名を入力すると `~/.orbase/note/` に Markdown ファイルが作成され、エディタが開きます。

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

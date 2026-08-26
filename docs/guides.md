---
title: ガイド
description: orbase の基本的な使い方。
---

# 基本的な使い方

## タスクを登録する

```bash
orbase task add
orbase task list
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

`~/.orbase/template/` にテンプレートディレクトリを作成します。ディレクトリ内のファイル構成が、実行時のカレントディレクトリへコピーされます。

```bash
mkdir -p ~/.orbase/template/project
orbase template
```

# コマンド一覧

## タスク

```bash
orbase task add
orbase task edit
orbase task del
orbase task list
orbase task priority
```

タスクは `~/.orbase/task/` に JSON 形式で保存されます。追加時にはタイトル、本文、期限、優先度、タグを入力できます。

## メモ

```bash
orbase note add
orbase note edit
orbase note del
```

メモは `~/.orbase/note/` に Markdown 形式で保存されます。

## 日記

```bash
orbase diary add
orbase diary edit
orbase diary del
```

日記は `~/.orbase/diary/YYYY/MM/YYYY-MM-DD.md` に保存されます。

## 検索

```bash
orbase search string <keyword>
orbase search tags <tag>
```

キーワード検索はタスク、メモ、日記を横断します。タグ検索はタスクとメモを対象にします。

## テンプレート

よく使うファイルやディレクトリを `~/.orbase/template/` に登録しておくと、選択したテンプレートをカレントディレクトリへコピーできます。

```bash
orbase template
```

## エディタの設定

メモや日記の編集には `$EDITOR` を使用します。

```bash
export EDITOR=vim
```

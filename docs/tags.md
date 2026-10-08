---
title: タグ
description: orbase のタグがどこに保存され、カレンダーや一覧・検索のどこに表示されるか。
---

# タグ

orbase のタグは **タスク用**と **メモ用**の2系統に分かれており、保存先も入力方法が異なります。
カレンダー・一覧・検索にタグがどう現れるかを理解しておくと、絞り込みを組み合わせて使いやすくなります。

## タグの保存先

| 対象           | 保存先                                                   | 形式                         |
| -------------- | -------------------------------------------------------- | ---------------------------- |
| タスクのタグ名 | `~/.orbase/tags.json`                                    | 文字列の配列（タグ名の一覧） |
| タスクの付与   | `~/.orbase/task/<uuid>.json` の `tag`                    | 文字列の配列                 |
| メモのタグ     | `~/.orbase/note/<book>/<name>.md` の front matter `tags` | 文字列または配列             |
| 日記のタグ     | なし                                                     | —                            |

`tags.json` はタスクでタグを新規作成したときにのみ更新されます。メモの front matter に書いたタグは `tags.json` には登録されません。

```json
["買い物", "家", "仕事"]
```

```json
{
  "title": "買い物",
  "dueDate": "2026-10-05",
  "tag": ["買い物", "家"],
  "status": "Todo"
}
```

```markdown
---
date: "2026-8-20"
tags:
  - 買い物
---
```

## タグを付ける

`orbase task add` は最初から、`orbase task edit` は `tag` 項目を選んだときに、どちらも `create or select?` と尋ねます。

- `create` — 自由入力。`,`（カンマ）で区切ると複数タグとして扱われ、入力したタグ名は `tags.json` に登録されます。
- `select` — `tags.json` に登録済みのタグからチェックボックスで選びます。`task edit` では1つ以上を選ぶ必要があります。

```bash
$ orbase task add
? create or select? create
? create and select tags 買い物, 家
```

メモのタグは `orbase note add` で作成したあと、エディタで front matter の `tags` を直接編集します。`orbase note add` が作る front matter の `tags` は空配列です。

```bash
$ orbase note add
# エディタが開くので tags に書き足す
```

## タグが現れる場所

タグは次の3か所で参照されます。**カレンダーはタグを絞り込み条件には使いません。**

| 出力先                                     | 対象データ    | タグの扱い                                                                |
| ------------------------------------------ | ------------- | ------------------------------------------------------------------------- |
| `orbase task list` / `priority` / `status` | タスク        | `tag` 配列を `,` 区切りで連結して `tag` 列に表示                          |
| `orbase calendar <year> <month>`           | タスク        | カレンダー下のタスク表の `tag` 列に表示（`dueDate` で月が一致したタスク） |
| `orbase search tags <tag>`                 | タスク + メモ | タグが一致したファイルのパスを表示                                        |

### カレンダーとタグの関係

`orbase calendar` が表示するタスク表は、**`dueDate` の年月が指定した年月と一致するタスク**に絞ったものです（`YYYY-MM` の文字列比較）。タグはその絞り込み条件には一切関与しません。

つまりカレンダーでの絞り込みは「タグ」ではなく「期限の月」です。タグが付いていても、期限が別の月ならその月のカレンダーには現れません。

逆に、あるタグが付いたタスクをまとめて確認したい場合は、カレンダーではなく `orbase task list` を使うか、`orbase search tags <tag>` でパスを取得してタスク JSON を開いてください。カレンダーには同じ月のタスクがすべて出るため、タグ別の絞り込みには使えません。

```bash
# 「買い物」タグが付いたタスクとメモのパスを取得する
orbase search tags 買い物
```

`orbase search tags` はタスク（`tag` 配列）とメモ（front matter の `tags`）を対象にします。日記にはタグの概念がないため、日記は `orbase search tags` の対象外です。

## タグを削除する

`orbase task tagdel` は `~/.orbase/tags.json` に登録されたタグ名をチェックボックスで表示します。削除したいタグを選んで submit すると、**選ばれなかったタグだけが残った配列**で `tags.json` を書き直します。

```bash
$ orbase task tagdel
? select delete tags
 ◉ 買い物
 ◯ 家
 ◯ 仕事
```

`tags.json` を手で編集しても結果は同じです。

```bash
nvim ~/.orbase/tags.json
```

どちらの方法でも、**既存のタスクの `tag` 配列やメモの front matter は書き換えられません。** タグを整理しきるには、対象ファイル側も合わせて編集してください。タグが不要になったら、付与済みのタスク JSON の `tag` 配列とメモの front matter の `tags` からも同じ名前を消します。

`task add` / `task edit` の `select` で `tags.json` に無いタグを選ぶことはできません。`tags.json` を手で編集して追加してから実行します。

### `note tagdel` はメモのタグを消しません

`orbase note tagdel` はタグではなく `~/.orbase/book.json`（作成した本棚名の一覧）を操作します。削除できるのは本棚名の登録だけで、`~/.orbase/note/` 以下のディレクトリやメモ本体、front matter の `tags` には触れません。メモのタグを消すにはメモの front matter を直接編集してください。

## 関連ページ

- [コマンド一覧](./commands) — `task` / `search` / `calendar` の引数と出力
- [データ形式](./data) — ファイルごとのスキーマ
- [FAQ](./faq) — タグに関するよくある質問

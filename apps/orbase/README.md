# orbase

[![Publish](https://github.com/nazozokc/orbase/actions/workflows/publish.yml/badge.svg)](https://github.com/nazozokc/orbase/actions/workflows/publish.yml)<br>
タスク・メモ・日記を CLI から管理する個人用ライフ管理ツール。

すべてのデータはローカルの `~/.orbase/` にプレーンテキスト形式で保存される。エディタで直接編集することもできる。

## 特徴

- **タスク管理** — タスクの追加・編集・削除・一覧表示（優先度・状態フィルタ付き）
- **メモ管理** — 本棚（book）ごとに Markdown 形式のメモを追加・編集・削除
- **日記** — 日付ごとの Markdown 日記を作成・編集・削除
- **タグ** — タスクのタグを作成・選択し、メモとまとめてタグ検索
- **検索** — キーワードでタスク・メモ・日記を横断検索
- **カレンダー** — 指定した年月のカレンダーと、その月の期限のタスク一覧をターミナルに表示
- **テンプレート** — よく使うファイルやディレクトリをカレントディレクトリへコピー
- **初期設定** — orbase の設定ファイルを作成
- **エディタ連携** — 編集は `$EDITOR` でファイルを直接開く
- **データは全てローカル** — `~/.orbase/` 配下に JSON / Markdown で保存

## インストール

### npm / Bun

Node.js 22 以上が必要。

```bash
npm install -g @nazozokc/orbase
# または
bun add -g @nazozokc/orbase
```

### Nix flake

```bash
# 一時的に実行
nix run github:nazozokc/orbase

# プロファイルへインストール
nix profile install github:nazozokc/orbase
```

## 使い方

```bash
orbase <command> [subcommand] [arguments]
```

主なコマンドは次のとおり。

| コマンド                             | 説明                                               |
| :----------------------------------- | :------------------------------------------------- |
| `orbase task`                        | タスクを管理                                       |
| `orbase note`                        | 本棚ごとのメモを管理                               |
| `orbase diary`                       | 日記を管理                                         |
| `orbase search`                      | タスク・メモ・日記を検索                           |
| `orbase calendar [<year>] [<month>]` | カレンダーと、その月の期限のタスク一覧を表示       |
| `orbase template <name>`             | 登録したテンプレートをカレントディレクトリへコピー |
| `orbase init`                        | 設定ファイルを作成                                 |

メモや日記の編集には環境変数 `$EDITOR` に設定されたエディタが使われる。未設定の場合は、利用するエディタを設定してから実行する。

```bash
export EDITOR=vim
orbase note add
```

### task — タスク管理

タスクは `~/.orbase/task/<uuid>.json` に保存される。

| コマンド               | 説明                                                                 |
| :--------------------- | :------------------------------------------------------------------- |
| `orbase task add`      | タスクを追加（見出し・本文・期限・優先度・タグ・状態を対話的に入力） |
| `orbase task edit`     | タスクを選択して項目を対話的に編集                                   |
| `orbase task del`      | タスクを複数選択して削除                                             |
| `orbase task list`     | タスク一覧をテーブル表示                                             |
| `orbase task priority` | 優先度でタスクをフィルタして表示                                     |
| `orbase task status`   | 状態でタスクをフィルタして表示                                       |
| `orbase task tagdel`   | タグ名の一覧から削除（**現在実装中・利用不可**）                     |

```bash
$ orbase task add
? task title 買い物
? task detail 牛乳と卵を買う
? goal date 2026-10-05
? Select priority Medium
? create or select? create
? create and select tags 買い物, 家
? Select status To Do

$ orbase task list
┌────────┬────────────────┬────────────┬───────────┬──────────┬────────┐
│ title  │ detail         │ dueDate    │ tag       │ priority │ status │
├────────┼────────────────┼────────────┼───────────┼──────────┼────────┤
│ 買い物 │ 牛乳と卵を買う │ 2026-10-05 │ 買い物,家 │ Medium   │  Todo  │
└────────┴────────────────┴────────────┴───────────┴──────────┴────────┘
```

`list` / `priority` / `status` は同じ列構成のテーブルを表示します。`status` 列は値によって色付きで出力されます。

タスクのタグは `tag` 列に `,` 区切りで表示されます。タグは `~/.orbase/tags.json` に登録され、メモとまとめて `orbase search tags <tag>` で検索できます。詳しくは [タグ](#タグ) を参照してください。

### note — メモ管理

メモは本棚ごとのディレクトリに、front matter（`date` / `tags`）付きの Markdown として `~/.orbase/note/<book>/*.md` に保存される。

| コマンド           | 説明                                           |
| :----------------- | :--------------------------------------------- |
| `orbase note add`  | ファイル名を入力してメモを作成しエディタで開く |
| `orbase note edit` | メモを選択してエディタで編集                   |
| `orbase note del`  | メモを複数選択して削除                         |

`note add` が作る front matter の `tags` は空配列です。タグを付ける場合は、開いたエディタで `tags` を直接編集する。

### diary — 日記

日記は `~/.orbase/diary/YYYY/MM/YYYY-MM-DD.md` に保存される。

| コマンド            | 説明                             |
| :------------------ | :------------------------------- |
| `orbase diary add`  | 今日の日記を作成しエディタで開く |
| `orbase diary edit` | 年・月・日を入力して日記を編集   |
| `orbase diary del`  | 年・月・日を入力して日記を削除   |

```bash
$ orbase diary add
# ~/.orbase/diary/2026/08/2026-08-20.md がエディタで開く
```

### search — 横断検索

キーワードまたはタグでタスク・メモ・日記を検索して表示する。

| コマンド                         | 説明                                       |
| :------------------------------- | :----------------------------------------- |
| `orbase search string <keyword>` | タスク・メモ・日記を横断してキーワード検索 |
| `orbase search tags <tag>`       | タグが一致するタスク・メモのパスを表示     |

```bash
$ orbase search string 牛乳
/home/user/.orbase/note/personal/買い物.md
# 牛乳と卵を買う

$ orbase search tags 買い物
/home/user/.orbase/task/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
/home/user/.orbase/note/personal/買い物.md
```

`string` はパスと内容を表示します。`tags` はパスのみを表示します。日記にはタグがないため、`tags` の対象はタスクとメモだけです。

### calendar — カレンダー表示

出力は2段構えです。上の表が日付のカレンダー、下の表がその月の期限を持つタスクの一覧です。

```bash
orbase calendar [<year>] [<month>]
```

#### 引数はどちらも省略可

| 実行例                   | 表示される年月    |
| :----------------------- | :---------------- |
| `orbase calendar`        | 今日の年月        |
| `orbase calendar 2027`   | 2027 年の**今月** |
| `orbase calendar 2026 9` | **2026 年 10 月** |

**`month` は 0 始まりです。** `0` が1月、`11` が12月に対応します。`orbase calendar 2026 9` が表示するのは9月ではなく10月です。`month` を省略すると1月ではなく現在の月が表示されます。1月を見たい場合は `orbase calendar 2026 0` のように明示する。

#### カレンダーの表

日曜始まりの7列で、その月の1日から月末日までを配置する。表示中の月が今月の場合、今日の日付は `[3]` のように角括弧で囲まれる。

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

#### タスクの表とタグの関係

カレンダーの下に表示されるタスク表は、**期限（`dueDate`）の年月が指定した年月と一致するタスク**に絞ったものです。絞り込み条件は `dueDate` のみで、**タグは条件になりません**。

`tag` 列はタスクの `tag` 配列を `,` で連結した文字列です。タグの絞り込みには `orbase task list` か `orbase search tags <tag>` を使ってください。

対象タスクがない場合もヘッダだけの表が表示される。カレンダーは `~/.orbase/task/` のタスクしか読み込まないため、メモと日記は表示されない。

### タグ

タグはタスクとメモに付けられ、`orbase search tags` でまとめて検索できる。保存先が異なる2系統の構造になっている。

| 対象         | 保存先                                                   | 形式             |
| :----------- | :------------------------------------------------------- | :--------------- |
| タグ名の一覧 | `~/.orbase/tags.json`                                    | 文字列の配列     |
| タスクの付与 | `~/.orbase/task/<uuid>.json` の `tag`                    | 文字列の配列     |
| メモの付与   | `~/.orbase/note/<book>/<name>.md` の front matter `tags` | 文字列または配列 |
| 日記の付与   | なし                                                     | —                |

```json
["買い物", "家", "仕事"]
```

#### タグを付ける

`orbase task add` と `orbase task edit` はどちらも `create or select?` と尋ねる。

- `create` — 自由入力。`,` 区切りで複数タグを指定でき、入力したタグ名は `~/.orbase/tags.json` に登録される。
- `select` — `tags.json` に登録済みのタグからチェックボックスで選ぶ。`edit` では1つ以上選ぶ必要がある。

```bash
$ orbase task add
? create or select? create
? create and select tags 買い物, 家

$ orbase task add
? create or select? select
? select tags ◉ 買い物  ◯ 家
```

メモのタグは `orbase note add` で開いたエディタの中で front matter の `tags` を直接書く。メモのタグは `tags.json` には登録されないため、`orbase search tags` はメモ側の front matter の値だけを照合する。

#### タグが現れる場所

| 出力先                                     | 対象データ    | タグの扱い                                       |
| :----------------------------------------- | :------------ | :----------------------------------------------- |
| `orbase task list` / `priority` / `status` | タスク        | `tag` 配列を `,` 区切りで連結して `tag` 列に表示 |
| `orbase calendar <year> <month>`           | タスク        | カレンダー下のタスク表の `tag` 列に表示          |
| `orbase search tags <tag>`                 | タスク + メモ | タグが一致したファイルのパスを表示               |

#### タグを削除する

`orbase task tagdel` は実装途中で、引数を受け取らず `TypeError: tagString.filter is not a function` で終了する。不要なタグは `~/.orbase/tags.json` を直接編集して削除する。

`tags.json` を編集しても、既存のタスクの `tag` 配列やメモの front matter は書き換わらない。対象ファイル側も併せて編集すること。

### template — テンプレートの再利用

よく使うファイルやディレクトリをあらかじめ `~/.orbase/template/` にテンプレートとして登録しておくと、名前を指定してカレントディレクトリへコピーできる。同じ構成のファイルを複数のプロジェクトで使い回したい場合に利用する。

```bash
orbase template project
```

テンプレート名は `~/.orbase/template/` 配下のファイルまたはディレクトリ名です。テンプレートはあらかじめ手動で配置してください。

### init — 初期設定

`~/.config/orbase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は、最初に実行してください。

```bash
orbase init
```

### ヘルプ / バージョン

```bash
orbase --help
orbase --version
```

## データの保存場所

すべてのデータは `~/.orbase/` 配下に保存される。

設定ファイルは `~/.config/orbase/config.json` に保存される。

```
~/.orbase/
├── task/            # タスク (JSON)
│   └── <uuid>.json
├── note/            # メモ (Markdown + front matter)
│   └── <book>/
│       └── <name>.md
├── diary/           # 日記 (Markdown)
│   └── YYYY/
│       └── MM/
│           └── YYYY-MM-DD.md
├── template/        # テンプレート（任意）
├── tags.json        # タグ名の一覧 (JSON 配列)
└── book.json        # 最後に作成した本棚名 (JSON 文字列)
```

タスクの JSON は以下の形式。

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

`priority` は `Low` / `Medium` / `High` / `Extra-high`、`status` は `Todo` / `Pending` / `In-Progress` / `Done` のいずれか。`id` は作成時に付与される UUID です。

メモは本棚ディレクトリ内に保存され、gray-matter 形式の front matter を持つ。`tags` は単一の文字列でも配列でも構いません。

```markdown
---
date: "2026-8-20"
tags:
  - 買い物
---

# 本文
```

`book.json` には `orbase note add` で最後に作成した本棚名が1つだけ入る。本棚の一覧は `~/.orbase/note/` 以下のディレクトリが正です。

## 開発

Nix flake の devShell を使う。`direnv` を導入していればリポジトリに入るだけで環境が整う。

```bash
# direnv を有効化（初回のみ）
direnv allow

# 依存関係のインストール
bun install

# 依存を変更したら bun.nix を再生成（Nix ビルド用）
# bun.nix はリポジトリルートに置く（bun2nix は workspace パッケージを bun.nix からの相対パスで参照する）
cd .. && bun2nix -l bun.lock -o bun.nix

# ビルド (apps/orbase/dist/index.mjs を生成)
bun run --cwd apps/orbase build

# ローカルで実行
bun run apps/orbase/src/index.ts --help

# フォーマット / チェック
nix fmt
nix flake check
```

`bun2nix` は devShell に同梱されている。`bun.nix` を再生成したら `nix build` で動作確認すること。

テストは `bun test` で実行する。

パッケージ単体で開発する場合は `apps/orbase` で次のように実行できる。

```bash
cd apps/orbase
bun run src/index.ts --help
```

## License

MIT

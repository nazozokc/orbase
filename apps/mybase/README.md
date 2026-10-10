# mybase

[![Publish](https://github.com/nazozokc/mybase/actions/workflows/publish.yml/badge.svg)](https://github.com/nazozokc/mybase/actions/workflows/publish.yml)<br>
タスク・メモ・日記を CLI から管理する個人用ライフ管理ツール。

すべてのデータはローカルの `~/.mybase/` にプレーンテキスト形式で保存される。エディタで直接編集することもできる。

## 特徴

- **タスク管理** — タスクの追加・編集・削除・一覧表示（優先度・状態フィルタ付き）
- **メモ管理** — 本棚（book）ごとに Markdown 形式のメモを追加・編集・削除
- **日記** — 日付ごとの Markdown 日記を作成・編集・削除
- **タグ** — タスクのタグを作成・選択・削除し、メモとまとめてタグ検索
- **検索** — キーワードでタスク・メモを横断検索、タグでタスク・メモを検索
- **カレンダー** — 指定した年月のカレンダーと、その月の期限のタスク一覧をターミナルに表示
- **テンプレート** — よく使うファイルやディレクトリをカレントディレクトリへコピー
- **初期設定** — mybase-cli の設定ファイルを作成
- **エディタ連携** — 編集は `$EDITOR` でファイルを直接開く
- **データは全てローカル** — `~/.mybase/` 配下に JSON / Markdown で保存

## インストール

### npm / Bun

Node.js 22 以上が必要。

```bash
npm install -g mybase-cli
# または
bun add -g mybase-cli
```

### Nix flake

```bash
# 一時的に実行
nix run github:nazozokc/mybase

# プロファイルへインストール
nix profile install github:nazozokc/mybase
```

## 使い方

```bash
mybase-cli <command> [subcommand] [arguments]
```

主なコマンドは次のとおり。

| コマンド                                    | 説明                                               |
| :------------------------------------------ | :------------------------------------------------- |
| `mybase-cli task`                           | タスクを管理                                       |
| `mybase-cli note`                           | 本棚ごとのメモを管理                               |
| `mybase-cli diary`                          | 日記を管理                                         |
| `mybase-cli search`                         | タスク・メモを検索                                 |
| `mybase-cli calendar [<year>] [<month>]`    | カレンダーと、その月の期限のタスク一覧を表示       |
| `mybase-cli template --templateName <name>` | 登録したテンプレートをカレントディレクトリへコピー |
| `mybase-cli init`                           | 設定ファイルを作成                                 |

メモや日記の編集には環境変数 `$EDITOR` に設定されたエディタが使われる。未設定の場合は、利用するエディタを設定してから実行する。

```bash
export EDITOR=vim
mybase-cli note add
```

### task — タスク管理

タスクは `~/.mybase/task/<uuid>.json` に保存される。

| コマンド                   | 説明                                                                  |
| :------------------------- | :-------------------------------------------------------------------- |
| `mybase-cli task add`      | タスクを追加（見出し・本文・期限・優先度・タグ・状態を対話的に入力）  |
| `mybase-cli task edit`     | タスクを選択し、編集する項目を選びながら対話的に更新（`done` で保存） |
| `mybase-cli task del`      | タスクを複数選択して削除                                              |
| `mybase-cli task list`     | タスク一覧をテーブル表示                                              |
| `mybase-cli task priority` | 優先度でタスクをフィルタして表示                                      |
| `mybase-cli task status`   | 状態でタスクをフィルタして表示                                        |
| `mybase-cli task tagdel`   | タグ名の一覧からチェックボックスで選んだタグを `tags.json` から削除   |

```bash
$ mybase-cli task add
? task title 買い物
? task detail 牛乳と卵を買う
? goal date 2026-10-05
? Select priority Medium
? create or select? create
? create and select tags 買い物, 家
? Select status To Do

$ mybase-cli task list
┌────────┬────────────────┬────────────┬───────────┬──────────┬────────┐
│ title  │ detail         │ dueDate    │ tag       │ priority │ status │
├────────┼────────────────┼────────────┼───────────┼──────────┼────────┤
│ 買い物 │ 牛乳と卵を買う │ 2026-10-05 │ 買い物,家 │ Medium   │  Todo  │
└────────┴────────────────┴────────────┴───────────┴──────────┴────────┘
```

`list` / `priority` / `status` は同じ列構成のテーブルを表示します。`status` 列は値によって色付きで出力されます。

`edit` はタスクを選ぶと編集メニューを繰り返し表示する。項目を選んで値を更新してもその場では保存されず、メニューに戻る。`done` を選んだ時点でファイルに書き込んで終了する。途中で中断すると編集内容は保存されない。

```bash
$ mybase-cli task edit
? Select task to edit 買い物
? what edit it? dueDate
? change dueDate? 2026-10-10
? what edit it? done
```

タスクのタグは `tag` 列に `,` 区切りで表示されます。タグは `~/.mybase/tags.json` に登録され、メモとまとめて `mybase-cli search tags <tag>` で検索できます。詳しくは [タグ](#タグ) を参照してください。

### note — メモ管理

メモは本棚ごとのディレクトリに、front matter（`date` / `tags`）付きの Markdown として `~/.mybase/note/<book>/*.md` に保存される。

| コマンド                 | 説明                                                         |
| :----------------------- | :----------------------------------------------------------- |
| `mybase-cli note add`    | ファイル名を入力してメモを作成しエディタで開く               |
| `mybase-cli note edit`   | メモを選択してエディタで編集                                 |
| `mybase-cli note del`    | メモを複数選択して削除                                       |
| `mybase-cli note tagdel` | `book.json` に登録された本棚名をチェックボックスで選んで削除 |

`note add` が作る front matter の `tags` は空配列です。タグを付ける場合は、開いたエディタで `tags` を直接編集する。

`note tagdel` が削除するのは `~/.mybase/book.json` に登録された本棚名だけです。`~/.mybase/note/` 以下のディレクトリやメモ本体、front matter の `tags` は変わりません。

### diary — 日記

日記は `~/.mybase/diary/YYYY/MM/YYYY-MM-DD.md` に保存される。

| コマンド                | 説明                             |
| :---------------------- | :------------------------------- |
| `mybase-cli diary add`  | 今日の日記を作成しエディタで開く |
| `mybase-cli diary edit` | 年・月・日を入力して日記を編集   |
| `mybase-cli diary del`  | 年・月・日を入力して日記を削除   |

`edit` / `del` の月・日はファイル名と同じゼロ埋め 2 桁（`08`、`01`）で入力する。`8` のように桁が足りないと `No such file or directory` になる。

```bash
$ mybase-cli diary add
# ~/.mybase/diary/2026/08/2026-08-20.md がエディタで開く
```

### search — 横断検索

キーワードまたはタグでタスク・メモを検索して表示する。

| コマンド                             | 説明                                       |
| :----------------------------------- | :----------------------------------------- |
| `mybase-cli search string <keyword>` | タスク・メモの内容を横断してキーワード検索 |
| `mybase-cli search tags <tag>`       | タグが一致するタスク・メモのパスを表示     |

```bash
$ mybase-cli search string 牛乳を買う
/home/user/.mybase/note/personal/買い物.md
---
date: "2026-8-20"
tags:
  - 買い物
---

# 買い物メモ

牛乳を買う

$ mybase-cli search tags 買い物
/home/user/.mybase/task/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
/home/user/.mybase/note/personal/買い物.md
```

`string` はパスと内容を表示します。タスクがヒットした場合は JSON の全文、メモがヒットした場合はファイルの全文が出力されます。
`tags` はパスのみを表示します。日記にはタグがないため、`tags` の対象はタスクとメモだけです。

**日記は `string` の検索結果に現れません。** 現在のバージョンでは `~/.mybase/diary/YYYY/MM/` の月ディレクトリをファイルとして読もうとしてエラーになるため、日記の本文はキーワード検索にヒットしません。日記を探すには `~/.mybase/diary/` 以下を直接開いてください。

### calendar — カレンダー表示

出力は2段構えです。上の表が日付のカレンダー、下の表がその月の期限を持つタスクの一覧です。

```bash
mybase-cli calendar [<year>] [<month>]
```

#### 引数はどちらも省略可

| 実行例                       | 表示される年月    |
| :--------------------------- | :---------------- |
| `mybase-cli calendar`        | 今日の年月        |
| `mybase-cli calendar 2027`   | 2027 年の**今月** |
| `mybase-cli calendar 2026 9` | **2026 年 10 月** |

**`month` は 0 始まりです。** `0` が1月、`11` が12月に対応します。`mybase-cli calendar 2026 9` が表示するのは9月ではなく10月です。`month` を省略すると1月ではなく現在の月が表示されます。1月を見たい場合は `mybase-cli calendar 2026 0` のように明示する。

#### カレンダーの表

日曜始まりの7列で、その月の1日から月末日までを配置する。表示中の月が今月の場合、今日の日付は `[3]` のように角括弧で囲まれる。

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

#### タスクの表とタグの関係

カレンダーの下に表示されるタスク表は、**期限（`dueDate`）の年月が指定した年月と一致するタスク**に絞ったものです。絞り込み条件は `dueDate` のみで、**タグは条件になりません**。

`tag` 列はタスクの `tag` 配列を `,` で連結した文字列です。タグの絞り込みには `mybase-cli task list` か `mybase-cli search tags <tag>` を使ってください。

対象タスクがない場合もヘッダだけの表が表示される。カレンダーは `~/.mybase/task/` のタスクしか読み込まないため、メモと日記は表示されない。

### タグ

タグはタスクとメモに付けられ、`mybase-cli search tags` でまとめて検索できる。保存先が異なる2系統の構造になっている。

| 対象         | 保存先                                                   | 形式             |
| :----------- | :------------------------------------------------------- | :--------------- |
| タグ名の一覧 | `~/.mybase/tags.json`                                    | 文字列の配列     |
| タスクの付与 | `~/.mybase/task/<uuid>.json` の `tag`                    | 文字列の配列     |
| メモの付与   | `~/.mybase/note/<book>/<name>.md` の front matter `tags` | 文字列または配列 |
| 日記の付与   | なし                                                     | —                |

```json
["買い物", "家", "仕事"]
```

#### タグを付ける

`mybase-cli task add` は最初から、`mybase-cli task edit` は「what edit it?」メニューで `tag` を選んだときに、どちらも `create or select?` と尋ねる。

- `create` — 自由入力。`,` 区切りで複数タグを指定でき、入力したタグ名は `~/.mybase/tags.json` に登録される。
- `select` — `tags.json` に登録済みのタグからチェックボックスで選ぶ。`edit` では1つ以上選ぶ必要がある。

```bash
$ mybase-cli task add
? create or select? create
? create and select tags 買い物, 家

$ mybase-cli task add
? create or select? select
? select tags ◉ 買い物  ◯ 家
```

メモのタグは `mybase-cli note add` で開いたエディタの中で front matter の `tags` を直接書く。メモのタグは `tags.json` には登録されないため、`mybase-cli search tags` はメモ側の front matter の値だけを照合する。

#### タグが現れる場所

| 出力先                                         | 対象データ    | タグの扱い                                       |
| :--------------------------------------------- | :------------ | :----------------------------------------------- |
| `mybase-cli task list` / `priority` / `status` | タスク        | `tag` 配列を `,` 区切りで連結して `tag` 列に表示 |
| `mybase-cli calendar <year> <month>`           | タスク        | カレンダー下のタスク表の `tag` 列に表示          |
| `mybase-cli search tags <tag>`                 | タスク + メモ | タグが一致したファイルのパスを表示               |

#### タグを削除する

`mybase-cli task tagdel` は `~/.mybase/tags.json` に登録されたタグ名をチェックボックスで表示する。削除したいタグを選んで submit すると、選ばれなかったタグだけが残った配列で `tags.json` を書き直す。

```bash
$ mybase-cli task tagdel
? select delete tags
 ◉ 買い物
 ◯ 家
 ◯ 仕事
```

削除できるのはタグ名の候補一覧だけです。既存のタスクの `tag` 配列やメモの front matter は書き換わらないため、付与済みのタグを消すには対象ファイル側も併せて編集する。

```bash
# tags.json を手で直す場合
nvim ~/.mybase/tags.json
```

### template — テンプレートの再利用

よく使うファイルやディレクトリをあらかじめ `~/.mybase/template/` にテンプレートとして登録しておくと、名前を指定してカレントディレクトリへコピーできる。同じ構成のファイルを複数のプロジェクトで使い回したい場合に利用する。

```bash
mybase-cli template --templateName project
```

テンプレート名は `~/.mybase/template/` 配下のファイルまたはディレクトリ名で、`--templateName` に指定します。このオプションは必須で、位置引数としては渡せません。テンプレートはあらかじめ手動で配置してください。

### init — 初期設定

`~/.config/mybase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は、最初に実行してください。

```bash
mybase-cli init
```

### ヘルプ / バージョン

```bash
mybase-cli --help
mybase-cli --version
```

## データの保存場所

すべてのデータは `~/.mybase/` 配下に保存される。

設定ファイルは `~/.config/mybase/config.json` に保存される。

```
~/.mybase/
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
└── book.json        # 作成した本棚名の一覧 (JSON 配列)
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

`book.json` には `mybase-cli note add` で新規作成した本棚名が重複なしで積まれていく JSON 配列が入る。同じ本棚を2回作成しても増えません。本棚の一覧の正は `~/.mybase/note/` 以下のディレクトリで、`book.json` は作成した本棚名の記録にあたる。`mybase-cli note tagdel` はこの一覧から項目を削除する。

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

# ビルド (apps/mybase/dist/index.mjs を生成)
bun run --cwd apps/mybase build

# ローカルで実行
bun run apps/mybase/src/index.ts --help

# フォーマット / チェック
nix fmt
nix flake check
```

`bun2nix` は devShell に同梱されている。`bun.nix` を再生成したら `nix build` で動作確認すること。

テストは `bun test` で実行する。

パッケージ単体で開発する場合は `apps/mybase` で次のように実行できる。

```bash
cd apps/mybase
bun run src/index.ts --help
```

## License

MIT

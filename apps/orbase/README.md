# orbase

タスク・メモ・日記を CLI から管理する個人用ライフ管理ツール。

すべてのデータはローカルの `~/.orbase/` にプレーンテキスト形式で保存される。エディタで直接編集することもできる。

## 特徴

- **タスク管理** — タスクの追加・編集・削除・一覧表示（優先度フィルタ付き）
- **メモ管理** — Markdown 形式のメモを追加・編集・削除
- **日記** — 日付ごとの Markdown 日記を作成・編集・削除
- **タグ** — タスク・メモにタグを付け、タグで横断検索
- **検索** — キーワード / タグでタスク・メモ・日記を横断検索
- **エディタ連携** — 編集は `$EDITOR` でファイルを直接開く
- **データは全てローカル** — `~/.orbase/` 配下に JSON / Markdown で保存

## インストール

### npm / bun

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
orbase <command> <subcommand>
```

### task — タスク管理

タスクは `~/.orbase/task/*.json` に保存される。

| コマンド                | 説明                                                       |
| :---------------------- | :--------------------------------------------------------- |
| `orbase task add`       | タスクを追加（見出し・本文・期限・優先度・タグを対話的に入力） |
| `orbase task edit`      | タスクを選択してエディタで編集                             |
| `orbase task del`       | タスクを選択して削除                                       |
| `orbase task list`      | タスク一覧をテーブル表示                                   |
| `orbase task priority`  | 優先度でタスクをフィルタして表示                           |

```bash
$ orbase task add
? task title 買い物
? task text 牛乳と卵を買う
? goal date 2026-08-21
? Select priority Medium
? create or select? create
? create and select tags 買い物

$ orbase task list
┌───────┬──────────────────┬────────────┬────────┬──────────┬──────┐
│ title │ text             │ dueDate    │ tag    │ priority │ done │
├───────┼──────────────────┼────────────┼────────┼──────────┼──────┤
│ 買い物 │ 牛乳と卵を買う   │ 2026-08-21 │ 買い物 │ medium   │ ✓    │
└───────┴──────────────────┴────────────┴────────┴──────────┴──────┘
```

タグは作成済みのタグから選ぶこともできる。

### note — メモ管理

メモは front matter（`name` / `date` / `tags`）付きの Markdown として `~/.orbase/note/*.md` に保存される。

| コマンド           | 説明                                           |
| :----------------- | :--------------------------------------------- |
| `orbase note add`  | ファイル名を入力してメモを作成しエディタで開く |
| `orbase note edit` | メモを選択してエディタで編集                   |
| `orbase note del`  | メモを複数選択して削除                         |

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
/home/user/.orbase/note/買い物.md
# 牛乳と卵を買う

$ orbase search tags 買い物
/home/user/.orbase/task/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
/home/user/.orbase/note/買い物.md
```

### ヘルプ / バージョン

```bash
orbase --help
orbase --version
```

## データの保存場所

すべてのデータは `~/.orbase/` 配下に保存される。

```
~/.orbase/
├── task/            # タスク (JSON)
│   └── <uuid>.json
├── note/            # メモ (Markdown + front matter)
│   └── <name>.md
├── diary/           # 日記 (Markdown)
│   └── YYYY/
│       └── MM/
│           └── YYYY-MM-DD.md
└── tags.json        # タグ一覧 (JSON)
```

タスクの JSON は以下の形式。

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "title": "買い物",
  "text": "牛乳と卵を買う",
  "dueDate": "2026-08-21",
  "done": false,
  "priority": "medium",
  "tag": ["買い物"],
  "createdAt": "2026-08-20T04:00:00.000Z"
}
```

メモは gray-matter 形式の front matter を持つ。

```markdown
---
name: ""
date: "2026-8-20"
tags:
  - 買い物
---

# 本文
```

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

# ビルド (dist/index.mjs を生成)
bun run build

# ローカルで実行
bun run src/index.ts

# フォーマット / チェック
nix fmt
nix flake check
```

`bun2nix` は devShell に同梱されている。`bun.nix` を再生成したら `nix build` で動作確認すること。

テストは `bun test`。テストファイルは `test/` 以下に置く。

## License

MIT

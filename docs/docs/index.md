# orbase

タスク・メモ・日記をローカルで管理する CLI ツールです。

すべてのデータは `~/.orbase/` に JSON または Markdown として保存されます。

## はじめに

```bash
nix run github:nazozokc/orbase
```

または npm / Bun からインストールできます。

```bash
npm install -g @nazozokc/orbase
# または
bun add -g @nazozokc/orbase
```

インストール後は `orbase --help` で利用できるコマンドを確認できます。

## 主な機能

- タスクの追加・編集・削除・一覧表示
- Markdown メモの管理
- 日付ごとの日記の管理
- タスク・メモ・日記の横断検索
- テンプレートの登録と再利用

詳しい使い方は [コマンド一覧](./commands) を参照してください。

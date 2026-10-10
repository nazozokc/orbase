---
title: インストール
description: mybase-cli のインストール方法。
---

# インストール

## npm / Bun

Node.js 22 以上を用意して、グローバルにインストールします。

```bash
npm install -g mybase-cli
# または
bun add -g mybase-cli
```

インストール先の実行ファイルが `PATH` に含まれていることを確認してください。更新するときは同じコマンドをもう一度実行します。

## Nix

インストールせず一時的に実行するには、Nix flake を使います。

```bash
nix run github:nazozokc/mybase
```

プロファイルへインストールする場合は次のコマンドを実行します。

```bash
nix profile install github:nazozokc/mybase
```

## 動作確認

```bash
mybase-cli --help
mybase-cli --version
```

メモや日記を編集する前に、使用するエディタを設定してください。

```bash
export EDITOR=vim
```

## 初期設定

`~/.config/mybase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は実行してください。

```bash
mybase-cli init
```

毎回設定するのが面倒な場合は、使用しているシェルの設定ファイル（例: `~/.bashrc`、`~/.zshrc`）に追加します。`nvim` や `code --wait` など、終了するまで待機するエディタも利用できます。

## アンインストール

```bash
npm uninstall -g mybase-cli
# Bun でインストールした場合
bun remove -g mybase-cli
```

アンインストールしても `~/.mybase/` のデータは削除されません。

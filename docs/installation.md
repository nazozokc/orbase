---
title: インストール
description: orbase のインストール方法。
---

# インストール

## npm / Bun

Node.js 22 以上を用意して、グローバルにインストールします。

```bash
npm install -g @nazozokc/orbase
# または
bun add -g @nazozokc/orbase
```

インストール先の実行ファイルが `PATH` に含まれていることを確認してください。更新するときは同じコマンドをもう一度実行します。

## Nix

インストールせず一時的に実行するには、Nix flake を使います。

```bash
nix run github:nazozokc/orbase
```

プロファイルへインストールする場合は次のコマンドを実行します。

```bash
nix profile install github:nazozokc/orbase
```

## 動作確認

```bash
orbase --help
orbase --version
```

メモや日記を編集する前に、使用するエディタを設定してください。

```bash
export EDITOR=vim
```

## 初期設定

`~/.config/orbase/config.json` に既定の設定ファイルを作成します。データ保存先を変更する場合は実行してください。

```bash
orbase init
```

毎回設定するのが面倒な場合は、使用しているシェルの設定ファイル（例: `~/.bashrc`、`~/.zshrc`）に追加します。`nvim` や `code --wait` など、終了するまで待機するエディタも利用できます。

## アンインストール

```bash
npm uninstall -g @nazozokc/orbase
# Bun でインストールした場合
bun remove -g @nazozokc/orbase
```

アンインストールしても `~/.orbase/` のデータは削除されません。

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

{
  description = "orbase — Personal CLI tool";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    # bun.lock → bun.nix を生成し、依存を Nix store からオフライン取得する
    bun2nix.url = "github:nix-community/bun2nix";
  };

  nixConfig = {
    extra-substituters = [ "https://nix-community.cachix.org" ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      treefmt-nix,
      bun2nix,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      imports = [
        treefmt-nix.flakeModule
      ];

      perSystem =
        {
          system,
          self',
          config,
          ...
        }:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          # ルートの bun.lock / package.json と apps/orbase だけをソースに含める。
          # docs は vitepress の依存が bun.lock に含まれず sandbox 内の
          # オフライン install を壊すため除外する。
          src = pkgs.lib.cleanSourceWith {
            src = ./.;
            filter =
              path: type:
              let
                rel = pkgs.lib.removePrefix (toString ./. + "/") (toString path);
              in
              builtins.match "package.json|bun.lock|apps/orbase/tsconfig.json" rel != null
              || (
                builtins.match "apps(/orbase(/.*)?)?" rel != null
                && builtins.match ".*/node_modules(/.*)?" rel == null
              );
          };
          # package.json を唯一のバージョン情報源にする
          version = (pkgs.lib.importJSON ./apps/orbase/package.json).version;
          bun2nix' = bun2nix.packages.${system}.bun2nix;
          # bun.nix から作った bun 互換キャッシュ（sandbox 内のオフライン install 用）
          # bun.nix はルートの bun.lock から生成する（bun2nix は workspace パッケージを
          # bun.nix からの相対パスで参照するため、bun.nix はリポジトリルートに置く）
          bunDeps = bun2nix'.fetchBunDeps { bunNix = ./bun.nix; };
        in
        {
          # -----------------------------------------------------------------
          # packages
          # -----------------------------------------------------------------
          packages.default = pkgs.stdenv.mkDerivation {
            pname = "orbase";
            inherit src version bunDeps;

            nativeBuildInputs = [
              pkgs.bun
              pkgs.makeWrapper
              bun2nix'.hook
            ];

            # bun2nix の既定ビルド（bun build --compile）は使わない。
            # bun build --compile は bun 1.3.13 で segfault するため
            # bundle → makeWrapper 方式を採用
            dontUseBunBuild = true;
            dontUseBunCheck = true;

            # 依存をすべて bunDeps キャッシュから取得する。
            # --offline: .npm マニフェストを要求する推移的依存解決を
            #   registry にフォールバックさせない（sandbox はネットワーク不可）
            # --frozen-lockfile: ロックファイルの書き換えを禁止
            #   （src は read-only なので書き込みは EROFS になる）
            # --linker=isolated: bun2nix の既定値（上書き時に失われるため明示）
            # NOTE: bunInstallFlagsArray は Nix のリストだと bash 配列として
            # 復元されず 1 要素扱いになるため、スペース区切りの文字列で渡す
            # （concatTo がスペース分割して配列に追加する）
            bunInstallFlags = "--linker=isolated --offline --frozen-lockfile";

            # bun2nix issue #73: fetchBunDeps のキャッシュをコピーすると
            # read-only になり、bun がリンクを作れず ENOENT で失敗する。
            # コピー後に書き込み権限を付与する。
            postBunSetInstallCacheDirPhase = ''
              chmod -R u+rwx "$BUN_INSTALL_CACHE_DIR"
            '';

            buildPhase = ''
              bun build ./apps/orbase/src/index.ts --outfile ./orbase.js --target bun
            '';

            installPhase = ''
              install -Dm755 orbase.js $out/libexec/orbase/orbase.js
              makeWrapper ${pkgs.bun}/bin/bun $out/bin/orbase \
                --add-flags "$out/libexec/orbase/orbase.js"
            '';

            meta = {
              description = "Personal CLI tool for managing life";
              homepage = "https://github.com/nazozokc/orbase";
              license = pkgs.lib.licenses.mit;
              mainProgram = "orbase";
              platforms = pkgs.lib.platforms.all;
            };
          };

          # -----------------------------------------------------------------
          # apps
          # -----------------------------------------------------------------
          apps.default = {
            type = "app";
            program = "${pkgs.lib.getExe self'.packages.default}";
          };

          # bun.lock を更新した後に、Nix ビルド用の依存定義も更新する。
          # リポジトリのルートで実行することを前提にしている。
          apps.update = {
            type = "app";
            program = pkgs.writeShellScript "orbase-update-bun-nix" ''
              set -euo pipefail
              ${pkgs.lib.getExe bun2nix'} -l bun.lock -o bun.nix
            '';
          };

          # -----------------------------------------------------------------
          # checks
          # -----------------------------------------------------------------
          # nix flake check でパッケージのビルドも検証する
          checks.build = self'.packages.default;

          checks.tests = pkgs.stdenv.mkDerivation {
            pname = "orbase-tests";
            inherit src version bunDeps;

            nativeBuildInputs = [
              pkgs.bun
              bun2nix'.hook
            ];

            dontUseBunBuild = true;
            doCheck = true;

            # パッケージビルドと同じくオフライン install と
            # キャッシュ権限の修正を行う
            # NOTE: bunInstallFlagsArray は Nix のリストだと bash 配列として
            # 復元されず 1 要素扱いになるため、スペース区切りの文字列で渡す
            # （concatTo がスペース分割して配列に追加する）
            bunInstallFlags = "--linker=isolated --offline --frozen-lockfile";

            postBunSetInstallCacheDirPhase = ''
              chmod -R u+rwx "$BUN_INSTALL_CACHE_DIR"
            '';

            # テストファイルが無いと bun test は exit 1 を返すため、
            # 存在する場合のみ実行する（現在 test/ は空）
            checkPhase = ''
              if find . -type f \( -name "*.test.ts" -o -name "*.spec.ts" \) | grep -q .; then
                bun test
              fi
            '';

            installPhase = ''
              mkdir -p $out
            '';
          };

          checks.typecheck = pkgs.stdenv.mkDerivation {
            pname = "orbase-typecheck";
            inherit src version bunDeps;

            nativeBuildInputs = [
              pkgs.bun
              pkgs.typescript
              bun2nix'.hook
            ];

            dontUseBunBuild = true;
            dontUseBunCheck = true;
            doCheck = true;
            bunInstallFlags = "--linker=isolated --offline --frozen-lockfile";

            postBunSetInstallCacheDirPhase = ''
              chmod -R u+rwx "$BUN_INSTALL_CACHE_DIR"
            '';

            checkPhase = ''
              tsc --project apps/orbase/tsconfig.json --noEmit
            '';

            installPhase = ''
              mkdir -p $out
            '';
          };

          # -----------------------------------------------------------------
          # devShell
          # -----------------------------------------------------------------
          # mkShellNoCC: コンパイラ不要の shell なので stdenvNoCC を使い、
          # gcc/binutils 等のダウンロードを避けて direnv の読み込みを高速化する
          devShells.default = pkgs.mkShellNoCC {
            name = "orbase";
            packages = [
              # ランタイム & パッケージマネージャ
              pkgs.bun
              # bun.lock から bun.nix を再生成する CLI
              bun2nix'
              # プロジェクト設定入り treefmt (nix fmt と同じ挙動)
              config.formatter
              # 型チェック & エディタの TS LSP バックエンド (peerDependencies)
              # bun install 前でもオフラインで tsc を使えるように Nix 側にも用意
              pkgs.typescript
              # VCS と GitHub 操作 (PR / release)
              pkgs.git
              pkgs.gh
              # JSON の整形・検索 (bun.lock や json/jsonl データの確認用)
              pkgs.jq
            ];
            shellHook = ''
              echo "[devShell:orbase] bun $(bun --version), tsc $(tsc --version), treefmt $(treefmt --version)"
            '';
          };

          # -----------------------------------------------------------------
          # formatter
          # -----------------------------------------------------------------
          treefmt.config = {
            projectRootFile = "flake.nix";
            programs.nixfmt.enable = true;
            programs.prettier.enable = true;
            settings.global.excludes = [
              # bun.lock は trailing comma を含む JSON なので prettier 不可
              "apps/orbase/bun.lock"
              # bun.nix は bun2nix の生成物なので nixfmt しない
              "bun.nix"
            ];
          };
        };
    };
}

---
name: commit-message
description: Draft clear, repository-aligned Git commit messages for orbase changes from the actual diff and validation results.
---

# Commit Message

Use this skill when proposing or writing a commit message for orbase. Inspect the staged diff (or requested change if nothing is staged), separate unrelated changes, and never infer purpose from filenames alone.

Prefer a Conventional Commit subject: `<type>(<scope>): <imperative summary>`. Use concise English unless the user or local convention calls for Japanese. Useful types are `feat`, `fix`, `refactor`, `docs`, `test`, `build`, and `chore`; scopes may be `task`, `note`, `diary`, `search`, `template`, `cli`, or `nix`. Keep the subject specific, without a period, and describe the outcome.

The recent history has terse English subjects, so do not force a body for trivial changes. For behavior changes or non-obvious maintenance, explain motivation, constraints, data compatibility, and validation. Choose `fix` for corrections, `feat` for new capability, and `refactor` only when behavior remains unchanged. Mention related `bun.lock`/`bun.nix` changes explicitly. If the diff mixes concerns, recommend splitting it. Do not commit unless explicitly asked.

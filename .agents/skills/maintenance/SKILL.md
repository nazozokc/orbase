---
name: maintenance
description: Maintain and safely evolve the orbase Bun/TypeScript CLI while preserving its data formats, structure, and local development workflow.
---

# Orbase Maintenance

Use this skill for bug fixes, refactors, dependency updates, small improvements, and compatibility work. Start by reading `CLAUDE.md`, `CONTRIBUTING.md`, the applicable `apps/orbase/CLAUDE.md`, and relevant docs/source.

## Preserve the project contract

- Keep implementation in TypeScript under `apps/orbase/src`; register new CLI commands in `src/index.ts` and keep modules focused.
- Prefer Bun APIs and commands (`bun`, `bun test`, `bun run build`); avoid unnecessary Node ecosystem tools and dependencies.
- Keep code simple, readable, and consistent with nearby patterns. Avoid speculative abstractions.
- Treat `~/.orbase` as a compatibility boundary: task JSON, note front matter Markdown, diary paths, and tags JSON must remain readable. Consider missing or malformed local data when changing readers/writers.
- Update relevant docs for data or CLI changes, and keep Nix/Bun metadata coherent; dependency changes require checking `bun.lock` and root `bun.nix`.

## Safe workflow

Inspect the smallest relevant surface, make a focused change, and preserve unrelated worktree edits. Validate the CLI boundary when practical, plus relevant build/type checks and `bun test` when test files exist. Report skipped checks and why. Review the final diff for accidental format changes, broken command registration, data loss, undocumented behavior, and dependency drift.

Do not rewrite user data, migrate files, push, commit, or make other external mutations unless explicitly requested. For destructive data behavior, provide a confirmation point and a recoverable or dry-run path where feasible.

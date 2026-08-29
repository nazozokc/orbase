---
name: pr-creation
description: Create or update pull requests for the orbase repository, including evidence-based summaries, validation notes, and review-ready metadata.
---

# Pull Request Creation

Use this skill when the user asks to create, prepare, or update a pull request for orbase. The repository is a Bun/TypeScript monorepo with the application in `apps/orbase`; keep PR scope aligned with the user's request.

## Repository-specific checks

- Read `CLAUDE.md`, `CONTRIBUTING.md`, and any nearer guidance file before preparing the PR.
- Inspect `git status`, the current branch, its merge base with `main`, and the complete diff. Preserve unrelated user changes.
- Prefer `bun run build`, `bun test` when tests exist, and `tsc --project apps/orbase/tsconfig.json --noEmit` for TypeScript changes.
- If dependencies changed, check `bun.lock` and whether `bun.nix` needs regeneration. Include relevant Nix validation when Nix files changed.

## PR content

Write a concise title describing the user-visible outcome. The body should state what changed and why, important implementation or data-format behavior, validation commands and results, and known limitations or follow-ups. Do not claim tests or behavior that were not verified.

## Mutations and handoff

Preparing a draft is read-only. Creating or editing a remote PR requires explicit user intent. Before a remote mutation, check for an existing PR for the same head/base and confirm the target branch. Do not push, merge, approve, or close a PR unless separately requested. After creation, report the URL, title, base/head, validation, and remaining concerns.

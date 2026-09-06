---
name: release
description: Prepare and create an orbase release, from determining the next version and validating the tree to creating the GitHub Release that triggers the npm publish workflow.
---

# Orbase Release

Use this skill when the user asks to prepare a release, bump the version, cut a tag, or create a GitHub Release for orbase. The repository releases via a semver git tag plus a GitHub Release; `.github/workflows/publish.yml` then overrides the version in CI and publishes to npm. The tag is the single source of truth for the released version.

## Repository-specific context

- Tag format is plain semver with no `v` prefix (e.g. `0.8.0`, not `v0.8.0`); `publish.yml` strips an optional `v` and validates strict semver.
- Flow: create a GitHub Release (which creates the tag) on `main` → `publish.yml` bumps `apps/orbase/package.json` version in the CI working tree → builds with tsdown → publishes `@nazozokc/orbase` to npm. The bumped version is never committed back.
- Release notes are GitHub auto-generated from `.github/release.yml` categories (💥 Breaking / ✨ Features / 🐛 Bug Fixes / ⚡ Performance / 📝 Documentation / 🔧 Other). Do not hand-write the changelog.
- A release always targets `main`; feature branches must be merged first.

## Pre-release checks

- Inspect `git status`, the current branch, and whether it is ahead of or behind `main`. Confirm the feature/working branch has been merged into `main` before releasing.
- List commits since the last release: `git log <prev-tag>..HEAD --oneline`, and review the diff to confirm scope and note any breaking changes.
- Validate before releasing: `bun run build`, and `bun test` when tests exist, plus `tsc --project apps/orbase/tsconfig.json --noEmit` for TypeScript changes. If dependencies changed, check `bun.lock` and whether `bun.nix` needs regeneration.
- Check for an existing tag or release with the target version of `gh release list` to avoid duplicates.
- Do not commit, push, or merge anything unless separately requested.

## Version decision

Determine the next version from the current npm `latest` and the latest git tag, then propose it to the user for confirmation:

- Breaking change or incompatible CLI/data behavior → bump the major or minor version deliberately, and call out migration notes.
- New capability (new command, new option) → bump the minor version.
- Bug fix, doc, or internal change → bump the patch version.

State the proposed version and the reasoning briefly, and wait for the user to confirm before creating the release.

## Create the GitHub Release

Create the release against `main` with GitHub auto-generated notes, using a plain semver tag:

```bash
git fetch --tags
gh release create 0.8.0 --target main --generate-notes --title "orbase 0.8.0"
```

- Confirm the target branch, the tag value, and that no existing release matches before creating.
- Creating a remote release requires explicit user intent; preparing a summary and commands is read-only.

## Mutations and handoff

After creating the release, report the URL, tag, target branch, the validation performed, and that `publish.yml` will publish to npm on `published`. Note any skipped checks and why. Do not push, merge, approve, close, or re-run anything unless separately requested.

# MEMORY.md — Session memory and resume protocol

## Resume protocol (read this first at the start of every session)

1. Read AGENTS.md in full.
2. Read the current Phase/Session in PLAN.md.
3. Read ONLY: "Architectural Decisions" (full), "Known Issues" (full), "Needs Human Review" (full), last 2 entries of "Session Log". Do NOT read the entire historical Session Log.

## Architectural Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-24 | Angular 21.2 with standalone components | Latest stable Angular 21.x, matches job requirement |
| 2026-07-24 | Plain CSS + `tokens.css` for design tokens | Challenge explicitly prefers custom CSS; no Tailwind/SCSS permitted |
| 2026-07-24 | Vitest via `@angular/build:unit-test` | Angular 21 built-in Vitest integration for unit tests |
| 2026-07-24 | Playwright for E2E/a11y | Pre-installed globally (v1.61.1); used for automated verification |
| 2026-07-24 | Vue.js SKIPPED | Incompatible with Angular stack decision; documented as deliberate trade-off |
| 2026-07-24 | Signals for state management | Covers "State Management logics" bonus natively |
| 2026-07-24 | Feature-based folder structure | Scales well, matches Angular standalone conventions |
| 2026-07-24 | Node.js 26.1.0 with `--legacy-peer-deps` | Angular CLI 21.x reports Node 26 as unsupported but works; legacy peer deps needed for angular-eslint + TypeScript 5.9 compatibility |

## Known Issues / Gotchas

(append-only)

## Signal Log

| Date | Session | Check | Result | Notes |
|------|---------|-------|--------|-------|

## Needs Human Review

(🔴 NEEDS HUMAN REVIEW blocks — no entries yet)

## AI Tool Usage Log

- 2026-07-24: Scaffolded Angular 21.2 project with strict mode, ESLint (angular-eslint), Playwright/Vitest deps. Build + lint pass.

## Session Log

### 2026-07-24 — Session 0: Bootstrap (fresh start)

**What was done**:
- Re-initialized `qubica-store/` as fresh Angular 21.2 standalone project (strict TS)
- Set up ESLint (angular-eslint 21.2.0, typescript-eslint 8.31.0)
- Added Playwright and Vitest devDependencies
- Installed deps with `--legacy-peer-deps` (needed for TS 5.9 + typescript-eslint compat)
- Verified: `ng build` passes, `ng lint` passes
- Restored git remote to `github.com/SuperPorz/qubica-store.git`

**Final state**: Clean Angular 21.2 project in `qubica-store/`. Ready for Session 1.1.

**Next step**: Session 1.1 — CSS design tokens + ApiService + TS interfaces + routing.

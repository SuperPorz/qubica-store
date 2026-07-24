# AGENTS.md — Agent instructions for the Qubica AMF hiring challenge

## 1. Project overview

**Goal**: build an e-commerce SPA (product catalog, authentication, cart, wishlist) using the Fake Store API (`https://fakestoreapi.com/docs`).

**Stack**:
- Angular 21, standalone components, TypeScript strict mode.
- Plain CSS with design tokens (`tokens.css`).
- Angular Signals for state management.
- Vitest (`@analogjs/vitest-angular`) for unit tests.
- Playwright for E2E / a11y / responsive verification.
- `gh` CLI for branch/PR workflow.

**Constraints** (non-negotiable):
- No SCSS, Tailwind, or CSS-in-JS.
- No Vue.js (explicitly skipped — incompatible with Angular decision).
- No visual self-certification (model has no vision). All aesthetic judgments need human review.

## 2. Code conventions

### Folder structure (feature-based, standalone)

```
src/
├── app/
│   ├── core/
│   │   ├── api/            # Centralized HTTP service, error interceptor
│   │   ├── models/         # TypeScript interfaces for every Fake Store API response
│   │   ├── guards/         # Route guards (auth)
│   │   └── tokens.css      # Design tokens (colors, spacing, typography)
│   ├── shared/
│   │   ├── components/     # Reusable UI components (modal, spinner, skeleton)
│   │   └── directives/     # Shared directives if needed
│   ├── features/
│   │   ├── products/       # Home (grid), Product detail
│   │   ├── cart/           # Cart feature
│   │   ├── wishlist/       # Wishlist feature
│   │   └── auth/           # Login/logout
│   └── app.routes.ts       # Root routing
```

### Naming conventions
- **Files**: kebab-case (e.g. `product-card.component.ts`).
- **Components**: PascalCase classes, kebab-case selectors.
- **Signals**: camelCase prefixed with the domain — `cartItems`, `wishlistIds`, `currentUser`, `activeCategory`.
- **TS interfaces**: PascalCase prefixed with `I` (e.g. `IProduct`, `ICategory`).
- **API service methods**: `getProducts()`, `getCategories()`, `login()`, etc.

### API layer
- Every Fake Store API response must have a dedicated interface in `core/models/`.
- Centralized `ApiService` in `core/api/` with uniform error handling (HTTP interceptor for the error-modal bonus).

## 3. Definition of Done for every subtask

A subtask is complete ONLY if:
- `ng build` has no errors
- `ng lint` is clean
- Relevant Vitest tests pass
- Relevant Playwright checks pass (where applicable)
- `MEMORY.md` updated with the session entry
- The corresponding checkbox in `PLAN.md` is checked

## 4. Loop Engineering — Inner Loop (per subtask)

1. **Discover**: read the relevant `PLAN.md` subtask + "Architectural Decisions" and "Known Issues" from `MEMORY.md`.
2. **Act**: implement the minimal change.
3. **Verify**: run build/lint/vitest/playwright checks.
4. **Remember**: append a compact entry to `MEMORY.md`.
5. **Decide**: if DoD satisfied → check off subtask; otherwise go back to Act (max 3 attempts, see outer loop).

## 5. Loop Engineering — Outer Loop (per session)

1. **Observe**: collect only structured, non-visual signals (test results, lint output, a11y audit via axe-core, DOM snapshots, console errors, screenshots saved under `verification/screenshots/<date>-<session>/`).
2. **Evaluate**: compare against DoD and AC/Bonus checklist.
3. **Store Signal**: append record to "Signal Log" in `MEMORY.md`.
4. **Retry**: if failed and attempts < 3, fix and repeat Observe→Evaluate.
5. **Escalate**: if 3 attempts exhausted OR visual judgment required → write a "🔴 NEEDS HUMAN REVIEW" block in `MEMORY.md`. Stop on that subtask.
6. **Improve**: if same bug appears 2+ times, add a preventive rule to §2 above.

## 6. Context management rule

- One work session = at most one "Session" (second level) of `PLAN.md`.
- Before context fills up, or at end of a Session, write handoff to `MEMORY.md` and stop.
- Never attempt multiple Sessions in one context window.

## 7. Git/PR conventions

- **One branch per feature**: `feat/xxx` (e.g., `feat/product-grid`, `feat/auth`).
- **Branch from the right base**: create each feature branch from `main` (or from the previous feature branch if features are sequential and not yet merged). This ensures each PR shows only its own diff.
- **Conventional Commits**: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
- **PR workflow**:
  1. Create feature branch, develop, commit.
  2. Push branch to origin.
  3. Create PR via `gh pr create` with:
     - Clear title following conventional commits.
     - Description covering: Changes, Verification (build/lint results), Related AC/Bonus references.
     - Base branch: `main` (or previous feature branch if sequential stack).
  4. Wait for user review and merge confirmation.
- **No automatic merge** without explicit user confirmation.
- **Never commit directly to `main`** — always use branches + PRs.
- **After PR merge** to `main`, delete the feature branch locally and on remote.

## 8. AI tool usage log

A running log is kept in `MEMORY.md` documenting where/how AI was used for scaffolding/debugging/refactoring and how output was validated — needed for the README paragraph required by AC 1.d.
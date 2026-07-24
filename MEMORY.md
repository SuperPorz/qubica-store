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
| 2026-07-24 | Git workflow: one branch per feature, PR stacked on previous PR branch | Ensures clean per-feature diff; PR description must include Changes, Verification, Related AC/Bonus |

## Known Issues / Gotchas

(append-only)

## Signal Log

| Date | Session | Check | Result | Notes |
|------|---------|-------|--------|-------|

## Needs Human Review

(🔴 NEEDS HUMAN REVIEW blocks — no entries yet)

## AI Tool Usage Log

- 2026-07-24: Scaffolded Angular 21.2 project with strict mode, ESLint (angular-eslint), Playwright/Vitest deps. Build + lint pass.
- 2026-07-24: Created tokens.css, ApiService, TS interfaces, lazy-loaded routing, basic layout (Header + outlet).
- 2026-07-24: Built product grid, category filter, product detail, auth, cart/wishlist features. All AI output validated via ng build + ng lint.

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

### 2026-07-24 — Session 1.1: Core scaffolding

**What was done**:
- Created `tokens.css` with light/dark theme variables (colors, spacing, typography, shadows, transitions)
- Created `styles.css` importing tokens + global resets
- Created `IProduct`, `ICategory`, `ILoginRequest`, `ILoginResponse` interfaces in `core/models/api.interface.ts`
- Created centralized `ApiService` in `core/api/api.service.ts` with 5 methods (getProducts, getProduct, getCategories, getProductsByCategory, login)
- Set up app.config.ts with HttpClient (`withFetch`) + Router
- Created lazy-loaded routes for home, product/:id, cart, wishlist, auth + 404 redirect
- Created stub components for all 5 feature routes
- Set up basic app layout (header + router-outlet)
- Removed default Angular template

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 1.2: Header with dynamic categories

**What was done**:
- Created `HeaderComponent` in `layout/header/` with:
  - Textual logo "Qubica Store"
  - Dynamic category nav fetched from Fake Store API via `ApiService.getCategories()`
  - "All" link to reset category filter
  - Nav links with `routerLinkActive` styling
  - Action links (Wishlist, Cart, Login)
- Updated `App` component to use `HeaderComponent`
- Simplified `app.html` with `<app-header />` + `<router-outlet />`

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 2.1: Product grid + clickable cards

**What was done**:
- Created `ProductCardComponent` in `features/products/product-card/`:
  - Displays product image, name, price
  - Clickable via RouterLink → `/product/:id`
  - Card with hover effect (translate + shadow)
  - Image with contain fit, lazy loading
  - Title clamped to 2 lines
- Updated `ProductListComponent`:
  - Fetches all products via `ApiService.getProducts()`
  - Responsive grid (`auto-fill, minmax(260px, 1fr)`)
  - Uses `@for` control flow with tracking

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 2.2: Category filter + deep-link

**What was done**:
- Updated `ProductListComponent`:
  - Reads `category` query param from URL via `ActivatedRoute.queryParamMap`
  - Uses `switchMap` to properly chain query param changes with API calls
  - Calls `getProductsByCategory(cat)` when category is present, `getProducts()` otherwise
  - Proper cleanup via `takeUntilDestroyed`
  - Shows heading with active category name
- Header already had category links with `[queryParams]="{category: cat}"`
- Deep-link works because `queryParamMap` emits initial value on init

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 2.3: Product detail view

**What was done**:
- Updated `ProductDetailComponent`:
  - Reads `:id` from route params, fetches product via `ApiService.getProduct(id)`
  - Displays: category badge, title, price (currency formatted), star rating, review count, full description
  - Responsive 2-column layout (image left, info right), collapses to 1 column on mobile
  - Back button using `Location.back()`
  - "Add to Cart" button (UI placeholder, wired in Session 3.2)
  - Proper cleanup with `takeUntilDestroyed` + `switchMap`

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 3.1: Auth (login/logout + route guard)

**What was done**:
- Created `AuthService` in `core/services/`:
  - `tokenSignal` backed by `localStorage` for persistence
  - `isAuthenticated` computed signal
  - `login()` returns observable with tap for side effects
  - `logout()` clears token and redirects
- Created `authGuard` functional route guard in `core/guards/`:
  - Redirects to `/auth` if not authenticated
- Updated `AuthComponent`:
  - Login form with username/password fields (pre-filled with demo credentials)
  - Error message on invalid login
  - Logged-in state shows welcome + logout button
  - Form uses `FormsModule` + signals
- Updated `HeaderComponent`:
  - Shows Login or Logout based on `auth.isAuthenticated()`
- Updated `app.routes.ts`:
  - Cart and wishlist protected with `canActivate: [authGuard]`

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Session 3.2: Cart & Wishlist

**What was done**:
- Created `CartService`:
  - `items` signal with CartItem[] (product + quantity)
  - `totalItems`, `totalPrice` computed signals
  - `addProduct`, `removeProduct`, `updateQuantity`, `clearCart` methods
  - localStorage persistence
- Created `WishlistService`:
  - `ids` signal (Set<number>), `count`, `isEmpty` computeds
  - `toggle`, `isWishlisted` methods
  - localStorage persistence
- Updated `HeaderComponent`:
  - Cart link shows badge with `totalItems()` count
- Updated `ProductCardComponent`:
  - Wishlist toggle button (♡/♥) with active state
  - `toggleWishlist($event)` with event stopPropagation
- Updated `ProductDetailComponent`:
  - "Add to Cart" button wired to `CartService.addProduct()`
  - "Save/♥ Saved" wishlist toggle button
- Implemented `CartComponent`:
  - Full item list with image, title, price
  - Quantity controls (+/−), subtotal per item, remove button
  - Summary with total price, checkout (disabled), clear cart
  - Empty state with link to products
- Implemented `WishlistComponent`:
  - Fetches products by IDs from API
  - Remove button per item
  - Empty state with link to products
- Both Cart and Wishlist are auth-protected via `authGuard`

**Verification**: `ng build` ✔, `ng lint` ✔

### 2026-07-24 — Git workflow fix: retroactive PRs

**What was done**:
- Discovered that all work was on a single monolithic branch `feat/core-scaffolding`, violating B 1a/B 1b (one branch per feature + PR workflow)
- Re-read Qubica-interview.pdf to confirm requirements
- Created 7 separate feature branches from the linear commit history:
  - `feat/01-core-scaffolding` ← commit 9993d1d
  - `feat/02-layout` ← commit ae92c2e
  - `feat/03-product-grid` ← commit 6fee876
  - `feat/04-category-filter` ← commit f3be498
  - `feat/05-product-detail` ← commit 980a5df
  - `feat/06-auth` ← commit 654b409
  - `feat/07-cart-wishlist` ← commit f5a59af
- Pushed all branches to origin
- Created 7 PRs (#1–#7) with descriptions (Changes, Verification, Related AC/Bonus)
  - PR #1 → main, PR #2 → #1's branch, etc. (stacked PRs)
- Deleted the old monolithic `feat/core-scaffolding` branch (local + remote)
- Updated AGENTS.md §7 with detailed Git/PR conventions

**Current state**: All feature work correctly split into separate branches with clean PRs. Dev server at http://localhost:4200.

**Next step**: Phase 4 — UX quality (loading states + error handling modal).

### 2026-07-24 — Session 6.1: All PRs merged to main

**What was done**:
- All 7 PRs merged to main in order (#1 → #7)
- Conflict resolution for MEMORY.md across all branches via rebase + `--theirs` strategy
- All feature branches rebased onto latest main to ensure clean, conflict-free PRs
- Final state: `main` has full feature set through proper PR workflow (B 1a, B 1b)

**Verification**: `ng build` ✔, `ng lint` ✔ on main

**Current state**: All features working on main. Git workflow fully aligned with PDF requirements.

**Next step**: Phase 4 — UX quality (loading states + error handling modal).

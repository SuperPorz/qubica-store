# Qubica Store

E-commerce single-page application built for the **Qubica AMF hiring challenge**. Product catalog with authentication, shopping cart, and wishlist, powered by the [Fake Store API](https://fakestoreapi.com/docs).

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 21.2 (standalone components) |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Plain CSS with design tokens (`tokens.css`) |
| State management | Angular Signals |
| Unit tests | Vitest |
| E2E / a11y tests | Playwright + axe-core |
| Linting | angular-eslint |
| API | Fake Store API (`https://fakestoreapi.com`) |

## Prerequisites

- **Node.js** >= 22 (tested on Node 26.1.0)
- **npm** >= 10
- **Git** + **gh** CLI (for PR workflow)

## Setup

```bash
# Clone the repository
git clone https://github.com/SuperPorz/qubica-store.git
cd qubica-store

# Install dependencies
npm install

# Start the development server
ng serve
```

The app is available at **http://localhost:4200**.

## Available commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server at `http://localhost:4200` |
| `ng build` | Production build to `dist/` |
| `ng lint` | Run ESLint on all source files |
| `ng test` | Run unit tests (Vitest) |
| `npx playwright test` | Run E2E + accessibility + responsive tests |

## Running tests

### Unit tests

```bash
ng test
```

Uses Vitest under the hood (via `@angular/build:unit-test`). Tests cover `CartService` (add, remove, quantity, price calculation) and `ApiService` (HTTP calls with mocking).

### E2E / accessibility / responsive

```bash
npx playwright test
```

Requires the dev server to be running (`ng serve`). The Playwright config is set to auto-start the server (`reuseExistingServer: true`).

Tests include:
- **Accessibility**: axe-core audit (WCAG 2 AA) on home and product detail pages
- **Keyboard navigation**: Tab through header nav, Enter to activate product cards
- **Responsive**: product grid layout at tablet (768px) and mobile (375px) viewports
- **Alt text**: all product images have non-empty `alt` attributes

## Test credentials

Use these credentials on the Login page:

| Field | Value |
|-------|-------|
| Username | `mor_2314` |
| Password | `83r5^_` |

## Features

### Acceptance criteria

- ✅ **AC 1a**: Public GitHub repository
- ✅ **AC 1b**: Clean conventional commit history with feature branches
- ✅ **AC 2a**: Global layout with Header + main content area
- ✅ **AC 3a–3b**: Header with store name, textual logo, dynamic category navigation from API
- ✅ **AC 4a–4b**: Product grid with images, names, prices; clickable cards → detail view
- ✅ **AC 4c–4d**: Category filter via URL query params, deep-link and refresh support
- ✅ **AC 5a**: Product detail view (name, image, price, full description, star rating)

### Bonus features

- ✅ **B 1a–1b**: Feature-branch PR workflow with clear descriptions
- ✅ **B 2b**: Strict TypeScript interfaces for all API responses
- ✅ **B 2c**: CSS custom properties / design tokens (`tokens.css`) with light/dark theme
- ✅ **B 2d**: Unit tests (Vitest) — CartService (10), ApiService (6)
- ✅ **B 2e**: State management with Angular Signals (cart, wishlist, auth, loading, error, theme)
- ✅ **B 3b**: Loading states — skeleton grid on product list, skeleton layout on product detail
- ✅ **B 3c**: Error handling — HTTP interceptor catches errors, shows modal with dismiss
- ✅ **B 3d**: Light/dark theme toggle — fixed bottom-right FAB, localStorage persistence, system preference detection
- ✅ **B 3e**: Add to cart button with badge counter in Header
- ✅ **B 3f**: Login/logout via Fake Store API with route guard for protected routes

### Pending (human review)

- 🔴 **B 3a**: Smooth route transitions (implemented with `@angular/animations`, removed because it competed with skeleton loading — needs human decision)

## AI tools usage

This project was developed through a structured **agentic workflow** using:
- **Model**: DeepSeek V4 Flash (via OpenRouter)
- **Agent harness**: [pi coding agent](https://github.com/earendil-works/pi-coding-agent)
- **Terminal UI**: pi TUI with vim keybindings, split panes, and integrated tool execution

The entire development followed a loop-engineering methodology codified in three files that act as the agent's runtime memory:

### Core orchestration files

| File | Role |
|------|------|
| [`AGENTS.md`](AGENTS.md) | System prompt for the agent — defines project conventions, folder structure, naming rules, definition of done, shell efficiency rules, and git/PR workflow. Loaded once at session start. |
| [`PLAN.md`](PLAN.md) | Living roadmap — tracks every acceptance criterion, bonus point, and session-level task with checkboxes. The agent reads it to know what to do next and writes it to mark progress. |
| [`MEMORY.md`](MEMORY.md) | Persistent session memory — stores architectural decisions, known issues, a signal log (test results, lint output, a11y audits), and a chronological session log. The resume protocol at the top tells the agent what to re-read on reconnection. Prevents context loss across sessions. |

### Agentic inner loop (per subtask)

For every feature subtask, the agent follows a tight **Discover → Act → Verify → Remember → Decide** loop:
1. **Discover** — read the relevant PLAN.md subtask, architectural decisions, and known issues from MEMORY.md
2. **Act** — implement the minimal change (components, services, styles, tests)
3. **Verify** — run `ng build`, `ng lint`, `ng test`, and Playwright checks; no visual self-certification (model has no vision)
4. **Remember** — append a compact entry to MEMORY.md session log
5. **Decide** — if Definition of Done satisfied (build ✅, lint ✅, tests ✅), check off the subtask in PLAN.md; otherwise retry (max 3 attempts)

### Outer loop (per session)

At a higher level, each work session collects structured signals (test results, a11y audits via axe-core, console errors, DOM snapshots), evaluates against the DoD, and stores the signal in MEMORY.md. If 3 attempts are exhausted or visual judgment is required, the agent writes a "🔴 NEEDS HUMAN REVIEW" block and stops — the human reviews and signals back.

### What the AI did

- **Scaffolding**: generated Angular 21.2 project with standalone components, strict TypeScript, ESLint
- **Implementation**: wrote every component, service, interface, route guard, and HTTP interceptor
- **Styling**: built design tokens (`tokens.css`), responsive grid, card hover effects, skeleton loaders, error modal, theme FAB — all in plain CSS
- **Testing**: created 16 Vitest unit tests (ApiService + CartService) and Playwright E2E/a11y/responsive tests
- **Git workflow**: managed feature branches, rebasing, conflict resolution, and PRs via `gh` CLI
- **Debugging**: resolved merge conflicts, fixed lint errors, addressed a11y violations, and recovered unmerged changes

Every AI-generated output was reviewed, tested (`ng build` ✅, `ng lint` ✅, `ng test` ✅), and validated by a human before being merged to}]}

## Project structure

```
├── AGENTS.md                    # Agent system prompt — conventions, rules, DoD
├── PLAN.md                      # Living roadmap — tasks, AC/Bonus checkboxes
├── MEMORY.md                    # Persistent session memory — decisions, logs, signals
├── e2e/
│   └── app.spec.ts              # Playwright tests
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── api/
│   │   │   │   ├── api.service.ts          # HTTP service for Fake Store API
│   │   │   │   └── api.interceptor.ts       # HTTP error interceptor
│   │   │   ├── models/
│   │   │   │   └── api.interface.ts         # TypeScript interfaces
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts            # Route guard for protected routes
│   │   │   └── services/
│   │   │       ├── auth.service.ts          # Authentication state
│   │   │       ├── cart.service.ts          # Cart with localStorage persistence
│   │   │       ├── error.service.ts         # Global error state
│   │   │       ├── loading.service.ts       # Loading state per request
│   │   │       ├── theme.service.ts         # Light/dark theme toggle
│   │   │       └── wishlist.service.ts      # Wishlist state
│   │   ├── features/
│   │   │   ├── products/
│   │   │   │   ├── product-card/            # Product card component
│   │   │   │   ├── product-list/            # Product grid (home)
│   │   │   │   └── product-detail/          # Product detail view
│   │   │   ├── cart/                        # Shopping cart
│   │   │   ├── wishlist/                    # Wishlist
│   │   │   └── auth/                        # Login/logout form
│   │   ├── layout/
│   │   │   └── header/                      # Header with nav, cart, auth
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── error-modal.component.ts # Error dialog
│   │   │       └── spinner.component.ts     # Global spinner
│   │   ├── app.ts                           # Root component
│   │   ├── app.html                         # Root template
│   │   ├── app.config.ts                    # App providers
│   │   └── app.routes.ts                    # Lazy-loaded routes
│   ├── tokens.css                           # Design tokens
│   └── styles.css                           # Global styles
```

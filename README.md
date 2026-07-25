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

### Development commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server at `http://localhost:4200` |
| `ng build` | Production build to `dist/` |
| `ng lint` | Run ESLint on all source files |

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
- ✅ **B 3a**: Smooth route transitions — fade-slide animation between views, route-level with `@angular/animations`
- ✅ **B 3b**: Loading states — skeleton grid on product list, skeleton layout on product detail
- ✅ **B 3c**: Error handling — HTTP interceptor catches errors, shows modal with dismiss
- ✅ **B 3d**: Light/dark theme toggle — fixed bottom-right FAB, localStorage persistence, system preference detection
- ✅ **B 3e**: Add to cart button with badge counter in Header
- ✅ **B 3f**: Login/logout via Fake Store API with route guard for protected routes

## AI tools usage

This project was developed with assistance from **Claude (Anthropic)**, an AI coding agent operating inside the **pi coding agent harness**. The AI was used for:

- **Scaffolding**: generating Angular components, services, interfaces, and configuration files
- **Implementation**: writing template HTML, CSS styling, TypeScript logic, and Signal-based state management
- **Testing**: creating Vitest unit tests and Playwright E2E/a11y/responsive tests
- **Git workflow**: managing feature branches, rebasing, and creating PRs via `gh` CLI
- **Debugging**: resolving merge conflicts, fixing lint errors, and addressing a11y violations
- **Design**: implementing design tokens, theme toggle, card hover effects, and responsive layout — all visual decisions were reviewed and approved by a human

Every AI-generated output was reviewed, tested (`ng build`, `ng lint`, `ng test`), and validated by a human before being merged to `main`.

## Project structure

```
src/
├── app/
│   ├── core/
│   │   ├── api/
│   │   │   ├── api.service.ts          # HTTP service for Fake Store API
│   │   │   └── api.interceptor.ts       # HTTP error interceptor
│   │   ├── models/
│   │   │   └── api.interface.ts         # TypeScript interfaces
│   │   ├── guards/
│   │   │   └── auth.guard.ts            # Route guard for protected routes
│   │   └── services/
│   │       ├── auth.service.ts          # Authentication state
│   │       ├── cart.service.ts          # Cart with localStorage persistence
│   │       ├── error.service.ts         # Global error state
│   │       ├── loading.service.ts       # Loading state per request
│   │       ├── theme.service.ts         # Light/dark theme toggle
│   │       └── wishlist.service.ts      # Wishlist state
│   ├── features/
│   │   ├── products/
│   │   │   ├── product-card/            # Product card component
│   │   │   ├── product-list/            # Product grid (home)
│   │   │   └── product-detail/          # Product detail view
│   │   ├── cart/                        # Shopping cart
│   │   ├── wishlist/                    # Wishlist
│   │   └── auth/                        # Login/logout form
│   ├── layout/
│   │   └── header/                      # Header with nav, cart, auth
│   ├── shared/
│   │   └── components/
│   │       ├── error-modal.component.ts # Error dialog
│   │       └── spinner.component.ts     # Global spinner
│   ├── app.ts                           # Root component
│   ├── app.html                         # Root template
│   ├── app.config.ts                    # App providers
│   └── app.routes.ts                    # Lazy-loaded routes
├── e2e/
│   └── app.spec.ts                      # Playwright tests
├── tokens.css                           # Design tokens
└── styles.css                           # Global styles
```

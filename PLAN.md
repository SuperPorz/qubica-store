# PLAN.md — Qubica AMF E-Commerce Challenge

## Acceptance Criteria checklist

| #   | Description | Status |
|-----|-------------|--------|
| AC 1a | Public GitHub repository | ✅ |
| AC 1b | Clean commit messages, clean history | ✅ |
| AC 1c | README.md with precise local setup instructions | ✅ |
| AC 1d | AI tools usage paragraph in README.md | ✅ |
| AC 2a | Global layout: Header + Main area | ✅ |
| AC 2b | Responsive on tablets and smartphones | ✅ |
| AC 2c | Semantic HTML5, keyboard nav, alt attributes on product images | ✅ |
| AC 3a | Header: store name, textual logo, category navigation | ✅ |
| AC 3b | Categories fetched dynamically via API | ✅ |
| AC 4a | Home: product grid (image, name, price) | ✅ |
| AC 4b | Product cards clickable → detail view | ✅ |
| AC 4c | Category filter from Header, filters products via API | ✅ |
| AC 4d | URL updates on filter; deep-link/refresh works correctly | ✅ |
| AC 5a | Product detail: name, image, price, full description | ✅ |

## Bonus points checklist

| #   | Description | Status |
|-----|-------------|--------|
| B 1a | PR system with clear PR descriptions | ✅ |
| B 1b | Feature branches → PR → main workflow | ✅ |
| B 2a | Vue.js — SKIPPED (incompatible with Angular stack decision) | ✅ |
| B 2b | Strict TypeScript for API responses and data structures | ✅ |
| B 2c | CSS custom properties / design tokens | ✅ |
| B 2d | 1-2 unit tests (Vitest) | ✅ |
| B 2e | State management (Angular Signals) | ✅ |
| B 3a | Smooth transitions/animations between views | ⚠️ (CSS transitions OK, mancano route-level @angular/animations) |
| B 3b | Loading states (spinner/skeleton) | ✅ |
| B 3c | Error handling modal | ✅ |
| B 3d | Light/dark theme toggle | ✅ |
| B 3e | Add to cart button + counter in Header | ✅ |
| B 3f | Login/logout via dedicated API | ✅ |

---

## Milestones & sessions

### Phase 0 — Project bootstrap

- [x] AGENTS.md, PLAN.md, MEMORY.md created
- [x] Angular 21.2 standalone project created (ng build ✔, ng lint ✔)
- [x] Strict TypeScript enabled
- [x] ESLint configured (angular-eslint)
- [x] Playwright, Vitest, gh CLI verified

### Session 1.1 — Core scaffolding
- [x] CSS design tokens (colors, spacing, typography, light/dark) — [B 2c]
- [x] Centralized API service (ApiService) — [B 2b]
- [x] TypeScript interfaces for Fake Store API — [B 2b]
- [x] Base routing with lazy-loaded feature routes — [AC 2a]

### Session 1.2 — Layout
- [x] Header: store name, textual logo, category nav from API — [AC 3a, 3b]
- [x] Global layout: Header + Main + router-outlet — [AC 2a]

### Session 2.1 — Product grid
- [x] Home: product grid from API (image, name, price) — [AC 4a]
- [x] Clickable card → navigates to detail view — [AC 4b]

### Session 2.2 — Category filter & deep-link
- [x] Category filter from Header, updates URL (query string) — [AC 4c, 4d]
- [x] Deep-link: correct init from direct URL / refresh — [AC 4d]

### Session 2.3 — Product detail
- [x] Product view: name, image, price, full description — [AC 5a]

### Session 3.1 — Auth
- [x] Login/logout via Fake Store API — [B 3f]
- [x] Route guard for Cart/Wishlist

### Session 3.2 — Cart & Wishlist
- [x] Add to cart + counter in Header (Signals) — [B 3e]
- [x] Wishlist (protected feature)

### Session 4.1 — UX quality
- [x] Loading states (skeleton/spinner) — [B 3b]
- [x] Error handling: "something went wrong" modal — [B 3c]

### Session 4.2 — Theme & animations
- [x] Light/dark theme toggle — [B 3d] — ✅ reviewed and approved
- [x] CSS transitions/hover effects on cards, buttons, skeleton — [B 3a] parziale
- [ ] Route-level fade-slide animation via @angular/animations — [B 3a] mancante, task spostata in Session 8.1

### Session 5.1 — Unit & a11y tests
- [x] Set up Vitest + 1-2 critical unit tests — [B 2d]
- [x] Automated a11y audit (axe-core via Playwright) — [AC 2c]
- [x] Keyboard navigation check via Playwright — [AC 2c]

### Session 5.2 — Responsive tests
- [x] Responsive check (tablet/smartphone viewport via Playwright) — [AC 2b]
- [x] Alt text on all product images — [AC 2c]

### Session 6.1 — Git workflow
- [x] Retroactively created 7 feature branches with PRs (#1–#7) from `feat/core-scaffolding` history
- [x] Deleted superseded `feat/core-scaffolding` branch
- [x] All 7 PRs merged to main in order (#1 → #7)
- [x] Verify every feature went through a branch + PR — [B 1a, B 1b]
- [x] Clean up commit history — [AC 1b]

### Session 7.1 — Documentation
- [x] README.md: precise local setup instructions — [AC 1c]
- [x] README.md: AI tools usage paragraph — [AC 1d]
- [x] Public repo verified — [AC 1a]
- [x] Final AC+Bonus checklist review, with note on Vue.js SKIPPED

### Session 8.1 — Fix & Polish (post-FINAL_TEST.md audit)

#### — Issue critica: Route animations (B 3a) —
- [ ] Installare `@angular/animations` e implementare route-level fade-slide animation tra le views — [B 3a]
- [ ] Aggiornare README.md per riflettere correttamente le animazioni implementate (CSS transitions + route animations se installate)

#### — Issue minori —
- [ ] Correggere `routerLink="/products"` in `routerLink="/"` nell'header per i link categoria — [AC 4c]
- [ ] Aggiungere route esplicita `/products` che carica `ProductListComponent` (opzionale ma pulito)
- [ ] Sincronizzare MEMORY.md: rimuovere menzione `ICategory` non più in uso
- [ ] Creare directory `verification/` con `.gitkeep` come da AGENTS.md §5

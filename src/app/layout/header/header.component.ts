import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header__inner">
        <a class="header__logo" routerLink="/">Qubica Store</a>

        <nav class="header__nav" aria-label="Category navigation">
          <a
            class="header__link"
            routerLink="/"
            routerLinkActive="header__link--active"
            [routerLinkActiveOptions]="{ exact: true }"
            >All</a
          >
          @for (cat of categories(); track cat) {
            <a
              class="header__link"
              [routerLink]="['/']"
              [queryParams]="{ category: cat }"
              routerLinkActive="header__link--active"
              [routerLinkActiveOptions]="{ queryParams: 'exact' }"
              >{{ cat }}</a
            >
          }
        </nav>

        <div class="header__actions">
          <a class="header__link" routerLink="/wishlist">Wishlist</a>
          <a class="header__link header__cart" routerLink="/cart">
            Cart
            @if (cart.totalItems()) {
              <span class="header__cart-badge">{{ cart.totalItems() }}</span>
            }
          </a>
          @if (auth.isAuthenticated()) {
            <a class="header__link" routerLink="/auth">Logout</a>
          } @else {
            <a class="header__link" routerLink="/auth">Login</a>
          }
        </div>
      </div>
    </header>
  `,
  styles: `
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      z-index: 100;
      transition: background-color var(--transition-normal);
    }
    .header__inner {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 var(--space-lg);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-lg);
    }
    .header__logo {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      text-decoration: none;
      white-space: nowrap;
    }
    .header__logo:hover {
      text-decoration: none;
    }
    .header__nav {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
      overflow-x: auto;
      flex: 1;
      scrollbar-width: none;
    }
    .header__actions {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
      white-space: nowrap;
    }
    .header__link {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-sm);
      transition:
        color var(--transition-fast),
        background-color var(--transition-fast);
      text-decoration: none;
      text-transform: capitalize;
      position: relative;
    }
    .header__link:hover {
      color: var(--color-text-primary);
      background: var(--color-surface-hover);
      text-decoration: none;
    }
    .header__link--active {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }
    .header__cart {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
    }
    .header__cart-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: var(--color-primary);
      color: var(--color-primary-text);
      font-size: 11px;
      font-weight: var(--font-weight-bold);
      border-radius: var(--radius-full);
      line-height: 1;
    }
  `,
})
export class HeaderComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);
  readonly categories = signal<string[]>([]);

  ngOnInit() {
    this.api.getCategories().subscribe((cats) => {
      this.categories.set(
        cats.map((c) => (typeof c === 'string' ? c : c.name))
      );
    });
  }
}

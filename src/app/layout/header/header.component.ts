import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/api/api.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

export function formatCategory(cat: string): string {
  return cat.replace(/\s*clothing$/i, '').trim();
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header__inner">
        <a class="header__logo" routerLink="/" aria-label="Qubica Store Home"
          ><img src="bowling-pins.png" alt="" class="header__logo-icon" width="24" height="24" /> Qubica</a
        >

        <nav class="header__nav" aria-label="Product categories">
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
              [routerLink]="'/products'"
              [queryParams]="{ category: cat }"
              routerLinkActive="header__link--active"
              [routerLinkActiveOptions]="{ exact: true }"
              >{{ formatCategory(cat) }}</a
            >
          }
        </nav>

        <div class="header__actions">
          <a class="header__action-link" routerLink="/cart" aria-label="Shopping cart">
            <span class="header__icon">&#128722;</span>
            @if (cart.totalItems() > 0) {
              <span class="header__badge">{{ cart.totalItems() }}</span>
            }
          </a>

          <a class="header__action-link" routerLink="/wishlist" aria-label="Wishlist">
            <span class="header__icon">&#9829;</span>
          </a>

          @if (auth.isAuthenticated()) {
            <button class="header__auth-btn header__auth-btn--logout" (click)="auth.logout()">
              Logout
            </button>
          } @else {
            <a class="header__auth-btn header__auth-btn--login" routerLink="/auth">Login</a>
          }
        </div>
      </div>
    </header>

    <!-- Theme toggle fixed bottom-right -->
    <button
      class="theme-fab"
      (click)="theme.toggle()"
      [attr.aria-label]="'Switch to ' + (theme.theme() === 'light' ? 'dark' : 'light') + ' theme'"
    >
      @if (theme.theme() === 'light') {
        <span class="theme-fab__icon">&#9790;</span>
      } @else {
        <span class="theme-fab__icon">&#9788;</span>
      }
    </button>
  `,
  styles: [
    `
    .header {
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header__inner {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-md) var(--space-lg);
    }
    .header__logo {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      white-space: nowrap;
    }
    .header__logo-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    :host-context([data-theme='dark']) .header__logo-icon {
      filter: invert(1);
    }
    .header__nav {
      display: flex;
      gap: var(--space-sm);
      overflow-x: auto;
      flex: 1;
      scrollbar-width: none;
    }
    .header__nav::-webkit-scrollbar {
      display: none;
    }
    .header__link {
      padding: var(--space-xs) var(--space-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-decoration: none;
      border-radius: var(--radius-sm);
      white-space: nowrap;
      flex-shrink: 0;
      transition: color var(--transition-fast), background var(--transition-fast);
    }
    .header__link:hover {
      color: var(--color-text-primary);
      background: var(--color-hover);
    }
    .header__link--active {
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }
    .header__actions {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    /* Action buttons (cart, wishlist) */
    .header__action-link {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-xs) var(--space-md);
      min-width: 42px;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
    }
    .header__action-link:hover {
      border-color: var(--color-primary);
      background: var(--color-hover);
      color: var(--color-text-primary);
    }
    .header__icon {
      font-size: 1.35rem;
      line-height: 1;
    }

    /* Badge counter */
    .header__badge {
      position: absolute;
      top: -8px;
      right: -10px;
      background: var(--color-primary);
      color: var(--color-primary-text);
      font-size: 11px;
      font-weight: var(--font-weight-bold);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Auth button — theme-aware */
    .header__auth-btn {
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      text-decoration: none;
      font-family: inherit;
      transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
    }
    .header__auth-btn--login {
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text-primary);
    }
    .header__auth-btn--login:hover {
      border-color: var(--color-primary);
      background: var(--color-hover);
    }
    .header__auth-btn--logout {
      border: 1px solid var(--color-border);
      background: var(--color-background);
      color: var(--color-text-primary);
    }
    .header__auth-btn--logout:hover {
      background: var(--color-error-bg);
      border-color: var(--color-error);
      color: var(--color-error);
    }

    :host-context([data-theme='dark']) .header__auth-btn--logout {
      background: #ffffff;
      color: #202124;
      border-color: #ffffff;
    }
    :host-context([data-theme='dark']) .header__auth-btn--logout:hover {
      background: var(--color-error-bg);
      color: var(--color-error);
      border-color: var(--color-error);
    }

    /* Theme FAB — fixed bottom-right */
    .theme-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--color-primary);
      color: var(--color-primary-text);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.4rem;
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    }
    .theme-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    .theme-fab__icon {
      line-height: 1;
    }

    /* ── Mobile: two-row header ── */
    @media (max-width: 768px) {
      .header__inner {
        flex-wrap: wrap;
        gap: var(--space-xs) var(--space-md);
        padding: var(--space-sm) var(--space-md);
      }

      .header__logo {
        order: 1;
      }

      .header__actions {
        order: 2;
        margin-left: auto;
      }

      .header__nav {
        order: 3;
        flex: 0 0 100%;
        padding: 0 0 var(--space-xs);
        gap: var(--space-xs);
      }
    }
  `,
  ],
})
export class HeaderComponent implements OnInit {
  protected readonly formatCategory = formatCategory;
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);
  readonly cart = inject(CartService);
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly categories = signal<string[]>([]);

  ngOnInit() {
    this.api
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cats: string[]) => {
        this.categories.set(cats);
      });
  }
}

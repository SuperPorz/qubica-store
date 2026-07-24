import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-card__title">
          {{ isAuthenticated() ? 'Welcome!' : 'Login' }}
        </h1>

        @if (isAuthenticated()) {
          <p class="auth-card__message">You are logged in.</p>
          <button class="auth-card__btn auth-card__btn--logout" (click)="logout()">
            Logout
          </button>
        } @else {
          <form class="auth-form" (ngSubmit)="login()">
            <div class="auth-form__field">
              <label class="auth-form__label" for="username">Username</label>
              <input
                id="username"
                class="auth-form__input"
                type="text"
                [(ngModel)]="username"
                name="username"
                placeholder="mor_2314"
                required
              />
            </div>
            <div class="auth-form__field">
              <label class="auth-form__label" for="password">Password</label>
              <input
                id="password"
                class="auth-form__input"
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="83r5^_"
                required
              />
            </div>
            @if (error()) {
              <p class="auth-form__error">{{ error() }}</p>
            }
            <button
              class="auth-card__btn auth-card__btn--login"
              type="submit"
            >
              Login
            </button>
          </form>
          <p class="auth-card__hint">
            Hint: username <strong>mor_2314</strong>, password <strong>83r5^_</strong>
          </p>
        }
      </div>
    </div>
  `,
  styles: `
    .auth-page {
      display: flex;
      justify-content: center;
      padding-top: var(--space-2xl);
    }
    .auth-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      width: 100%;
      max-width: 400px;
    }
    .auth-card__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-lg);
      color: var(--color-text-primary);
    }
    .auth-card__message {
      color: var(--color-text-secondary);
      margin-bottom: var(--space-lg);
    }
    .auth-card__hint {
      margin-top: var(--space-md);
      font-size: var(--font-size-xs);
      color: var(--color-text-placeholder);
    }
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .auth-form__field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }
    .auth-form__label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }
    .auth-form__input {
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-base);
      font-family: inherit;
      color: var(--color-text-primary);
      background: var(--color-background);
      transition: border-color var(--transition-fast);
    }
    .auth-form__input:focus {
      outline: none;
      border-color: var(--color-primary);
    }
    .auth-form__error {
      color: var(--color-error);
      font-size: var(--font-size-sm);
    }
    .auth-card__btn {
      display: block;
      width: 100%;
      padding: var(--space-md);
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--transition-fast);
      text-align: center;
    }
    .auth-card__btn--login {
      background: var(--color-primary);
      color: var(--color-primary-text);
    }
    .auth-card__btn--login:hover {
      background: var(--color-primary-hover);
    }
    .auth-card__btn--logout {
      background: var(--color-error);
      color: #fff;
    }
    .auth-card__btn--logout:hover {
      background: var(--color-error-bg);
      color: var(--color-error);
    }
  `,
})
export class AuthComponent {
  private readonly auth = inject(AuthService);
  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly username = signal('mor_2314');
  readonly password = signal('83r5^_');
  readonly error = signal('');

  login() {
    this.error.set('');
    this.auth.login({
      username: this.username(),
      password: this.password(),
    }).subscribe({
      error: () => this.error.set('Invalid username or password'),
    });
  }

  logout() {
    this.auth.logout();
  }
}

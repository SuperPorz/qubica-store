import { Component, inject } from '@angular/core';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  template: `
    @if (errorService.error(); as msg) {
      <div
        class="modal-overlay"
        (click)="dismiss()"
        (keydown.escape)="dismiss()"
        tabindex="0"
        role="dialog"
        aria-modal="true"
        aria-label="Error"
      >
        <div class="modal" (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" role="document">
          <div class="modal__icon">&#x26A0;&#xFE0F;</div>
          <h2 class="modal__title">Something went wrong</h2>
          <p class="modal__message">{{ msg }}</p>
          <button class="modal__btn" (click)="dismiss()">Dismiss</button>
        </div>
      </div>
    }
  `,
  styles: [
    `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: var(--color-overlay);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: var(--space-lg);
      outline: none;
    }
    .modal {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      max-width: 400px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
    }
    .modal__icon {
      font-size: 3rem;
    }
    .modal__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
    }
    .modal__message {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
    .modal__btn {
      padding: var(--space-sm) var(--space-xl);
      background: var(--color-primary);
      color: var(--color-primary-text);
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
    }
    .modal__btn:hover {
      background: var(--color-primary-hover);
    }
  `,
  ],
})
export class ErrorModalComponent {
  readonly errorService = inject(ErrorService);

  dismiss() {
    this.errorService.dismiss();
  }
}

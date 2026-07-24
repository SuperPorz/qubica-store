import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    @if (loading.isLoading()) {
      <div class="spinner-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: `
    .spinner-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--space-2xl);
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class SpinnerComponent {
  readonly loading = inject(LoadingService);
}

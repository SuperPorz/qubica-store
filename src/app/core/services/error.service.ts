import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly error = signal<string | null>(null);

  show(message: string) {
    this.error.set(message);
  }

  dismiss() {
    this.error.set(null);
  }
}

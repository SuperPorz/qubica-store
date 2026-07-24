import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ILoginRequest } from '../models/api.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  private readonly tokenSignal = signal<string | null>(
    localStorage.getItem('auth_token')
  );
  readonly isAuthenticated = computed(() => this.tokenSignal() !== null);

  login(credentials: ILoginRequest) {
    return this.api.login(credentials).pipe(
      tap((res) => {
        this.tokenSignal.set(res.token);
        localStorage.setItem('auth_token', res.token);
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    this.tokenSignal.set(null);
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }
}

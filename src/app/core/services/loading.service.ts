import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly loadingMap = signal<Record<string, boolean>>({});
  readonly isLoading = signal(false);

  setLoading(key: string, loading: boolean) {
    this.loadingMap.update((map) => ({ ...map, [key]: loading }));
    this.isLoading.set(
      Object.values(this.loadingMap()).some((v) => v)
    );
  }

  start(key: string) {
    this.setLoading(key, true);
  }

  stop(key: string) {
    this.setLoading(key, false);
  }
}

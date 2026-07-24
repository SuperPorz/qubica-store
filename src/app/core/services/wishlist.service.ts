import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly storageKey = 'wishlist_ids';

  private readonly idsSignal = signal<Set<number>>(
    this.loadFromStorage()
  );

  readonly ids = computed(() => this.idsSignal());
  readonly count = computed(() => this.idsSignal().size);
  readonly isEmpty = computed(() => this.idsSignal().size === 0);

  toggle(productId: number): boolean {
    let added = false;
    this.idsSignal.update((ids) => {
      const next = new Set(ids);
      if (next.has(productId)) {
        next.delete(productId);
        added = false;
      } else {
        next.add(productId);
        added = true;
      }
      return next;
    });
    this.saveToStorage();
    return added;
  }

  isWishlisted(productId: number): boolean {
    return this.idsSignal().has(productId);
  }

  private loadFromStorage(): Set<number> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveToStorage() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...this.idsSignal()])
    );
  }
}

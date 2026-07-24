import { Injectable, signal, computed } from '@angular/core';
import { IProduct } from '../models/api.interface';

export interface CartItem {
  product: IProduct;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cart_items';

  private readonly itemsSignal = signal<CartItem[]>(
    this.loadFromStorage()
  );

  readonly items = this.itemsSignal.asReadonly();
  readonly totalItems = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this.itemsSignal().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  addProduct(product: IProduct) {
    this.itemsSignal.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.saveToStorage();
  }

  removeProduct(productId: number) {
    this.itemsSignal.update((items) =>
      items.filter((i) => i.product.id !== productId)
    );
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }
    this.itemsSignal.update((items) =>
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
    this.saveToStorage();
  }

  clearCart() {
    this.itemsSignal.set([]);
    this.saveToStorage();
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.itemsSignal()));
  }
}

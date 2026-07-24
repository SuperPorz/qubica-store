import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { ApiService } from '../../core/api/api.service';
import { IProduct } from '../../core/models/api.interface';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="wishlist-page">
      <h1 class="wishlist-page__heading">Wishlist</h1>

      @if (products().length === 0) {
        <div class="wishlist-page__empty">
          <p>Your wishlist is empty.</p>
          <a class="wishlist-page__continue" routerLink="/">Browse Products</a>
        </div>
      } @else {
        <div class="wishlist-page__grid">
          @for (product of products(); track product.id) {
            <div class="wishlist-item">
              <a class="wishlist-item__image-wrapper" [routerLink]="['/product', product.id]">
                <img
                  class="wishlist-item__image"
                  [src]="product.image"
                  [alt]="product.title"
                  loading="lazy"
                />
              </a>
              <div class="wishlist-item__info">
                <a class="wishlist-item__title" [routerLink]="['/product', product.id]">
                  {{ product.title }}
                </a>
                <p class="wishlist-item__price">{{ product.price | currency }}</p>
              </div>
              <button
                class="wishlist-item__remove"
                (click)="remove(product.id)"
                aria-label="Remove from wishlist"
              >Remove</button>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .wishlist-page {
      padding-bottom: var(--space-2xl);
    }
    .wishlist-page__heading {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-lg);
      color: var(--color-text-primary);
    }
    .wishlist-page__empty {
      text-align: center;
      padding: var(--space-2xl);
      color: var(--color-text-secondary);
    }
    .wishlist-page__continue {
      display: inline-block;
      margin-top: var(--space-md);
      color: var(--color-primary);
    }
    .wishlist-page__grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .wishlist-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .wishlist-item__image-wrapper {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: var(--radius-sm);
      padding: var(--space-sm);
    }
    .wishlist-item__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .wishlist-item__info {
      flex: 1;
      min-width: 0;
    }
    .wishlist-item__title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      text-decoration: none;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .wishlist-item__title:hover {
      color: var(--color-primary);
    }
    .wishlist-item__price {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-top: var(--space-xs);
    }
    .wishlist-item__remove {
      background: none;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      padding: var(--space-sm) var(--space-md);
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .wishlist-item__remove:hover {
      border-color: var(--color-error);
      color: var(--color-error);
    }
  `,
})
export class WishlistComponent implements OnInit {
  private readonly wishlist = inject(WishlistService);
  private readonly api = inject(ApiService);
  readonly products = signal<IProduct[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    const ids = this.wishlist.ids();
    if (ids.size === 0) {
      this.products.set([]);
      return;
    }
    this.api.getProducts().subscribe((all) => {
      this.products.set(all.filter((p) => ids.has(p.id)));
    });
  }

  remove(productId: number) {
    this.wishlist.toggle(productId);
    this.products.update((items) => items.filter((p) => p.id !== productId));
  }
}

import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../core/models/api.interface';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <a class="card" [routerLink]="['/product', product().id]">
      <div class="card__image-wrapper">
        <img
          class="card__image"
          [src]="product().image"
          [alt]="product().title"
          loading="lazy"
        />
      </div>
      <div class="card__body">
        <h3 class="card__title">{{ product().title }}</h3>
        <p class="card__price">{{ product().price | currency }}</p>
      </div>
      <button
        class="card__wishlist"
        [class.card__wishlist--active]="isWishlisted()"
        (click)="toggleWishlist($event)"
        [attr.aria-label]="isWishlisted() ? 'Remove from wishlist' : 'Add to wishlist'"
      >
        <span class="card__heart">{{ isWishlisted() ? '&#9829;' : '&#9825;' }}</span>
      </button>
    </a>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      background: var(--color-card-body-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      position: relative;
      transition:
        transform 350ms ease,
        box-shadow 350ms ease,
        border-color 350ms ease;
    }
    .card:hover {
      transform: translateY(-12px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-accent);
    }
    .card__image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      height: 220px;
      background: var(--color-card-image-bg);
      transition: background 350ms ease;
    }
    .card:hover .card__image-wrapper {
      background: #fef6f0;
    }
    .card__image {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      transition: transform 350ms ease;
    }
    .card:hover .card__image {
      transform: scale(1.06);
    }
    .card__body {
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      flex: 1;
      background: var(--color-card-body-bg);
      transition: background-color 350ms ease;
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }
    .card:hover .card__body {
      background-color: var(--color-accent-bg);
    }
    .card__title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-tight);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--color-text-primary);
    }
    .card__price {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-top: auto;
    }
    .card__wishlist {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      background: var(--color-background);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 350ms ease;
      z-index: 2;
    }
    .card__heart {
      font-size: 22px;
      line-height: 1;
      color: var(--color-text-secondary);
      transition: color 350ms ease, transform 350ms ease;
    }
    .card__wishlist:hover {
      transform: scale(1.2);
      background: var(--color-background);
    }
    .card__wishlist--active .card__heart {
      color: #d93025;
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<IProduct>();
  private readonly wishlist = inject(WishlistService);

  isWishlisted() {
    return this.wishlist.isWishlisted(this.product().id);
  }

  toggleWishlist(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.wishlist.toggle(this.product().id);
  }
}

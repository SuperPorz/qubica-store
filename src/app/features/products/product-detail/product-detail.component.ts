import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../core/api/api.service';
import { IProduct } from '../../../core/models/api.interface';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    @if (loading()) {
      <div class="detail-loading">
        <div class="skeleton skeleton--back"></div>
        <div class="detail-loading__layout">
          <div class="skeleton skeleton--image"></div>
          <div class="detail-loading__info">
            <div class="skeleton skeleton--category"></div>
            <div class="skeleton skeleton--title"></div>
            <div class="skeleton skeleton--price"></div>
            <div class="skeleton skeleton--rating"></div>
            <div class="skeleton skeleton--desc"></div>
            <div class="skeleton skeleton--desc"></div>
          </div>
        </div>
      </div>
    } @else if (product(); as p) {
      <article class="detail">
        <button class="detail__back" (click)="goBack()">← Back</button>
        <div class="detail__layout">
          <div class="detail__image-wrapper">
            <img class="detail__image" [src]="p.image" [alt]="p.title" />
          </div>
          <div class="detail__info">
            <p class="detail__category">{{ p.category }}</p>
            <h1 class="detail__title">{{ p.title }}</h1>
            <p class="detail__price">{{ p.price | currency }}</p>
            <div class="detail__rating">
              <span class="detail__stars">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <span
                    class="detail__star"
                    [class.detail__star--filled]="star <= Math.round(p.rating.rate)"
                    >★</span
                  >
                }
              </span>
              <span class="detail__rating-text">
                {{ p.rating.rate }} / 5 ({{ p.rating.count }} reviews)
              </span>
            </div>
            <p class="detail__description">{{ p.description }}</p>
            <div class="detail__actions">
              <button class="detail__add-to-cart" (click)="addToCart(p)">
                Add to Cart
              </button>
              <button
                class="detail__wishlist"
                [class.detail__wishlist--active]="wishlist.isWishlisted(p.id)"
                (click)="wishlist.toggle(p.id)"
              >
                {{ wishlist.isWishlisted(p.id) ? '♥ Saved' : '♡ Save' }}
              </button>
            </div>
          </div>
        </div>
      </article>
    }
  `,
  styles: `
    .detail {
      padding-bottom: var(--space-2xl);
    }
    .detail__back {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      background: none;
      border: none;
      color: var(--color-primary);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      padding: var(--space-sm) 0;
      margin-bottom: var(--space-lg);
      cursor: pointer;
    }
    .detail__back:hover {
      color: var(--color-primary-hover);
    }
    .detail__layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2xl);
    }
    .detail__image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-2xl);
      background: #fff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      min-height: 400px;
    }
    .detail__image {
      max-height: 350px;
      max-width: 100%;
      object-fit: contain;
    }
    .detail__info {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .detail__category {
      font-size: var(--font-size-sm);
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: var(--font-weight-medium);
    }
    .detail__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      color: var(--color-text-primary);
    }
    .detail__price {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
    .detail__rating {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    .detail__stars {
      display: flex;
      gap: 2px;
    }
    .detail__star {
      color: var(--color-border);
      font-size: var(--font-size-lg);
    }
    .detail__star--filled {
      color: var(--color-warning);
    }
    .detail__rating-text {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
    .detail__description {
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
    }
    .detail__actions {
      display: flex;
      gap: var(--space-md);
      align-items: center;
      margin-top: var(--space-md);
    }
    .detail__add-to-cart {
      padding: var(--space-md) var(--space-xl);
      background: var(--color-primary);
      color: var(--color-primary-text);
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }
    .detail__add-to-cart:hover {
      background: var(--color-primary-hover);
    }
    .detail__wishlist {
      padding: var(--space-md) var(--space-lg);
      background: none;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
    }
    .detail__wishlist:hover {
      border-color: var(--color-error);
      color: var(--color-error);
    }
    .detail__wishlist--active {
      border-color: var(--color-error);
      color: var(--color-error);
    }

    /* Skeleton loading */
    .detail-loading {
      padding-bottom: var(--space-2xl);
    }
    .detail-loading__layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2xl);
    }
    .detail-loading__info {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .skeleton {
      background: var(--color-border);
      border-radius: var(--radius-sm);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .skeleton--back {
      height: 20px;
      width: 60px;
      margin-bottom: var(--space-lg);
    }
    .skeleton--image {
      min-height: 400px;
      border-radius: var(--radius-lg);
      background: var(--color-surface);
    }
    .skeleton--category {
      height: 14px;
      width: 100px;
    }
    .skeleton--title {
      height: 32px;
      width: 80%;
    }
    .skeleton--price {
      height: 40px;
      width: 120px;
    }
    .skeleton--rating {
      height: 20px;
      width: 180px;
    }
    .skeleton--desc {
      height: 16px;
      width: 100%;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @media (max-width: 768px) {
      .detail__layout,
      .detail-loading__layout {
        grid-template-columns: 1fr;
      }
      .detail__image-wrapper,
      .skeleton--image {
        min-height: 280px;
      }
    }
  `,
})
export class ProductDetailComponent implements OnInit {
  readonly Math = Math;
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);
  readonly product = signal<IProduct | null>(null);
  readonly loading = signal(true);

  ngOnInit() {
    this.loading.set(true);
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.loading.set(true);
          return this.api.getProduct(id);
        })
      )
      .subscribe((data: IProduct) => {
        this.product.set(data);
        this.loading.set(false);
      });
  }

  goBack() {
    this.location.back();
  }

  addToCart(p: IProduct) {
    this.cart.addProduct(p);
  }
}

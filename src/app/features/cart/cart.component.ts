import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="cart-page">
      <h1 class="cart-page__heading">Shopping Cart</h1>

      @if (cart.items().length === 0) {
        <div class="cart-page__empty">
          <p>Your cart is empty.</p>
          <a class="cart-page__continue" routerLink="/">Continue Shopping</a>
        </div>
      } @else {
        <div class="cart-page__items">
          @for (item of cart.items(); track item.product.id) {
            <div class="cart-item">
              <a class="cart-item__image-wrapper" [routerLink]="['/product', item.product.id]">
                <img
                  class="cart-item__image"
                  [src]="item.product.image"
                  [alt]="item.product.title"
                  loading="lazy"
                />
              </a>
              <div class="cart-item__info">
                <a class="cart-item__title" [routerLink]="['/product', item.product.id]">
                  {{ item.product.title }}
                </a>
                <p class="cart-item__price">{{ item.product.price | currency }}</p>
              </div>
              <div class="cart-item__quantity">
                <button
                  class="cart-item__qty-btn"
                  (click)="cart.updateQuantity(item.product.id, item.quantity - 1)"
                >−</button>
                <span class="cart-item__qty-value">{{ item.quantity }}</span>
                <button
                  class="cart-item__qty-btn"
                  (click)="cart.updateQuantity(item.product.id, item.quantity + 1)"
                >+</button>
              </div>
              <p class="cart-item__subtotal">
                {{ item.product.price * item.quantity | currency }}
              </p>
              <button
                class="cart-item__remove"
                (click)="cart.removeProduct(item.product.id)"
                aria-label="Remove item"
              >✕</button>
            </div>
          }
        </div>

        <div class="cart-page__summary">
          <div class="cart-page__total">
            <span>Total</span>
            <strong>{{ cart.totalPrice() | currency }}</strong>
          </div>
          <button class="cart-page__checkout" disabled>Checkout (coming soon)</button>
          <button class="cart-page__clear" (click)="cart.clearCart()">Clear Cart</button>
        </div>
      }
    </section>
  `,
  styles: `
    .cart-page {
      padding-bottom: var(--space-2xl);
    }
    .cart-page__heading {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-lg);
      color: var(--color-text-primary);
    }
    .cart-page__empty {
      text-align: center;
      padding: var(--space-2xl);
      color: var(--color-text-secondary);
    }
    .cart-page__continue {
      display: inline-block;
      margin-top: var(--space-md);
      color: var(--color-primary);
    }
    .cart-page__items {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .cart-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .cart-item__image-wrapper {
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
    .cart-item__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .cart-item__info {
      flex: 1;
      min-width: 0;
    }
    .cart-item__title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      text-decoration: none;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .cart-item__title:hover {
      color: var(--color-primary);
    }
    .cart-item__price {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin-top: var(--space-xs);
    }
    .cart-item__quantity {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }
    .cart-item__qty-btn {
      width: 32px;
      height: 32px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-background);
      color: var(--color-text-primary);
      font-size: var(--font-size-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .cart-item__qty-btn:hover {
      background: var(--color-surface-hover);
    }
    .cart-item__qty-value {
      min-width: 24px;
      text-align: center;
      font-weight: var(--font-weight-semibold);
    }
    .cart-item__subtotal {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      min-width: 80px;
      text-align: right;
    }
    .cart-item__remove {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: var(--font-size-lg);
      cursor: pointer;
      padding: var(--space-xs);
    }
    .cart-item__remove:hover {
      color: var(--color-error);
    }
    .cart-page__summary {
      margin-top: var(--space-lg);
      padding: var(--space-lg);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      align-items: flex-end;
    }
    .cart-page__total {
      font-size: var(--font-size-xl);
      display: flex;
      gap: var(--space-md);
      align-items: center;
    }
    .cart-page__checkout {
      padding: var(--space-md) var(--space-xl);
      background: var(--color-primary);
      color: var(--color-primary-text);
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      opacity: 0.5;
    }
    .cart-page__clear {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      cursor: pointer;
      text-decoration: underline;
    }
    .cart-page__clear:hover {
      color: var(--color-error);
    }
  `,
})
export class CartComponent {
  readonly cart = inject(CartService);
}

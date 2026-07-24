import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../core/models/api.interface';

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
    </a>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }
    .card__image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      height: 220px;
      background: #fff;
    }
    .card__image {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
    .card__body {
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      flex: 1;
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
  `,
})
export class ProductCardComponent {
  readonly product = input.required<IProduct>();
}

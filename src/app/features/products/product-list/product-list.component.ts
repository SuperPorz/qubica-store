import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../core/api/api.service';
import { IProduct } from '../../../core/models/api.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <section class="products">
      <h2 class="products__heading">
        {{ activeCategory() || 'All' }} Products
      </h2>

      @if (products().length === 0 && loading()) {
        <div class="products__loading">
          <div class="skeleton-grid">
            @for (_ of [1,2,3,4,5,6]; track _) {
              <div class="skeleton-card">
                <div class="skeleton skeleton--image"></div>
                <div class="skeleton skeleton--title"></div>
                <div class="skeleton skeleton--price"></div>
                <div class="skeleton skeleton--cartbtn"></div>
              </div>
            }
          </div>
        </div>
      } @else {
        <div class="products__grid">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
        @if (loading()) {
          <div class="products__loading-overlay">
            <span class="products__loading-spinner"></span>
            <span>Loading…</span>
          </div>
        }
      }
    </section>
  `,
  styles: `
    .products {
      padding-bottom: var(--space-2xl);
    }
    .products__heading {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-lg);
      color: var(--color-text-primary);
      text-transform: capitalize;
    }
    .products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--space-lg);
    }
    .products__loading {
      padding: var(--space-lg) 0;
    }
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--space-lg);
    }
    .skeleton-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      min-height: 380px;
    }
    .skeleton {
      background: var(--color-border);
      border-radius: var(--radius-sm);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .skeleton--image {
      height: 220px;
      margin: var(--space-lg);
      border-radius: var(--radius-md);
    }
    .skeleton--title {
      height: 16px;
      margin: var(--space-md) var(--space-md) var(--space-xs);
    }
    .skeleton--price {
      height: 24px;
      width: 80px;
      margin: var(--space-xs) var(--space-md) 0;
    }
    .skeleton--cartbtn {
      height: 36px;
      margin: var(--space-sm) var(--space-md) var(--space-md);
      border-radius: var(--radius-md);
    }
    .products__loading-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin-top: var(--space-lg);
      padding: var(--space-md);
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }
    .products__loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class ProductListComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly products = signal<IProduct[]>([]);
  readonly activeCategory = signal('');
  readonly loading = signal(true);

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const cat = params.get('category') ?? '';
          this.activeCategory.set(cat);
          this.loading.set(true);
          const apiCall$ = cat
            ? this.api.getProductsByCategory(cat)
            : this.api.getProducts();
          // Ensure minimum 300ms loading visibility for smooth feedback
          return combineLatest([apiCall$, timer(300)]).pipe(
            map(([data]) => data)
          );
        })
      )
      .subscribe((data: IProduct[]) => {
        this.products.set(data);
        this.loading.set(false);
      });
  }
}

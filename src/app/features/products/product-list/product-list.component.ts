import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
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
      <div class="products__grid">
        @for (product of products(); track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
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
  `,
})
export class ProductListComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly products = signal<IProduct[]>([]);
  readonly activeCategory = signal('');

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const cat = params.get('category') ?? '';
          this.activeCategory.set(cat);
          return cat
            ? this.api.getProductsByCategory(cat)
            : this.api.getProducts();
        })
      )
      .subscribe((data: IProduct[]) => {
        this.products.set(data);
      });
  }
}

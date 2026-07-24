import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { IProduct } from '../../../core/models/api.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <section class="products">
      <h2 class="products__heading">Products</h2>
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
  readonly products = signal<IProduct[]>([]);

  ngOnInit() {
    this.api.getProducts().subscribe((data: IProduct[]) => {
      this.products.set(data);
    });
  }
}

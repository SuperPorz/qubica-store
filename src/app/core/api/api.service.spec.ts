import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10, category: 'cat1', image: '', description: '', rating: { rate: 4, count: 5 } },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].title).toBe('Product 1');
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch a single product by id', () => {
    const mockProduct = { id: 5, title: 'Product 5', price: 25, category: 'cat2', image: '', description: '', rating: { rate: 3.5, count: 20 } };

    service.getProduct(5).subscribe((product) => {
      expect(product.id).toBe(5);
      expect(product.title).toBe('Product 5');
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/5');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should fetch categories', () => {
    const mockCategories = ['electronics', 'jewelery'];

    service.getCategories().subscribe((cats) => {
      expect(cats.length).toBe(2);
      expect(cats).toContain('electronics');
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch products by category', () => {
    service.getProductsByCategory('electronics').subscribe();

    const req = httpMock.expectOne('https://fakestoreapi.com/products/category/electronics');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should send login request', () => {
    const credentials = { username: 'testuser', password: 'testpass' };

    service.login(credentials).subscribe((res) => {
      expect(res.token).toBeDefined();
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush({ token: 'fake-jwt-token' });
  });
});

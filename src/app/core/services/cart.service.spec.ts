import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { IProduct } from '../models/api.interface';

// Polyfill localStorage for Vitest node environment
if (typeof localStorage === 'undefined') {
  const store: Record<string, string> = {};
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      get length() { return Object.keys(store).length; },
      key: (i: number) => Object.keys(store)[i] ?? null,
    },
    writable: false,
  });
}

const mockProduct: IProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product',
  category: 'test',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 10 },
};

const mockProduct2: IProduct = {
  id: 2,
  title: 'Test Product 2',
  price: 9.99,
  description: 'Another test product',
  category: 'test',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 3.0, count: 5 },
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('should add a product to the cart', () => {
    service.addProduct(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.id).toBe(1);
    expect(service.items()[0].quantity).toBe(1);
    expect(service.totalItems()).toBe(1);
  });

  it('should increase quantity when adding the same product', () => {
    service.addProduct(mockProduct);
    service.addProduct(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBeCloseTo(59.98);
  });

  it('should add multiple different products', () => {
    service.addProduct(mockProduct);
    service.addProduct(mockProduct2);
    expect(service.items().length).toBe(2);
    expect(service.totalItems()).toBe(2);
  });

  it('should update quantity of an item', () => {
    service.addProduct(mockProduct);
    service.updateQuantity(1, 5);
    expect(service.items()[0].quantity).toBe(5);
    expect(service.totalItems()).toBe(5);
  });

  it('should remove product when quantity set to 0', () => {
    service.addProduct(mockProduct);
    service.updateQuantity(1, 0);
    expect(service.items().length).toBe(0);
  });

  it('should remove a product from the cart', () => {
    service.addProduct(mockProduct);
    service.addProduct(mockProduct2);
    service.removeProduct(1);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.id).toBe(2);
  });

  it('should clear the cart', () => {
    service.addProduct(mockProduct);
    service.addProduct(mockProduct2);
    service.clearCart();
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
  });

  it('should calculate total price correctly', () => {
    service.addProduct(mockProduct); // 29.99 x 1
    service.addProduct(mockProduct2); // 9.99 x 1
    service.addProduct(mockProduct); // 29.99 x 2 now
    expect(service.totalPrice()).toBeCloseTo(69.97);
  });
});

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IProduct,
  ILoginRequest,
  ILoginResponse,
} from '../models/api.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.baseUrl}/products/category/${category}`
    );
  }

  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/auth/login`,
      credentials
    );
  }
}

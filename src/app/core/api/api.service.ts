import { Injectable, inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  IProduct,
  ILoginRequest,
  ILoginResponse,
} from '../models/api.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com';

  private readonly simDelay = isDevMode() ? 800 : 0;

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`).pipe(
      delay(this.simDelay)
    );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`).pipe(
      delay(this.simDelay)
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`).pipe(
      delay(this.simDelay)
    );
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.baseUrl}/products/category/${category}`
    ).pipe(
      delay(this.simDelay)
    );
  }

  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/auth/login`,
      credentials
    ).pipe(
      delay(this.simDelay)
    );
  }
}

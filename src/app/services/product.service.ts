import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.baseURL}/products?limit=0`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseURL}/products/${id}`);
  }

  getCategories() {
    return this.http.get<any>(`${this.baseURL}/products?limit=0`).pipe(
      map((response) => {
        const grouped: any = {};

        response.products.forEach((product: any) => {
          if (!grouped[product.category]) {
            grouped[product.category] = [];
          }

          grouped[product.category].push(product);
        });

        return Object.keys(grouped).map((category) => {
          const products = grouped[category];

          return {
            name: category,
            image: products[1]?.thumbnail || products[0]?.thumbnail,
          };
        });
      }),
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get(`${this.baseURL}/products/category/${category}`);
  }
}

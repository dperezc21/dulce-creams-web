import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../interfaces/product';
import {map, Observable} from 'rxjs';
import {PRODUCT_URL} from '../constants/url-constants';

@Injectable({ providedIn: "root"})
export class ProductService {

  constructor(private http: HttpClient) {}

  saveProducts(product: Product): Observable<Product> {
    return this.http.post(`${PRODUCT_URL}`, product)
      .pipe(map(value => value as Product));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${PRODUCT_URL}`)
      .pipe(map(value => value as Product[]));
  }

  updateFile(image: File): Observable<boolean> {
    const data = new FormData();
    data.set("file", image);
    return this.http.put<boolean>(`${PRODUCT_URL}/image`, data)
      .pipe(map(value => value));
  }
}

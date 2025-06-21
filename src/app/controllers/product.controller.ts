import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {Product} from '../interfaces/product';


@Injectable({ providedIn: "root" })
export class ProductController {

  private productsBS = signal<Product[]>([]);

  saveProduct(productToSave: Product): void {
    of(true)
       .pipe(tap(value => this.addNewProduct(productToSave)))
       .subscribe();
  }

  setProducts(productList: Product[]): void {
    this.productsBS.set(productList);
  }

  addNewProduct(product: Product): void {
    this.productsBS.update(value => [...value, product])
  }

  getProducts(): WritableSignal<Product[]> {
    return this.productsBS as WritableSignal<Product[]>;
  }
}

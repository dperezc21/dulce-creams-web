import {Injectable, signal, WritableSignal} from '@angular/core';
import {of, tap} from 'rxjs';
import {Product} from '../interfaces/product';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class ProductController {

  private productsBS = signal<Product[]>([]);

  constructor(private snackBarService: SnackBarService) {
  }

  saveProduct(productToSave: Product): void {
    of(true)
       .pipe(tap(value => {
         this.addNewProduct(productToSave);
         this.snackBarService.showMessage("producto guardado");
       })).subscribe();
  }

  setProducts(productList: Product[]): void {
    this.productsBS.set(productList);
  }

  addNewProduct(product: Product): void {
    const isTheProduct: boolean = this.productsBS().some(value => value.id === product.id);
    this.productsBS.update(value => isTheProduct ? this.replaceProductEdited(product): [...value, product]);
  }

  replaceProductEdited(product: Product): Product[] {
    return this.productsBS().map(value => value?.id === product?.id ? product : value);
  }

  getProducts(): WritableSignal<Product[]> {
    return this.productsBS as WritableSignal<Product[]>;
  }

  getLengthProduct(): number {
    return this.productsBS().length;
  }
}

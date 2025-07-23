import {Injectable, signal, WritableSignal} from '@angular/core';
import {tap} from 'rxjs';
import {Product} from '../interfaces/product';
import {SnackBarService} from '../services/snack-bar.service';
import {ProductService} from '../services/product-service';
import {ProductsMock} from './products.mock';

@Injectable({ providedIn: "root" })
export class ProductController {

  private productsBS = signal<Product[]>([]);

  constructor(private productService: ProductService,
              private snackBarService: SnackBarService) {
  }

  saveProduct(productToSave: Product): void {
    this.productService.saveProducts(productToSave)
       .pipe(tap(value => {
         this.addNewProduct(value);
         this.snackBarService.showMessage("producto guardado");
       })).subscribe({ error: err => console.log(err) });
  }

  getAllProducts(): void {
    this.productService.getProducts()
      .pipe(tap((value: Product[]) => {
        this.setProducts(value?.length ? value : ProductsMock.productsMock());
      })).subscribe();
  }

  setProducts(productList: Product[]): void {
    this.productsBS.set(productList);
  }

  private addNewProduct(product: Product): void {
    const isTheProduct: boolean = this.productsBS().some(value => value.id === product.id);
    this.productsBS.update(value => isTheProduct ? this.replaceProductEdited(product): [...value, product]);
  }

  replaceProductEdited(product: Product): Product[] {
    return this.productsBS().map(value => value?.id === product?.id ? product : value);
  }

  getProducts$(): WritableSignal<Product[]> {
    return this.productsBS as WritableSignal<Product[]>;
  }

  getLengthProduct(): number {
    return this.productsBS().length;
  }

  removeProductById(productId: number) {
    this.productsBS.update((products: Product[]) => products.filter(value => value.id !== productId));
  }
}

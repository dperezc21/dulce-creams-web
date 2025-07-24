import {Component, input, output, signal} from '@angular/core';
import {Product} from '../../interfaces/product';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {Ordering} from '../../interfaces/ordering';
import {ValidProductsSelectedPipe} from '../../pipes/products-selected.pipe';
import {TotalPricePipe} from '../../pipes/total-price.pipe';

@Component({
  selector: 'app-products-view',
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardTitle,
    ValidProductsSelectedPipe,
    TotalPricePipe,
    NgIf
  ],
  templateUrl: './products-view.component.html',
  standalone: true,
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent {

  products = input<Product[]>();
  productsSelectedToOrder = output<Ordering[]>();
  productsSelected = signal<Product[]>([]);

  selected(product: Product) {

    const productIsSelected: Product = this.productsSelected().find(value => value?.id === product?.id) as Product;

    if(productIsSelected?.id) {
      this.discard(productIsSelected);
      const orderingProduct: Ordering[] = this.mapProductSelected();
      this.productsSelectedToOrder.emit(orderingProduct);
      return;
    }
    this.productsSelected.update((value: Product[]) => [...value, product]);
    const orderingProduct: Ordering[] = this.mapProductSelected();
    this.productsSelectedToOrder.emit(orderingProduct);
  }

  discard(product: Product) {
    const filterProducts: Product[] = this.productsSelected().filter((value1: Product) => value1.id !== product.id);
    this.productsSelected.update(() => [...filterProducts]);
  }

  mapProductSelected(): Ordering[] {
    return this.productsSelected().map((value: Product) => {
      return {product: value}
    }) as Ordering[];
  }
}

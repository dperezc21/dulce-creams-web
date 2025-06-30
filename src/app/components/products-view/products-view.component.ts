import {Component, input, output, signal} from '@angular/core';
import {Product} from '../../interfaces/product';
import {NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {Ordering} from '../../interfaces/ordering';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ValidProductsSelectedPipe} from '../../pipes/products-selected.pipe';

@Component({
  selector: 'app-products-view',
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardTitle,
    MatButton,
    ValidProductsSelectedPipe,
    MatIcon
  ],
  templateUrl: './products-view.component.html',
  standalone: true,
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent {

  products = input<Product[]>();
  //productSelectedToOrder = output<Ordering>();
  productsSelected = signal<Product[]>([]);

  selected(product: Product, quantity: number = 1) {
    //const ordering: Ordering = {product, quantity};
    const productIsSelected: Product = this.productsSelected().find(value => value?.id === product?.id) as Product;
    if(productIsSelected?.id) {
      this.discard(productIsSelected);
      return;
    }
    this.productsSelected.update((value: Product[]) => [...value, product]);
    //this.productSelectedToOrder.emit(ordering);
  }

  discard(product: Product) {
    const filterProducts: Product[] = this.productsSelected().filter((value1: Product) => value1.id !== product.id);
    this.productsSelected.update(() => [...filterProducts]);
  }
}

import {Component, input, output, signal} from '@angular/core';
import {Product, ProductTopping} from '../../interfaces/product';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {Ordering} from '../../interfaces/ordering';
import {ValidProductsSelectedPipe} from '../../pipes/products-selected.pipe';
import {TotalPricePipe} from '../../pipes/total-price.pipe';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {CountProductPipe} from '../../pipes/count-product.pipe';

@Component({
  selector: 'app-products-view',
  imports: [
    NgOptimizedImage,
    MatCard,
    ValidProductsSelectedPipe,
    TotalPricePipe,
    NgIf,
    FormsModule,
    NgClass,
    MatCardContent,
    MatCheckbox,
    MatButton,
    CountProductPipe
  ],
  templateUrl: './products-view.component.html',
  standalone: true,
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent {

  goBack = output<void>();
  products = input<Product[]>();
  productsSelectedToOrder = output<Ordering[]>();
  productsSelected = signal<Product[]>([]);

  selected(product: Product) {
    const productIsSelected: Product = this.productsSelected().find(value => value?.id === product?.id) as Product;
    if(productIsSelected?.id) {
      this.discard(productIsSelected);
      return;
    }
    this.productsSelected.update((value: Product[]) => [...value, product]);
  }

  discard(product: Product) {
    const filterProducts: Product[] = this.productsSelected().filter((value1: Product) => value1.id !== product.id);
    this.productsSelected.update(() => [...filterProducts]);
  }

  mapProductSelected(): Ordering[] {
    return this.productsSelected().reduce((previousValue: Ordering[], currentValue: Product) => {
      const productCurrentIndex: number = previousValue.findIndex(value => currentValue.id === value.product.id) as number;
      if(productCurrentIndex === -1) previousValue.push({ product: currentValue, quantity: 1});
      else previousValue[productCurrentIndex].quantity+=1;
      return previousValue;
    }, []) as Ordering[];
  }

  decrement(product: Product) {
    const findIndexProduct: Product = this.productsSelected().find(value => value.id === product.id) as Product;
    if(!findIndexProduct?.id) return;
    let filterProduct: Product[] = this.productsSelected().filter(value => value.id === findIndexProduct.id);
    const filter: Product[] = this.productsSelected().filter(value => value.id !== findIndexProduct.id);
    if(filterProduct?.length) filterProduct.shift();
    this.productsSelected.set([...filter, ...filterProduct]);
  }

  increment(product: Product) {
    this.productsSelected.update(value => [...value, product]);
  }

  selectTopping($event: any, productId: number | undefined, topping: ProductTopping) {
    this.productsSelected.set(this.productsSelected().map((product: Product) => {
      if(product.id === productId) {
        product.toppings = product.toppings?.map((value: ProductTopping) => {
          if(value.name === topping.name) value.selected = $event.checked;
          return value;
        }) as ProductTopping[];
      }
      return product;
    }));
  }

  sendOrder() {
    this.productsSelectedToOrder.emit(this.mapProductSelected());
  }
}

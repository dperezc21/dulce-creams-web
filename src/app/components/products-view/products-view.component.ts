import {Component, input, OnInit, output, signal} from '@angular/core';
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
import {ProductsViewController} from '../../controllers/products-view.controller';

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
export class ProductsViewComponent implements OnInit {

  goBack = output<void>();
  products = input<Product[]>();
  productsSelectedToOrder = output<Ordering[]>();
  productsSelected = signal<Product[]>([]);
  productsList = signal<Product[]>([]);

  constructor(protected productsViewController: ProductsViewController) {}

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

  decrement(product: Product) {
    const findIndexProduct: Product = this.productsSelected().find(value => value.id === product.id) as Product;
    if(!findIndexProduct?.id) return;
    let filterProduct: Product[] = this.productsSelected().filter(value => value.id === findIndexProduct.id);
    const filter: Product[] = this.productsSelected().filter(value => value.id !== findIndexProduct.id);
    if(filterProduct?.length) filterProduct.shift();
    this.productsSelected.set([...filter, ...filterProduct]);
  }

  increment(product: Product) {
    this.addToProductsSelected(product);
  }

  selectTopping($event: any, productId: number | undefined, toppingSelected: ProductTopping) {
    const productsSelectedMapped: Product[] = this.productsSelected()
      .map(product => this.productsViewController.changeStateProductToppingSelected($event.checked, product, productId, toppingSelected));
    this.productsSelected.set(productsSelectedMapped);
  }

  addToProductsSelected(product: Product) {
    this.productsSelected.update(value => [...value, product]);
  }

  addOther(product: Product) {
    let newProduct: Product = {...product};
    newProduct.id = product?.id as number + this.productsViewController.maijorProductId(this.productsList()) + this.productsSelected().length + 1;
    const findIndex: number = this.productsList().findIndex(value => value.id == product.id) as number;
    if(findIndex === -1) return;
    const products: Product[] = this.productsViewController.setProductInIndex(this.productsList(), newProduct, findIndex);
    this.productsList.set(products);
    this.productsSelected.set(products);
  }

  sendOrder() {
    this.productsSelectedToOrder.emit(this.productsViewController.mapProductSelected(this.productsSelected()));
  }

  ngOnInit(): void {
    this.productsList.set(this.products() as Product[]);
  }
}

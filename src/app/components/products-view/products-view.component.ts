import {Component, inject, input, OnInit, output} from '@angular/core';
import {Product, ProductTopping} from '../../interfaces/product';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {Ordering} from '../../interfaces/ordering';
import {TotalPricePipe} from '../../pipes/total-price.pipe';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {ValidProductsSelectedPipe} from '../../pipes/products-selected.pipe';
import {ProductsViewController} from '../../controllers/products-view.controller';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {tap} from 'rxjs';

@Component({
  selector: 'app-products-view',
  imports: [
    NgOptimizedImage,
    MatCard,
    TotalPricePipe,
    NgIf,
    FormsModule,
    NgClass,
    MatCardContent,
    MatCheckbox,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    NgForOf,
    ValidProductsSelectedPipe
  ],
  templateUrl: './products-view.component.html',
  standalone: true,
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  goBack = output<void>();
  products = input<Product[]>();
  productsSelectedToOrder = output<Ordering[]>();
  productsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, protected productsViewController: ProductsViewController) {}

  getProductValueByIndex(indexProduct: number): Product {
    return this.formArrayProducts.at(indexProduct).value as Product;
  }
  selectProduct(indexProduct: number) {
    const getProduct: Product = this.getProductValueByIndex(indexProduct);
    getProduct.selected = !getProduct.selected;
    getProduct.quantity = !getProduct.selected ? 0 : 1;
    this.formArrayProducts.at(indexProduct).setValue(getProduct);
  }

  decrement(indexProduct: number) {
    const getProduct: Product = this.getProductValueByIndex(indexProduct);
    getProduct.quantity = getProduct.quantity == 0 ? getProduct.quantity : getProduct.quantity as number - 1;
    if(getProduct.quantity === 0) getProduct.selected = !getProduct.selected;
    this.formArrayProducts.at(indexProduct).setValue(getProduct);
  }

  increment(indexProduct: number) {
    const getProduct: Product = this.getProductValueByIndex(indexProduct);
    getProduct.quantity = getProduct.quantity as number + 1;
    if(!getProduct.selected) getProduct.selected = !getProduct.selected;
    this.formArrayProducts.at(indexProduct).setValue(getProduct);
  }

  addOther(product: Product, productIndex: number) {
    product.id = product?.id as number + this.productsViewController.productIdGreater(this.formArrayProducts.value) + this.formArrayProducts.value.length + 1;
    this.formArrayProducts.insert(productIndex + 1, this.buildProductForm(product));
  }

  sendOrder() {
    this.productsSelectedToOrder.emit(this.productsViewController.mapProductSelected(this.formArrayProducts.value));
  }

  toppingList(index: number): FormArray {
    return this.formArrayProducts.at(index).get('toppings') as FormArray;
  }

  get formArrayProducts(): FormArray {
    return this.productsForm.get('products') as FormArray;
  }

  buildProductForm(product: Product): FormGroup {
    const toppings = product.toppings?.map(value => this.buildToppingsForm(value)) ?? [];
    return this.formBuilder?.group({
      id: [product.id ?? ""],
      name: [product.name ?? ""],
      description: [product.description ?? ""],
      price: [product.price ?? 0],
      image: [product.image ?? ""],
      toppings: this.formBuilder.array(toppings),
      selected: [product.selected ?? false],
      quantity: [0]
    })
  }

  buildToppingsForm(topping: ProductTopping): FormGroup {
    return this.formBuilder?.group({
      price: [topping?.price ?? ""],
      name: [topping?.name ?? ""],
      selected: [topping?.selected ?? false]
    })
  }

  remove(indexProduct: number) {
    const product: Product = this.getProductValueByIndex(indexProduct);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      enterAnimationDuration: "200ms",
    });
    dialogRef.componentInstance.title = `Remover ${product.name}`;
    dialogRef.componentInstance.message = "¿Seguro que quiere remover este producto?";
    dialogRef.afterClosed()
      .pipe(tap((value: boolean) => {
        if(value) this.formArrayProducts.removeAt(indexProduct);
      })).subscribe();
  }

  get someProductSelected(): boolean {
    return this.formArrayProducts.value.some((value: Product) => value?.selected) as boolean;
  }

  get totalProductsSelected(): number {
    return this.formArrayProducts.value.reduce((previous: number, current: Product) => {
      return current.selected ? previous + 1 : previous;
    }, 0)
  }

  ngOnInit(): void {
    const formArrayProducts = this.formBuilder.array(this.products()?.map(value => this.buildProductForm(value)) ?? []);
    this.productsForm = this.formBuilder.group({
      products: formArrayProducts
    })
  }
}

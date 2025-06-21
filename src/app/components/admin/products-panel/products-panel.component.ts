import {Component, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../interfaces/product';
import {ProductController} from '../../../controllers/product.controller';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {AddProductComponent} from '../add-product/add-product.component';

@Component({
  selector: 'app-products-panel',
  imports: [
    MatButton,
    ProductsTableComponent,
    AddProductComponent,
  ],
  templateUrl: './products-panel.component.html',
  standalone: true,
  styleUrl: './products-panel.component.css'
})
export class ProductsPanelComponent implements OnInit {

  productList = signal<Product[]>([]);
  addProduct = signal<boolean>(false);

  constructor(public productController: ProductController) {}
  showAddProductForm() {
    this.addProduct.update(value => !value);
  }

  ngOnInit(): void {
    this.productList.set(this.productController.getProducts());
  }

  addProductToList(productSaved: Product) {
    if(!productSaved?.name) return;
    this.showAddProductForm();
    this.productList.update(value => [...value, productSaved]);
  }
}

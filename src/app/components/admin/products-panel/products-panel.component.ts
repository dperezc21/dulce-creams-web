import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../interfaces/product';
import {ProductController} from '../../../controllers/product.controller';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {AddProductComponent} from '../add-product/add-product.component';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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

  productList: WritableSignal<Product[]> = signal<Product[]>([]);
  addProduct: WritableSignal<boolean> = signal<boolean>(false);
  dialog = inject(MatDialog);
  productToEditSelected?: Product;

  constructor(public productController: ProductController) {}
  showAddProductForm() {
    this.addProduct.update(value => !value);
    if(this.productToEditSelected?.id) this.productToEditSelected = undefined;
  }

  ngOnInit(): void {
    this.productController.getAllProducts();
    this.productList = this.productController.getProducts$();
  }

  addProductToList(productToSave: Product) {
    if(!productToSave?.name) return;
    this.showAddProductForm();
    this.productController.saveProduct(productToSave);
  }

  editProduct(productToEdit: Product) {
    if(!productToEdit?.name) return;
    this.showAddProductForm();
    this.productToEditSelected = productToEdit;
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "250ms",
    })
    dialogRef.componentInstance.title = `Eliminar ${product.name}`;
    dialogRef.componentInstance.message = "¿Seguro que quiere eliminar este producto?";
    dialogRef.afterClosed().subscribe(value => {
      if(value) this.productController.removeProductById(product.id as number);
    });
  }
}

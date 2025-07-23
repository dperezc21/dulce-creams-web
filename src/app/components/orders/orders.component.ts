import {Component, OnInit, signal} from '@angular/core';
import {ProductController} from '../../controllers/product.controller';
import {Product} from '../../interfaces/product';
import {ProductsViewComponent} from '../products-view/products-view.component';
import {MatButton} from '@angular/material/button';
import {Ordering} from '../../interfaces/ordering';

@Component({
  selector: 'app-orders',
  imports: [
    ProductsViewComponent,
    MatButton
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  ordering: boolean = false;
  products = signal<Product[]>([]);
  orderingProducts = signal<Ordering[]>([]);

  constructor(private productController: ProductController) {}

  ngOnInit(): void {
    this.productController.getAllProducts();
    this.products = this.productController.getProducts$();
  }

  productsSelected(ordering1: Ordering[]) {
    this.orderingProducts.update(() => [...ordering1]);
  }

  doOrder() {
    console.log("hacer pedido");
  }
}

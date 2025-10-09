import {Component, OnInit, signal} from '@angular/core';
import {ProductController} from '../../controllers/product.controller';
import {Product} from '../../interfaces/product';
import {ProductsViewComponent} from '../products-view/products-view.component';
import {Ordering} from '../../interfaces/ordering';

@Component({
  selector: 'app-orders',
  imports: [
    ProductsViewComponent
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

  doOrder($event: Ordering[]) {
    console.log("hacer pedido", $event);
  }
}

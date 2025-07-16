import {Component, OnInit, signal} from '@angular/core';
import {ProductController} from '../../controllers/product.controller';
import {Product} from '../../interfaces/product';
import {ProductsMock} from '../../controllers/products.mock';
import {ProductsViewComponent} from '../products-view/products-view.component';
import {MatButton} from '@angular/material/button';
import {Ordering} from '../../interfaces/ordering';
import {WebSocketApiService} from '../../services/web-socket-api.service';

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

  constructor(private productController: ProductController, private webSocket: WebSocketApiService) {}

  ngOnInit(): void {
    this.webSocket.connect();
    this.productController.setProducts(ProductsMock.productsMock());
    this.products = this.productController.getProducts();
  }

  productsSelected(ordering1: Ordering[]) {
    this.orderingProducts.update(() => [...ordering1]);
  }

  doOrder() {
    this.webSocket.sendMessage(this.orderingProducts());
    //console.log("hacer pedido")
  }
}
